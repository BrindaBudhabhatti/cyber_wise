
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
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const topic = topics.find((t) => t.slug === params.slug);

  if (!topic) {
    notFound();
  }

  const from = typeof searchParams?.from === 'string' ? searchParams.from : '/learn';

  // Pass the serializable slug and from path to the Client Component
  return <LearnTopicDetails slug={params.slug} from={from} />;
}
