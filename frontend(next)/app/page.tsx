"use client";
import FilterOverlay, { FilterFormInputs } from "@/components/filter";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface Apartment {
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

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  // ✅ Extract fetchAllApartments function
  const fetchAllApartments = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:4000/api/apartments");
      setApartments(data?.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setError(
        "Failed to load apartments. Make sure the backend is running on port 4000."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load apartments initially
  useEffect(() => {
    fetchAllApartments();
  }, [fetchAllApartments]);

  // ✅ Search effect
  useEffect(() => {
    async function fetchBySearch() {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:4000/api/apartments", {
          params: { search: searchTerm },
        });
        setApartments(data?.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        setError(
          "Failed to load apartments. Make sure the backend is running on port 4000."
        );
      } finally {
        setLoading(false);
      }
    }

    if (searchTerm.length > 4) {
      fetchBySearch();
    } else if (!isFiltered) {
      // ✅ restore full list if no filter is active
      fetchAllApartments();
    }
  }, [searchTerm, fetchAllApartments, isFiltered]);

  // Show filter overlay toggle
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  // ✅ Handle filter apply
  async function fetchApartmentsOnFilter(query: FilterFormInputs) {
    try {
      setLoading(true);
      const { data, status } = await axios.get("http://localhost:4000/api/apartments", {
        params: query,
      });

      if (status === 200) {
        setApartments(data?.data);
        setIsFiltered(true);
        handleShowFilter();
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setError(
        "Failed to load apartments. Make sure the backend is running on port 4000."
      );
    } finally {
      setLoading(false);
    }
  }

  // ✅ Improved clear filter
  const handleClearFilter = () => {
    setIsFiltered(false);
    setSearchTerm(""); // clear search as well
    fetchAllApartments(); // reload all apartments
  };

  // Search input change
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // --- UI ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading apartments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {showFilter && (
        <FilterOverlay
          onFilter={fetchApartmentsOnFilter}
          onClose={handleShowFilter}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white">List Apartments</h1>

        {/* Search box */}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 sm:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
            onClick={isFiltered ? handleClearFilter : handleShowFilter}
          >
            {isFiltered ? "Clear Filter" : "Filter"}
          </button>
          <button
            onClick={() => router.push("apartment/add-new")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
          >
            Add New Apartment
          </button>
        </div>
      </div>

      {apartments.length === 0 ? (
        <div className="text-center text-gray-500">
          No apartments found. Make sure your backend has data.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apartments.map((apartment) => (
            <div 
              key={apartment.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              onClick={() => router.push(`apartment/${apartment.id}`)}
              
            >
              <img
                src={apartment.imageUrl}
                alt={apartment.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60";
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {apartment.title}
                </h2>

                <p className="text-gray-600 mb-2">{apartment.location}</p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${apartment.price.toLocaleString()}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      apartment.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {apartment.isAvailable ? "Available" : "Taken"}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>{apartment.bedrooms} bed</span>
                  <span>{apartment.bathrooms} bath</span>
                  <span>{apartment.size} m²</span>
                </div>

                <p className="text-gray-700 text-sm line-clamp-2">
                  {apartment.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {apartment.project}
                  </span>
                  <span className="text-sm text-gray-500">
                    {apartment.unitNumber}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
