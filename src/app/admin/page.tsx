
'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookKey, MessageSquareQuote, PlusCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('admin_dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('admin_dashboard.description')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookKey />
              {t('admin_dashboard.solved_cases.title')}
            </CardTitle>
            <CardDescription>{t('admin_dashboard.solved_cases.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/cases">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('admin_dashboard.solved_cases.button')}
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareQuote />
              {t('admin_dashboard.victim_voices.title')}
            </CardTitle>
            <CardDescription>{t('admin_dashboard.victim_voices.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/testimonials">
                 <PlusCircle className="mr-2 h-4 w-4" />
                 {t('admin_dashboard.victim_voices.button')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
