import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Account = {
  id: string
  type: 'BK Account' | 'Equity Bank Account' | 'MOMO Account' | 'CASH'
  name: string
  users: number
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
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [showModal, setShowModal] = useState(true) // Start with modal visible
  const navigate = useNavigate()

  useEffect(() => {
    // Show modal if no account is selected
    if (!currentAccount) {
      setShowModal(true)
    }
  }, [currentAccount])

  const addAccount = (account: Account) => {
    setAccounts(prev => [...prev, account])
    setCurrentAccount(account)
    setShowModal(false) // Hide modal after account selection
    navigate('/')
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