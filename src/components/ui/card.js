import React from 'react';

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };