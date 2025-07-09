"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}
