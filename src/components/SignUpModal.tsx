import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { accountName: string; description: string; profilePicture: File | null }) => void
}

export function SignUpModal({ isOpen, onClose, onSubmit }: SignUpModalProps) {
  const [accountName, setAccountName] = useState("")
  const [description, setDescription] = useState("")
  const [profilePicture, setProfilePicture] = useState<File | null>(null)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ accountName, description, profilePicture })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
              placeholder="Your Account Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter Description"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setProfilePicture(e.files?.[0] || null)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

