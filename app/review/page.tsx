import { Suspense } from "react"
import { ReviewContent } from "@/components/review-content"

function ReviewFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  )
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<ReviewFallback />}>
      <ReviewContent />
    </Suspense>
  )
}
