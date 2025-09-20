import axios from "axios";
import { Apartment } from "@/types/apartment";
import { FilterFormInputs } from "@/components/filter";

const API_URL = "http://localhost:4000/api/apartments";

// ✅ Get all apartments
export async function getAllApartments(): Promise<Apartment[]> {
  const { data } = await axios.get(API_URL);
  return data?.data;
}

// ✅ Search apartments
export async function searchApartments(search: string): Promise<Apartment[]> {
  const { data } = await axios.get(API_URL, { params: { search } });
  return data?.data;
}

// ✅ Filter apartments
export async function filterApartments(
  query: FilterFormInputs
): Promise<Apartment[]> {
  const { data } = await axios.get(API_URL, { params: query });
  return data?.data;
}
