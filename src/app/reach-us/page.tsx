
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ReachUsPage() {
  const { t } = useTranslation();

  // IMPORTANT: This is a placeholder embed link.
  // 1. Go to Google Maps and search for "Cyber Crime Police Station Jamnagar".
  // 2. Click the "Share" button.
  // 3. Go to the "Embed a map" tab.
  // 4. Click "COPY HTML" and paste the URL from the `src` attribute below.
  const googleMapsEmbedUrl = "https://www.google.com/maps/place/Cyber+Crime+Police+Station+Jamnagar/@22.477606,70.0438323,17z/data=!3m1!4b1!4m6!3m5!1s0x395715bccecc87b3:0xfe5bca95d74b78a8!8m2!3d22.477606!4d70.0464072!16s%2Fg%2F11rn007xvl?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('reach_us_page.title')}</h1>
        <p className="text-muted-foreground">
          {t('reach_us_page.description')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{t('reach_us_page.contact_card.title')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">{t('reach_us_page.contact_card.address_title')}</h3>
                <p className="text-muted-foreground">
                  {t('reach_us_page.contact_card.address_content')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">{t('reach_us_page.contact_card.phone_title')}</h3>
                <p className="text-muted-foreground">
                  {t('reach_us_page.contact_card.phone_content')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{t('reach_us_page.map_card.title')}</CardTitle>
            <CardDescription>{t('reach_us_page.map_card.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location of Cyber Crime Police Station Jamnagar"
                className="rounded-md"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
