import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const statusData = [
  { id: 'active', label: 'Active', color: '#10B981' }, // Green
  { id: 'inactive', label: 'Inactive', color: '#EF4444' }, // Red
]

export default function StatusSelector({ register, errors, value, statuses = statusData }) {
  const [selectedStatus, setSelectedStatus] = useState(value || null)

  useEffect(() => {
    setSelectedStatus(value || null)
  }, [value])

  return (
    <div className="flex flex-col gap-0 mt-3">
      <label className="text-sm font-medium text-gray-700 mb-3">Status</label>
      <div className="flex gap-4 justify-start items-start pt-0">
        {statuses?.map((status) => (
          <label
            key={status.id}
            className={`w-20 cursor-pointer flex flex-col items-center p-3 rounded-md bg-light-gray ${
              selectedStatus === status.id
                ? 'border-2' // Add border when selected
                : 'border-gray-300'
            }`}
            style={{
              borderColor: selectedStatus === status.id ? status.color : '', // Set border color
            }}
            onClick={() => setSelectedStatus(status?.id)}
          >
            <input type="radio" value={status.id} {...register('status')} className="hidden" />
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center border-4`}
              style={{
                borderColor: status.color, // Set border color
                backgroundColor: selectedStatus === status.id ? 'white' : 'white', // Fill with color when selected
              }}
            >
              {selectedStatus === status.id && (
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: selectedStatus ? status.color : '',
                  }} // Inner circle (white)
                ></div>
              )}
            </div>
            <span
              className="mt-2 text-sm"
              style={{ color: status.color }} // Set text color
            >
              {status.label}
            </span>
          </label>
        ))}
      </div>
      <p className="text-red-500 text-md mt-1">{errors?.status?.message}</p>
    </div>
  )
}

// PropTypes Validation
StatusSelector.propTypes = {
  register: PropTypes.func.isRequired,
  value: PropTypes.string,
  statuses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ),
  errors: PropTypes.shape({
    status: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
}
