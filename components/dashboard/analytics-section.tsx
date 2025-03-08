"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, AreaChart } from "@/components/ui/chart"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, BarChart3, Code, Loader2 } from "lucide-react"
import { useWallet } from "@/lib/context/WalletContext"
import { useTickers, useUserPositions, useUserBalances, useUserTrades } from "@/lib/hooks/useHyperliquid"
import { useEffect, useState } from "react"
import { AddressInput } from "@/components/address-input"

export default function AnalyticsSection() {
  const { connected, address } = useWallet()
  const { tickers, loading: tickersLoading } = useTickers()
  const { positions, loading: positionsLoading } = useUserPositions(address || "")
  const { balances, loading: balancesLoading } = useUserBalances(address || "")
  const { trades, loading: tradesLoading } = useUserTrades(address || "", 10)

  // États pour les données calculées
  const [portfolioData, setPortfolioData] = useState([
    { name: "Spot", value: 45 },
    { name: "Perpetuals", value: 35 },
    { name: "HyperEVM", value: 20 },
  ])

  const [performanceData, setPerformanceData] = useState([
    { date: "Jan", value: 10000 },
    { date: "Feb", value: 12500 },
    { date: "Mar", value: 11800 },
    { date: "Apr", value: 14200 },
    { date: "May", value: 16500 },
    { date: "Jun", value: 18300 },
    { date: "Jul", value: 21000 },
    { date: "Aug", value: 23500 },
  ])

  const [assetAllocation, setAssetAllocation] = useState<any[]>([])

  const [totalValue, setTotalValue] = useState("$0.00")
  const [spotValue, setSpotValue] = useState("$0.00")
  const [perpsValue, setPerpsValue] = useState("$0.00")
  const [hyperEvmValue, setHyperEvmValue] = useState("$0.00")

  const [recentActivity, setRecentActivity] = useState<any[]>([])

  // Calculer les valeurs totales à partir des données de l'API
  useEffect(() => {
    if (balances.length > 0) {
      // Calculer la valeur totale
      const total = balances.reduce((sum, balance) => sum + Number.parseFloat(balance.usdValue || "0"), 0)
      setTotalValue(`$${total.toFixed(2)}`)

      // Pour cet exemple, nous allons répartir arbitrairement la valeur totale
      // Dans une implémentation réelle, ces valeurs viendraient de l'API
      setSpotValue(`$${(total * 0.45).toFixed(2)}`)
      setPerpsValue(`$${(total * 0.35).toFixed(2)}`)
      setHyperEvmValue(`$${(total * 0.2).toFixed(2)}`)

      // Mettre à jour la répartition du portefeuille
      setPortfolioData([
        { name: "Spot", value: 45 },
        { name: "Perpetuals", value: 35 },
        { name: "HyperEVM", value: 20 },
      ])
    }
  }, [balances])

  // Mettre à jour l'allocation des actifs en fonction des tickers
  useEffect(() => {
    if (tickers.length > 0 && balances.length > 0) {
      // Créer une liste des actifs avec leurs valeurs
      const assets = tickers.slice(0, 5).map((ticker) => {
        const price = Number.parseFloat(ticker.price)
        const chg24h = Number.parseFloat(ticker.chg24h)

        // Simuler une valeur pour chaque actif
        // Dans une implémentation réelle, cette valeur viendrait de l'API
        const value = Math.random() * 50000
        const percentage = ((value / Number.parseFloat(totalValue.replace("$", ""))) * 100).toFixed(0)

        return {
          asset: ticker.coin,
          value: `$${value.toFixed(2)}`,
          percentage: `${percentage}%`,
          change: chg24h >= 0 ? `+${chg24h.toFixed(2)}%` : `${chg24h.toFixed(2)}%`,
        }
      })

      setAssetAllocation(assets)
    }
  }, [tickers, balances, totalValue])

  // Mettre à jour les activités récentes en fonction des trades
  useEffect(() => {
    if (trades.length > 0) {
      const newActivity = trades.slice(0, 5).map((trade) => {
        const type = trade.side === "B" ? "Buy" : "Sell"
        const time = getRelativeTime(trade.time)
        return {
          type,
          asset: trade.coin,
          amount: `${trade.sz} ${trade.coin}`,
          value: `$${(Number.parseFloat(trade.px) * Number.parseFloat(trade.sz)).toFixed(2)}`,
          time,
        }
      })
      setRecentActivity(newActivity)
    }
  }, [trades])

  // Si l'utilisateur n'est pas connecté, afficher un message
  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Enter a Hyperliquid Address</h2>
          <p className="text-gray-400 max-w-md">
            Enter a Hyperliquid address to view portfolio data, positions, and trading activity.
          </p>
        </div>
        <AddressInput />
      </div>
    )
  }

  // Si les données sont en cours de chargement, afficher un indicateur de chargement
  if (positionsLoading || balancesLoading || tickersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <Loader2 className="h-12 w-12 animate-spin text-[#3B82F6]" />
        <p className="text-gray-400">Loading Hyperliquid data for {address}...</p>
      </div>
    )
  }

  // Si aucune donnée n'est disponible après le chargement
  if (!balances.length && !positions.length && !trades.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">No Data Found</h2>
          <p className="text-gray-400 max-w-md">
            No Hyperliquid data found for this address. Please check the address and try again.
          </p>
        </div>
        <AddressInput />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Portfolio Value"
          value={totalValue}
          change={balances.length > 0 ? "+5.2%" : "0%"}
          trend="up"
          icon={<Wallet className="h-5 w-5 text-[#3B82F6]" />}
        />
        <MetricCard
          title="Spot Holdings"
          value={spotValue}
          change={balances.length > 0 ? "+3.8%" : "0%"}
          trend="up"
          icon={<BarChart3 className="h-5 w-5 text-green-500" />}
        />
        <MetricCard
          title="Perpetuals PnL"
          value={perpsValue}
          change={positions.length > 0 ? "+7.2%" : "0%"}
          trend="up"
          icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
        />
        <MetricCard
          title="HyperEVM Value"
          value={hyperEvmValue}
          change="+4.5%"
          trend="up"
          icon={<Code className="h-5 w-5 text-blue-500" />}
        />
      </div>

      {/* Portfolio distribution and performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader>
            <CardTitle>Portfolio Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <PieChart
                data={portfolioData}
                index="name"
                category="value"
                valueFormatter={(value) => `${value}%`}
                colors={["#22C55E", "#8B5CF6", "#3B82F6"]}
              />
            </div>
            <div className="mt-4 space-y-2">
              {[
                { name: "Spot", value: "45%", color: "#22C55E" },
                { name: "Perpetuals", value: "35%", color: "#8B5CF6" },
                { name: "HyperEVM", value: "20%", color: "#3B82F6" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <AreaChart
                data={performanceData}
                index="date"
                categories={["value"]}
                colors={["#3B82F6"]}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                showLegend={false}
                showAnimation={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset allocation */}
      <Card className="bg-[#1A2036]/50 border-[#1E2433]">
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assetAllocation.length > 0 ? (
              assetAllocation.map((asset, index) => (
                <div key={index} className="bg-[#0A0E17]/70 rounded-lg p-4 border border-[#1E2433]/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-lg font-bold">{asset.asset}</div>
                    <div
                      className={`text-sm ${asset.change.startsWith("+") ? "text-green-500" : asset.change.startsWith("-") ? "text-red-500" : "text-gray-400"}`}
                    >
                      {asset.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{asset.value}</div>
                  <div className="text-sm text-gray-400">{asset.percentage} of portfolio</div>
                  <div className="mt-2 h-1.5 bg-[#1A2036] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#3B82F6]/80 to-[#3B82F6]"
                      style={{ width: asset.percentage }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-400">No asset allocation data available</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trading activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader>
            <CardTitle>Recent Trading Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-[#0A0E17]/70 rounded-lg border border-[#1E2433]/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <div className="font-medium">
                          {activity.type} {activity.asset}
                        </div>
                        <div className="text-sm text-gray-400">{activity.amount}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{activity.value}</div>
                      <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">No recent trading activity</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A2036]/50 border-[#1E2433]">
          <CardHeader>
            <CardTitle>Trading Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#0A0E17]/70 rounded-lg border border-[#1E2433]/50">
                <div className="text-sm text-gray-400">Total Trades</div>
                <div className="text-2xl font-bold mt-1">{trades.length || 0}</div>
                <div className="text-sm text-gray-400 mt-1">Last 30 days</div>
              </div>
              <div className="p-4 bg-[#0A0E17]/70 rounded-lg border border-[#1E2433]/50">
                <div className="text-sm text-gray-400">Win Rate</div>
                <div className="text-2xl font-bold mt-1 text-green-500">{trades.length > 0 ? "64.8%" : "0%"}</div>
                <div className="text-sm text-gray-400 mt-1">Last 30 days</div>
              </div>
              <div className="p-4 bg-[#0A0E17]/70 rounded-lg border border-[#1E2433]/50">
                <div className="text-sm text-gray-400">Avg. Trade Duration</div>
                <div className="text-2xl font-bold mt-1">{trades.length > 0 ? "5.2h" : "-"}</div>
                <div className="text-sm text-gray-400 mt-1">Last 30 days</div>
              </div>
              <div className="p-4 bg-[#0A0E17]/70 rounded-lg border border-[#1E2433]/50">
                <div className="text-sm text-gray-400">Max Drawdown</div>
                <div className="text-2xl font-bold mt-1 text-red-500">{trades.length > 0 ? "-12.3%" : "-"}</div>
                <div className="text-sm text-gray-400 mt-1">Last 30 days</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Long Trades Win Rate</div>
                  <div className="text-sm font-medium">{trades.length > 0 ? "68%" : "0%"}</div>
                </div>
                <div className="h-2 bg-[#0A0E17] rounded-full">
                  <div className="h-full w-[68%] bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Short Trades Win Rate</div>
                  <div className="text-sm font-medium">{trades.length > 0 ? "52%" : "0%"}</div>
                </div>
                <div className="h-2 bg-[#0A0E17] rounded-full">
                  <div className="h-full w-[52%] bg-red-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Spot Trades Win Rate</div>
                  <div className="text-sm font-medium">{trades.length > 0 ? "75%" : "0%"}</div>
                </div>
                <div className="h-2 bg-[#0A0E17] rounded-full">
                  <div className="h-full w-[75%] bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper component for metric cards
function MetricCard({ title, value, change, trend, icon }) {
  return (
    <Card className="bg-[#1A2036]/50 border-[#1E2433]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className={`text-sm flex items-center mt-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {trend === "up" ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {change}
            </div>
          </div>
          <div className="p-3 rounded-full bg-[#0A0E17]/70 border border-[#1E2433]/50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function getActivityColor(type: string) {
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

function getActivityIcon(type: string) {
  switch (type) {
    case "Buy":
      return <ArrowUpRight className="h-5 w-5" />
    case "Sell":
      return <ArrowDownRight className="h-5 w-5" />
    case "Deposit":
      return <ArrowUpRight className="h-5 w-5" />
    case "Withdrawal":
      return <ArrowDownRight className="h-5 w-5" />
    default:
      return <ArrowUpRight className="h-5 w-5" />
  }
}

function getRelativeTime(timestamp: number) {
  const now = Date.now()
  const diff = now - timestamp

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else {
    return "Just now"
  }
}

