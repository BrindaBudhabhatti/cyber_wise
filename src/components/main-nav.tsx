
'use client';

import {
  BookOpen,
  FileText,
  GalleryHorizontal,
  Home,
  MessageCircle,
  Newspaper,
  ScanLine,
  ShieldQuestion,
  BarChart,
  Gamepad2,
  Megaphone,
  Phone,
  ShieldX,
  Link2,
  HeartHandshake,
  BookKey,
  Smile,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';

export function MainNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { setOpenMobile, isMobile } = useSidebar();

  const menuItems = [
    { href: '/', labelKey: 'nav.home', icon: Home },
    { href: '/learn', labelKey: 'nav.learn', icon: BookOpen },
    { href: '/womens-safety', labelKey: 'nav.womens_safety', icon: HeartHandshake },
    { href: '/news', labelKey: 'nav.news', icon: Newspaper },
    { href: '/stats', labelKey: 'nav.stats', icon: BarChart },
    { href: '/case-gallery', labelKey: 'nav.case_gallery', icon: BookKey },
    { href: '/cyberwise-kids', labelKey: 'nav.cyberwise_kids', icon: Smile },
    { href: '/quiz', labelKey: 'nav.quiz', icon: ShieldQuestion },
    { href: '/games', labelKey: 'nav.games', icon: Gamepad2 },
    { href: '/scam-scanner', labelKey: 'nav.scam_scanner', icon: ScanLine },
    { href: '/link-inspector', labelKey: 'nav.link_inspector', icon: Link2 },
    { href: '/breach-checker', labelKey: 'nav.breach_checker', icon: ShieldX },
    { href: '/report', labelKey: 'nav.report', icon: FileText },
    { href: '/awareness', labelKey: 'nav.awareness', icon: GalleryHorizontal },
    { href: '/feedback', labelKey: 'nav.feedback', icon: Megaphone },
    { href: '/reach-us', labelKey: 'nav.reach_us', icon: Phone },
    { href: '/chat', labelKey: 'nav.cyberbuddy', icon: MessageCircle },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href)
            }
            tooltip={t(item.labelKey)}
          >
            <Link href={item.href} onClick={handleLinkClick}>
              <item.icon />
              <span>{t(item.labelKey)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
