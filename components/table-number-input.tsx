"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, CheckCircle } from "lucide-react"

interface TableNumberInputProps {
  onSubmit: (tableNumber: string) => void
}

export function TableNumberInput({ onSubmit }: TableNumberInputProps) {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = value.trim()
    if (!trimmed) {
      setError("Please enter your table number")
      return
    }

    const num = Number.parseInt(trimmed, 10)
    if (isNaN(num) || num < 1 || num > 50) {
      setError("Please enter a valid table number (1-50)")
      return
    }

    onSubmit(trimmed)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 font-medium mb-2">QR Code Scanned Successfully!</p>
          <CardTitle className="text-3xl font-bold text-primary">AuraTap</CardTitle>
          <CardDescription className="text-base">Please enter your table number to start ordering.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter table number"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  setError("")
                }}
                className="text-center text-2xl h-14 font-semibold"
                autoFocus
              />
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
            </div>
            <Button type="submit" className="w-full h-12 text-lg">
              <UtensilsCrossed className="h-5 w-5 mr-2" />
              View Menu
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
