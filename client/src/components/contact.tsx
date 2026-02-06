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
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      projectDetails: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const webhookUrl = "https://hook.eu2.make.com/qqepxkbio61x8m3aw9pni6rlfj904itq";

      const webhookData = {
        fullName: data.fullName,
        email: data.email,
        company: data.company || "",
        projectDetails: data.projectDetails,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const responseText = await response.text();
      return { status: responseText };
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

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,_hsla(234,62%,56%,0.05),_transparent)]" />

      <div className="container-custom relative z-10">
        <header className="text-center mb-16">
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            <span className="gradient-text">Start Your Transformation</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
            Ready to deploy the next generation of AI content? Discuss your vision with our team today.
          </p>
        </header>

        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100" style={{ boxShadow: '0 4px 24px -4px rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-semibold text-slate-900 mb-8">Start Your Project</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 contact-form">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 text-sm font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="h-12 text-base rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-colors"
                          autoComplete="name"
                          autoCapitalize="words"
                          data-testid="input-full-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 text-sm font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          {...field}
                          className="h-12 text-base rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-colors"
                          autoComplete="email"
                          inputMode="email"
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
                      <FormLabel className="text-slate-600 text-sm font-medium">Company <span className="text-slate-400">(optional)</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Company"
                          {...field}
                          value={field.value || ""}
                          className="h-12 text-base rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-colors"
                          autoComplete="organization"
                          autoCapitalize="words"
                          data-testid="input-company"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 text-sm font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project, goals, and timeline..."
                          className="min-h-[130px] resize-none text-base rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-colors"
                          {...field}
                          autoCapitalize="sentences"
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
                  className="w-full h-12 text-base font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors"
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
    </section>
  );
}
