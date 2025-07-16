
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
import { upsertCaseAction } from "../../actions";
import type { SolvedCase } from "@/lib/data-service";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const caseFormSchema = z.object({
  id: z.string().optional(),
  titleKey: z.string().min(1, "Title is required"),
  year: z.coerce.number().min(2000, "Year must be after 2000"),
  summaryKey: z.string().min(1, "Summary is required"),
  toolsUsed: z.string().min(1, "Tools used is required"),
  outcomeKey: z.string().min(1, "Outcome is required"),
  tags: z.string().min(1, "Tags are required"),
});

export function CaseForm({ caseData }: { caseData?: SolvedCase }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof caseFormSchema>>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: caseData ? {
        ...caseData,
        toolsUsed: caseData.toolsUsed.join(', '),
        tags: caseData.tags.join(', '),
    } : {
      titleKey: "",
      year: new Date().getFullYear(),
      summaryKey: "",
      toolsUsed: "",
      outcomeKey: "",
      tags: "",
    },
  });

  function onSubmit(values: z.infer<typeof caseFormSchema>) {
    startTransition(async () => {
        const result = await upsertCaseAction(values);
        if (result?.error) {
            toast({ title: 'Error submitting form', description: "Please check the form for errors.", variant: 'destructive'});
        } else {
            toast({ title: 'Success', description: 'Case saved successfully.' });
            router.push('/admin/cases');
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
              name="titleKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Phishing Scam Targeting Businesses" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summaryKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A detailed summary of the case..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toolsUsed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tools Used (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="IP Tracking, CDR, Email Tracing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="outcomeKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outcome</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Details about the outcome..." {...field} />
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
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Phishing, FinancialFraud" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Case
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
