import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type DatePickerProps = {
  label?: string;
  value?: string; // Current date in dd/mm/yyyy format
  onChange: (date: string) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      // Format date to dd/mm/yyyy
      const formattedDate = format(date, "dd/MM/yyyy");
      onChange(formattedDate);
    }
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <br />
      <ReactDatePicker
        selected={value ? new Date(value.split("/").reverse().join("-")) : null}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // Display format
        className="border p-2 rounded w-full"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default DatePicker;
