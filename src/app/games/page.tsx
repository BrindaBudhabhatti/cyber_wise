
'use client';

import { PhishingSpotterGame } from "@/components/phishing-spotter-game";
import { useTranslation } from "react-i18next";

export default function GamesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold">{t('games_page.title')}</h1>
        <p className="text-muted-foreground">
          {t('games_page.description')}
        </p>
      </div>
      <PhishingSpotterGame />
    </div>
  );
}
