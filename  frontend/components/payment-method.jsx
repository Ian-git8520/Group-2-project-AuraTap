"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Smartphone, Banknote, ArrowLeft, Check, Loader2, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useOrders } from "@/lib/order-context"
import type { CartItem } from "@/lib/cart-context"



 type"percent" | "fixed"; description}> = {
  WELCOME10{ discount, type"percent", description"10% off your order" },
  SAVE5{ discount, type"fixed", description"$5 off your order" },
  FIRST20{ discount, type"percent", description"20% off for first-time customers" },
}

export function PaymentMethod({ items, tableNumber, totalPrice, onBack, onPaymentComplete }) {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState("")
  const [orderId, setOrderId] = useState(null)

  const router = useRouter()
  const { addOrder } = useOrders()

  const promoDiscount = appliedPromo
    ? PROMO_CODES[appliedPromo].type === "percent"
      ? (totalPrice * PROMO_CODES[appliedPromo].discount) / 100
      .discount
    = totalPrice - promoDiscount
  const tax = discountedTotal * 0.1
  const finalTotal = discountedTotal + tax

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim()
    if (PROMO_CODES[code]) {
      setAppliedPromo(code)
      setPromoError("")
      setPromoCode("")
    } else {
      setPromoError("Invalid promo code")
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoError("")
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    const newOrderId = addOrder({
      tableNumber,
      items,
      totalPrice,
      status"pending",
      paymentMethod,
      promoCode,
      discount> 0 ? promoDiscount ,
    })

    setOrderId(newOrderId)
    setIsProcessing(false)
    setIsComplete(true)
  }

  const handleTrackOrder = () => {
    if (orderId) {
      onPaymentComplete()
      router.push(`/order-tracking?orderId=${orderId}`)
    }
  }

  const handleBackToMenu = () => {
    onPaymentComplete()
    router.push("/")
  }

  if (isComplete) {
    return (
      
        
          
            
              
            
            
              Order Confirmed!
              
                Your order has been placed successfully. It will be delivered to Table {tableNumber} shortly.
              
            
            
              Order ID
              {orderId}
              Order Total
              ${finalTotal.toFixed(2)}
            
            
              
                Track Your Order
              
              
                Back to Menu
              
            
          
        
      
    )
  }

  return (
    
      
        
          
            
            Back to Cart
          
        
      

      
        
          Payment Method
          Table {tableNumber} - Select how you'd like to pay
        

        {/* Promo Code Section */}
        
          
            
              
              Promo Code
            
            {appliedPromo ? (
              
                
                  {appliedPromo}
                  {PROMO_CODES[appliedPromo].description}
                
                
                  
                
              
            ) (
              
                 setPromoCode(e.target.value)}
                  className="flex-1"
                />
                
                  Apply
                
              
            )}
            {promoError && {promoError}}
          
        

        {/* Order Summary */}
        
          
            Order Summary
            
              {items.map((item) => (
                
                  
                    {item.name} x{item.quantity}
                  
                  ${(item.price * item.quantity).toFixed(2)}
                
              ))}
            
            
            
              
                Subtotal
                ${totalPrice.toFixed(2)}
              
              {promoDiscount > 0 && (
                
                  Promo Discount ({appliedPromo})
                  -${promoDiscount.toFixed(2)}
                
              )}
              
                Tax (10%)
                ${tax.toFixed(2)}
              
              
                Total
                ${finalTotal.toFixed(2)}
              
            
          
        

        {/* Payment Methods */}
        
          
            Select Payment Method
             setSelectedMethod(value as PaymentType)}>
              
                {/* Card Payment */}
                
                  
                  
                    
                  
                  
                    Credit/Debit Card
                    Visa, Mastercard, Amex
                  
                

                {/* M-Pesa Payment */}
                
                  
                  
                    
                  
                  
                    M-Pesa
                    Pay via mobile money
                  
                

                {/* Cash Payment */}
                
                  
                  
                    
                  
                  
                    Cash
                    Pay at the table
                  
                
              
            

            {/* Card Details Form */}
            {selectedMethod === "card" && (
              
                
                  Card Number
                  
                
                
                  
                    Expiry Date
                    
                  
                  
                    CVV
                    
                  
                
                
                  Cardholder Name
                  
                
              
            )}

            {/* M-Pesa Form */}
            {selectedMethod === "mpesa" && (
              
                
                  M-Pesa Phone Number
                   setMpesaPhone(e.target.value)}
                    className="mt-1"
                  />
                  
                    You will receive an STK push to complete the payment
                  
                
              
            )}

            {/* Cash Info */}
            {selectedMethod === "cash" && (
              
                
                  A waiter will come to your table to collect payment after your order is served.
                
              
            )}
          
        

        {/* Pay Button */}
        
          {isProcessing ? (
            <>
              
              Processing...
            
          ) (
            `Pay $${finalTotal.toFixed(2)}`
          )}
        
      
    
  )
}
