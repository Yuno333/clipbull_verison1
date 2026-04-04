"use client";

import { ClipperSidebar } from "@/components/dashboard/clipper-sidebar";

export default function ClipperLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <ClipperSidebar />
      <div
        className="flex-1 min-h-screen overflow-y-auto"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        {children}
      </div>
    </div>
  );
}
