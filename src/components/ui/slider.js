import React from 'react';

const Slider = React.forwardRef(({ className, value, min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (onValueChange) {
      onValueChange([newValue]);
    }
  };

  return (
    <div className={`relative w-full ${className || ''}`}>
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value ? value[0] : min}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        {...props}
      />
    </div>
  );
});

Slider.displayName = 'Slider';

export { Slider };