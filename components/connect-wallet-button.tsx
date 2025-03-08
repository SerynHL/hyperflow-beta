"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/context/WalletContext"
import { Loader2, Wallet, LogOut } from "lucide-react"

export function ConnectWalletButton() {
  const { connected, connecting, address, connect, disconnect } = useWallet()
  const [isHovering, setIsHovering] = useState(false)

  if (connected) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-[#1A2036]/70 border-[#1E2433] hover:bg-[#1E2433]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={disconnect}
      >
        {isHovering ? (
          <>
            <LogOut className="h-4 w-4 text-red-400" />
            <span className="text-red-400">Disconnect</span>
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4 text-[#3B82F6]" />
            <span>
              {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
            </span>
          </>
        )}
      </Button>
    )
  }

  return (
    <Button
      variant="default"
      className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB]"
      onClick={connect}
      disabled={connecting}
    >
      {connecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </>
      )}
    </Button>
  )
}

