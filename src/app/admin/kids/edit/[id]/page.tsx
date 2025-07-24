
import { getKidStory } from "@/lib/data-service";
import { KidStoryForm } from "../../_components/kid-story-form";
import { notFound } from "next/navigation";

export default async function EditKidStoryPage({ params }: { params: { id: string } }) {
    const storyData = await getKidStory(params.id);

    if (!storyData) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Kid's Story</h1>
                <p className="text-muted-foreground">Update the story details below.</p>
            </div>
            <KidStoryForm storyData={storyData} />
        </div>
    )
}
