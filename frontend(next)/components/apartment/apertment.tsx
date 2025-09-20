"use client";
import FilterOverlay, { FilterFormInputs } from "@/components/filter";
import { Apartment } from "@/types/apartment";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ErrorState, LoadingState } from "./LoadingError";
import SearchBar from "./searchBar";
import FilterControls from "./FilterControls";
import ApartmentList from "./ApartmentList";
import { filterApartments, getAllApartments, searchApartments } from "@/service/apartmentService";

// ✅ import service functions


export default function ApartmentPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const fetchAllApartments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllApartments();
      setApartments(data);
      setError(null);
    } catch {
      setError("Failed to load apartments. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllApartments();
  }, [fetchAllApartments]);

  useEffect(() => {
    async function fetchBySearch() {
      try {
        setLoading(true);
        const data = await searchApartments(searchTerm);
        setApartments(data);
        setError(null);
      } catch {
        setError("Failed to load apartments. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    }

    if (searchTerm.length > 4) {
      fetchBySearch();
    } else if (!isFiltered) {
      fetchAllApartments();
    }
  }, [searchTerm, fetchAllApartments, isFiltered]);

  async function fetchApartmentsOnFilter(query: FilterFormInputs) {
    try {
      setLoading(true);
      const data = await filterApartments(query);
      setApartments(data);
      setIsFiltered(true);
      setShowFilter(false);
    } catch {
      setError("Failed to load apartments. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  const handleClearFilter = () => {
    setIsFiltered(false);
    setSearchTerm("");
    fetchAllApartments();
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="min-h-screen p-8">
      {showFilter && (
        <FilterOverlay
          onFilter={fetchApartmentsOnFilter}
          onClose={() => setShowFilter(false)}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">List Apartments</h1>
        <SearchBar
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterControls
          isFiltered={isFiltered}
          onFilterToggle={() => setShowFilter(!showFilter)}
          onClearFilter={handleClearFilter}
          onAddNew={() => router.push("apartment/add-new")}
        />
      </div>

      <ApartmentList apartments={apartments} />
    </div>
  );
}
