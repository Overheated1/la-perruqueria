import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "@/i18n/config"

function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages: string[] = []
  try {
    const acceptLanguage = negotiatorHeaders["accept-language"]
    languages = acceptLanguage ? acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim()) : []
  } catch (error) {
    console.error("Error parsing accept-language:", error)
  }

  // Default to Spanish if no language preference is found
  if (languages.length === 0) {
    return i18n.defaultLocale
  }

  // Check if any of the preferred languages match our locales
  for (const lang of languages) {
    const locale = lang.toLowerCase().split("-")[0]
    if (i18n.locales.includes(locale as any)) {
      return locale
    }
  }

  return i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Special case for root path
  if (pathname === "/" || pathname === "") {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` and static files
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
}
