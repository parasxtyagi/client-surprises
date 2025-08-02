"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Volume2, Moon, Sun, Play, Pause, SkipForward, SkipBack } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Enhanced floating hearts with different colors and sizes - Mobile optimized
export function EnhancedFloatingHearts() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const heartColors = ["text-pink-400", "text-rose-400", "text-red-400", "text-purple-400", "text-pink-300"]
  const heartSizes = ["w-3 h-3", "w-4 h-4", "w-5 h-5"] // Smaller for mobile
  const heartCount = windowSize.width < 768 ? 6 : 10 // Fewer hearts on mobile

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(heartCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${heartColors[i % heartColors.length]}`}
          initial={{
            x: Math.random() * windowSize.width,
            y: windowSize.height + 50,
            scale: 0.3 + Math.random() * 0.4, // Smaller scale for mobile
            rotate: Math.random() * 360,
          }}
          animate={{
            y: -50,
            x: Math.random() * windowSize.width,
            rotate: Math.random() * 360 + 180,
          }}
          transition={{
            duration: 6 + Math.random() * 4, // Faster on mobile
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.2,
            ease: "linear",
          }}
        >
          <Heart className={`${heartSizes[i % heartSizes.length]} fill-current drop-shadow-sm`} />
        </motion.div>
      ))}
    </div>
  )
}

// Background music player - Mobile optimized
export function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const playlist = [
    { title: "Perfect", artist: "Ed Sheeran" },
    { title: "All of Me", artist: "John Legend" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran" },
    { title: "A Thousand Years", artist: "Christina Perri" },
  ]

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length)
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-16 left-2 z-40 sm:left-4"
    >
      <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-lg">
        <CardContent className="p-2 sm:p-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-pink-500 hover:text-pink-600 hover:bg-pink-100 p-1 sm:p-2"
            >
              {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
            </Button>

            <div className="text-xs">
              <div className="font-medium text-pink-600 text-[10px] sm:text-xs">
                {isPlaying ? "♪ Playing" : "♪ Paused"}
              </div>
              <div className="text-gray-500 truncate max-w-16 sm:max-w-24 text-[9px] sm:text-xs">
                {playlist[currentSong].title}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-pink-400 hover:text-pink-500 p-1 sm:p-2"
            >
              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 pt-2 border-t border-pink-100"
              >
                <div className="flex items-center justify-between space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevSong}
                    className="text-pink-400 hover:text-pink-500 p-1"
                  >
                    <SkipBack className="w-3 h-3" />
                  </Button>

                  <div className="text-center flex-1">
                    <div className="text-[9px] sm:text-xs font-medium text-pink-600 truncate">
                      {playlist[currentSong].title}
                    </div>
                    <div className="text-[8px] sm:text-xs text-gray-500 truncate">{playlist[currentSong].artist}</div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextSong}
                    className="text-pink-400 hover:text-pink-500 p-1"
                  >
                    <SkipForward className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Theme switcher - Mobile optimized
export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-2 left-2 z-40 sm:top-4 sm:left-4"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsDark(!isDark)}
        className="bg-white/80 backdrop-blur-sm border border-pink-200 text-pink-500 hover:text-pink-600 hover:bg-pink-100 p-2 sm:p-3 w-8 h-8 sm:w-10 sm:h-10"
      >
        {isDark ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
      </Button>
    </motion.div>
  )
}

// Interactive particle system - Mobile optimized
export function InteractiveParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const createParticle = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const newParticle = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
    }
    setParticles((prev) => [...prev.slice(-5), newParticle]) // Limit particles on mobile

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
    }, 1500) // Shorter duration on mobile
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-20" onTouchMove={createParticle} onMouseMove={createParticle}>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x - 4,
              y: particle.y - 4,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [1, 0.7, 0],
              y: particle.y - 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute w-2 h-2 bg-pink-400 rounded-full shadow-sm"
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
