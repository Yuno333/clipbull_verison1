import type { Metadata } from "next";
import { Suspense } from "react";
import { RefineProvider } from "@/lib/providers/refine-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TUKKA - The Distribution Engine for Viral Content",
  description: "TUKKA connects creators with thousands of earners who repost, amplify, and drive impressions across social platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="font-sans antialiased bg-[#0a0a0a] text-white"
        suppressHydrationWarning
      >
        <Suspense>
          <RefineProvider>
            {children}
          </RefineProvider>
        </Suspense>
      </body>
    </html>
  );
}
