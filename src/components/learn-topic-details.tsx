
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, Gavel, ShieldCheck, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { topics } from "@/lib/learn-data";
import { notFound, useSearchParams } from "next/navigation";

export function LearnTopicDetails({ slug, from }: { slug: string, from: string }) {
  const { t } = useTranslation();

  // Find the topic object within the client component using the slug
  const topic = topics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const backPath = from || '/learn';
  const backButtonLabel = backPath === '/womens-safety' ? t('womens_safety_page.title') : t('learn_page.title');

  return (
    <div className="space-y-8">
       <Button asChild variant="outline" className="mb-4">
          <Link href={backPath}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('learn_detail_page.back_to')} {backButtonLabel}
          </Link>
        </Button>
      <header className="flex items-center gap-4 rounded-lg bg-card p-6">
        <div className="bg-primary/10 p-4 rounded-lg">
          <topic.icon className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{t(topic.titleKey)}</h1>
          <p className="text-muted-foreground">{t(topic.summaryKey)}</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookCopy className="text-primary" /> {t('learn_detail_page.what_is_it')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t(topic.descriptionKey)}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="text-destructive" /> {t('learn_detail_page.applicable_laws')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t(topic.lawKey)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-orange-500" /> {t('learn_detail_page.penalties')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t(topic.penaltyKey)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="text-green-500" /> {t('learn_detail_page.safety_tips')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {topic.tipsKeys.map((tipKey, index) => (
              <li key={index} className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">{t(tipKey)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
