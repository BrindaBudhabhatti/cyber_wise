
"use client";

import {
  Home,
  BookOpen,
  ShieldQuestion,
  FileText,
  MessageCircle,
  Shield,
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
import { Button } from "@/components/ui/button";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: ShieldQuestion },
  { href: "/report", label: "Report", icon: FileText },
  { href: "/chat", label: "CyberBuddy", icon: MessageCircle },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.href === "/" && pathname === item.href) {
        return item.label;
      }
      if (item.href !== "/" && pathname.startsWith(item.href)) {
        // Special case for learn detail pages
        if (item.href === '/learn' && pathname !== '/learn') {
            return 'Learn';
        }
        return item.label;
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
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* Can add dark/light mode toggle here */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-lg font-semibold md:text-xl">{getPageTitle()}</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
