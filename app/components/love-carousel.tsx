"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ChevronRight, Quote, Home } from "lucide-react"

const loveReasons = [
  "Your smile lights up my entire world ✨",
  "The way you laugh at my terrible jokes 😄",
  "How you make ordinary moments feel magical 🌟",
  "Your kindness to everyone you meet 💕",
  "The way you dance in our kitchen 💃",
  "How you believe in my dreams 🌙",
  "Your beautiful, caring heart ❤️",
  "The way you make me feel at home 🏠",
  "How you turn my bad days into good ones ☀️",
  "Your incredible strength and courage 💪",
  "The way you love with your whole heart 💖",
  "How you make me want to be better 🌱",
  "Your adorable sleepy face in the morning 😴",
  "The way you hold my hand 🤝",
  "How you make me laugh until I cry 😂",
  "Your amazing hugs that fix everything 🤗",
  "The way you listen to me ramble 👂",
  "How you make me feel so loved 💝",
  "Your beautiful soul that shines so bright ✨",
  "Simply because you're you, and that's perfect 🥰",
]

const loveQuotes = [
  "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine. - Maya Angelou",
  "You are my sun, my moon, and all my stars. - E.E. Cummings",
  "I have found the one whom my soul loves. - Song of Solomon 3:4",
  "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
  "You are my today and all of my tomorrows. - Leo Christopher",
  "I love you not only for what you are, but for what I am when I am with you. - Elizabeth Barrett Browning",
]

interface LoveCarouselProps {
  onNext: () => void
}

export default function LoveCarousel({ onNext }: LoveCarouselProps) {
  const [currentReason, setCurrentReason] = useState(0)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentReason((prev) => (prev + 1) % loveReasons.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [autoPlay])

  const nextReason = () => {
    setCurrentReason((prev) => (prev + 1) % loveReasons.length)
    setAutoPlay(false)
  }

  const prevReason = () => {
    setCurrentReason((prev) => (prev - 1 + loveReasons.length) % loveReasons.length)
    setAutoPlay(false)
  }

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % loveQuotes.length)
  }

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + loveQuotes.length) % loveQuotes.length)
  }

  return (
    <div className="min-h-screen p-4 flex flex-col justify-center">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-pink-600 mb-8 text-center"
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        Reasons I Love You 💕
      </motion.h2>

      {/* Love Reasons Carousel */}
      <div className="max-w-md mx-auto mb-8">
        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 shadow-xl min-h-[200px] flex items-center">
          <CardContent className="p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevReason}
                className="text-pink-500 hover:text-pink-600 hover:bg-pink-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-pink-500 fill-current" />
                <span className="text-sm text-pink-600 font-medium">
                  {currentReason + 1} of {loveReasons.length}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextReason}
                className="text-pink-500 hover:text-pink-600 hover:bg-pink-100"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentReason}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-lg text-gray-700 leading-relaxed font-medium">{loveReasons[currentReason]}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAutoPlay(!autoPlay)}
                className="text-pink-500 hover:text-pink-600 hover:bg-pink-100 text-xs"
              >
                {autoPlay ? "Pause" : "Auto Play"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Love Quotes Section */}
      <div className="max-w-lg mx-auto mb-8">
        <h3 className="text-xl font-semibold text-pink-600 mb-4 text-center">Beautiful Love Quotes</h3>

        <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevQuote}
                className="text-pink-500 hover:text-pink-600 hover:bg-pink-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Quote className="w-6 h-6 text-pink-400" />

              <Button
                variant="ghost"
                size="sm"
                onClick={nextQuote}
                className="text-pink-500 hover:text-pink-600 hover:bg-pink-100"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-gray-700 italic leading-relaxed text-sm">"{loveQuotes[currentQuote]}"</p>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pb-20">
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-full"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Beginning
        </Button>
      </div>
    </div>
  )
}
