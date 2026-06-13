import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface FieldProps {
  label: string
  error?: string
}

const fieldClasses =
  'peer w-full rounded-xl border border-line bg-white/[0.02] px-4 pb-2.5 pt-6 text-sm text-snow placeholder-transparent transition-colors duration-300 hover:border-snow/20 focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/30'

const labelClasses =
  'pointer-events-none absolute left-4 top-2 text-xs text-snow/50 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-light'

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & FieldProps
>(({ className, label, error, id, ...props }, ref) => {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`
  return (
    <div className="relative">
      <input
        ref={ref}
        id={inputId}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClasses, error && 'border-red-400/60', className)}
        {...props}
      />
      <label htmlFor={inputId} className={labelClasses}>
        {label}
      </label>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 pl-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})
Input.displayName = 'Input'

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps
>(({ className, label, error, id, ...props }, ref) => {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`
  return (
    <div className="relative">
      <textarea
        ref={ref}
        id={inputId}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClasses, 'min-h-32 resize-y', error && 'border-red-400/60', className)}
        {...props}
      />
      <label htmlFor={inputId} className={labelClasses}>
        {label}
      </label>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 pl-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})
Textarea.displayName = 'Textarea'
