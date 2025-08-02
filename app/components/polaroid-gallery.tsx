"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Heart, Download, Share2, Mic } from "lucide-react"
import Image from "next/image"
import VoiceRecorder from "./voice-recorder"

interface PolaroidPhoto {
  id: number
  src: string
  caption: string
  date: string
  voiceNote?: string
}

const photos: PolaroidPhoto[] = [
  {
    id: 1,
    src: "/placeholder.svg?height=300&width=300",
    caption: "Your laugh is my favorite sound in the world ✨",
    date: "March 2024",
    voiceNote: "Remember this day? You couldn't stop laughing at my terrible jokes!",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=300&width=300",
    caption: "Our kitchen disasters that somehow taste perfect 👨‍🍳",
    date: "April 2024",
  },
  {
    id: 3,
    src: "/sample1.jpg",
    caption: "Sunsets are prettier when I'm watching them with you 🌅",
    date: "May 2024",
    voiceNote: "This was the most beautiful sunset, but you were even more beautiful.",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=300&width=300",
    caption: "Dancing in our living room like nobody's watching 💃",
    date: "June 2024",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=300&width=300",
    caption: "Adventures are better when we're lost together 🥾",
    date: "July 2024",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=300&width=300",
    caption: "Quiet moments that speak the loudest to my heart 📚",
    date: "August 2024",
  },
]

interface PolaroidGalleryProps {
  onNext: () => void
}

export default function PolaroidGallery({ onNext }: PolaroidGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null)
  const [likes, setLikes] = useState<{ [key: number]: number }>({})
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
  const [voiceNotes, setVoiceNotes] = useState<{ [key: number]: Blob }>({})

  const handleLike = (photoId: number) => {
    setLikes((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }))
  }

  return (
    <div className="min-h-screen p-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-pink-600 mb-8 text-center"
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        Our Polaroid Memories
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8 px-2">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 20 - 10 }}
            animate={{ opacity: 1, scale: 1, rotate: Math.random() * 10 - 5 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Card className="bg-white shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-3">
                <div className="relative">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.caption}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover rounded"
                  />
                  {photo.voiceNote && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-700 font-handwriting leading-relaxed">{photo.caption}</p>
                  <p className="text-xs text-gray-500 mt-1">{photo.date}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Expanded Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{selectedPhoto.date}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPhoto(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.caption}
                width={400}
                height={400}
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />

              <p className="text-gray-700 text-center mb-4 leading-relaxed">{selectedPhoto.caption}</p>

              {selectedPhoto.voiceNote && (
                <div className="bg-pink-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-pink-700 italic">🎵 Voice Note: "{selectedPhoto.voiceNote}"</p>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLike(selectedPhoto.id)}
                  className="border-pink-200 hover:bg-pink-50"
                >
                  <Heart className="w-4 h-4 mr-1 fill-current text-pink-500" />
                  {likes[selectedPhoto.id] || 0}
                </Button>
                <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 bg-transparent">
                  <Download className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 bg-transparent">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button
                  onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                  variant="outline"
                  size="sm"
                  className="border-pink-200 hover:bg-pink-50 bg-transparent"
                >
                  <Mic className="w-4 h-4 mr-1" />
                  Voice Note
                </Button>
              </div>

              {showVoiceRecorder && (
                <div className="mt-4">
                  <VoiceRecorder
                    onRecordingComplete={(blob) => {
                      setVoiceNotes((prev) => ({ ...prev, [selectedPhoto.id]: blob }))
                      setShowVoiceRecorder(false)
                    }}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center pb-20">
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-full"
        >
          Let's Play a Game! 🎮
        </Button>
      </div>
    </div>
  )
}
