import PropTypes from 'prop-types'

const CustomCheckbox = ({ label, name, checked, onChange, register, error }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          {...register?.(name)}
          className="absolute opacity-0 h-0 w-0"
        />
        <div className={`flex items-center justify-center w-5 h-5 border-2 rounded transition-all 
          ${checked ? 'border-[#F54D21] bg-[#F54D21]' : 'border-gray-300 bg-white'}
          group-hover:border-[#F54D21]`}
        >
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="text-gray-700 group-hover:text-[#F54D21] transition-colors">
        {label}
      </span>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  )
}

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  register: PropTypes.func,
  error: PropTypes.string,
}

export default CustomCheckbox