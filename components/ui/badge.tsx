import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full text-[11px] font-medium px-2.5 py-1',
  {
    variants: {
      variant: {
        adopted: 'bg-emerald-100/50 text-emerald-900',
        live: 'bg-[#ECFDF5] text-[#047857]',
        proto: 'bg-[#EFF6FF] text-[#2563EB]',
        outline: 'bg-page border border-line text-dim',
        open: 'bg-surface border border-line text-ink',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
