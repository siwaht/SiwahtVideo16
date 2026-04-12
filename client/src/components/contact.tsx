
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Send, CheckCircle2, XCircle } from "lucide-react";
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

import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

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
        headers: {
          "Content-Type": "application/json",
        },
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
      setFormStatus("success");
      form.reset();
    },
    onError: () => {
      setFormStatus("error");
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    setFormStatus("idle");
    submitMutation.mutate(data);
  };



  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-indigo-100/70 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl floating-animation"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
      <div className="container-custom relative z-10">
        <header className="text-center mb-12 xs:mb-16">
          <h2
            id="contact-heading"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 xs:mb-8 text-shadow"
          >
            <span className="gradient-text">Start Your Transformation</span>
          </h2>
          <p className="text-xl xs:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed px-2 font-light">
            Ready to deploy the next generation of AI content? Discuss your vision with our solution architects today.
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6 xs:p-8">
              <h3 className="text-xl xs:text-2xl font-semibold text-slate-900 mb-6">Start Your Project</h3>

              {/* Inline success banner */}
              {formStatus === "success" && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-900 text-lg">Message sent successfully!</p>
                    <p className="text-emerald-700 mt-1">We'll get back to you within 24 hours. Thank you for reaching out.</p>
                    <button
                      type="button"
                      onClick={() => setFormStatus("idle")}
                      className="mt-3 text-sm font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              {/* Inline error banner */}
              {formStatus === "error" && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <XCircle className="h-6 w-6 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-red-900 text-lg">Something went wrong</p>
                    <p className="text-red-700 mt-1">We couldn't send your message. Please try again or contact us directly.</p>
                    <button
                      type="button"
                      onClick={() => setFormStatus("idle")}
                      className="mt-3 text-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-900 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {formStatus !== "success" && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 xs:space-y-6 contact-form">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="h-11 xs:h-12 text-base touch-manipulation"
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
                        <FormLabel className="text-slate-700">Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            type="email"
                            {...field}
                            className="h-11 xs:h-12 text-base touch-manipulation"
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
                        <FormLabel className="text-slate-700">Company (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Company"
                            {...field}
                            value={field.value || ""}
                            className="h-11 xs:h-12 text-base touch-manipulation"
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
                        <FormLabel className="text-slate-700">Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project, goals, and timeline..."
                            className="min-h-[120px] resize-none text-base touch-manipulation"
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
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 h-11 xs:h-12 text-base font-semibold"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}