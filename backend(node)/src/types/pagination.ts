export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export interface ApartmentFilter {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minSize?: number;
  maxSize?: number;
  location?: string;
  project?: string;
  isAvailable?: boolean;
  amenities?: string[];
}

export interface ApartmentSearchParams {
  search?: string | undefined;
  pagination: PaginationParams;
  filters?: ApartmentFilter | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// Validation constants
export const PAGINATION_LIMITS = {
  MIN_PAGE: 1,
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10
} as const;