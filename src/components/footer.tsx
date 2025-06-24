'use client';

import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
  ];

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <Button key={social.name} variant="ghost" size="icon" asChild>
              <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                <social.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
