import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Helper for safe user retrieval
  let user = null;
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      user = supabaseUser;
    }
  } catch (error) {
    console.error("Middleware Supabase Error:", error);
  }

  const adminSession = request.cookies.get("clipbull_admin_session");

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Special case for admin dashboard
    if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
      if (adminSession?.value === "verified") {
        return supabaseResponse;
      }
      if (user && (user.app_metadata?.role === "admin" || user.user_metadata?.role === "admin")) {
        return supabaseResponse;
      }
      // If neither admin cookie nor supabase admin user, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    // General user protection
    if (!user) {
      if (adminSession?.value === "verified") {
        // Admin trying to access non-admin dashboard? Redirect to admin dashboard.
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard/admin";
        return NextResponse.redirect(url);
      }
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from auth pages
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (adminSession?.value === "verified") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/admin";
      return NextResponse.redirect(url);
    }
    if (user) {
      const url = request.nextUrl.clone();
      const role = user.user_metadata?.role || "creator";
      url.pathname = `/dashboard/${role}`;
      return NextResponse.redirect(url);
    }
  }

  // Enforce role separation for standard users
  if (user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const role = user.app_metadata?.role || user.user_metadata?.role || "creator";

    // If an admin lands on a non-admin dashboard (like the default /dashboard), send them to admin
    if (role === "admin" && !request.nextUrl.pathname.startsWith("/dashboard/admin")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/admin";
      return NextResponse.redirect(url);
    }

    // Prevent non-creators from accessing creator dashboard
    if (request.nextUrl.pathname.startsWith("/dashboard/creator") && role !== "creator") {
      const url = request.nextUrl.clone();
      url.pathname = `/dashboard/${role}`;
      return NextResponse.redirect(url);
    }

    // Prevent non-clippers from accessing clipper dashboard
    if (request.nextUrl.pathname.startsWith("/dashboard/clipper") && role !== "clipper") {
      const url = request.nextUrl.clone();
      url.pathname = `/dashboard/${role}`;
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
