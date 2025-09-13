import React from 'react';

export function Select({
  className,
  children,
  ...props
}) {
  return (
    <select
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectOption({
  className,
  children,
  ...props
}) {
  return (
    <option
      className={`${className || ''}`}
      {...props}
    >
      {children}
    </option>
  );
}