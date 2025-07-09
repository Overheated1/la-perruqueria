import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.terms.metadata.title,
    description: dict.terms.metadata.description,
  }
}

export default async function TermsPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const t = dict.terms

  return (
    <main className="flex min-h-screen flex-col">
      <Header lang={lang} dictionary={dict.navigation} />
      <div className="pt-24 md:pt-28">
        <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight text-primary mb-8">
                {t.title}
              </h1>

              <div className="prose dark:prose-invert max-w-none">
                <p>{t.lastUpdated}</p>

                {t.sections.map((section, index) => (
                  <div key={index} className="mt-8">
                    <h2>{section.title}</h2>
                    {section.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer dictionary={dict.footer} />
    </main>
  )
}
