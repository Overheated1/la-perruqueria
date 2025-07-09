import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MessageSquare } from "lucide-react"
import type { Locale } from "@/i18n/config"

interface FooterProps {
  dictionary: {
    slogan: string
    rights: string
    links: {
      home: string
      services: string
      gallery: string
      about: string
      contact: string
      privacy: string
      terms: string
    }
    sections: {
      links: string
      legal: string
    }
  }
  lang?: Locale
}

export function Footer({ dictionary, lang = "es" }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href={`/${lang}`} className="inline-block">
              <div className="h-16 w-16 relative overflow-hidden bg-white/20 rounded-full p-2">
                <Image
                  src="/images/logo-white.png"
                  alt="La Perruquería"
                  width={64}
                  height={64}
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
            </Link>
            <p className="text-primary-foreground/90 max-w-xs">{dictionary.slogan}</p>
            <div className="flex gap-4">
              <SocialIcon href="https://facebook.com/laperruqueria" label="Facebook">
                <Facebook className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com/laperruqueria" label="Instagram">
                <Instagram className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="https://wa.me/17867190231" label="WhatsApp">
                <MessageSquare className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{dictionary.sections.links}</h3>
            <ul className="space-y-2">
              <FooterLink href={`/${lang}`} label={dictionary.links.home} />
              <FooterLink href={`/${lang}/services`} label={dictionary.links.services} />
              <FooterLink href={`/${lang}/gallery`} label={dictionary.links.gallery} />
              <FooterLink href={`/${lang}/about`} label={dictionary.links.about} />
              <FooterLink href={`/${lang}/contact`} label={dictionary.links.contact} />
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{dictionary.sections.legal}</h3>
            <ul className="space-y-2">
              <FooterLink href={`/${lang}/privacy`} label={dictionary.links.privacy} />
              <FooterLink href={`/${lang}/terms`} label={dictionary.links.terms} />
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-primary-foreground/70">
          <p>
            &copy; {currentYear} La Perruquería. {dictionary.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

// 🔹 Subcomponentes reutilizables
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-primary-foreground/90 hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
      aria-label={label}
    >
      {children}
    </Link>
  )
}
