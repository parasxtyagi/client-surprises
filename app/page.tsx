"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EnhancedHeroSection from "./components/enhanced-hero-section"
import EnhancedTimeline from "./components/enhanced-timeline"
import EnhancedPolaroidGallery from "./components/enhanced-polaroid-gallery"
import EnhancedQuizSection from "./components/enhanced-quiz-section"
import EnhancedDigitalGiftBasket from "./components/enhanced-digital-gift-basket"
import EnhancedHiddenSurprise from "./components/enhanced-hidden-surprise"
import EnhancedLoveCarousel from "./components/enhanced-love-carousel"
import MobileUIManager from "./components/mobile-ui-manager"
import { EnhancedFloatingHearts } from "./components/enhanced-features"
import SwipeHandler from "./components/swipe-handler"
import {
  PWAInstallPrompt,
  OfflineIndicator,
  NotificationPermission,
  InteractiveParticles,
} from "./components/pwa-features"

export default function GirlfriendSurprise() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)

  // Updated playlist with requested tracks
  const playlist = [
    { title: "Lover", artist: "Taylor Swift" },
    { title: "Wildest Dreams", artist: "Taylor Swift" },
    { title: "White Mustang", artist: "Lana Del Rey" },
    { title: "Chemtrails", artist: "Lana Del Rey" },
    { title: "Drinks or Coffee / Gameboy", artist: "Rosé" },
    { title: "Your Love", artist: "Jisoo" },
    { title: "Khuda Jaane", artist: "Bollywood" },
    { title: "Tum Mile", artist: "Bollywood" },
    { title: "Titli", artist: "Bollywood" },
    { title: "Perfect", artist: "Ed Sheeran" },
    { title: "All of Me", artist: "John Legend" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran" },
  ]

  const sections = [
    { id: "hero", component: EnhancedHeroSection },
    { id: "timeline", component: EnhancedTimeline },
    { id: "gallery", component: EnhancedPolaroidGallery },
    { id: "quiz", component: EnhancedQuizSection },
    { id: "gifts", component: EnhancedDigitalGiftBasket },
    { id: "surprise", component: EnhancedHiddenSurprise },
    { id: "carousel", component: EnhancedLoveCarousel },
  ]

  const CurrentComponent = sections[currentSection].component

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        setCurrentSection((prev) => (prev + 1) % sections.length)
      } else if (e.key === "ArrowLeft") {
        setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length)
      } else if (e.key === "d" || e.key === "D") {
        setIsDarkMode((prev) => !prev)
      } else if (e.key === "m" || e.key === "M") {
        setIsPlaying((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [sections.length])

  // Enhanced section change handler
  const handleSectionChange = (newSection: number) => {
    setCurrentSection(newSection)

    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30)
    }
  }

  const handleToggleMusic = () => {
    setIsPlaying((prev) => !prev)

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const handleNextSong = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length)

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30)
    }
  }

  const handlePrevSong = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length)

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30)
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50"
      } relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-60">
        <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 dark:bg-pink-600 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-3 h-3 bg-purple-300 dark:bg-purple-600 rounded-full animate-bounce" />
        <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-rose-300 dark:bg-rose-600 rounded-full animate-ping" />
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-pink-400 dark:bg-pink-500 rounded-full animate-pulse" />
      </div>

      {/* Enhanced Floating Hearts Animation */}
      <EnhancedFloatingHearts />

      {/* Mobile UI Manager - Replaces all scattered UI elements */}
      <MobileUIManager
        currentSection={currentSection}
        totalSections={sections.length}
        onSectionChange={handleSectionChange}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isPlaying={isPlaying}
        onToggleMusic={handleToggleMusic}
        currentSong={currentSong}
        onNextSong={handleNextSong}
        onPrevSong={handlePrevSong}
        playlist={playlist}
      />

      {/* Main Content with Enhanced Swipe Handler */}
      <SwipeHandler
        onSwipeLeft={() => handleSectionChange((currentSection + 1) % sections.length)}
        onSwipeRight={() => handleSectionChange((currentSection - 1 + sections.length) % sections.length)}
        threshold={75}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-20"
          >
            <CurrentComponent
              onNext={() => handleSectionChange((currentSection + 1) % sections.length)}
              currentSection={currentSection}
              totalSections={sections.length}
              onSectionChange={handleSectionChange}
            />
          </motion.div>
        </AnimatePresence>
      </SwipeHandler>

      {/* Enhanced Sparkle Effect on Tap */}
      <div
        className="fixed inset-0 z-30 pointer-events-none"
        onClick={(e) => {
          const sparkle = document.createElement("div")
          sparkle.className = "absolute pointer-events-none"
          sparkle.style.left = e.clientX + "px"
          sparkle.style.top = e.clientY + "px"
          sparkle.innerHTML = `
            <div class="text-yellow-400 animate-ping">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          `
          document.body.appendChild(sparkle)
          setTimeout(() => sparkle.remove(), 1000)

          // Haptic feedback
          if (navigator.vibrate) {
            navigator.vibrate(25)
          }
        }}
      />

      {/* PWA Features */}
      <PWAInstallPrompt />
      <OfflineIndicator />
      <NotificationPermission />
      <InteractiveParticles />
    </div>
  )
}
