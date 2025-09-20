import { Request } from "express";
import ApartmentModel from "../models/apartment.model";
import {
  ApartmentFilter,
  ApartmentSearchParams,
  PaginatedResponse,
  PAGINATION_LIMITS,
} from "../types/pagination";
import { IApartment } from "../models/apartment.model";
import { Apartment } from "../types/Apartment";

export default class ApartmentService {
  // ------------------------------
  // FORMAT APARTMENT DATA
  // Converts MongoDB document to Apartment type
  // Optionally includes detailed fields
  // ------------------------------
  private formatApartment(apartment: any, withDetails = false): Apartment {
    const base: Apartment = {
      id: apartment._id.toString(),
      title: apartment.title,
      description: apartment.description,
      price: apartment.price,
      project: apartment.project,
      imageUrl: apartment.imageUrl,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      size: apartment.size,
      isAvailable: apartment.isAvailable,
      unitNumber: apartment.unitNumber,
    };

    if (withDetails) {
      return {
        ...base,
        amenities: apartment.amenities,
        floor: apartment.floor,
        yearBuilt: apartment.yearBuilt,
        searchText: apartment.searchText,
        location: apartment.location,
        createdAt: apartment.createdAt,
        updatedAt: apartment.updatedAt,
      };
    }

    return base;
  }

  // ------------------------------
  // APPLY FILTERS TO MONGODB QUERY
  // Supports price, bedrooms, bathrooms, size, location, project, availability, and amenities
  // ------------------------------
  private applyFilters(query: any, filters: ApartmentFilter): void {
    // Price filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
    }

    // Bedrooms filter
    if (filters.minBedrooms !== undefined || filters.maxBedrooms !== undefined) {
      query.bedrooms = {};
      if (filters.minBedrooms !== undefined) query.bedrooms.$gte = filters.minBedrooms;
      if (filters.maxBedrooms !== undefined) query.bedrooms.$lte = filters.maxBedrooms;
    }

    // Bathrooms filter
    if (filters.minBathrooms !== undefined || filters.maxBathrooms !== undefined) {
      query.bathrooms = {};
      if (filters.minBathrooms !== undefined) query.bathrooms.$gte = filters.minBathrooms;
      if (filters.maxBathrooms !== undefined) query.bathrooms.$lte = filters.maxBathrooms;
    }

    // Size filter
    if (filters.minSize !== undefined || filters.maxSize !== undefined) {
      query.size = {};
      if (filters.minSize !== undefined) query.size.$gte = filters.minSize;
      if (filters.maxSize !== undefined) query.size.$lte = filters.maxSize;
    }

    // Text filters (location & project)
    if (filters.location) {
      query.location = new RegExp(this.escapeRegex(filters.location.trim()), "i");
    }
    if (filters.project) {
      query.project = new RegExp(this.escapeRegex(filters.project.trim()), "i");
    }

    // Availability filter
    if (filters.isAvailable !== undefined) {
      query.isAvailable = filters.isAvailable;
    }

    // Amenities filter (all specified amenities must be present)
    if (filters.amenities && filters.amenities.length > 0) {
      query.amenities = { $all: filters.amenities };
    }
  }

  // ------------------------------
  // ESCAPE SPECIAL CHARACTERS FOR REGEX
  // ------------------------------
  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // ------------------------------
  // CREATE A NEW APARTMENT
  // ------------------------------
  async createApartmentService(data: IApartment) {
    try {
      const newApartment = await ApartmentModel.create({
        ...data,
        // Precompute a search text for efficient searching
        searchText: `${data.title}-${data.description}-${data.location}-${data.project}-${data.unitNumber}`,
      });

      return {
        message: "Apartment created successfully",
        apartment: this.formatApartment(newApartment.toObject(), true),
      };
    } catch (error: any) {
      // Handle duplicate unit number error
      if (error.code === 11000) {
        throw new Error(
          "An apartment with this unit number already exists in this project"
        );
      }
      throw new Error(`Failed to create apartment: ${error.message}`);
    }
  }

  // ------------------------------
  // GET ALL APARTMENTS
  // Supports search, filters, and pagination
  // ------------------------------
  async getAllApartmentsService(
    params: ApartmentSearchParams
  ): Promise<PaginatedResponse<Apartment>> {
    try {
      const { search, pagination, filters } = params;

      // Validate and set pagination defaults
      const page = Math.max(PAGINATION_LIMITS.MIN_PAGE, pagination.page || 1);
      const limit = Math.min(
        Math.max(PAGINATION_LIMITS.MIN_LIMIT, pagination.limit || PAGINATION_LIMITS.DEFAULT_LIMIT),
        PAGINATION_LIMITS.MAX_LIMIT
      );

      // Build MongoDB query object
      const query: any = {};

      // Search across multiple fields
      if (search && search.trim()) {
        const searchRegex = new RegExp(this.escapeRegex(search.trim()), "i");
        query.$or = [{ searchText: searchRegex }];
      }

      // Apply filters if provided
      if (filters) {
        this.applyFilters(query, filters);
      }

      // Execute queries in parallel for performance
      const [apartments, total] = await Promise.all([
        ApartmentModel.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ createdAt: -1 })
          .lean(),
        ApartmentModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: apartments.map((apartment) => this.formatApartment(apartment, false)),
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch apartments: ${(error as Error).message}`);
    }
  }

  // ------------------------------
  // GET APARTMENT BY ID
  // ------------------------------
  async getApartmentByIdService(id: string) {
    try {
      const apartment = await ApartmentModel.findById(id);
      if (!apartment) {
        throw new Error("Apartment not found");
      }
      return this.formatApartment(apartment.toObject(), true);
    } catch (error) {
      throw new Error(`Failed to fetch apartment: ${(error as Error).message}`);
    }
  }

  // ------------------------------
  // GET FILTER OPTIONS
  // Returns possible values for filters: locations, projects, amenities, and numeric ranges
  // ------------------------------
  async getFilterOptionsService() {
    try {
      const options = await Promise.all([
        ApartmentModel.distinct("location"),
        ApartmentModel.distinct("project"),
        ApartmentModel.distinct("amenities"),
        ApartmentModel.find().select("price bedrooms bathrooms size").lean(),
      ]);

      const [locations, projects, amenities, stats] = options;

      const prices = stats.map((s) => s.price).filter((p) => p != null);
      const bedrooms = stats.map((s) => s.bedrooms).filter((b) => b != null);
      const bathrooms = stats.map((s) => s.bathrooms).filter((b) => b != null);
      const sizes = stats.map((s) => s.size).filter((s) => s != null);

      return {
        locations: locations.filter((l) => l).sort(),
        projects: projects.filter((p) => p).sort(),
        amenities: amenities.flat().filter((a) => a).sort(),
        minPrice: prices.length ? Math.min(...prices) : 0,
        maxPrice: prices.length ? Math.max(...prices) : 0,
        minBedrooms: bedrooms.length ? Math.min(...bedrooms) : 0,
        maxBedrooms: bedrooms.length ? Math.max(...bedrooms) : 0,
        minBathrooms: bathrooms.length ? Math.min(...bathrooms) : 0,
        maxBathrooms: bathrooms.length ? Math.max(...bathrooms) : 0,
        minSize: sizes.length ? Math.min(...sizes) : 0,
        maxSize: sizes.length ? Math.max(...sizes) : 0,
      };
    } catch (error) {
      throw new Error(`Failed to get filter options: ${(error as Error).message}`);
    }
  }
}
