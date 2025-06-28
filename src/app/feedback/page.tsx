'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';

export default function FeedbackPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) {
      toast({
        title: t('feedback_page.toast.error_title'),
        description: t('feedback_page.toast.error_description'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    const subject = t('feedback_page.email.subject', { name });
    const body = t('feedback_page.email.body', {
      name: name,
      contact: contact || 'Not provided',
      feedback: feedback,
    });

    const mailtoLink = `mailto:brinda.budhabhatti@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    toast({
      title: t('feedback_page.toast.success_title'),
      description: t('feedback_page.toast.success_description'),
    });

    setTimeout(() => {
      setName('');
      setContact('');
      setFeedback('');
      setIsSubmitting(false);
    }, 1000);
  };

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
