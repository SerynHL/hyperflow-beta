"use client"

import DashboardHeader from "@/components/dashboard-header"
import PerpsSection from "@/components/dashboard/perps-section"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function PerpsPage() {
  return (
    <DashboardLayout>
      <DashboardHeader title="Perpetuals Trading" />
      <div className="p-6">
        <PerpsSection />
      </div>
    </DashboardLayout>
  )
}

