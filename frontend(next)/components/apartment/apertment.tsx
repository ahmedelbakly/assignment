"use client";
import FilterOverlay, { FilterFormInputs } from "@/components/filter";
import { Apartment, TPagination } from "@/types/apartment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorState, LoadingState } from "./LoadingError";
import SearchBar from "./searchBar";
import FilterControls from "./FilterControls";
import ApartmentList from "./ApartmentList";
import {
  filterApartments,
  getAllApartments,
  searchApartments,
} from "@/service/apartmentService";
import Pagination from "../inputs/paginations";

export default function ApartmentPage() {
  // handle state
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [apartmentsList, setApartmentsList] = useState<Apartment[]>([]);

  // get all apartments with pagination
  useEffect(() => {
    (async () => {
      setLoading(true);
      const apartments = await getAllApartments(page);
      if (apartments?.data) {
        setApartmentsList(apartments.data);
        setPagination(apartments.pagination);
        setLoading(false);
      }
    })();
  }, [page]);

  // handle search with search text
  useEffect(() => {
    if (searchTerm.length > 3) {
      // search with useApi
      (async () => {
        const searchedApartments = await searchApartments(searchTerm);
        if (searchedApartments) {
          setApartmentsList(searchedApartments);
          setIsSearch(true);
        }
      })();
    } else {
      (async () => {
        const searchedApartments = await getAllApartments(1);
        if (searchedApartments) {
          setApartmentsList(searchedApartments.data);
          setIsSearch(false);
        }
      })();
    }
  }, [searchTerm]);

  // filter handler
  const fetchApartmentsOnFilter = async (query: FilterFormInputs) => {
    try {
      const filteredApartments = await filterApartments(query);
      if (filteredApartments) {
        setApartmentsList(filteredApartments);
        setIsFiltered(true);
        setShowFilter(false);
      }
    } catch {
      console.error("Failed to filter apartments.");
      setError("Failed to filter apartments.");
    }
  };

  

  // handle clear filter
  const handleClearFilter = async () => {
    setIsFiltered(false);
    setIsSearch(false);
    setSearchTerm("");
    const apartments = await getAllApartments(1);
    if (apartments?.data) {
      setApartmentsList(apartments.data);
      setPagination(apartments.pagination);
    }
  };
  // handle error and loading  with simple code
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
        {/* search bar */}
        <SearchBar
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* filter controls */}
        <FilterControls
          isFiltered={isFiltered}
          onFilterToggle={() => setShowFilter(!showFilter)}
          onClearFilter={handleClearFilter}
          onAddNew={() => router.push("apartment/add-new")}
        />
      </div>
      {/* apartment list */}
      <ApartmentList apartments={apartmentsList || []} />
      <div className="flex justify-center items-center mt-4">
        {isSearch || isFiltered ? null : (
          <Pagination
            totalPages={pagination.totalPages}
            currentPage={pagination.page}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
