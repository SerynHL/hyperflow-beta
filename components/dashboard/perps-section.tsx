"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Info, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart } from "@/components/ui/chart"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useWallet } from "@/lib/context/WalletContext"
import { useTickers, useUserPositions, useUserTrades, useCandles } from "@/lib/hooks/useHyperliquid"
import { AddressInput } from "@/components/address-input"

export default function PerpsSection() {
  const [pnlTimeframe, setPnlTimeframe] = useState("7d")
  const { connected, address } = useWallet()
  const { tickers, loading: tickersLoading } = useTickers()
  const { positions, loading: positionsLoading } = useUserPositions(address || "")
  const { trades, loading: tradesLoading } = useUserTrades(address || "", 50)
  const { candles: btcCandles, loading: btcCandlesLoading } = useCandles("BTC", "1d", 30)

  // État pour les données PnL
  const [pnlData, setPnlData] = useState({
    "24h": [
      { time: "00:00", pnl: 0 },
      { time: "04:00", pnl: 120 },
      { time: "08:00", pnl: 80 },
      { time: "12:00", pnl: 230 },
      { time: "16:00", pnl: 170 },
      { time: "20:00", pnl: 340 },
      { time: "24:00", pnl: 420 },
    ],
    "7d": [
      { time: "Mon", pnl: 0 },
      { time: "Tue", pnl: 120 },
      { time: "Wed", pnl: 80 },
      { time: "Thu", pnl: 230 },
      { time: "Fri", pnl: 310 },
      { time: "Sat", pnl: 420 },
      { time: "Sun", pnl: 520 },
    ],
    "1m": [
      { time: "Week 1", pnl: 0 },
      { time: "Week 2", pnl: 250 },
      { time: "Week 3", pnl: 420 },
      { time: "Week 4", pnl: 680 },
    ],
    all: [
      { time: "Jan", pnl: 0 },
      { time: "Feb", pnl: 250 },
      { time: "Mar", pnl: 520 },
      { time: "Apr", pnl: 420 },
      { time: "May", pnl: 680 },
      { time: "Jun", pnl: 1120 },
      { time: "Jul", pnl: 980 },
      { time: "Aug", pnl: 1420 },
    ],
  })

  // État pour les positions
  const [positionsData, setPositionsData] = useState<any[]>([])

  // État pour l'historique des trades
  const [tradeHistory, setTradeHistory] = useState<any[]>([])

  // Mettre à jour les données en fonction des API
  useEffect(() => {
    if (positions.length > 0 && tickers.length > 0) {
      const updatedPositions = positions.map((pos) => {
        const ticker = tickers.find((t) => t.coin === pos.coin)
        const markPrice = ticker ? Number.parseFloat(ticker.price) : 0
        const entryPrice = Number.parseFloat(pos.position.entryPx)
        const size = Number.parseFloat(pos.position.szi)
        const value = Math.abs(size * markPrice).toFixed(2)
        const pnl = Number.parseFloat(pos.position.unrealizedPnl)
        const pnlPercent = Number.parseFloat(pos.position.returnOnEquity) * 100

        return {
          symbol: `${pos.coin}-PERP`,
          type: size > 0 ? "Long" : "Short",
          size: size > 0 ? `+${size}` : `${size}`,
          value: `$${value}`,
          entryPrice: `$${entryPrice.toFixed(2)}`,
          markPrice: `$${markPrice.toFixed(2)}`,
          pnl: pnl >= 0 ? `+$${pnl.toFixed(2)}` : `-$${Math.abs(pnl).toFixed(2)}`,
          pnlPercent: pnlPercent >= 0 ? `+${pnlPercent.toFixed(2)}%` : `${pnlPercent.toFixed(2)}%`,
          leverage: `${pos.position.leverage}x`,
        }
      })

      setPositionsData(updatedPositions)
    } else {
      setPositionsData([])
    }
  }, [positions, tickers])

  // Mettre à jour l'historique des trades
  useEffect(() => {
    if (trades.length > 0) {
      const updatedTrades = trades.map((trade) => {
        const date = new Date(trade.time).toLocaleString()
        const type = trade.side === "B" ? "Buy" : "Sell"
        const price = Number.parseFloat(trade.px).toFixed(2)
        const pnl = trade.realizedPnl
          ? Number.parseFloat(trade.realizedPnl) >= 0
            ? `+$${Number.parseFloat(trade.realizedPnl).toFixed(2)}`
            : `-$${Math.abs(Number.parseFloat(trade.realizedPnl)).toFixed(2)}`
          : "-"

        return {
          date,
          symbol: `${trade.coin}-PERP`,
          type,
          size: trade.sz,
          price: `$${price}`,
          pnl,
          fee: `$${Number.parseFloat(trade.fee).toFixed(2)}`,
          status: "Filled",
        }
      })

      setTradeHistory(updatedTrades)
    } else {
      setTradeHistory([])
    }
  }, [trades])

  // Si l'utilisateur n'est pas connecté, afficher un message
  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Enter a Hyperliquid Address</h2>
          <p className="text-gray-400 max-w-md">
            Enter a Hyperliquid address to view perpetuals positions, trades, and performance.
          </p>
        </div>
        <AddressInput />
      </div>
    )
  }

  // Si les données sont en cours de chargement, afficher un indicateur de chargement
  if (positionsLoading || tradesLoading || tickersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <Loader2 className="h-12 w-12 animate-spin text-[#3B82F6]" />
        <p className="text-gray-400">Loading Hyperliquid perpetuals data for {address}...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Account Value"
          value={positions.length > 0 ? "$46,415.00" : "$0.00"}
          change={positions.length > 0 ? "+5.2%" : "0%"}
          trend="up"
          tooltip="Total value of your perpetuals account"
        />
        <MetricCard
          title="PnL (24h)"
          value={positions.length > 0 ? "$420.25" : "$0.00"}
          change={positions.length > 0 ? "+0.91%" : "0%"}
          trend="up"
          tooltip="Profit and loss over the last 24 hours"
        />
        <MetricCard
          title="Win Rate"
          value={trades.length > 0 ? "64.8%" : "0%"}
          change={trades.length > 0 ? "+2.2%" : "0%"}
          trend="up"
          tooltip="Percentage of winning trades"
        />
        <MetricCard
          title="Max Drawdown"
          value={positions.length > 0 ? "-12.3%" : "0%"}
          change={positions.length > 0 ? "-1.5%" : "0%"}
          trend="down"
          tooltip="Maximum observed loss from a peak to a trough"
        />
      </div>

      {/* PnL chart and Positions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">PnL Chart</CardTitle>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={pnlTimeframe === "24h" ? "default" : "outline"}
                  onClick={() => setPnlTimeframe("24h")}
                  className="h-7 text-xs"
                >
                  24h
                </Button>
                <Button
                  size="sm"
                  variant={pnlTimeframe === "7d" ? "default" : "outline"}
                  onClick={() => setPnlTimeframe("7d")}
                  className="h-7 text-xs"
                >
                  7d
                </Button>
                <Button
                  size="sm"
                  variant={pnlTimeframe === "1m" ? "default" : "outline"}
                  onClick={() => setPnlTimeframe("1m")}
                  className="h-7 text-xs"
                >
                  1m
                </Button>
                <Button
                  size="sm"
                  variant={pnlTimeframe === "all" ? "default" : "outline"}
                  onClick={() => setPnlTimeframe("all")}
                  className="h-7 text-xs"
                >
                  All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <AreaChart
                data={pnlData[pnlTimeframe]}
                index="time"
                categories={["pnl"]}
                colors={["#3B82F6"]}
                valueFormatter={(value) => `$${value}`}
                showLegend={false}
                showAnimation={true}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Live Positions</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="max-h-80 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[120px]">Symbol</TableHead>
                    <TableHead className="text-right">Size</TableHead>
                    <TableHead className="text-right">PnL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positionsData.length > 0 ? (
                    positionsData.map((position, index) => (
                      <TableRow key={index} className="hover:bg-[#1E2433]/30 cursor-pointer">
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {position.type === "Long" ? (
                              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            {position.symbol}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{position.size}</TableCell>
                        <TableCell
                          className={`text-right ${position.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                        >
                          {position.pnl}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-gray-400">
                        No open positions
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              View All Positions
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Position Details Table */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <CardTitle>Position Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Entry Price</TableHead>
                  <TableHead>Mark Price</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>PnL ($)</TableHead>
                  <TableHead>PnL (%)</TableHead>
                  <TableHead>Leverage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positionsData.length > 0 ? (
                  positionsData.map((position, index) => (
                    <TableRow key={index} className="hover:bg-[#1E2433]/30">
                      <TableCell className="font-medium">{position.symbol}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${position.type === "Long" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                        >
                          {position.type}
                        </span>
                      </TableCell>
                      <TableCell>{position.size}</TableCell>
                      <TableCell>{position.entryPrice}</TableCell>
                      <TableCell>{position.markPrice}</TableCell>
                      <TableCell>{position.value}</TableCell>
                      <TableCell className={position.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}>
                        {position.pnl}
                      </TableCell>
                      <TableCell className={position.pnlPercent.startsWith("+") ? "text-green-500" : "text-red-500"}>
                        {position.pnlPercent}
                      </TableCell>
                      <TableCell>{position.leverage}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4 text-gray-400">
                      No open positions
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
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
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>PnL</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tradeHistory.length > 0 ? (
                  tradeHistory.map((trade, index) => (
                    <TableRow key={index} className="hover:bg-[#1E2433]/30">
                      <TableCell className="text-xs">{trade.date}</TableCell>
                      <TableCell>{trade.symbol}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${trade.type === "Buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                        >
                          {trade.type}
                        </span>
                      </TableCell>
                      <TableCell>{trade.size}</TableCell>
                      <TableCell>{trade.price}</TableCell>
                      <TableCell className={trade.pnl.startsWith("+") ? "text-green-500" : "text-gray-400"}>
                        {trade.pnl}
                      </TableCell>
                      <TableCell>{trade.fee}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                          {trade.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-400">
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

// Helper component for metric cards
function MetricCard({ title, value, change, trend, tooltip }) {
  return (
    <Card className="bg-[#1A2036]/50 border-[#1E2433]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-sm flex items-center mt-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
          {trend === "up" ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {change}
        </div>
      </CardContent>
    </Card>
  )
}

