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
  Menu,
  X,
  ArrowLeft
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
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: Users,
  },
  {
    label: "Demo Videos",
    href: "/admin/demo-videos",
    icon: Video,
  },
  {
    label: "Avatars",
    href: "/admin/avatars",
    icon: UserCircle,
  },
  {
    label: "Voice Samples",
    href: "/admin/voice-samples",
    icon: Mic,
  },
  {
    label: "Edited Videos",
    href: "/admin/edited-videos",
    icon: Film,
  },
  {
    label: "Portfolio",
    href: "/admin/portfolio",
    icon: Video,
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
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.href);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                        ${isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }
                      `}
                    >
                      <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Separator */}
                <div className="my-4">
                  <Separator />
                </div>
                
                {/* Back to Site link */}
                <Link
                  href="/"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowLeft className="mr-3 h-4 w-4 flex-shrink-0" />
                  Back to Site
                </Link>
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
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.href);
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                          ${isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }
                        `}
                      >
                        <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  {/* Separator */}
                  <div className="my-4">
                    <Separator />
                  </div>
                  
                  {/* Back to Site link */}
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <ArrowLeft className="mr-3 h-4 w-4 flex-shrink-0" />
                    Back to Site
                  </Link>
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