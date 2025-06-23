
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { awarenessPosters } from "@/lib/awareness-data";

export default function AwarenessPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cyber Awareness Gallery</h1>
        <p className="text-muted-foreground">
          A fun take on cyber safety with a Bollywood twist!
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {awarenessPosters.map((poster) => (
          <Card key={poster.id} className="overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="relative h-96 w-full">
              <Image
                src={poster.imageUrl}
                alt={poster.title}
                fill
                className="object-cover"
                data-ai-hint={poster.dataAiHint}
              />
            </div>
            <CardHeader>
              <CardTitle>&ldquo;{poster.title}&rdquo;</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{poster.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
