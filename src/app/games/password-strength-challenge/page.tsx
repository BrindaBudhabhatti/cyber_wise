'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function PasswordChallengePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
       <Button asChild variant="outline">
        <Link href="/games">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('games.back_to_games')}
        </Link>
      </Button>
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{t('games.password_challenge.title')}</CardTitle>
          <CardDescription>{t('games.password_challenge.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <Construction className="mx-auto h-20 w-20 text-primary" />
          <p className="text-lg text-muted-foreground">{t('games.coming_soon')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
