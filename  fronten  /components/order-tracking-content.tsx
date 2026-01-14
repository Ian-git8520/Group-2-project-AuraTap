"use client"

import type React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Package, ChefHat, CheckCircle, Truck, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useOrders, type OrderStatus } from "@/lib/order-context"

const statusSteps: { status: OrderStatus; label: string; icon: React.ReactNode; description: string }[] = [
  {
    status: "pending",
    label: "Order Placed",
    icon: <Package className="h-5 w-5" />,
    description: "We received your order",
  },
  {
    status: "confirmed",
    label: "Confirmed",
    icon: <CheckCircle className="h-5 w-5" />,
    description: "Restaurant confirmed",
  },
  { status: "preparing", label: "Preparing", icon: <ChefHat className="h-5 w-5" />, description: "Chef is cooking" },
  { status: "ready", label: "Ready", icon: <Clock className="h-5 w-5" />, description: "Ready for pickup/delivery" },
  { status: "delivered", label: "Delivered", icon: <Truck className="h-5 w-5" />, description: "Enjoy your meal!" },
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Order Not Found</h2>
            <p className="text-muted-foreground">We couldn't find the order you're looking for.</p>
            <Button onClick={() => router.push("/")}>Back to Menu</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentStepIndex = statusSteps.findIndex((step) => step.status === currentOrder.status)

  const handleLeaveReview = () => {
    router.push(`/review?orderId=${orderId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="container mx-auto px-4 py-4 max-w-2xl">
          <Button variant="ghost" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Tracking</h1>
          <p className="text-muted-foreground">Order #{currentOrder.id}</p>
        </div>

        {/* Status Timeline */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex

                return (
                  <div key={step.status} className="flex items-start gap-4 pb-8 last:pb-0">
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                      >
                        {step.icon}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div className={`w-0.5 h-12 mt-2 ${index < currentStepIndex ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>

                    {/* Step content */}
                    <div className="flex-1 pt-1">
                      <h3 className={`font-semibold ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {isCurrent && <p className="text-sm text-primary mt-1 font-medium">In progress...</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Table Number</span>
                <span className="font-medium">{currentOrder.tableNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium capitalize">{currentOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order Time</span>
                <span className="font-medium">
                  {currentOrder.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              {currentOrder.promoCode && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Promo Applied</span>
                  <span className="font-medium text-green-600">{currentOrder.promoCode}</span>
                </div>
              )}
            </div>

            <div className="border-t my-4" />

            <h4 className="font-medium mb-3">Items</h4>
            <div className="space-y-2">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total Paid</span>
              <span className="text-primary">${currentOrder.totalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Leave Review Button - Show when delivered */}
        {currentOrder.status === "delivered" && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center space-y-4">
              <Star className="h-12 w-12 mx-auto text-amber-500" />
              <div>
                <h3 className="font-semibold text-lg">How was your meal?</h3>
                <p className="text-sm text-muted-foreground">We'd love to hear your feedback!</p>
              </div>
              <Button className="w-full" onClick={handleLeaveReview}>
                Leave a Review
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
