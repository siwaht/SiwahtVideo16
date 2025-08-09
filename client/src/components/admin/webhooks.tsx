import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Settings, Play, Trash2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import type { Webhook } from "@shared/schema";

const webhookFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Must be a valid URL"),
  method: z.string().default("POST"),
  events: z.array(z.string()).min(1, "At least one event is required"),
  headers: z.record(z.string()).optional(),
  secret: z.string().optional(),
  isActive: z.boolean().default(true),
  retryCount: z.number().min(0).max(10).default(3),
  timeout: z.number().min(1000).max(30000).default(5000),
});

type WebhookFormData = z.infer<typeof webhookFormSchema>;

const availableEvents = [
  "contact.created",
  "video.created",
  "video.updated",
  "avatar.created",
  "voice.created",
  "edited_video.created",
  "podcast.created",
];

export default function WebhooksManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: webhooksResponse, isLoading } = useQuery({
    queryKey: ["/api/admin/webhooks"],
  });

  const webhooks = webhooksResponse?.data || [];

  const createMutation = useMutation({
    mutationFn: async (data: WebhookFormData) => {
      return apiRequest("/api/admin/webhooks", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/webhooks"] });
      setIsCreateOpen(false);
      toast({
        title: "Success",
        description: "Webhook created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create webhook",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Webhook> }) => {
      return apiRequest(`/api/admin/webhooks/${id}`, "PATCH", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/webhooks"] });
      toast({
        title: "Success",
        description: "Webhook updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update webhook",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/webhooks/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/webhooks"] });
      toast({
        title: "Success",
        description: "Webhook deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete webhook",
        variant: "destructive",
      });
    },
  });

  const testMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/webhooks/${id}/test`, "POST");
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Test webhook sent successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send test webhook",
        variant: "destructive",
      });
    },
  });

  const form = useForm<WebhookFormData>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: {
      name: "",
      url: "",
      method: "POST",
      events: [],
      headers: {},
      secret: "",
      isActive: true,
      retryCount: 3,
      timeout: 5000,
    },
  });

  const onSubmit = (data: WebhookFormData) => {
    createMutation.mutate(data);
  };

  const getStatusBadge = (webhook: Webhook) => {
    if (!webhook.isActive) {
      return <Badge variant="secondary">Inactive</Badge>;
    }

    if (webhook.lastStatus === "success") {
      return <Badge variant="default" className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
    }

    if (webhook.lastStatus === "error") {
      return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Error</Badge>;
    }

    return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Webhooks Management</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="webhooks-management">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Webhook Management</h1>
          <p className="text-slate-600">Configure webhooks to receive contact form submissions and content updates in real-time</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-webhook">
              <Plus className="w-4 h-4 mr-2" />
              Create Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Webhook</DialogTitle>
              <DialogDescription>
                Configure a new webhook endpoint to receive real-time notifications from Siwaht events.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="My Webhook" data-testid="input-webhook-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webhook URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/webhook" data-testid="input-webhook-url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-webhook-method">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeout (ms)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1000" max="30000" data-testid="input-webhook-timeout" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="events"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Events</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {availableEvents.map((event) => (
                          <div key={event} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={event}
                              checked={field.value.includes(event)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, event]);
                                } else {
                                  field.onChange(field.value.filter((e) => e !== event));
                                }
                              }}
                              data-testid={`checkbox-event-${event}`}
                            />
                            <Label htmlFor={event} className="text-sm">{event}</Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secret (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Webhook signing secret" data-testid="input-webhook-secret" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active</FormLabel>
                        <p className="text-sm text-muted-foreground">Enable this webhook to receive events</p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} data-testid="switch-webhook-active" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-webhook">
                    {createMutation.isPending ? "Creating..." : "Create Webhook"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {webhooks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Settings className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No webhooks configured</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first webhook to start receiving real-time notifications
              </p>
              <Button onClick={() => setIsCreateOpen(true)} data-testid="button-create-first-webhook">
                <Plus className="w-4 h-4 mr-2" />
                Create Webhook
              </Button>
            </CardContent>
          </Card>
        ) : (
          webhooks.map((webhook: Webhook) => (
            <Card key={webhook.id} data-testid={`webhook-card-${webhook.id}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {webhook.name}
                      {getStatusBadge(webhook)}
                    </CardTitle>
                    <CardDescription>{webhook.url}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testMutation.mutate(webhook.id)}
                      disabled={testMutation.isPending}
                      data-testid={`button-test-webhook-${webhook.id}`}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Test
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMutation.mutate({ 
                        id: webhook.id, 
                        data: { isActive: !webhook.isActive } 
                      })}
                      data-testid={`button-toggle-webhook-${webhook.id}`}
                    >
                      {webhook.isActive ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(webhook.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-webhook-${webhook.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Method</Label>
                    <p className="font-medium">{webhook.method}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Events</Label>
                    <p className="font-medium">{webhook.events.length} events</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Success Rate</Label>
                    <p className="font-medium">{webhook.successRate}%</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Total Calls</Label>
                    <p className="font-medium">{webhook.totalCalls}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-wrap gap-1">
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="secondary" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}