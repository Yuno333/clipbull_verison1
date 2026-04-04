"use client";

import { CreatorSidebar } from "@/components/dashboard/creator-sidebar";

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <CreatorSidebar />
      <div
        className="flex-1 min-h-screen overflow-y-auto"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        {children}
      </div>
    </div>
  );
}
