import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { OrderProvider } from "@/lib/order-context"
import "./globals.css"

const _geist = Geist({ subsets"latin"] })
const _geistMono = Geist_Mono({ subsets"latin"] })

export const metadata= {
  title"AuraTap - Menu",
  description"Explore our delicious menu at AuraTap",
  generator"v0.app",
  icons{
    icon{
        url"/icon-light-32x32.png",
        media"(prefers-color-scheme)",
      },
      {
        url"/icon-dark-32x32.png",
        media"(prefers-color-scheme)",
      },
      {
        url"/icon.svg",
        type"image/svg+xml",
      },
    ],
    apple"/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}) {
  return (
    
      
        
          {children}
        
        
      
    
  )
}
