"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { PaymentMethod } from "@/components/payment-method"
import { useCart } from "@/lib/cart-context"

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()

  const tableNumber = searchParams.get("table") || "1"

  const handleBack = () => {
    router.back()
  }

  const handlePaymentComplete = () => {
    clearCart()
    router.push("/")
  }

  if (items.length === 0) {
    return (
      
        
          Your cart is empty
          Add items to your cart before proceeding to payment.
           router.push("/")} className="text-primary underline">
            Return to menu
          
        
      
    )
  }

  return (
    
  )
}

function PaymentFallback() {
  return (
    
      Loading payment...
    
  )
}

export default function PaymentPage() {
  return (
    }>
      
    
  )
}
