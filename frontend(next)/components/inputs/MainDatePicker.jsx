import { useRef, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronDown } from 'lucide-react'
import PropTypes from 'prop-types'

export default function MainDatePicker({ value, setValue, minDate }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null) // anchor element

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        minDate={minDate}
        value={value}
        onChange={(newValue) => {
          if (newValue) setValue(newValue)
          setOpen(false)
        }}
        enableAccessibleFieldDOMStructure={false}
        slots={{
          textField: () => null, // hide input
        }}
        slotProps={{
          popper: {
            anchorEl: buttonRef.current,
          },
        }}
      />
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-fit items-center gap-4 rounded-lg border bg-gray-100 px-4 py-1 text-sm shadow transition hover:bg-gray-200"
      >
        <span>{dayjs(value).format('DD-MMM YYYY')}</span>
        <ChevronDown size={18} />
      </button>
    </LocalizationProvider>
  )
}

MainDatePicker.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func,
  minDate: Dayjs,
}
