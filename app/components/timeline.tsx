"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, MapPin, Camera, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface TimelineEvent {
  id: number
  date: string
  title: string
  description: string
  image: string
  location?: string
  reactions: number
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "January 14, 2024",
    title: "Our First Date",
    description:
      "That magical evening when everything just clicked. I knew you were special from the moment you smiled.",
    image: "/firstdate.jpg",
    location: "That cozy little café downtown",
    reactions: 0,
  },
  {
    id: 2,
    date: "February 29, 2024",
    title: "First 'I Love You'",
    description:
      "Under the stars, with your hand in mine, those three words just felt so right.",
    image: "/firstilu.jpg",
    location: "The park where we always walk",
    reactions: 0,
  },
  {
    id: 3,
    date: "April 15, 2024",
    title: "Our First Adventure",
    description:
      "That spontaneous road trip where we got lost but found so much more about each other.",
    image: "/firstadventure.jpg",
    location: "The mountains we conquered together",
    reactions: 0,
  },
  {
    id: 4,
    date: "June 20, 2024",
    title: "Moving In Together",
    description:
      "The day we decided to build our little nest. Every box we unpacked felt like a promise.",
    image: "/movingtogether.jpg",
    location: "Our first home together",
    reactions: 0,
  }
  ,
]

interface TimelineProps {
  onNext: () => void
}

export default function Timeline({ onNext }: TimelineProps) {
  const [currentEvent, setCurrentEvent] = useState(0)
  const [reactions, setReactions] = useState<{ [key: number]: number }>({})

  const handleReaction = (eventId: number) => {
    setReactions((prev) => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1,
    }))
  }

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % timelineEvents.length)
  }

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length)
  }

  const currentEventData = timelineEvents[currentEvent]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-pink-600 mb-8 text-center"
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        Our Love Story Timeline
      </motion.h2>

      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={currentEventData.image || "/placeholder.svg"}
                    alt={currentEventData.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {currentEventData.date}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{currentEventData.title}</h3>

                  {currentEventData.location && (
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{currentEventData.location}</span>
                    </div>
                  )}

                  <p className="text-gray-700 leading-relaxed mb-4">{currentEventData.description}</p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(currentEventData.id)}
                      className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                    >
                      <Heart className="w-4 h-4 mr-1 fill-current" />
                      {reactions[currentEventData.id] || 0}
                    </Button>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevEvent}
                        className="border-pink-200 hover:bg-pink-50 bg-transparent"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextEvent}
                        className="border-pink-200 hover:bg-pink-50 bg-transparent"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Timeline Progress */}
        <div className="flex justify-center mt-6 space-x-2">
          {timelineEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentEvent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentEvent === index ? "bg-pink-500 scale-125" : "bg-pink-200 hover:bg-pink-300"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 pb-20"
      >
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-full"
        >
          <Camera className="w-4 h-4 mr-2" />
          View Our Gallery
        </Button>
      </motion.div>
    </div>
  )
}
