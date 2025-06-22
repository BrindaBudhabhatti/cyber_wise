import { notFound } from "next/navigation";
import { topics } from "@/lib/learn-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookCopy, Gavel, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default function LearnTopicPage({
  params,
}: {
  params: { slug: string };
}) {
  const topic = topics.find((t) => t.slug === params.slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="space-y-8">
       <Button asChild variant="outline" className="mb-4">
          <Link href="/learn">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learn
          </Link>
        </Button>
      <header className="flex items-center gap-4 rounded-lg bg-card p-6">
        <div className="bg-primary/10 p-4 rounded-lg">
          <topic.icon className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{topic.title}</h1>
          <p className="text-muted-foreground">{topic.summary}</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookCopy className="text-primary" /> What is it?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{topic.description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="text-destructive" /> Applicable Laws
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{topic.law}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-orange-500" /> Penalties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{topic.penalty}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="text-green-500" /> Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {topic.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
