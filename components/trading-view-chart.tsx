"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function TradingViewChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Generate random price data
    const generatePriceData = (length: number, volatility: number) => {
      const startPrice = 69400
      const prices = [startPrice]

      for (let i = 1; i < length; i++) {
        const change = (Math.random() - 0.5) * volatility
        const newPrice = prices[i - 1] * (1 + change)
        prices.push(newPrice)
      }

      return prices
    }

    const prices = generatePriceData(100, 0.005)

    // Draw chart
    const drawChart = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set chart dimensions
      const padding = 20
      const chartWidth = canvas.width - padding * 2
      const chartHeight = canvas.height - padding * 2

      // Find min and max prices
      const minPrice = Math.min(...prices) * 0.999
      const maxPrice = Math.max(...prices) * 1.001
      const priceRange = maxPrice - minPrice

      // Draw grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight * i) / 4
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(padding + chartWidth, y)
        ctx.stroke()

        // Price labels
        const price = maxPrice - (priceRange * i) / 4
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "left"
        ctx.fillText(price.toFixed(0), padding, y - 5)
      }

      // Vertical grid lines
      for (let i = 0; i <= 4; i++) {
        const x = padding + (chartWidth * i) / 4
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, padding + chartHeight)
        ctx.stroke()
      }

      // Draw price line
      ctx.strokeStyle = "#3B82F6"
      ctx.lineWidth = 2
      ctx.beginPath()

      prices.forEach((price, i) => {
        const x = padding + (chartWidth * i) / (prices.length - 1)
        const y = padding + chartHeight - ((price - minPrice) / priceRange) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Draw area under the line
      ctx.lineTo(padding + chartWidth, padding + chartHeight)
      ctx.lineTo(padding, padding + chartHeight)
      ctx.closePath()
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
      ctx.fill()

      // Draw current price marker
      const currentPrice = prices[prices.length - 1]
      const x = padding + chartWidth
      const y = padding + chartHeight - ((currentPrice - minPrice) / priceRange) * chartHeight

      ctx.fillStyle = "#3B82F6"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()

      // Current price label
      ctx.fillStyle = "white"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(currentPrice.toFixed(1), x - 10, y - 10)
    }

    drawChart()

    // Animate chart
    let animationFrameId: number
    let lastUpdateTime = 0
    const updateInterval = 1000 // Update every second

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateTime > updateInterval) {
        // Add new price point
        const lastPrice = prices[prices.length - 1]
        const change = (Math.random() - 0.5) * 0.005
        const newPrice = lastPrice * (1 + change)

        prices.push(newPrice)
        prices.shift() // Remove oldest price

        drawChart()
        lastUpdateTime = timestamp
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

