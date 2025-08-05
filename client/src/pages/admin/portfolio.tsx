import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, Eye, EyeOff, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { DemoVideo, Avatar, VoiceSample, EditedVideo } from "@shared/schema";
import { ObjectUploader } from "@/components/ObjectUploader";
import type { UploadResult } from "@uppy/core";

type SampleCategory = 'demo-videos' | 'avatars' | 'voice-samples' | 'edited-videos';
type SampleItem = DemoVideo | Avatar | VoiceSample | EditedVideo;

const demoVideoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  videoUrl: z.string().url("Must be a valid URL"),
  thumbnailUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isPublished: z.boolean(),
});

const avatarSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  videoUrl: z.string().url("Must be a valid URL"),
  thumbnailUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  gender: z.string().min(1, "Gender is required"),
  ethnicity: z.string().optional(),
  ageRange: z.string().optional(),
  voicePreview: z.string().optional(),
  isPublished: z.boolean(),
});

const voiceSampleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  audioUrl: z.string().url("Must be a valid URL"),
  language: z.string().min(1, "Language is required"),
  gender: z.string().min(1, "Gender is required"),
  accent: z.string().optional(),
  ageRange: z.string().optional(),
  isPublished: z.boolean(),
});

const editedVideoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  videoUrl: z.string().url("Must be a valid URL"),
  thumbnailUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  clientName: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  isPublished: z.boolean(),
});

