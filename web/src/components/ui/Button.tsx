import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  children: ReactNode
}

const variants = {
  primary: 'bg-indigo-500 hover:bg-indigo-400 text-white',
  secondary: 'bg-white/5 hover:bg-white/10 text-slate-300 ring-1 ring-white/10',
  danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 ring-1 ring-red-500/20',
  success: 'bg-emerald-500 hover:bg-emerald-400 text-white',
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
