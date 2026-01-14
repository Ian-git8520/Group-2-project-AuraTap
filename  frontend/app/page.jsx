"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MenuSection } from "@/components/menu-section"
import { TableNumberInput } from "@/components/table-number-input"
import { QrScanner } from "@/components/qr-scanner"
import { menuData } from "@/lib/menu-data"

type AppState = "scan" | "table" | "menu"

function MenuContent({ tableNumber }{ tableNumber}) {
  return (
    
      
      
        
          Our Menu
          
            Discover our carefully crafted dishes made with fresh, locally-sourced ingredients
          
        

        
          {menuData.map((section) => (
            
          ))}
        
      
    
  )
}

export default function MenuPage() {
  const [appState, setAppState] = useState("scan")
  const [tableNumber, setTableNumber] = useState(null)

  if (appState === "scan") {
    return  setAppState("table")} />
  }

  if (appState === "table") {
    return (
       {
          setTableNumber(table)
          setAppState("menu")
        }}
      />
    )
  }

  return 
}
