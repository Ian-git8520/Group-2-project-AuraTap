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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground">Add items to your cart before proceeding to payment.</p>
          <button onClick={() => router.push("/")} className="text-primary underline">
            Return to menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <PaymentMethod
      items={items}
      tableNumber={tableNumber}
      totalPrice={totalPrice}
      onBack={handleBack}
      onPaymentComplete={handlePaymentComplete}
    />
  )
}

function PaymentFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading payment...</div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentFallback />}>
      <PaymentContent />
    </Suspense>
  )
}

1234567
