import React from 'react';

const Badge = ({ 
  children, 
  className = '', 
  variant = 'default', 
  ...props 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    destructive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    outline: 'border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-300',
  };

  const variantStyle = variants[variant] || variants.default;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };