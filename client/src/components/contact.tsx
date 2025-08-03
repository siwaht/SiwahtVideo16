
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      serviceInterest: "",
      projectDetails: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate(data);
  };



  const serviceOptions = [
    "AI Video Ads",
    "AI Avatar Creation",
    "Voice Synthesis",
    "Video Editing",
    "Podcast Production",
    "Custom AI Solution",
    "Consultation"
  ];

  return (
    <section 
      id="contact" 
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-2xl" />
    
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-12 xs:mb-16">
          <h2 
            id="contact-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 xs:mb-6"
          >
            Get Started Today
          </h2>
          <p className="text-lg xs:text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed px-2 font-light">
            Ready to transform your vision with AI? Let's discuss your project and create something extraordinary together.
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div>
            <div className="luxury-card p-8 xs:p-10">
              <h3 className="text-xl xs:text-2xl font-bold text-slate-900 mb-8 text-center">Start Your Project</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 xs:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John" 
                              {...field} 
                              className="h-12 xs:h-14 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                              data-testid="input-first-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Doe" 
                              {...field} 
                              className="h-12 xs:h-14 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                              data-testid="input-last-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            type="email" 
                            {...field} 
                            className="h-12 xs:h-14 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Company (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Company" 
                            {...field} 
                            value={field.value || ""}
                            className="h-12 xs:h-14 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                            data-testid="input-company"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Service Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 xs:h-14 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl" data-testid="select-service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceOptions.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Project Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project, goals, and timeline..."
                            className="min-h-[120px] resize-none bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                            {...field}
                            data-testid="textarea-project-details"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full luxury-button h-12 xs:h-14 text-base font-semibold rounded-xl"
                    data-testid="button-submit-contact"
                  >
                    {submitMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}