export interface Apartment {
  id: string;
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
}


export interface DApartment {
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
  amenities: string[];
  floor: number;
  yearBuilt: number;
  createdAt: string;
  updatedAt: string;
}




export interface ApartmentFormData {
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
  amenities: string[]; // <-- required now
  floor: number;
  yearBuilt: number;
  isAvailable: boolean;
}

export interface TPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}



export type ApartmentAndPagination ={
  data: Apartment[];
  pagination: TPagination;
}