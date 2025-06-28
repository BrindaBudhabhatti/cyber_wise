'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Send, Star, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

type SubmittedData = {
  name: string;
  contact: string;
  feedback: string;
  rating: number;
};

export default function FeedbackPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const handleReset = () => {
    setName('');
    setContact('');
    setFeedback('');
    setRating(0);
    setSubmittedData(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim() || rating === 0) {
      toast({
        title: t('feedback_page.toast.error_title'),
        description: t('feedback_page.toast.error_description_v2'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmittedData({ name, contact, feedback, rating });
      setIsSubmitting(false);
    }, 1000);
  };

  if (submittedData) {
    const subject = t('feedback_page.email.subject', { name: submittedData.name });
    const body = t('feedback_page.email.body_with_rating', {
      name: submittedData.name,
      rating: submittedData.rating,
      contact: submittedData.contact || 'Not provided',
      feedback: submittedData.feedback,
    });
    const mailtoLink = `mailto:brinda.budhabhatti@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <Card className="max-w-2xl w-full">
            <CardHeader className="items-center">
                <PartyPopper className="h-16 w-16 text-primary" />
                <CardTitle className="text-3xl">{t('feedback_page.thank_you.title')}</CardTitle>
                <CardDescription className="text-base">
                  {t('feedback_page.thank_you.description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-center gap-4">
                 <Button asChild size="lg">
                    <a href={mailtoLink}>{t('feedback_page.thank_you.open_email')}</a>
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                    {t('feedback_page.thank_you.submit_another')}
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('feedback_page.title')}</h1>
        <p className="text-muted-foreground">{t('feedback_page.description')}</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('feedback_page.form_title')}</CardTitle>
          <CardDescription>{t('feedback_page.form_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('feedback_page.labels.name')}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('feedback_page.placeholders.name')}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">{t('feedback_page.labels.contact')}</Label>
              <Input
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t('feedback_page.placeholders.contact')}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
                <Label>{t('feedback_page.labels.rating')}</Label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={cn(
                                "h-8 w-8 cursor-pointer transition-colors hover:text-yellow-400",
                                rating >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
                            )}
                            onClick={() => !isSubmitting && setRating(star)}
                        />
                    ))}
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">{t('feedback_page.labels.feedback')}</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t('feedback_page.placeholders.feedback')}
                required
                className="min-h-[150px]"
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? t('feedback_page.button_submitting') : t('feedback_page.button_submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
