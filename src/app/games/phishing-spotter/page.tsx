'use client';

import { PhishingSpotterGame } from "@/components/phishing-spotter-game";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function PhishingSpotterPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/games">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('games.back_to_games')}
        </Link>
      </Button>
      <PhishingSpotterGame />
    </div>
  );
}
