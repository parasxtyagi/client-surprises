"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface MobileOptimizedLayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
  currentSection?: number
  totalSections?: number
  onSectionChange?: (section: number) => void
}

export default function MobileOptimizedLayout({
  children,
  showNavigation = true,
  currentSection = 0,
  totalSections = 7,
  onSectionChange,
}: MobileOptimizedLayoutProps) {
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const updateViewportHeight = () => {
      // Use visual viewport API for better mobile support
      const height = window.visualViewport?.height || window.innerHeight
      setViewportHeight(height)
      document.documentElement.style.setProperty("--vh", `${height * 0.01}px`)
    }

    updateViewportHeight()
    window.addEventListener("resize", updateViewportHeight)
    window.visualViewport?.addEventListener("resize", updateViewportHeight)

    return () => {
      window.removeEventListener("resize", updateViewportHeight)
      window.visualViewport?.removeEventListener("resize", updateViewportHeight)
    }
  }, [])

  return (
    <div className="relative w-full" style={{ minHeight: `${viewportHeight}px` }}>
      {/* Main Content Area with proper spacing for navigation */}
      <div className={`w-full ${showNavigation ? "pb-24" : "pb-4"}`}>{children}</div>

      {/* Navigation Dots - Fixed with safe area */}
      {showNavigation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 1rem)" }}
        >
          <div className="flex justify-center items-center py-4 px-4">
            <div className="flex space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-pink-200">
              {Array.from({ length: totalSections }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => onSectionChange?.(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSection === index
                      ? "bg-pink-500 scale-125 shadow-md"
                      : "bg-pink-200 hover:bg-pink-300 hover:scale-110"
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
