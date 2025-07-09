import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { BeforeAfter } from "@/components/before-after"
import { InstagramFeed } from "@/components/instagram-feed"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
  }
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-col">
      <Header lang={lang} dictionary={dict.navigation} />
      <div className="pt-14">
        <Hero dictionary={dict.hero} />
        <Services dictionary={dict.services} />
        <BeforeAfter dictionary={dict.beforeAfter} />
        <InstagramFeed dictionary={dict.instagram} />
        <EducationSection dictionary={dict.education} />
        <ContactSection dictionary={dict.contact} />
        <Footer dictionary={dict.footer} lang={lang} />
      </div>
    </main>
  )
}
