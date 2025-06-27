"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Trophy, Target, Calendar, Code2 } from "lucide-react"
import { trackPortfolioEvent } from "../lib/analytics"

interface CodingProfileCardProps {
  platform: string
  data: any
  index: number
}

export function CodingProfileCard({ platform, data, index }: CodingProfileCardProps) {
  const isHackerRank = platform === "hackerrank"

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden h-full">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${isHackerRank ? "bg-green-500/20" : "bg-orange-500/20"}`}>
                <Code2 className={`h-6 w-6 ${isHackerRank ? "text-green-400" : "text-orange-400"}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold capitalize">{platform}</h3>
                <p className="text-sm text-gray-400">@{data.username}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
              onClick={() => {
                trackPortfolioEvent.codingProfileView(platform)
                window.open(data.profileUrl, "_blank")
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {isHackerRank ? (
              <>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{data.stats.problemsSolved}</p>
                  <p className="text-xs text-gray-400">Problems</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Target className="h-5 w-5 text-green-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{data.stats.score}</p>
                  <p className="text-xs text-gray-400">Score</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{data.stats.contests}</p>
                  <p className="text-xs text-gray-400">Contests</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{data.badges.length}</p>
                  <p className="text-xs text-gray-400">Badges</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Code2 className="h-5 w-5 text-green-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{data.stats.totalSolved}</p>
                  <p className="text-xs text-gray-400">Solved</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Target className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{data.stats.acceptanceRate}</p>
                  <p className="text-xs text-gray-400">Acceptance</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{data.streaks.current}</p>
                  <p className="text-xs text-gray-400">Streak</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{data.stats.contestRating}</p>
                  <p className="text-xs text-gray-400">Rating</p>
                </div>
              </>
            )}
          </div>

          {/* Badges or Difficulty Breakdown */}
          {isHackerRank ? (
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
                Top Badges
              </h4>
              <div className="space-y-2">
                {data.badges.slice(0, 3).map((badge: any, badgeIndex: number) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: badgeIndex * 0.1 }}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{badge.icon}</span>
                      <span className="text-sm font-medium">{badge.name}</span>
                    </div>
                    <Badge className={`bg-gradient-to-r ${badge.color} text-white text-xs`}>{badge.level}</Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold mb-3">Problem Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-400">Easy</span>
                  <span className="text-sm font-medium">{data.stats.easy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-yellow-400">Medium</span>
                  <span className="text-sm font-medium">{data.stats.medium}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-400">Hard</span>
                  <span className="text-sm font-medium">{data.stats.hard}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
