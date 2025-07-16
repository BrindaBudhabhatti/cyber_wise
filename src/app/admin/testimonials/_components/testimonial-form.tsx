
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Card, CardContent } from "@/components/ui/card";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { upsertTestimonialAction } from "../../actions";
import type { VictimTestimonial } from "@/lib/data-service";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const testimonialFormSchema = z.object({
  id: z.string().optional(),
  aliasKey: z.string().min(1, "Alias is required"),
  storyKey: z.string().min(1, "Story is required"),
  helpKey: z.string().min(1, "Help received is required"),
  messageKey: z.string().min(1, "Message is required"),
});

export function TestimonialForm({ testimonialData }: { testimonialData?: VictimTestimonial }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: testimonialData || {
      aliasKey: "",
      storyKey: "",
      helpKey: "",
      messageKey: "",
    },
  });

  function onSubmit(values: z.infer<typeof testimonialFormSchema>) {
    startTransition(async () => {
        const result = await upsertTestimonialAction(values);
        if (result?.error) {
            toast({ title: 'Error submitting form', description: "Please check the form for errors.", variant: 'destructive'});
        } else {
            toast({ title: 'Success', description: 'Testimonial saved successfully.' });
            router.push('/admin/testimonials');
        }
    })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="aliasKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alias / Name</FormLabel>
                  <FormControl>
                    <Input placeholder="College Student" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="storyKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story</FormLabel>
                  <FormControl>
                    <Textarea placeholder="The victim's story..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="helpKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Help Received</FormLabel>
                  <FormControl>
                    <Textarea placeholder="How they received help..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="messageKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message to Others</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Their message to others..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Testimonial
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
