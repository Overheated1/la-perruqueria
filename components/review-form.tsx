"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ReviewFormProps {
  dictionary: {
    title: string
    description: string
    form: {
      name: {
        label: string
        placeholder: string
        error: string
      }
      email: {
        label: string
        placeholder: string
        error: string
      }
      rating: {
        label: string
        error: string
      }
      comment: {
        label: string
        placeholder: string
        error: string
      }
      submit: string
      submitting: string
      successTitle: string
      successDescription: string
    }
  }
}

export function ReviewForm({ dictionary }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const reviewSchema = z.object({
    name: z.string().min(2, { message: dictionary.form.name.error }),
    email: z.string().email({ message: dictionary.form.email.error }),
    rating: z.number().min(1, { message: dictionary.form.rating.error }),
    comment: z.string().min(10, { message: dictionary.form.comment.error }),
  })

  type ReviewFormValues = z.infer<typeof reviewSchema>

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      comment: "",
    },
  })

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: dictionary.form.successTitle,
      description: dictionary.form.successDescription,
    })

    reset()
    setRating(0)
    setIsSubmitting(false)
  }

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating)
    setValue("rating", selectedRating, { shouldValidate: true })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">{dictionary.title}</h2>
      <p className="text-muted-foreground mb-6">{dictionary.description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            {dictionary.form.name.label}
          </label>
          <Input
            id="name"
            {...register("name")}
            placeholder={dictionary.form.name.placeholder}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {dictionary.form.email.label}
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder={dictionary.form.email.placeholder}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{dictionary.form.rating.label}</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            {dictionary.form.comment.label}
          </label>
          <Textarea
            id="comment"
            {...register("comment")}
            placeholder={dictionary.form.comment.placeholder}
            rows={4}
            className={errors.comment ? "border-red-500" : ""}
          />
          {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
          {isSubmitting ? dictionary.form.submitting : dictionary.form.submit}
        </Button>
      </form>
    </div>
  )
}
