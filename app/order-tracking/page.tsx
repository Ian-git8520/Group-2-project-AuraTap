import { Suspense } from "react"
import { OrderTrackingContent } from "@/components/order-tracking-content"

function OrderTrackingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading order...</div>
    </div>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<OrderTrackingFallback />}>
      <OrderTrackingContent />
    </Suspense>
  )
}
