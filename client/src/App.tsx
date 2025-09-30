import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminLogin from "@/pages/admin/login";
import { useEffect, lazy, Suspense } from "react";
import { initializeAutoPauseMedia, cleanupAutoPauseMedia } from "@/utils/auto-pause-media";

const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <AdminDashboard />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize global auto-pause functionality for all media elements
    initializeAutoPauseMedia();
    
    return () => {
      cleanupAutoPauseMedia();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
