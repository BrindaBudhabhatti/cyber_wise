"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LanguageSwitcher } from "./language-switcher";
import { Shield } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { MainNav } from "./main-nav";
import { PageTitle } from "./page-title";
import { AboutDeveloperDialog } from "./about-developer-dialog";
import { Footer } from "./footer";


export function MainLayout({ children }: { children: React.ReactNode }) {
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
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator className="mx-0 mb-1 w-full" />
          <AboutDeveloperDialog />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <PageTitle />
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
