"use client"

import { useState } from "react"
import { Bell, ChevronDown, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddressInput } from "@/components/address-input"
import { useWallet } from "@/lib/context/WalletContext"

interface DashboardHeaderProps {
  title?: string
}

export default function DashboardHeader({ title = "Dashboard" }: DashboardHeaderProps) {
  const [notificationCount, setNotificationCount] = useState(3)
  const { connected } = useWallet()

  return (
    <header className="border-b border-[#1E2433] px-6 py-4 bg-[#0A0E17]/90 backdrop-blur-lg sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <AddressInput />

          <div className="relative">
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          <Button size="icon" variant="ghost">
            <Settings className="h-5 w-5" />
          </Button>

          {connected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-[#3B82F6]" />
                  </div>
                  <span className="hidden md:inline text-sm">Account</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>API Keys</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

