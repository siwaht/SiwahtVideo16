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
import { insertDemoVideoSchema } from "@shared/schema";
import { z } from "zod";
import { 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Play,
  Calendar,
  Upload,
  Save,
  X
} from "lucide-react";
import { ObjectUploader } from "@/components/ObjectUploader";

type DemoVideoFormData = z.infer<typeof insertDemoVideoSchema>;

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  thumbnailUrl?: string;
  isHostedVideo?: boolean;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDemoVideos() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingVideo, setEditingVideo] = useState<DemoVideo | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<DemoVideoFormData>({
    resolver: zodResolver(insertDemoVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      videoUrl: "",
      thumbnailUrl: "",
      isPublished: false,
    },
  });

  const { data: videos, isLoading, error } = useQuery<DemoVideo[]>({
    queryKey: ["/api/admin/demo-videos"],
  });

  const createVideoMutation = useMutation({
    mutationFn: async (data: DemoVideoFormData) => {
      const response = await apiRequest("/api/admin/demo-videos", "POST", data);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create demo video: ${errorText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/demo-videos"] });
      form.reset();
      setIsCreating(false);
      toast({
        title: "Video created",
        description: "Demo video has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create demo video",
        variant: "destructive",
      });
    },
  });

  const updateVideoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DemoVideoFormData> }) => {
      const response = await apiRequest(`/api/admin/demo-videos/${id}`, "PATCH", data);
      if (!response.ok) {
        throw new Error("Failed to update demo video");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/demo-videos"] });
      setEditingVideo(null);
      form.reset();
      toast({
        title: "Video updated",
        description: "Demo video has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update demo video",
        variant: "destructive",
      });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest(`/api/admin/demo-videos/${id}`, "DELETE");
      if (!response.ok) {
        throw new Error("Failed to delete demo video");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/demo-videos"] });
      toast({
        title: "Video deleted",
        description: "Demo video has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete demo video",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DemoVideoFormData) => {
    if (editingVideo) {
      updateVideoMutation.mutate({ id: editingVideo.id, data });
    } else {
      createVideoMutation.mutate(data);
    }
  };

  const startEditing = (video: DemoVideo) => {
    setEditingVideo(video);
    form.reset({
      title: video.title,
      description: video.description,
      category: video.category || "",
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || "",
      isPublished: video.isPublished,
    });
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setEditingVideo(null);
    setIsCreating(false);
    form.reset();
  };

  // Video upload handlers
  const handleVideoUpload = async () => {
    try {
      const response = await apiRequest("/api/objects/upload", "POST");
      if (!response.ok) throw new Error("Failed to get upload URL");
      const { uploadURL } = await response.json();
      return { method: "PUT" as const, url: uploadURL };
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to initialize video upload",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleVideoUploadComplete = async (result: any) => {
    if (result.successful && result.successful.length > 0) {
      const uploadedFile = result.successful[0];
      const videoUrl = uploadedFile.uploadURL;
      
      // Update form with uploaded video URL and mark as hosted
      form.setValue("videoUrl", videoUrl);
      form.setValue("isHostedVideo", true);
      
      toast({
        title: "Video Uploaded",
        description: "Video uploaded successfully. Complete the form to save.",
      });
      
      setUploadingVideo(false);
    }
  };

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
              Unable to load demo videos. Please try refreshing the page.
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
          <h1 className="text-3xl font-bold tracking-tight">Demo Videos</h1>
          <p className="text-muted-foreground">
            Manage showcase videos that demonstrate SiwahtAI capabilities.
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
              {editingVideo ? "Edit Demo Video" : "Add New Demo Video"}
            </CardTitle>
            <CardDescription>
              {editingVideo 
                ? "Update the demo video details below."
                : "Create a new demo video to showcase SiwahtAI capabilities."
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., product-demo, testimonial" {...field} />
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
                          placeholder="Video description" 
                          className="min-h-[100px]"
                          {...field}
                          value={field.value || ""}
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
                        <div className="space-y-2">
                          <FormControl>
                            <Input 
                              placeholder="https://youtube.com/watch?v=... or upload video below" 
                              {...field} 
                            />
                          </FormControl>
                          <div className="flex gap-2">
                            <ObjectUploader
                              maxNumberOfFiles={1}
                              maxFileSize={104857600} // 100MB
                              allowedFileTypes={['video/*']}
                              onGetUploadParameters={handleVideoUpload}
                              onComplete={handleVideoUploadComplete}
                              buttonClassName="w-full"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Video
                            </ObjectUploader>
                          </div>
                        </div>
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
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Published</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Make this video visible to website visitors
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
                    {createVideoMutation.isPending || updateVideoMutation.isPending 
                      ? "Saving..." 
                      : editingVideo ? "Update Video" : "Create Video"
                    }
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
                      <Video className="h-12 w-12 text-muted-foreground" />
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
            <Video className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-sm font-semibold">No demo videos yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first demo video to showcase SiwahtAI capabilities.
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