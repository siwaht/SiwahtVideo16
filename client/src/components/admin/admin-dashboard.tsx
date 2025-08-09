import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  Video, 
  UserCircle, 
  Mic, 
  Film,
  TrendingUp,
  Calendar,
  Activity
} from "lucide-react";

interface DashboardStats {
  totalContacts: number;
  totalDemoVideos: number;
  totalAvatars: number;
  totalVoiceSamples: number;
  totalEditedVideos: number;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Error Loading Dashboard</CardTitle>
            <CardDescription className="text-center">
              Unable to load dashboard statistics. Please try refreshing the page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const statCards = [
    {
      title: "Contact Requests",
      value: stats?.totalContacts || 0,
      icon: Users,
      description: "New inquiries",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Video Ads",
      value: stats?.totalDemoVideos || 0,
      icon: Video,
      description: "Published videos",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "AI Avatars",
      value: stats?.totalAvatars || 0,
      icon: UserCircle,
      description: "Active avatars",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Voice Samples",
      value: stats?.totalVoiceSamples || 0,
      icon: Mic,
      description: "Audio samples",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Video Portfolio",
      value: stats?.totalEditedVideos || 0,
      icon: Film,
      description: "Edited videos",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Overview</h1>
          <p className="text-sm sm:text-base text-slate-600">
            Monitor your content and track engagement metrics
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <span className="sm:hidden">
            {new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <div className={`absolute inset-0 ${stat.bgColor} opacity-50`} />
              <CardContent className="relative p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1 truncate">
                      {stat.title}
                    </p>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-2 sm:p-3 rounded-xl flex-shrink-0 ml-2`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates across all content types
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.recentActivity && stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {activity.type === 'contact' && <Users className="h-4 w-4 text-primary" />}
                      {activity.type === 'demo_video' && <Video className="h-4 w-4 text-primary" />}
                      {activity.type === 'avatar' && <UserCircle className="h-4 w-4 text-primary" />}
                      {activity.type === 'voice_sample' && <Mic className="h-4 w-4 text-primary" />}
                      {activity.type === 'edited_video' && <Film className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Activity className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-2 text-sm font-semibold">No recent activity</h3>
                <p className="text-sm text-muted-foreground">
                  Activity will appear here as content is added or updated.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">View Contacts</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {stats?.totalContacts || 0} total
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4" />
                  <span className="text-sm font-medium">Manage Videos</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {(stats?.totalDemoVideos || 0) + (stats?.totalEditedVideos || 0)} total
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">AI Avatars</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {stats?.totalAvatars || 0} total
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-2">
                  <Mic className="h-4 w-4" />
                  <span className="text-sm font-medium">Voice Library</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {stats?.totalVoiceSamples || 0} total
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}