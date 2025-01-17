<<<<<<< HEAD
"use client";
=======
<<<<<<< HEAD
'use client'
>>>>>>> d50be06 (a)

import { useContext } from "react";
import CategoriesContext from "../store/CategoriesContext";
import PieChart from "../components/PieChart";
import HistoryStack from "../components/HistoryStack";
import { useLocalStorage } from "@mantine/hooks";
import { ColorScheme, ColorSchemeProvider } from "@mantine/core";

export default function HomePage() {
  const { getTotalAmount } = useContext(CategoriesContext);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });
  const budget = getTotalAmount("Budget");
  const expenses = getTotalAmount("Expenses");
  const balance = budget - expenses;
  console.log("color scheme : ", colorScheme);

  return (
    <div
      className={`min-h-screen ${
        colorScheme === "dark" ? "bg-[#202020]" : "bg-white"
      } p-6`}
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1
          className={`text-lg ${
            colorScheme === "light" ? "text-black" : "text-white/80/90"
          }`}
        >
          Good afternoon,
        </h1>
        <h2
          className={`font-semibold text-2xl ${
            colorScheme === "light" ? "text-black" : "text-white/80"
          }`}
        >
          Enjelin Morgeana
        </h2>
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
          <button
            className={`${
              colorScheme === "light" ? "text-black" : "text-white/80/60"
            }`}
          >
            •••
          </button>
        </div>
        <div
          className={`text-3xl font-bold mb-6 ${
            colorScheme === "light" && "text-black"
          }`}
        >
          ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>

        {/* Income and Expenses */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-full ${
                colorScheme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
            >
              {/* Arrow Down Icon */}
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
                ${budget.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-full ${
                colorScheme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
            >
              {/* Arrow Down Icon */}
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
                $
                {expenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and History Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div
          className={`rounded-2xl border border-gray-200 p-4 shadow-sm ${
            colorScheme === "dark"
              ? "bg-black/5  border border-gray-900"
              : "bg-whitee"
          }`}
        >
          <HistoryStack />
        </div>
        {(budget > 0 || expenses > 0) && (
          <div
            className={`rounded-2xl border border-gray-200 p-4 shadow-sm ${
              colorScheme === "dark"
                ? "bg-black/5  border border-gray-900"
                : "bg-white "
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
<<<<<<< HEAD
=======

=======
"use client";

import { useContext } from "react";
import CategoriesContext from "../store/CategoriesContext";
import PieChart from "../components/PieChart";
import HistoryStack from "../components/HistoryStack";
import { useLocalStorage } from "@mantine/hooks";
import { ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { IsAuth, AuthanticatedProvider } from "@mantine/core";
import AccountSelectionModal from "../components/AccountSelectionModal";

export default function HomePage() {
  const { getTotalAmount } = useContext(CategoriesContext);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });
  const [isAuth, setIsAuth] = useLocalStorage<IsAuth>({
    key: "Auth",
    defaultValue: "false",
  });
  const budget = getTotalAmount("Budget");
  const expenses = getTotalAmount("Expenses");
  const balance = budget - expenses;

  if(isAuth === 'false') 
    return <div><AccountSelectionModal /></div>
    // return <AccountSelectionModal />


  // console.log("Authorized  : ", isAuth);
  // console.log("color scheme : ", colorScheme);

  return (
    <div
      className={`min-h-screen ${
        colorScheme === "dark" ? "bg-[#202020]" : "bg-white"
      } p-6`}
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1
          className={`text-lg ${
            colorScheme === "light" ? "text-black" : "text-white/80/90"
          }`}
        >
          Good afternoon,
        </h1>
        <h2
          className={`font-semibold text-2xl ${
            colorScheme === "light" ? "text-black" : "text-white/80"
          }`}
        >
          Enjelin Morgeana
        </h2>
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
          <button
            className={`${
              colorScheme === "light" ? "text-black" : "text-white/80/60"
            }`}
          >
            •••
          </button>
        </div>
        <div
          className={`text-3xl font-bold mb-6 ${
            colorScheme === "light" && "text-black"
          }`}
        >
          ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>

        {/* Income and Expenses */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-full ${
                colorScheme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
            >
              {/* Arrow Down Icon */}
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
                ${budget.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-full ${
                colorScheme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
            >
              {/* Arrow Down Icon */}
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
                $
                {expenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and History Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div
          className={`rounded-2xl border border-gray-200 p-4 shadow-sm ${
            colorScheme === "dark"
              ? "bg-black/5  border border-gray-900"
              : "bg-whitee"
          }`}
        >
          <HistoryStack />
        </div>
        {(budget > 0 || expenses > 0) && (
          <div
            className={`rounded-2xl border border-gray-200 p-4 shadow-sm ${
              colorScheme === "dark"
                ? "bg-black/5  border border-gray-900"
                : "bg-white "
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
>>>>>>> 818e543 (styles)
>>>>>>> d50be06 (a)
