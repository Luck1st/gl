"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Trophy, Code, Target } from "lucide-react"

const timelineData = [
  {
    date: "January 2024",
    title: "Started LeetCode Journey",
    description: "Began daily problem solving with focus on data structures and algorithms",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    achievement: "First 10 problems solved",
  },
  {
    date: "January 2024",
    title: "HackerRank Python Gold Badge",
    description: "Achieved Gold level certification in Python programming",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    achievement: "Gold Badge Earned",
  },
  {
    date: "January 2024",
    title: "SQL Mastery",
    description: "Completed advanced SQL challenges and earned Gold badge",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    achievement: "SQL Gold Badge",
  },
  {
    date: "January 2024",
    title: "100+ Problems Milestone",
    description: "Crossed 100 solved problems across both platforms",
    icon: Calendar,
    color: "from-purple-500 to-pink-500",
    achievement: "100+ Problems",
  },
]

export function CompetitiveProgrammingTimeline() {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-purple-400" />
          Coding Journey Timeline
        </h3>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

          <div className="space-y-6">
            {timelineData.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-start space-x-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    className={`relative z-10 flex items-center justify-center w-8 h-8 bg-gradient-to-r ${item.color} rounded-full`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </motion.div>

                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      className={`inline-block px-3 py-1 bg-gradient-to-r ${item.color} bg-opacity-20 rounded-full text-xs font-medium`}
                    >
                      {item.achievement}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
