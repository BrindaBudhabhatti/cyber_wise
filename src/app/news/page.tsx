'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { getCyberNews, type NewsArticle } from '@/ai/flows/news-aggregator-flow';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';

type NewsCategory = 'Global' | 'Local';

export default function NewsPage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<NewsCategory>('Global');
  const { toast } = useToast();

  const fetchNews = useCallback(async (category: NewsCategory) => {
    setIsLoading(true);
    try {
      const result = await getCyberNews({ category });
      setArticles(result.articles);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      toast({
        title: t('news_page.error_title'),
        description: t('news_page.error_description'),
        variant: 'destructive',
      });
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast, t]);

  useEffect(() => {
    fetchNews(activeTab);
  }, [activeTab, fetchNews]);

  const NewsSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('news_page.title')}</h1>
        <p className="text-muted-foreground">{t('news_page.description')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as NewsCategory)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/3">
          <TabsTrigger value="Global">{t('news_page.global')}</TabsTrigger>
          <TabsTrigger value="Local">{t('news_page.local')}</TabsTrigger>
        </TabsList>
        <TabsContent value="Global">
          {isLoading ? <NewsSkeleton /> : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>
                      {article.source} - {article.publishedDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{article.summary}</p>
                    <div className="flex justify-end">
                      <Button asChild variant="ghost" size="sm">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          {t('news_page.read_more')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="Local">
           {isLoading ? <NewsSkeleton /> : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>
                      {article.source} - {article.publishedDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{article.summary}</p>
                    <div className="flex justify-end">
                       <Button asChild variant="ghost" size="sm">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          {t('news_page.read_more')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
