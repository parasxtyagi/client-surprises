"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface ProgressIndicatorProps {
  currentSection: number
  totalSections: number
}

export default function ProgressIndicator({ currentSection, totalSections }: ProgressIndicatorProps) {
  const progress = ((currentSection + 1) / totalSections) * 100

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-40 sm:top-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg border border-pink-200">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500 fill-current" />
          <div className="w-20 h-1.5 sm:w-32 sm:h-2 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs sm:text-sm font-medium text-pink-600">
            {currentSection + 1}/{totalSections}
          </span>
        </div>
      </div>
    </div>
  )
}
