"use client"

import type React from "react"

import Image from "next/image"
import { Plus, Minus, Leaf, Flame, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { MenuItem } from "@/lib/menu-data"

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  const { items, addItem, updateQuantity } = useCart()
  const cartItem = items.find((i) => i.id === item.id)
  const quantity = cartItem?.quantity || 0

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("[v0] Adding item to cart:", item.name, item.id)
    addItem(item)
    console.log("[v0] Item added, current cart items:", items)
  }

  const handleUpdateQuantity = (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("[v0] Updating quantity for:", item.name, "to:", newQuantity)
    updateQuantity(item.id, newQuantity)
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {item.isVegetarian && (
            <Badge className="bg-green-600 text-white hover:bg-green-700">
              <Leaf className="h-3 w-3 mr-1" />
              Veg
            </Badge>
          )}
          {item.isSpicy && (
            <Badge className="bg-red-600 text-white hover:bg-red-700">
              <Flame className="h-3 w-3 mr-1" />
              Spicy
            </Badge>
          )}
        </div>
        {quantity > 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground">
              <Check className="h-3 w-3 mr-1" />
              {quantity} in cart
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-card-foreground">{item.name}</h3>
          <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
        {quantity > 0 ? (
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={(e) => handleUpdateQuantity(e, quantity - 1)}
              type="button"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-lg min-w-[2rem] text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={(e) => handleUpdateQuantity(e, quantity + 1)}
              type="button"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button className="w-full" size="sm" onClick={handleAddItem} type="button">
            <Plus className="h-4 w-4 mr-2" />
            Add to Order
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
