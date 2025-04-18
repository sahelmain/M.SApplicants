"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

// Dialog root
const Dialog = DialogPrimitive.Root

// Dialog trigger (exported if needed elsewhere)
const DialogTrigger = DialogPrimitive.Trigger

// Dialog content with portal and overlay
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={cn(
      "fixed inset-0 bg-black/50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out"
    )} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 grid w-full gap-4 rounded-lg bg-popover p-6 shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:fade-out-90",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

export { Dialog, DialogTrigger, DialogContent } 