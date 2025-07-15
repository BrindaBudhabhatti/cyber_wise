
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { VictimTestimonial } from "@/lib/firestore-service";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteTestimonialAction } from "../../actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export function AdminTestimonialTable({ testimonials }: { testimonials: VictimTestimonial[] }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const result = await deleteTestimonialAction(id);
            if (result?.error) {
                toast({ title: 'Error', description: result.error, variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: 'Testimonial deleted successfully.' });
            }
        })
    }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Alias</TableHead>
          <TableHead>Story</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testimonials.map((testimonial) => (
          <TableRow key={testimonial.id}>
            <TableCell>{testimonial.aliasKey}</TableCell>
            <TableCell className="max-w-md truncate">{testimonial.storyKey}</TableCell>
            <TableCell className="text-right">
               <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/testimonials/edit/${testimonial.id}`}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>

                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isPending}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the testimonial.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(testimonial.id!)} disabled={isPending}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
