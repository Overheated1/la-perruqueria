"use client"

import { Suspense } from "react"
import NotFoundContent from "@/components/not-found-content"

export default function NotFound() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Cargando...</div>}>
      <NotFoundContent />
    </Suspense>
  )
}
