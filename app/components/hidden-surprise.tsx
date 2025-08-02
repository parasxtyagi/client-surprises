"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Heart, Star, Sparkles } from "lucide-react"

interface HiddenSurpriseProps {
  onNext: () => void
}

export default function HiddenSurprise({ onNext }: HiddenSurpriseProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [scratchProgress, setScratchProgress] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const handleScratch = () => {
    if (scratchProgress < 100) {
      setScratchProgress((prev) => Math.min(prev + 10, 100))
      if (scratchProgress >= 90) {
        setIsUnlocked(true)
        setTimeout(() => setShowVideo(true), 1000)
      }
    }
  }

  const handleLongPress = () => {
    if (!isUnlocked) {
      setIsUnlocked(true)
      setTimeout(() => setShowVideo(true), 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-pink-600 mb-8 text-center"
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
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-dashed border-pink-300 shadow-xl">
                <CardContent className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-20 h-20 mx-auto mb-6 bg-pink-200 rounded-full flex items-center justify-center"
                  >
                    <Lock className="w-10 h-10 text-pink-600" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">Secret Message Awaits! 💌</h3>

                  <p className="text-gray-600 mb-6">
                    Hold down the scratch card below to reveal your special surprise!
                  </p>

                  {/* Scratch Card */}
                  <motion.div
                    className="relative bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg p-6 cursor-pointer select-none"
                    onMouseDown={handleLongPress}
                    onTouchStart={handleLongPress}
                    onClick={handleScratch}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-white text-center">
                      <Sparkles className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Scratch or Hold Me!</p>
                      <p className="text-sm opacity-80">Progress: {scratchProgress}%</p>
                    </div>

                    {/* Scratch overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gray-400 rounded-lg flex items-center justify-center"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 - scratchProgress / 100 }}
                      style={{
                        background: `linear-gradient(45deg, #ccc ${scratchProgress}%, #999 ${scratchProgress + 10}%)`,
                      }}
                    >
                      <p className="text-white font-medium">Scratch Here!</p>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
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
                <Unlock className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">Surprise Unlocked! 🎉</h3>
              </motion.div>

              <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl">
                <CardContent className="p-6">
                  <AnimatePresence>
                    {showVideo ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-6 text-white mb-4">
                          <Heart className="w-12 h-12 mx-auto mb-4 fill-current" />
                          <h4 className="text-lg font-bold mb-2">A Promise for Our Future</h4>
                          <p className="text-sm leading-relaxed">
                            "I promise to love you through every season of life, to be your partner in all adventures,
                            big and small. To laugh with you, dream with you, and build a beautiful life together. You
                            are my today, my tomorrow, and my always. Here's to forever, my love. ✨"
                          </p>
                        </div>

                        <div className="bg-pink-50 rounded-lg p-4 mb-4">
                          <p className="text-pink-700 text-sm italic">
                            🎥 Imagine a heartfelt video message playing here, with all our favorite memories and my
                            voice telling you how much you mean to me... 💕
                          </p>
                        </div>

                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="text-4xl mb-4"
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
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 pb-20"
      >
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-full"
        >
          <Star className="w-4 h-4 mr-2" />
          More Love Awaits
        </Button>
      </motion.div>
    </div>
  )
}
