import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors',
  {
    variants: {
      variant: {
        default: 'border-line bg-white/[0.03] text-snow/70',
        violet: 'border-primary/30 bg-primary/10 text-primary-light',
        cyan: 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
        blue: 'border-accent-blue/30 bg-accent-blue/10 text-accent-blue',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
