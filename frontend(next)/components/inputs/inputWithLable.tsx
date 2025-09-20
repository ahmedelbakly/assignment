import Image from "next/image";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface MainInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn; // 👈 for react-hook-form register
  error?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  value?: string | number;
  color?: string;
  icon?: string; // image URL for now (can also type as ReactNode if using react-icons)
}

const MainInput: React.FC<MainInputProps> = ({
  label,
  type = "text",
  placeholder = "",
  register,
  error,
  className = "",
  labelClassName = "",
  inputClassName = "",
  disabled,
  value,
  color,
  icon,
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={label}
          className={`text-sm font-medium text-gray-700 flex items-center gap-1 ${labelClassName}`}
        >
          {icon && <Image src={icon} alt={label} />}
          <span>{label}</span>
        </label>
      )}
      <input
        type={type}
        id={label}
        autoComplete="off"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        {...register} // ✅ react-hook-form register spread
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-main"
        } focus:border-transparent ${inputClassName}`}
        style={{ color: color || undefined }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default MainInput;
