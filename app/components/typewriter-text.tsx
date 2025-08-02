"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

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
          setDisplayedText(text.slice(0, prevIndex + 1))
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
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block w-0.5 h-5 bg-pink-500 ml-1"
        />
      )}
    </div>
  )
}
