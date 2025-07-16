
import { getVictimTestimonials } from "@/lib/data-service";
import { AdminTestimonialTable } from "./_components/admin-testimonial-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function AdminTestimonialsPage() {
    const testimonials = await getVictimTestimonials();
    
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Victim Voices</h1>
                    <p className="text-muted-foreground">Add, edit, or delete testimonials from the Case Gallery.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/testimonials/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Testimonial
                    </Link>
                </Button>
            </div>
            <AdminTestimonialTable testimonials={testimonials} />
        </div>
    )
}
