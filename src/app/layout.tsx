import type {Metadata} from 'next';
import './globals.css';
import {MainLayout} from '@/components/main-layout';
import {Toaster} from '@/components/ui/toaster';
import { I18nProvider } from '@/components/i18n-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import { ExitIntentDialog } from '@/components/exit-intent-dialog';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CyberWise',
  description: 'Your guide to cyber safety and Indian cyber laws.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <MainLayout>{children}</MainLayout>
            <Toaster />
            <ExitIntentDialog />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
