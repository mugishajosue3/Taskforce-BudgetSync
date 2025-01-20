import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from "@mantine/hooks"

type Account = {
  id: string
  type: 'BK Account' | 'Equity Bank Account' | 'MOMO Account' | 'CASH' | 'Custom Account'
  name: string
  description?: string
  users: number
  profilePicture?: string
}

type AccountContextType = {
  currentAccount: Account | null
  accounts: Account[]
  setCurrentAccount: (account: Account) => void
  addAccount: (account: Account) => void
  showModal: boolean
  setShowModal: (show: boolean) => void
}

const AccountContext = createContext<AccountContextType | null>(null)

export function AccountProvider({ children }: { children: React.ReactNode }) {
  // Maintain both storage patterns
  const [accountType, setAccountType] = useLocalStorage({
    key: 'accountType',
    defaultValue: 'false'
  });

  const [accounts, setAccounts] = useLocalStorage<Account[]>({
    key: 'user-accounts',
    defaultValue: []
  });

  const [currentAccount, setCurrentAccount] = useLocalStorage<Account | null>({
    key: 'current-account',
    defaultValue: null
  });

  const [showModal, setShowModal] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentAccount) {
      setShowModal(true)
    }
  }, [currentAccount])

  const addAccount = (account: Account) => {
    // Update both storage patterns
    setAccountType(account.type)
    setAccounts(prev => [...prev, account])
    setCurrentAccount(account)
    setShowModal(false)
    window.location.reload() // Maintain the previous behavior of page reload
  }

  return (
    <AccountContext.Provider 
      value={{ 
        currentAccount, 
        accounts, 
        setCurrentAccount, 
        addAccount,
        showModal,
        setShowModal
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export function useAccount() {
  const context = useContext(AccountContext)
  if (!context) throw new Error('useAccount must be used within AccountProvider')
  return context
}