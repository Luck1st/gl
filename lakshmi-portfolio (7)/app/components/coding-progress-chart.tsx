"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"

interface CodingProgressChartProps {
  leetCodeData: any
}

export function CodingProgressChart({ leetCodeData }: CodingProgressChartProps) {
  const difficultyData = [
    {
      name: "Easy",
      solved: leetCodeData.stats.easy,
      total: 150,
      color: "from-green-500 to-emerald-500",
      percentage: (leetCodeData.stats.easy / 150) * 100,
    },
    {
      name: "Medium",
      solved: leetCodeData.stats.medium,
      total: 100,
      color: "from-yellow-500 to-orange-500",
      percentage: (leetCodeData.stats.medium / 100) * 100,
    },
    {
      name: "Hard",
      solved: leetCodeData.stats.hard,
      total: 50,
      color: "from-red-500 to-rose-500",
      percentage: (leetCodeData.stats.hard / 50) * 100,
    },
  ]

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-orange-400" />
          <h3 className="text-lg font-semibold">Problem Difficulty Progress</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {difficultyData.map((difficulty, index) => (
          <motion.div
            key={difficulty.name}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{difficulty.name}</span>
              <span className="text-sm text-gray-400">
                {difficulty.solved}/{difficulty.total}
              </span>
            </div>

            <div className="relative">
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${difficulty.percentage}%` }}
                  transition={{ duration: 1.5, delay: index * 0.3, ease: "easeOut" }}
                  className={`bg-gradient-to-r ${difficulty.color} h-3 rounded-full relative`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.3 + 1, type: "spring" }}
                className="absolute right-0 top-0 transform translate-x-2 -translate-y-1"
              >
                <div
                  className={`bg-gradient-to-r ${difficulty.color} text-white text-xs px-2 py-1 rounded-full font-medium`}
                >
                  {difficulty.percentage.toFixed(1)}%
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="pt-4 border-t border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium">Overall Progress</span>
            </div>
            <span className="text-sm text-green-400 font-medium">
              {((leetCodeData.stats.totalSolved / 300) * 100).toFixed(1)}% Complete
            </span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
