"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface HeroProps {
  dictionary: {
    title: string
    subtitle: string
    cta: string
  }
}

export function Hero({ dictionary }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950 py-12 md:py-24">
      {/* Fondo de puntos */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute h-full w-full bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Textos del hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-start space-y-6"
          >
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              {dictionary.title}
            </h1>
            <p className="max-w-md text-lg text-muted-foreground md:text-xl">
              {dictionary.subtitle}
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Link href="https://wa.me/17867190231" target="_blank" rel="noopener noreferrer">
                {dictionary.cta}
              </Link>
            </Button>
          </motion.div>

          {/* Imagen del logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-full lg:ml-auto"
          >
            <Image
              src="/images/logo.png"
              alt="La Perruquería"
              width={500}
              height={500}
              className="h-full w-full object-cover rounded-full"
              priority
            />
          </motion.div>
        </div>

        {/* Gradiente inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
      </div>
    </section>
  )
}
