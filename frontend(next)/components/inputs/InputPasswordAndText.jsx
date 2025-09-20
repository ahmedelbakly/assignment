import { useState } from 'react'
import PropTypes from 'prop-types'
import { Eye, EyeOff } from 'lucide-react'

const Input = ({
  label,
  type = 'text', // Default to text input
  placeholder = '',
  register,
  error,
  className = '',
  labelClassName = '',
  inputClassName = '',
  disabled,
  value,
  color,
}) => {
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev) // Toggle password visibility
  }

  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={label} className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === 'password' && !showPassword ? 'password' : 'text'} // Toggle input type for password
          id={label}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          {...register} // Spread the register function from react-hook-form
          className={`mt-1 block w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-500' : 'focus:ring-main'
          } focus:border-transparent ${inputClassName}`}
          style={{ color: color ? color : '' }}
        />
        {/* Show/Hide Password Icon (only for password type) */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" /> // Hide password icon
            ) : (
              <Eye className="h-5 w-5 text-gray-500" /> // Show password icon
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string, // Input type (e.g., text, password)
  placeholder: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  color: PropTypes.string,
}

export default Input
