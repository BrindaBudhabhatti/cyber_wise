
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { KidStory } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteKidStoryAction } from "../../actions";
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

export function AdminKidStoryTable({ stories }: { stories: KidStory[] }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const result = await deleteKidStoryAction(id);
            if (result?.error) {
                toast({ title: 'Error', description: 'Failed to delete story.', variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: 'Story deleted successfully.' });
            }
        })
    }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Age Group</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stories.map((story) => (
          <TableRow key={story.id}>
            <TableCell>{story.title_key}</TableCell>
            <TableCell>{story.age_group}</TableCell>
            <TableCell>{story.topic}</TableCell>
            <TableCell className="text-right">
               <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/kids/edit/${story.id}`}>
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
                        This action cannot be undone. This will permanently delete the story.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(story.id!)} disabled={isPending}>
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
