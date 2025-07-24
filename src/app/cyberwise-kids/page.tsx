
import { getKidStories, type KidStory } from "@/lib/data-service";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function CyberwiseKidsPage() {
    const stories = await getKidStories();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">CyberWise Kids</h1>
                <p className="text-muted-foreground">Fun stories to learn about staying safe online!</p>
            </div>
            {stories.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center">
                     <CardTitle>No Stories Yet!</CardTitle>
                     <CardDescription className="mt-2">It looks like there are no stories here. Check back soon!</CardDescription>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <Card key={story.id} className="flex flex-col overflow-hidden">
                            <CardHeader>
                                {story.image_url && (
                                    <div className="relative aspect-video mb-4">
                                        <Image 
                                            src={story.image_url} 
                                            alt={story.title_key} 
                                            fill 
                                            className="rounded-t-lg object-cover"
                                            data-ai-hint="kids story illustration"
                                        />
                                    </div>
                                )}
                                <CardTitle>{story.title_key}</CardTitle>
                                <CardDescription>{story.description_key}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">Age: {story.age_group}</Badge>
                                    <Badge variant="secondary">Topic: {story.topic}</Badge>
                                </div>
                            </CardContent>
                            <CardFooter>
                                 <Button asChild className="w-full">
                                    <Link href={`/cyberwise-kids/${story.id}`}>
                                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
