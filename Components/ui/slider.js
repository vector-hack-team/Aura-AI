import React, { useState, useRef, useEffect } from 'react';

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value,
  onChange,
  className,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(value !== undefined ? value : defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const trackRef = useRef(null);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [isControlled, value]);

  const handleChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const calculatePercentage = () => {
    return ((currentValue - min) / (max - min)) * 100;
  };

  const handleSliderClick = (e) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newValue = Math.round((percentage * (max - min) + min) / step) * step;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    
    handleChange(clampedValue);
  };

  return (
    <div
      className={`relative w-full h-5 flex items-center ${className || ''}`}
      {...props}
    >
      <div
        ref={trackRef}
        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={handleSliderClick}
      >
        <div
          className="absolute h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          style={{ width: `${calculatePercentage()}%` }}
        />
      </div>
      <div
        className="absolute w-4 h-4 bg-white border-2 border-purple-500 rounded-full shadow cursor-grab"
        style={{ left: `calc(${calculatePercentage()}% - 0.5rem)` }}
        onMouseDown={(e) => {
          e.preventDefault();
          
          const handleMouseMove = (moveEvent) => {
            if (!trackRef.current) return;
            
            const rect = trackRef.current.getBoundingClientRect();
            const percentage = (moveEvent.clientX - rect.left) / rect.width;
            const newValue = Math.round((percentage * (max - min) + min) / step) * step;
            const clampedValue = Math.max(min, Math.min(max, newValue));
            
            handleChange(clampedValue);
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />
    </div>
  );
}