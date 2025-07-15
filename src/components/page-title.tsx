
'use client';

import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export function PageTitle() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const menuItems = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/learn', labelKey: 'nav.learn' },
    { href: '/news', labelKey: 'nav.news' },
    { href: '/stats', labelKey: 'nav.stats' },
    { href: '/quiz', labelKey: 'nav.quiz' },
    { href: '/games', labelKey: 'nav.games' },
    { href: '/report', labelKey: 'nav.report' },
    { href: '/awareness', labelKey: 'nav.awareness' },
    { href: '/chat', labelKey: 'nav.cyberbuddy' },
    { href: '/scam-scanner', labelKey: 'nav.scam_scanner' },
    { href: '/link-inspector', labelKey: 'nav.link_inspector' },
    { href: '/breach-checker', labelKey: 'nav.breach_checker' },
    { href: '/feedback', labelKey: 'nav.feedback' },
    { href: '/reach-us', labelKey: 'nav.reach_us' },
    { href: '/admin', labelKey: 'nav.admin_panel' },
    { href: '/womens-safety', labelKey: 'nav.womens_safety' },
    { href: '/cyberwise-kids', labelKey: 'nav.cyberwise_kids' },
    { href: '/case-gallery', labelKey: 'nav.case_gallery' },
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
        if (item.href === '/games' && pathname !== '/games') {
          return t('nav.games');
        }
        if (item.href === '/admin' && pathname.startsWith('/admin')) {
            return t('nav.admin_panel');
        }
        return t(item.labelKey);
      }
    }
    return 'CyberWise';
  };

  return <h2 className="text-lg font-semibold md:text-xl">{getPageTitle()}</h2>;
}
