import { Request, Response, NextFunction } from "express";
import ApartmentService from "../../service/apartment.service";
import { ApartmentFilter } from "../../types/pagination";

const apartmentService = new ApartmentService();

export default class ApartmentController {
  // ✅ CREATE APARTMENT
  async createApartment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await apartmentService.createApartmentService(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // ✅ GET ALL APARTMENTS WITH SEARCH, FILTERS, AND PAGINATION
  async getAllApartments(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        search,
        page,
        limit,
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
        minSize,
        maxSize,
        location,
        project,
        isAvailable,
        amenities,
      } = req.query;

      // Build filter object
      const filters: ApartmentFilter = {};

      // Price filters
      if (minPrice) filters.minPrice = Number(minPrice);
      if (maxPrice) filters.maxPrice = Number(maxPrice);

      // Bedroom filters
      if (minBedrooms) filters.minBedrooms = Number(minBedrooms);
      if (maxBedrooms) filters.maxBedrooms = Number(maxBedrooms);

      // Bathroom filters
      if (minBathrooms) filters.minBathrooms = Number(minBathrooms);
      if (maxBathrooms) filters.maxBathrooms = Number(maxBathrooms);

      // Size filters
      if (minSize) filters.minSize = Number(minSize);
      if (maxSize) filters.maxSize = Number(maxSize);

      // Text filters
      if (location) filters.location = String(location);
      if (project) filters.project = String(project);

      // Boolean filter
      if (isAvailable !== undefined) {
        filters.isAvailable = isAvailable === "true" || isAvailable === "1";
      }

      // Array filter
      if (amenities) {
        filters.amenities = Array.isArray(amenities)
          ? amenities.map((a) => String(a))
          : [String(amenities)];
      }

      const result = await apartmentService.getAllApartmentsService({
        search: search ? String(search) : undefined,
        pagination: {
          page: page ? Number(page) : 1,
          limit: limit ? Number(limit) : 10,
        },
        filters: Object.keys(filters).length > 0 ? filters : undefined,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // ✅ GET APARTMENT BY ID
  async getApartmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Apartment ID is required");
      }
      const apartment = await apartmentService.getApartmentByIdService(id);
      res.status(200).json(apartment);
    } catch (error) {
      next(error);
    }
  }

  // ✅ UPDATE APARTMENT

  // ✅ DELETE APARTMENT

  // ✅ GET FILTER OPTIONS
  async getFilterOptions(req: Request, res: Response, next: NextFunction) {
    try {
      const options = await apartmentService.getFilterOptionsService();
      res.status(200).json(options);
    } catch (error) {
      next(error);
    }
  }
}
