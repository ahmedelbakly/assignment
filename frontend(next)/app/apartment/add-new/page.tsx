"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FaHome, FaSave } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AMENITIES_OPTIONS, PROJECTS } from "@/data/fakeApartmentData";
import { ApartmentFormData } from "@/types/apartment";

// ✅ Enhanced Validation Schema
const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be less than 100 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Must be positive")
    .typeError("Price must be a number"),
  location: yup
    .string()
    .required("Location is required")
    .max(200, "Location must be less than 200 characters"),
  unitNumber: yup
    .string()
    .required("Unit Number is required")
    .max(20, "Unit number must be less than 20 characters"),
  project: yup.string().required("Project is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters")
    .required("Description is required"),
  bedrooms: yup
    .number()
    .required("Bedrooms are required")
    .min(0, "Bedrooms cannot be negative")
    .max(20, "That's too many bedrooms!")
    .integer("Must be a whole number")
    .typeError("Bedrooms must be a number"),
  bathrooms: yup
    .number()
    .required("Bathrooms are required")
    .min(1, "Must have at least 1 bathroom")
    .max(20, "That's too many bathrooms!")
    .typeError("Bathrooms must be a number"),
  size: yup
    .number()
    .required("Size is required")
    .positive("Size must be positive")
    .max(100000, "Size seems too large")
    .typeError("Size must be a number"),
  floor: yup
    .number()
    .required("Floor is required")
    .min(0, "Floor cannot be negative")
    .max(200, "Floor seems too high")
    .integer("Must be a whole number")
    .typeError("Floor must be a number"),
  yearBuilt: yup
    .number()
    .required("Year built is required")
    .min(1800, "Year seems too old")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future")
    .integer("Must be a whole number")
    .typeError("Year built must be a number"),
  imageUrl: yup.string().required("Image URL is required"),
  amenities: yup.array().default([]),

  isAvailable: yup.boolean().required("Availability is required"),
});

// Custom Input Component
const MainInput = ({
  label = "",
  type = "text",
  placeholder = "",
  register = {},
  error = "",
  ...props
}) => (
  <div className="flex flex-col">
    <label className="block mb-2 font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
      {...register}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function ApartmentForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<ApartmentFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      // amenities: [],
      isAvailable: true,
    },
  });

  console.log(errors);
  // on submit handler simple code if project is big use redux or zustand state management
  const onSubmit: SubmitHandler<ApartmentFormData> = async (
    data: ApartmentFormData
  ) => {
    setIsSubmitting(true);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/apartments",
        data
      );
      if (response.status === 201) {
        console.log("Apartment added successfully:", response.data);
        toast.success("Apartment added successfully");
        setLoading(false);
        router.push("/");

        // Reset form or redirect here if needed
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error adding apartment:", error);
      toast.error(error?.response?.data);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // handle on cancel add apartment forward to home
  const onCancel = () => {
    router.push("/");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 shadow-xl rounded-2xl text-gray-800">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full">
          <FaHome className="text-3xl text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold ml-4">Add New Apartment</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <MainInput
          label="Title"
          placeholder="e.g., Spacious 2-Bedroom with Ocean View"
          register={register("title")}
          error={errors.title?.message}
        />

        {/* Price */}
        <MainInput
          label="Price ($)"
          type="number"
          placeholder="e.g., 2500"
          register={register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />

        {/* Location */}
        <MainInput
          label="Location"
          placeholder="e.g., 123 Main St, City, State"
          register={register("location")}
          error={errors.location?.message}
        />

        {/* Unit Number */}
        <MainInput
          label="Unit Number"
          placeholder="e.g., Unit 5B"
          register={register("unitNumber")}
          error={errors.unitNumber?.message}
        />

        {/* Project (Dropdown) */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">
            Project
          </label>
          <Controller
            control={control}
            name="project"
            render={({ field }) => (
              <select
                {...field}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select a project</option>
                {PROJECTS.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.project && (
            <p className="text-red-500 text-sm mt-1">
              {errors.project.message}
            </p>
          )}
        </div>

        {/* Description - textarea full row */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[120px]"
            placeholder="Describe the apartment features, neighborhood, and unique selling points..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Bedrooms */}
        <MainInput
          label="Bedrooms"
          type="number"
          placeholder="e.g., 2"
          register={register("bedrooms", { valueAsNumber: true })}
          error={errors.bedrooms?.message}
        />

        {/* Bathrooms */}
        <MainInput
          label="Bathrooms"
          type="number"
          placeholder="e.g., 2"
          step="0.5"
          register={register("bathrooms", { valueAsNumber: true })}
          error={errors.bathrooms?.message}
        />

        {/* Size */}
        <MainInput
          label="Size (sqft)"
          type="number"
          placeholder="e.g., 1200"
          register={register("size", { valueAsNumber: true })}
          error={errors.size?.message}
        />

        {/* Floor */}
        <MainInput
          label="Floor"
          type="number"
          placeholder="e.g., 5"
          register={register("floor", { valueAsNumber: true })}
          error={errors.floor?.message}
        />

        {/* Year Built */}
        <MainInput
          label="Year Built"
          type="number"
          placeholder="e.g., 2015"
          register={register("yearBuilt", { valueAsNumber: true })}
          error={errors.yearBuilt?.message}
        />

        <div className="md:col-span-2">
          <MainInput
            label="Image URL"
            type="url"
            register={register("imageUrl")}
          />
        </div>

        {/* Amenities - multi select */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">
            Amenities
          </label>
          <Controller
            control={control}
            name="amenities"
            render={({ field }) => (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AMENITIES_OPTIONS.map((amenity) => (
                  <label
                    key={amenity.value}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={amenity.value}
                      checked={
                        Array.isArray(field.value) &&
                        field.value.includes(amenity.value)
                      }
                      onChange={() => {
                        const current = Array.isArray(field.value)
                          ? field.value
                          : [];
                        const newValue = current.includes(amenity.value)
                          ? current.filter((v) => v !== amenity.value)
                          : [...current, amenity.value];
                        field.onChange(newValue);
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="text-gray-700">{amenity.label}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.amenities && (
            <p className="text-red-500 text-sm mt-2">
              {errors.amenities.message as string}
            </p>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center md:col-span-2 mt-2">
          <Controller
            control={control}
            name="isAvailable"
            render={({ field }) => (
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full ${
                      field.value ? "bg-blue-600" : "bg-gray-300"
                    } transition-colors`}
                  ></div>
                  <div
                    className={`absolute top-0.5 left-0.5 bg-white border w-5 h-5 rounded-full transition-transform ${
                      field.value ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <span className="ml-3 text-gray-700 font-medium">
                  Available for rent
                </span>
              </label>
            )}
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center px-5 py-2 rounded-lg bg-gray-500 text-white font-medium text-base md:text-lg 
               hover:bg-gray-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center px-5 py-2 rounded-lg bg-blue-600 text-white font-medium text-base md:text-lg 
               hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save Apartment
              </>
            )}
          </button>
        </div>
      </form>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Image Preview</h3>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-auto">
              <Image
                src={previewImage}
                alt="Preview"
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
