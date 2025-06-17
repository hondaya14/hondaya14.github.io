import React from 'react'
import clsx from 'clsx'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-800 text-white',
    secondary: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  }
  return (
    <span
      className={clsx('inline-flex items-center rounded-full px-2 py-1 text-xs font-medium', variantClasses[variant], className)}
      {...props}
    />
  )
}
