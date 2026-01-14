"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"



export function CartSheet({ tableNumber }) {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handlePlaceOrder = () => {
    setIsOpen(false)
    router.push(`/payment?table=${tableNumber}`)
  }

  return (
    
      
        
          
          {totalItems > 0 && (
            
              {totalItems}
            
          )}
        
      
      
        
          
            
            Your Order
            (Table {tableNumber})
          
        

        {items.length === 0 ? (
          
            
            Your cart is empty
            Add items from the menu to start your order
          
        ) (
          <>
            
              {items.map((item) => (
                
                  
                    
                  
                  
                    {item.name}
                    ${item.price.toFixed(2)}
                    
                       updateQuantity(item.id, item.quantity - 1)}
                      >
                        
                      
                      {item.quantity}
                       updateQuantity(item.id, item.quantity + 1)}
                      >
                        
                      
                       removeItem(item.id)}
                      >
                        
                      
                    
                  
                  
                    ${(item.price * item.quantity).toFixed(2)}
                  
                
              ))}
            

            
              
                
                  Subtotal
                  ${totalPrice.toFixed(2)}
                
                
                  Tax (10%)
                  ${(totalPrice * 0.1).toFixed(2)}
                
                
                
                  Total
                  ${(totalPrice * 1.1).toFixed(2)}
                
              

              
                
                  Place Order
                
                
                  Clear Cart
                
              
            
          
        )}
      
    
  )
}
