import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/lib/context/WalletContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HyperFlow - Unified Hyperliquid Dashboard",
  description:
    "The ultimate dashboard for Hyperliquid, integrating spot, perpetuals, and HyperEVm into a single interface",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}

