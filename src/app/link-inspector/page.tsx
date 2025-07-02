
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { analyzeThreat, type ThreatAnalyzerOutput } from '@/ai/flows/threat-analyzer-flow';
import { Loader2, ShieldAlert, ShieldCheck, ShieldQuestion, Link as LinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function LinkInspectorPage() {
  const { t } = useTranslation();
  const [linkUrl, setLinkUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ThreatAnalyzerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!linkUrl.trim()) {
      toast({
        title: t('link_inspector_page.toast.no_link_title'),
        description: t('link_inspector_page.toast.no_link_description'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeThreat({ content: linkUrl, type: 'link' });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Threat analysis error:', error);
      toast({
        title: t('link_inspector_page.toast.error_title'),
        description: t('link_inspector_page.toast.error_description'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getResultIcon = () => {
    if (!analysisResult) return <ShieldQuestion className="h-12 w-12 text-muted-foreground" />;
    if (!analysisResult.isSuspicious) return <ShieldCheck className="h-12 w-12 text-success" />;
    return <ShieldAlert className="h-12 w-12 text-destructive" />;
  };
  
  const getResultTitle = () => {
     if (!analysisResult) return t('link_inspector_page.results.waiting_title');
     if (!analysisResult.isSuspicious) return t('link_inspector_page.results.safe_title');
     return t('link_inspector_page.results.suspicious_title');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('link_inspector_page.title')}</h1>
        <p className="text-muted-foreground">{t('link_inspector_page.description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('link_inspector_page.card_title')}</CardTitle>
          <CardDescription>{t('link_inspector_page.card_description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder={t('link_inspector_page.placeholder')}
              className="text-base"
              disabled={isLoading}
              type="url"
          />
          <Button onClick={handleSubmit} disabled={isLoading || !linkUrl.trim()} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LinkIcon className="mr-2 h-4 w-4" />}
              {t('link_inspector_page.analyze_button')}
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">{t('link_inspector_page.loading_text')}</p>
        </Card>
      )}

      {analysisResult && (
        <Card>
          <CardHeader className="text-center">
             <div className="mx-auto mb-4">
                {getResultIcon()}
            </div>
            <CardTitle className="text-2xl">{getResultTitle()}</CardTitle>
            <CardDescription>
              {t('link_inspector_page.results.confidence')}: {analysisResult.confidenceScore}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <h3 className="font-semibold">{t('link_inspector_page.results.threat_type')}</h3>
                 <Badge variant={analysisResult.isSuspicious ? 'destructive' : 'default'} className={cn(!analysisResult.isSuspicious && "bg-success hover:bg-success/90")}>
                    {analysisResult.threatType}
                </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">{t('link_inspector_page.results.red_flags')}</h3>
              {analysisResult.redFlags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysisResult.redFlags.map((flag, index) => (
                    <Badge key={index} variant="secondary">
                      {flag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('link_inspector_page.results.no_red_flags')}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">{t('link_inspector_page.results.detailed_analysis')}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysisResult.analysis}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
