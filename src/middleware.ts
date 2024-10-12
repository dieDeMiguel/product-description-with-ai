import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  // Allow API routes, static assets, and favicon
  const allowedPaths = [
    "/api",
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
  ];
  const isAllowed = allowedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  console.log("isAllowed", isAllowed);

  if (!isAllowed) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
