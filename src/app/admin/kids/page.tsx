
import { getKidStories } from "@/lib/data-service";
import { AdminKidStoryTable } from "./_components/admin-kid-story-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function AdminKidsPage() {
    const stories = await getKidStories();
    
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Kids' Stories</h1>
                    <p className="text-muted-foreground">Add, edit, or delete stories for the CyberWise Kids section.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/kids/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Story
                    </Link>
                </Button>
            </div>
            <AdminKidStoryTable stories={stories} />
        </div>
    )
}
