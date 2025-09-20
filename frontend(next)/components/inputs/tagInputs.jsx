import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const InlineTagInput = ({ value = [], onChange }) => {
  const [tags, setTags] = useState(value)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  // Add a new tag
  const addTag = (e) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      // e.preventDefault() // Prevent default behavior (e.g., form submission)
      const newTag = inputValue.trim()

      // Validate the tag
      if (newTag && !tags.includes(newTag)) {
        const updatedTags = [...tags, newTag] // Add new tag
        setTags(updatedTags)
        setInputValue('')
        onChange(updatedTags) // Notify parent form of changes
      }
    }
  }

  // Remove a tag
  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index)
    setTags(updatedTags)
    onChange(updatedTags) // Notify parent form of changes
  }

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  // Handle blur (when input loses focus)
  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag({ key: 'Enter' }) // Simulate pressing Enter
    }
  }

  // Sync tags with the value prop
  useEffect(() => {
    setTags(value)
  }, [value])

  return (
    <div className="w-full rounded-md flex flex-col gap-1">
      <h2 className="text-sm">Inline Tag Input</h2>
      <div
        className="flex flex-wrap items-center gap-2 p-1 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-main"
        onClick={() => inputRef.current.focus()} // Focus input when container is clicked
      >
        {/* Display tags inside the input */}
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 rounded-full px-1 py-1 text-xs cursor-pointer"
          >
            <span>{tag}</span>
            <button onClick={() => removeTag(index)} className="ml-2 text-blue-800 hover:text-blue-900">
              ×
            </button>
          </div>
        ))}
        {/* Input field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={addTag}
          onBlur={handleBlur}
          ref={inputRef}
          placeholder={tags.length === 0 ? 'Type and press Enter, Comma, or Space' : ''}
          className="flex-1 min-w-[100px] px-2 py-1 outline-none"
        />
      </div>
    </div>
  )
}

// Add PropTypes validation
InlineTagInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string), // Validate value
  onChange: PropTypes.func.isRequired, // Validate onChange
}

export default InlineTagInput
