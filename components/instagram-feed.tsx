"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InstagramFeedProps {
  dictionary: {
    title: string
    subtitle: string
    followUs: string
    viewOnInstagram: string
  }
}

interface InstagramPost {
  id: string
  imageUrl: string
  likes: number
  comments: number
  caption: string
  url: string
}

export function InstagramFeed({ dictionary }: InstagramFeedProps) {
  const mockInstagramPosts: InstagramPost[] = [
    {
      id: "1",
      imageUrl: "/images/instagram-1.jpg",
      likes: 124,
      comments: 23,
      caption: "Happy client after grooming! 🐶✨",
      url: "https://www.instagram.com/p/example1/",
    },
    {
      id: "2",
      imageUrl: "/images/instagram-2.jpg",
      likes: 98,
      comments: 15,
      caption: "Complete transformation for this poodle. 💇‍♀️",
      url: "https://www.instagram.com/p/example2/",
    },
    {
      id: "3",
      imageUrl: "/images/instagram-3.jpg",
      likes: 156,
      comments: 32,
      caption: "Premium services for premium pets. 📱",
      url: "https://www.instagram.com/p/example3/",
    },
    {
      id: "4",
      imageUrl: "/images/instagram-4.jpg",
      likes: 87,
      comments: 12,
      caption: "Our team is ready to pamper your pet. 🛁",
      url: "https://www.instagram.com/p/example4/",
    },
    {
      id: "5",
      imageUrl: "/images/instagram-5.jpg",
      likes: 203,
      comments: 45,
      caption: "Every dog deserves to look amazing. ✨",
      url: "https://www.instagram.com/p/example5/",
    },
    {
      id: "6",
      imageUrl: "/images/instagram-6.jpg",
      likes: 134,
      comments: 28,
      caption: "We use premium products. 🧴",
      url: "https://www.instagram.com/p/example6/",
    },
  ]

  const [posts, setPosts] = useState<InstagramPost[]>(mockInstagramPosts)
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24 bg-sky-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Instagram className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {dictionary.title}
            </h2>
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={item}
              className="relative group overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedPost(post)}
            >
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="https://www.instagram.com/laperruqueria/" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" />
              {dictionary.followUs}
            </Link>
          </Button>
        </div>

        {selectedPost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-square">
                  <Image
                    src={selectedPost.imageUrl || "/placeholder.svg"}
                    alt={selectedPost.caption}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <span className="font-bold">LP</span>
                      </div>
                      <span className="font-medium">laperruqueria</span>
                    </div>
                    <button onClick={() => setSelectedPost(null)} className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="mb-4">{selectedPost.caption}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-5 w-5" />
                      <span>{selectedPost.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-5 w-5" />
                      <span>{selectedPost.comments} comments</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Button asChild variant="outline" className="w-full gap-2">
                      <Link href={selectedPost.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        {dictionary.viewOnInstagram}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
