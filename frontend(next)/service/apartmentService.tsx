import axios from "axios";
import {
  Apartment,
  ApartmentAndPagination,
  ApartmentFormData,
  DApartment,
} from "@/types/apartment";
import { FilterFormInputs } from "@/components/filter";

const API_URL = "http://localhost:4000/api/apartments";

// ✅ Get all apartments
export async function getAllApartments(
  page: number
): Promise<ApartmentAndPagination> {
  const { data } = await axios.get(API_URL, { params: { page, limit: 8 } });
  return data;
}

// ✅ Search apartments
export async function searchApartments(search: string): Promise<Apartment[]> {
  try {
    const { data } = await axios.get(API_URL, {
      params: { search },
    });

    return data?.data || [];
  } catch (error) {
    console.error("Error searching apartments:", error);
    return [];
  }
}

// ✅ Filter apartments
export async function filterApartments(
  query: FilterFormInputs
): Promise<Apartment[]> {
  const { data } = await axios.get(API_URL, { params: query });
  return data?.data;
}

export const getApartmentById = async (id: string): Promise<DApartment> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createApartment = async (
  data: ApartmentFormData
): Promise<DApartment> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
