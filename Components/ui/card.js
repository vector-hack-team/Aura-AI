import React from 'react';

export function Card({ className, ...props }) {
  return (
    <div
      className={`bg-white rounded-lg border border-border shadow-sm ${className || ''}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={`p-6 pb-2 ${className || ''}`} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={`text-sm text-muted-foreground ${className || ''}`}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={`p-6 pt-0 ${className || ''}`} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={`flex items-center p-6 pt-0 ${className || ''}`}
      {...props}
    />
  );
}