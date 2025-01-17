import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../store/AccountContext";
import { Users, User, Baby } from "lucide-react";
import { useState, useEffect } from "react";

const accountTypes = [
  {
    id: "solo",
    title: "Account A",
    description: "One user account",
    icon: User,
    users: 1,
  },
  {
    id: "duo",
    title: "Account B",
    description: "2 user accounts",
    icon: Users,
    users: 2,
  },
  {
    id: "family",
    title: "Account C",
    description: "Six user accounts",
    icon: Baby,
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
    if (!accountType) return;

    const account = {
      id: crypto.randomUUID(),
      type: accountType.title as 'Account A' | 'Account B' | 'Account C',
      name: `${accountType.title}`,
      users: accountType.users,
    };
    addAccount(account);
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
                    <Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}