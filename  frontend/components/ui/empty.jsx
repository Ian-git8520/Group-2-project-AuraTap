import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

function Empty({ className, ...props }.ComponentProps) {
  return (
    
  )
}

function EmptyHeader({ className, ...props }.ComponentProps) {
  return (
    
  )
}

const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center mb-2 [&_svg]-events-none [&_svg]-0',
  {
    variants{
      variant{
        default'bg-transparent',
        icon"bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg([class*='size-'])]-6",
      },
    },
    defaultVariants{
      variant'default',
    },
  },
)

function EmptyMedia({
  className,
  variant = 'default',
  ...props
}.ComponentProps & VariantProps) {
  return (
    
  )
}

function EmptyTitle({ className, ...props }.ComponentProps) {
  return (
    
  )
}

function EmptyDescription({ className, ...props }.ComponentProps) {
  return (
    a-primary text-sm/relaxed [&>a]&>a]-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }.ComponentProps) {
  return (
    
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
