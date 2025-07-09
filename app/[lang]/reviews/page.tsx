import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReviewsList } from "@/components/reviews-list"
import { ReviewForm } from "@/components/review-form"

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.reviews.metadata.title,
    description: dict.reviews.metadata.description,
  }
}

export default async function ReviewsPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-col">
      <Header lang={lang} dictionary={dict.navigation} />
      <div className="pt-24 md:pt-28">
        <section className="py-12 md:py-16 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
                {dict.reviews.title}
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                {dict.reviews.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <ReviewsList lang={lang} dictionary={{
                  ...dict.reviewsSection,
                }} />
              </div>
              <div className="md:col-span-1">
                <ReviewsList lang={lang} dictionary={{
                  ...dict.reviewsSection,
                }} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer dictionary={dict.footer} lang={lang} />
    </main>
  )
}
