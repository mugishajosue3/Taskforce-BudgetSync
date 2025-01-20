import { useContext } from "react"
import CategoriesContext from "../store/CategoriesContext"
import PieChart from "./../components/PieChart"
import HistoryStack from "./../components/HistoryStack"

export default function HomePage() {
  const { getTotalAmount } = useContext(CategoriesContext)
  const budget = getTotalAmount("Budget")
  const expenses = getTotalAmount("Expenses")
  const balance = budget - expenses

  return (
    <div className="bg-blue-400 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-white/90 text-lg">Good afternoon,</h1>
        <h2 className="text-white font-semibold text-2xl">Enjelin Morgeana</h2>
      </div>

      {/* Balance Card */}
      <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm text-white p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/80">Total Balance</span>
          <button className="text-white/60">•••</button>
        </div>
        <div className="text-3xl font-bold mb-6">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        
        {/* Income and Expenses */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              {/* Arrow Down Icon */}
              <svg 
                className="h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
            <div>
              <div className="text-white/80 text-sm">Income</div>
              <div className="font-semibold">${budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              {/* Arrow Up Icon */}
              <svg 
                className="h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </div>
            <div>
              <div className="text-white/80 text-sm">Expenses</div>
              <div className="font-semibold">${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and History Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {(budget > 0 || expenses > 0) && (
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <PieChart />
          </div>
        )}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <HistoryStack />
        </div>
      </div>
    </div>
  )
}

