"use client"

import type React from "react"

import Image from "next/image"
import { Plus, Minus, Leaf, Flame, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { MenuItem } from "@/lib/menu-data"



export function MenuCard({ item }) {
  const { items, addItem, updateQuantity } = useCart()
  const cartItem = items.find((i) => i.id === item.id)
  const quantity = cartItem?.quantity || 0

  const handleAddItem = (e.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("[v0] Adding item to cart:", item.name, item.id)
    addItem(item)
    console.log("[v0] Item added, current cart items:", items)
  }

  const handleUpdateQuantity = (e.MouseEvent, newQuantity) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("[v0] Updating quantity for:", item.name, "to:", newQuantity)
    updateQuantity(item.id, newQuantity)
  }

  return (
    
      
        
        
          {item.isVegetarian && (
            
              
              Veg
            
          )}
          {item.isSpicy && (
            
              
              Spicy
            
          )}
        
        {quantity > 0 && (
          
            
              
              {quantity} in cart
            
          
        )}
      
      
        
          {item.name}
          ${item.price.toFixed(2)}
        
        {item.description}
        {quantity > 0 ? (
          
             handleUpdateQuantity(e, quantity - 1)}
              type="button"
            >
              
            
            {quantity}
             handleUpdateQuantity(e, quantity + 1)}
              type="button"
            >
              
            
          
        ) (
          
            
            Add to Order
          
        )}
      
    
  )
}
