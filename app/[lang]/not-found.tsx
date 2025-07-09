"use client"

import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useDictionary } from "@/components/context/dictionary-context"
import { useParams } from "next/navigation"
import type { Locale } from "@/i18n/config"

function NotFoundContent() {
  const dict = useDictionary()
  const params = useParams()
  const lang = (params?.lang as Locale) || "es"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-sky-50 to-white">
      <div className="space-y-6 max-w-md">
        <div className="relative w-40 h-40 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-primary">404</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">
          {dict.notFound?.title ?? "¡Ups! Página no encontrada"}
        </h1>
        <p className="text-xl text-muted-foreground">
          {dict.notFound?.description ??
            "Lo sentimos, la página que estás buscando no existe o ha sido movida."}
        </p>

        <div className="relative w-64 h-64 mx-auto my-8">
          <Image
            src="/images/logo.png"
            alt="La Perruquería"
            fill
            className="object-contain opacity-50"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href={`/${lang}`}>{dict.notFound?.home ?? "Volver al inicio"}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/${lang}/contact`}>{dict.notFound?.contact ?? "Contactar soporte"}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Cargando...</div>}>
      <NotFoundContent />
    </Suspense>
  )
}
