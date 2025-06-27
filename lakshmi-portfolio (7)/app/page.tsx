"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Stars, OrbitControls, Preload } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
  ChevronDown,
  Database,
  BarChart3,
  Brain,
  Code,
  Sparkles,
  Cloud,
  Loader2,
} from "lucide-react"
import Image from "next/image"
import { blogPostsData } from "./data/blog-posts"
import { projectsData } from "./data/projects"
import { codingProfilesData } from "./data/coding-profiles"
import { trackPortfolioEvent } from "./lib/analytics"
import { CodingProfileCard } from "./components/coding-profile-card"
import { CodingStatsOverview } from "./components/coding-stats-overview"
import { CodingProgressChart } from "./components/coding-progress-chart"
import { CompetitiveProgrammingTimeline } from "./components/competitive-programming-timeline"

// Lazy load components for better performance
const ChatBot = lazy(() => import("./components/chat-bot").then((module) => ({ default: module.ChatBot })))
const ProjectCard = lazy(() => import("./components/project-card").then((module) => ({ default: module.ProjectCard })))
const BlogCard = lazy(() => import("./components/blog-card").then((module) => ({ default: module.BlogCard })))
const BlogDetail = lazy(() => import("./components/blog-detail").then((module) => ({ default: module.BlogDetail })))
const ProjectDetail = lazy(() =>
  import("./components/project-detail").then((module) => ({ default: module.ProjectDetail })),
)
const SkillOrb = lazy(() => import("./components/skill-orb").then((module) => ({ default: module.SkillOrb })))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
  </div>
)

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [showChatBot, setShowChatBot] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedBlog, setSelectedBlog] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const skills = [
    { name: "Python", level: 85, icon: Code },
    { name: "SQL", level: 80, icon: Database },
    { name: "Power BI", level: 75, icon: BarChart3 },
    { name: "Machine Learning", level: 70, icon: Brain },
    { name: "Tableau", level: 72, icon: BarChart3 },
    { name: "AWS", level: 45, icon: Cloud },
  ]

  const achievements = [
    "Microsoft Azure Data Fundamentals",
    "Google Analytics Certified",
    "Tableau Desktop Specialist",
    "AWS Certified Cloud Practitioner",
    "Microsoft Power BI Data Analyst Associate",
    "Google Data Analytics Professional Certificate",
    "IBM Data Science Professional Certificate",
    "Coursera Machine Learning Specialization",
  ]

  const hobbies = [
    { name: "Astronomy", icon: "🌟" },
    { name: "Photography", icon: "📸" },
    { name: "Chess", icon: "♟️" },
    { name: "Hiking", icon: "🥾" },
    { name: "Reading", icon: "📚" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "coding", "projects", "blog", "achievements", "hobbies", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen galaxy-bg text-white flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold nebula-text">Loading Portfolio...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen galaxy-bg text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform-origin-0 z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold nebula-text"
            >
              GUDIPATI LAKSHMI
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Coding", "Projects", "Blog", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`hover:text-purple-400 transition-colors ${
                    activeSection === item.toLowerCase() ? "text-purple-400" : ""
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full galaxy-bg" />}>
            <Canvas>
              <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate
                autoRotateSpeed={0.5}
              />
              <Preload all />
            </Canvas>
          </Suspense>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-5">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <motion.div
              className="relative w-48 h-48 mx-auto mb-8"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <Image
                src="/placeholder.svg?height=192&width=192"
                alt="Gudipati Lakshmi"
                width={192}
                height={192}
                className="relative z-10 rounded-full border-4 border-white/20"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 nebula-text"
          >
            GUDIPATI LAKSHMI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl md:text-3xl mb-8 text-purple-200"
          >
            Aspiring Data Analyst & Insights Explorer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg mb-12 max-w-2xl mx-auto text-gray-300"
          >
            Passionate about transforming raw data into actionable insights through analytics, visualization, and
            emerging technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-galaxy-gradient hover:bg-cosmic-gradient"
              onClick={() => {
                trackPortfolioEvent.downloadResume()
              }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 animate-bounce text-purple-400" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle, purple 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 nebula-text">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 cosmic-glow">
                <CardContent className="p-8">
                  <p className="text-lg leading-relaxed mb-6">
                    I'm an aspiring Data Analyst with a passion for uncovering insights from complex datasets. Currently
                    building my expertise in statistical analysis, data visualization, and machine learning
                    fundamentals.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Through hands-on projects and continuous learning, I'm developing skills in Python, SQL, Power BI,
                    and cloud technologies. My goal is to help organizations make data-driven decisions that drive
                    growth and innovation.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-purple-600">0-1 Years Experience</Badge>
                    <Badge className="bg-pink-600">6 Projects Completed</Badge>
                    <Badge className="bg-blue-600">8 Certifications</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full h-96">
                <Canvas>
                  <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
                </Canvas>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-xl font-semibold">Data-Driven Learning</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-black/20 relative">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 nebula-text">Skills & Expertise</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <SkillOrb key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </Suspense>
      </section>

      {/* Coding Profiles Section */}
      <section id="coding" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 nebula-text">Coding Performance</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Showcasing problem-solving skills and algorithmic thinking through competitive programming platforms
            </p>
          </motion.div>

          <CodingStatsOverview
            hackerRankData={codingProfilesData.hackerrank}
            leetCodeData={codingProfilesData.leetcode}
          />

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <CodingProfileCard platform="hackerrank" data={codingProfilesData.hackerrank} index={0} />
            <CodingProfileCard platform="leetcode" data={codingProfilesData.leetcode} index={1} />
          </div>

          <div className="max-w-2xl mx-auto">
            <CodingProgressChart leetCodeData={codingProfilesData.leetcode} />
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            <CompetitiveProgrammingTimeline />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 nebula-text">Featured Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  onClick={() => {
                    setSelectedProject(project)
                    trackPortfolioEvent.projectView(project.title)
                  }}
                />
              ))}
            </div>
          </div>
        </Suspense>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-6 bg-black/20">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 nebula-text">Tech Stories & Insights</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPostsData.map((post, index) => (
                <BlogCard
                  key={post.title}
                  post={post}
                  index={index}
                  onClick={() => {
                    setSelectedBlog(post)
                    trackPortfolioEvent.blogView(post.title)
                  }}
                />
              ))}
            </div>
          </div>
        </Suspense>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 nebula-text">Achievements & Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 cosmic-glow hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6 flex items-center">
                    <Award className="h-8 w-8 text-yellow-400 mr-4 flex-shrink-0" />
                    <p className="text-lg">{achievement}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 nebula-text">Hobbies & Interests</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-center"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 cosmic-glow hover:bg-white/20 transition-all duration-300 w-32 h-32 flex items-center justify-center">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{hobby.icon}</div>
                    <p className="text-sm font-medium">{hobby.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 nebula-text">Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 cosmic-glow h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-6 w-6 text-purple-400 mr-4" />
                        <span>lakshmi.gudipati@email.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-6 w-6 text-purple-400 mr-4" />
                        <span>+91 9876543210</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-6 w-6 text-purple-400 mr-4" />
                        <span>Proddatur, Kadapa, Andhra Pradesh, India</span>
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-8">
                      <Button size="sm" className="bg-galaxy-gradient hover:bg-cosmic-gradient">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 cosmic-glow h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Send Message</h3>
                    <form
                      className="space-y-4"
                      onSubmit={() => {
                        trackPortfolioEvent.contactForm("email")
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400"
                      />
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400"
                      ></textarea>
                      <Button className="w-full bg-galaxy-gradient hover:bg-cosmic-gradient">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black/40 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Gudipati Lakshmi. All rights reserved. Built with passion for data and innovation.
          </p>
        </div>
      </footer>

      {/* Enhanced Chatbot with bounce animation */}
      <AnimatePresence>
        {showChatBot && (
          <Suspense fallback={<LoadingSpinner />}>
            <ChatBot onClose={() => setShowChatBot(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Enhanced modals */}
      <AnimatePresence>
        {selectedBlog && (
          <Suspense fallback={<LoadingSpinner />}>
            <BlogDetail post={selectedBlog} onClose={() => setSelectedBlog(null)} />
          </Suspense>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Enhanced Chatbot Toggle with pulse effect */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-lg"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 rounded-full bg-purple-400 opacity-20"
        />
        <MessageCircle className="h-6 w-6 relative z-10" />
      </motion.button>
    </div>
  )
}
