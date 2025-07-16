
import { getVictimTestimonial } from "@/lib/data-service";
import { TestimonialForm } from "../../_components/testimonial-form";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
    const testimonialData = await getVictimTestimonial(params.id);

    if (!testimonialData) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Victim Voice</h1>
                <p className="text-muted-foreground">Update the testimonial details below.</p>
            </div>
            <TestimonialForm testimonialData={testimonialData} />
        </div>
    )
}
