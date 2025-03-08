"use client"

import { useState, useEffect } from "react"
import { TrendingUp, ChevronDown, ChevronUp, Clock, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AreaChart, LineChart, PieChart } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/lib/context/WalletContext"
import { useTickers, useUserBalances, useUserTrades } from "@/lib/hooks/useHyperliquid"
import { AddressInput } from "@/components/address-input"

export default function SpotSection() {
  const [sortBy, setSortBy] = useState("performance")
  const { connected, address } = useWallet()
  const { tickers, loading: tickersLoading } = useTickers()
  const { balances, loading: balancesLoading } = useUserBalances(address || "")
  const { trades, loading: tradesLoading } = useUserTrades(address || "", 50)

  // Portfolio breakdown data
  const [portfolioBreakdown, setPortfolioBreakdown] = useState([
    { token: "BTC", value: 40, color: "#F7931A" },
    { token: "ETH", value: 30, color: "#627EEA" },
    { token: "SOL", value: 15, color: "#8E82F8" },
    { token: "AVAX", value: 8, color: "#E84142" },
    { token: "DOT", value: 7, color: "#E6007A" },
  ])

  // Token details data
  const [tokenDetails, setTokenDetails] = useState<any[]>([])

  // Historical performance data
  const [historicalPerformance, setHistoricalPerformance] = useState([
    {
      token: "BTC",
      data: [
        { date: "2023-01", value: 0 },
        { date: "2023-02", value: 520 },
        { date: "2023-03", value: 450 },
        { date: "2023-04", value: 640 },
        { date: "2023-05", value: 720 },
        { date: "2023-06", value: 850 },
        { date: "2023-07", value: 1050 },
        { date: "2023-08", value: 1280 },
      ],
    },
    {
      token: "ETH",
      data: [
        { date: "2023-01", value: 0 },
        { date: "2023-02", value: 320 },
        { date: "2023-03", value: 280 },
        { date: "2023-04", value: 450 },
        { date: "2023-05", value: 520 },
        { date: "2023-06", value: 650 },
        { date: "2023-07", value: 950 },
        { date: "2023-08", value: 1155 },
      ],
    },
    {
      token: "SOL",
      data: [
        { date: "2023-01", value: 0 },
        { date: "2023-02", value: 0 },
        { date: "2023-03", value: 0 },
        { date: "2023-04", value: 0 },
        { date: "2023-05", value: 0 },
        { date: "2023-06", value: 0 },
        { date: "2023-07", value: 620 },
        { date: "2023-08", value: 1080 },
      ],
    },
  ])

  // Trade history data
  const [tradeHistory, setTradeHistory] = useState<any[]>([])

  // Mettre à jour les données en fonction des API
  useEffect(() => {
    if (tickers.length > 0 && balances.length > 0) {
      // Créer des données de token à partir des tickers
      const tokens = tickers.slice(0, 5).map((ticker) => {
        const currentPrice = Number.parseFloat(ticker.price)
        const chg24h = Number.parseFloat(ticker.chg24h)

        // Simuler des données pour chaque token
        const amount = (Math.random() * 10).toFixed(2)
        const avgPrice = (currentPrice * (1 - Math.random() * 0.2)).toFixed(2)
        const totalCost = (Number.parseFloat(avgPrice) * Number.parseFloat(amount)).toFixed(2)
        const currentValue = (currentPrice * Number.parseFloat(amount)).toFixed(2)
        const pnl = (Number.parseFloat(currentValue) - Number.parseFloat(totalCost)).toFixed(2)
        const pnlPercent = ((Number.parseFloat(pnl) / Number.parseFloat(totalCost)) * 100).toFixed(2)

        return {
          token: ticker.coin,
          amount,
          avgPrice: `$${avgPrice}`,
          currentPrice: `$${currentPrice.toFixed(2)}`,
          totalCost: `$${totalCost}`,
          currentValue: `$${currentValue}`,
          pnl: Number.parseFloat(pnl) >= 0 ? `+$${pnl}` : `-$${Math.abs(Number.parseFloat(pnl)).toFixed(2)}`,
          pnlPercent: Number.parseFloat(pnlPercent) >= 0 ? `+${pnlPercent}%` : `${pnlPercent}%`,
          purchaseDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        }
      })

      setTokenDetails(tokens)
    } else {
      setTokenDetails([])
    }
  }, [tickers, balances])

  // Mettre à jour l'historique des trades
  useEffect(() => {
    if (trades.length > 0) {
      const updatedTrades = trades.map((trade) => {
        const date = new Date(trade.time).toLocaleString()
        const type = trade.side === "B" ? "Buy" : "Sell"
        const price = Number.parseFloat(trade.px).toFixed(2)
        const amount = trade.sz
        const total = (Number.parseFloat(trade.px) * Number.parseFloat(trade.sz)).toFixed(2)

        return {
          date,
          type,
          token: trade.coin,
          amount,
          price: `$${price}`,
          total: `$${total}`,
          fee: `$${Number.parseFloat(trade.fee).toFixed(2)}`,
        }
      })

      setTradeHistory(updatedTrades)
    } else {
      setTradeHistory([])
    }
  }, [trades])

  // Format pour chart data
  const portfolioData = portfolioBreakdown.map((item) => ({
    name: item.token,
    value: item.value,
  }))

  // Performance metrics data
  const performanceData = [
    { month: "Jan", pnl: 580 },
    { month: "Feb", pnl: 480 },
    { month: "Mar", pnl: 740 },
    { month: "Apr", pnl: 520 },
    { month: "May", pnl: 890 },
    { month: "Jun", pnl: 1250 },
    { month: "Jul", pnl: 1640 },
    { month: "Aug", pnl: 1980 },
  ]

  // Si l'utilisateur n'est pas connecté, afficher un message
  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Enter a Hyperliquid Address</h2>
          <p className="text-gray-400 max-w-md">
            Enter a Hyperliquid address to view spot holdings, trades, and performance.
          </p>
        </div>
        <AddressInput />
      </div>
    )
  }

  // Si les données sont en cours de chargement, afficher un indicateur de chargement
  if (balancesLoading || tradesLoading || tickersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <Loader2 className="h-12 w-12 animate-spin text-[#3B82F6]" />
        <p className="text-gray-400">Loading Hyperliquid spot data for {address}...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {balances.length > 0 ? `$${Number.parseFloat(balances[0].usdValue || "0").toFixed(2)}` : "$0.00"}
            </div>
            <div className="text-sm flex items-center mt-1 text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              {balances.length > 0 ? "+7.62% ($3,580.00)" : "0%"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balances.length > 0 ? "+$1,245.80" : "$0.00"}</div>
            <div className="text-sm flex items-center mt-1 text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              {balances.length > 0 ? "+2.54%" : "0%"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Staking Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balances.length > 0 ? "$488.28" : "$0.00"}</div>
            <div className="text-sm flex items-center mt-1 text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              Accumulated
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Breakdown and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Portfolio Breakdown</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("performance")}>Performance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("marketcap")}>Market Cap</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("volatility")}>Volatility</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <PieChart
                data={portfolioData}
                index="name"
                category="value"
                valueFormatter={(value) => `${value}%`}
                colors={["#F7931A", "#627EEA", "#8E82F8", "#E84142", "#E6007A"]}
              />
            </div>
            <div className="mt-4 space-y-2">
              {portfolioBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.token}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <AreaChart
                data={performanceData}
                index="month"
                categories={["pnl"]}
                colors={["#3B82F6"]}
                valueFormatter={(value) => `$${value}`}
                showLegend={false}
                showAnimation={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Details Table */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <CardTitle>Token Details</CardTitle>
          <CardDescription>Detailed analysis of your spot tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Token</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Avg. Price</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>PnL ($)</TableHead>
                  <TableHead>PnL (%)</TableHead>
                  <TableHead>Held Since</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokenDetails.length > 0 ? (
                  tokenDetails.map((token, index) => (
                    <TableRow key={index} className="hover:bg-[#1E2433]/30">
                      <TableCell className="font-medium">{token.token}</TableCell>
                      <TableCell>{token.amount}</TableCell>
                      <TableCell>{token.avgPrice}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {token.currentPrice}
                          <span className={`ml-2 ${token.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                            {token.pnl.startsWith("+") ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{token.totalCost}</TableCell>
                      <TableCell>{token.currentValue}</TableCell>
                      <TableCell className={token.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}>
                        {token.pnl}
                      </TableCell>
                      <TableCell className={token.pnlPercent.startsWith("+") ? "text-green-500" : "text-red-500"}>
                        {token.pnlPercent}
                      </TableCell>
                      <TableCell>{token.purchaseDate}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4 text-gray-400">
                      No token details available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Token Historical Performance */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <CardTitle>Token PnL Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="btc">
            <TabsList>
              <TabsTrigger value="btc">BTC</TabsTrigger>
              <TabsTrigger value="eth">ETH</TabsTrigger>
              <TabsTrigger value="sol">SOL</TabsTrigger>
            </TabsList>
            <div className="h-64 mt-4">
              {historicalPerformance.map((item) => (
                <TabsContent key={item.token.toLowerCase()} value={item.token.toLowerCase()}>
                  <LineChart
                    data={item.data}
                    index="date"
                    categories={["value"]}
                    colors={["#3B82F6"]}
                    valueFormatter={(value) => `$${value}`}
                    showLegend={false}
                  />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Trade History */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tradeHistory.length > 0 ? (
                  tradeHistory.map((trade, index) => (
                    <TableRow key={index} className="hover:bg-[#1E2433]/30">
                      <TableCell className="text-xs">{trade.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${trade.type === "Buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                        >
                          {trade.type}
                        </span>
                      </TableCell>
                      <TableCell>{trade.token}</TableCell>
                      <TableCell>{trade.amount}</TableCell>
                      <TableCell>{trade.price}</TableCell>
                      <TableCell>{trade.total}</TableCell>
                      <TableCell>{trade.fee}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                      No trade history
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">
            View All Trades
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

