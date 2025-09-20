import { useRef, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { CalendarDays } from 'lucide-react'
import PropTypes from 'prop-types'

export default function CustomStyledDatePicker({ value, setValue, minDate }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null) // anchor element

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        minDate={minDate}
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
        className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm shadow transition hover:bg-gray-100"
      >
        <span>{dayjs(value).format('DD MMM, YYYY')}</span>
        <CalendarDays size={20} className="dark:text-primary-300 text-main" />
      </button>
    </LocalizationProvider>
  )
}

CustomStyledDatePicker.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func,
  minDate: Dayjs | undefined,
}
