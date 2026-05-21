import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-emerald-900 text-emerald-100 hover:bg-emerald-800 shadow-[var(--shadow-brand)] rounded-[10px]',
        secondary:
          'bg-surface text-ink hover:bg-line border border-line rounded-[10px]',
        dark:
          'bg-ink text-on-ink hover:bg-[#2a2a26] rounded-[8px]',
        light:
          'bg-emerald-100 text-emerald-900 hover:bg-white rounded-[10px]',
        ghostDark:
          'bg-transparent text-on-ink hover:bg-white/5 border border-white/18 hover:border-white/30 rounded-[10px]',
        ghost:
          'bg-transparent text-dim hover:text-ink hover:bg-surface border border-transparent hover:border-line rounded-[8px]',
      },
      size: {
        default: 'h-11 px-5 text-sm',
        sm: 'h-9 px-4 text-xs',
        nav: 'h-9 px-3.5 text-[13px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
