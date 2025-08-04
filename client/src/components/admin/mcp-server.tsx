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
import { Plus, Server, Activity, Trash2, AlertCircle, CheckCircle2, Clock, Wifi, WifiOff } from "lucide-react";
import type { MCPServer } from "@shared/schema";

const mcpServerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  endpoint: z.string().url("Must be a valid URL"),
  protocol: z.string().default("https"),
  authentication: z.string().default("none"),
  credentials: z.string().optional(),
  capabilities: z.array(z.string()).min(1, "At least one capability is required"),
  config: z.record(z.any()).optional(),
  isActive: z.boolean().default(true),
  timeout: z.number().min(1000).max(60000).default(10000),
  maxRetries: z.number().min(0).max(10).default(3),
  healthCheckInterval: z.number().min(10000).max(300000).default(60000),
});

type MCPServerFormData = z.infer<typeof mcpServerFormSchema>;

const availableCapabilities = [
  "text_generation",
  "code_completion",
  "data_analysis",
  "image_generation",
  "file_processing",
  "web_scraping",
  "api_integration",
  "database_query",
  "model_inference",
  "custom_tools",
];

const authenticationTypes = [
  { value: "none", label: "None" },
  { value: "api_key", label: "API Key" },
  { value: "bearer_token", label: "Bearer Token" },
  { value: "basic_auth", label: "Basic Auth" },
  { value: "oauth2", label: "OAuth 2.0" },
  { value: "custom", label: "Custom" },
];

export default function MCPServerManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<MCPServer | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: servers, isLoading } = useQuery({
    queryKey: ["/api/admin/mcp-servers"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: MCPServerFormData) => {
      return apiRequest("/api/admin/mcp-servers", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mcp-servers"] });
      setIsCreateOpen(false);
      toast({
        title: "Success",
        description: "MCP Server created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create MCP server",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<MCPServer> }) => {
      return apiRequest(`/api/admin/mcp-servers/${id}`, "PATCH", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mcp-servers"] });
      toast({
        title: "Success",
        description: "MCP Server updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update MCP server",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/mcp-servers/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mcp-servers"] });
      toast({
        title: "Success",
        description: "MCP Server deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete MCP server",
        variant: "destructive",
      });
    },
  });

  const healthCheckMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/mcp-servers/${id}/health-check`, "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mcp-servers"] });
      toast({
        title: "Success",
        description: "Health check completed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Health check failed",
        variant: "destructive",
      });
    },
  });

  const form = useForm<MCPServerFormData>({
    resolver: zodResolver(mcpServerFormSchema),
    defaultValues: {
      name: "",
      description: "",
      endpoint: "",
      protocol: "https",
      authentication: "none",
      credentials: "",
      capabilities: [],
      config: {},
      isActive: true,
      timeout: 10000,
      maxRetries: 3,
      healthCheckInterval: 60000,
    },
  });

  const onSubmit = (data: MCPServerFormData) => {
    createMutation.mutate(data);
  };

  const getStatusBadge = (server: MCPServer) => {
    if (!server.isActive) {
      return <Badge variant="secondary"><WifiOff className="w-3 h-3 mr-1" />Inactive</Badge>;
    }

    switch (server.status) {
      case "online":
        return <Badge variant="default" className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" />Online</Badge>;
      case "offline":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Offline</Badge>;
      case "error":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">MCP Servers</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="mcp-servers-management">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">MCP Servers</h1>
          <p className="text-muted-foreground">Manage Model Context Protocol servers for AI integrations</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-mcp-server">
              <Plus className="w-4 h-4 mr-2" />
              Add Server
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New MCP Server</DialogTitle>
              <DialogDescription>
                Configure a new Model Context Protocol server to extend AI capabilities and integrations.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Server Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="My MCP Server" data-testid="input-server-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="protocol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protocol</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-server-protocol">
                              <SelectValue placeholder="Select protocol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="https">HTTPS</SelectItem>
                            <SelectItem value="http">HTTP</SelectItem>
                            <SelectItem value="ws">WebSocket</SelectItem>
                            <SelectItem value="wss">WebSocket Secure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="endpoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endpoint URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://api.example.com/mcp" data-testid="input-server-endpoint" />
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
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Server description and purpose" data-testid="textarea-server-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="authentication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Authentication</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-server-auth">
                              <SelectValue placeholder="Select authentication" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authenticationTypes.map((auth) => (
                              <SelectItem key={auth.value} value={auth.value}>{auth.label}</SelectItem>
                            ))}
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
                          <Input {...field} type="number" min="1000" max="60000" data-testid="input-server-timeout" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="credentials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credentials (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="API key, token, or credentials" data-testid="input-server-credentials" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capabilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capabilities</FormLabel>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                        {availableCapabilities.map((capability) => (
                          <div key={capability} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={capability}
                              checked={field.value.includes(capability)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, capability]);
                                } else {
                                  field.onChange(field.value.filter((c) => c !== capability));
                                }
                              }}
                              data-testid={`checkbox-capability-${capability}`}
                            />
                            <Label htmlFor={capability} className="text-sm">{capability.replace(/_/g, ' ')}</Label>
                          </div>
                        ))}
                      </div>
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
                        <p className="text-sm text-muted-foreground">Enable this server for use</p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} data-testid="switch-server-active" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-server">
                    {createMutation.isPending ? "Creating..." : "Add Server"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {(!servers || servers.length === 0) ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Server className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No MCP servers configured</h3>
              <p className="text-muted-foreground text-center mb-4">
                Add your first MCP server to enable AI integrations and extended capabilities
              </p>
              <Button onClick={() => setIsCreateOpen(true)} data-testid="button-create-first-server">
                <Plus className="w-4 h-4 mr-2" />
                Add Server
              </Button>
            </CardContent>
          </Card>
        ) : (
          servers && servers.map((server: MCPServer) => (
            <Card key={server.id} data-testid={`server-card-${server.id}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5" />
                      {server.name}
                      {getStatusBadge(server)}
                    </CardTitle>
                    <CardDescription>{server.description || server.endpoint}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => healthCheckMutation.mutate(server.id)}
                      disabled={healthCheckMutation.isPending}
                      data-testid={`button-health-check-${server.id}`}
                    >
                      <Activity className="w-4 h-4 mr-1" />
                      Health Check
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMutation.mutate({ 
                        id: server.id, 
                        data: { isActive: !server.isActive } 
                      })}
                      data-testid={`button-toggle-server-${server.id}`}
                    >
                      {server.isActive ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(server.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-server-${server.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <Label className="text-muted-foreground">Protocol</Label>
                    <p className="font-medium">{server.protocol.toUpperCase()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Authentication</Label>
                    <p className="font-medium">{server.authentication}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Response Time</Label>
                    <p className="font-medium">{server.avgResponseTime}ms</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Requests</Label>
                    <p className="font-medium">{server.requestCount}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <Label className="text-muted-foreground mb-2 block">Capabilities</Label>
                  <div className="flex flex-wrap gap-1">
                    {server.capabilities.map((capability) => (
                      <Badge key={capability} variant="secondary" className="text-xs">
                        {capability.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                {server.lastHealthCheck && (
                  <div className="mt-4 text-xs text-muted-foreground">
                    Last health check: {new Date(server.lastHealthCheck).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}