export default function AdminPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<SampleCategory>('demo-videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<SampleItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get the appropriate schema based on category
  const getSchema = () => {
    switch (selectedCategory) {
      case 'demo-videos': return demoVideoSchema;
      case 'avatars': return avatarSchema;
      case 'voice-samples': return voiceSampleSchema;
      case 'edited-videos': return editedVideoSchema;
      default: return demoVideoSchema;
    }
  };

  const form = useForm<any>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      title: '',
      name: '',
      description: '',
      category: '',
      videoUrl: '',
      thumbnailUrl: '',
      audioUrl: '',
      imageUrl: '',
      gender: '',
      language: '',
      ethnicity: '',
      ageRange: '',
      accent: '',
      clientName: '',
      tags: '',
      voicePreview: '',
      isPublished: false,
    },
  });

  // Reset form when category changes
  useEffect(() => {
    const defaultValues = {
      title: '',
      name: '',
      description: '',
      category: '',
      videoUrl: '',
      thumbnailUrl: '',
      audioUrl: '',
      imageUrl: '',
      gender: '',
      language: '',
      ethnicity: '',
      ageRange: '',
      accent: '',
      clientName: '',
      tags: '',
      voicePreview: '',
      isPublished: false,
    };
    form.reset(defaultValues);
    setEditingItem(null);
  }, [selectedCategory, form]);

  // Fetch samples based on category
  const { data: samples = [], isLoading } = useQuery({
    queryKey: [`/api/admin/${selectedCategory}`, searchQuery],
    queryFn: async () => {
      const response = await apiRequest(`/api/admin/${selectedCategory}${searchQuery ? `?search=${searchQuery}` : ''}`, 'GET');
      const data = await response.json();
      return data.data || [];
    },
  });

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const url = editingItem 
        ? `/api/admin/${selectedCategory}/${editingItem.id}`
        : `/api/admin/${selectedCategory}`;
      const method = editingItem ? 'PUT' : 'POST';
      const response = await apiRequest(url, method, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${selectedCategory}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/samples/${selectedCategory}`] }); // Invalidate public API too
      setIsDialogOpen(false);
      setEditingItem(null);
      form.reset({});
      toast({
        title: editingItem ? "Sample updated" : "Sample created",
        description: "The sample has been saved successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save sample",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest(`/api/admin/${selectedCategory}/${id}`, 'DELETE');
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${selectedCategory}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/samples/${selectedCategory}`] });
      toast({
        title: "Sample deleted",
        description: "The sample has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete sample",
        variant: "destructive",
      });
    },
  });

  // Toggle published status
  const togglePublishedMutation = useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const response = await apiRequest(`/api/admin/${selectedCategory}/${id}`, 'PUT', { isPublished });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${selectedCategory}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/samples/${selectedCategory}`] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  const handleEdit = (item: SampleItem) => {
    setEditingItem(item);
    form.reset(item as any);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this sample?')) {
      deleteMutation.mutate(id);
    }
  };

  const renderFormFields = () => {
    switch (selectedCategory) {
      case 'demo-videos':
      case 'edited-videos':
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter video description" {...field} />
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
                    <Input placeholder="Enter category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input placeholder="https://... or upload video" {...field} />
                      {selectedCategory === 'demo-videos' && (
                        <ObjectUploader
                          maxNumberOfFiles={1}
                          maxFileSize={104857600} // 100MB
                          accept={['video/*', '.mp4', '.mov', '.avi', '.webm']}
                          onGetUploadParameters={async () => {
                            const response = await apiRequest('/api/objects/upload', 'POST');
                            return {
                              method: 'PUT' as const,
                              url: response.uploadURL,
                            };
                          }}
                          onComplete={(result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
                            if (result.successful && result.successful[0]) {
                              const uploadURL = result.successful[0].uploadURL;
                              if (uploadURL && typeof uploadURL === 'string') {
                                field.onChange(uploadURL);
                                toast({
                                  title: "Success",
                                  description: "Video uploaded successfully!",
                                });
                              }
                            }
                          }}
                          buttonClassName="whitespace-nowrap flex-shrink-0"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </ObjectUploader>
                      )}
                    </div>
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
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedCategory === 'edited-videos' && (
              <>
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tags (comma separated)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </>
        );
      
      case 'avatars':
        return (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter avatar name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter avatar description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
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
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Input placeholder="Enter ethnicity" {...field} />
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
                    <Input placeholder="e.g., 20-30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
        
      case 'voice-samples':
        return (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter voice sample name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter voice description" {...field} />
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
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., English" {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Input placeholder="e.g., American" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Portfolio Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { 
              setEditingItem(null); 
              const defaultValues = {
                title: '',
                name: '',
                description: '',
                category: '',
                videoUrl: '',
                thumbnailUrl: '',
                audioUrl: '',
                imageUrl: '',
                gender: '',
                language: '',
                ethnicity: '',
                ageRange: '',
                accent: '',
                clientName: '',
                tags: '',
                voicePreview: '',
                isPublished: false,
              };
              form.reset(defaultValues); 
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Sample
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Sample' : 'Add New Sample'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {renderFormFields()}
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Published</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Make this sample visible on the frontend
                        </div>
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
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedCategory} onValueChange={(value: SampleCategory) => setSelectedCategory(value)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="demo-videos">Demo Videos</SelectItem>
            <SelectItem value="avatars">Avatars</SelectItem>
            <SelectItem value="voice-samples">Voice Samples</SelectItem>
            <SelectItem value="edited-videos">Edited Videos</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search samples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((sample: any) => (
            <div key={sample.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold line-clamp-2">
                  {'title' in sample ? sample.title : sample.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => togglePublishedMutation.mutate({ 
                      id: sample.id, 
                      isPublished: !sample.isPublished 
                    })}
                    disabled={togglePublishedMutation.isPending}
                    data-testid={`toggle-published-${sample.id}`}
                  >
                    {sample.isPublished ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(sample)}
                    data-testid={`edit-sample-${sample.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(sample.id)}
                    data-testid={`delete-sample-${sample.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              
              {sample.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {sample.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-1 mb-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  sample.isPublished 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {sample.isPublished ? 'Published' : 'Draft'}
                </span>
                
                {selectedCategory === 'avatars' && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {(sample as Avatar).gender}
                  </span>
                )}
                
                {selectedCategory === 'voice-samples' && (
                  <>
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                      {(sample as VoiceSample).language}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-800">
                      {(sample as VoiceSample).gender}
                    </span>
                  </>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                Updated: {new Date(sample.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && samples.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No samples found. Create your first sample to get started!
          </p>
        </div>
      )}
    </div>
  );
}