'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const SESSION_STORAGE_KEY = 'cyberwise-exit-intent-shown';

export function ExitIntentDialog() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
        return;
      }
      
      if (e.clientY <= 0) {
        setIsOpen(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        document.removeEventListener('mouseout', handleMouseOut);
      }
    };

    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const handleFeedbackClick = () => {
    router.push('/feedback');
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('exit_intent.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('exit_intent.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('exit_intent.button_cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleFeedbackClick}>
            {t('exit_intent.button_feedback')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
