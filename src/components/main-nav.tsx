
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
    { href: '/news', labelKey: 'nav.news', icon: Newspaper },
    { href: '/stats', labelKey: 'nav.stats', icon: BarChart },
    { href: '/quiz', labelKey: 'nav.quiz', icon: ShieldQuestion },
    { href: '/games', labelKey: 'nav.games', icon: Gamepad2 },
    { href: '/threat-analyzer', labelKey: 'nav.threat_analyzer', icon: ScanLine },
    { href: '/report', labelKey: 'nav.report', icon: FileText },
    { href: '/awareness', labelKey: 'nav.awareness', icon: GalleryHorizontal },
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
