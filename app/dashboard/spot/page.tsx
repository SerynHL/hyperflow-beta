"use client"

import DashboardHeader from "@/components/dashboard-header"
import SpotSection from "@/components/dashboard/spot-section"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function SpotPage() {
  return (
    <DashboardLayout>
      <DashboardHeader title="Spot Trading" />
      <div className="p-6">
        <SpotSection />
      </div>
    </DashboardLayout>
  )
}

