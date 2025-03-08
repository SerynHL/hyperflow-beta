"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart2, LineChart, Code, Settings, Layers } from "lucide-react"

export default function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <Layers className="w-4 h-4" /> },
    { id: "spot", label: "Spot", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "perps", label: "Perpetuals", icon: <LineChart className="w-4 h-4" /> },
    { id: "hyperEvm", label: "HyperEVm", icon: <Code className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-[#1E2433]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative px-4 py-2 text-sm font-medium flex items-center gap-2 ${
              activeTab === tab.id ? "text-[#3B82F6]" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4">
        <AnimatedTabContent activeTab={activeTab} />
      </div>
    </div>
  )
}

function AnimatedTabContent({ activeTab }: { activeTab: string }) {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div key={activeTab} variants={contentVariants} initial="hidden" animate="visible" className="h-full">
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-2 bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433]">
            <div className="text-sm font-medium mb-2">Portfolio Overview</div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { label: "Total Value", value: "$125,430.25", change: "+5.2%" },
                { label: "PnL (24h)", value: "$2,845.12", change: "+2.3%" },
                { label: "Available", value: "$45,320.80", change: "" },
              ].map((item, i) => (
                <div key={i} className="bg-[#0A0E17]/50 rounded-lg p-2">
                  <div className="text-xs text-gray-400">{item.label}</div>
                  <div className="text-sm font-medium">{item.value}</div>
                  {item.change && <div className="text-xs text-green-400">{item.change}</div>}
                </div>
              ))}
            </div>
            <div className="text-sm font-medium mb-2">Market Overview</div>
            <div className="h-[calc(100%-120px)] bg-[#0A0E17]/50 rounded-lg"></div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433] h-1/2">
              <div className="text-sm font-medium mb-2">Active Positions</div>
              <div className="space-y-2">
                {[
                  { symbol: "BTC-PERP", size: "+0.5", value: "$34,710", pnl: "+$1,245" },
                  { symbol: "ETH-PERP", size: "-2.0", value: "$8,320", pnl: "-$320" },
                  { symbol: "SOL-PERP", size: "+15.0", value: "$2,145", pnl: "+$145" },
                ].map((position, i) => (
                  <div key={i} className="bg-[#0A0E17]/50 rounded-lg p-2 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">{position.symbol}</div>
                      <div className={`text-xs ${position.size.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                        {position.size}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{position.value}</div>
                      <div className={`text-xs ${position.pnl.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                        {position.pnl}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433] h-1/2">
              <div className="text-sm font-medium mb-2">Recent Activity</div>
              <div className="space-y-2">
                {[
                  { type: "Trade", desc: "BTC-PERP Buy 0.1", time: "2 min ago" },
                  { type: "Deposit", desc: "USDC +5,000", time: "1 hour ago" },
                  { type: "Trade", desc: "ETH-PERP Sell 1.5", time: "3 hours ago" },
                ].map((activity, i) => (
                  <div key={i} className="bg-[#0A0E17]/50 rounded-lg p-2 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">{activity.type}</div>
                      <div className="text-xs text-gray-400">{activity.desc}</div>
                    </div>
                    <div className="text-xs text-gray-400">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "spot" && (
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-2 bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433]">
            <div className="text-sm font-medium mb-2">BTC/USDC</div>
            <div className="h-[calc(100%-30px)] bg-[#0A0E17]/50 rounded-lg"></div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433] h-1/2">
              <div className="text-sm font-medium mb-2">Order Book</div>
              <div className="space-y-1">
                {[
                  { price: "69,420", size: "0.12", type: "sell" },
                  { price: "69,410", size: "0.35", type: "sell" },
                  { price: "69,400", size: "1.05", type: "sell" },
                  { price: "69,390", size: "0.78", type: "buy" },
                  { price: "69,380", size: "2.45", type: "buy" },
                  { price: "69,370", size: "1.23", type: "buy" },
                ].map((order, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className={order.type === "sell" ? "text-red-400" : "text-green-400"}>{order.price}</span>
                    <span className="text-gray-400">{order.size}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433] h-1/2">
              <div className="text-sm font-medium mb-2">Place Order</div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button className="bg-green-500/20 text-green-400 rounded px-2 py-1 text-xs font-medium flex-1">
                    Buy
                  </button>
                  <button className="bg-[#0A0E17]/50 text-gray-400 rounded px-2 py-1 text-xs font-medium flex-1">
                    Sell
                  </button>
                </div>
                <div className="bg-[#0A0E17]/50 rounded p-2">
                  <div className="text-xs text-gray-400 mb-1">Price</div>
                  <div className="text-sm">69,385 USDC</div>
                </div>
                <div className="bg-[#0A0E17]/50 rounded p-2">
                  <div className="text-xs text-gray-400 mb-1">Amount</div>
                  <div className="text-sm">0.1 BTC</div>
                </div>
                <button className="w-full bg-green-500 text-white rounded py-2 text-sm font-medium">Buy BTC</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "perps" && (
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-2 bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433]">
            <div className="text-sm font-medium mb-2">ETH-PERP</div>
            <div className="h-[calc(100%-30px)] bg-[#0A0E17]/50 rounded-lg"></div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433] h-1/2">
              <div className="text-sm font-medium mb-2">Position Details</div>
              <div className="space-y-2">
                <div className="bg-[#0A0E17]/50 rounded p-2 flex justify-between">
                  <span className="text-xs text-gray-400">Size</span>
                  <span className="text-sm font-medium text-red-400">-2.0 ETH</span>
                </div>
                <div className="bg-[#0A0E17]/50 rounded p-2 flex justify-between">
                  <span className="text-xs text-gray-400">Entry Price</span>
                  <span className="text-sm font-medium">$3,850.25</span>
                </div>
                <div className="bg-[#0A0E17]/50 rounded p-2 flex justify-between">
                  <span className="text-xs text-gray-400">Liquidation Price</span>
                  <span className="text-sm font-medium">$4,320.80</span>
                </div>
                <div className="bg-[#0A0E17]/50 rounded p-2 flex justify-between">
                  <span className="text-xs text-gray-400">Unrealized PnL</span>
                  <span className="text-sm font-medium text-red-400">-$320.45</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433] h-1/2">
              <div className="text-sm font-medium mb-2">Leverage</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1x</span>
                  <span>5x</span>
                  <span>10x</span>
                  <span>20x</span>
                </div>
                <div className="h-2 bg-[#0A0E17] rounded-full">
                  <div className="h-full w-1/4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></div>
                </div>
                <div className="text-center text-sm font-medium">5x Leverage</div>
                <button className="w-full bg-red-500 text-white rounded py-2 text-sm font-medium mt-4">
                  Close Position
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "hyperEvm" && (
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-2 bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433]">
            <div className="text-sm font-medium mb-2">HyperEVm Console</div>
            <div className="h-[calc(100%-30px)] bg-[#0A0E17]/80 rounded-lg p-3 font-mono text-xs overflow-auto">
              <div className="text-green-400">// Example HyperEVm strategy</div>
              <div className="text-gray-400 mt-2">const strategy = {"{"}</div>
              <div className="text-gray-400 ml-4">
                name: <span className="text-yellow-300">"BTC-ETH Ratio Trading"</span>,
              </div>
              <div className="text-gray-400 ml-4">
                assets: [<span className="text-yellow-300">"BTC-PERP"</span>,{" "}
                <span className="text-yellow-300">"ETH-PERP"</span>],
              </div>
              <div className="text-gray-400 ml-4">
                condition: <span className="text-purple-400">(data)</span> {"=>"} {"{"}
              </div>
              <div className="text-gray-400 ml-8">
                const ratio = data.prices[<span className="text-yellow-300">"BTC-PERP"</span>] / data.prices[
                <span className="text-yellow-300">"ETH-PERP"</span>];
              </div>
              <div className="text-gray-400 ml-8">
                return ratio {">"} <span className="text-blue-400">16.5</span>;
              </div>
              <div className="text-gray-400 ml-4">{"}"}, </div>
              <div className="text-gray-400 ml-4">
                action: <span className="text-purple-400">(exchange)</span> {"=>"} {"{"}
              </div>
              <div className="text-gray-400 ml-8">
                exchange.createOrder(<span className="text-yellow-300">"BTC-PERP"</span>,{" "}
                <span className="text-yellow-300">"sell"</span>, <span className="text-blue-400">0.1</span>);
              </div>
              <div className="text-gray-400 ml-8">
                exchange.createOrder(<span className="text-yellow-300">"ETH-PERP"</span>,{" "}
                <span className="text-yellow-300">"buy"</span>, <span className="text-blue-400">1.5</span>);
              </div>
              <div className="text-gray-400 ml-4">{"}"}</div>
              <div className="text-gray-400">{"}"};</div>
              <div className="text-blue-400 mt-4">// Deploy strategy</div>
              <div className="text-gray-400">hyperEvm.deployStrategy(strategy);</div>
              <div className="text-green-400 mt-4">// Strategy deployed successfully!</div>
              <div className="text-green-400">// Monitoring market conditions...</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433] h-1/2">
              <div className="text-sm font-medium mb-2">Active Strategies</div>
              <div className="space-y-2">
                {[
                  { name: "BTC-ETH Ratio Trading", status: "Running", deployed: "2 hours ago" },
                  { name: "Funding Rate Arbitrage", status: "Paused", deployed: "1 day ago" },
                  { name: "Volatility Breakout", status: "Running", deployed: "3 days ago" },
                ].map((strategy, i) => (
                  <div key={i} className="bg-[#0A0E17]/50 rounded p-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{strategy.name}</span>
                      <span
                        className={`text-xs ${strategy.status === "Running" ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {strategy.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Deployed {strategy.deployed}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433] h-1/2">
              <div className="text-sm font-medium mb-2">Strategy Performance</div>
              <div className="space-y-2">
                <div className="bg-[#0A0E17]/50 rounded p-2 flex justify-between">
                  <span className="text-xs text-gray-400">Total PnL</span>
                  <span className="text-sm font-medium text-green-400">+$1,245.80</span>
                </div>
                <div className="bg-[#0A0E17]/50 rounded p-2 flex justify-between">
                  <span className="text-xs text-gray-400">Win Rate</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <div className="bg-[#0A0E17]/50 rounded p-2 flex justify-between">
                  <span className="text-xs text-gray-400">Avg. Trade Duration</span>
                  <span className="text-sm font-medium">4.2 hours</span>
                </div>
                <button className="w-full bg-[#3B82F6] text-white rounded py-2 text-sm font-medium mt-2">
                  Create New Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433]">
            <div className="text-sm font-medium mb-4">Account Settings</div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">API Key</label>
                <input
                  type="text"
                  className="w-full bg-[#0A0E17]/80 border border-[#1E2433] rounded px-3 py-2 text-sm"
                  value="••••••••••••••••••••••••••••••"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Default Leverage</label>
                <select className="w-full bg-[#0A0E17]/80 border border-[#1E2433] rounded px-3 py-2 text-sm">
                  <option>1x</option>
                  <option>2x</option>
                  <option selected>5x</option>
                  <option>10x</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Theme</label>
                <select className="w-full bg-[#0A0E17]/80 border border-[#1E2433] rounded px-3 py-2 text-sm">
                  <option selected>Dark</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </div>
              <button className="bg-[#3B82F6] text-white rounded py-2 text-sm font-medium w-full">Save Changes</button>
            </div>
          </div>

          <div className="bg-[#1A2036]/50 rounded-lg p-3 border border-[#1E2433]">
            <div className="text-sm font-medium mb-4">Notifications</div>
            <div className="space-y-3">
              {[
                "Price Alerts",
                "Position Updates",
                "Liquidation Warnings",
                "Strategy Execution",
                "Deposit/Withdrawal Confirmations",
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-[#0A0E17]/50 rounded p-2">
                  <span className="text-sm">{item}</span>
                  <div className="w-10 h-5 bg-[#3B82F6] rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

