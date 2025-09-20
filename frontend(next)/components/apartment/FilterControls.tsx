"use client";

export default function FilterControls({
  isFiltered,
  onFilterToggle,
  onClearFilter,
  onAddNew,
}: {
  isFiltered: boolean;
  onFilterToggle: () => void;
  onClearFilter: () => void;
  onAddNew: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
        onClick={isFiltered ? onClearFilter : onFilterToggle}
      >
        {isFiltered ? "Clear Filter" : "Filter"}
      </button>
      <button
        onClick={onAddNew}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
      >
        Add New Apartment
      </button>
    </div>
  );
}
