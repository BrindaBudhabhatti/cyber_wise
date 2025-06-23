
import { notFound } from "next/navigation";
import { topics } from "@/lib/learn-data";
import { LearnTopicDetails } from "@/components/learn-topic-details";

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

  // Pass only the serializable slug to the Client Component
  return <LearnTopicDetails slug={params.slug} />;
}
