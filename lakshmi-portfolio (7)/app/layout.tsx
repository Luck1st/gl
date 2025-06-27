import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { GoogleAnalytics } from "./components/google-analytics"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gudipati Lakshmi - Data Analyst Portfolio",
  description:
    "Aspiring Data Analyst specializing in transforming complex datasets into actionable insights through analytics, visualization, and machine learning.",
  keywords: "data analyst, data science, machine learning, python, sql, power bi, tableau, portfolio",
  authors: [{ name: "Gudipati Lakshmi" }],
  openGraph: {
    title: "Gudipati Lakshmi - Data Analyst Portfolio",
    description: "Explore my journey in data analytics with interactive projects, insights, and 3D visualizations.",
    url: "https://yourusername.github.io/lakshmiresume",
    siteName: "Gudipati Lakshmi Portfolio",
    images: [
      {
        url: "/placeholder.svg?height=1200&width=630",
        width: 1200,
        height: 630,
        alt: "Gudipati Lakshmi - Data Analyst Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gudipati Lakshmi - Data Analyst Portfolio",
    description: "Aspiring Data Analyst with expertise in Python, SQL, and Machine Learning",
    images: ["/placeholder.svg?height=1200&width=630"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className={`${inter.className} galaxy-bg`}>
        <Suspense fallback={<div>Loading...</div>}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
