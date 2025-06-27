"use client"

import { motion } from "framer-motion"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Calendar, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface BlogDetailProps {
  post: {
    id: string
    title: string
    excerpt: string
    content: string
    date: string
    readTime: string
    image: string
    author: string
  }
  onClose: () => void
}

export function BlogDetail({ post, onClose }: BlogDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md border border-white/20 rounded-lg max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="relative p-0">
          <div className="relative h-64 overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <Button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center space-x-4 text-sm mb-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              <h1 className="text-3xl font-bold">{post.title}</h1>
              <p className="text-purple-200 mt-2">By {post.author}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 max-h-96 overflow-y-auto">
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed space-y-4">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  )
}
