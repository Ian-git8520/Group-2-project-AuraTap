"use client"

import type React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Package, ChefHat, CheckCircle, Truck, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useOrders, type OrderStatus } from "@/lib/order-context"

const statusSteps{ status; label; icon.ReactNode; description}[] = [
  {
    status"pending",
    label"Order Placed",
    icon,
    description"We received your order",
  },
  {
    status"confirmed",
    label"Confirmed",
    icon,
    description"Restaurant confirmed",
  },
  { status"preparing", label"Preparing", icon, description"Chef is cooking" },
  { status"ready", label"Ready", icon, description"Ready for pickup/delivery" },
  { status"delivered", label"Delivered", icon, description"Enjoy your meal!" },
]

export function OrderTrackingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getOrder, orders } = useOrders()
  const [currentOrder, setCurrentOrder] = useState(getOrder(searchParams.get("orderId") || ""))

  const orderId = searchParams.get("orderId")

  useEffect(() => {
    if (orderId) {
      setCurrentOrder(getOrder(orderId))
    }
  }, [orderId, orders, getOrder])

  if (!currentOrder) {
    return (
      
        
          
            Order Not Found
            We couldn't find the order you're looking for.
             router.push("/")}>Back to Menu
          
        
      
    )
  }

  const currentStepIndex = statusSteps.findIndex((step) => step.status === currentOrder.status)

  const handleLeaveReview = () => {
    router.push(`/review?orderId=${orderId}`)
  }

  return (
    
      
        
           router.push("/")} className="gap-2">
            
            Back to Menu
          
        
      

      
        
          Order Tracking
          Order #{currentOrder.id}
        

        {/* Status Timeline */}
        
          
            
              {statusSteps.map((step, index) => {
                const isCompleted = index 
                    {/* Timeline connector */}
                    
                      
                        {step.icon}
                      
                      {index 
                      )}
                    

                    {/* Step content */}
                    
                      
                        {step.label}
                      
                      {step.description}
                      {isCurrent && In progress...}
                    
                  
                )
              })}
            
          
        

        {/* Order Details */}
        
          
            Order Details
            
              
                Table Number
                {currentOrder.tableNumber}
              
              
                Payment Method
                {currentOrder.paymentMethod}
              
              
                Order Time
                
                  {currentOrder.createdAt.toLocaleTimeString([], { hour"2-digit", minute"2-digit" })}
                
              
              {currentOrder.promoCode && (
                
                  Promo Applied
                  {currentOrder.promoCode}
                
              )}
            

            

            Items
            
              {currentOrder.items.map((item) => (
                
                  
                    {item.name} x{item.quantity}
                  
                  ${(item.price * item.quantity).toFixed(2)}
                
              ))}
            

            

            
              Total Paid
              ${currentOrder.totalPrice.toFixed(2)}
            
          
        

        {/* Leave Review Button - Show when delivered */}
        {currentOrder.status === "delivered" && (
          
            
              
              
                How was your meal?
                We'd love to hear your feedback!
              
              
                Leave a Review
              
            
          
        )}
      
    
  )
}
