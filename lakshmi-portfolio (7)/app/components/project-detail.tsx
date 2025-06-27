"use client"

import { motion } from "framer-motion"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Github, ExternalLink, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface ProjectDetailProps {
  project: {
    id: string
    title: string
    description: string
    fullDescription: string
    tech: string[]
    image: string
    link: string
    githubLink: string
    features: string[]
    challenges: string[]
  }
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
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
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <Button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} className="bg-purple-600/80">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 max-h-96 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Project Overview</h3>
              <p className="text-gray-300 leading-relaxed">{project.fullDescription}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Challenges & Solutions</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 flex gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
            <Button className="bg-gray-600 hover:bg-gray-700">
              <Github className="h-4 w-4 mr-2" />
              Source Code
            </Button>
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  )
}
