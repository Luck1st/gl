"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    tech: string[]
    image: string
    link: string
  }
  index: number
  onClick: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateX: 5 }}
      className="group"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden h-full">
        <div className="relative overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-purple-600/20 text-purple-300">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={onClick} size="sm" className="bg-purple-600 hover:bg-purple-700 flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Project
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
            >
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
