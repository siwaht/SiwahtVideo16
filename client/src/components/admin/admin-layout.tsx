import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  LogOut, 
  Home, 
  Users, 
  Video, 
  UserCircle, 
  Mic, 
  Film,
  Radio,
  Menu,
  X,
  ArrowLeft,
  Webhook,
  Server
} from "lucide-react";

interface AdminLayoutProps {
  user: any;
  onLogout: () => void;
  children: React.ReactNode;
}

const navigationItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: Home,
    category: "main"
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: Users,
    category: "main"
  },
  {
    label: "Video Ads",
    href: "/admin/demo-videos",
    icon: Video,
    category: "content"
  },
  {
    label: "Avatars",
    href: "/admin/avatars",
    icon: UserCircle,
    category: "content"
  },
  {
    label: "Voice Samples",
    href: "/admin/voice-samples",
    icon: Mic,
    category: "content"
  },
  {
    label: "Video Editing",
    href: "/admin/edited-videos",
    icon: Film,
    category: "content"
  },
  {
    label: "Podcast Samples",
    href: "/admin/podcast-samples",
    icon: Radio,
    category: "content"
  },
  {
    label: "Webhooks",
    href: "/admin/webhooks",
    icon: Webhook,
    category: "content"
  },
];

export default function AdminLayout({ user, onLogout, children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    if (href === "/admin") {
      return location === "/admin";
    }
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>

            {/* Logo and title */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Siwaht Admin</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Content Management System</p>
              </div>
            </div>
          </div>
          
          {/* User info and actions */}
          <div className="flex items-center gap-3">
            <div className="text-sm hidden sm:block">
              <span className="text-muted-foreground">Welcome, </span>
              <span className="font-medium">{user?.username || "Admin"}</span>
            </div>
            
            {/* Back to Site button */}
            <Link href="/">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Site</span>
              </Button>
            </Link>
            
            {/* Logout button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
          <div className="flex-1 flex flex-col min-h-0 border-r bg-background">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-3 space-y-4">
                {/* Main Section */}
                <div>
                  <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Overview
                  </h3>
                  <div className="space-y-1">
                    {navigationItems.filter(item => item.category === "main").map((item) => {
                      const Icon = item.icon;
                      const isActive = isActiveRoute(item.href);
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`
                            group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                            ${isActive
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            }
                          `}
                        >
                          <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Content Management Section */}
                <div>
                  <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Content Management
                  </h3>
                  <div className="space-y-1">
                    {navigationItems.filter(item => item.category === "content").map((item) => {
                      const Icon = item.icon;
                      const isActive = isActiveRoute(item.href);
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`
                            group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                            ${isActive
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            }
                          `}
                        >
                          <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-background border-r">
              <div className="flex-1 flex flex-col pt-20 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-3 space-y-4">
                  {/* Main Section */}
                  <div>
                    <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Overview
                    </h3>
                    <div className="space-y-1">
                      {navigationItems.filter(item => item.category === "main").map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveRoute(item.href);
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                              group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                              ${isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                              }
                            `}
                          >
                            <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Content Management Section */}
                  <div>
                    <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Content Management
                    </h3>
                    <div className="space-y-1">
                      {navigationItems.filter(item => item.category === "content").map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveRoute(item.href);
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                              group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                              ${isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                              }
                            `}
                          >
                            <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}