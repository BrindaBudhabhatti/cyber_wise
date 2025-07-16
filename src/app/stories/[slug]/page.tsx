
import { notFound } from "next/navigation";
import { stories } from "@/lib/stories-data";
import { StoryPage } from "@/components/story-page";

export function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export default function Story({ params }: { params: { slug: string } }) {
  const story = stories.find((s) => s.slug === params.slug);

  if (!story) {
    notFound();
  }

  return <StoryPage story={story} />;
}
