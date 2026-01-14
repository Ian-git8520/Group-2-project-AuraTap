"use client"

import { MenuCard } from "@/components/menu-card"
import type { MenuCategory } from "@/lib/menu-data"



export function MenuSection({ section }) {
  return (
    
      
        {section.category}
        
      
      {section.description}
      
        {section.items.map((item) => (
          
        ))}
      
    
  )
}
