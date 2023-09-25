import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, locales } from "./i18n/settings";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.search;

  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    // e.g. incoming request is /en/about
    // The new URL is now /about
    let url = `${pathname.replace(
      `/${fallbackLng}`,
      pathname === `/${fallbackLng}` ? "/" : ""
    )}${searchParams}`;
    return NextResponse.redirect(new URL(url, req.url));
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /about
    // tell Next.js it should pretend it's /en/about
    let url = `/${fallbackLng}${pathname}${searchParams}`;
    return NextResponse.rewrite(new URL(url, req.url));
  }
}

export const config = {
  // Do not run the middleware on the following paths
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
