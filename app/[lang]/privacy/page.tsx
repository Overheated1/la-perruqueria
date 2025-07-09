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
    title: dict.privacy.metadata.title + " | La Perruquería",
    description: dict.privacy.metadata.description,
  }
}

export default async function PrivacyPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-col">
      <Header lang={lang} dictionary={dict.navigation} />
      <div className="pt-24 md:pt-28">
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight text-primary mb-8">
                {dict.privacy.title}
              </h1>

              <div className="prose max-w-none">
                <p>{dict.privacy.lastUpdated}</p>

                {dict.privacy.sections.map((section, index) => (
                  <div key={index}>
                    <h2>{section.title}</h2>
                    {section.content.map((line: string, i: number) =>
                      line.startsWith("-") ? (
                        <ul key={`ul-${index}`}>
                          {(section.content as string[]).map((item, j) => (
                            <li key={j}>{item.slice(1).trim()}</li>
                          ))}
                          {/* break after list */}
                          {(() => {
                            const nextIsNotList = !section.content[i + 1]?.startsWith("-");
                            return nextIsNotList ? <br /> : null;
                          })()}
                        </ul>
                      ) : (
                        <p key={i}>{line}</p>
                      )
                    )}
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
