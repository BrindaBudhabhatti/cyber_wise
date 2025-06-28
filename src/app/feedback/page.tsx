
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function FeedbackPage() {
  const { t } = useTranslation();
  
  // IMPORTANT: Replace this with your actual Google Form embed link.
  // 1. Create your form in Google Forms.
  // 2. Click the "Send" button in the top right.
  // 3. Go to the "<>" (Embed HTML) tab.
  // 4. Copy the URL from the `src` attribute of the iframe code.
  // 5. Paste the URL into the googleFormEmbedUrl variable below.
  const googleFormEmbedUrl = "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform?embedded=true";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('feedback_page.title')}</h1>
        <p className="text-muted-foreground">{t('feedback_page.description')}</p>
      </div>

      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle>{t('feedback_page.form_title')}</CardTitle>
          <CardDescription>
            Please fill out the form below. Your responses will be recorded directly in our Google Sheet!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full" style={{height: '800px'}}>
             <iframe
              src={googleFormEmbedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Feedback Form"
              className="rounded-md"
            >
              Loading…
            </iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
