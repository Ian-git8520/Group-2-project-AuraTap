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

interface PaymentMethodProps {
  items: CartItem[]
  tableNumber: string
  totalPrice: number
  onBack: () => void
  onPaymentComplete: () => void
}

type PaymentType = "card" | "mpesa" | "cash"

const PROMO_CODES: Record<string, { discount: number; type: "percent" | "fixed"; description: string }> = {
  WELCOME10: { discount: 10, type: "percent", description: "10% off your order" },
  SAVE5: { discount: 5, type: "fixed", description: "$5 off your order" },
  FIRST20: { discount: 20, type: "percent", description: "20% off for first-time customers" },
}

export function PaymentMethod({ items, tableNumber, totalPrice, onBack, onPaymentComplete }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentType>("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState("")
  const [orderId, setOrderId] = useState<string | null>(null)

  const router = useRouter()
  const { addOrder } = useOrders()

  const promoDiscount = appliedPromo
    ? PROMO_CODES[appliedPromo].type === "percent"
      ? (totalPrice * PROMO_CODES[appliedPromo].discount) / 100
      : PROMO_CODES[appliedPromo].discount
    : 0

  const discountedTotal = totalPrice - promoDiscount
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
      totalPrice: finalTotal,
      status: "pending",
      paymentMethod: selectedMethod,
      promoCode: appliedPromo || undefined,
      discount: promoDiscount > 0 ? promoDiscount : undefined,
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground">
                Your order has been placed successfully. It will be delivered to Table {tableNumber} shortly.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-lg font-mono font-semibold text-foreground">{orderId}</p>
              <p className="text-sm text-muted-foreground mt-2">Order Total</p>
              <p className="text-3xl font-bold text-primary">${finalTotal.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full" onClick={handleTrackOrder}>
                Track Your Order
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleBackToMenu}>
                Back to Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="container mx-auto px-4 py-4 max-w-2xl">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Payment Method</h1>
          <p className="text-muted-foreground">Table {tableNumber} - Select how you'd like to pay</p>
        </div>

        {/* Promo Code Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Promo Code
            </h3>
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">{appliedPromo}</p>
                  <p className="text-sm text-green-600">{PROMO_CODES[appliedPromo].description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemovePromo}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApplyPromo} variant="outline">
                  Apply
                </Button>
              </div>
            )}
            {promoError && <p className="text-sm text-destructive mt-2">{promoError}</p>}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Promo Discount ({appliedPromo})</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span className="text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Select Payment Method</h3>
            <RadioGroup value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as PaymentType)}>
              <div className="space-y-3">
                {/* Card Payment */}
                <Label
                  htmlFor="card"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedMethod === "card" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="card" id="card" />
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                  </div>
                </Label>

                {/* M-Pesa Payment */}
                <Label
                  htmlFor="mpesa"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedMethod === "mpesa" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">M-Pesa</p>
                    <p className="text-sm text-muted-foreground">Pay via mobile money</p>
                  </div>
                </Label>

                {/* Cash Payment */}
                <Label
                  htmlFor="cash"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedMethod === "cash" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Banknote className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Cash</p>
                    <p className="text-sm text-muted-foreground">Pay at the table</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {/* Card Details Form */}
            {selectedMethod === "card" && (
              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" placeholder="John Doe" className="mt-1" />
                </div>
              </div>
            )}

            {/* M-Pesa Form */}
            {selectedMethod === "mpesa" && (
              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                  <Input
                    id="mpesaPhone"
                    placeholder="07XX XXX XXX"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    You will receive an STK push to complete the payment
                  </p>
                </div>
              </div>
            )}

            {/* Cash Info */}
            {selectedMethod === "cash" && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  A waiter will come to your table to collect payment after your order is served.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button className="w-full h-14 text-lg" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${finalTotal.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  )
}
