"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  connected: boolean
  address: string | null
  setAddress: (address: string) => void
  error: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Vérifier si une adresse est déjà stockée au chargement
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress")
    if (savedAddress) {
      setAddress(savedAddress)
      setConnected(true)
    }
  }, [])

  // Fonction pour définir l'adresse
  const handleSetAddress = (newAddress: string) => {
    try {
      setError(null)

      // Validation simple de l'adresse (peut être améliorée)
      if (!newAddress || newAddress.trim() === "") {
        setAddress(null)
        setConnected(false)
        localStorage.removeItem("userAddress")
        return
      }

      // Stocker l'adresse
      setAddress(newAddress)
      setConnected(true)
      localStorage.setItem("userAddress", newAddress)
    } catch (err) {
      console.error("Error setting address:", err)
      setError("Failed to set address. Please try again.")
    }
  }

  const value = {
    connected,
    address,
    setAddress: handleSetAddress,
    error,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

