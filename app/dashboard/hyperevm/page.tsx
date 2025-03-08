"use client"

import DashboardHeader from "@/components/dashboard-header"
import HyperEvmSection from "@/components/dashboard/hyperevm-section"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function HyperEvmPage() {
  return (
    <DashboardLayout>
      <DashboardHeader title="HyperEVM" />
      <div className="p-6">
        <HyperEvmSection />
      </div>
    </DashboardLayout>
  )
}

