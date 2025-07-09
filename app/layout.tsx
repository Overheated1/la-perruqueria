import type React from "react"
import { Inter, Poppins } from "next/font/google"
import { Providers } from "@/components/providers"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Analytics } from "@/components/analytics"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { DictionaryProvider } from "@/components/context/dictionary-context"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth/auth-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(params.lang)

  return {
    title: {
      default: "La Perruquería | Servicios de Peluquería Canina Premium",
      template: "%s | La Perruquería",
    },
    description:
      "Servicios profesionales de peluquería canina. Baños, cortes, peinados y más para que tu mascota luzca y se sienta increíble.",
    keywords: [
      "peluquería canina",
      "estética canina",
      "perros",
      "baño para perros",
      "corte de pelo para perros",
      "grooming",
      "La Perruquería",
    ],
    authors: [{ name: "La Perruquería" }],
    creator: "La Perruquería",
    openGraph: {
      title: "La Perruquería | Servicios de Peluquería Canina Premium",
      description:
        "Servicios profesionales de peluquería canina. Baños, cortes, peinados y más para que tu mascota luzca y se sienta increíble.",
      url: "https://laperruqueria.com",
      siteName: "La Perruquería",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "La Perruquería - Servicios de Peluquería Canina",
        },
      ],
      locale: params.lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "La Perruquería | Servicios de Peluquería Canina Premium",
      description:
        "Servicios profesionales de peluquería canina. Baños, cortes, peinados y más para que tu mascota luzca y se sienta increíble.",
      images: ["/images/og-image.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://laperruqueria.com",
      languages: {
        es: "https://laperruqueria.com/es",
        en: "https://laperruqueria.com/en",
      },
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <html
      lang={params.lang}
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <DictionaryProvider value={dict}>
          <AuthProvider>
            <Providers>
              <Suspense>{children}</Suspense>
              <WhatsAppButton dictionary={{
                tooltipTitle: dict.contact.whatsappTooltip.title,
                tooltipDescription: dict.contact.whatsappTooltip.description,
                ariaLabel: dict.contact.whatsappTooltip.ariaLabel,
                close: dict.contact.whatsappTooltip.close
              }} phoneNumber="+17867190231" />
              <Analytics />
            </Providers>
          </AuthProvider>
        </DictionaryProvider>
      </body>
    </html>
  )
}
