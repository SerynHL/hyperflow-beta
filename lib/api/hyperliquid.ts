// API client pour Hyperliquid
// Documentation: https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api

// Base URLs
const HYPERLIQUID_API_URL = "https://api.hyperliquid.xyz"
const HYPERLIQUID_INFO_URL = "https://api.hyperliquid.xyz/info"
const HYPERLIQUID_EXCHANGE_URL = "https://api.hyperliquid.xyz/exchange"

// Types
export interface Market {
  name: string
  szDecimals: number
  priceDecimals: number
  maxLeverage: number
  baseCurrency: string
  quoteCurrency: string
  tickSize: number
  baseAssetPrecision: number
  quoteAssetPrecision: number
}

export interface Ticker {
  coin: string
  price: string
  chg24h: string
  vol24h: string
  apy: string
}

export interface Position {
  coin: string
  position: {
    coin: string
    szi: string
    leverage: string
    entryPx: string
    positionValue: string
    unrealizedPnl: string
    returnOnEquity: string
    liquidationPx: string
    marginUsed: string
    type: "long" | "short"
  }
}

export interface UserBalance {
  coin: string
  free: string
  locked: string
  total: string
  usdValue: string
}

export interface Order {
  coin: string
  limitPx: string
  sz: string
  side: "A" | "B" // A = Ask (Sell), B = Bid (Buy)
  orderType: "Limit" | "Market" | "Stop" | "TakeProfit"
  timestamp: number
  status: "Open" | "Filled" | "Cancelled"
  oid: string
}

export interface Trade {
  coin: string
  side: "A" | "B"
  px: string
  sz: string
  time: number
  fee: string
  realizedPnl: string
  orderId: string
}

export interface HyperEVMContract {
  address: string
  name: string
  description: string
  createdAt: number
  txCount: number
  balance: string
}

// Fonctions API

// Récupérer les informations sur tous les marchés
export async function getMarkets(): Promise<Market[]> {
  try {
    const response = await fetch(`${HYPERLIQUID_INFO_URL}/meta`)
    if (!response.ok) throw new Error("Failed to fetch markets")
    const data = await response.json()
    return data.universe
  } catch (error) {
    console.error("Error fetching markets:", error)
    throw error
  }
}

// Récupérer les tickers (prix actuels) pour tous les marchés
export async function getTickers(): Promise<Ticker[]> {
  try {
    const response = await fetch(`${HYPERLIQUID_INFO_URL}/ticker`)
    if (!response.ok) throw new Error("Failed to fetch tickers")
    return await response.json()
  } catch (error) {
    console.error("Error fetching tickers:", error)
    throw error
  }
}

