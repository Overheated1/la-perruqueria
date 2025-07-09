import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignInForm } from "@/components/auth/signin-form"

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.auth.signIn.title,
    description: dict.auth.signIn.description,
  }
}

export default async function SignInPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-col">
      <Header lang={lang} dictionary={dict.navigation} />
      <div className="pt-24 md:pt-28 flex-1 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-8">
          <SignInForm lang="es" dictionary={dict.auth.signIn} />
        </div>
      </div>
      <Footer dictionary={dict.footer} />
    </main>
  )
}
