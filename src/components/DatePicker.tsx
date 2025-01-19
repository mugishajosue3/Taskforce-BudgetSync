import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type DatePickerProps = {
  label?: string;
  value?: string; // Current date in dd/mm/yyyy format
  onChange: (date: string) => void;
  error?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({ 
  label, 
  value, 
  onChange,
  error 
}) => {
  const [touched, setTouched] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy");
      onChange(formattedDate);
    } else {
      onChange(""); // Clear the date if null is selected
    }
    setTouched(true);
  };

  const showError = touched && !value;

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
      )}
      <ReactDatePicker
        selected={value ? new Date(value.split("/").reverse().join("-")) : null}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className={`border p-2 rounded w-full ${
          showError ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholderText="Select a date"
        required
        onBlur={() => setTouched(true)}
      />
      {showError && (
        <p className="text-red-500 text-sm mt-1">
          {error || "Please select a date"}
        </p>
      )}
    </div>
  );
};

export default DatePicker;