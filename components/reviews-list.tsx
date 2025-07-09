"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Review {
  id: string
  name: string
  avatar?: string
  rating: number
  date: string
  comment: string
  likes: number
  replies: number
  userHasLiked?: boolean
}

interface ReviewsListProps {
  lang: "es" | "en"
  dictionary: {
    title: string
    sortBy: string
    sortOptions: {
      recent: string
      highest: string
      lowest: string
    }
    likesLabel: string
    repliesLabel: string
    reviewCount: string
    mockComments: string[]
  }
}

export function ReviewsList({ lang, dictionary }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest">("recent")

  useEffect(() => {
    const mockData = [
      {
        id: "1",
        name: "María García",
        avatar: "/images/avatars/avatar-1.jpg",
        rating: 5,
        date: "2023-11-15",
        comment: dictionary.mockComments[0],
        likes: 12,
        replies: 2,
      },
      {
        id: "2",
        name: "Carlos Rodríguez",
        rating: 4,
        date: "2023-10-28",
        comment: dictionary.mockComments[1],
        likes: 5,
        replies: 1,
      },
      {
        id: "3",
        name: "Laura Martínez",
        avatar: "/images/avatars/avatar-3.jpg",
        rating: 5,
        date: "2023-10-10",
        comment: dictionary.mockComments[2],
        likes: 18,
        replies: 3,
      },
      {
        id: "4",
        name: "José Pérez",
        rating: 3,
        date: "2023-09-22",
        comment: dictionary.mockComments[3],
        likes: 2,
        replies: 1,
      },
      {
        id: "5",
        name: "Ana López",
        avatar: "/images/avatars/avatar-5.jpg",
        rating: 5,
        date: "2023-09-15",
        comment: dictionary.mockComments[4],
        likes: 21,
        replies: 4,
      },
    ]

    setTimeout(() => {
      setReviews(mockData)
      setLoading(false)
    }, 1500)
  }, [dictionary.mockComments])

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
            ...review,
            likes: review.userHasLiked ? review.likes - 1 : review.likes + 1,
            userHasLiked: !review.userHasLiked,
          }
          : review,
      ),
    )
  }

  const sortReviews = (list: Review[]) => {
    switch (sortBy) {
      case "recent":
        return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case "highest":
        return [...list].sort((a, b) => b.rating - a.rating)
      case "lowest":
        return [...list].sort((a, b) => a.rating - b.rating)
      default:
        return list
    }
  }

  const sortedReviews = sortReviews(reviews)

  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })

  if (loading) {
    return (
      <div className="space-y-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium">
          {dictionary.reviewCount.replace("{count}", reviews.length.toString())}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{dictionary.sortBy}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "highest" | "lowest")}
            className="text-sm border rounded-md px-2 py-1 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="recent">{dictionary.sortOptions.recent}</option>
            <option value="highest">{dictionary.sortOptions.highest}</option>
            <option value="lowest">{dictionary.sortOptions.lowest}</option>
          </select>
        </div>
      </div>

      {sortedReviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{review.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{formatDate(review.date)}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">{review.comment}</p>

          <div className="flex items-center gap-4 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(review.id)}
              className={review.userHasLiked ? "text-primary" : ""}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{review.likes}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{review.replies}</span>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
