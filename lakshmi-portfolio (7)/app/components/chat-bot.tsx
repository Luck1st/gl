"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Bot, User } from "lucide-react"

interface ChatBotProps {
  onClose: () => void
}

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Lakshmi's AI assistant. I can help you learn more about her skills, projects, and experience. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("skill") || lowerInput.includes("technology")) {
      return "Lakshmi is developing skills in Python, SQL, Power BI, Machine Learning, Tableau, and AWS. She's an aspiring data analyst with 0-1 years of experience and has completed 6 projects!"
    } else if (lowerInput.includes("project")) {
      return "Some of her notable projects include Customer Churn Prediction, Sales Analytics Dashboard, Market Basket Analysis, Sentiment Analysis, Inventory Optimization, and Web Analytics Dashboard. Each project showcases her growing expertise in data science."
    } else if (lowerInput.includes("experience") || lowerInput.includes("work")) {
      return "Lakshmi is an aspiring Data Analyst with 0-1 years of experience, specializing in learning how to transform complex datasets into actionable business insights. She's passionate about continuous learning and skill development."
    } else if (lowerInput.includes("contact") || lowerInput.includes("reach")) {
      return "You can reach Lakshmi at lakshmi.gudipati@email.com or connect with her on LinkedIn and GitHub. She's based in Proddatur, Kadapa, Andhra Pradesh, India and is always open to discussing data analytics opportunities!"
    } else if (lowerInput.includes("education") || lowerInput.includes("certification")) {
      return "Lakshmi holds 8 certifications including Microsoft Azure Data Fundamentals, Google Analytics Certified, Tableau Desktop Specialist, AWS Certified Cloud Practitioner, and several other professional certificates in data analytics."
    } else {
      return "That's a great question! Lakshmi is passionate about data analytics and machine learning. Feel free to ask about her skills, projects, experience, or how to get in touch with her."
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-20 right-6 z-50 w-80 h-96"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-purple-400" />
            <span className="font-semibold">AI Assistant</span>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user" ? "bg-purple-600 text-white" : "bg-white/20 text-white"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-purple-400" />}
                    {message.sender === "user" && <User className="h-4 w-4 mt-0.5" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <div className="p-4 border-t border-white/20">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything..."
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button size="sm" onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
