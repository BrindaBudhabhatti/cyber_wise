
'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ToyBrick, Gamepad2, Smartphone, Users, BookOpen, ArrowRight, Video, ShieldQuestion, Bot, HeartHandshake, CameraOff, UserX, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  titleKey: string;
  descriptionKey: string;
  Icon: LucideIcon;
  href?: string;
  ctaKey?: string;
  comingSoon?: boolean;
};

const FeatureCard = ({ titleKey, descriptionKey, Icon, href, ctaKey, comingSoon }: FeatureCardProps) => {
  const { t } = useTranslation();
  return (
     <Card className="flex flex-col h-full shadow-md transition-transform hover:scale-105 hover:shadow-primary/20">
      <CardHeader className="flex-row items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle>{t(titleKey)}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{t(descriptionKey)}</p>
      </CardContent>
      <CardFooter>
        {href && ctaKey && (
          <Button asChild className="w-full" disabled={comingSoon}>
            <Link href={href}>
              {t(ctaKey)} {!comingSoon && <ArrowRight className="ml-2 h-4 w-4" />}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default function CyberWiseKidsPage() {
  const { t } = useTranslation();

  const littleExplorersFeatures: FeatureCardProps[] = [
    { titleKey: 'kids_page.explorers.story.title', descriptionKey: 'kids_page.explorers.story.description', Icon: BookOpen, href: '#', ctaKey: 'kids_page.explorers.story.cta', comingSoon: true },
    { titleKey: 'kids_page.explorers.coloring.title', descriptionKey: 'kids_page.explorers.coloring.description', Icon: ToyBrick, href: '#', ctaKey: 'kids_page.explorers.coloring.cta', comingSoon: true },
  ];
  
  const smartLearnersFeatures: FeatureCardProps[] = [
    { titleKey: 'kids_page.learners.game.title', descriptionKey: 'kids_page.learners.game.description', Icon: Gamepad2, href: '/games', ctaKey: 'kids_page.learners.game.cta' },
    { titleKey: 'kids_page.comics.selfie.title', descriptionKey: 'kids_page.comics.selfie.description', Icon: CameraOff, href: '#', ctaKey: 'kids_page.comics.cta', comingSoon: true },
    { titleKey: 'kids_page.comics.friend.title', descriptionKey: 'kids_page.comics.friend.description', Icon: UserX, href: '#', ctaKey: 'kids_page.comics.cta', comingSoon: true },
    { titleKey: 'kids_page.comics.gaming.title', descriptionKey: 'kids_page.comics.gaming.description', Icon: Trophy, href: '#', ctaKey: 'kids_page.comics.cta', comingSoon: true },
  ];
  
  const cyberTeensFeatures: FeatureCardProps[] = [
    { titleKey: 'kids_page.teens.reels.title', descriptionKey: 'kids_page.teens.reels.description', Icon: Video, href: '#', ctaKey: 'kids_page.teens.reels.cta', comingSoon: true },
    { titleKey: 'kids_page.teens.quiz.title', descriptionKey: 'kids_page.teens.quiz.description', Icon: ShieldQuestion, href: '/quiz', ctaKey: 'kids_page.teens.quiz.cta' },
    { titleKey: 'kids_page.teens.chatbot.title', descriptionKey: 'kids_page.teens.chatbot.description', Icon: Bot, href: '/chat', ctaKey: 'kids_page.teens.chatbot.cta' },
    { titleKey: 'kids_page.teens.mental_health.title', descriptionKey: 'kids_page.teens.mental_health.description', Icon: HeartHandshake, href: '/report', ctaKey: 'kids_page.teens.mental_health.cta' },
  ];

  const parentFeatures: FeatureCardProps[] = [
     { titleKey: 'kids_page.parents.guides.title', descriptionKey: 'kids_page.parents.guides.description', Icon: BookOpen, href: '/learn', ctaKey: 'kids_page.parents.guides.cta' },
     { titleKey: 'kids_page.parents.checklist.title', descriptionKey: 'kids_page.parents.checklist.description', Icon: Users, href: '#', ctaKey: 'kids_page.parents.checklist.cta', comingSoon: true },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t('kids_page.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('kids_page.description')}</p>
      </div>

      <Tabs defaultValue="age_8_12" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="age_4_7" className="whitespace-normal"><ToyBrick className="mr-2"/> {t('kids_page.explorers.tab')}</TabsTrigger>
          <TabsTrigger value="age_8_12" className="whitespace-normal"><Gamepad2 className="mr-2"/> {t('kids_page.learners.tab')}</TabsTrigger>
          <TabsTrigger value="age_13_17" className="whitespace-normal"><Smartphone className="mr-2"/> {t('kids_page.teens.tab')}</TabsTrigger>
          <TabsTrigger value="parents" className="whitespace-normal"><Users className="mr-2"/> {t('kids_page.parents.tab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="age_4_7" className="mt-6">
           <Card className="bg-card">
            <CardHeader>
              <CardTitle>{t('kids_page.explorers.title')}</CardTitle>
              <CardDescription>{t('kids_page.explorers.description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                {littleExplorersFeatures.map(feature => <FeatureCard key={feature.titleKey} {...feature} />)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="age_8_12" className="mt-6">
           <Card className="bg-card">
            <CardHeader>
              <CardTitle>{t('kids_page.learners.title')}</CardTitle>
              <CardDescription>{t('kids_page.learners.description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {smartLearnersFeatures.map(feature => <FeatureCard key={feature.titleKey} {...feature} />)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="age_13_17" className="mt-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>{t('kids_page.teens.title')}</CardTitle>
              <CardDescription>{t('kids_page.teens.description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                {cyberTeensFeatures.map(feature => <FeatureCard key={feature.titleKey} {...feature} />)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parents" className="mt-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>{t('kids_page.parents.title')}</CardTitle>
              <CardDescription>{t('kids_page.parents.description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              {parentFeatures.map(feature => <FeatureCard key={feature.titleKey} {...feature} />)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
