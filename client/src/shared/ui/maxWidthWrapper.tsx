import { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface MaxWidthWrapperProps {
  children: ReactNode
  className?: string
}

export const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-3', className)}>
      {children}
    </div>
  )
}
