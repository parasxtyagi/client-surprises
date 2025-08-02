"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Heart } from "lucide-react"

export default function CountdownWidget() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Updated to August 17th birthday
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

  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}>
      <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-medium text-pink-600">Next Special Day</span>
          </div>

          <div className="grid grid-cols-4 gap-1 text-center">
            <div>
              <div className="text-lg font-bold text-pink-600">{timeLeft.days}</div>
              <div className="text-xs text-gray-500">Days</div>
            </div>
            <div>
              <div className="text-lg font-bold text-pink-600">{timeLeft.hours}</div>
              <div className="text-xs text-gray-500">Hrs</div>
            </div>
            <div>
              <div className="text-lg font-bold text-pink-600">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-500">Min</div>
            </div>
            <div>
              <div className="text-lg font-bold text-pink-600">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-500">Sec</div>
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <Heart className="w-3 h-3 text-pink-400 fill-current" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
