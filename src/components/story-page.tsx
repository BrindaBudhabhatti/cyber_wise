
'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import type { Story } from '@/lib/stories-data';

export function StoryPage({ story }: { story: Story }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/cyberwise-kids">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('story.back_button')}
        </Link>
      </Button>
      
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="bg-primary/10 p-6 text-center">
          <CardTitle className="text-3xl font-bold text-primary">{t(story.titleKey)}</CardTitle>
          <CardDescription className="text-lg">{t(story.descriptionKey)}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">
          {story.content.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-6 md:gap-8 even:md:flex-row-reverse">
              <div className="md:w-1/2">
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {t(item.textKey)}
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={item.imageUrl}
                  alt={`Illustration for story part ${index + 1}`}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md aspect-video object-cover"
                  data-ai-hint={item.imageHint}
                />
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="bg-muted p-6">
            <div className="flex items-start gap-4">
                <Lightbulb className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-lg">{t('learn_detail_page.safety_tips')}</h3>
                    <p className="text-muted-foreground font-medium">{t(story.takeawayKey)}</p>
                </div>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
