"use client"

import { MenuCard } from "@/components/menu-card"
import type { MenuCategory } from "@/lib/menu-data"

interface MenuSectionProps {
  section: MenuCategory
}

export function MenuSection({ section }: MenuSectionProps) {
  return (
    <section id={section.id} className="scroll-mt-20">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{section.category}</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      <p className="text-muted-foreground mb-8">{section.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
