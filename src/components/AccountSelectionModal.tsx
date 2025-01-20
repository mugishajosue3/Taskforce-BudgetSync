import React from "react"
import { useNavigate } from "react-router-dom"
import { useAccount } from "../store/AccountContext"
import { Users, User, Baby } from "lucide-react"
import { useState, useEffect } from "react"
import Bk from "/bk.png"
import Equity from "/equity.png"
import Momo from "/momo.png"
import Cash from "/cash.png"
import AccountFallback from "../../public/accountFallback.png"
import { SignUpModal } from "./SignUpModal"
import { v4 as crypto } from "uuid"

const defaultAccountTypes = [
  {
    id: "BK Account",
    title: "BK Account",
    description: "BK Transaction Management",
    icon: Bk,
    users: 1,
  },
  {
    id: "Equity Bank Account",
    title: "Equity Bank Account",
    description: "Equity Transaction Management",
    icon: Equity,
    users: 2,
  },
  {
    id: "MOMO Account",
    title: "MOMO Account",
    description: "Cell Phone Transaction Management",
    icon: Momo,
    users: 6,
  },
  {
    id: "CASH",
    title: "CASH Account",
    description: "CASH Account Management",
    icon: Cash,
    users: 6,
  },
]

export default function AccountSelectionModal() {
  const navigate = useNavigate()
  const { addAccount, showModal, setShowModal, accounts } = useAccount()
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [accountTypes, setAccountTypes] = useState(defaultAccountTypes)

  // Load custom accounts once on component mount
  useEffect(() => {
    const loadCustomAccounts = () => {
      try {
        // Get all accounts from localStorage
        const userAccounts = JSON.parse(localStorage.getItem("user-accounts")) || []
        const currentAccount = JSON.parse(localStorage.getItem("current-account"))

        // Create a Map to store unique accounts by ID
        const uniqueAccounts = new Map()

        // Add default accounts to the Map
        defaultAccountTypes.forEach(acc => {
          uniqueAccounts.set(acc.id, acc)
        })

        // Process user accounts
        userAccounts.forEach(acc => {
          if (!uniqueAccounts.has(acc.id)) {
            uniqueAccounts.set(acc.id, {
              id: acc.id,
              title: acc.name,
              description: acc.description || "",
              icon: acc.profilePicture || AccountFallback,
              users: acc.users,
            })
          }
        })

        // Process current account if it exists and isn't already included
        if (currentAccount && !uniqueAccounts.has(currentAccount.id)) {
          uniqueAccounts.set(currentAccount.id, {
            id: currentAccount.id,
            title: currentAccount.name,
            description: currentAccount.description || "",
            icon: currentAccount.profilePicture || AccountFallback,
            users: currentAccount.users,
          })
        }

        // Convert Map values to array and update state
        setAccountTypes(Array.from(uniqueAccounts.values()))
      } catch (error) {
        console.error("Error loading accounts:", error)
        setAccountTypes(defaultAccountTypes)
      }
    }

    loadCustomAccounts()
  }, [])

  const handleSelect = (type) => {
    const accountType = accountTypes.find((t) => t.id === type)
    if (!accountType) return

    const isDefaultAccount = defaultAccountTypes.some(def => def.id === type)

    if (isDefaultAccount) {
      const account = {
        id: crypto(),
        type: accountType.title,
        name: accountType.title,
        users: accountType.users,
      }
      addAccount(account)
    } else {
      const account = {
        id: accountType.id,
        type: accountType.title,
        name: accountType.title,
        description: accountType.description,
        users: accountType.users,
        profilePicture: accountType.icon === AccountFallback ? "" : accountType.icon
      }
      addAccount(account)
    }
  }

  const handleSignUp = async (data) => {
    try {
      let profilePictureBase64 = '';
      if (data.profilePicture) {
        profilePictureBase64 = await convertFileToBase64(data.profilePicture);
      }

      const newId = crypto()
      const newAccount = {
        id: newId,
        type: data.accountName,
        name: data.accountName,
        description: data.description,
        users: 1,
        profilePicture: profilePictureBase64
      }
      
      // Add to account types with consistent structure
      setAccountTypes(prev => [...prev, {
        id: newId,
        title: data.accountName,
        description: data.description,
        icon: profilePictureBase64 || AccountFallback,
        users: 1,
      }])
      
      addAccount(newAccount)
      setShowSignUpModal(false)
    } catch (error) {
      console.error("Error creating account:", error)
    }
  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center overflow-y-auto z-50">
      <div className="min-h-screen w-full py-8 px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto animate-fadeIn">
          <div className="w-full space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                Choose Account Type
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Select the best plan for you
                <span>
                  Want to create Account{" "}
                  <span
                    className="text-white cursor-pointer hover:text-blue-400"
                    onClick={() => setShowSignUpModal(true)}
                  >
                    Sign Up!
                  </span>
                </span>
              </p>
            </div>
            
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {accountTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSelect(type.id)}
                  className="group relative rounded-lg border border-gray-300 dark:border-gray-600 p-4 md:p-6 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition"
                >
                  <div className="space-y-2">
                    <div className="w-full h-24 md:h-32 flex items-center justify-center">
                      <img 
                        src={type.icon} 
                        alt={type.title} 
                        className="object-contain max-h-full" 
                      />
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-100">
                      {type.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)} 
        onSubmit={handleSignUp} 
      />
    </div>
  );
}