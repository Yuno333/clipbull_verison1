import type { AuthProvider } from "@refinedev/core";
import { supabaseClient } from "@/lib/supabase/refine-client";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getUserRole(user: Awaited<ReturnType<typeof supabaseClient.auth.getUser>>["data"]["user"]) {
  const role = user?.app_metadata?.role || user?.user_metadata?.role || "creator";
  return role === "clipper" ? "earner" : role;
}

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: error.message,
          },
        };
      }

      if (data?.user) {
        const role = getUserRole(data.user);
        return {
          success: true,
          redirectTo: `/dashboard/${role}`,
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid email or password",
        },
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: getErrorMessage(error, "Login failed"),
        },
      };
    }
  },

  register: async ({ email, password, username, role = "creator" }) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "RegisterError",
            message: error.message,
          },
        };
      }

      if (data?.user) {
        return {
          success: true,
          redirectTo: "/auth/welcome",
        };
      }

      return {
        success: false,
        error: {
          name: "RegisterError",
          message: "Registration failed",
        },
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: getErrorMessage(error, "Registration failed"),
        },
      };
    }
  },

  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error: {
          name: "LogoutError",
          message: error.message,
        },
      };
    }

    return {
      success: true,
      redirectTo: "/auth/login",
    };
  },

  check: async () => {
    try {
      // 1. Check for Supabase session
      const { data } = await supabaseClient.auth.getUser();
      if (data?.user) {
        return { authenticated: true };
      }

      // 2. Check if we are on the admin dashboard
      // Since admin session is a httpOnly cookie, we can't check it directly here.
      // However, the /dashboard/admin/layout.tsx (Server Component) already protects these routes.
      // If we are here and not redirected, we allow it to pass to let the Server Component handle it.
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard/admin")) {
        return { authenticated: true };
      }

      return {
        authenticated: false,
        redirectTo: "/auth/login",
        logout: true,
      };
    } catch {
      return {
        authenticated: false,
        redirectTo: "/auth/login",
        logout: true,
      };
    }
  },

  getPermissions: async () => {
    try {
      // 1. Check Supabase user first
      const { data } = await supabaseClient.auth.getUser();
      if (data?.user) {
        return getUserRole(data.user);
      }

      // 2. Fallback for admin session
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard/admin")) {
        return "admin";
      }

      return null;
    } catch {
      return null;
    }
  },

  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return {
        id: data.user.id,
        name: data.user.user_metadata?.username || data.user.email,
        email: data.user.email,
        role: getUserRole(data.user),
        avatar: data.user.user_metadata?.avatar_url,
      };
    }

    return null;
  },

  forgotPassword: async ({ email }) => {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "ForgotPasswordError",
            message: error.message,
          },
        };
      }

      return {
        success: true,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: getErrorMessage(error, "Password reset failed"),
        },
      };
    }
  },

  onError: async (error) => {
    if (error?.status === 401 || error?.status === 403) {
      return {
        logout: true,
        redirectTo: "/auth/login",
        error,
      };
    }

    return { error };
  },
};
