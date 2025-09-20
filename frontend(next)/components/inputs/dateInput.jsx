import PropTypes from 'prop-types'

const DateInput = ({
  label,
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
  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={label} className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          id={label}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          {...register} // Spread the register function from react-hook-form
          className={`mt-1 block w-full border px-3 py-2 ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-500' : 'focus:ring-main'
          } focus:border-transparent ${inputClassName}`}
          style={{ color: color ? color : '' }}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

DateInput.propTypes = {
  label: PropTypes.string,
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

export default DateInput
