import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.contact.title,
    description: dict.contact.description,
  }
}

export default async function ContactPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-col">
      <Header lang={lang} dictionary={dict.navigation} />
      <div className="pt-24 md:pt-28">
        <section className="py-12 md:py-16 bg-gradient-to-b from-sky-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
                {dict.contact.title}
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                {dict.contact.subtitle}
              </p>
            </div>
          </div>
        </section>

        <ContactSection dictionary={dict.contact} showForm={true} />
      </div>
      <Footer dictionary={dict.footer} />
    </main>
  )
}
