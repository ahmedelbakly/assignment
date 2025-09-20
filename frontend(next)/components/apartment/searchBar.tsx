"use client";

export default function SearchBar({
  searchTerm,
  onChange,
}: {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="flex-1 sm:w-64 border border-gray-300 rounded-lg px-4 py-2 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      value={searchTerm}
      onChange={onChange}
    />
  );
}
