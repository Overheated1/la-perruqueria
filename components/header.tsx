"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { DiscountBanner } from "@/components/discount-banner"
import type { Locale } from "@/i18n/config"

interface HeaderProps {
  lang: Locale
  dictionary: {
    home: string
    services: string
    gallery: string
    about: string
    contact: string
    bookNow: string
  }
}

export function Header({ lang, dictionary }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [bannerDismissed, setBannerDismissed] = useState(true)

  useEffect(() => {
    // Check if banner was dismissed in localStorage
    const dismissed = localStorage.getItem("discount-banner-dismissed") === "true"
    setBannerDismissed(dismissed)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <DiscountBanner
        message={
          lang === "es"
            ? "¡Bienvenido! Obtén un 10% de descuento en tu primera visita con el código:"
            : "Welcome! Get 10% off your first visit with code:"
        }
        code={lang === "es" ? "BIENVENIDO10" : "WELCOME10"}
        onDismiss={() => setBannerDismissed(true)}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        } ${!bannerDismissed ? "mt-14" : ""}`}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${lang}`} className="flex items-center">
              <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="La Perruquería"
                  width={60}
                  height={60}
                  className="h-full w-full object-cover rounded-full"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href={`/${lang}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === `/${lang}` ? "text-primary" : "text-foreground"
                }`}
              >
                {dictionary.home}
              </Link>
              <Link
                href={`/${lang}/services`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === `/${lang}/services` ? "text-primary" : "text-foreground"
                }`}
              >
                {dictionary.services}
              </Link>
              <Link
                href={`/${lang}/gallery`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === `/${lang}/gallery` ? "text-primary" : "text-foreground"
                }`}
              >
                {dictionary.gallery}
              </Link>
              <Link
                href={`/${lang}/about`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === `/${lang}/about` ? "text-primary" : "text-foreground"
                }`}
              >
                {dictionary.about}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === `/${lang}/contact` ? "text-primary" : "text-foreground"
                }`}
              >
                {dictionary.contact}
              </Link>
              <Link
                href={`/${lang}/reviews`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === `/${lang}/reviews` ? "text-primary" : "text-foreground"
                }`}
              >
                Reviews
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageSwitcher currentLang={lang} />
                <UserNav lang={lang} />
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link href={`https://wa.me/17867190231`} target="_blank" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {dictionary.bookNow}
                </Link>
              </Button>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden">
              <ThemeToggle />
              <LanguageSwitcher currentLang={lang} />
              <UserNav lang={lang} />
              <Button variant="ghost" size="icon" className="ml-2" onClick={toggleMenu} aria-label="Toggle Menu">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <Link
                  href={`/${lang}`}
                  onClick={closeMenu}
                  className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                    pathname === `/${lang}` ? "text-primary" : "text-foreground"
                  }`}
                >
                  {dictionary.home}
                </Link>
                <Link
                  href={`/${lang}/services`}
                  onClick={closeMenu}
                  className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                    pathname === `/${lang}/services` ? "text-primary" : "text-foreground"
                  }`}
                >
                  {dictionary.services}
                </Link>
                <Link
                  href={`/${lang}/gallery`}
                  onClick={closeMenu}
                  className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                    pathname === `/${lang}/gallery` ? "text-primary" : "text-foreground"
                  }`}
                >
                  {dictionary.gallery}
                </Link>
                <Link
                  href={`/${lang}/about`}
                  onClick={closeMenu}
                  className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                    pathname === `/${lang}/about` ? "text-primary" : "text-foreground"
                  }`}
                >
                  {dictionary.about}
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  onClick={closeMenu}
                  className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                    pathname === `/${lang}/contact` ? "text-primary" : "text-foreground"
                  }`}
                >
                  {dictionary.contact}
                </Link>
                <Link
                  href={`/${lang}/reviews`}
                  onClick={closeMenu}
                  className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                    pathname === `/${lang}/reviews` ? "text-primary" : "text-foreground"
                  }`}
                >
                  Reviews
                </Link>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                  <Link
                    href={`https://wa.me/17867190231`}
                    target="_blank"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {dictionary.bookNow}
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
