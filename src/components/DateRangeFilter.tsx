import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type DateRangeFilterProps = {
  onFilter: (fromDate: string, toDate: string) => void;
};

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilter }) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleFilter = () => {
    const formattedFromDate = fromDate ? format(fromDate, "dd/MM/yyyy") : "";
    const formattedToDate = toDate ? format(toDate, "dd/MM/yyyy") : "";
    onFilter(formattedFromDate, formattedToDate);
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
            onChange={(date) => setFromDate(date)}
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
            onChange={(date) => setToDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select To Date"
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
      <button
        onClick={handleFilter}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default DateRangeFilter;
