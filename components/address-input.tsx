"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/context/WalletContext"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export function AddressInput() {
  const { connected, address, setAddress } = useWallet()
  const [inputValue, setInputValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      setAddress(inputValue.trim())
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClear = () => {
    setAddress("")
    setInputValue("")
  }

  if (connected && address) {
    return (
      <div className="flex items-center gap-2 bg-[#1A2036]/70 border border-[#1E2433] rounded-md px-3 py-2">
        <span className="text-sm truncate max-w-[200px]">{address}</span>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white" onClick={handleClear}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter Hyperliquid address"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[250px] bg-[#1A2036]/70 border-[#1E2433] focus-visible:ring-[#3B82F6]"
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="sm"
        disabled={isSubmitting || !inputValue.trim()}
        className="bg-[#3B82F6] hover:bg-[#2563EB]"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-1">
            <Search className="h-4 w-4 animate-pulse" />
            Loading...
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            Search
          </span>
        )}
      </Button>
    </form>
  )
}

