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
import { insertVoiceSampleSchema } from "@shared/schema";
import { z } from "zod";
import { 
  Mic, 
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

type VoiceSampleFormData = z.infer<typeof insertVoiceSampleSchema>;

interface VoiceSample {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
  language: string;
  gender: 'male' | 'female' | 'other';
  accent?: string;
  ageRange?: string;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminVoiceSamples() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingSample, setEditingSample] = useState<VoiceSample | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<VoiceSampleFormData>({
    resolver: zodResolver(insertVoiceSampleSchema),
    defaultValues: {
      name: "",
      description: "",
      audioUrl: "",
      language: "English",
      gender: "other",
      accent: "",
      ageRange: "",
      isPublished: false,
      orderIndex: 0,
    },
  });

  const { data: samples, isLoading, error } = useQuery<VoiceSample[]>({
    queryKey: ["/api/admin/voice-samples"],
  });

  const createSampleMutation = useMutation({
    mutationFn: async (data: VoiceSampleFormData) => {
      const response = await apiRequest("POST", "/api/admin/voice-samples", data);
      if (!response.ok) {
        throw new Error("Failed to create voice sample");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/voice-samples"] });
      form.reset();
      setIsCreating(false);
      toast({
        title: "Voice sample created",
        description: "Voice sample has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create voice sample",
        variant: "destructive",
      });
    },
  });

  const updateSampleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<VoiceSampleFormData> }) => {
      const response = await apiRequest("PATCH", `/api/admin/voice-samples/${id}`, data);
      if (!response.ok) {
        throw new Error("Failed to update voice sample");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/voice-samples"] });
      setEditingSample(null);
      form.reset();
      toast({
        title: "Voice sample updated",
        description: "Voice sample has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update voice sample",
        variant: "destructive",
      });
    },
  });

  const deleteSampleMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/voice-samples/${id}`);
      if (!response.ok) {
        throw new Error("Failed to delete voice sample");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/voice-samples"] });
      toast({
        title: "Voice sample deleted",
        description: "Voice sample has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete voice sample",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: VoiceSampleFormData) => {
    if (editingSample) {
      updateSampleMutation.mutate({ id: editingSample.id, data });
    } else {
      createSampleMutation.mutate(data);
    }
  };

  const startEditing = (sample: VoiceSample) => {
    setEditingSample(sample);
    form.reset({
      name: sample.name,
      description: sample.description,
      audioUrl: sample.audioUrl,
      language: sample.language,
      gender: sample.gender,
      accent: sample.accent || "",
      ageRange: sample.ageRange || "",
      isPublished: sample.isPublished,
      orderIndex: sample.orderIndex,
    });
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setEditingSample(null);
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

  const toggleAudioPlay = (audioUrl: string, sampleId: string) => {
    if (playingAudio === sampleId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(sampleId);
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
                <Skeleton className="h-16 w-full rounded mb-4" />
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
            <CardTitle className="text-center text-destructive">Error Loading Voice Samples</CardTitle>
            <CardDescription className="text-center">
              Unable to load voice samples. Please try refreshing the page.
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
          <h1 className="text-3xl font-bold tracking-tight">Voice Samples</h1>
          <p className="text-muted-foreground">
            Manage AI voice samples for audio content creation.
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Add Voice Sample
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSample ? "Edit Voice Sample" : "Add New Voice Sample"}
            </CardTitle>
            <CardDescription>
              {editingSample 
                ? "Update the voice sample details below."
                : "Create a new voice sample for audio content creation."
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
                          <Input placeholder="Voice sample name" {...field} />
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
                          placeholder="Voice sample description and characteristics" 
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
                          placeholder="https://soundcloud.com/user/track or https://example.com/audio.mp3" 
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
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Input placeholder="English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                    name="accent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accent</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., American, British" {...field} />
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

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Published</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Make this voice sample visible to website visitors
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
                    disabled={createSampleMutation.isPending || updateSampleMutation.isPending}
                  >
                    {editingSample ? "Update Voice Sample" : "Create Voice Sample"}
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

      {/* Voice Samples Grid */}
      {samples && samples.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {samples
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((sample) => (
            <Card key={sample.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{sample.name}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {sample.description}
                    </CardDescription>
                  </div>
                  <Badge variant={sample.isPublished ? "default" : "secondary"}>
                    {sample.isPublished ? (
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
                {/* Audio Player */}
                <div className="mb-4">
                  <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => toggleAudioPlay(sample.audioUrl, sample.id)}
                      className="mr-3"
                    >
                      {playingAudio === sample.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <audio 
                        controls 
                        className="w-full h-8"
                        onPlay={() => setPlayingAudio(sample.id)}
                        onPause={() => setPlayingAudio(null)}
                        onEnded={() => setPlayingAudio(null)}
                      >
                        <source src={sample.audioUrl} type="audio/mpeg" />
                        Your browser does not support audio playback.
                      </audio>
                    </div>
                  </div>
                </div>

                {/* Sample Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getGenderColor(sample.gender)}>
                      {sample.gender}
                    </Badge>
                    <Badge variant="outline">
                      {sample.language}
                    </Badge>
                    {sample.accent && (
                      <Badge variant="outline">
                        {sample.accent}
                      </Badge>
                    )}
                    {sample.ageRange && (
                      <Badge variant="outline">
                        Age: {sample.ageRange}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Order: {sample.orderIndex}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(sample)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this voice sample?")) {
                          deleteSampleMutation.mutate(sample.id);
                        }
                      }}
                      disabled={deleteSampleMutation.isPending}
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
            <Mic className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-sm font-semibold">No voice samples yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first voice sample for audio content creation.
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Voice Sample
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}