"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Palette, X } from "lucide-react"

interface ThemeCustomizerProps {
  onClose: () => void
}

const colorThemes = [
  {
    name: "Galaxy Purple",
    primary: "from-purple-600 to-indigo-600",
    secondary: "from-pink-500 to-purple-500",
    accent: "from-blue-500 to-purple-500",
    background: "from-purple-900 via-blue-900 to-indigo-900",
  },
  {
    name: "Cosmic Pink",
    primary: "from-pink-600 to-rose-600",
    secondary: "from-purple-500 to-pink-500",
    accent: "from-rose-500 to-pink-500",
    background: "from-pink-900 via-purple-900 to-rose-900",
  },
  {
    name: "Nebula Blue",
    primary: "from-blue-600 to-cyan-600",
    secondary: "from-indigo-500 to-blue-500",
    accent: "from-cyan-500 to-blue-500",
    background: "from-blue-900 via-indigo-900 to-cyan-900",
  },
  {
    name: "Aurora Green",
    primary: "from-emerald-600 to-teal-600",
    secondary: "from-green-500 to-emerald-500",
    accent: "from-teal-500 to-emerald-500",
    background: "from-emerald-900 via-teal-900 to-green-900",
  },
]

export function ThemeCustomizer({ onClose }: ThemeCustomizerProps) {
  const [selectedTheme, setSelectedTheme] = useState(0)

  const applyTheme = (theme: (typeof colorThemes)[0]) => {
    // Update CSS custom properties
    const root = document.documentElement
    root.style.setProperty("--theme-primary", theme.primary)
    root.style.setProperty("--theme-secondary", theme.secondary)
    root.style.setProperty("--theme-accent", theme.accent)
    root.style.setProperty("--theme-background", theme.background)

    // Store theme preference
    localStorage.setItem("portfolio-theme", JSON.stringify(theme))
  }

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
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Theme Customizer</h3>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-300">Choose your preferred color theme:</p>

          <div className="grid grid-cols-2 gap-3">
            {colorThemes.map((theme, index) => (
              <motion.div
                key={theme.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer rounded-lg p-3 border-2 transition-all ${
                  selectedTheme === index ? "border-purple-400 bg-white/20" : "border-white/20 hover:border-white/40"
                }`}
                onClick={() => {
                  setSelectedTheme(index)
                  applyTheme(theme)
                }}
              >
                <div className="space-y-2">
                  <div className={`h-8 rounded bg-gradient-to-r ${theme.primary}`} />
                  <div className={`h-4 rounded bg-gradient-to-r ${theme.secondary}`} />
                  <div className={`h-2 rounded bg-gradient-to-r ${theme.accent}`} />
                  <p className="text-xs font-medium text-center">{theme.name}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/20">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Apply Theme
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
