import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value;

  const protectedRoute = ["/dashboard", "/admin"];
  const url = req.nextUrl.clone();

  const isProtected = protectedRoute.some((route) =>
    url.pathname.startsWith(route)
  );

  if (isProtected) {
    if (!token || token === undefined) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
