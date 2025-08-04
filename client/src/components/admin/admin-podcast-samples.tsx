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
import { z } from "zod";
import { 
  Radio, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Play,
  Pause,
  Calendar,
  Volume2
} from "lucide-react";

const podcastSampleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  audioUrl: z.string().min(1, "Audio URL is required"),
  category: z.string().default("interview"),
  duration: z.string().optional(),
  hostName: z.string().optional(),
  guestName: z.string().optional(),
  isPublished: z.boolean().default(true),
  orderIndex: z.number().default(0),
});

type PodcastSampleFormData = z.infer<typeof podcastSampleFormSchema>;

interface PodcastSample {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  category: string;
  duration?: string;
  hostName?: string;
  guestName?: string;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPodcastSamples() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingSample, setEditingSample] = useState<PodcastSample | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PodcastSampleFormData>({
    resolver: zodResolver(podcastSampleFormSchema),
    defaultValues: {
      title: "",
      description: "",
      audioUrl: "",
      category: "interview",
      duration: "",
      hostName: "",
      guestName: "",
      isPublished: true,
      orderIndex: 0,
    },
  });

  const { data: podcastSamples, isLoading } = useQuery({
    queryKey: ["/api/admin/podcast-samples"],
  });

  const createMutation = useMutation({
    mutationFn: (data: PodcastSampleFormData) =>
      apiRequest("/api/admin/podcast-samples", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/podcast-samples"] });
      queryClient.invalidateQueries({ queryKey: ["/api/samples/podcast-samples"] });
      toast({
        title: "Success!",
        description: "Podcast sample created successfully.",
      });
      form.reset();
      setIsCreating(false);
      setEditingSample(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create podcast sample.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PodcastSampleFormData> }) =>
      apiRequest(`/api/admin/podcast-samples/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/podcast-samples"] });
      queryClient.invalidateQueries({ queryKey: ["/api/samples/podcast-samples"] });
      toast({
        title: "Success!",
        description: "Podcast sample updated successfully.",
      });
      form.reset();
      setIsCreating(false);
      setEditingSample(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update podcast sample.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/admin/podcast-samples/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/podcast-samples"] });
      queryClient.invalidateQueries({ queryKey: ["/api/samples/podcast-samples"] });
      toast({
        title: "Success!",
        description: "Podcast sample deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete podcast sample.",
        variant: "destructive",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      apiRequest(`/api/admin/podcast-samples/${id}`, "PUT", { isPublished }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/podcast-samples"] });
      queryClient.invalidateQueries({ queryKey: ["/api/samples/podcast-samples"] });
      toast({
        title: "Success!",
        description: "Podcast sample visibility updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update podcast sample.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PodcastSampleFormData) => {
    if (editingSample) {
      updateMutation.mutate({ id: editingSample.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const startEdit = (sample: PodcastSample) => {
    setEditingSample(sample);
    setIsCreating(true);
    form.reset({
      title: sample.title,
      description: sample.description,
      audioUrl: sample.audioUrl,
      category: sample.category,
      duration: sample.duration || "",
      hostName: sample.hostName || "",
      guestName: sample.guestName || "",
      isPublished: sample.isPublished,
      orderIndex: sample.orderIndex,
    });
  };

  const cancelEdit = () => {
    setEditingSample(null);
    setIsCreating(false);
    form.reset();
  };

  const sampleData = (podcastSamples as any)?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Radio className="h-6 w-6 text-pink-600" />
            Podcast Samples
          </h2>
          <p className="text-muted-foreground">
            Manage podcast episodes and audio content for the Podcast Production section
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          disabled={isCreating}
          className="gap-2"
          data-testid="button-create-podcast"
        >
          <Plus className="h-4 w-4" />
          Add Podcast Sample
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Sample List */}
          {sampleData.length > 0 ? (
            <div className="grid gap-4">
              {sampleData.map((sample: PodcastSample) => (
                <Card key={sample.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {sample.title}
                          <Badge variant={sample.isPublished ? "default" : "secondary"}>
                            {sample.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {sample.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePublishMutation.mutate({
                            id: sample.id,
                            isPublished: !sample.isPublished
                          })}
                          data-testid={`button-toggle-${sample.id}`}
                        >
                          {sample.isPublished ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(sample)}
                          data-testid={`button-edit-${sample.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMutation.mutate(sample.id)}
                          data-testid={`button-delete-${sample.id}`}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {sample.category}
                          </Badge>
                          {sample.duration && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{sample.duration}</span>
                            </div>
                          )}
                        </div>
                        
                        {(sample.hostName || sample.guestName) && (
                          <div className="space-y-1">
                            {sample.hostName && (
                              <div>Host: {sample.hostName}</div>
                            )}
                            {sample.guestName && (
                              <div>Guest: {sample.guestName}</div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {sample.audioUrl && (
                          <div className="bg-slate-50 p-2 rounded-lg">
                            {sample.audioUrl.includes('soundcloud.com') ? (
                              <div className="text-center text-xs text-slate-600">
                                SoundCloud embed available
                              </div>
                            ) : sample.audioUrl.includes('spotify.com') ? (
                              <div className="text-center text-xs text-slate-600">
                                Spotify embed available
                              </div>
                            ) : (
                              <div className="text-center text-xs text-slate-600">
                                Direct audio file
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Radio className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No podcast samples yet
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Create your first podcast sample to showcase your audio content.
                </p>
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add First Sample
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Create/Edit Form */}
          {isCreating && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingSample ? "Edit Podcast Sample" : "Add New Podcast Sample"}
                </CardTitle>
                <CardDescription>
                  {editingSample ? "Update the podcast sample details below." : "Fill in the details for your new podcast sample."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter podcast title" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="audioUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Audio URL *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="https://soundcloud.com/..." />
                              </FormControl>
                              <FormDescription>
                                Supports SoundCloud, Spotify, YouTube, or direct audio file URLs
                              </FormDescription>
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
                                <Input {...field} placeholder="interview, educational, news, etc." />
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
                              <FormLabel>Display Order</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  value={field.value || 0}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  placeholder="0" 
                                />
                              </FormControl>
                              <FormDescription>
                                Lower numbers appear first (0 = highest priority)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  placeholder="Describe this podcast episode..." 
                                  className="min-h-[120px]" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} placeholder="25:30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hostName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Host Name</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} placeholder="Host name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="guestName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Guest Name</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} placeholder="Guest name" />
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
                                <FormDescription>
                                  Make this podcast sample visible on the website
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                      >
                        {createMutation.isPending || updateMutation.isPending
                          ? "Saving..."
                          : editingSample
                          ? "Update Sample"
                          : "Create Sample"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={cancelEdit}
                        disabled={createMutation.isPending || updateMutation.isPending}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}