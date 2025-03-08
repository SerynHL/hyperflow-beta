"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function PortfolioOverview() {
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

    // Dummy data for portfolio distribution
    const portfolioData = [
      { label: "BTC", value: 40, color: "#F7931A" },
      { label: "ETH", value: 30, color: "#627EEA" },
      { label: "SOL", value: 15, color: "#8E82F8" },
      { label: "USDC", value: 15, color: "#2775CA" },
    ]

    // Draw chart
    const drawChart = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Chart dimensions and settings
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) * 0.8
      let startAngle = 0

      // Calculate total value
      const totalValue = portfolioData.reduce((sum, data) => sum + data.value, 0)

      // Draw each slice
      portfolioData.forEach((data) => {
        const sliceAngle = (2 * Math.PI * data.value) / totalValue

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
        ctx.lineTo(centerX, centerY)
        ctx.fillStyle = data.color
        ctx.fill()

        startAngle += sliceAngle
      })

      // Draw labels (simplified for brevity)
      ctx.fillStyle = "white"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
    }

    drawChart()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

