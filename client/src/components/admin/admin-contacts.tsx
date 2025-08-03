import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  Mail, 
  Phone, 
  Building, 
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye
} from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  submittedAt: string;
  updatedAt: string;
}

export default function AdminContacts() {
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contactsResponse, isLoading, error } = useQuery<{data: ContactSubmission[]}>({
    queryKey: ["/api/admin/contacts"],
  });

  const contacts = contactsResponse?.data || [];

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/admin/contacts/${id}`, { status });
      if (!response.ok) {
        throw new Error("Failed to update contact status");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      toast({
        title: "Status updated",
        description: "Contact status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update contact status",
        variant: "destructive",
      });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/contacts/${id}`);
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      setSelectedContact(null);
      toast({
        title: "Contact deleted",
        description: "Contact submission has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete contact",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' at ' + 
           new Date(dateString).toLocaleTimeString();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
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
            <CardTitle className="text-center text-destructive">Error Loading Contacts</CardTitle>
            <CardDescription className="text-center">
              Unable to load contact submissions. Please try refreshing the page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Submissions</h1>
        <p className="text-muted-foreground">
          Manage and respond to customer inquiries and contact form submissions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.filter(c => c.status === 'new').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.filter(c => c.status === 'qualified').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contacts.filter(c => c.status === 'converted').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact List */}
      {contacts && contacts.length > 0 ? (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {contact.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {contact.phone}
                        </span>
                      )}
                      {contact.company && (
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {contact.company}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {contact.message}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(contact.submittedAt)}
                  </span>
                  <div className="flex gap-2">
                    <select
                      value={contact.status}
                      onChange={(e) => {
                        updateStatusMutation.mutate({
                          id: contact.id,
                          status: e.target.value
                        });
                      }}
                      className="text-xs border rounded px-2 py-1"
                      disabled={updateStatusMutation.isPending}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-sm font-semibold">No contacts yet</h3>
            <p className="text-sm text-muted-foreground">
              Contact form submissions will appear here when users reach out.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {selectedContact.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Submitted {formatDate(selectedContact.submittedAt)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(selectedContact.status)}>
                    {selectedContact.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedContact(null)}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <p className="text-sm text-muted-foreground">{selectedContact.company}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteContactMutation.mutate(selectedContact.id)}
                    disabled={deleteContactMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  
                  <div className="flex gap-2">
                    <select
                      value={selectedContact.status}
                      onChange={(e) => {
                        updateStatusMutation.mutate({
                          id: selectedContact.id,
                          status: e.target.value
                        });
                      }}
                      className="border rounded px-3 py-2"
                      disabled={updateStatusMutation.isPending}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}