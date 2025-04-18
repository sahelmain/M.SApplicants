import * as React from "react"
import { Card } from "./card"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(
        "bg-white/10 backdrop-blur-xl rounded-xl border-white/20 shadow-lg",
        className
      )}
      {...props}
    />
  )
)
GlassCard.displayName = "GlassCard" 