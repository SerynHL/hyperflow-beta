"use client"

import DashboardHeader from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <DashboardHeader title="Transaction History" />
      <div className="p-6">
        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx, index) => (
                  <TableRow key={index} className="hover:bg-[#1E2433]/30">
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(tx.type)}`}>{tx.type}</span>
                    </TableCell>
                    <TableCell>{tx.asset}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.price}</TableCell>
                    <TableCell>{tx.total}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tx.status)}`}>{tx.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function getTypeColor(type: string) {
  switch (type) {
    case "Buy":
      return "bg-green-500/20 text-green-500"
    case "Sell":
      return "bg-red-500/20 text-red-500"
    case "Deposit":
      return "bg-blue-500/20 text-blue-500"
    case "Withdrawal":
      return "bg-purple-500/20 text-purple-500"
    default:
      return "bg-gray-500/20 text-gray-500"
  }
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

const transactions = [
  {
    date: "2023-08-15 14:32:12",
    type: "Buy",
    asset: "BTC",
    amount: "0.5",
    price: "$68,250",
    total: "$34,125",
    status: "Completed",
  },
  {
    date: "2023-08-14 22:18:05",
    type: "Sell",
    asset: "ETH",
    amount: "2.0",
    price: "$4,160",
    total: "$8,320",
    status: "Completed",
  },
  {
    date: "2023-08-14 10:42:37",
    type: "Buy",
    asset: "SOL",
    amount: "15.0",
    price: "$143",
    total: "$2,145",
    status: "Completed",
  },
  {
    date: "2023-08-13 18:04:55",
    type: "Deposit",
    asset: "USDC",
    amount: "5,000",
    price: "$1.00",
    total: "$5,000",
    status: "Completed",
  },
  {
    date: "2023-08-11 09:23:17",
    type: "Withdrawal",
    asset: "ETH",
    amount: "1.5",
    price: "$4,150",
    total: "$6,225",
    status: "Completed",
  },
  {
    date: "2023-08-10 15:42:30",
    type: "Buy",
    asset: "AVAX",
    amount: "20.0",
    price: "$62",
    total: "$1,240",
    status: "Completed",
  },
  {
    date: "2023-08-09 11:15:22",
    type: "Sell",
    asset: "DOT",
    amount: "100.0",
    price: "$5.45",
    total: "$545",
    status: "Completed",
  },
  {
    date: "2023-08-08 08:30:45",
    type: "Deposit",
    asset: "BTC",
    amount: "0.25",
    price: "$67,800",
    total: "$16,950",
    status: "Completed",
  },
]

