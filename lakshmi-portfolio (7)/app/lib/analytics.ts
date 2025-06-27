// Google Analytics configuration
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
    dataLayer: Record<string, any>[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag("js", new Date())
    window.gtag("config", GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track custom events for portfolio interactions
export const trackPortfolioEvent = {
  projectView: (projectName: string) => {
    trackEvent("view_project", "portfolio", projectName)
  },
  blogView: (blogTitle: string) => {
    trackEvent("view_blog", "content", blogTitle)
  },
  downloadResume: () => {
    trackEvent("download", "resume", "pdf")
  },
  contactForm: (method: string) => {
    trackEvent("contact", "engagement", method)
  },
  chatbotInteraction: (query: string) => {
    trackEvent("chatbot_query", "ai_interaction", query)
  },
  skillHover: (skillName: string) => {
    trackEvent("skill_hover", "skills", skillName)
  },
  codingProfileView: (platform: string) => {
    trackEvent("view_coding_profile", "coding", platform)
  },
  hackRankBadgeView: (badgeName: string) => {
    trackEvent("view_badge", "hackerrank", badgeName)
  },
  leetCodeSubmissionView: (problemName: string) => {
    trackEvent("view_submission", "leetcode", problemName)
  },
  codingStatsView: (statType: string) => {
    trackEvent("view_coding_stats", "performance", statType)
  },
}
