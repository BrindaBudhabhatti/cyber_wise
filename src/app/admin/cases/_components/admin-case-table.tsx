
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SolvedCase } from "@/lib/firestore-service";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteCaseAction } from "../../actions";
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

export function AdminCaseTable({ cases }: { cases: SolvedCase[] }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const result = await deleteCaseAction(id);
            if (result?.error) {
                toast({ title: 'Error', description: result.error, variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: 'Case deleted successfully.' });
            }
        })
    }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cases.map((caseItem) => (
          <TableRow key={caseItem.id}>
            <TableCell>{caseItem.titleKey}</TableCell>
            <TableCell>{caseItem.year}</TableCell>
            <TableCell>{caseItem.tags.join(', ')}</TableCell>
            <TableCell className="text-right">
               <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/cases/edit/${caseItem.id}`}>
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
                        This action cannot be undone. This will permanently delete the case.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(caseItem.id!)} disabled={isPending}>
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
