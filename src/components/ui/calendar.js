import React from 'react';

const Calendar = ({ 
  mode = 'single', 
  selected, 
  onSelect, 
  className, 
  modifiers = {}, 
  modifiersStyles = {}, 
  ...props 
}) => {
  // Simple calendar implementation
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleSelectDate = (day) => {
    if (!onSelect) return;
    
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    onSelect(newDate);
  };
  
  const isSelected = (day) => {
    if (!selected) return false;
    
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    if (Array.isArray(selected)) {
      return selected.some(selectedDate => 
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear()
      );
    }
    
    return (
      selected.getDate() === date.getDate() &&
      selected.getMonth() === date.getMonth() &&
      selected.getFullYear() === date.getFullYear()
    );
  };
  
  const getModifierStyles = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    let styles = {};
    
    Object.keys(modifiers).forEach(modifierKey => {
      const modifierFn = modifiers[modifierKey];
      if (modifierFn && modifierFn(date)) {
        const modifierStyleFn = modifiersStyles[modifierKey];
        if (modifierStyleFn) {
          const modifierStyle = modifierStyleFn(date);
          styles = { ...styles, ...modifierStyle };
        }
      }
    });
    
    return styles;
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const renderDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-9 w-9"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelectedDay = isSelected(day);
      const modifierStyle = getModifierStyles(day);
      
      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleSelectDate(day)}
          className={`h-9 w-9 rounded-md flex items-center justify-center text-sm ${isSelectedDay ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          style={modifierStyle}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  return (
    <div className={`p-3 ${className || ''}`} {...props}>
      <div className="flex justify-between items-center mb-2">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          &lt;
        </button>
        <div className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          &gt;
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map(day => (
          <div key={day} className="h-9 w-9 flex items-center justify-center text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};

export { Calendar };