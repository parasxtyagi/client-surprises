"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Calendar,
  Heart,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Settings,
  Music,
} from "lucide-react"

interface MobileUIManagerProps {
  currentSection: number
  totalSections: number
  onSectionChange: (section: number) => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  isPlaying: boolean
  onToggleMusic: () => void
  currentSong: number
  onNextSong: () => void
  onPrevSong: () => void
  playlist: Array<{ title: string; artist: string }>
}

export default function MobileUIManager({
  currentSection,
  totalSections,
  onSectionChange,
  isDarkMode,
  onToggleDarkMode,
  isPlaying,
  onToggleMusic,
  currentSong,
  onNextSong,
  onPrevSong,
  playlist,
}: MobileUIManagerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCountdown, setShowCountdown] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Countdown logic for August 17th birthday
  useEffect(() => {
    const targetDate = new Date("2025-08-17T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const sectionNames = ["Welcome", "Our Story", "Memories", "Quiz Time", "Gifts", "Surprise", "Love Notes"]

  return (
    <>
      {/* Clean Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-pink-200 dark:border-pink-800">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-pink-100 dark:hover:bg-pink-900"
          >
            <Menu className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </Button>

          {/* Center: Progress & Section Name */}
          <div className="flex-1 mx-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                {sectionNames[currentSection]}
              </h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 max-w-32 h-1.5 bg-pink-100 dark:bg-pink-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs text-pink-600 dark:text-pink-400 font-medium">
                  {currentSection + 1}/{totalSections}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Music Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMusic}
            className="p-2 hover:bg-pink-100 dark:hover:bg-pink-900"
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
          </Button>
        </div>
      </div>

      {/* Compact Countdown Widget - Updated for August 17th Birthday */}
      <AnimatePresence>
        {showCountdown && !isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-4 z-40"
          >
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-pink-200 dark:border-pink-800 shadow-lg">
              <CardContent className="p-2">
                <div className="flex items-center space-x-2 text-xs">
                  <Calendar className="w-3 h-3 text-pink-500" />
                  <div className="flex space-x-1">
                    <span className="font-bold text-pink-600 dark:text-pink-400">{timeLeft.days}d</span>
                    <span className="font-bold text-pink-600 dark:text-pink-400">{timeLeft.hours}h</span>
                    <span className="font-bold text-pink-600 dark:text-pink-400">{timeLeft.minutes}m</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCountdown(false)}
                    className="p-0 h-4 w-4 hover:bg-pink-100 dark:hover:bg-pink-900"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-pink-200 dark:border-pink-800">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-pink-500 fill-current" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Love Story</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)} className="p-2">
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2 mb-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Navigate
                    </h3>
                    {sectionNames.map((name, index) => (
                      <Button
                        key={index}
                        variant={currentSection === index ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          currentSection === index
                            ? "bg-pink-500 hover:bg-pink-600 text-white"
                            : "hover:bg-pink-50 dark:hover:bg-pink-900"
                        }`}
                        onClick={() => {
                          onSectionChange(index)
                          setIsMenuOpen(false)
                        }}
                      >
                        <span className="mr-3">{index + 1}</span>
                        {name}
                      </Button>
                    ))}
                  </div>

                  {/* Enhanced Music Player with Updated Playlist */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center">
                      <Music className="w-4 h-4 mr-2" />
                      Our Special Playlist
                    </h3>
                    <Card className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
                      <CardContent className="p-4">
                        <div className="text-center mb-3">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                            {playlist[currentSong]?.title || "No Song"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {playlist[currentSong]?.artist || "Unknown Artist"}
                          </p>
                        </div>

                        <div className="flex items-center justify-center space-x-4">
                          <Button variant="ghost" size="sm" onClick={onPrevSong}>
                            <SkipBack className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleMusic}
                            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full w-10 h-10"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={onNextSong}>
                            <SkipForward className="w-4 h-4" />
                          </Button>
                        </div>

                        {isPlaying && (
                          <div className="mt-3 w-full bg-pink-200 dark:bg-pink-800 rounded-full h-1">
                            <motion.div
                              className="bg-pink-500 h-1 rounded-full"
                              animate={{ width: ["0%", "100%"] }}
                              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY }}
                            />
                          </div>
                        )}

                        {/* Enhanced Playlist Info */}
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                          Track {currentSong + 1} of {playlist.length} • Mix of Taylor Swift, Lana Del Rey, K-Pop &
                          Bollywood
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Countdown - Updated for August 17th Birthday */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      Your Special Day
                    </h3>
                    <Card className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-xs text-pink-600 dark:text-pink-400 mb-2">August 17th Birthday</p>
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div>
                              <div className="text-lg font-bold text-pink-600 dark:text-pink-400">{timeLeft.days}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-pink-600 dark:text-pink-400">{timeLeft.hours}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Hours</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                                {timeLeft.minutes}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Min</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                                {timeLeft.seconds}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Sec</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Menu Footer */}
                <div className="p-4 border-t border-pink-200 dark:border-pink-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Settings</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className="p-2">
                      {isDarkMode ? (
                        <Sun className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <Moon className="w-4 h-4 text-gray-600" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Bottom Navigation with Smaller Dots */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-pink-200 dark:border-pink-800">
        <div
          className="flex justify-center items-center py-3 px-4"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex space-x-2 bg-pink-50/80 dark:bg-pink-900/20 rounded-full px-3 py-2 backdrop-blur-sm border border-pink-100 dark:border-pink-800/50">
            {Array.from({ length: totalSections }).map((_, index) => (
              <button
                key={index}
                onClick={() => onSectionChange(index)}
                className={`relative transition-all duration-300 ease-out ${
                  currentSection === index
                    ? "w-2.5 h-2.5 sm:w-3 sm:h-3"
                    : "w-2 h-2 sm:w-2.5 sm:h-2.5 hover:w-2.5 hover:h-2.5 sm:hover:w-3 sm:hover:h-3"
                } rounded-full ${
                  currentSection === index
                    ? "bg-pink-500 shadow-lg shadow-pink-500/30 scale-110"
                    : "bg-pink-200 dark:bg-pink-700 hover:bg-pink-300 dark:hover:bg-pink-600 hover:scale-105"
                }`}
                aria-label={`Go to ${sectionNames[index]}`}
                style={{
                  minWidth: "8px",
                  minHeight: "8px",
                }}
              >
                {/* Active indicator ring */}
                {currentSection === index && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 rounded-full border-2 border-pink-300 dark:border-pink-400 animate-pulse"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
