"use client"

import { useNavigate } from 'react-router-dom'
import { useAccount } from '../store/AccountContext'
import { Users, User, Baby } from 'lucide-react'

const accountTypes = [
  {
    id: 'solo',
    title: 'Solo',
    description: 'One user account',
    icon: User,
    users: 1
  },
  {
    id: 'duo',
    title: 'Duo',
    description: 'Two user accounts',
    icon: Users,
    users: 2
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Six user accounts',
    icon: Baby,
    users: 6
  }
]

export default function AccountSelectionModal() {
  const navigate = useNavigate()
  const { addAccount } = useAccount()

  const handleSelect = (type: string) => {
    const account = {
      id: crypto.randomUUID(),
      type: type as 'solo' | 'duo' | 'family',
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Account`,
      users: accountTypes.find(t => t.id === type)?.users || 1
    }
    addAccount(account)
    navigate('/')
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Choose Account Type</h1>
            <p className="text-muted-foreground">Select the best plan for you</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {accountTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className="group relative rounded-lg border p-6 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="space-y-2">
                  <type.icon className="h-6 w-6" />
                  <h3 className="font-bold">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

