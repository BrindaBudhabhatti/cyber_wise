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
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          {t('home.title')}
        </h1>
        <p className="text-muted-foreground md:text-lg">
          {t('home.description')}
        </p>
      </div>

      <SafetyTipCarousel />

      <Card className="w-full shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="text-primary" />
            <span>{t('home.chat.title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {t('home.chat.description')}
          </p>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link href="/chat">
              {t('home.chat.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
