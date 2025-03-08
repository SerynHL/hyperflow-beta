"use client"

import { useState } from "react"
import {
  ArrowDownUp,
  ChevronDown,
  ExternalLink,
  ArrowDownLeft,
  ArrowUpRight,
  FileCode2,
  Clock,
  Shield,
  Copy,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HyperEvmSection() {
  const [transactionFilter, setTransactionFilter] = useState("all")

  // Mock data for transactions
  const transactions = [
    {
      date: "2023-08-15",
      type: "Swap (Uniswap)",
      contract: "0x1234...7890",
      contractName: "Uniswap V3",
      amount: "1 ETH → 3200 USDC",
      status: "Success",
      hash: "0xabc...def",
      gas: "0.0021 ETH",
    },
    {
      date: "2023-08-14",
      type: "Deposit (Aave)",
      contract: "0x2345...8901",
      contractName: "Aave V3",
      amount: "500 USDC",
      status: "Success",
      hash: "0xbcd...efg",
      gas: "0.0018 ETH",
    },
    {
      date: "2023-08-13",
      type: "NFT Purchase",
      contract: "0x3456...9012",
      contractName: "OpenSea",
      amount: "0.2 ETH",
      status: "Success",
      hash: "0xcde...fgh",
      gas: "0.0025 ETH",
    },
    {
      date: "2023-08-12",
      type: "Transfer",
      contract: "0x0000...0000",
      contractName: "Native Transfer",
      amount: "0.5 ETH",
      status: "Success",
      hash: "0xdef...ghi",
      gas: "0.0015 ETH",
    },
    {
      date: "2023-08-10",
      type: "Stake (HypeLiquid)",
      contract: "0x4567...0123",
      contractName: "HypeLiquid Staking",
      amount: "2500 HYPE",
      status: "Success",
      hash: "0xefg...hij",
      gas: "0.0022 ETH",
    },
  ]

  // Bridge history data
  const bridgeHistory = [
    {
      date: "2023-08-05",
      type: "Deposit",
      from: "Ethereum",
      to: "HyperEVM",
      asset: "ETH",
      amount: "2.0",
      status: "Complete",
      time: "8 minutes",
      hash: "0xfgh...ijk",
      fee: "0.0035 ETH",
    },
    {
      date: "2023-07-28",
      type: "Withdrawal",
      from: "HyperEVM",
      to: "Ethereum",
      asset: "USDC",
      amount: "1500",
      status: "Complete",
      time: "12 minutes",
      hash: "0xghi...jkl",
      fee: "0.0032 ETH",
    },
    {
      date: "2023-07-15",
      type: "Deposit",
      from: "Ethereum",
      to: "HyperEVM",
      asset: "WBTC",
      amount: "0.05",
      status: "Complete",
      time: "10 minutes",
      hash: "0xhij...klm",
      fee: "0.0028 ETH",
    },
    {
      date: "2023-07-02",
      type: "Deposit",
      from: "Optimism",
      to: "HyperEVM",
      asset: "ETH",
      amount: "1.5",
      status: "Complete",
      time: "6 minutes",
      hash: "0xijk...lmn",
      fee: "0.0024 ETH",
    },
  ]

  // Approvals data
  const approvals = [
    {
      date: "2023-08-15",
      contract: "0x1234...7890",
      contractName: "Uniswap V3 Router",
      token: "USDC",
      amount: "Unlimited",
      status: "Active",
    },
    {
      date: "2023-08-14",
      contract: "0x2345...8901",
      contractName: "Aave V3 Lending Pool",
      token: "USDC",
      amount: "10000 USDC",
      status: "Active",
    },
    {
      date: "2023-08-10",
      contract: "0x4567...0123",
      contractName: "HypeLiquid Staking",
      token: "HYPE",
      amount: "5000 HYPE",
      status: "Active",
    },
    {
      date: "2023-07-25",
      contract: "0x5678...1234",
      contractName: "SushiSwap Router",
      token: "ETH",
      amount: "Unlimited",
      status: "Active",
    },
  ]

  // Execution logs data
  const executionLogs = [
    {
      date: "2023-08-15 15:32:18",
      contract: "0x1234...7890",
      contractName: "Uniswap V3 Router",
      function: "exactInputSingle()",
      arguments:
        "tokenIn: 0xC02...f11, tokenOut: 0xA0b...a4E, fee: 500, recipient: 0x7F5E...8AF3, amountIn: 1000000000000000000, amountOutMinimum: 3100000000, sqrtPriceLimitX96: 0",
      result: "amountOut: 3200000000",
      gas: "120845",
    },
    {
      date: "2023-08-14 11:45:23",
      contract: "0x2345...8901",
      contractName: "Aave V3 Lending Pool",
      function: "deposit()",
      arguments: "asset: 0xA0b...a4E, amount: 500000000, onBehalfOf: 0x7F5E...8AF3, referralCode: 0",
      result: "Success",
      gas: "98542",
    },
    {
      date: "2023-08-10 09:15:47",
      contract: "0x4567...0123",
      contractName: "HypeLiquid Staking",
      function: "stake()",
      arguments: "amount: 2500000000000000000000, receiver: 0x7F5E...8AF3",
      result: "shares: 2500000000000000000000",
      gas: "112368",
    },
  ]

  // Portfolio data
  const portfolioItems = [
    {
      type: "Token",
      name: "Ethereum",
      symbol: "ETH",
      balance: "2.45",
      value: "$10,251.00",
      performance: "+8.2%",
    },
    {
      type: "Token",
      name: "USD Coin",
      symbol: "USDC",
      balance: "3500",
      value: "$3,500.00",
      performance: "0%",
    },
    {
      type: "Token",
      name: "HypeLiquid",
      symbol: "HYPE",
      balance: "5000",
      value: "$2,500.00",
      performance: "+15.4%",
    },
    {
      type: "NFT",
      name: "CryptoArt #1234",
      symbol: "CART",
      balance: "1",
      value: "~0.2 ETH",
      performance: "-",
    },
    {
      type: "Token",
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      balance: "0.05",
      value: "$3,471.00",
      performance: "+5.8%",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">HyperEVM Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$19,722.00</div>
            <div className="text-sm flex items-center mt-1 text-gray-400">
              <ArrowDownUp className="h-4 w-4 mr-1" />5 assets
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Transaction Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="text-sm flex items-center mt-1 text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              Last 30 days
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Gas Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.085 ETH</div>
            <div className="text-sm flex items-center mt-1 text-gray-400">
              <ArrowDownLeft className="h-4 w-4 mr-1" />
              $356.30
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Explorer */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction Explorer</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Filter: {transactionFilter === "all" ? "All Types" : transactionFilter}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTransactionFilter("all")}>All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTransactionFilter("Swap")}>Swaps</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTransactionFilter("Deposit")}>
                  Deposits/Withdrawals
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTransactionFilter("Transfer")}>Transfers</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTransactionFilter("NFT")}>NFT Transactions</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px]"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gas Fee</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions
                  .filter((tx) => transactionFilter === "all" || tx.type.includes(transactionFilter))
                  .map((tx, index) => (
                    <TableRow key={index} className="hover:bg-[#1E2433]/30">
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-xs text-gray-400">{tx.contractName}</div>
                          <div>{tx.contract}</div>
                        </div>
                      </TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                          {tx.status}
                        </span>
                      </TableCell>
                      <TableCell>{tx.gas}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">
            View All Transactions
          </Button>
        </CardFooter>
      </Card>

      {/* Bridge History */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <CardTitle>Bridge History</CardTitle>
          <CardDescription>Track your cross-chain transfers to and from HyperEVM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>From → To</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bridgeHistory.map((bridge, index) => (
                  <TableRow key={index} className="hover:bg-[#1E2433]/30">
                    <TableCell>{bridge.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          bridge.type === "Deposit" ? "bg-green-500/20 text-green-500" : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {bridge.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {bridge.from}
                        <ArrowUpRight className="h-4 w-4 mx-1" />
                        {bridge.to}
                      </div>
                    </TableCell>
                    <TableCell>{bridge.asset}</TableCell>
                    <TableCell>{bridge.amount}</TableCell>
                    <TableCell>{bridge.time}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                        {bridge.status}
                      </span>
                    </TableCell>
                    <TableCell>{bridge.fee}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Approvals Tracking */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <CardTitle>Approvals Tracking</CardTitle>
          <CardDescription>Monitor token approvals given to contracts on HyperEVM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Approved Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvals.map((approval, index) => (
                  <TableRow key={index} className="hover:bg-[#1E2433]/30">
                    <TableCell>{approval.date}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="text-xs text-gray-400">{approval.contractName}</div>
                        <div>{approval.contract}</div>
                      </div>
                    </TableCell>
                    <TableCell>{approval.token}</TableCell>
                    <TableCell>{approval.amount}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                        {approval.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="destructive">
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm text-gray-400">
            <Shield className="h-4 w-4 mr-2" />
            Revoking an approval will prevent the contract from accessing your tokens
          </div>
        </CardFooter>
      </Card>

      {/* Execution Logs */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <CardTitle>Execution Logs</CardTitle>
          <CardDescription>Detailed function call logs for contract interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {executionLogs.map((log, index) => (
              <AccordionItem key={index} value={`log-${index}`} className="border-b border-[#1E2433]">
                <AccordionTrigger className="hover:bg-[#1E2433]/30 px-4 py-2 rounded-t-md">
                  <div className="flex justify-between items-center w-full mr-4">
                    <div className="flex items-center">
                      <FileCode2 className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span className="font-medium">{log.function}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div>{log.date}</div>
                      <div>{log.contractName}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2 bg-[#0A0E17]/50 rounded-b-md">
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Contract</div>
                      <div className="flex items-center">
                        <code className="bg-[#1A2036] px-2 py-1 rounded">{log.contract}</code>
                        <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Arguments</div>
                      <div className="bg-[#1A2036] px-3 py-2 rounded overflow-x-auto">
                        <code className="text-xs whitespace-pre-wrap">{log.arguments}</code>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Result</div>
                      <div className="bg-[#1A2036] px-3 py-2 rounded">
                        <code className="text-xs">{log.result}</code>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400">Gas Used: </span>
                        <span className="text-xs">{log.gas}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Explorer
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* HyperEVM Portfolio */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>HyperEVM Portfolio</CardTitle>
              <CardDescription>Assets held on HyperEVM</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tokens">
            <TabsList>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
            </TabsList>
            <TabsContent value="tokens" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Asset</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Value (USD)</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioItems
                      .filter((item) => item.type === "Token")
                      .map((item, index) => (
                        <TableRow key={index} className="hover:bg-[#1E2433]/30">
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 flex items-center justify-center mr-2">
                                <span className="font-bold text-xs">{item.symbol.substring(0, 2)}</span>
                              </div>
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-gray-400">{item.symbol}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{item.balance}</TableCell>
                          <TableCell>{item.value}</TableCell>
                          <TableCell>
                            {item.performance !== "0%" && item.performance !== "-" ? (
                              <span className={item.performance.startsWith("+") ? "text-green-500" : "text-red-500"}>
                                {item.performance}
                              </span>
                            ) : (
                              <span>{item.performance}</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <ArrowUpRight className="h-4 w-4 mr-2" />
                              Send
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="nfts" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolioItems
                  .filter((item) => item.type === "NFT")
                  .map((item, index) => (
                    <Card key={index} className="bg-[#0A0E17]/50 border-[#1E2433]">
                      <CardContent className="p-4">
                        <div className="aspect-square w-full bg-[#1A2036]/50 rounded-md mb-3 flex items-center justify-center">
                          <FileCode2 className="h-12 w-12 text-[#3B82F6]/50" />
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-400">ID: #{item.name.split("#")[1]}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{item.value}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

