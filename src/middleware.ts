import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  // Use middleware-aware client
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session)

  // Redirect logic
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("No session found, redirecting to home");
    res = NextResponse.redirect(new URL("/", req.url));
  }

  if (session && req.nextUrl.pathname === "/") {
    console.log("Session found, redirecting to dashboard");
    res = NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
