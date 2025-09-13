import React from 'react';

export function Alert({ variant = 'default', className, ...props }) {
  const variantClasses = {
    default: 'bg-primary/10 text-primary',
    destructive: 'bg-destructive/10 text-destructive',
    warning: 'bg-yellow-500/10 text-yellow-700',
    success: 'bg-green-500/10 text-green-700',
    info: 'bg-blue-500/10 text-blue-700',
  };

  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 ${variantClasses[variant]} ${className || ''}`}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }) {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className || ''}`}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }) {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className || ''}`}
      {...props}
    />
  );
}