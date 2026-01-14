"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartSheet } from "@/components/cart-sheet"



export function Header({ tableNumber }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    
      
        
          
            AuraTap
            {tableNumber && (
              
                Table {tableNumber}
              
            )}
          

          
            
              Appetizers
            
            
              Main Courses
            
            
              Sides
            
            
              Desserts
            
            
              Drinks
            
          

          
            {tableNumber && }
             setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ?  }
            
          
        

        {isMenuOpen && (
          
            
              
                Appetizers
              
              
                Main Courses
              
              
                Sides
              
              
                Desserts
              
              
                Drinks
              
            
          
        )}
      
    
  )
}
