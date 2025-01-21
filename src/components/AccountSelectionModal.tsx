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

// Define specific account types
export type AccountType = "BK Account" | "Equity Bank Account" | "MOMO Account" | "CASH";

// Define types for account with strict type checking
export type Account = {
  id: string
  type: AccountType
  name: string
  description?: string
  users: number
  profilePicture?: string
}

type AccountTypeInfo = {
  id: string
  title: string
  description: string
  icon: string
  users: number
}

const defaultAccountTypes: AccountTypeInfo[] = [
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
  const [accountTypes, setAccountTypes] = useState<AccountTypeInfo[]>(defaultAccountTypes)

  useEffect(() => {
    const loadCustomAccounts = () => {
      try {
        const userAccountsStr = localStorage.getItem("user-accounts")
        const currentAccountStr = localStorage.getItem("current-account")
        
        const userAccounts: Account[] = userAccountsStr ? JSON.parse(userAccountsStr) : []
        const currentAccount: Account | null = currentAccountStr ? JSON.parse(currentAccountStr) : null

        const uniqueAccounts = new Map<string, AccountTypeInfo>()

        defaultAccountTypes.forEach(acc => {
          uniqueAccounts.set(acc.id, acc)
        })

        userAccounts.forEach(acc => {
          if (!uniqueAccounts.has(acc.id) && defaultAccountTypes.some(def => def.title === acc.type)) {
            uniqueAccounts.set(acc.id, {
              id: acc.id,
              title: acc.name,
              description: acc.description || "",
              icon: acc.profilePicture || AccountFallback,
              users: acc.users,
            })
          }
        })

        if (currentAccount && !uniqueAccounts.has(currentAccount.id)) {
          uniqueAccounts.set(currentAccount.id, {
            id: currentAccount.id,
            title: currentAccount.name,
            description: currentAccount.description || "",
            icon: currentAccount.profilePicture || AccountFallback,
            users: currentAccount.users,
          })
        }

        setAccountTypes(Array.from(uniqueAccounts.values()))
      } catch (error) {
        console.error("Error loading accounts:", error)
        setAccountTypes(defaultAccountTypes)
      }
    }

    loadCustomAccounts()
  }, [])

  const determineAccountType = (name: string): AccountType => {
    const normalizedName = name.toLowerCase()
    
    if (normalizedName.includes('bk')) return "BK Account"
    if (normalizedName.includes('equity')) return "Equity Bank Account"
    if (normalizedName.includes('momo') || normalizedName.includes('mobile')) return "MOMO Account"
    if (normalizedName.includes('cash')) return "CASH"
    
    // Default to the most appropriate type based on the name or CASH
    return defaultAccountTypes.find(type => 
      normalizedName.includes(type.title.toLowerCase())
    )?.title as AccountType || "CASH"
  }

  const handleSelect = (type: string) => {
    const accountType = accountTypes.find((t) => t.id === type)
    if (!accountType) return

    const isDefaultAccount = defaultAccountTypes.some(def => def.id === type)
    
    // Determine the appropriate account type
    const accountTypeValue = isDefaultAccount 
      ? accountType.title as AccountType 
      : determineAccountType(accountType.title)

    const account: Account = {
      id: isDefaultAccount ? crypto() : accountType.id,
      type: accountTypeValue,
      name: accountType.title,
      description: accountType.description,
      users: accountType.users,
      profilePicture: !isDefaultAccount && accountType.icon !== AccountFallback ? accountType.icon : undefined
    }

    addAccount(account)
  }

  const handleSignUp = async (data: { 
    accountName: string
    description: string
    profilePicture: File | null 
  }) => {
    try {
      let profilePictureBase64 = ''
      if (data.profilePicture) {
        profilePictureBase64 = await convertFileToBase64(data.profilePicture)
      }

      // Determine account type based on the name
      const accountType = determineAccountType(data.accountName)
      
      const newId = crypto()
      const newAccount: Account = {
        id: newId,
        type: accountType,
        name: data.accountName,
        description: data.description,
        users: 1,
        profilePicture: profilePictureBase64 || undefined
      }
      
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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
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
              <p className="flex flex-col text-sm md:text-base text-gray-600 dark:text-gray-400">
                Select the best plan for you
                <span>
                  Want to create Account{" "}
                  <span
                    className="text-blue-400 cursor-pointer hover:text-white"
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
  )
}