"use server";

import { cookies } from "next/headers";

function getBackendBaseUrl() {
  return process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
}

function parseSetCookieHeader(setCookie: string | null) {
  if (!setCookie) return null;

  const [nameValuePair] = setCookie.split(";");
  const separatorIndex = nameValuePair.indexOf("=");

  if (separatorIndex === -1) return null;

  return {
    name: nameValuePair.slice(0, separatorIndex),
    value: nameValuePair.slice(separatorIndex + 1),
  };
}

export async function authenticateAdmin(email: string, password: string) {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const cookieStore = await cookies();
      const parsedCookie = parseSetCookieHeader(response.headers.get("set-cookie"));

      if (parsedCookie) {
        cookieStore.set(parsedCookie.name, parsedCookie.value, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
      }
    }

    return data;
  } catch (error) {
    console.error("Admin Login Error:", error);
    return { success: false, error: "Backend connection failed" };
  }
}

export async function logoutAdmin() {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/admin/logout`, {
      method: "POST",
    });

    const cookieStore = await cookies();
    cookieStore.delete("tukka_admin_session");

    return await response.json();
  } catch {
    return { success: false };
  }
}
