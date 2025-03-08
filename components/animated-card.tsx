"use client"

import type React from "react"

import { useState, useRef, type MouseEvent } from "react"
import { motion } from "framer-motion"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
}

export default function AnimatedCard({ children, className = "", hoverScale = 1.05 }: AnimatedCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Calculate rotation based on mouse position
    // Limit rotation to a reasonable amount (e.g., -10 to 10 degrees)
    const rotateXFactor = 10
    const rotateYFactor = 10

    setRotateX(((centerY - mouseY) / (rect.height / 2)) * rotateXFactor)
    setRotateY(((mouseX - centerX) / (rect.width / 2)) * rotateYFactor)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      whileHover={{ scale: hoverScale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}

