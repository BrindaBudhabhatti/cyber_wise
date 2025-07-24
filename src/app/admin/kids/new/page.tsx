
import { KidStoryForm } from "../_components/kid-story-form";

export default function NewKidStoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Add New Kid's Story</h1>
                <p className="text-muted-foreground">Fill in the details for the new story below.</p>
            </div>
            <KidStoryForm />
        </div>
    )
}
