"use client";

import DetailItem from "@/components/apartment/DetailItem";
import { useApi } from "@/hook/useApi";
import { getApartmentById } from "@/service/apartmentService";
import { DApartment } from "@/types/apartment";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

const ApartmentDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const {
    data: apartment,
    error,
    loading,
  } = useApi<DApartment>(() => getApartmentById(id as string), [id]);

  if (loading) return <p>Loading apartment...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!apartment) return <p>Apartment not found</p>;
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
                  <span className="text-sm font-normal text-gray-600"></span>
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

export default ApartmentDetailPage;
