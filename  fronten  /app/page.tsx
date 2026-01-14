"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MenuSection } from "@/components/menu-section"
import { TableNumberInput } from "@/components/table-number-input"
import { QrScanner } from "@/components/qr-scanner"
import { menuData } from "@/lib/menu-data"

type AppState = "scan" | "table" | "menu"

function MenuContent({ tableNumber }: { tableNumber: string | undefined }) {
  return (
    <div className="min-h-screen bg-background">
      <Header tableNumber={tableNumber} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Menu</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Discover our carefully crafted dishes made with fresh, locally-sourced ingredients
          </p>
        </div>

        <div className="space-y-12">
          {menuData.map((section) => (
            <MenuSection key={section.category} section={section} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default function MenuPage() {
  const [appState, setAppState] = useState<AppState>("scan")
  const [tableNumber, setTableNumber] = useState<string | null>(null)

  if (appState === "scan") {
    return <QrScanner onScanComplete={() => setAppState("table")} />
  }

  if (appState === "table") {
    return (
      <TableNumberInput
        onSubmit={(table) => {
          setTableNumber(table)
          setAppState("menu")
        }}
      />
    )
  }

  return <MenuContent tableNumber={tableNumber || undefined} />
}
