"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartSheet } from "@/components/cart-sheet"

interface HeaderProps {
  tableNumber?: string
}

export function Header({ tableNumber }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">AuraTap</span>
            {tableNumber && (
              <Badge variant="secondary" className="text-sm">
                Table {tableNumber}
              </Badge>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#appetizers"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Appetizers
            </a>
            <a
              href="#mains"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Main Courses
            </a>
            <a
              href="#sides"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sides
            </a>
            <a
              href="#desserts"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Desserts
            </a>
            <a
              href="#drinks"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Drinks
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {tableNumber && <CartSheet tableNumber={tableNumber} />}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#appetizers"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Appetizers
              </a>
              <a
                href="#mains"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Main Courses
              </a>
              <a
                href="#sides"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sides
              </a>
              <a
                href="#desserts"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Desserts
              </a>
              <a
                href="#drinks"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Drinks
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
