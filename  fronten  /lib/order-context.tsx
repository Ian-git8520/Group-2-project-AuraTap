"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartItem } from "@/lib/cart-context"

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "delivered"

export interface Order {
  id: string
  tableNumber: string
  items: CartItem[]
  totalPrice: number
  status: OrderStatus
  paymentMethod: string
  createdAt: Date
  promoCode?: string
  discount?: number
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt">) => string
  getOrder: (orderId: string) => Order | undefined
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  const addOrder = (orderData: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date(),
    }
    setOrders((prev) => [...prev, newOrder])

    // Simulate order status progression
    setTimeout(() => updateOrderStatus(newOrder.id, "confirmed"), 3000)
    setTimeout(() => updateOrderStatus(newOrder.id, "preparing"), 8000)
    setTimeout(() => updateOrderStatus(newOrder.id, "ready"), 20000)
    setTimeout(() => updateOrderStatus(newOrder.id, "delivered"), 30000)

    return newOrder.id
  }

  const getOrder = (orderId: string) => {
    return orders.find((o) => o.id === orderId)
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder, updateOrderStatus }}>{children}</OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
