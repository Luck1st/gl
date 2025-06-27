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

export function EnhancedSkillOrb({ skill, index }: SkillOrbProps) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 15,
        z: 50,
        transition: { duration: 0.3 },
      }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-0 group-hover:opacity-30"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden relative">
        <CardContent className="p-6 text-center relative z-10">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
            initial={false}
            animate={{
              background: [
                "linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
                "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2))",
                "linear-gradient(225deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
            <Icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          </motion.div>

          <h3 className="text-xl font-bold mb-2">{skill.name}</h3>

          <div className="w-full bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
            <motion.div
              initial={{ width: 0, x: -100 }}
              whileInView={{ width: `${skill.level}%`, x: 0 }}
              transition={{
                duration: 1.5,
                delay: index * 0.1 + 0.5,
                ease: "easeOut",
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full relative"
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          <motion.p
            className="text-sm text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 1 }}
          >
            {skill.level}% Proficiency
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
