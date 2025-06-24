'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ArrowRight,
  BookOpen,
  BarChart,
  Newspaper,
  ScanLine,
  Gamepad2,
  ShieldQuestion,
  GalleryHorizontal,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      href: '/learn',
      icon: BookOpen,
      titleKey: 'home.features.learn.title',
      descriptionKey: 'home.features.learn.description',
      linkKey: 'home.features.learn.link',
    },
    {
      href: '/news',
      icon: Newspaper,
      titleKey: 'home.features.news.title',
      descriptionKey: 'home.features.news.description',
      linkKey: 'home.features.news.link',
    },
    {
      href: '/stats',
      icon: BarChart,
      titleKey: 'home.features.stats.title',
      descriptionKey: 'home.features.stats.description',
      linkKey: 'home.features.stats.link',
    },
    {
      href: '/quiz',
      icon: ShieldQuestion,
      titleKey: 'home.features.quiz.title',
      descriptionKey: 'home.features.quiz.description',
      linkKey: 'home.features.quiz.link',
    },
    {
      href: '/games',
      icon: Gamepad2,
      titleKey: 'home.features.games.title',
      descriptionKey: 'home.features.games.description',
      linkKey: 'home.features.games.link',
    },
    {
      href: '/threat-analyzer',
      icon: ScanLine,
      titleKey: 'home.features.analyzer.title',
      descriptionKey: 'home.features.analyzer.description',
      linkKey: 'home.features.analyzer.link',
    },
    {
      href: '/awareness',
      icon: GalleryHorizontal,
      titleKey: 'home.features.awareness.title',
      descriptionKey: 'home.features.awareness.description',
      linkKey: 'home.features.awareness.link',
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
          {t('home.hero.title1')}{' '}
          <span className="text-primary">{t('home.hero.title2')}</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('home.hero.subtitle')}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/learn">
              {t('home.hero.cta1')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/chat">{t('home.hero.cta2')}</Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.href}
              className="flex flex-col text-center items-center justify-start group hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            >
              <CardHeader>
                <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <CardTitle className="text-2xl">
                  {t(feature.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{t(feature.descriptionKey)}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button
                  asChild
                  variant="ghost"
                  className="text-primary group-hover:text-foreground transition-colors duration-300"
                >
                  <Link href={feature.href}>
                    {t(feature.linkKey)} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
