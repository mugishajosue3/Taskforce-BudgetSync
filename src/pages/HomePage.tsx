import { useContext, useEffect, useState } from "react";
import CategoriesContext from "../store/CategoriesContext";
import PieChart from "../components/PieChart";
import HistoryStack from "../components/HistoryStack";
import { useLocalStorage } from "@mantine/hooks";
import { ColorScheme } from "@mantine/core";
import AccountSelectionModal from "../components/AccountSelectionModal";
import DateRangeFilter from "../components/DateRangeFilter";
import HistoryItem from "../components/HistoryItem";

type HandleFilter = (fromDate: string, toDate: string) => void;
interface FilterData {
  dateCreated: string;
}
interface DateRangeFilterProps {
  onFilter: (fromDate: string, toDate: string) => void;
}

export default function HomePage() {
  const { getTotalAmount } = useContext(CategoriesContext);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });

  const [accountType, setAccountType] = useState(() => {
    const storedAccountType = localStorage.getItem("accountType");
    return storedAccountType || "false";
  });

  // Get budget calculations
  const budget = Number(getTotalAmount("Budget")) || 0;
  const expenses = Number(getTotalAmount("Expenses")) || 0;
  const balance = budget - expenses;

  // Debug logging
  useEffect(() => {
    console.groupEnd();

    const currentCategories = JSON.parse(
      localStorage.getItem(`categories_${accountType}`) || "[]"
    );
    // console.log("Categories from localStorage:", currentCategories);
  }, [budget, expenses, balance, accountType]);

  // Improved number formatting function
  //const formatAmount = (amount) => {
  const formatAmount = (amount: number): string => {
    try {
      // Ensure amount is a number and handle negative values
      const numAmount = Number(amount);
      if (isNaN(numAmount)) return "0.00";

      // Get the absolute value for formatting
      const absoluteValue = Math.abs(numAmount);

      // Format with commas and 2 decimal places
      const formattedValue = absoluteValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      // Add negative sign if needed
      return numAmount < 0 ? `-${formattedValue}` : formattedValue;
    } catch (error) {
      console.error("Error formatting amount:", error);
      return "0.00";
    }
    return amount.toLocaleString("en-US");
  };

  const storedData = localStorage.getItem(`${accountType}_History`);

  // Parse and set the data
  const [data, setData] = useState(storedData ? JSON.parse(storedData) : []);

  // Example use of data
  // console.log(data);

  //const handleFilter = (fromDate, toDate) => {
  const handleFilter = (fromDate: string, toDate: string): void => {
    //const filteredData = data.filter((item) => {
    const filteredData = data.filter((item: FilterData) => {
      const itemDate = new Date(item.dateCreated);
      //return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
      return true;
    });
    // console.log("Filtered Data:", filteredData);
  };

  if (accountType === "false") {
    return <AccountSelectionModal />;
  }

  return (
    <div
      className={`min-h-screen ${
        colorScheme === "dark" ? "bg-[#202020]" : "bg-white"
      } p-6`}
    >
      {/* Header Section */}
      <div className="mb-8 relative">
        <h1
          className={`text-lg ${
            colorScheme === "light" ? "text-black" : "text-white/80/90"
          }`}
        >
          Hello 👋,
        </h1>
        <h2
          className={`font-semibold text-2xl ${
            colorScheme === "light" ? "text-black" : "text-white/80"
          }`}
        >
          Eric
        </h2>
        <h1
          className={`absolute top-0 right-0 font-semibold text-xl ${
            colorScheme === "light" ? "text-black" : "text-white/80"
          }`}
        >
          {accountType.replace(/"/g, "")}
        </h1>
      </div>

      {/* Balance Card */}
      <div
        className={`rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm text-white/80 p-6 mb-6 shadow-sm ${
          colorScheme === "light" && "border border-black/5 bg-black/5"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <span
            className={`${
              colorScheme === "light" ? "text-black" : "text-white/80/80"
            }`}
          >
            Total Balance
          </span>
        </div>

        {/* Balance Display */}
        <div
          className={`text-3xl font-bold mb-6 ${
            colorScheme === "light" && "text-black"
          }`}
        >
          ${formatAmount(balance)}
        </div>

        {/* Income and Expenses Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Income Section */}
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-full ${
                colorScheme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
            >
              <svg
                className={`h-4 w-4 ${
                  colorScheme === "light" ? "text-black" : "text-white/80"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
            <div>
              <div
                className={`text-sm ${
                  colorScheme === "light" ? "text-black/80" : "text-white/80/80"
                }`}
              >
                Income
              </div>
              <div
                className={`font-semibold ${
                  colorScheme === "light" && "text-black/80"
                }`}
              >
                ${formatAmount(budget)}
              </div>
            </div>
          </div>

          {/* Expenses Section */}
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-full ${
                colorScheme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
            >
              <svg
                className={`h-4 w-4 ${
                  colorScheme === "light" ? "text-black" : "text-white/80"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
            <div>
              <div
                className={`text-sm ${
                  colorScheme === "light" ? "text-black/80" : "text-white/80/80"
                }`}
              >
                Expenses
              </div>
              <div
                className={`font-semibold ${
                  colorScheme === "light" && "text-black/80"
                }`}
              >
                ${formatAmount(expenses)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full  rounded-lg shadow-md my-4 ${
          colorScheme === "light" ? "text-black" : "text-white/80/60"
        }`}
      >
        <DateRangeFilter onFilter={handleFilter} />
      </div>

      {/* History and Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div
          className={`rounded-2xl border border-gray-200 p-4 shadow-sm ${
            colorScheme === "dark"
              ? "bg-black/5 border border-gray-900"
              : "bg-white"
          }`}
        >
          <HistoryStack />
        </div>
        {(budget > 0 || expenses > 0) && (
          <div
            className={`rounded-2xl border border-gray-200 p-4 shadow-sm ${
              colorScheme === "dark"
                ? "bg-black/5 border border-gray-900"
                : "bg-white"
            }`}
          >
            <div className="mx-7 mt-7">
              <div className="flex justify-start items-center gap-4">
                <div className="h-4 w-4 border-8 border-green-500"></div>
                <h4 className="text-green-500">Income</h4>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="h-4 w-4 border-8 border-red-500"></div>
                <h4 className="text-red-500">Expenses</h4>
              </div>
            </div>
            <PieChart />
          </div>
        )}
      </div>
    </div>
  );
}
