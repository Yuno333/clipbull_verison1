import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;
  
  try {
    const statusResponse = await fetch(`${baseUrl}/api/status`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    
    if (!statusResponse.ok) {
      return NextResponse.next();
    }

    const authState = await statusResponse.json();
    const { authenticated, role } = authState;
    const normalizedRole = role === "clipper" ? "earner" : role;

    if (request.nextUrl.pathname.startsWith("/dashboard/clipper")) {
      const redirectedPath = request.nextUrl.pathname.replace("/dashboard/clipper", "/dashboard/earner");
      return NextResponse.redirect(new URL(redirectedPath + request.nextUrl.search, request.url));
    }

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
        return NextResponse.next();
      }

      if (!authenticated) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      if (normalizedRole === "admin" && !request.nextUrl.pathname.startsWith("/dashboard/admin")) {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }

      const activeRole = normalizedRole || "creator";
      if (request.nextUrl.pathname.startsWith("/dashboard/creator") && activeRole !== "creator" && activeRole !== "admin") {
        return NextResponse.redirect(new URL(`/dashboard/${activeRole}`, request.url));
      }

      if (request.nextUrl.pathname.startsWith("/dashboard/earner") && activeRole !== "earner" && activeRole !== "admin") {
        return NextResponse.redirect(new URL(`/dashboard/${activeRole}`, request.url));
      }
    }

    if (request.nextUrl.pathname.startsWith("/auth") && authenticated) {
      const target = normalizedRole === "admin" ? "/dashboard/admin" : `/dashboard/${normalizedRole}`;
      return NextResponse.redirect(new URL(target, request.url));
    }
  } catch (err) {
    console.error("Middleware fetch error:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
