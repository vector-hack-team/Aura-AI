import React, { createContext, useContext, useState } from 'react';

// Create context for sidebar state management
const SidebarContext = createContext(undefined);

function Sidebar({ children, className = '', ...props }) {
  const [open, setOpen] = useState(false);
  
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className={`sidebar ${className}`} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function SidebarHeader({ className = '', ...props }) {
  return (
    <div className={`sidebar-header ${className}`} {...props} />
  );
}

function SidebarContent({ className = '', ...props }) {
  return (
    <div className={`sidebar-content ${className}`} {...props} />
  );
}

function SidebarFooter({ className = '', ...props }) {
  return (
    <div className={`sidebar-footer ${className}`} {...props} />
  );
}

function SidebarGroup({ className = '', ...props }) {
  return (
    <div className={`sidebar-group ${className}`} {...props} />
  );
}

function SidebarMenu({ className = '', ...props }) {
  return (
    <nav className={`sidebar-menu ${className}`} {...props} />
  );
}

function SidebarMenuItem({ className = '', ...props }) {
  return (
    <div className={`sidebar-menu-item ${className}`} {...props} />
  );
}

function SidebarMenuButton({ className = '', ...props }) {
  return (
    <button className={`sidebar-menu-button ${className}`} {...props} />
  );
}

function SidebarTrigger({ className = '', ...props }) {
  const { setOpen } = useContext(SidebarContext);
  
  return (
    <button 
      className={`sidebar-trigger ${className}`}
      onClick={() => setOpen(prev => !prev)}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
};