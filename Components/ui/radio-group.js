import React from 'react';

const RadioGroupContext = React.createContext(null);

export function RadioGroup({ value, onValueChange, className, children, ...props }) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={`space-y-2 ${className || ''}`} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export function RadioGroupItem({ value, className, children, ...props }) {
  const context = React.useContext(RadioGroupContext);
  
  const handleChange = () => {
    if (context?.onValueChange) {
      context.onValueChange(value);
    }
  };
  
  const isChecked = context?.value === value;
  
  return (
    <label className={`flex items-center space-x-2 cursor-pointer ${className || ''}`}>
      <input
        type="radio"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isChecked ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}>
        {isChecked && <div className="w-2 h-2 rounded-full bg-purple-500" />}
      </div>
      {children && <span className="text-sm">{children}</span>}
    </label>
  );
}