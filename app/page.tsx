"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import {
  ArrowDown,
  Menu,
  X,
  ExternalLink,
  BarChart2,
  LineChart,
  TrendingUp,
  Layers,
  Zap,
  Code,
  ChevronRight,
  Github,
  Twitter,
  Activity,
  PieChart,
} from "lucide-react"
import Image from "next/image"
import PortfolioOverview from "@/components/portfolio-overview"
import AnimatedGradientBackground from "@/components/animated-gradient-background"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const dashboardRef = useRef(null)
  const benefitsRef = useRef(null)
  const ctaRef = useRef(null)

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  const springConfig = { damping: 15, stiffness: 100 }
  const y1Spring = useSpring(y1, springConfig)
  const y2Spring = useSpring(y2, springConfig)

  const heroInView = useInView(heroRef, { amount: 0.5 })
  const featuresInView = useInView(featuresRef, { amount: 0.5 })
  const dashboardInView = useInView(dashboardRef, { amount: 0.5 })
  const benefitsInView = useInView(benefitsRef, { amount: 0.5 })
  const ctaInView = useInView(ctaRef, { amount: 0.5 })

  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (featuresInView) setActiveSection("features")
    else if (dashboardInView) setActiveSection("dashboard")
    else if (benefitsInView) setActiveSection("benefits")
    else if (ctaInView) setActiveSection("cta")
  }, [heroInView, featuresInView, dashboardInView, benefitsInView, ctaInView])

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const navItems = [
    { name: "Home", ref: heroRef, id: "hero" },
    { name: "Features", ref: featuresRef, id: "features" },
    { name: "Dashboard", ref: dashboardRef, id: "dashboard" },
    { name: "Benefits", ref: benefitsRef, id: "benefits" },
    { name: "Get Started", ref: ctaRef, id: "cta" },
  ]

  return (
    <div className="relative bg-[#0A0E17] text-white min-h-screen overflow-hidden">
      <AnimatedGradientBackground />

      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#0A0E17]/70 backdrop-blur-xl border-b border-[#1E2433]/50 shadow-lg shadow-black/5">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Layers className="h-6 w-6 text-[#3B82F6]" />
            <span className="text-xl font-bold">HyperFlow</span>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`text-sm uppercase tracking-wider ${activeSection === item.id ? "text-[#3B82F6]" : "text-white"}`}
                onClick={() => scrollToSection(item.ref)}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.findIndex((i) => i.id === item.id) * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          <motion.button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-[#0A0E17]/95 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <div className="flex flex-col space-y-8 items-center">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`text-2xl font-medium ${activeSection === item.id ? "text-[#3B82F6]" : "text-white"}`}
                  onClick={() => scrollToSection(item.ref)}
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.findIndex((i) => i.id === item.id) * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A2036]/50 to-[#0A0E17]" />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"
            style={{
              scale: useTransform(scrollY, [0, 300], [1, 1.5]),
              opacity: useTransform(scrollY, [0, 300], [1, 0]),
            }}
          />

          {/* Animated grid background */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div
              className="h-full w-full border-[0.5px] border-[#3B82F6]/20"
              style={{ backgroundImage: "radial-gradient(#3B82F6 1px, transparent 1px)", backgroundSize: "50px 50px" }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#3B82F6]/5 text-[#3B82F6] border border-[#3B82F6]/20 shadow-lg shadow-[#3B82F6]/5">
                  Discover HyperFlow
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  The <span className="text-[#3B82F6]">Unified Dashboard</span> for Hyperliquid
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Analyze your Hyperliquid portfolio with a unified view of your spot, perpetuals, and HyperEVm
                  positions in one place.
                </p>

                <motion.div
                  className="relative mb-8 flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white px-8 shadow-lg shadow-blue-500/20"
                    onClick={() => scrollToSection(ctaRef)}
                  >
                    Early Access
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 backdrop-blur-sm"
                    onClick={() => scrollToSection(featuresRef)}
                  >
                    Explore Features
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#1E2433] shadow-2xl shadow-[#3B82F6]/10">
                <Image
                  src="/placeholder.svg?height=800&width=1000"
                  alt="HyperFlow Dashboard Preview"
                  width={1000}
                  height={800}
                  className="object-cover"
                  priority
                />

                {/* Animated overlay elements to simulate a portfolio dashboard */}
                <div className="absolute inset-0 bg-[#0A0E17]/40 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex flex-col p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold text-white">Hyperliquid Portfolio</div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 flex-1">
                    <div className="col-span-2 bg-[#1A2036]/80 rounded-lg p-3 border border-[#1E2433] overflow-hidden">
                      <div className="text-xs text-gray-400 mb-2">Portfolio Overview</div>
                      <div className="h-[calc(100%-24px)] w-full">
                        <PortfolioOverview />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="bg-[#1A2036]/80 rounded-lg p-3 border border-[#1E2433] h-1/2">
                        <div className="text-xs text-gray-400 mb-2">Active Positions</div>
                        <motion.div
                          className="space-y-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          {[
                            { symbol: "BTC-PERP", size: "+0.5", pnl: "+$1,245" },
                            { symbol: "ETH-PERP", size: "-2.0", pnl: "-$320" },
                            { symbol: "SOL-PERP", size: "+15.0", pnl: "+$145" },
                          ].map((position, i) => (
                            <motion.div
                              key={i}
                              className="flex justify-between text-xs"
                              initial={{ opacity: 0, x: position.pnl.startsWith("+") ? -10 : 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + i * 0.1 }}
                            >
                              <span className="text-white">{position.symbol}</span>
                              <span className={position.pnl.startsWith("+") ? "text-green-400" : "text-red-400"}>
                                {position.pnl}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      <div className="bg-[#1A2036]/80 rounded-lg p-3 border border-[#1E2433] h-1/2">
                        <div className="text-xs text-gray-400 mb-2">Statistics</div>
                        <motion.div
                          className="space-y-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Total Balance</span>
                            <span className="text-white">$125,430</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">PnL (24h)</span>
                            <span className="text-green-400">+$2,845</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Open Positions</span>
                            <span className="text-white">7</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-[#1A2036]/80 rounded-lg p-3 border border-[#1E2433] shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">Spot + Perps</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-[#1A2036]/80 rounded-lg p-3 border border-[#1E2433] shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#3B82F6]" />
                  <span className="text-sm font-medium">HyperEVm Analytics</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <ArrowDown className="w-8 h-8 text-white/70" />
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section ref={featuresRef} className="relative py-24 md:py-32 bg-[#0A0E17]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#3B82F6]/5 text-[#3B82F6] border border-[#3B82F6]/20 shadow-lg shadow-[#3B82F6]/5">
              Key Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              One Dashboard, <span className="text-[#3B82F6]">Complete Vision</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              HyperFlow brings together all aspects of your Hyperliquid portfolio in a unified interface, giving you a
              clear view of your investments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Spot Analysis",
                description:
                  "Visualize your spot positions, transaction history, and performance with detailed metrics.",
                icon: <BarChart2 className="h-6 w-6 text-[#3B82F6]" />,
                delay: 0,
              },
              {
                title: "Perpetuals Tracking",
                description: "Monitor your perpetual positions, PnL, potential liquidations, and risk metrics.",
                icon: <LineChart className="h-6 w-6 text-[#3B82F6]" />,
                delay: 0.1,
              },
              {
                title: "HyperEVm Analytics",
                description:
                  "Analyze the performance of your HyperEVm strategies and gain insights into their effectiveness.",
                icon: <Code className="h-6 w-6 text-[#3B82F6]" />,
                delay: 0.2,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-[#1A2036]/80 to-[#0A0E17]/80 backdrop-blur-md border border-[#1E2433] rounded-xl p-8 hover:border-[#3B82F6]/50 transition-all shadow-lg shadow-black/20 overflow-hidden relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="rounded-full bg-gradient-to-br from-[#3B82F6]/20 to-[#3B82F6]/5 p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-inner shadow-white/5 border border-white/10">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 bg-[#1A2036]/30 border border-[#1E2433] rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Advanced Features</h3>
                <p className="text-gray-400 mb-6">
                  HyperFlow goes beyond basic metrics to provide you with in-depth analysis and advanced tools that help
                  you better understand your Hyperliquid portfolio.
                </p>
                <ul className="space-y-3">
                  {[
                    "Correlation analysis between your positions",
                    "Risk metrics and exposure",
                    "Complete transaction history",
                    "Customizable alerts",
                    "HyperEVm strategy performance analysis",
                    "Data export for reporting",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    >
                      <ChevronRight className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <motion.div
                  className="relative rounded-lg overflow-hidden border border-[#1E2433]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Advanced Features"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0A0E17]/40 backdrop-blur-sm"></div>

                  {/* Animated advanced features visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] h-[80%] relative">
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center z-10"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <Activity className="h-12 w-12 text-[#3B82F6]" />
                        <div className="absolute inset-0 rounded-full border-2 border-[#3B82F6]/20 animate-pulse"></div>
                      </motion.div>

                      {/* Connecting nodes */}
                      {[
                        {
                          label: "Risk",
                          icon: <PieChart className="h-6 w-6 text-white" />,
                          position: "top-0 left-1/2 transform -translate-x-1/2",
                          delay: 0.7,
                        },
                        {
                          label: "Performance",
                          icon: <TrendingUp className="h-6 w-6 text-white" />,
                          position: "bottom-0 left-0",
                          delay: 0.8,
                        },
                        {
                          label: "Strategies",
                          icon: <Code className="h-6 w-6 text-white" />,
                          position: "bottom-0 right-0",
                          delay: 0.9,
                        },
                      ].map((node, i) => (
                        <motion.div
                          key={i}
                          className={`absolute ${node.position} w-16 h-16 rounded-full bg-[#1A2036] border border-[#1E2433] flex flex-col items-center justify-center`}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: node.delay }}
                        >
                          {node.icon}
                          <span className="text-xs mt-1">{node.label}</span>

                          {/* Connecting line */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-[#3B82F6]/80 to-[#3B82F6]/20 origin-left"
                            style={{
                              width: "80px",
                              transformOrigin: "left center",
                              rotate: i === 0 ? 90 : i === 1 ? -45 : 45,
                            }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: node.delay + 0.1 }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard preview section */}
      <section ref={dashboardRef} className="relative py-24 md:py-32 overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: y1Spring }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A2036]/10 to-[#0A0E17]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#3B82F6]/5 text-[#3B82F6] border border-[#3B82F6]/20 shadow-lg shadow-[#3B82F6]/5">
              Dashboard Preview
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-[#3B82F6]">Powerful.</span> Intuitive.{" "}
              <span className="text-[#3B82F6]">Unified.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the most comprehensive analytics dashboard for Hyperliquid.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="relative rounded-xl overflow-hidden border border-[#1E2433] shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="HyperFlow Dashboard Interface"
                width={1920}
                height={1080}
                className="w-full object-cover"
              />

              {/* Dashboard preview overlay */}
              <div className="absolute inset-0 bg-[#0A0E17]/60 backdrop-blur-sm"></div>

              <div className="absolute inset-0 p-6">
                <div className="flex flex-col h-full">
                  <div className="flex border-b border-[#1E2433] mb-4">
                    {[
                      { id: "overview", label: "Overview", icon: <Layers className="w-4 h-4" /> },
                      { id: "spot", label: "Spot", icon: <BarChart2 className="w-4 h-4" /> },
                      { id: "perps", label: "Perpetuals", icon: <LineChart className="w-4 h-4" /> },
                      { id: "hyperEvm", label: "HyperEVm", icon: <Code className="w-4 h-4" /> },
                    ].map((tab, index) => (
                      <motion.div
                        key={tab.id}
                        className={`relative px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                          index === 0 ? "text-[#3B82F6]" : "text-gray-400"
                        }`}
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      >
                        {tab.icon}
                        {tab.label}
                        {index === 0 && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
                            layoutId="activeTab"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-4 h-full">
                    <div className="col-span-3">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {[
                          { label: "Total Value", value: "$125,430.25", change: "+5.2%" },
                          { label: "PnL (24h)", value: "$2,845.12", change: "+2.3%" },
                          { label: "Open Positions", value: "7", change: "" },
                        ].map((metric, i) => (
                          <motion.div
                            key={i}
                            className="bg-[#1A2036]/50 rounded-lg p-4 border border-[#1E2433]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                          >
                            <div className="text-sm text-gray-400">{metric.label}</div>
                            <div className="text-xl font-bold mt-1">{metric.value}</div>
                            {metric.change && <div className="text-sm text-green-400 mt-1">{metric.change}</div>}
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        className="bg-[#1A2036]/50 rounded-lg p-4 border border-[#1E2433] h-[calc(100%-100px)]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.9 }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-lg font-medium">Portfolio Evolution</div>
                          <div className="flex space-x-2">
                            {["1D", "1W", "1M", "3M", "1Y", "Max"].map((period, i) => (
                              <button
                                key={i}
                                className={`px-2 py-1 text-xs rounded ${i === 2 ? "bg-[#3B82F6] text-white" : "text-gray-400 hover:bg-[#1E2433]"}`}
                              >
                                {period}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="h-[calc(100%-40px)] w-full bg-[#0A0E17]/50 rounded-lg relative overflow-hidden">
                          {/* Simulated chart */}
                          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                            <motion.path
                              d="M0,250 C50,220 100,180 150,190 C200,200 250,170 300,160 C350,150 400,140 450,130 C500,120 550,100 600,110 C650,120 700,140 750,130 C800,120 850,100 900,90 C950,80 1000,70 1000,70"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="2"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 1 }}
                            />
                            <motion.path
                              d="M0,250 C50,220 100,180 150,190 C200,200 250,170 300,160 C350,150 400,140 450,130 C500,120 550,100 600,110 C650,120 700,140 750,130 C800,120 850,100 900,90 C950,80 1000,70 1000,70 L1000,300 L0,300 Z"
                              fill="url(#gradient)"
                              opacity="0.2"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 0.2 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 1.5 }}
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>

                          {/* Chart markers */}
                          {[
                            { x: "30%", y: "53%", value: "$105,230", date: "Jan 15" },
                            { x: "60%", y: "37%", value: "$118,450", date: "Feb 15" },
                            { x: "90%", y: "23%", value: "$125,430", date: "Today" },
                          ].map((marker, i) => (
                            <motion.div
                              key={i}
                              className="absolute flex flex-col items-center"
                              style={{ left: marker.x, top: marker.y }}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 1.8 + i * 0.2 }}
                            >
                              <div className="w-2 h-2 rounded-full bg-[#3B82F6] mb-1"></div>
                              <div className="text-xs font-medium">{marker.value}</div>
                              <div className="text-xs text-gray-400">{marker.date}</div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <motion.div
                        className="bg-[#1A2036]/50 rounded-lg p-4 border border-[#1E2433]"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 1 }}
                      >
                        <div className="text-sm font-medium mb-3">Asset Distribution</div>
                        <div className="relative h-32 w-32 mx-auto mb-4">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#3B82F6"
                              strokeWidth="20"
                              strokeDasharray="251.2"
                              strokeDashoffset="188.4"
                              initial={{ strokeDashoffset: 251.2 }}
                              whileInView={{ strokeDashoffset: 188.4 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 1.2 }}
                            />
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#10B981"
                              strokeWidth="20"
                              strokeDasharray="251.2"
                              strokeDashoffset="188.4"
                              transform="rotate(-90 50 50)"
                              initial={{ strokeDashoffset: 251.2 }}
                              whileInView={{ strokeDashoffset: 125.6 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 1.3 }}
                            />
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#F59E0B"
                              strokeWidth="20"
                              strokeDasharray="251.2"
                              strokeDashoffset="188.4"
                              transform="rotate(90 50 50)"
                              initial={{ strokeDashoffset: 251.2 }}
                              whileInView={{ strokeDashoffset: 213.5 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 1.4 }}
                            />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: "Spot", value: "45%", color: "#3B82F6" },
                            { label: "Perpetuals", value: "35%", color: "#10B981" },
                            { label: "HyperEVm", value: "20%", color: "#F59E0B" },
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-sm">{item.label}</span>
                              </div>
                              <span className="text-sm font-medium">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-[#1A2036]/50 rounded-lg p-4 border border-[#1E2433] flex-1"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 1.1 }}
                      >
                        <div className="text-sm font-medium mb-3">Top Positions</div>
                        <div className="space-y-3">
                          {[
                            { symbol: "BTC-PERP", value: "$34,710", pnl: "+3.6%" },
                            { symbol: "ETH", value: "$28,450", pnl: "+1.2%" },
                            { symbol: "SOL-PERP", value: "$15,320", pnl: "-2.4%" },
                            { symbol: "AVAX", value: "$8,750", pnl: "+5.8%" },
                          ].map((position, i) => (
                            <div key={i} className="flex justify-between items-center">
                              <div className="text-sm">{position.symbol}</div>
                              <div className="text-right">
                                <div className="text-sm font-medium">{position.value}</div>
                                <div
                                  className={`text-xs ${position.pnl.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                                >
                                  {position.pnl}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature callouts */}
            {[
              {
                title: "Unified View",
                description: "Visualize all your positions and assets in one place",
                position: "top-10 left-10",
                delay: 0.4,
              },
              {
                title: "Performance Analysis",
                description: "Track your portfolio evolution over time",
                position: "bottom-10 right-10",
                delay: 0.5,
              },
              {
                title: "Advanced Metrics",
                description: "Access detailed analysis of your strategies",
                position: "top-10 right-10",
                delay: 0.6,
              },
            ].map((callout, index) => (
              <motion.div
                key={index}
                className={`absolute ${callout.position} max-w-xs bg-[#1A2036]/90 backdrop-blur-md border border-[#1E2433] rounded-lg p-4 shadow-lg`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: callout.delay }}
              >
                <h4 className="text-lg font-bold mb-1">{callout.title}</h4>
                <p className="text-sm text-gray-400">{callout.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section ref={benefitsRef} className="relative py-24 md:py-32 bg-[#0A0E17]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#3B82F6]/5 text-[#3B82F6] border border-[#3B82F6]/20 shadow-lg shadow-[#3B82F6]/5">
                Benefits
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-[#3B82F6]">HyperFlow?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                HyperFlow transforms how you analyze your investments on Hyperliquid, offering significant advantages
                over separate interfaces.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Global Vision",
                    description:
                      "Get a complete overview of your Hyperliquid portfolio, including spot, perpetuals, and HyperEVm.",
                    icon: <Zap className="h-6 w-6 text-[#3B82F6]" />,
                    delay: 0.1,
                  },
                  {
                    title: "In-Depth Analysis",
                    description: "Access advanced metrics and detailed analysis to better understand your performance.",
                    icon: <BarChart2 className="h-6 w-6 text-[#3B82F6]" />,
                    delay: 0.2,
                  },
                  {
                    title: "Time Saving",
                    description: "Eliminate the need to navigate between multiple platforms to track your investments.",
                    icon: <Activity className="h-6 w-6 text-[#3B82F6]" />,
                    delay: 0.3,
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: benefit.delay }}
                  >
                    <div className="rounded-full bg-gradient-to-br from-[#3B82F6]/20 to-[#3B82F6]/5 p-4 w-16 h-16 flex items-center justify-center shrink-0 shadow-inner shadow-white/5 border border-white/10">
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 15 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {benefit.icon}
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-xl overflow-hidden border border-[#1E2433]">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="HyperFlow Benefits"
                  width={800}
                  height={800}
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[#0A0E17]/60 backdrop-blur-sm"></div>

                {/* Animated metrics */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <h3 className="text-2xl font-bold mb-8 text-center">Performance Metrics</h3>

                  <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                    {[
                      { label: "Time Saved", value: "45%", color: "#3B82F6" },
                      { label: "Improved Visibility", value: "100%", color: "#10B981" },
                      { label: "In-Depth Analysis", value: "3x", color: "#F59E0B" },
                      { label: "Decision Making", value: "2x", color: "#8B5CF6" },
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-b from-[#1A2036]/80 to-[#0A0E17]/80 rounded-lg p-4 border border-[#1E2433] text-center shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      >
                        <motion.div
                          className="text-3xl font-bold mb-1"
                          style={{ color: metric.color }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        >
                          {metric.value}
                        </motion.div>
                        <div className="text-sm text-gray-400">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating testimonial */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-[#1A2036]/90 backdrop-blur-md rounded-lg p-4 border border-[#1E2433] shadow-lg max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-sm italic text-gray-300 mb-2">
                  "HyperFlow has completely transformed how I analyze my investments on Hyperliquid. Having everything
                  in one place has allowed me to make better decisions."
                </p>
                <div className="text-xs text-[#3B82F6]">— Professional Trader</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section ref={ctaRef} className="relative py-24 md:py-32 bg-[#1A2036]">
        <motion.div className="absolute inset-0 z-0" style={{ y: y2Spring }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Enhance Your <span className="text-[#3B82F6]">Analysis Experience?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the waitlist to get early access to HyperFlow and revolutionize how you analyze your investments on
              Hyperliquid.
            </p>

            <motion.div
              className="bg-gradient-to-b from-[#0A0E17]/70 to-[#0A0E17]/50 backdrop-blur-md border border-[#1E2433] rounded-xl p-8 max-w-md mx-auto shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full bg-[#0A0E17]/80 border border-[#1E2433] rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                    <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-[#3B82F6]/5 to-transparent opacity-50"></div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white py-4 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Join the Waitlist
                </Button>

                <p className="text-xs text-gray-400">We respect your privacy. Unsubscribe at any time.</p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#0A0E17] to-[#0A0E17]/95 border-t border-[#1E2433] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Layers className="h-6 w-6 text-[#3B82F6]" />
              <span className="text-xl font-bold">HyperFlow</span>
            </div>

            <div className="flex space-x-6">
              {[
                { icon: <Github className="w-5 h-5" />, label: "GitHub" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <ExternalLink className="w-5 h-5" />, label: "Website" },
              ].map((social, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1E2433] mt-8 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HyperFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function useInView(ref, options) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isInView
}

