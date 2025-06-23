'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SafetyTipCarousel } from '@/components/safety-tip-carousel';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
          {t('home.title')}
        </h1>
        <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
          {t('home.description')}
        </p>
      </div>

      <div className="space-y-8">
        <SafetyTipCarousel />

        <Card className="w-full shadow-lg flex flex-col h-full">
           <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <MessageCircle className="text-accent h-6 w-6" />
              </div>
              <span className="text-2xl">{t('home.chat.title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              {t('home.chat.description')}
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild size="lg" className="w-full text-base">
              <Link href="/chat">
                {t('home.chat.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
