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
import { insertPodcastSampleSchema } from "@shared/schema";
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

type PodcastSampleFormData = z.infer<typeof insertPodcastSampleSchema>;

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
    resolver: zodResolver(insertPodcastSampleSchema),
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
      apiRequest("/api/admin/podcast-samples", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/podcast-samples"] });
      queryClient.invalidateQueries({ queryKey: ["/api/samples/podcast-samples"] });
      form.reset();
      setIsCreating(false);
      toast({
        title: "Success",
        description: "Podcast sample created successfully!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PodcastSampleFormData> }) =>
      apiRequest(`/api/admin/podcast-samples/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/podcast-samples"] });
      queryClient.invalidateQueries({ queryKey: ["/api/samples/podcast-samples"] });
      setEditingSample(null);
      form.reset();
      toast({
        title: "Success",
        description: "Podcast sample updated successfully!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/admin/podcast-samples/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/podcast-samples"] });
      queryClient.invalidateQueries({ queryKey: ["/api/samples/podcast-samples"] });
      toast({
        title: "Success",
        description: "Podcast sample deleted successfully!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      apiRequest(`/api/admin/podcast-samples/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isPublished }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/podcast-samples"] });
      queryClient.invalidateQueries({ queryKey: ["/api/samples/podcast-samples"] });
      toast({
        title: "Success",
        description: "Podcast sample visibility updated!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
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

  const sampleData = podcastSamples?.data || [];

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
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{sample.category}</Badge>
                        {sample.duration && (
                          <Badge variant="outline">{sample.duration}</Badge>
                        )}
                        {sample.hostName && (
                          <Badge variant="outline">Host: {sample.hostName}</Badge>
                        )}
                        {sample.guestName && (
                          <Badge variant="outline">Guest: {sample.guestName}</Badge>
                        )}
                      </div>
                      
                      {sample.audioUrl && (
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-slate-700 mb-2">Audio Preview:</p>
                          {sample.audioUrl.includes('soundcloud.com') ? (
                            <iframe
                              width="100%"
                              height="120"
                              scrolling="no"
                              frameBorder="no"
                              allow="autoplay"
                              src={sample.audioUrl.includes('/embed/') 
                                ? sample.audioUrl 
                                : `https://w.soundcloud.com/player/?url=${encodeURIComponent(sample.audioUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
                              }
                              className="rounded-lg w-full min-h-[120px]"
                              title={sample.title}
                            />
                          ) : sample.audioUrl.includes('spotify.com') ? (
                            <iframe
                              src={sample.audioUrl.includes('/embed/') 
                                ? sample.audioUrl 
                                : sample.audioUrl.replace('spotify.com/track/', 'open.spotify.com/embed/track/')
                              }
                              width="100%"
                              height="120"
                              frameBorder="0"
                              allowTransparency={true}
                              allow="encrypted-media"
                              className="rounded-lg w-full min-h-[120px]"
                              title={sample.title}
                            />
                          ) : sample.audioUrl.includes('youtube.com') || sample.audioUrl.includes('youtu.be') ? (
                            <iframe
                              width="100%"
                              height="120"
                              src={sample.audioUrl
                                .replace('youtu.be/', 'youtube.com/embed/')
                                .replace('youtube.com/watch?v=', 'youtube.com/embed/')
                              }
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full min-h-[120px]"
                              title={sample.title}
                            />
                          ) : sample.audioUrl.includes('.mp3') || sample.audioUrl.includes('.wav') || sample.audioUrl.includes('.m4a') || sample.audioUrl.includes('.ogg') ? (
                            <audio controls className="w-full h-10 rounded-lg bg-slate-50 border border-slate-200">
                              <source src={sample.audioUrl} type="audio/mpeg" />
                              <source src={sample.audioUrl} type="audio/wav" />
                              <source src={sample.audioUrl} type="audio/mp4" />
                              <source src={sample.audioUrl} type="audio/ogg" />
                              Your browser does not support the audio element.
                            </audio>
                          ) : (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                              <p className="text-sm text-orange-700 mb-2">External Audio Link</p>
                              <a 
                                href={sample.audioUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-orange-600 hover:text-orange-800 underline text-sm font-medium inline-flex items-center gap-1"
                              >
                                🎙️ Listen on External Platform
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(sample.createdAt).toLocaleDateString()}
                        </span>
                        <span>Order: {sample.orderIndex}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Radio className="h-12 w-12 text-pink-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No podcast samples yet</h3>
                <p className="text-slate-600 text-center mb-4">
                  Create your first podcast sample to showcase your audio content
                </p>
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add First Podcast Sample
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Create/Edit Form */}
          {isCreating && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-pink-600" />
                  {editingSample ? "Edit Podcast Sample" : "Create New Podcast Sample"}
                </CardTitle>
                <CardDescription>
                  {editingSample 
                    ? "Update the podcast sample information below"
                    : "Add a new podcast episode or audio sample to showcase in the Podcast Production section"
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
                              <Input placeholder="Podcast episode title" {...field} />
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
                              placeholder="Episode description and key topics covered" 
                              className="min-h-[100px]"
                              {...field} 
                            />
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
                          <FormLabel>Audio URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://soundcloud.com/user/episode or https://example.com/podcast.mp3" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Supports SoundCloud, Spotify, YouTube, or direct audio file URLs (.mp3, .wav, .m4a, .ogg)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="interview">Interview</option>
                                <option value="solo">Solo</option>
                                <option value="panel">Panel</option>
                                <option value="storytelling">Storytelling</option>
                                <option value="educational">Educational</option>
                                <option value="news">News</option>
                                <option value="comedy">Comedy</option>
                                <option value="business">Business</option>
                              </select>
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
                              <Input placeholder="45 min" {...field} />
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
                              <Input placeholder="Host name" {...field} />
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
                              <Input placeholder="Guest name (optional)" {...field} />
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
                            <FormDescription>
                              Make this podcast sample visible on the website
                            </FormDescription>
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

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        data-testid="button-save-podcast"
                      >
                        {createMutation.isPending || updateMutation.isPending 
                          ? "Saving..." 
                          : editingSample 
                            ? "Update Sample" 
                            : "Create Sample"
                        }
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