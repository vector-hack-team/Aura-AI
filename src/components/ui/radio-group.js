import React from 'react';

const RadioGroupContext = React.createContext(null);

const RadioGroup = React.forwardRef(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={className} {...props} />
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const checked = context?.value === value;

  return (
    <button
      ref={ref}
      className={`h-4 w-4 rounded-full border border-gray-300 text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-primary-400 dark:focus:ring-primary-400 dark:focus:ring-offset-gray-900 ${checked ? 'bg-primary-600 dark:bg-primary-400' : 'bg-white dark:bg-gray-800'} ${className || ''}`}
      onClick={() => context?.onValueChange?.(value)}
      aria-checked={checked}
      role="radio"
      {...props}
    >
      {checked && (
        <span className="flex h-full w-full items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-gray-900" />
        </span>
      )}
    </button>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';

const RadioGroupLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`}
      {...props}
    />
  );
});

RadioGroupLabel.displayName = 'RadioGroupLabel';

export { RadioGroup, RadioGroupItem, RadioGroupLabel };