
'use client';

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { topics } from "@/lib/learn-data";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SafetyTipCarousel } from "@/components/safety-tip-carousel";

export default function LearnPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('learn_page.title')}</h1>
        <p className="text-muted-foreground">
          {t('learn_page.description')}
        </p>
      </div>

      <SafetyTipCarousel />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link href={`/learn/${topic.slug}`} key={topic.slug} className="group">
            <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/50 group-hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <topic.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{t(topic.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{t(topic.summaryKey)}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                  <p className="text-sm font-medium text-primary flex items-center">
                    {t('learn_page.learn_more')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
