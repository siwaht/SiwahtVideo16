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
import { insertAvatarSchema } from "@shared/schema";
import { z } from "zod";
import { 
  UserCircle, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  User,
  Calendar
} from "lucide-react";

type AvatarFormData = z.infer<typeof insertAvatarSchema>;

interface Avatar {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  gender: 'male' | 'female' | 'other';
  ethnicity?: string;
  ageRange?: string;
  voicePreview?: string;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminAvatars() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState<Avatar | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<AvatarFormData>({
    resolver: zodResolver(insertAvatarSchema),
    defaultValues: {
      name: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      gender: "other",
      ethnicity: "",
      ageRange: "",
      voicePreview: "",
      isPublished: false,
    },
  });

  const { data: avatars, isLoading, error } = useQuery<Avatar[]>({
    queryKey: ["/api/admin/avatars"],
  });

  const createAvatarMutation = useMutation({
    mutationFn: async (data: AvatarFormData) => {
      const response = await apiRequest("/api/admin/avatars", "POST", data);
      if (!response.ok) {
        throw new Error("Failed to create avatar");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/avatars"] });
      form.reset();
      setIsCreating(false);
      toast({
        title: "Avatar created",
        description: "AI avatar has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create avatar",
        variant: "destructive",
      });
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AvatarFormData> }) => {
      const response = await apiRequest(`/api/admin/avatars/${id}`, "PATCH", data);
      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/avatars"] });
      setEditingAvatar(null);
      form.reset();
      toast({
        title: "Avatar updated",
        description: "AI avatar has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update avatar",
        variant: "destructive",
      });
    },
  });

  const deleteAvatarMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest(`/api/admin/avatars/${id}`, "DELETE");
      if (!response.ok) {
        throw new Error("Failed to delete avatar");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/avatars"] });
      toast({
        title: "Avatar deleted",
        description: "AI avatar has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete avatar",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AvatarFormData) => {
    if (editingAvatar) {
      updateAvatarMutation.mutate({ id: editingAvatar.id, data });
    } else {
      createAvatarMutation.mutate(data);
    }
  };

  const startEditing = (avatar: Avatar) => {
    setEditingAvatar(avatar);
    form.reset({
      name: avatar.name,
      description: avatar.description,
      videoUrl: avatar.videoUrl || "",
      thumbnailUrl: avatar.thumbnailUrl || "",
      gender: avatar.gender,
      ethnicity: avatar.ethnicity || "",
      ageRange: avatar.ageRange || "",
      voicePreview: avatar.voicePreview || "",
      isPublished: avatar.isPublished,
    });
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setEditingAvatar(null);
    setIsCreating(false);
    form.reset();
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'bg-blue-100 text-blue-800';
      case 'female':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
                <Skeleton className="h-48 w-full rounded mb-4" />
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
            <CardTitle className="text-center text-destructive">Error Loading Avatars</CardTitle>
            <CardDescription className="text-center">
              Unable to load AI avatars. Please try refreshing the page.
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
          <h1 className="text-3xl font-bold tracking-tight">AI Avatars</h1>
          <p className="text-muted-foreground">
            Manage AI-generated avatars for video content creation.
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Add Avatar
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingAvatar ? "Edit AI Avatar" : "Add New AI Avatar"}
            </CardTitle>
            <CardDescription>
              {editingAvatar 
                ? "Update the avatar details below."
                : "Create a new AI avatar for video content creation."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Avatar name" {...field} />
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
                          placeholder="Avatar description and characteristics" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ethnicity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ethnicity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Asian, Caucasian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ageRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Range</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 25-35" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://youtu.be/example or https://example.com/avatar-demo.mp4" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          YouTube video or direct video file URL for avatar demo
                        </FormDescription>
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
                            placeholder="https://example.com/avatar-thumbnail.jpg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Optional thumbnail image to show before video loads
                        </FormDescription>
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
                          Make this avatar visible to website visitors
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
                    disabled={createAvatarMutation.isPending || updateAvatarMutation.isPending}
                  >
                    {editingAvatar ? "Update Avatar" : "Create Avatar"}
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

      {/* Avatars Grid */}
      {avatars && avatars.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {avatars
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((avatar) => (
            <Card key={avatar.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{avatar.name}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {avatar.description}
                    </CardDescription>
                  </div>
                  <Badge variant={avatar.isPublished ? "default" : "secondary"}>
                    {avatar.isPublished ? (
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
                {/* Avatar Video Preview */}
                <div className="relative mb-4">
                  {avatar.videoUrl && avatar.videoUrl.includes('youtu') ? (
                    <iframe
                      src={avatar.videoUrl
                        .replace('youtu.be/', 'youtube.com/embed/')
                        .replace('youtube.com/watch?v=', 'youtube.com/embed/')
                      }
                      className="w-full h-48 rounded border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={avatar.name}
                    />
                  ) : avatar.videoUrl ? (
                    <video 
                      src={avatar.videoUrl} 
                      poster={avatar.thumbnailUrl || undefined}
                      className="w-full h-48 object-cover rounded"
                      controls
                      muted
                      preload="metadata"
                    />
                  ) : avatar.thumbnailUrl ? (
                    <img 
                      src={avatar.thumbnailUrl} 
                      alt={avatar.name}
                      className="w-full h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded flex items-center justify-center">
                      <UserCircle className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  {avatar.videoUrl && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      🎬 Video Demo
                    </div>
                  )}
                </div>

                {/* Avatar Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge className={getGenderColor(avatar.gender)}>
                      {avatar.gender}
                    </Badge>
                    {avatar.ethnicity && (
                      <span className="text-sm text-muted-foreground">
                        {avatar.ethnicity}
                      </span>
                    )}
                    {avatar.ageRange && (
                      <span className="text-sm text-muted-foreground">
                        Age: {avatar.ageRange}
                      </span>
                    )}
                  </div>
                  
                  {avatar.videoUrl && (
                    <div className="text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        🎬 Video URL: 
                        <a 
                          href={avatar.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline max-w-32 truncate"
                        >
                          {avatar.videoUrl}
                        </a>
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Order: {avatar.orderIndex}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(avatar)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this avatar?")) {
                          deleteAvatarMutation.mutate(avatar.id);
                        }
                      }}
                      disabled={deleteAvatarMutation.isPending}
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
            <UserCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-sm font-semibold">No avatars yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first AI avatar for video content creation.
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Avatar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}