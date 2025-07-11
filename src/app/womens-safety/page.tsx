
'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartHandshake, Phone, Shield, FileText, UserX, GitCommit, ShieldAlert, ArrowRight, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

export default function WomensSafetyPage() {
  const { t } = useTranslation();

  const learnTopics = [
    { slug: 'cyberstalking', titleKey: 'womens_safety_page.threats.stalking.title', descriptionKey: 'womens_safety_page.threats.stalking.description', icon: UserX },
    { slug: 'photo-morphing', titleKey: 'womens_safety_page.threats.morphing.title', descriptionKey: 'womens_safety_page.threats.morphing.description', icon: GitCommit },
    { slug: 'doxxing', titleKey: 'womens_safety_page.threats.doxxing.title', descriptionKey: 'womens_safety_page.threats.doxxing.description', icon: FileText },
    { slug: 'cyber-bullying', titleKey: 'womens_safety_page.threats.bullying.title', descriptionKey: 'womens_safety_page.threats.bullying.description', icon: ShieldAlert },
  ];

  const resources: { titleKey: string; descriptionKey: string; ctaKey: string; href: string; icon: LucideIcon }[] = [
    { titleKey: 'womens_safety_page.resources.helpline.title', descriptionKey: 'womens_safety_page.resources.helpline.description', ctaKey: 'womens_safety_page.resources.helpline.cta', href: 'tel:181', icon: Phone },
    { titleKey: 'womens_safety_page.resources.report.title', descriptionKey: 'womens_safety_page.resources.report.description', ctaKey: 'womens_safety_page.resources.report.cta', href: '/report', icon: FileText },
    { titleKey: 'womens_safety_page.resources.cyberbuddy.title', descriptionKey: 'womens_safety_page.resources.cyberbuddy.description', ctaKey: 'womens_safety_page.resources.cyberbuddy.cta', href: '/chat', icon: MessageCircle },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('womens_safety_page.title')}</h1>
        <p className="text-muted-foreground">{t('womens_safety_page.description')}</p>
      </div>

      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <HeartHandshake /> {t('womens_safety_page.main_card.title')}
          </CardTitle>
          <CardDescription>{t('womens_safety_page.main_card.description')}</CardDescription>
        </CardHeader>
      </Card>

      <section>
        <h2 className="text-2xl font-bold mb-4">{t('womens_safety_page.threats.title')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {learnTopics.map((topic) => {
             const Icon = topic.icon;
             return (
                <Link href={`/learn/${topic.slug}?from=/womens-safety`} key={topic.slug} className="group">
                    <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/50 group-hover:-translate-y-1">
                        <CardHeader className="flex-row items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Icon className="h-6 w-6 text-primary" />
                            </div>
                        <CardTitle className="text-xl">{t(topic.titleKey)}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{t(topic.descriptionKey)}</p>
                        </CardContent>
                         <CardFooter>
                            <p className="text-sm font-medium text-primary flex items-center">
                                {t('learn_page.learn_more')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </p>
                        </CardFooter>
                    </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">{t('womens_safety_page.resources.title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
         {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Card key={resource.titleKey} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                     <div className="bg-primary/10 p-4 rounded-full">
                       <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">{t(resource.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-muted-foreground">{t(resource.descriptionKey)}</p>
                </CardContent>
                <CardFooter className="justify-center">
                   <Button asChild>
                      <Link href={resource.href}>{t(resource.ctaKey)}</Link>
                   </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  );
}
