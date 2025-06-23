'use client';

import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export function PageTitle() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const menuItems = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/learn', labelKey: 'nav.learn' },
    { href: '/quiz', labelKey: 'nav.quiz' },
    { href: '/report', labelKey: 'nav.report' },
    { href: '/awareness', labelKey: 'nav.awareness' },
    { href: '/chat', labelKey: 'nav.cyberbuddy' },
  ];

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.href === '/' && pathname === item.href) {
        return t(item.labelKey);
      }
      if (item.href !== '/' && pathname.startsWith(item.href)) {
        if (item.href === '/learn' && pathname !== '/learn') {
          return t('nav.learn');
        }
        return t(item.labelKey);
      }
    }
    return 'CyberWise';
  };

  return <h2 className="text-lg font-semibold md:text-xl">{getPageTitle()}</h2>;
}
