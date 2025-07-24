
import { getKidStory } from "@/lib/data-service";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function KidStoryDetailPage({ params }: { params: { id: string } }) {
    const story = await getKidStory(params.id);

    if (!story) {
        notFound();
    }

    return (
        <div className="space-y-6">
             <Button asChild variant="outline">
                <Link href="/cyberwise-kids">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Stories
                </Link>
            </Button>

            <Card className="overflow-hidden">
                {story.image_url && (
                    <div className="relative aspect-video w-full">
                         <Image 
                            src={story.image_url} 
                            alt={story.title_key} 
                            fill 
                            className="object-cover"
                            data-ai-hint="kids story illustration"
                        />
                    </div>
                )}
                <CardHeader>
                    <CardTitle className="text-3xl">{story.title_key}</CardTitle>
                    <CardDescription>{story.description_key}</CardDescription>
                     <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary">Age: {story.age_group}</Badge>
                        <Badge variant="secondary">Topic: {story.topic}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                        {story.content_key}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
