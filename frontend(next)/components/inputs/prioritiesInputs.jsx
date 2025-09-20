import PropTypes from 'prop-types'
import { useState } from 'react'

const prioritiesData = [
  { id: '1', label: 'Low', color: '#10B981' }, // Green
  { id: '2', label: 'Medium', color: '#eb4b07' }, // Blue
  { id: '3', label: 'High', color: '#EF4444' }, // Red
]

export default function PrioritySelector({ register, errors, value, priorities = prioritiesData }) {
  const [selectedPriority, setSelectedPriority] = useState(value || null)

  return (
    <div className="flex flex-col gap-0 mt-3">
      <label className="text-sm font-medium text-gray-700 mb-3">Priority</label>
      <div className="flex gap-4 justify-start items-start pt-0">
        {priorities.map((priority) => (
          <label
            key={priority.id}
            className={`w-20 cursor-pointer flex flex-col items-center p-3 rounded-md bg-light-gray ${
              selectedPriority === priority.id
                ? 'border-2' // Add border when selected
                : 'border-gray-300'
            }`}
            style={{
              borderColor: selectedPriority === priority.id ? priority.color : '', // Set border color
            }}
            onClick={() => setSelectedPriority(priority.id)}
          >
            <input type="radio" value={priority.id} {...register('priorityId')} className="hidden" />
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center border-4`}
              style={{
                borderColor: priority.color, // Set border color
                backgroundColor: selectedPriority === priority.id ? 'white' : 'white', // Fill with color when selected
              }}
            >
              {selectedPriority === priority.id && (
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: selectedPriority ? priority.color : '',
                  }} // Inner circle (white)
                ></div>
              )}
            </div>
            <span
              className="mt-2 text-sm"
              style={{ color: priority.color }} // Set text color
            >
              {priority.name || priority.label}
            </span>
          </label>
        ))}
      </div>
      <p className="text-red-500 text-md mt-1">{errors?.priorityId?.message}</p>
    </div>
  )
}

// PropTypes Validation
PrioritySelector.propTypes = {
  register: PropTypes.func.isRequired,
  value: PropTypes.string,
  priorities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  errors: PropTypes.shape({
    priorityId: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
}
