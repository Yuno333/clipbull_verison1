import type { NotificationProvider } from "@refinedev/core";

// Lightweight notification provider
// Can be replaced with a toast library (sonner, react-hot-toast, etc.)
export const notificationProvider: NotificationProvider = {
  open: ({ message, description, type, key }) => {
    if (type === "success") {
      console.log(`✅ [${key || "notification"}] ${message}${description ? `: ${description}` : ""}`);
    } else if (type === "error") {
      console.error(`❌ [${key || "notification"}] ${message}${description ? `: ${description}` : ""}`);
    } else if (type === "progress") {
      console.log(`⏳ [${key || "notification"}] ${message}${description ? `: ${description}` : ""}`);
    } else {
      console.log(`ℹ️ [${key || "notification"}] ${message}${description ? `: ${description}` : ""}`);
    }
  },
  close: (key) => {
    // Close notification by key — no-op for console-based provider
  },
};
