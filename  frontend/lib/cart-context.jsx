"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { MenuItem } from "@/lib/menu-data"

export interface CartItem extends MenuItem {
  quantity}



const CartContext = createContext(undefined)

export function CartProvider({ children }{ children}) {
  const [items, setItems] = useState([])

  const addItem = (item) => {
    console.log("[v0] CartProvider addItem called with:", item.name)
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        const newItems = prev.map((i) => (i.id === item.id ? { ...i, quantity.quantity + 1 } ))
        console.log("[v0] Updated existing item, new cart:", newItems)
        return newItems
      }
      const newItems = [...prev, { ...item, quantity}]
      console.log("[v0] Added new item, new cart:", newItems)
      return newItems
    })
  }

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    console.log("[v0] updateQuantity called:", itemId, quantity)
    if (quantity  prev.map((i) => (i.id === itemId ? { ...i, quantity } )))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  console.log("[v0] CartProvider rendering with items:", items.length, "totalItems:", totalItems)

  return (
    
      {children}
    
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
