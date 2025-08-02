"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Heart, Star, Sparkles, Gift } from "lucide-react"
import MobileOptimizedLayout from "./mobile-optimized-layout"
import MobileResponsiveCard from "./mobile-responsive-card"

interface EnhancedHiddenSurpriseProps {
  onNext: () => void
  currentSection: number
  totalSections: number
  onSectionChange: (section: number) => void
}

export default function EnhancedHiddenSurprise({
  onNext,
  currentSection,
  totalSections,
  onSectionChange,
}: EnhancedHiddenSurpriseProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [scratchProgress, setScratchProgress] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [touchStartTime, setTouchStartTime] = useState<number | null>(null)

  const handleScratch = () => {
    if (scratchProgress < 100) {
      setScratchProgress((prev) => Math.min(prev + 15, 100))

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(30)
      }

      if (scratchProgress >= 85) {
        setIsUnlocked(true)
        setTimeout(() => setShowVideo(true), 1000)
      }
    }
  }

  const handleTouchStart = () => {
    setTouchStartTime(Date.now())
  }

  const handleTouchEnd = () => {
    if (touchStartTime && Date.now() - touchStartTime > 1000) {
      // Long press detected
      setIsUnlocked(true)
      setTimeout(() => setShowVideo(true), 1000)

      // Strong haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100])
      }
    }
    setTouchStartTime(null)
  }

  return (
    <MobileOptimizedLayout
      currentSection={currentSection}
      totalSections={totalSections}
      onSectionChange={onSectionChange}
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-8">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 sm:mb-8 text-center px-4"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          Hidden Surprise 🎭
        </motion.h2>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <MobileResponsiveCard className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-dashed border-pink-300">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Lock className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-800 mb-4">Secret Message Awaits! 💌</h3>

                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                      Scratch the card below or hold it down to reveal your special surprise!
                    </p>

                    {/* Enhanced Scratch Card */}
                    <motion.div
                      className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 rounded-xl p-6 cursor-pointer select-none overflow-hidden"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      onMouseDown={handleTouchStart}
                      onMouseUp={handleTouchEnd}
                      onClick={handleScratch}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400"
                        animate={{
                          background: [
                            "linear-gradient(45deg, #fbbf24, #ec4899)",
                            "linear-gradient(45deg, #ec4899, #8b5cf6)",
                            "linear-gradient(45deg, #8b5cf6, #fbbf24)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      />

                      <div className="relative z-10 text-white text-center">
                        <Sparkles className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-medium text-sm sm:text-base">Scratch or Hold Me!</p>
                        <div className="mt-2 bg-white/20 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="bg-white h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${scratchProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-xs mt-1 opacity-80">Progress: {scratchProgress}%</p>
                      </div>

                      {/* Scratch overlay with particles */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: Math.max(0, 1 - scratchProgress / 100) }}
                      >
                        <div className="text-white font-medium text-center">
                          <Gift className="w-8 h-8 mx-auto mb-2" />
                          <p>Scratch Here!</p>
                        </div>

                        {/* Scratch particles */}
                        {scratchProgress > 0 && (
                          <div className="absolute inset-0">
                            {[...Array(Math.floor(scratchProgress / 10))].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full"
                                initial={{
                                  x: Math.random() * 200,
                                  y: Math.random() * 150,
                                  opacity: 1,
                                }}
                                animate={{
                                  y: Math.random() * 150 + 50,
                                  opacity: 0,
                                }}
                                transition={{ duration: 1 }}
                              />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </MobileResponsiveCard>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Unlock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Surprise Unlocked! 🎉</h3>
                </motion.div>

                <MobileResponsiveCard>
                  <AnimatePresence>
                    {showVideo ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white mb-6 shadow-lg">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Heart className="w-12 h-12 mx-auto mb-4 fill-current" />
                          </motion.div>
                          <h4 className="text-lg sm:text-xl font-bold mb-4">A Promise for Our Future</h4>
                          <p className="text-sm sm:text-base leading-relaxed">
                            "I promise to love you through every season of life, to be your partner in all adventures,
                            big and small. To laugh with you, dream with you, and build a beautiful life together. You
                            are my today, my tomorrow, and my always. Here's to forever, my love. ✨"
                          </p>
                        </div>

                        <div className="bg-pink-50 rounded-lg p-4 mb-6">
                          <p className="text-pink-700 text-sm italic">
                            🎥 Imagine a heartfelt video message playing here, with all our favorite memories and my
                            voice telling you how much you mean to me... 💕
                          </p>
                        </div>

                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="text-6xl mb-4"
                        >
                          💖
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-gray-600">Loading your surprise...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </MobileResponsiveCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <div className="mt-8 pb-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <Button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Star className="w-4 h-4 mr-2" />
              More Love Awaits
            </Button>
          </motion.div>
        </div>
      </div>
    </MobileOptimizedLayout>
  )
}
