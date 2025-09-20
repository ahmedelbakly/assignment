"use client";
import { ChangeEvent, MouseEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClick?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onClick,
  onClear,
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onClick) onClick(value);
  };

  return (
    <div className={`relative ${className} w-full`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-main"
      />

      {/* divider */}
      <div className="absolute right-12 top-1 h-8 w-[1px] bg-gray-400"></div>

      {/* search icon */}
      <div
        className="absolute inset-y-0 right-4 flex cursor-pointer items-center pl-3"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* clear button */}
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 hover:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
