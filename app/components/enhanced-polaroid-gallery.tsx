"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Heart, Download, Share2, Mic, Play, Pause, Volume2 } from "lucide-react"
import Image from "next/image"
import VoiceRecorder from "./voice-recorder"

interface PolaroidPhoto {
  id: number
  src: string
  caption: string
  date: string
  voiceNote?: string
  location?: string
  mood?: string
}

const photos: PolaroidPhoto[] = [
  {
    id: 1,
    src: "/your-laugh.jpg?height=400&width=400&text=💕",
    caption: "Your laugh is my favorite sound in the world ✨",
    date: "March 2024",
    location: "Our favorite café",
    mood: "Pure joy",
    voiceNote: "Remember this day? You couldn't stop laughing at my terrible jokes!",
  },
  {
    id: 2,
    src: "/our-kitchen.jpg?height=400&width=400&text=🍳",
    caption: "Our kitchen disasters that somehow taste perfect 👨‍🍳",
    date: "April 2024",
    location: "Home sweet home",
    mood: "Playful chaos",
  },
  {
    id: 3,
    src: "/sunset.jpg?height=400&width=400&text=🌅",
    caption: "Sunsets are prettier when I'm watching them with you 🌅",
    date: "May 2024",
    location: "The hill overlooking the city",
    mood: "Peaceful bliss",
    voiceNote: "This was the most beautiful sunset, but you were even more beautiful.",
  },
  {
    id: 4,
    src: "/dancing.jpg?height=400&width=400&text=💃",
    caption: "Dancing in our living room like nobody's watching 💃",
    date: "June 2024",
    location: "Our living room",
    mood: "Carefree love",
  },
  {
    id: 5,
    src: "/adventures.jpg?height=400&width=400&text=🥾",
    caption: "Adventures are better when we're lost together 🥾",
    date: "July 2024",
    location: "Mountain trail",
    mood: "Adventurous spirit",
  },
  {
    id: 6,
    src: "/quiet-moments.jpg?height=400&width=400&text=📚",
    caption: "Quiet moments that speak the loudest to my heart 📚",
    date: "August 2024",
    location: "The library corner",
    mood: "Intimate connection",
  },
]

interface EnhancedPolaroidGalleryProps {
  onNext: () => void
}

export default function EnhancedPolaroidGallery({ onNext }: EnhancedPolaroidGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null)
  const [likes, setLikes] = useState<{ [key: number]: number }>({})
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
  const [voiceNotes, setVoiceNotes] = useState<{ [key: number]: Blob }>({})
  const [playingVoiceNote, setPlayingVoiceNote] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleLike = (photoId: number) => {
    setLikes((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }))

    // Add haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const playVoiceNote = (photoId: number) => {
    if (playingVoiceNote === photoId) {
      audioRef.current?.pause()
      setPlayingVoiceNote(null)
    } else {
      // Simulate playing voice note
      setPlayingVoiceNote(photoId)
      setTimeout(() => setPlayingVoiceNote(null), 3000)
    }
  }

  const sharePhoto = async (photo: PolaroidPhoto) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Memory from ${photo.date}`,
          text: photo.caption,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(`${photo.caption} - ${photo.date}`)
    }
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 pt-20 pb-24">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400 mb-6 sm:mb-8 text-center px-4"
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        Our Polaroid Memories 📸
      </motion.h2>

      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 20 - 10 }}
            animate={{ opacity: 1, scale: 1, rotate: Math.random() * 8 - 4 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-pink-200 dark:border-pink-800 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg p-4">
              <div className="relative">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.caption}
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />

                {/* Voice Note Indicator */}
                {photo.voiceNote && (
                  <div className="absolute top-3 right-3 w-4 h-4 bg-pink-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                    <Volume2 className="w-2 h-2 text-white" />
                  </div>
                )}

                {/* Mood Badge */}
                {photo.mood && (
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs text-pink-600 dark:text-pink-400 font-medium">{photo.mood}</span>
                  </div>
                )}

                {/* Like Count */}
                {likes[photo.id] > 0 && (
                  <div className="absolute bottom-3 right-3 bg-pink-500 text-white rounded-full px-2 py-1 flex items-center space-x-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">{likes[photo.id]}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center space-y-2">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-handwriting leading-relaxed">
                  {photo.caption}
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{photo.date}</span>
                  {photo.location && (
                    <>
                      <span>•</span>
                      <span>{photo.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedPhoto.date}</h3>
                  {selectedPhoto.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedPhoto.location}</p>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPhoto(null)} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Image */}
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.caption}
                width={400}
                height={400}
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />

              {/* Caption and Mood */}
              <div className="text-center mb-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{selectedPhoto.caption}</p>
                {selectedPhoto.mood && (
                  <span className="inline-block bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 px-3 py-1 rounded-full text-sm">
                    {selectedPhoto.mood}
                  </span>
                )}
              </div>

              {/* Voice Note */}
              {selectedPhoto.voiceNote && (
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-pink-700 dark:text-pink-400 italic flex-1">
                      🎵 "{selectedPhoto.voiceNote}"
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => playVoiceNote(selectedPhoto.id)} className="ml-2">
                      {playingVoiceNote === selectedPhoto.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {playingVoiceNote === selectedPhoto.id && (
                    <div className="mt-2 w-full bg-pink-200 dark:bg-pink-800 rounded-full h-1">
                      <motion.div
                        className="bg-pink-500 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3 }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLike(selectedPhoto.id)}
                  className="border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-900 flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 mr-1 fill-current text-pink-500" />
                  <span className="text-xs">{likes[selectedPhoto.id] || 0}</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-900 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-1" />
                  <span className="text-xs hidden sm:inline">Save</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sharePhoto(selectedPhoto)}
                  className="border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-900 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  <span className="text-xs hidden sm:inline">Share</span>
                </Button>

                <Button
                  onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                  variant="outline"
                  size="sm"
                  className="border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-900 bg-transparent"
                >
                  <Mic className="w-4 h-4 mr-1" />
                  <span className="text-xs hidden sm:inline">Record</span>
                </Button>
              </div>

              {/* Voice Recorder */}
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

      {/* Next Button - Properly spaced from navigation */}
      <div className="text-center pb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Let's Play a Game! 🎮
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
