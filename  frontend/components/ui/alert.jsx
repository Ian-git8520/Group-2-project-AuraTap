import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]-x-3 gap-y-0.5 items-start [&>svg]-4 [&>svg]-y-0.5 [&>svg]-current',
  {
    variants{
      variant{
        default'bg-card text-card-foreground',
        destructive'text-destructive bg-card [&>svg]-current *-[slot=alert-description]-destructive/90',
      },
    },
    defaultVariants{
      variant'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}.ComponentProps & VariantProps) {
  return (
    
  )
}

function AlertTitle({ className, ...props }.ComponentProps) {
  return (
    
  )
}

function AlertDescription({
  className,
  ...props
}.ComponentProps) {
  return (
    
  )
}

export { Alert, AlertTitle, AlertDescription }
