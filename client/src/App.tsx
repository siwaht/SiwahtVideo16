import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import { lazy, Suspense, useEffect } from "react";
import { initializeAutoPauseMedia, cleanupAutoPauseMedia } from "@/utils/auto-pause-media";

const Home = lazy(() => import("@/pages/home"));
const AdminLogin = lazy(() => import("@/pages/admin/login"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    initializeAutoPauseMedia();
    return () => {
      cleanupAutoPauseMedia();
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
