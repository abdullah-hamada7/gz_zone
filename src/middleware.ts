import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    const { supabaseResponse, user } = await updateSession(request);

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isLoginPage = request.nextUrl.pathname === "/admin/login";
    const isApiAdminRoute = request.nextUrl.pathname.startsWith("/api/admin");
    const isAuthApi = request.nextUrl.pathname.startsWith("/api/admin/auth");
    if (isApiAdminRoute && !isAuthApi) {
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (isAdminRoute && !isLoginPage && !user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isLoginPage && user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return supabaseResponse;
  } catch {
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
