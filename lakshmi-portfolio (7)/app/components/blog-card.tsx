"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"

interface BlogCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    date: string
    readTime: string
    image: string
  }
  index: number
  onClick: () => void
}

export function BlogCard({ post, index, onClick }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden h-full">
        <div className="relative overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={250}
            height={150}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-sm text-white">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
          <Button
            onClick={onClick}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group"
          >
            Read More
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
