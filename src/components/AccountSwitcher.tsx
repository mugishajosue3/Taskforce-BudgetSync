import React from "react"
// import { Button } from "./../components/ui/button.js"
import { DropdownMenu } from "./../components/ui/DropdownMenu.js"
import { useAccount } from '../store/AccountContext'
import { ChevronsUpDown } from 'lucide-react'

export default function AccountSwitcher() {
  const { currentAccount, accounts, setCurrentAccount } = useAccount()

  if (!currentAccount) return null

  const handleItemClick = (label: string) => {
    alert(`You clicked on ${label}`);
  };

  const menuItems = [
    { label: "Profile", onClick: () => handleItemClick("Profile") },
    { label: "Settings", onClick: () => handleItemClick("Settings") },
    { label: "Logout", onClick: () => handleItemClick("Logout") },
  ];

  return (
    <DropdownMenu
        trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Menu</button>}
        items={menuItems}
      />

  )
}

