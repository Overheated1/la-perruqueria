"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface DiscountBannerProps {
  message: string
  code: string
  onDismiss?: () => void
}

export function DiscountBanner({ message, code, onDismiss }: DiscountBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useLocalStorage("discount-banner-dismissed", false)

  useEffect(() => {
    // Check if user is a first-time visitor or returning visitor who hasn't dismissed the banner
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [dismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setDismissed(true)
    if (onDismiss) onDismiss()
  }

  return (
    <div className="relative z-[100]">
      <AnimatePresence>
        {isVisible && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-white py-3 px-4 shadow-md"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex-1 text-center">
                <p className="text-sm md:text-base font-medium">
                  {message} <span className="font-bold bg-white/20 px-2 py-1 rounded">{code}</span>
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
