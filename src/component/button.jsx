import React from 'react'

const Button = React.forwardRef(({ 
  className = '',
  variant = 'default',
  size = 'default',
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variantClasses = {
    default: "bg-bg-blue-500 text-white hover:bg-blue-800",
    outline: "hover:text-gray-900 border border-gray-200 hover:bg-gray-50",
    link: "text-gray-900 underline-offset-4 hover:underline"
  }
  
  const sizeClasses = {
    default:"h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8"
  }

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }