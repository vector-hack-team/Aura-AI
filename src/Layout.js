import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Home, MessageSquare, BarChart2, ClipboardList, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from './components/ui/sidebar';

const navigationItems = [
  { name: 'Dashboard', href: createPageUrl('dashboard'), icon: Home },
  { name: 'Chat', href: createPageUrl('chat'), icon: MessageSquare },
  { name: 'Mood Tracker', href: createPageUrl('mood-tracker'), icon: BarChart2 },
  { name: 'Assessments', href: createPageUrl('assessments'), icon: ClipboardList },
];

const supportItems = [
  { name: 'Settings', href: createPageUrl('settings'), icon: Settings },
  { name: 'Help', href: createPageUrl('help'), icon: HelpCircle },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    // Implement logout functionality
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for desktop */}
        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">A</div>
              <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">Aura</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto py-4">
            <SidebarGroup>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.name} className={location.pathname === item.href ? 'bg-primary-50 dark:bg-gray-800' : ''}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.href)}
                      className={`flex items-center w-full px-6 py-3 text-sm font-medium ${location.pathname === item.href ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      <item.icon className={`h-5 w-5 mr-3 ${location.pathname === item.href ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`} />
                      {item.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup className="mt-8">
              <h3 className="px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Support</h3>
              <SidebarMenu>
                {supportItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.href)}
                      className="flex items-center w-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      <item.icon className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                      {item.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              <LogOut className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
              Log out
            </button>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile menu */}
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
          style={{ opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar className="flex flex-col h-full">
              <SidebarHeader className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">A</div>
                  <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">Aura</span>
                </div>
              </SidebarHeader>
              <SidebarContent className="flex-1 overflow-y-auto py-4">
                <SidebarGroup>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.name} className={location.pathname === item.href ? 'bg-primary-50 dark:bg-gray-800' : ''}>
                        <SidebarMenuButton
                          onClick={() => {
                            navigate(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center w-full px-6 py-3 text-sm font-medium ${location.pathname === item.href ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
                        >
                          <item.icon className={`h-5 w-5 mr-3 ${location.pathname === item.href ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`} />
                          {item.name}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="mt-8">
                  <h3 className="px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Support</h3>
                  <SidebarMenu>
                    {supportItems.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          onClick={() => {
                            navigate(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center w-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          <item.icon className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                          {item.name}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                  Log out
                </button>
              </SidebarFooter>
            </Sidebar>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col md:pl-64">
          {/* Mobile header */}
          <header className="md:hidden sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">A</div>
                <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">Aura</span>
              </div>
              <SidebarTrigger onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </SidebarTrigger>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;