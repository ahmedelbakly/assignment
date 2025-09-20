import { Document, Schema, model, Types } from "mongoose";

export interface IApartment extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  unitNumber: string;
  project: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  imageUrl: string;
  isAvailable: boolean;
  amenities?: string[];
  floor?: number;
  yearBuilt?: number;
  searchText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApartmentSchema = new Schema<IApartment>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      index: true,
    },
    unitNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },
    project: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    floor: {
      type: Number,
      required: true,
    },
    yearBuilt: {
      type: Number,
      required: true,
    },
    searchText: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

ApartmentSchema.index({ unitNumber: 1, project: 1 }, { unique: true });

// Index for better search performance
ApartmentSchema.index({ price: 1 });
ApartmentSchema.index({ bedrooms: 1 });
ApartmentSchema.index({ size: 1 });
ApartmentSchema.index({ searchText: 1 });

// Static method to find available apartments
ApartmentSchema.statics.findAvailable = function () {
  return this.find({ isAvailable: true });
};

const Apartment = model<IApartment>("Apartment", ApartmentSchema);

export default Apartment;
