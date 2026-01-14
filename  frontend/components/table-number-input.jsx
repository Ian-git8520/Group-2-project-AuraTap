"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, CheckCircle } from "lucide-react"



export function TableNumberInput({ onSubmit }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e.FormEvent) => {
    e.preventDefault()

    const trimmed = value.trim()
    if (!trimmed) {
      setError("Please enter your table number")
      return
    }

    const num = Number.parseInt(trimmed, 10)
    if (isNaN(num) || num  50) {
      setError("Please enter a valid table number (1-50)")
      return
    }

    onSubmit(trimmed)
  }

  return (
    
      
        
          
            
          
          QR Code Scanned Successfully!
          AuraTap
          Please enter your table number to start ordering.
        
        
          
            
               {
                  setValue(e.target.value)
                  setError("")
                }}
                className="text-center text-2xl h-14 font-semibold"
                autoFocus
              />
              {error && {error}}
            
            
              
              View Menu
            
          
        
      
    
  )
}
