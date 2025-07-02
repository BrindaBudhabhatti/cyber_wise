
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { checkEmailBreach, type BreachCheckOutput, type Breach } from '@/ai/flows/breach-checker-flow';
import { Loader2, ShieldX, ShieldCheck, ShieldAlert, AlertTriangle, KeyRound, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

type BreachResult = {
  type: 'email' | 'password';
  status: 'breached' | 'not_breached' | 'error' | 'key_missing' | 'initial';
  data: Breach[] | number | null;
  message?: string;
}

export default function BreachCheckerPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BreachResult>({ type: 'email', status: 'initial', data: null });
  const { toast } = useToast();
  
  const handleEmailCheck = async () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: t('breach_checker.toast.invalid_email_title'),
        description: t('breach_checker.toast.invalid_email_description'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult({ type: 'email', status: 'initial', data: null });

    try {
      const response = await checkEmailBreach({ email });
      if (response.status === 'breached') {
        setResult({ type: 'email', status: 'breached', data: response.breaches || [] });
      } else {
        setResult({ type: 'email', status: response.status, data: null, message: response.message });
      }
    } catch (error) {
      console.error('Breach check error:', error);
      setResult({ type: 'email', status: 'error', data: null, message: t('breach_checker.results.error_description') });
    } finally {
      setIsLoading(false);
    }
  };

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
    setResult({ type: 'password', status: 'initial', data: null });
    
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
            setResult({ type: 'password', status: 'breached', data: pwnCount });
        } else {
            setResult({ type: 'password', status: 'not_breached', data: 0 });
        }

    } catch (error) {
        console.error('Password check error:', error);
        setResult({ type: 'password', status: 'error', data: null, message: t('breach_checker.results.error_description') });
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

    if (result.type === 'email') {
        if (result.status === 'key_missing') {
             return (
                <Card className="border-yellow-500/50 bg-yellow-500/10">
                    <CardHeader className="text-center">
                        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                        <CardTitle className="text-yellow-600">{t('breach_checker.email.key_missing_title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-yellow-700">
                        {t('breach_checker.email.key_missing_description')}
                    </CardContent>
                </Card>
            )
        }
        if (result.status === 'breached') {
            const breaches = result.data as Breach[];
            return (
                 <Card className="border-destructive bg-destructive/10">
                    <CardHeader className="text-center">
                        <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-4" />
                        <CardTitle className="text-destructive">{t('breach_checker.results.email.breached_title')}</CardTitle>
                        <CardDescription>{t('breach_checker.results.email.breached_description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {breaches.map(breach => (
                            <Card key={breach.Name}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{breach.Title}</CardTitle>
                                    <CardDescription>
                                        {t('breach.breach_date')}: {format(new Date(breach.BreachDate), 'MMMM d, yyyy')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: breach.Description }} />
                                    <h4 className="font-semibold mt-4 mb-2 text-sm">{t('breach.data_classes')}:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {breach.DataClasses.map(dc => <Badge key={dc} variant="secondary">{dc}</Badge>)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            )
        }
         if (result.status === 'not_breached') {
            return (
                <Card className="border-success bg-success/10">
                    <CardHeader className="text-center">
                        <ShieldCheck className="h-12 w-12 text-success mx-auto mb-4" />
                        <CardTitle className="text-success">{t('breach_checker.results.email.not_breached_title')}</CardTitle>
                        <CardDescription>{t('breach_checker.results.email.not_breached_description')}</CardDescription>
                    </CardHeader>
                </Card>
            )
        }
    }

    if (result.type === 'password') {
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
        <Tabs defaultValue="password" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">{t('breach_checker.tabs.email')}</TabsTrigger>
                <TabsTrigger value="password">{t('breach_checker.tabs.password')}</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
                <TabsContent value="email" className="space-y-4">
                     <p className="text-sm text-muted-foreground">{t('breach_checker.email.description')}</p>
                     <div className="flex flex-col sm:flex-row gap-2">
                         <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('breach_checker.email.placeholder')}
                            className="text-base"
                            disabled={isLoading}
                            type="email"
                        />
                         <Button onClick={handleEmailCheck} disabled={isLoading || !email.trim()} className="w-full sm:w-auto">
                            {isLoading && result.type === 'email' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                            {t('breach_checker.email.button')}
                        </Button>
                     </div>
                </TabsContent>
                <TabsContent value="password" className="space-y-4">
                     <p className="text-sm text-muted-foreground">{t('breach_checker.password.description')}</p>
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
                            {isLoading && result.type === 'password' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
                            {t('breach_checker.password.button')}
                        </Button>
                      </div>
                     <p className="text-xs text-muted-foreground">{t('breach_checker.password.anonymity_note')}</p>
                </TabsContent>
            </CardContent>
        </Tabs>
      </Card>
      
      <ResultCard />

    </div>
  );
}

    
