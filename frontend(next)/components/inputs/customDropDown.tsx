import { useEffect, useState, ChangeEvent } from "react";

interface DropdownOption {
  id?: string | number;
  value?: string;
  label?: string;
  name?: string;
  username?: string;
  phone?: string;
}

interface CustomDropdownProps {
  label?: string;
  options: DropdownOption[];
  error?: string;
  className?: string;
  labelClassName?: string;
  dropdownClassName?: string;
  onSelect: (id?: string | number) => void;
  onSearch?: (searchTerm: string) => void;
  isSearchOuter?: boolean;
  defaultValue?: DropdownOption | null;
  reset?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options = [],
  error,
  className = "",
  labelClassName = "",
  dropdownClassName = "",
  onSelect,
  onSearch = () => {},
  isSearchOuter = false,
  defaultValue,
  reset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedOption(defaultValue || null);
    if (defaultValue?.id) {
      onSelect(defaultValue.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    if (reset) {
      setSelectedOption(null);
    }
  }, [reset]);

  // Filter options based on search query
  const filteredOptions = options.filter(
    (option) =>
      option?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option?.phone?.includes(searchQuery.toLowerCase()) ||
      option?.label?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (option.id) {
      onSelect(option.id);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          className={`mb-1 block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full border px-4 py-2 ${
            error ? "border-red-500" : "border-gray-300"
          } ${isOpen ? "rounded-t-lg" : "rounded-lg"} flex items-center justify-between bg-white shadow-sm transition duration-300 focus:outline-none ${dropdownClassName}`}
        >
          <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
            {selectedOption
              ? selectedOption.name ||
                selectedOption.username ||
                selectedOption.value ||
                selectedOption.label
              : "Select an option"}
          </span>
          <svg
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full rounded-b-lg border border-gray-300 bg-white shadow-lg">
            {/* Search Input */}
            <div className="border-b border-gray-200 p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) =>
                  isSearchOuter ? handleSearch(e) : setSearchQuery(e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-2"
              />
            </div>

            {/* Dropdown Options */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.id || option.value}
                    onClick={() => handleOptionClick(option)}
                    className="cursor-pointer px-4 py-2 transition duration-200 hover:bg-blue-100"
                  >
                    {option.name || option.username || option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomDropdown;
