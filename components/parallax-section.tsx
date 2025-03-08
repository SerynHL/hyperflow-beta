"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  baseVelocity?: number
  direction?: "up" | "down"
}

export default function ParallaxSection({
  children,
  className = "",
  baseVelocity = 100,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const factor = direction === "up" ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [0, baseVelocity * factor])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

