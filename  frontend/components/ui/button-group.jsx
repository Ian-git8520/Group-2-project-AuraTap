import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]-visible-10 [&>*]-visible&>[data-slot=select-trigger]([class*='w-'])]-fit [&>input]-1 has-[select[aria-hidden=true]-child]&>[data-slot=select-trigger]-of-type]-r-md has-[>[data-slot=button-group]]-2",
  {
    variants{
      orientation{
        horizontal'[&>*(-child)]-l-none [&>*(-child)]-l-0 [&>*(-child)]-r-none',
        vertical'flex-col [&>*(-child)]-t-none [&>*(-child)]-t-0 [&>*(-child)]-b-none',
      },
    },
    defaultVariants{
      orientation'horizontal',
    },
  },
)

function ButtonGroup({
  className,
  orientation,
  ...props
}.ComponentProps & VariantProps) {
  return (
    
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}.ComponentProps & {
  asChild?}) {
  const Comp = asChild ? Slot 'div'

  return (
    
  )
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}.ComponentProps) {
  return (
    
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
