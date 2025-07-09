"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Droplets, Heart, Brush, Ruler } from "lucide-react"

interface ServicesProps {
  dictionary: {
    title: string
    subtitle: string
    smallDogs: string
    mediumDogs: string
    largeDogs: string
    services: {
      premium_bath: {
        title: string
        description: string
        price_small: string
        price_medium: string
        price_large: string
      }
      full_grooming: {
        title: string
        description: string
        price_small: string
        price_medium: string
        price_large: string
      }
      spa_treatment: {
        title: string
        description: string
        price_small: string
        price_medium: string
        price_large: string
      }
    }
    sizeGuide: {
      title: string
      small: string
      medium: string
      large: string
    }
    servicesList: {
      title: string
      items: string[]
    }
    // NUEVOS CAMPOS (opción B)
    featured: {
      bath: {
        title: string
        description: string
        items: string[]
      }
      cut: {
        title: string
        description: string
        items: string[]
      }
      spa: {
        title: string
        description: string
        items: string[]
      }
    }
    packages: {
      title: string
      subtitle: string
      popular: PackageInfo
      best: PackageInfo
      vip: PackageInfo
    }
    contactCta: string
  }
}

interface PackageInfo {
  tag: string
  title: string
  description: string
  price: string
  items: string[]
  button: string
}

export function Services({ dictionary }: ServicesProps) {
  const [selectedSize, setSelectedSize] = useState("small")

  const serviceIcons = {
    premium_bath: <Droplets className="h-6 w-6 text-primary" />,
    full_grooming: <Scissors className="h-6 w-6 text-primary" />,
    spa_treatment: <Heart className="h-6 w-6 text-primary" />,
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-white dark:bg-gray-900">
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

        <Tabs defaultValue="small" onValueChange={setSelectedSize} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="small">{dictionary.smallDogs}</TabsTrigger>
            <TabsTrigger value="medium">{dictionary.mediumDogs}</TabsTrigger>
            <TabsTrigger value="large">{dictionary.largeDogs}</TabsTrigger>
          </TabsList>

          {["small", "medium", "large"].map((size) => (
            <TabsContent key={size} value={size} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                {Object.entries(dictionary.services).map(([key, service]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Card className="h-full transition-all hover:shadow-md dark:border-gray-700">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                        {serviceIcons[key as keyof typeof serviceIcons]}
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 dark:text-gray-300">{service.description}</CardDescription>
                        <div className="text-2xl font-bold text-primary">
                          {service[`price_${size}` as keyof typeof service]}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-sky-50 dark:bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">{dictionary.sizeGuide.title}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Ruler className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">{dictionary.smallDogs}:</span> {dictionary.sizeGuide.small}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Ruler className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">{dictionary.mediumDogs}:</span> {dictionary.sizeGuide.medium}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Ruler className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">{dictionary.largeDogs}:</span> {dictionary.sizeGuide.large}
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-sky-50 dark:bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">{dictionary.servicesList.title}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dictionary.servicesList.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Brush className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
