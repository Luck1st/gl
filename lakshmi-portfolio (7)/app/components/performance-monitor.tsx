"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [showMonitor, setShowMonitor] = useState(false)

  useEffect(() => {
    let lastTime = performance.now()
    let frameCount = 0

    const calculateFPS = () => {
      const currentTime = performance.now()
      frameCount++

      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(calculateFPS)
    }

    calculateFPS()

    // Show monitor only in development
    setShowMonitor(process.env.NODE_ENV === "development")
  }, [])

  if (!showMonitor) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-20 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-xs"
      >
        <div>FPS: {fps}</div>
        <div className={`${fps > 30 ? "text-green-400" : fps > 15 ? "text-yellow-400" : "text-red-400"}`}>
          Performance: {fps > 30 ? "Good" : fps > 15 ? "Fair" : "Poor"}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
