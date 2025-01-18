import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../store/AccountContext";
import { Users, User, Baby } from "lucide-react";
import { useState, useEffect } from "react";
import Bk from '/bk.png'
import Equity from '/equity.png'
import Momo from '/momo.png'
import Cash from '/cash.png'
const accountTypes = [
  {
    id: "BK Account",
    title: "BK Account",
    description: "BK Transaction Managment",
    icon: Bk,
    users: 1,
  },
  {
    id: "Equity Bank Account",
    title: "Equity Bank Account",
    description: "Equity Transaction Managment",
    icon: Equity,
    users: 2,
  },
  {
    id: "MOMO Account",
    title: "MOMO Account",
    description: "Cell Phone Transaction Managment",
    icon: Momo,
    users: 6,
  },
  {
    id: "CASH",
    title: "CASH Account",
    description: "CASH Account Managment",
    icon: Cash,
    users: 6,
  },
];

export default function AccountSelectionModal() {
  const navigate = useNavigate();
  const { addAccount, showModal, setShowModal } = useAccount();

  // Initialize state with value from local storage or a default
  const [accountType, setAccountType] = useState(() => {
    return localStorage.getItem("accountType") || "false";
  });

  // Update local storage whenever `accountType` changes
  useEffect(() => {
    localStorage.setItem("accountType", accountType);
  }, [accountType]);

  if (!showModal) return null;

  const handleSelect = (type: string) => {
    const accountType = accountTypes.find((t) => t.id === type);
    setAccountType(type);
    if (!accountType) {
      return; // Exit if accountType is falsy
    }

    const account = {
      id: crypto.randomUUID(),
      type: accountType.title as "BK Account" | "Equity Bank Account" | "MOMO Account" | "CASH",
      name: `${accountType.title}`,
      users: accountType.users,
    };
    console.log("Account to be added:", account);
    addAccount(account);
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={(e) => {
        // Close modal when clicking outside
        if (e.target === e.currentTarget) {
          // Only allow closing if an account is already selected
          if (useAccount().currentAccount) {
            setShowModal(false);
          }
        }
      }}
    >
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-3xl animate-fadeIn">
        <div className="w-full space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Choose Account Type
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Select the best plan for you
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {accountTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => handleSelect(type.id)}
                  className="group relative rounded-lg border border-gray-300 dark:border-gray-600 p-6 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition"
                >
                  <div className="space-y-2">
                    <img src={type.icon} alt={type.title} className="object-cover" />
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
