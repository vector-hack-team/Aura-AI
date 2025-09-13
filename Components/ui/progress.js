import React from 'react';

export function Progress({
  value = 0,
  max = 100,
  className = '',
  indicatorClassName = '',
  showValue = false,
  valuePrefix = '',
  valueSuffix = '',
  ...props
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="relative">
      <div
        className={`h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}
        {...props}
      >
        <div
          className={`h-full bg-primary transition-all ${indicatorClassName}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="mt-1 text-xs text-right text-muted-foreground">
          {valuePrefix}{value}{valueSuffix}
        </div>
      )}
    </div>
  );
}