
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, ShieldAlert, AlertTriangle, KeyRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type BreachResult = {
  status: 'breached' | 'not_breached' | 'error' | 'initial';
  data: number | null;
  message?: string;
}

export default function BreachCheckerPage() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BreachResult>({ status: 'initial', data: null });
  const { toast } = useToast();

  const handlePasswordCheck = async () => {
    if (!password.trim()) {
        toast({
            title: t('breach_checker.toast.no_password_title'),
            description: t('breach_checker.toast.no_password_description'),
            variant: 'destructive',
        });
        return;
    }
    setIsLoading(true);
    setResult({ status: 'initial', data: null });
    
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        const prefix = hashHex.substring(0, 5);
        const suffix = hashHex.substring(5).toUpperCase();

        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }
        
        const text = await response.text();
        const lines = text.split('\n');
        let pwnCount = 0;

        for (const line of lines) {
            const [hashSuffix, count] = line.split(':');
            if (hashSuffix === suffix) {
                pwnCount = parseInt(count.trim(), 10);
                break;
            }
        }
        
        if (pwnCount > 0) {
            setResult({ status: 'breached', data: pwnCount });
        } else {
            setResult({ status: 'not_breached', data: 0 });
        }

    } catch (error) {
        console.error('Password check error:', error);
        setResult({ status: 'error', data: null, message: t('breach_checker.results.error_description') });
    } finally {
        setIsLoading(false);
    }
  };

  const ResultCard = () => {
    if (isLoading) {
       return (
        <Card className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">{t('breach_checker.results.loading')}</p>
        </Card>
      );
    }

    if (result.status === 'initial') return null;

    if (result.status === 'breached') {
        return (
            <Card className="border-destructive bg-destructive/10">
            <CardHeader className="text-center">
                <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle className="text-destructive">{t('breach_checker.results.password.pwned_title')}</CardTitle>
                <CardDescription>{t('breach_checker.results.password.pwned_description', { count: (result.data as number).toLocaleString() })}</CardDescription>
            </CardHeader>
        </Card>
        )
    }

    if (result.status === 'not_breached') {
        return (
            <Card className="border-success bg-success/10">
                <CardHeader className="text-center">
                    <ShieldCheck className="h-12 w-12 text-success mx-auto mb-4" />
                    <CardTitle className="text-success">{t('breach_checker.results.password.not_pwned_title')}</CardTitle>
                    <CardDescription>{t('breach_checker.results.password.not_pwned_description')}</CardDescription>
                </CardHeader>
            </Card>
        )
    }
    
     if (result.status === 'error') {
        return (
             <Card className="border-destructive bg-destructive/10">
                <CardHeader className="text-center">
                    <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <CardTitle className="text-destructive">{t('breach_checker.results.error_title')}</CardTitle>
                    <CardDescription>{result.message}</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('breach_checker.title')}</h1>
        <p className="text-muted-foreground">{t('breach_checker.description')}</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>{t('breach_checker.password.card_title')}</CardTitle>
            <CardDescription>{t('breach_checker.password.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('breach_checker.password.placeholder')}
                className="text-base"
                disabled={isLoading}
                type="password"
            />
                <Button onClick={handlePasswordCheck} disabled={isLoading || !password.trim()} className="w-full sm:w-auto">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
                {t('breach_checker.password.button')}
            </Button>
            </div>
            <p className="text-xs text-muted-foreground">{t('breach_checker.password.anonymity_note')}</p>
        </CardContent>
      </Card>
      
      <ResultCard />

    </div>
  );
}
