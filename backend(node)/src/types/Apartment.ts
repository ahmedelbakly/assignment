export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  unitNumber?: string;
  project: string;
  bedrooms: number;
  bathrooms: number;
  size?: number;
  imageUrl: string;
  isAvailable: boolean;
  amenities?: string[];
  floor?: number;
  yearBuilt?: number;
  searchText?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ApartmentsResponse = Apartment[];
