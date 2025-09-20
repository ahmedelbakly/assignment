"use client";
import { useForm } from "react-hook-form";
import MainInput from "./inputs/inputWithLable";

export interface FilterFormInputs {
  minPrice?: number | null;
  maxPrice?: number | null;
  minBedrooms?: number | null;
  maxBedrooms?: number | null;
  minBathrooms?: number | null;
  maxBathrooms?: number | null;
  minSize?: number | null;
  maxSize?: number | null;
  location?: string | null;
  project?: string | null;
  isAvailable?: string | null; // keep as string ("true"/"false") for query
}

interface FilterProps {
  onFilter: (data: FilterFormInputs) => void;
  onClose: () => void;
}

export default function FilterOverlay({ onFilter, onClose }: FilterProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterFormInputs>({
    defaultValues: {
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      minBathrooms: null,
      maxBathrooms: null,
      minSize: null,
      maxSize: null,
      location: null,
      project: null,
      isAvailable: null,
    },
  });
  const onSubmit = (data: FilterFormInputs) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null && value !== 0)
    ) as FilterFormInputs;

    onFilter(filteredData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white w-full h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            Filter Apartments
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Price */}
          <MainInput
            label="Min Price"
            type="number"
            placeholder="e.g., 1000"
            register={register("minPrice", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            error={errors.minPrice?.message}
          />
          <MainInput
            label="Max Price"
            type="number"
            placeholder="e.g., 5000"
            register={register("maxPrice", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            error={errors.maxPrice?.message}
          />

          {/* Bedrooms */}
          <MainInput
            label="Min Bedrooms"
            type="number"
            placeholder="e.g., 2"
            register={register("minBedrooms", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            error={errors.minBedrooms?.message}
          />
          <MainInput
            label="Max Bedrooms"
            type="number"
            placeholder="e.g., 5"
            register={register("maxBedrooms", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            error={errors.maxBedrooms?.message}
          />

          {/* Bathrooms */}
          <MainInput
            label="Min Bathrooms"
            type="number"
            placeholder="e.g., 1"
            register={register("minBathrooms", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            error={errors.minBathrooms?.message}
          />
          <MainInput
            label="Max Bathrooms"
            type="number"
            placeholder="e.g., 3"
            register={register("maxBathrooms", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            error={errors.maxBathrooms?.message}
          />

          {/* Size */}
          <MainInput
            label="Min Size (m²)"
            type="number"
            placeholder="e.g., 50"
            register={register("minSize", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            error={errors.minSize?.message}
          />
          <MainInput
            label="Max Size (m²)"
            type="number"
            placeholder="e.g., 200"
            register={register("maxSize", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            error={errors.maxSize?.message}
          />

          {/* Location */}
          <MainInput
            label="Location"
            type="text"
            placeholder="e.g., Miami"
            register={register("location", {
              setValueAs: (v) => (v === "" ? null : v),
            })}
            error={errors.location?.message}
          />

          {/* Project */}
          <MainInput
            label="Project"
            type="text"
            placeholder="e.g., Seaside Villas"
            register={register("project", {
              setValueAs: (v) => (v === "" ? null : v),
            })}
            error={errors.project?.message}
          />

          {/* Availability */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Availability
            </label>
            <select
              {...register("isAvailable", {
                setValueAs: (v) => (v === "" ? null : v),
              })}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Any</option>
              <option value="true">Available</option>
              <option value="false">Taken</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-full flex gap-3 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
