'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from './ui/scroll-area';
import { Info } from 'lucide-react';

export function AboutDeveloperDialog() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
            <Info className="mr-2 h-4 w-4" />
            {t('footer.about_developer')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t('about_dialog.title')}</DialogTitle>
          <DialogDescription>
            {t('about_dialog.name')} - {t('about_dialog.role')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
            <div className="space-y-4 text-sm text-muted-foreground">
                <p className='font-semibold text-foreground'>🔐 {t('about_dialog.intro_title')}</p>
                <p>{t('about_dialog.intro_p1')}</p>

                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 pt-4">
                    🚨 {t('about_dialog.cyberbuddy.title')}
                </h3>
                <p>{t('about_dialog.cyberbuddy.p1')}</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>{t('about_dialog.cyberbuddy.l1')}</li>
                    <li>{t('about_dialog.cyberbuddy.l2')}</li>
                    <li>{t('about_dialog.cyberbuddy.l3')}</li>
                    <li>{t('about_dialog.cyberbuddy.l4')}</li>
                    <li>{t('about_dialog.cyberbuddy.l5')}</li>
                </ul>

                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 pt-4">
                    🧠 {t('about_dialog.cyberwise.title')}
                </h3>
                <p>{t('about_dialog.cyberwise.p1')}</p>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
