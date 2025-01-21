import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface DatePickerProps {
  label: string
  value: string
  onChange: (date: string) => void
  error: string
  className?: string
  styles?: (theme: any) => any
}

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

  const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const showError = touched && !value;

  return (
    <div className="flex flex-col w-full max-w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
      )}
      <div className="relative w-full">
        <ReactDatePicker
          selected={value ? parseDate(value) : null}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className={`
            w-full
            px-4
            py-2
            rounded-md
            border
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            dark:bg-transparent 
            dark:text-white
            ${showError 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600'
            }
          `}
          placeholderText="Select date"
          onBlur={() => setTouched(true)}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg 
            className="h-5 w-5 text-gray-500 dark:text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>
      {showError && (
        <p className="text-sm text-red-500 mt-1">
          {error || "Please select a date"}
        </p>
      )}

<style>{`
        .react-datepicker-wrapper,
        .react-datepicker__input-container {
          width: 100%;
        }
        .react-datepicker-wrapper,
        .react-datepicker__input-container {
          width: 100%;
        }

        .react-datepicker {
          font-family: inherit;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .react-datepicker__header {
          background-color: #f3f4f6;
          border-bottom: 1px solid #e5e7eb;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          padding-top: 0.5rem;
        }

        .react-datepicker__current-month {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .react-datepicker__day-name {
          color: #6b7280;
        }

        .react-datepicker__day--selected {
          background-color: #3b82f6;
          color: white;
        }

        .react-datepicker__day--keyboard-selected {
          background-color: #93c5fd;
          color: white;
        }

        .react-datepicker__day:hover {
          background-color: #e5e7eb;
        }

        @media (max-width: 640px) {
          .react-datepicker__day {
            padding: 0.5rem;
            line-height: 1rem;
          }
          
          .react-datepicker__day-name {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DatePicker;