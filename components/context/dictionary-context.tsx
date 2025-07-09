"use client"

import { createContext, useContext } from "react"
import type { Dictionary } from "@/i18n/dictionaries"

const DictionaryContext = createContext<Dictionary | null>(null)

export const useDictionary = () => {
  const context = useContext(DictionaryContext)
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider")
  }
  return context
}

export function DictionaryProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: Dictionary
}) {
  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  )
}
