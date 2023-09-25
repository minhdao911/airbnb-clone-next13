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
    const url = new URL(
      `${pathname.replace(
        `/${fallbackLng}`,
        pathname === `/${fallbackLng}` ? "/" : ""
      )}${searchParams}`,
      req.url
    );
    return NextResponse.redirect(url);
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /about
    // tell Next.js it should pretend it's /en/about
    const url = new URL(`/${fallbackLng}${pathname}${searchParams}`, req.url);
    return NextResponse.rewrite(url);
  }

  if (pathname.includes("/home")) {
    return NextResponse.redirect(
      new URL(pathname.replace("/home", ""), req.url)
    );
  }
}

export const config = {
  // Do not run the middleware on the following paths
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
