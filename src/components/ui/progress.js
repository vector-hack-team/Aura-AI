import React from 'react';

const Progress = React.forwardRef(({ className, value, max = 100, ...props }, ref) => {
  const percentage = value != null ? Math.min(Math.max(0, (value / max) * 100), 100) : 0;
  
  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${className || ''}`}
      ref={ref}
      {...props}
    >
      <div
        className="h-full transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});

Progress.displayName = 'Progress';

export { Progress };