"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Lightbulb, AlertTriangle, Heart } from "lucide-react"

interface EducationSectionProps {
  dictionary: {
    title: string
    subtitle: string
    categories: {
      care: string
      tips: string
      warnings: string
      health: string
    }
    articles: {
      care: Array<{
        title: string
        description: string
        content: string
      }>
      tips: Array<{
        title: string
        description: string
        content: string
      }>
      warnings: Array<{
        title: string
        description: string
        content: string
      }>
      health: Array<{
        title: string
        description: string
        content: string
      }>
    }
  }
}

export function EducationSection({ dictionary }: EducationSectionProps) {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const toggleArticle = (id: string) => {
    if (expandedArticle === id) {
      setExpandedArticle(null)
    } else {
      setExpandedArticle(id)
    }
  }

  const categoryIcons = {
    care: <Heart className="h-5 w-5" />,
    tips: <Lightbulb className="h-5 w-5" />,
    warnings: <AlertTriangle className="h-5 w-5" />,
    health: <BookOpen className="h-5 w-5" />,
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{dictionary.title}</h2>
          </motion.div>
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

        <Tabs defaultValue="care" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="care" className="flex items-center gap-2">
              {categoryIcons.care} {dictionary.categories.care}
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              {categoryIcons.tips} {dictionary.categories.tips}
            </TabsTrigger>
            <TabsTrigger value="warnings" className="flex items-center gap-2">
              {categoryIcons.warnings} {dictionary.categories.warnings}
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              {categoryIcons.health} {dictionary.categories.health}
            </TabsTrigger>
          </TabsList>

          {Object.entries(dictionary.articles).map(([category, articles]) => (
            <TabsContent key={category} value={category} className="space-y-6">
              {Array.isArray(articles) &&
                articles.map((article, index) => {
                  const articleId = `${category}-${index}`
                  const isExpanded = expandedArticle === articleId

                  return (
                    <motion.div
                      key={articleId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden">
                        <CardHeader className="cursor-pointer" onClick={() => toggleArticle(articleId)}>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-xl">{article.title}</CardTitle>
                            <div className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </div>
                          </div>
                          <CardDescription>{article.description}</CardDescription>
                        </CardHeader>
                        {isExpanded && (
                          <CardContent>
                            <div className="prose max-w-none">
                              <p>{article.content}</p>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </motion.div>
                  )
                })}
            </TabsContent>
          ))}

        </Tabs>
      </div>
    </section>
  )
}
