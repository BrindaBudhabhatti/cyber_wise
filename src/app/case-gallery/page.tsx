
'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { solvedCases, victimTestimonials } from '@/lib/case-gallery-data';
import { Heart, Scale, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CaseGalleryPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('solved-cases');
  const [likedStories, setLikedStories] = useState<number[]>([]);

  const allTags = [...new Set(solvedCases.flatMap(c => c.tags))];
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredCases = activeTag ? solvedCases.filter(c => c.tags.includes(activeTag)) : solvedCases;

  const toggleLike = (id: number) => {
    setLikedStories(prev => 
        prev.includes(id) ? prev.filter(storyId => storyId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('case_gallery_page.title')}</h1>
        <p className="text-muted-foreground">{t('case_gallery_page.description')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solved-cases">
            <Scale className="mr-2 h-4 w-4" />
            {t('case_gallery_page.solved_cases.tab_title')}
          </TabsTrigger>
          <TabsTrigger value="victim-voices">
             <MessageSquareQuote className="mr-2 h-4 w-4" />
             {t('case_gallery_page.victim_voices.tab_title')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="solved-cases" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{t('case_gallery_page.solved_cases.filter_by_tag')}</h2>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={!activeTag ? 'default' : 'secondary'} 
                onClick={() => setActiveTag(null)}
                size="sm"
              >
                {t('case_gallery_page.solved_cases.all_tags')}
              </Button>
              {allTags.map(tag => (
                <Button 
                  key={tag} 
                  variant={activeTag === tag ? 'default' : 'secondary'}
                  onClick={() => setActiveTag(tag)}
                  size="sm"
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map(caseItem => (
              <Card key={caseItem.id} className="flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{t(caseItem.titleKey)} ({caseItem.year})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{t('case_gallery_page.solved_cases.summary')}</h4>
                    <p className="text-muted-foreground text-sm">{t(caseItem.summaryKey)}</p>
                  </div>
                   <div>
                    <h4 className="font-semibold text-sm mb-1">{t('case_gallery_page.solved_cases.tools_used')}</h4>
                    <p className="text-muted-foreground text-sm">{caseItem.toolsUsed.join(', ')}</p>
                  </div>
                   <div>
                    <h4 className="font-semibold text-sm mb-1">{t('case_gallery_page.solved_cases.outcome')}</h4>
                    <p className="text-muted-foreground text-sm">{t(caseItem.outcomeKey)}</p>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {caseItem.tags.map(tag => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="victim-voices" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {victimTestimonials.map(testimonial => (
              <Card key={testimonial.id} className="bg-muted/50 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{t(testimonial.aliasKey)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                   <p className="italic text-card-foreground">"{t(testimonial.storyKey)}"</p>
                   <div>
                        <h4 className="font-semibold text-sm">{t('case_gallery_page.victim_voices.help_received')}</h4>
                        <p className="text-sm text-muted-foreground">{t(testimonial.helpKey)}</p>
                   </div>
                     <div>
                        <h4 className="font-semibold text-sm">{t('case_gallery_page.victim_voices.their_message')}</h4>
                        <p className="text-sm text-muted-foreground">{t(testimonial.messageKey)}</p>
                   </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleLike(testimonial.id)}
                    >
                       <Heart className={cn("mr-2 h-4 w-4", likedStories.includes(testimonial.id) && "fill-red-500 text-red-500")} /> 
                       {t('case_gallery_page.victim_voices.like_button')}
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
