import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

export function Calendar({
  value,
  onChange,
  className,
  ...props
}) {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const handleSelectDate = (day) => {
    if (onChange) {
      onChange(day);
    }
  };
  
  return (
    <div className={`p-3 bg-white rounded-lg shadow-sm ${className || ''}`} {...props}>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="font-medium">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected = value && isSameDay(day, value);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          
          return (
            <button
              key={day.toString()}
              type="button"
              onClick={() => handleSelectDate(day)}
              className={`
                h-8 w-8 rounded-full flex items-center justify-center text-sm
                ${!isCurrentMonth ? 'text-gray-300' : ''}
                ${isSelected ? 'bg-purple-500 text-white' : 'hover:bg-gray-100'}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}