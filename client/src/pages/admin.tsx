import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import AdminAuth from "@/components/admin/admin-auth";
import AdminLayout from "@/components/admin/admin-layout";
import AdminDashboard from "@/components/admin/admin-dashboard";
import AdminContacts from "@/components/admin/admin-contacts";
import AdminDemoVideos from "@/components/admin/admin-demo-videos";
import AdminAvatars from "@/components/admin/admin-avatars";
import AdminVoiceSamples from "@/components/admin/admin-voice-samples";
import AdminEditedVideos from "@/components/admin/admin-edited-videos";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const savedUser = localStorage.getItem("adminUser");
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Verify token is still valid
        verifyAuth(token, parsedUser);
      } catch (error) {
        // Invalid saved data, clear it
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyAuth = async (token: string, savedUser: any) => {
    try {
      const response = await fetch("/api/admin/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          // Token is invalid
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
        }
      } else {
        // Token is invalid
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (token: string, userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setUser(null);
    setIsAuthenticated(false);
    setLocation("/admin");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  // Show admin panel if authenticated
  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/contacts" component={AdminContacts} />
        <Route path="/admin/demo-videos" component={AdminDemoVideos} />
        <Route path="/admin/avatars" component={AdminAvatars} />
        <Route path="/admin/voice-samples" component={AdminVoiceSamples} />
        <Route path="/admin/edited-videos" component={AdminEditedVideos} />
        <Route path="/admin/*">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground">The requested admin page does not exist.</p>
          </div>
        </Route>
      </Switch>
    </AdminLayout>
  );
}