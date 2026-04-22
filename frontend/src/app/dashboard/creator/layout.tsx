"use client";

import { CreatorSidebar } from "@/components/dashboard/creator-sidebar";
import { SidebarProvider } from "@/lib/sidebar-context";
import { TitleProvider } from "@/lib/title-context";
import { Topbar } from "@/components/dashboard/shared/topbar";

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TitleProvider>
        <div className="flex min-h-screen bg-[#050508]">
          <CreatorSidebar />
          <main className="flex-1 lg:ml-[260px] min-h-screen flex flex-col">
            <Topbar />
            <div className="flex-1 overflow-x-hidden">
              {children}
            </div>
          </main>
        </div>
      </TitleProvider>
    </SidebarProvider>
  );
}
