
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ReportPage() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('report.title')}</h1>
        <p className="text-muted-foreground">
          {t('report.description')}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('report.steps_card.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t('report.steps_card.step1_trigger')}</AccordionTrigger>
              <AccordionContent>
                {t('report.steps_card.step1_content')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                {t('report.steps_card.step2_trigger')}
              </AccordionTrigger>
              <AccordionContent>
                {t('report.steps_card.step2_content_1')}{" "}
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  cybercrime.gov.in
                </a>
                . {t('report.steps_card.step2_content_2')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                {t('report.steps_card.step3_trigger')}
              </AccordionTrigger>
              <AccordionContent>
                {t('report.steps_card.step3_content')}
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>
                {t('report.steps_card.step4_trigger')}
              </AccordionTrigger>
              <AccordionContent>
                {t('report.steps_card.step4_content')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                {t('report.steps_card.step5_trigger')}
              </AccordionTrigger>
              <AccordionContent>
                {t('report.steps_card.step5_content')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card className="border-destructive bg-destructive/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle /> {t('report.emergency_card.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-semibold">
                {t('report.emergency_card.helpline_title')}
              </p>
              <p className="text-muted-foreground">1930</p>
            </div>
          </div>
           <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-semibold">{t('report.emergency_card.portal_title')}</p>
              <p className="text-muted-foreground">
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  https://cybercrime.gov.in
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
