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
  const order = orderId ? getOrder(orderId) , setFoodRating] = useState(0)
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
      
        
          
            
              
            
            
              Thank You!
              Your feedback helps us improve our service and food quality.
            
             router.push("/")}>
              Back to Menu
            
          
        
      
    )
  }

  const StarRating = ({
    rating,
    onRate,
    label,
  }{
    rating(rating) => void
    label}) => (
    
      {label}
      
        {[1, 2, 3, 4, 5].map((star) => (
           onRate(star)}
            className="p-1 transition-transform hover-110"
          >
            
          
        ))}
      
    
  )

  return (
    
      
        
           router.back()} className="gap-2">
            
            Back
          
        
      

      
        
          Rate Your Experience
          {order && Order #{order.id}}
        

        {/* Items Ordered */}
        {order && (
          
            
              Items You Ordered
              
                {order.items.map((item) => (
                  
                    {item.name}
                  
                ))}
              
            
          
        )}

        {/* Ratings */}
        
          
            
            
            
          
        

        {/* Comments */}
        
          
            Additional Comments (Optional)
             setComment(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          
        

        {/* Submit Button */}
        
          {isSubmitting ? (
            "Submitting..."
          ) (
            <>
              
              Submit Review
            
          )}
        
      
    
  )
}
