'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Eye, EyeOff, CheckCircle2, XCircle, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

type StrengthCriteria = {
  text: string;
  test: (password: string) => boolean;
};

export default function PasswordChallengePage() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const criteria: StrengthCriteria[] = useMemo(() => [
    { text: t('games.password_challenge.criteria.length'), test: (p) => p.length >= 8 },
    { text: t('games.password_challenge.criteria.uppercase'), test: (p) => /[A-Z]/.test(p) },
    { text: t('games.password_challenge.criteria.lowercase'), test: (p) => /[a-z]/.test(p) },
    { text: t('games.password_challenge.criteria.number'), test: (p) => /[0-9]/.test(p) },
    { text: t('games.password_challenge.criteria.special'), test: (p) => /[^A-Za-z0-9]/.test(p) },
  ], [t]);
  
  const strength = useMemo(() => {
    let score = 0;
    if (password.length > 0) {
        criteria.forEach(c => {
            if (c.test(password)) {
                score++;
            }
        });
    }
    return score;
  }, [password, criteria]);

  const strengthPercentage = (strength / criteria.length) * 100;

  const getStrengthLabel = () => {
    if (password.length === 0) return t('games.password_challenge.strength.start');
    if (strength < 3) return t('games.password_challenge.strength.weak');
    if (strength < 5) return t('games.password_challenge.strength.medium');
    return t('games.password_challenge.strength.strong');
  };

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/games">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('games.back_to_games')}
        </Link>
      </Button>

      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <LockKeyhole className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-2xl">{t('games.password_challenge.title')}</CardTitle>
          <CardDescription>{t('games.password_challenge.intro')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('games.password_challenge.placeholder')}
              className="pr-10 text-lg"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>

          <div>
            <Progress
              value={strengthPercentage}
              className={cn(
                'h-3 transition-all',
                strengthPercentage > 0 && strength < 3 && 'bg-destructive',
                strength >= 3 && strength < 5 && '[&>div]:bg-yellow-500',
                strength === 5 && '[&>div]:bg-success'
              )}
            />
            <p className="text-sm font-medium text-center mt-2">{getStrengthLabel()}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {criteria.map((criterion) => {
              const isMet = password.length > 0 && criterion.test(password);
              return (
                <div key={criterion.text} className="flex items-center gap-2">
                  {isMet ? (
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className={cn('text-sm', isMet ? 'text-foreground' : 'text-muted-foreground')}>
                    {criterion.text}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            {t('games.password_challenge.footer_note')}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
