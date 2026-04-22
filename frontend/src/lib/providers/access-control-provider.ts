import type { AccessControlProvider } from "@refinedev/core";
import { supabaseClient } from "@/lib/supabase/refine-client";

// Role-based access control matrix
const accessMatrix: Record<string, Record<string, string[]>> = {
  creator: {
    campaigns: ["list", "create", "edit", "show"],
    clip_submissions: ["list", "show"],
    transactions: ["list"],
    profiles: ["show", "edit"],
    accepted_offers: ["list"],
  },
  earner: {
    campaigns: ["list", "show"],
    accepted_offers: ["list", "create"],
    clip_submissions: ["list", "create", "show"],
    transactions: ["list"],
    profiles: ["show", "edit"],
  },
  admin: {
    campaigns: ["list", "create", "edit", "show", "delete"],
    accepted_offers: ["list", "show", "delete"],
    clip_submissions: ["list", "show", "edit", "delete"],
    transactions: ["list", "show"],
    profiles: ["list", "show", "edit", "delete"],
  },
};

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    try {
      const { data } = await supabaseClient.auth.getUser();
      const role = data?.user?.app_metadata?.role || data?.user?.user_metadata?.role || "creator";
      const normalizedRole = role === "clipper" ? "earner" : role;

      const allowedResources = accessMatrix[normalizedRole];

      if (!allowedResources) {
        return {
          can: false,
          reason: "Role not recognized",
        };
      }

      const allowedActions = allowedResources[resource || ""];

      if (!allowedActions) {
        return {
          can: false,
          reason: "Resource not accessible",
        };
      }

      if (allowedActions.includes(action || "")) {
        return { can: true };
      }

      return {
        can: false,
        reason: "Unauthorized",
      };
    } catch {
      return {
        can: false,
        reason: "Authentication error",
      };
    }
  },
};
