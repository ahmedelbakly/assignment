"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the interface for the apartment data
interface Apartment {
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

// Sample apartment data as fallback
const sampleApartmentData: Apartment = {
  title: "Vali in Alex",
  description:
    "Enjoy ocean views every day in this spacious 2-bedroom apartment.",
  price: 3200,
  location: "Miami Beach, Florida",
  unitNumber: "D-502",
  project: "Seaside Villas",
  bedrooms: 2,
  bathrooms: 2,
  size: 110,
  imageUrl: "https://picsum.photos/600/400?random=4",
  isAvailable: true,
  amenities: ["Balcony", "Pool", "Security"],
  floor: 4,
  yearBuilt: 2017,
  createdAt: "2024-04-20T14:45:00.000Z",
  updatedAt: "2024-04-20T14:45:00.000Z",
};

const ApartmentDetailPage: React.FC = () => {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);

        // If we have an ID, try to fetch from API
        if (id) {
          const response = await axios.get(
            `http://localhost:4000/api/apartments/${id}`
          );

          if (response.status) {
            setApartment(response.data);
            setLoading(false);
            return;
          }
        }

        // Fallback to sample data if no ID or API fetch failed
        setApartment(sampleApartmentData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching apartment:", error);
        setApartment(sampleApartmentData);
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading apartment details...</p>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Apartment Not Found
          </h1>
          <p className="mt-2 text-gray-600">
            The requested apartment could not be loaded.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {apartment.title}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{apartment.location}</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="w-full lg:w-2/3">
            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-lg mb-6">
              <Image
                width={600}
                height={400}
                src={apartment.imageUrl}
                alt={apartment.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
            </div>

            {/* Status badge */}
            <div className="mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  apartment.isAvailable
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {apartment.isAvailable ? "Available" : "Not Available"}
              </span>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-gray-600">{apartment.description}</p>
            </div>

            {/* Details grid */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  label="Price"
                  value={`$${apartment.price.toLocaleString()}`}
                />
                <DetailItem label="Unit Number" value={apartment.unitNumber} />
                <DetailItem label="Project" value={apartment.project} />
                <DetailItem
                  label="Bedrooms"
                  value={apartment.bedrooms.toString()}
                />
                <DetailItem
                  label="Bathrooms"
                  value={apartment.bathrooms.toString()}
                />
                <DetailItem label="Size" value={`${apartment.size} m²`} />
                <DetailItem label="Floor" value={apartment.floor.toString()} />
                <DetailItem
                  label="Year Built"
                  value={apartment.yearBuilt.toString()}
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {apartment.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Pricing & Contact
              </h2>
              <div className="mb-4">
                <p className="text-2xl font-bold text-gray-900">
                  ${apartment.price.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600">
                   
                  </span>
                </p>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 mb-4">
                Contact Agent
              </button>

              <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-md transition duration-200">
                Schedule Tour
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Property Details
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    Listed: {new Date(apartment.createdAt).toLocaleDateString()}
                  </li>
                  <li>
                    Updated:{" "}
                    {new Date(apartment.updatedAt).toLocaleDateString()}
                  </li>
                  <li>Reference: {apartment.unitNumber}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for detail items
const DetailItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};

export default ApartmentDetailPage;
