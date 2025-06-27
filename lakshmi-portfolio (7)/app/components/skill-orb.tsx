"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface SkillOrbProps {
  skill: {
    name: string
    level: number
    icon: LucideIcon
  }
  index: number
}

export function SkillOrb({ skill, index }: SkillOrbProps) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className="relative"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden">
        <CardContent className="p-6 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <Icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              ></motion.div>
            </div>
            <p className="text-sm text-gray-300">{skill.level}% Proficiency</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
