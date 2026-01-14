'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle'

const ToggleGroupContext = React.createContext
>({
  size'default',
  variant'default',
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}.ComponentProps &
  VariantProps) {
  return (
    
      
        {children}
      
    
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}.ComponentProps &
  VariantProps) {
  const context = React.useContext(ToggleGroupContext)

  return (
    
      {children}
    
  )
}

export { ToggleGroup, ToggleGroupItem }
