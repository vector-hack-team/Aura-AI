import React from 'react';

const TabsContext = React.createContext(null);

export function Tabs({ value, onValueChange, className, children, ...props }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={`${className || ''}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children, ...props }) {
  const context = React.useContext(TabsContext);
  
  const isActive = context?.value === value;
  
  const handleClick = () => {
    if (context?.onValueChange) {
      context.onValueChange(value);
    }
  };
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={handleClick}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children, ...props }) {
  const context = React.useContext(TabsContext);
  
  if (context?.value !== value) {
    return null;
  }
  
  return (
    <div
      role="tabpanel"
      data-state={context?.value === value ? "active" : "inactive"}
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}