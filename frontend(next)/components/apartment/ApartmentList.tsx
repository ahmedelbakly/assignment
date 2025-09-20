"use client";
import { Apartment } from "@/types/apartment";
import ApartmentCard from "./ApartmentCard";

export default function ApartmentList({ apartments }: { apartments: Apartment[] }) {
  if (apartments.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No apartments found. Make sure your backend has data.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
}
