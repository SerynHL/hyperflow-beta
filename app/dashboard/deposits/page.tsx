"use client"

import DashboardHeader from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DepositsPage() {
  return (
    <DashboardLayout>
      <DashboardHeader title="Deposits & Withdrawals" />
      <div className="p-6">
        <Tabs defaultValue="deposits" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          </TabsList>

          <TabsContent value="deposits">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-[#1A2036]/50 border-[#1E2433]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Deposits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$28,175.00</div>
                  <div className="text-sm text-gray-400 mt-1">Lifetime</div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A2036]/50 border-[#1E2433]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Recent Deposit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$5,000.00</div>
                  <div className="text-sm text-gray-400 mt-1">2 days ago</div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A2036]/50 border-[#1E2433]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Deposit Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-400 mt-1">Connected</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#1A2036]/50 border-[#1E2433]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Deposit History</CardTitle>
                  <CardDescription>Your recent deposits</CardDescription>
                </div>
                <Button>New Deposit</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {depositHistory.map((tx, index) => (
                      <TableRow key={index} className="hover:bg-[#1E2433]/30">
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.asset}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.network}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{tx.txid}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-[#1A2036]/50 border-[#1E2433]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Withdrawals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,450.00</div>
                  <div className="text-sm text-gray-400 mt-1">Lifetime</div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A2036]/50 border-[#1E2433]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Recent Withdrawal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$6,225.00</div>
                  <div className="text-sm text-gray-400 mt-1">4 days ago</div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A2036]/50 border-[#1E2433]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Withdrawal Limit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$50,000.00</div>
                  <div className="text-sm text-gray-400 mt-1">Daily</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#1A2036]/50 border-[#1E2433]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Withdrawal History</CardTitle>
                  <CardDescription>Your recent withdrawals</CardDescription>
                </div>
                <Button>New Withdrawal</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawalHistory.map((tx, index) => (
                      <TableRow key={index} className="hover:bg-[#1E2433]/30">
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.asset}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.network}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{tx.txid}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-500"
    case "Pending":
      return "bg-yellow-500/20 text-yellow-500"
    case "Failed":
      return "bg-red-500/20 text-red-500"
    default:
      return "bg-gray-500/20 text-gray-500"
  }
}

const depositHistory = [
  {
    date: "2023-08-13 18:04:55",
    asset: "USDC",
    amount: "5,000.00",
    network: "Ethereum",
    status: "Completed",
    txid: "0x7a8b...3f2e",
  },
  {
    date: "2023-08-08 08:30:45",
    asset: "BTC",
    amount: "0.25",
    network: "Bitcoin",
    status: "Completed",
    txid: "3a7b2...8f1c",
  },
  {
    date: "2023-07-25 14:15:30",
    asset: "ETH",
    amount: "2.5",
    network: "Ethereum",
    status: "Completed",
    txid: "0x8c9d...4e3f",
  },
  {
    date: "2023-07-18 09:45:22",
    asset: "SOL",
    amount: "50.0",
    network: "Solana",
    status: "Completed",
    txid: "5x9f2...7d1e",
  },
  {
    date: "2023-07-10 16:30:15",
    asset: "USDC",
    amount: "2,500.00",
    network: "Ethereum",
    status: "Completed",
    txid: "0x6d2e...9f4a",
  },
]

const withdrawalHistory = [
  {
    date: "2023-08-11 09:23:17",
    asset: "ETH",
    amount: "1.5",
    network: "Ethereum",
    status: "Completed",
    txid: "0x5c8d...2e4f",
  },
  {
    date: "2023-07-28 13:45:30",
    asset: "BTC",
    amount: "0.15",
    network: "Bitcoin",
    status: "Completed",
    txid: "4b8c3...9d2a",
  },
  {
    date: "2023-07-15 11:20:45",
    asset: "USDC",
    amount: "3,000.00",
    network: "Ethereum",
    status: "Completed",
    txid: "0x7d9e...5f3b",
  },
  {
    date: "2023-07-05 16:10:22",
    asset: "SOL",
    amount: "25.0",
    network: "Solana",
    status: "Completed",
    txid: "6e8f1...3c7d",
  },
  {
    date: "2023-06-28 10:35:15",
    asset: "ETH",
    amount: "0.75",
    network: "Ethereum",
    status: "Completed",
    txid: "0x9f4b...8e2d",
  },
]

