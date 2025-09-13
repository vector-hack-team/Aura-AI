import React from 'react';

export function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}) {
  const Comp = asChild ? React.cloneElement : 'button';
  
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-white hover:bg-primary-dark',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-dark hover:to-secondary-dark',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  
  const variantStyle = variants[variant] || variants.default;
  const sizeStyle = sizes[size] || sizes.default;
  
  const classes = `${baseStyles} ${variantStyle} ${sizeStyle} ${className || ''}`;
  
  if (asChild) {
    return React.cloneElement(props.children, {
      className: `${classes} ${props.children.props.className || ''}`,
    });
  }
  
  return <button className={classes} {...props} />;
}