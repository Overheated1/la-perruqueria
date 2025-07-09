"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface BeforeAfterProps {
  dictionary: {
    title: string
    subtitle: string
    beforeLabel: string
    afterLabel: string
    sets: {
      alt1: string
      alt2: string
      alt3: string
    }
    ariaLabelPrefix: string
  }
}

interface ComparisonSet {
  id: number
  before: string
  after: string
  altKey: keyof BeforeAfterProps["dictionary"]["sets"]
}

export function BeforeAfter({ dictionary }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [currentSet, setCurrentSet] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const comparisonSets: ComparisonSet[] = [
    {
      id: 1,
      before: "/images/before-1.jpg",
      after: "/images/after-1.jpg",
      altKey: "alt1",
    },
    {
      id: 2,
      before: "/images/before-2.jpg",
      after: "/images/after-2.jpg",
      altKey: "alt2",
    },
    {
      id: 3,
      before: "/images/before-3.jpg",
      after: "/images/after-3.jpg",
      altKey: "alt3",
    },
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updateSliderPosition(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      updateSliderPosition(e.touches[0].clientX)
    }
  }

  const updateSliderPosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100))
      setSliderPosition(percentage)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentSet((prev) => (prev + 1) % comparisonSets.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [comparisonSets.length, isDragging])

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchend", handleMouseUp)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  const currentAlt = dictionary.sets[comparisonSets[currentSet].altKey]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4"
          >
            {dictionary.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            {dictionary.subtitle}
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            ref={containerRef}
            className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ touchAction: "none" }}
          >
            {/* After */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={comparisonSets[currentSet].after}
                alt={currentAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>

            {/* Before */}
            <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
              <div className="relative h-full w-full">
                <Image
                  src={comparisonSets[currentSet].before}
                  alt={currentAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            </div>

            {/* Slider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-ew-resize">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 18L21 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 18L9 12L3 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {dictionary.beforeLabel}
            </div>
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {dictionary.afterLabel}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-3">
            {comparisonSets.map((set, index) => (
              <button
                key={set.id}
                onClick={() => setCurrentSet(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentSet === index ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`${dictionary.ariaLabelPrefix} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
