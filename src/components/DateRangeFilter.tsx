import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import { useDateRange } from "../store/DateRangeContext";

const DateRangeFilter: React.FC = () => {
  const { setFromDate, setToDate } = useDateRange(); // Get context functions
  const [fromDate, setLocalFromDate] = useState<Date | null>(null);
  const [toDate, setLocalToDate] = useState<Date | null>(null);

  // Function to handle date changes dynamically
  const handleFromDateChange = (date: Date | null) => {
    setLocalFromDate(date);
    const formattedFromDate = date ? format(date, "dd/MM/yyyy") : "";
    setFromDate(formattedFromDate); // Send updated value to context
  };

  const handleToDateChange = (date: Date | null) => {
    setLocalToDate(date);
    const formattedToDate = date ? format(date, "dd/MM/yyyy") : "";
    setToDate(formattedToDate); // Send updated value to context
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4 max-w-md">
      <h2 className="text-lg font-semibold text-gray-700">Filter by Date</h2>
      <div className="space-y-2">
        <div>
          <label htmlFor="from-date" className="block text-sm font-medium text-gray-600">
            From Date:
          </label>
          <ReactDatePicker
            id="from-date"
            selected={fromDate}
            onChange={handleFromDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select From Date"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="to-date" className="block text-sm font-medium text-gray-600">
            To Date:
          </label>
          <ReactDatePicker
            id="to-date"
            selected={toDate}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select To Date"
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
