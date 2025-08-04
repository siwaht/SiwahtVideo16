import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertEditedVideoSchema } from "@shared/schema";
import { z } from "zod";
import { 
  Film, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Play,
  Calendar,
  Tag,
  User
} from "lucide-react";

type EditedVideoFormData = z.infer<typeof insertEditedVideoSchema>;

interface EditedVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  clientName?: string;
  category: string;
  tags?: string;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminEditedVideos() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingVideo, setEditingVideo] = useState<EditedVideo | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EditedVideoFormData>({
    resolver: zodResolver(insertEditedVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      clientName: "",
      category: "advertisement",
      tags: "",
      isPublished: false,
      orderIndex: 0,
    },
  });

  const { data: videos, isLoading, error } = useQuery<EditedVideo[]>({
    queryKey: ["/api/admin/edited-videos"],
  });

  const createVideoMutation = useMutation({
    mutationFn: async (data: EditedVideoFormData) => {
      const response = await apiRequest("/api/admin/edited-videos", "POST", data);
      if (!response.ok) {
        throw new Error("Failed to create edited video");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/edited-videos"] });
      form.reset();
      setIsCreating(false);
      toast({
        title: "Video created",
        description: "Edited video has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create edited video",
        variant: "destructive",
      });
    },
  });

  const updateVideoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<EditedVideoFormData> }) => {
      const response = await apiRequest(`/api/admin/edited-videos/${id}`, "PATCH", data);
      if (!response.ok) {
        throw new Error("Failed to update edited video");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/edited-videos"] });
      setEditingVideo(null);
      form.reset();
      toast({
        title: "Video updated",
        description: "Edited video has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update edited video",
        variant: "destructive",
      });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest(`/api/admin/edited-videos/${id}`, "DELETE");
      if (!response.ok) {
        throw new Error("Failed to delete edited video");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/edited-videos"] });
      toast({
        title: "Video deleted",
        description: "Edited video has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete edited video",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EditedVideoFormData) => {
    if (editingVideo) {
      updateVideoMutation.mutate({ id: editingVideo.id, data });
    } else {
      createVideoMutation.mutate(data);
    }
  };

  const startEditing = (video: EditedVideo) => {
    setEditingVideo(video);
    form.reset({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || "",
      clientName: video.clientName || "",
      category: video.category,
      tags: video.tags || "",
      isPublished: video.isPublished,
      orderIndex: video.orderIndex,
    });
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setEditingVideo(null);
    setIsCreating(false);
    form.reset();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'advertisement':
        return 'bg-blue-100 text-blue-800';
      case 'educational':
        return 'bg-green-100 text-green-800';
      case 'entertainment':
        return 'bg-purple-100 text-purple-800';
      case 'corporate':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    'advertisement',
    'educational',
    'entertainment',
    'corporate',
    'social',
    'other'
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full rounded mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Error Loading Videos</CardTitle>
            <CardDescription className="text-center">
              Unable to load edited videos. Please try refreshing the page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edited Videos</h1>
          <p className="text-muted-foreground">
            Manage portfolio of professionally edited video content.
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Add Video
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingVideo ? "Edit Portfolio Video" : "Add New Portfolio Video"}
            </CardTitle>
            <CardDescription>
              {editingVideo 
                ? "Update the video details below."
                : "Add a new professionally edited video to your portfolio."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Video title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="orderIndex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Index</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Video description and project details" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://youtube.com/watch?v=..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail URL (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/thumbnail.jpg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Client or company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., motion graphics, 3D animation, commercial" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Published</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Make this video visible in your portfolio
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createVideoMutation.isPending || updateVideoMutation.isPending}
                  >
                    {editingVideo ? "Update Video" : "Create Video"}
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelEditing}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Videos Grid */}
      {videos && videos.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((video) => (
            <Card key={video.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {video.description}
                    </CardDescription>
                  </div>
                  <Badge variant={video.isPublished ? "default" : "secondary"}>
                    {video.isPublished ? (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" />
                        Draft
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Video Preview */}
                <div className="relative mb-4">
                  {video.thumbnailUrl ? (
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-40 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted rounded flex items-center justify-center">
                      <Film className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(video.videoUrl, '_blank')}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </div>

                {/* Video Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getCategoryColor(video.category)}>
                      {video.category}
                    </Badge>
                    {video.clientName && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        {video.clientName}
                      </div>
                    )}
                  </div>
                  
                  {video.tags && (
                    <div className="flex items-start gap-1 text-xs text-muted-foreground">
                      <Tag className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{video.tags}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Order: {video.orderIndex}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(video)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this video?")) {
                          deleteVideoMutation.mutate(video.id);
                        }
                      }}
                      disabled={deleteVideoMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Film className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-sm font-semibold">No portfolio videos yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first professionally edited video to showcase your work.
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Video
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}