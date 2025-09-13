import React, { createContext, useContext, useState } from 'react';

// Create context for sidebar state
const SidebarContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
});

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

export function Sidebar({ className, ...props }) {
  const { isOpen } = useSidebar();
  
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col bg-white transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className || ''}`}
      {...props}
    />
  );
}

export function SidebarHeader({ className, ...props }) {
  return <div className={`flex items-center ${className || ''}`} {...props} />;
}

export function SidebarContent({ className, ...props }) {
  return <div className={`flex-1 overflow-auto ${className || ''}`} {...props} />;
}

export function SidebarFooter({ className, ...props }) {
  return <div className={`mt-auto ${className || ''}`} {...props} />;
}

export function SidebarGroup({ className, ...props }) {
  return <div className={`mb-4 ${className || ''}`} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }) {
  return <h3 className={`mb-1 ${className || ''}`} {...props} />;
}

export function SidebarGroupContent({ className, ...props }) {
  return <div className={`${className || ''}`} {...props} />;
}

export function SidebarMenu({ className, ...props }) {
  return <nav className={`space-y-1 ${className || ''}`} {...props} />;
}

export function SidebarMenuItem({ className, ...props }) {
  return <div className={`${className || ''}`} {...props} />;
}

export function SidebarMenuButton({ className, asChild = false, ...props }) {
  const Comp = asChild ? React.Fragment : 'button';
  return asChild ? (
    <div className={`w-full ${className || ''}`} {...props} />
  ) : (
    <Comp
      className={`w-full text-left ${className || ''}`}
      {...props}
    />
  );
}

export function SidebarTrigger({ className, ...props }) {
  const { isOpen, setIsOpen } = useSidebar();
  
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`p-2 ${className || ''}`}
      aria-label="Toggle sidebar"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}