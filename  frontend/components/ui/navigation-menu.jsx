import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}.ComponentProps & {
  viewport?}) {
  return (
    
      {children}
      {viewport && }
    
  )
}

function NavigationMenuList({
  className,
  ...props
}.ComponentProps) {
  return (
    
  )
}

function NavigationMenuItem({
  className,
  ...props
}.ComponentProps) {
  return (
    
  )
}

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover-accent hover-accent-foreground focus-accent focus-accent-foreground disabled-events-none disabled-50 data-[state=open]-accent data-[state=open]-accent-foreground data-[state=open]-accent data-[state=open]-accent/50 focus-visible-ring/50 outline-none transition-[color,box-shadow] focus-visible-[3px] focus-visible-1',
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}.ComponentProps) {
  return (
    
      {children}{' '}
      
    
  )
}

function NavigationMenuContent({
  className,
  ...props
}.ComponentProps) {
  return (
    
  )
}

function NavigationMenuViewport({
  className,
  ...props
}.ComponentProps) {
  return (
    
      
    
  )
}

function NavigationMenuLink({
  className,
  ...props
}.ComponentProps) {
  return (
    
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}.ComponentProps) {
  return (
    
      
    
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
