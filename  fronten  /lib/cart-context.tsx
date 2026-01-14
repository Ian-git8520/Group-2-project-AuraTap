"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { MenuItem } from "@/lib/menu-data"

export interface CartItem extends MenuItem {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: MenuItem) => {
    console.log("[v0] CartProvider addItem called with:", item.name)
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        const newItems = prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        console.log("[v0] Updated existing item, new cart:", newItems)
        return newItems
      }
      const newItems = [...prev, { ...item, quantity: 1 }]
      console.log("[v0] Added new item, new cart:", newItems)
      return newItems
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    console.log("[v0] updateQuantity called:", itemId, quantity)
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  console.log("[v0] CartProvider rendering with items:", items.length, "totalItems:", totalItems)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
