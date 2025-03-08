"use client"

import { useState, useEffect } from "react"
import * as HyperliquidAPI from "@/lib/api/hyperliquid"

// Hook pour récupérer les marchés
export function useMarkets() {
  const [markets, setMarkets] = useState<HyperliquidAPI.Market[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMarkets() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getMarkets()
        setMarkets(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch markets"))
      } finally {
        setLoading(false)
      }
    }

    fetchMarkets()
  }, [])

  return { markets, loading, error }
}

// Hook pour récupérer les tickers
export function useTickers() {
  const [tickers, setTickers] = useState<HyperliquidAPI.Ticker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTickers() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getTickers()
        setTickers(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch tickers"))
      } finally {
        setLoading(false)
      }
    }

    fetchTickers()

    // Mettre à jour les tickers toutes les 10 secondes
    const interval = setInterval(fetchTickers, 10000)
    return () => clearInterval(interval)
  }, [])

  return { tickers, loading, error }
}

// Hook pour récupérer les positions d'un utilisateur
export function useUserPositions(userAddress: string) {
  const [positions, setPositions] = useState<HyperliquidAPI.Position[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userAddress) {
      setPositions([])
      setLoading(false)
      return
    }

    async function fetchPositions() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getUserPositions(userAddress)
        setPositions(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch positions"))
      } finally {
        setLoading(false)
      }
    }

    fetchPositions()

    // Mettre à jour les positions toutes les 30 secondes
    const interval = setInterval(fetchPositions, 30000)
    return () => clearInterval(interval)
  }, [userAddress])

  return { positions, loading, error }
}

// Hook pour récupérer les soldes d'un utilisateur
export function useUserBalances(userAddress: string) {
  const [balances, setBalances] = useState<HyperliquidAPI.UserBalance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userAddress) {
      setBalances([])
      setLoading(false)
      return
    }

    async function fetchBalances() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getUserBalances(userAddress)
        setBalances(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch balances"))
      } finally {
        setLoading(false)
      }
    }

    fetchBalances()

    // Mettre à jour les soldes toutes les 30 secondes
    const interval = setInterval(fetchBalances, 30000)
    return () => clearInterval(interval)
  }, [userAddress])

  return { balances, loading, error }
}

// Hook pour récupérer les ordres d'un utilisateur
export function useUserOrders(userAddress: string) {
  const [orders, setOrders] = useState<HyperliquidAPI.Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userAddress) {
      setOrders([])
      setLoading(false)
      return
    }

    async function fetchOrders() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getUserOrders(userAddress)
        setOrders(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch orders"))
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()

    // Mettre à jour les ordres toutes les 30 secondes
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [userAddress])

  return { orders, loading, error }
}

// Hook pour récupérer les trades d'un utilisateur
export function useUserTrades(userAddress: string, limit = 50) {
  const [trades, setTrades] = useState<HyperliquidAPI.Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userAddress) {
      setTrades([])
      setLoading(false)
      return
    }

    async function fetchTrades() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getUserTrades(userAddress, limit)
        setTrades(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch trades"))
      } finally {
        setLoading(false)
      }
    }

    fetchTrades()
  }, [userAddress, limit])

  return { trades, loading, error }
}

// Hook pour récupérer l'orderbook d'un marché
export function useOrderbook(market: string) {
  const [orderbook, setOrderbook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!market) {
      setOrderbook(null)
      setLoading(false)
      return
    }

    async function fetchOrderbook() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getOrderbook(market)
        setOrderbook(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch orderbook"))
      } finally {
        setLoading(false)
      }
    }

    fetchOrderbook()

    // Mettre à jour l'orderbook toutes les 5 secondes
    const interval = setInterval(fetchOrderbook, 5000)
    return () => clearInterval(interval)
  }, [market])

  return { orderbook, loading, error }
}

// Hook pour récupérer les données de candlestick d'un marché
export function useCandles(market: string, interval = "1h", limit = 100) {
  const [candles, setCandles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!market) {
      setCandles([])
      setLoading(false)
      return
    }

    async function fetchCandles() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getCandles(market, interval, limit)
        setCandles(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch candles"))
      } finally {
        setLoading(false)
      }
    }

    fetchCandles()

    // Mettre à jour les candles toutes les minutes
    const intervalId = setInterval(fetchCandles, 60000)
    return () => clearInterval(intervalId)
  }, [market, interval, limit])

  return { candles, loading, error }
}

// Hook pour récupérer les contrats HyperEVM d'un utilisateur
export function useHyperEVMContracts(userAddress: string) {
  const [contracts, setContracts] = useState<HyperliquidAPI.HyperEVMContract[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userAddress) {
      setContracts([])
      setLoading(false)
      return
    }

    async function fetchContracts() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getUserHyperEVMContracts(userAddress)
        setContracts(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch HyperEVM contracts"))
      } finally {
        setLoading(false)
      }
    }

    fetchContracts()
  }, [userAddress])

  return { contracts, loading, error }
}

// Hook pour récupérer les performances d'un contrat HyperEVM
export function useHyperEVMPerformance(contractAddress: string) {
  const [performance, setPerformance] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!contractAddress) {
      setPerformance(null)
      setLoading(false)
      return
    }

    async function fetchPerformance() {
      try {
        setLoading(true)
        const data = await HyperliquidAPI.getHyperEVMPerformance(contractAddress)
        setPerformance(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch HyperEVM performance"))
      } finally {
        setLoading(false)
      }
    }

    fetchPerformance()
  }, [contractAddress])

  return { performance, loading, error }
}

