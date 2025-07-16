
import { getSolvedCases } from "@/lib/data-service";
import { AdminCaseTable } from "./_components/admin-case-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function AdminCasesPage() {
    const cases = await getSolvedCases();
    
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Solved Cases</h1>
                    <p className="text-muted-foreground">Add, edit, or delete solved cases from the Case Gallery.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/cases/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Case
                    </Link>
                </Button>
            </div>
            <AdminCaseTable cases={cases} />
        </div>
    )
}
