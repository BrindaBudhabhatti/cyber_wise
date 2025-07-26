
import { getKidStories, type KidStory } from "@/lib/data-service";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2, HeartHandshake, Phone, BookOpen, Fish, LockKeyhole } from "lucide-react";

function StoryList({ stories }: { stories: KidStory[] }) {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold">Interactive Stories</h2>
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
        </section>
    )
}

function GameList() {
    const games = [
        { href: '/games/phishing-spotter', title: 'Phishing Spotter', icon: Fish },
        { href: '/games/password-strength-challenge', title: 'Password Challenge', icon: LockKeyhole },
    ];

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <Gamepad2 className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold">Fun & Safe Games</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {games.map(game => (
                    <Link href={game.href} key={game.href} className="group">
                        <Card className="h-full flex items-center p-6 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/50 group-hover:-translate-y-1">
                            <div className="bg-primary/10 p-4 rounded-full mr-6">
                                <game.icon className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{game.title}</CardTitle>
                                <p className="text-sm font-medium text-primary flex items-center mt-2">
                                    Play Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function HelplineNumbers() {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <HeartHandshake className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold">Help is Here!</h2>
            </div>
            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle>Childline India</CardTitle>
                    <CardDescription>If you ever feel unsafe, scared, or just need someone to talk to, don't hesitate to call.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Phone className="h-10 w-10 text-destructive" />
                    <div>
                        <p className="text-3xl font-bold tracking-wider">1098</p>
                        <p className="text-muted-foreground">It's free, confidential, and available 24/7.</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}


export default async function CyberwiseKidsPage() {
    const stories = await getKidStories();

    return (
        <div className="space-y-12">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome to CyberWise Kids!</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A fun and safe place to learn about the online world through stories, games, and more.</p>
            </header>
            
            <StoryList stories={stories} />

            <GameList />

            <HelplineNumbers />
        </div>
    )
}
