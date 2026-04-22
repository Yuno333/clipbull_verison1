"use client";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { supabaseClient } from "@/lib/supabase/refine-client";
import { authProvider } from "./auth-provider";
import { accessControlProvider } from "./access-control-provider";
import { notificationProvider } from "./notification-provider";

export function RefineProvider({ children }: { children: React.ReactNode }) {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(supabaseClient)}
      liveProvider={liveProvider(supabaseClient)}
      authProvider={authProvider}
      accessControlProvider={accessControlProvider}
      notificationProvider={notificationProvider}
      resources={[
        {
          name: "campaigns",
          list: "/dashboard/creator/campaigns",
          create: "/dashboard/creator/campaigns/create",
          edit: "/dashboard/creator/campaigns/edit/:id",
          show: "/dashboard/creator/campaigns/show/:id",
        },
        {
          name: "accepted_offers",
          list: "/dashboard/earner/offers",
        },
        {
          name: "clip_submissions",
          list: "/dashboard/earner/submit",
          create: "/dashboard/earner/submit/new",
        },
        {
          name: "transactions",
          list: "/dashboard/creator/wallet",
        },
        {
          name: "profiles",
          show: "/dashboard/creator/settings",
          edit: "/dashboard/creator/settings",
        },
      ]}
      options={{
        syncWithLocation: false,
        liveMode: "auto",
        mutationMode: "optimistic",
      }}
    >
      {children}
    </Refine>
  );
}
