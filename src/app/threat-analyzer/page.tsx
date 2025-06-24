'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { analyzeThreat, type ThreatAnalyzerOutput } from '@/ai/flows/threat-analyzer-flow';
import { Loader2, ScanLine, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ThreatAnalyzerPage() {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ThreatAnalyzerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        title: t('threat_analyzer.toast.no_message_title'),
        description: t('threat_analyzer.toast.no_message_description'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeThreat({ message });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Threat analysis error:', error);
      toast({
        title: t('threat_analyzer.toast.error_title'),
        description: t('threat_analyzer.toast.error_description'),
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
     if (!analysisResult) return t('threat_analyzer.results.waiting_title');
     if (!analysisResult.isSuspicious) return t('threat_analyzer.results.safe_title');
     return t('threat_analyzer.results.suspicious_title');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('threat_analyzer.title')}</h1>
        <p className="text-muted-foreground">{t('threat_analyzer.description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('threat_analyzer.card_title')}</CardTitle>
          <CardDescription>{t('threat_analyzer.card_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('threat_analyzer.placeholder')}
              className="min-h-[150px] text-base"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !message.trim()} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('threat_analyzer.analyzing_button')}
                </>
              ) : (
                <>
                  <ScanLine className="mr-2 h-4 w-4" />
                  {t('threat_analyzer.analyze_button')}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">{t('threat_analyzer.loading_text')}</p>
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
              {t('threat_analyzer.results.confidence')}: {analysisResult.confidenceScore}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <h3 className="font-semibold">{t('threat_analyzer.results.threat_type')}</h3>
                 <Badge variant={analysisResult.isSuspicious ? 'destructive' : 'default'} className={cn(!analysisResult.isSuspicious && "bg-success hover:bg-success/90")}>
                    {analysisResult.threatType}
                </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">{t('threat_analyzer.results.red_flags')}</h3>
              {analysisResult.redFlags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysisResult.redFlags.map((flag, index) => (
                    <Badge key={index} variant="secondary">
                      {flag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('threat_analyzer.results.no_red_flags')}</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">{t('threat_analyzer.results.detailed_analysis')}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysisResult.analysis}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
