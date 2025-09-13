import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Heart, MessageCircle, BarChart3, Calendar, Settings, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
  },
  {
    title: "Chat",
    url: createPageUrl("Chat"),
    icon: MessageCircle,
  },
  {
    title: "Mood Tracker",
    url: createPageUrl("MoodTracker"),
    icon: Heart,
  },
  {
    title: "Assessments",
    url: createPageUrl("Assessments"),
    icon: Calendar,
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
      <style>{`
        :root {
          --primary: 219 70% 65%;
          --primary-foreground: 0 0% 98%;
          --secondary: 320 20% 95%;
          --accent: 270 95% 98%;
          --muted: 270 20% 96%;
          --border: 270 15% 92%;
        }
      `}</style>
      
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar className="border-r border-purple-100 bg-white/80 backdrop-blur-sm">
            <SidebarHeader className="border-b border-purple-100 p-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h2 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Aura
                  </h2>
                  <p className="text-xs text-gray-500">Your AI Companion</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-4">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 rounded-xl mb-2 ${
                            location.pathname === item.url ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-sm' : ''
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
                  Support
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-4 py-3 space-y-3">
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-red-500" />
                        <span className="font-medium text-red-700 text-sm">Emergency</span>
                      </div>
                      <p className="text-xs text-red-600 mb-2">Need immediate help?</p>
                      <button className="w-full bg-red-500 text-white rounded-lg px-3 py-2 text-xs font-medium hover:bg-red-600 transition-colors">
                        Crisis Support
                      </button>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-purple-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">Anonymous User</p>
                  <p className="text-xs text-gray-500 truncate">Safe & Secure</p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col min-w-0">
            <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-6 py-4 md:hidden">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-purple-50 p-2 rounded-xl transition-colors duration-300" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Aura
                </h1>
              </div>
            </header>

            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}