import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Services } from "@/components/services"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Scissors, Droplets, Heart, Star } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.services.metadata.title,
    description: dict.services.metadata.description,
  }
}

export default async function ServicesPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const t = dict.services

  return (
    <main className="flex min-h-screen flex-col">
      <Header lang={lang} dictionary={dict.navigation} />
      <div className="pt-14">
        <section className="py-12 md:py-16 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
                {t.title}
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">{t.subtitle}</p>
            </div>

            {/* Servicios destacados */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Baño Premium */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <Droplets className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{t.featured.bath.title}</CardTitle>
                  <CardDescription>{t.featured.bath.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.featured.bath.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Corte Completo */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center mb-2">
                    <Scissors className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle>{t.featured.cut.title}</CardTitle>
                  <CardDescription>{t.featured.cut.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.featured.cut.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Spa */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-200 dark:bg-purple-900 flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle>{t.featured.spa.title}</CardTitle>
                  <CardDescription>{t.featured.spa.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.featured.spa.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Lista de todos los servicios */}
        <Services dictionary={t} />

        {/* Sección de Paquetes Especiales */}
        <section className="py-16 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
                {t.packages.title}
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">{t.packages.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[t.packages.popular, t.packages.best, t.packages.vip].map((pkg, i) => (
                <Card
                  key={i}
                  className={`relative overflow-hidden dark:bg-gray-800 dark:border-gray-700 ${
                    i === 0 ? "border-primary/20" : ""
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 px-3 py-1 text-sm font-medium text-white ${
                      i === 0
                        ? "bg-primary"
                        : i === 1
                        ? "bg-blue-500"
                        : i === 2
                        ? "bg-purple-500"
                        : ""
                    }`}
                  >
                    {pkg.tag}
                  </div>
                  <CardHeader>
                    <CardTitle>{pkg.title}</CardTitle>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold">{pkg.price}</div>
                    <ul className="space-y-2">
                      {pkg.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Check
                            className={`h-5 w-5 mt-0.5 ${
                              i === 0
                                ? "text-primary"
                                : i === 1
                                ? "text-blue-500"
                                : i === 2
                                ? "text-purple-500"
                                : ""
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {/* <Button
                      className={`w-full ${
                        i === 0
                          ? "bg-primary hover:bg-primary/90"
                          : i === 1
                          ? "bg-blue-500 hover:bg-blue-600"
                          : i === 2
                          ? "bg-purple-500 hover:bg-purple-600"
                          : ""
                      }`}
                    >
                      {pkg.button}
                    </Button> */}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href={`/${lang}/contact`}>{t.contactCta}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer dictionary={dict.footer} lang={lang} />
    </main>
  )
}
