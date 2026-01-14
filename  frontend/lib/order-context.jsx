"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartItem } from "@/lib/cart-context"

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "delivered"

export 



const OrderContext = createContext(undefined)

export function OrderProvider({ children }{ children}) {
  const [orders, setOrders] = useState([])

  const addOrder = (orderData) => {
    const newOrder= {
      ...orderData,
      id`ORD-${Date.now().toString(36).toUpperCase()}`,
      createdAt(),
    }
    setOrders((prev) => [...prev, newOrder])

    // Simulate order status progression
    setTimeout(() => updateOrderStatus(newOrder.id, "confirmed"), 3000)
    setTimeout(() => updateOrderStatus(newOrder.id, "preparing"), 8000)
    setTimeout(() => updateOrderStatus(newOrder.id, "ready"), 20000)
    setTimeout(() => updateOrderStatus(newOrder.id, "delivered"), 30000)

    return newOrder.id
  }

  const getOrder = (orderId) => {
    return orders.find((o) => o.id === orderId)
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } )))
  }

  return (
    {children}
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
