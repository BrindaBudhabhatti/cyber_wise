"use client";

import {
  Home,
  BookOpen,
  ShieldQuestion,
  FileText,
  MessageCircle,
  Shield,
  GalleryHorizontal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./theme-toggle";


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const menuItems = [
    { href: "/", labelKey: "nav.home", icon: Home },
    { href: "/learn", labelKey: "nav.learn", icon: BookOpen },
    { href: "/quiz", labelKey: "nav.quiz", icon: ShieldQuestion },
    { href: "/report", labelKey: "nav.report", icon: FileText },
    { href: "/awareness", labelKey: "nav.awareness", icon: GalleryHorizontal },
    { href: "/chat", labelKey: "nav.cyberbuddy", icon: MessageCircle },
  ];

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.href === "/" && pathname === item.href) {
        return t(item.labelKey);
      }
      if (item.href !== "/" && pathname.startsWith(item.href)) {
        if (item.href === '/learn' && pathname !== '/learn') {
            return t('nav.learn');
        }
        return t(item.labelKey);
      }
    }
    return "CyberWise";
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Shield className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold tracking-tight">CyberWise</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    item.href === "/"
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                  }
                  tooltip={t(item.labelKey)}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{t(item.labelKey)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-lg font-semibold md:text-xl">{getPageTitle()}</h2>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
