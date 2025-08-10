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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { VideoUploader } from "./VideoUploader";

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
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
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

  const { data: videoResponse, isLoading, error } = useQuery<{success: boolean, data: DemoVideo[]}>({
    queryKey: ["/api/admin/demo-videos"],
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: true,
  });

  // Extract videos from response
  const videos: DemoVideo[] = videoResponse?.data || [];

  // Debug logging
  console.log("Videos query state:", { 
    videos: videos?.length || 0, 
    isLoading, 
    error: error?.message,
    rawResponse: videoResponse,
    extractedVideos: videos
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
      queryClient.invalidateQueries({ queryKey: ["/api/samples/demo-videos"] });
      setEditingVideo(null);
      setIsCreating(false);
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

  // Handle video file selection
  const handleVideoSelected = (file: File) => {
    setSelectedVideoFile(file);
    
    // Auto-populate the form with video file details
    const fileName = file.name;
    const videoUrl = URL.createObjectURL(file);
    
    form.reset({
      title: fileName.replace(/\.[^/.]+$/, '') || 'Uploaded Video', // Remove file extension
      description: `Video uploaded on ${new Date().toLocaleDateString()}`,
      category: 'uploaded',
      videoUrl: videoUrl,
      thumbnailUrl: '',
      isPublished: false,
      isHostedVideo: true, // Mark as hosted video
    });

    toast({
      title: "Video Selected",
      description: "Video file selected successfully! Please fill in the details and save.",
    });
  };

  const handleClearVideo = () => {
    setSelectedVideoFile(null);
    // Optionally clear the form
  };

  const onSubmit = (data: DemoVideoFormData) => {
    console.log("Form submitted with data:", data);
    console.log("Form errors:", form.formState.errors);
    
    // Validate required fields
    if (!data.title?.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!data.category?.trim()) {
      toast({
        title: "Validation Error", 
        description: "Category is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!data.videoUrl?.trim()) {
      toast({
        title: "Validation Error",
        description: "Video URL is required",
        variant: "destructive",
      });
      return;
    }

    if (editingVideo) {
      updateVideoMutation.mutate({ id: editingVideo.id, data });
    } else {
      createVideoMutation.mutate(data);
    }
  };

  const startEditing = (video: DemoVideo) => {
    console.log("Starting edit for video:", video);
    setEditingVideo(video);
    setIsCreating(true);
    form.reset({
      title: video.title,
      description: video.description || "",
      category: video.category || "",
      videoUrl: video.videoUrl || "",
      thumbnailUrl: video.thumbnailUrl || "",
      isPublished: video.isPublished,
    });
    console.log("Edit form should now be visible. isCreating:", true, "editingVideo:", video.id);
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Error Loading Videos</CardTitle>
            <CardDescription className="text-center">
              Unable to load demo videos. Error: {errorMessage}
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
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setIsCreating(true);
              setEditingVideo(null);
              form.reset();
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
            <Plus className="h-4 w-4 mr-2" />
            Add Video URL
          </Button>
        </div>
      </div>

      {/* Create/Edit Form - ALWAYS VISIBLE WHEN isCreating IS TRUE */}
      {isCreating ? (
        <Card className="mb-6 border-4 border-blue-500 bg-blue-50 shadow-lg">
          <CardHeader className="bg-blue-100">
            <CardTitle className="text-blue-900 text-xl">
              🎬 {editingVideo ? `EDITING: ${editingVideo.title}` : "ADD NEW VIDEO"}
            </CardTitle>
            <CardDescription className="text-blue-700 font-medium">
              {editingVideo 
                ? `Updating video ID: ${editingVideo.id}`
                : "Create a new demo video to showcase Siwaht capabilities."
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

                {/* Video Upload Section */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Video Upload</label>
                    <VideoUploader
                      onVideoSelected={handleVideoSelected}
                      onClear={handleClearVideo}
                      className="mt-2"
                    />
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    OR
                  </div>

                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://youtube.com/... or video URL"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Supported: YouTube, Vimeo, Google Drive, direct video files (.mp4, .webm, .ogg)
                          <br />
                          Examples: https://youtu.be/ABC • https://vimeo.com/123 • https://drive.google.com/file/d/ID/view
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
      ) : null}

      {/* Debug Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
        <p className="text-sm text-blue-800">
          <strong>Debug Info:</strong> Loading: {isLoading ? "Yes" : "No"} | 
          Videos found: {videos?.length || 0} | 
          Error: {error ? (error as any).message || "Unknown error" : "None"} |
          <br />
          <strong>Form State:</strong> isCreating: {isCreating ? "Yes" : "No"} | 
          editingVideo: {editingVideo ? editingVideo.id : "None"}
        </p>
      </div>

      {/* Videos Grid */}
      {videos && videos.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
            <p className="text-sm text-green-800">
              <strong>{videos.length} videos found</strong> - Click the blue "Edit Video" or red "Delete" buttons below each video to manage them.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos
              .sort((a: DemoVideo, b: DemoVideo) => a.orderIndex - b.orderIndex)
              .map((video: DemoVideo) => (
              <Card key={video.id} className="border-2 hover:border-blue-200 transition-colors">
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

                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Order: {video.orderIndex} | Category: {video.category}
                  </div>
                  
                  {/* Action Buttons - Large and Clear */}
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        console.log("Edit button clicked for video:", video.id, video.title);
                        startEditing(video);
                      }}
                      className="flex-1 gap-2 bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-700 font-medium py-3"
                    >
                      <Edit className="h-5 w-5" />
                      Edit Video
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        console.log("Delete button clicked for video:", video.id, video.title);
                        if (confirm(`Are you sure you want to delete "${video.title}"? This action cannot be undone.`)) {
                          deleteVideoMutation.mutate(video.id);
                        }
                      }}
                      disabled={deleteVideoMutation.isPending}
                      className="flex-1 gap-2 bg-red-50 hover:bg-red-100 border-red-300 text-red-700 font-medium py-3"
                    >
                      <Trash2 className="h-5 w-5" />
                      {deleteVideoMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
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