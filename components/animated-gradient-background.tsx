"use client"

import { useEffect, useRef } from "react"

interface AnimatedGradientBackgroundProps {
  className?: string
}

export default function AnimatedGradientBackground({ className = "" }: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient points
    const gradientPoints = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 300, color: "rgba(59, 130, 246, 0.15)" },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 350, color: "rgba(59, 130, 246, 0.1)" },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 400, color: "rgba(79, 70, 229, 0.08)" },
    ]

    // Animation variables
    let animationFrameId: number
    let time = 0

    // Animation function
    const animate = () => {
      time += 0.005

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update gradient positions with subtle movement
      gradientPoints.forEach((point, index) => {
        point.x = canvas.width * (0.2 + index * 0.3) + Math.sin(time + index) * 100
        point.y = canvas.height * (0.3 + index * 0.2) + Math.cos(time + index) * 100
      })

      // Draw gradients
      gradientPoints.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} />
}

