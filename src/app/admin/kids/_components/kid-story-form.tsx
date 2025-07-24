
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
import { upsertKidStoryAction } from "../../actions";
import type { KidStory } from "@/lib/data-service";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const kidStoryFormSchema = z.object({
  id: z.string().optional(),
  title_key: z.string().min(1, "Title is required"),
  description_key: z.string().min(1, "Description is required"),
  content_key: z.string().min(1, "Story Content is required"),
  age_group: z.string().min(1, "Age Group is required (e.g., 5-8)"),
  topic: z.string().min(1, "Topic is required (e.g., Phishing)"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

export function KidStoryForm({ storyData }: { storyData?: KidStory }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof kidStoryFormSchema>>({
    resolver: zodResolver(kidStoryFormSchema),
    defaultValues: storyData || {
      title_key: "",
      description_key: "",
      content_key: "",
      age_group: "",
      topic: "",
      image_url: "",
    },
  });

  function onSubmit(values: z.infer<typeof kidStoryFormSchema>) {
    startTransition(async () => {
        const result = await upsertKidStoryAction(values);
        if (result?.error) {
            toast({ title: 'Error submitting form', description: "Please check the form for errors.", variant: 'destructive'});
        } else {
            toast({ title: 'Success', description: "Kid's story saved successfully." });
            router.push('/admin/kids');
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
              name="title_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Boy Who Cried Phishing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short, one-sentence description of the story." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Story Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="The full story goes here..." className="min-h-48" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="age_group"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Age Group</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 5-8" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Online Safety, Bullying" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/600x400.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Story
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
