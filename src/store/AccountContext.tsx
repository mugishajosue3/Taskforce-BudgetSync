import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Account = {
  id: string
  type: 'solo' | 'duo' | 'family'
  name: string
  users: number
}

type AccountContextType = {
  currentAccount: Account | null
  accounts: Account[]
  setCurrentAccount: (account: Account) => void
  addAccount: (account: Account) => void
}

const AccountContext = createContext<AccountContextType | null>(null)

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // if (!currentAccount && location.pathname !== '/') {
    //   navigate('/')
    // }
  }, [currentAccount, navigate])

  const addAccount = (account: Account) => {
    setAccounts(prev => [...prev, account])
    setCurrentAccount(account)
  }

  return (
    <AccountContext.Provider 
      value={{ 
        currentAccount, 
        accounts, 
        setCurrentAccount, 
        addAccount 
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
