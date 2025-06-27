"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Target, Code, TrendingUp, Calendar, Award } from "lucide-react"

interface CodingStatsOverviewProps {
  hackerRankData: any
  leetCodeData: any
}

export function CodingStatsOverview({ hackerRankData, leetCodeData }: CodingStatsOverviewProps) {
  const combinedStats = {
    totalProblems: hackerRankData.stats.problemsSolved + leetCodeData.stats.totalSolved,
    totalBadges: hackerRankData.badges.length,
    totalCertificates: hackerRankData.stats.certificates,
    averageAcceptance: Number.parseFloat(leetCodeData.stats.acceptanceRate.replace("%", "")),
    activeStreak: leetCodeData.streaks.current,
    contestsParticipated: hackerRankData.stats.contests + leetCodeData.stats.contestsAttended,
  }

  const statsCards = [
    {
      title: "Problems Solved",
      value: combinedStats.totalProblems,
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      description: "Across both platforms",
    },
    {
      title: "Skill Badges",
      value: combinedStats.totalBadges,
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      description: "HackerRank achievements",
    },
    {
      title: "Certificates",
      value: combinedStats.totalCertificates,
      icon: Award,
      color: "from-green-500 to-emerald-500",
      description: "Professional certifications",
    },
    {
      title: "Acceptance Rate",
      value: `${combinedStats.averageAcceptance.toFixed(1)}%`,
      icon: Target,
      color: "from-purple-500 to-pink-500",
      description: "LeetCode success rate",
    },
    {
      title: "Current Streak",
      value: `${combinedStats.activeStreak} days`,
      icon: Calendar,
      color: "from-red-500 to-rose-500",
      description: "Daily coding streak",
    },
    {
      title: "Contests",
      value: combinedStats.contestsParticipated,
      icon: TrendingUp,
      color: "from-indigo-500 to-blue-500",
      description: "Programming contests",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.2 },
            }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden relative group">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20`}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <CardContent className="p-4 text-center relative z-10">
                <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }} className="mb-3">
                  <Icon className={`h-8 w-8 mx-auto bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </motion.div>

                <motion.p
                  className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  {stat.value}
                </motion.p>

                <p className="text-sm font-medium text-white mb-1">{stat.title}</p>
                <p className="text-xs text-gray-400">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
