"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Star, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useOrders } from "@/lib/order-context"

export function ReviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getOrder } = useOrders()

  const orderId = searchParams.get("orderId")
  const order = orderId ? getOrder(orderId) : null

  const [foodRating, setFoodRating] = useState(0)
  const [serviceRating, setServiceRating] = useState(0)
  const [overallRating, setOverallRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
              <p className="text-muted-foreground">Your feedback helps us improve our service and food quality.</p>
            </div>
            <Button className="w-full" onClick={() => router.push("/")}>
              Back to Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const StarRating = ({
    rating,
    onRate,
    label,
  }: {
    rating: number
    onRate: (rating: number) => void
    label: string
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star className={`h-8 w-8 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="container mx-auto px-4 py-4 max-w-2xl">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Rate Your Experience</h1>
          {order && <p className="text-muted-foreground">Order #{order.id}</p>}
        </div>

        {/* Items Ordered */}
        {order && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Items You Ordered</h3>
              <div className="flex flex-wrap gap-2">
                {order.items.map((item) => (
                  <div key={item.id} className="px-3 py-1.5 bg-muted rounded-full text-sm">
                    {item.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ratings */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <StarRating rating={foodRating} onRate={setFoodRating} label="Food Quality" />
            <StarRating rating={serviceRating} onRate={setServiceRating} label="Service" />
            <StarRating rating={overallRating} onRate={setOverallRating} label="Overall Experience" />
          </CardContent>
        </Card>

        {/* Comments */}
        <Card>
          <CardContent className="pt-6">
            <Label htmlFor="comment">Additional Comments (Optional)</Label>
            <Textarea
              id="comment"
              placeholder="Tell us more about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          className="w-full h-14 text-lg"
          onClick={handleSubmit}
          disabled={isSubmitting || (foodRating === 0 && serviceRating === 0 && overallRating === 0)}
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Submit Review
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
