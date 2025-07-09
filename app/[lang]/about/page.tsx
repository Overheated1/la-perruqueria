import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.about.metadata.title,
    description: dict.about.metadata.description,
  }
}

export default async function AboutPage({
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
                {dict.about.title}
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                {dict.about.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold mb-4">{dict.about.ourHistoryTitle}</h2>
                <p className="mb-4">{dict.about.ourHistoryParagraph1}</p>
                <p className="mb-4">{dict.about.ourHistoryParagraph2}</p>
                <p>{dict.about.ourHistoryParagraph3}</p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image src="/images/van.png" alt="La Perruquería - Nuestra historia" fill className="object-cover" />
              </div>
            </div>

            <div className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-12">{dict.about.ourValuesTitle}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {/** Valor 1: Amor por los Animales */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 8.25C21 5.76472 18.9013 3.75 16.3125 3.75C14.3769 3.75 12.7153 4.87628 12 6.48342C11.2847 4.87628 9.62312 3.75 7.6875 3.75C5.09867 3.75 3 5.76472 3 8.25C3 15.4706 12 20.25 12 20.25C12 20.25 21 15.4706 21 8.25Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{dict.about.values.love.title}</h3>
                  <p>{dict.about.values.love.description}</p>
                </div>

                {/** Valor 2: Calidad Premium */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12L11 14L15 10M12 3L13.9101 4.87147L16.5 4.20577L17.2079 6.79423L19.7929 7.5L19.1272 10.0899L21 12L19.1272 13.9101L19.7929 16.5L17.2079 17.2079L16.5 19.7929L13.9101 19.1272L12 21L10.0899 19.1272L7.5 19.7929L6.79423 17.2079L4.20577 16.5L4.87147 13.9101L3 12L4.87147 10.0899L4.20577 7.5L6.79423 6.79423L7.5 4.20577L10.0899 4.87147L12 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{dict.about.values.quality.title}</h3>
                  <p>{dict.about.values.quality.description}</p>
                </div>

                {/** Valor 3: Atención Personalizada */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 8.4C18 6.70261 17.3679 5.07475 16.2426 3.87452C15.1174 2.67428 13.5913 2 12 2C10.4087 2 8.88258 2.67428 7.75736 3.87452C6.63214 5.07475 6 6.70261 6 8.4C6 15.8667 3 18 3 18H21C21 18 18 15.8667 18 8.4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      />
                      <path
                        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{dict.about.values.attention.title}</h3>
                  <p>{dict.about.values.attention.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer dictionary={dict.footer} lang={lang} />
    </main>
  )
}