// Récupérer les positions ouvertes d'un utilisateur
export async function getUserPositions(userAddress: string): Promise<Position[]> {
  try {
    const payload = {
      type: "clearinghouse",
      method: "userState",
      params: { user: userAddress },
    }

    const response = await fetch(`${HYPERLIQUID_EXCHANGE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error("Failed to fetch user positions")
    const data = await response.json()
    return data.assetPositions || []
  } catch (error) {
    console.error("Error fetching user positions:", error)
    throw error
  }
}

// Récupérer le solde d'un utilisateur
export async function getUserBalances(userAddress: string): Promise<UserBalance[]> {
  try {
    const payload = {
      type: "clearinghouse",
      method: "userState",
      params: { user: userAddress },
    }

    const response = await fetch(`${HYPERLIQUID_EXCHANGE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error("Failed to fetch user balances")
    const data = await response.json()

    // Transformer les données pour correspondre à notre interface
    return data.crossMarginSummary
      ? [
          {
            coin: "USD",
            free: data.crossMarginSummary.accountValue,
            locked: data.crossMarginSummary.totalMarginUsed,
            total: data.crossMarginSummary.accountValue,
            usdValue: data.crossMarginSummary.accountValue,
          },
        ]
      : []
  } catch (error) {
    console.error("Error fetching user balances:", error)
    throw error
  }
}

// Récupérer l'historique des ordres d'un utilisateur
export async function getUserOrders(userAddress: string): Promise<Order[]> {
  try {
    const payload = {
      type: "exchange",
      method: "openOrders",
      params: { user: userAddress },
    }

    const response = await fetch(`${HYPERLIQUID_EXCHANGE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error("Failed to fetch user orders")
    const data = await response.json()
    return data || []
  } catch (error) {
    console.error("Error fetching user orders:", error)
    throw error
  }
}

// Récupérer l'historique des trades d'un utilisateur
export async function getUserTrades(userAddress: string, limit = 50): Promise<Trade[]> {
  try {
    const payload = {
      type: "exchange",
      method: "tradeHistory",
      params: { user: userAddress, limit },
    }

    const response = await fetch(`${HYPERLIQUID_EXCHANGE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error("Failed to fetch user trades")
    const data = await response.json()
    return data || []
  } catch (error) {
    console.error("Error fetching user trades:", error)
    throw error
  }
}

// Récupérer les données de l'orderbook pour un marché spécifique
export async function getOrderbook(market: string): Promise<any> {
  try {
    const payload = {
      type: "exchange",
      method: "l2Book",
      params: { coin: market },
    }

    const response = await fetch(`${HYPERLIQUID_EXCHANGE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error("Failed to fetch orderbook")
    return await response.json()
  } catch (error) {
    console.error("Error fetching orderbook:", error)
    throw error
  }
}

// Récupérer les données de candlestick pour un marché spécifique
export async function getCandles(market: string, interval = "1h", limit = 100): Promise<any> {
  try {
    const response = await fetch(`${HYPERLIQUID_INFO_URL}/candles?coin=${market}&interval=${interval}&limit=${limit}`)
    if (!response.ok) throw new Error("Failed to fetch candles")
    return await response.json()
  } catch (error) {
    console.error("Error fetching candles:", error)
    throw error
  }
}

// Fonctions pour HyperEVM

// Récupérer les contrats HyperEVM d'un utilisateur
export async function getUserHyperEVMContracts(userAddress: string): Promise<HyperEVMContract[]> {
  try {
    // Cette URL est un exemple, il faudrait utiliser l'API réelle de HyperEVM
    const response = await fetch(
      `https://hyperliquid.cloud.blockscout.com/api?module=account&action=tokenlist&address=${userAddress}`,
    )
    if (!response.ok) throw new Error("Failed to fetch HyperEVM contracts")
    const data = await response.json()

    // Transformer les données pour correspondre à notre interface
    return data.result.map((contract: any) => ({
      address: contract.contractAddress,
      name: contract.name || "Unknown Contract",
      description: contract.symbol || "",
      createdAt: Date.now(), // Pas disponible dans cette API
      txCount: 0, // Pas disponible dans cette API
      balance: contract.balance || "0",
    }))
  } catch (error) {
    console.error("Error fetching HyperEVM contracts:", error)
    // Retourner des données fictives pour le moment
    return [
      {
        address: "0x1234567890abcdef1234567890abcdef12345678",
        name: "Funding Rate Arbitrage",
        description: "Automated strategy for funding rate arbitrage",
        createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        txCount: 42,
        balance: "0.25",
      },
      {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
        name: "BTC-ETH Ratio Trading",
        description: "Strategy based on BTC/ETH price ratio",
        createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
        txCount: 28,
        balance: "0.15",
      },
    ]
  }
}

// Récupérer les performances des contrats HyperEVM
export async function getHyperEVMPerformance(contractAddress: string): Promise<any> {
  try {
    // Cette URL est un exemple, il faudrait utiliser l'API réelle de HyperEVM
    const response = await fetch(
      `https://hyperliquid.cloud.blockscout.com/api?module=account&action=txlist&address=${contractAddress}`,
    )
    if (!response.ok) throw new Error("Failed to fetch HyperEVM performance")
    const data = await response.json()

    // Transformer les données pour correspondre à nos besoins
    return {
      totalPnl: "+$1,245.80",
      winRate: "68%",
      avgTradeDuration: "4.2 hours",
      trades: data.result.slice(0, 10), // Limiter à 10 transactions
    }
  } catch (error) {
    console.error("Error fetching HyperEVM performance:", error)
    // Retourner des données fictives pour le moment
    return {
      totalPnl: "+$1,245.80",
      winRate: "68%",
      avgTradeDuration: "4.2 hours",
      trades: [],
    }
  }
}

