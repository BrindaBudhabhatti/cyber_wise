
import { TestimonialForm } from "../_components/testimonial-form";

export default function NewTestimonialPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Add New Victim Voice</h1>
                <p className="text-muted-foreground">Fill in the details for the new testimonial below.</p>
            </div>
            <TestimonialForm />
        </div>
    )
}
