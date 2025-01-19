import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import { useDateRange } from "../store/DateRangeContext";
import { useLocalStorage } from "@mantine/hooks";
import { ColorScheme } from "@mantine/core";

const DateRangeFilter: React.FC = () => {
  const { setFromDate, setToDate } = useDateRange(); // Get context functions
  const [fromDate, setLocalFromDate] = useState<Date | null>(null);
  const [toDate, setLocalToDate] = useState<Date | null>(null);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
      key: "theme",
      defaultValue: "dark",
    });

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
    <div className={`p-4 space-y-4 rounded-lg max-w-full ${colorScheme === "dark" ? "border border-black/5 bg-black/5" : "white"}`}>
      <h2 className={`text-lg font-semibold ${colorScheme === "dark" ? "white" : "text-gray-700"}`}>Filter by Date</h2>
      <div className="space-y-2 gap-6 flex flex-cols-2">
        <div className="mt-2 w-1/2">
          <label htmlFor="from-date" className={`block text-sm font-medium text-start ${colorScheme === "dark" ? "text-white" : "text-gray-600"}`}>
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
        <div className="w-1/2">
          <label htmlFor="from-date" className={`block text-sm font-medium text-start ${colorScheme === "dark" ? "text-white" : "text-gray-600"}`}>
          To Date:
          </label>
          <ReactDatePicker
            id="to-date"
            selected={toDate}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select To Date"
            className={`border p-2 rounded w-full ${colorScheme === "dark" ? "" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
