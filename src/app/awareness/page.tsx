
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
          <Card key={poster.id} className="flex h-full flex-col justify-start overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-primary/20">
            <CardHeader className="flex-row items-center gap-4">
               <div className="bg-primary/10 p-3 rounded-full">
                  <poster.icon className="h-8 w-8 text-primary" />
                </div>
              <CardTitle className="text-xl">&ldquo;{poster.title}&rdquo;</CardTitle>
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
