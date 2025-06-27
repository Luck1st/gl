"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface ColorTheme {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
}

interface ColorThemeContextType {
  theme: ColorTheme
  setTheme: (theme: ColorTheme) => void
  themes: ColorTheme[]
}

const defaultThemes: ColorTheme[] = [
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
]

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined)

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ColorTheme>(defaultThemes[0])

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setTheme(parsedTheme)
      } catch (error) {
        console.error("Error loading saved theme:", error)
      }
    }
  }, [])

  const updateTheme = (newTheme: ColorTheme) => {
    setTheme(newTheme)
    localStorage.setItem("portfolio-theme", JSON.stringify(newTheme))

    // Update CSS custom properties
    const root = document.documentElement
    root.style.setProperty("--theme-primary", newTheme.primary)
    root.style.setProperty("--theme-secondary", newTheme.secondary)
    root.style.setProperty("--theme-accent", newTheme.accent)
    root.style.setProperty("--theme-background", newTheme.background)
  }

  return (
    <ColorThemeContext.Provider value={{ theme, setTheme: updateTheme, themes: defaultThemes }}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext)
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider")
  }
  return context
}
