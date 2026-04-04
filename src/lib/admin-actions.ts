"use server";

import { cookies } from "next/headers";

export async function authenticateAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("clipbull_admin_session", "verified", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return { success: true };
  }

  return { success: false, error: "Invalid admin credentials" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("clipbull_admin_session");
  return { success: true };
}
