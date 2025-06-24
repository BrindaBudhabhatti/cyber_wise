'use client';

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Fish, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";

export default function GamesPage() {
  const { t } = useTranslation();

  const games: {
    slug: string;
    titleKey: string;
    descriptionKey: string;
    icon: LucideIcon;
    href: string;
  }[] = [
    {
      slug: 'phishing-spotter',
      titleKey: 'game.phishing_spotter.title',
      descriptionKey: 'games.phishing_spotter.description',
      icon: Fish,
      href: '/games/phishing-spotter',
    },
    {
      slug: 'password-challenge',
      titleKey: 'games.password_challenge.title',
      descriptionKey: 'games.password_challenge.description',
      icon: Lock,
      href: '/games/password-strength-challenge',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('games_page.title')}</h1>
        <p className="text-muted-foreground">
          {t('games_page.description')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link href={game.href} key={game.slug} className="group">
            <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/50 group-hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <game.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t(game.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{t(game.descriptionKey)}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <p className="text-sm font-medium text-primary flex items-center">
                  {t('games.play_game')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
