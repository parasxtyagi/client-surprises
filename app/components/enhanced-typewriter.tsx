"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface EnhancedTypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
  showCursor?: boolean
  cursorChar?: string
  pauseOnPunctuation?: number
}

export default function EnhancedTypewriter({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete,
  showCursor = true,
  cursorChar = "|",
  pauseOnPunctuation = 300,
}: EnhancedTypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        startTyping()
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      startTyping()
    }
  }, [delay])

  const startTyping = () => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < text.length) {
          const nextChar = text[prevIndex]
          setDisplayedText(text.slice(0, prevIndex + 1))

          // Pause on punctuation for more natural typing
          if ([".", "!", "?", ",", ";", ":"].includes(nextChar) && pauseOnPunctuation > 0) {
            setIsPaused(true)
            setTimeout(() => setIsPaused(false), pauseOnPunctuation)
          }

          return prevIndex + 1
        } else {
          clearInterval(timer)
          setIsComplete(true)
          onComplete?.()
          return prevIndex
        }
      })
    }, speed)

    return () => clearInterval(timer)
  }

  return (
    <div className={className}>
      <span className="whitespace-pre-wrap">{displayedText}</span>
      <AnimatePresence>
        {showCursor && !isComplete && (
          <motion.span
            animate={{ opacity: isPaused ? 1 : [1, 0] }}
            transition={{
              duration: isPaused ? 0 : 0.8,
              repeat: isPaused ? 0 : Number.POSITIVE_INFINITY,
            }}
            className="inline-block text-pink-500 ml-1 font-bold"
          >
            {cursorChar}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
