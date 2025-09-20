"use client";
import { Apartment } from "@/types/apartment";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  const router = useRouter();

  return (
    <div
      key={apartment.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(`apartment/${apartment.id}`)}
    >
      <Image
        width={200}
        height={184}
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
          <span className="text-sm text-gray-500">{apartment.project}</span>
          <span className="text-sm text-gray-500">{apartment.unitNumber}</span>
        </div>
      </div>
    </div>
  );
}
