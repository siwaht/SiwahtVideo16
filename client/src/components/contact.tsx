        import { useState } from "react";
        import { useForm } from "react-hook-form";
        import { zodResolver } from "@hookform/resolvers/zod";
        import { useMutation, useQueryClient } from "@tanstack/react-query";
        import { Mail, Phone, MapPin, Clock, Twitter, Linkedin, Github, Youtube } from "lucide-react";
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
                description: "We'll get back to you soon.",
              });
              form.reset();
            },
            onError: () => {
              toast({
                title: "Error sending message",
                description: "Please try again later.",
                variant: "destructive",
              });
            },
          });

          const onSubmit = (data: InsertContactSubmission) => {
            submitMutation.mutate(data);
          };

          return (
            <section id="contact" className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Get Started Today
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Ready to transform your content with AI? Contact us to discuss your project
                      and discover how our AI-powered solutions can elevate your brand.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                        Send us a message
                      </h3>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="John"
                                      {...field}
                                      value={field.value || ""}
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
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Doe"
                                      {...field}
                                      value={field.value || ""}
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    {...field}
                                    value={field.value || ""}
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
                                <FormLabel>Company (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your company name"
                                    {...field}
                                    value={field.value || ""}
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
                                <FormLabel>Service of Interest</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="video-ads">AI Video Ad Creation</SelectItem>
                                    <SelectItem value="avatars">AI Avatar Creation</SelectItem>
                                    <SelectItem value="voice-synthesis">AI Voice Synthesis</SelectItem>
                                    <SelectItem value="video-editing">AI-Enhanced Video Editing</SelectItem>
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
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
                                <FormLabel>Project Details</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us about your project, goals, and requirements..."
                                    rows={4}
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={submitMutation.isPending}
                          >
                            {submitMutation.isPending ? "Sending..." : "Send Message"}
                          </Button>
                        </form>
                      </Form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                      <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                          Contact Information
                        </h3>

                        <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <Mail className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Email</h4>
                              <p className="text-gray-600">hello@siwahtai.com</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <Phone className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Phone</h4>
                              <p className="text-gray-600">+1 (555) 123-4567</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <MapPin className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Location</h4>
                              <p className="text-gray-600">
                                San Francisco, CA<br />
                                United States
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <Clock className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Business Hours</h4>
                              <p className="text-gray-600">
                                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                                Weekend: By appointment
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                          Follow Us
                        </h3>

                        <div className="flex space-x-4">
                          <a
                            href="#"
                            className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Twitter className="h-6 w-6 text-blue-600" />
                          </a>
                          <a
                            href="#"
                            className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Linkedin className="h-6 w-6 text-blue-600" />
                          </a>
                          <a
                            href="#"
                            className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Github className="h-6 w-6 text-blue-600" />
                          </a>
                          <a
                            href="#"
                            className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Youtube className="h-6 w-6 text-blue-600" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }