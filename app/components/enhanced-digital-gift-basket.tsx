"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Gift, Heart, Music, Download, Flower, Sparkles } from "lucide-react"
import MobileOptimizedLayout from "./mobile-optimized-layout"
import MobileResponsiveCard from "./mobile-responsive-card"
import EnhancedTypewriter from "./enhanced-typewriter"

interface DigitalGift {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  content: string
  type: "letter" | "playlist" | "voucher" | "memory"
  color: string
}

const digitalGifts: DigitalGift[] = [
  {
    id: 1,
    title: "Handwritten Love Letter",
    description: "A letter written from my heart to yours",
    icon: <Heart className="w-6 h-6" />,
    content: `My Dearest Love,

Every morning I wake up grateful that you're in my life. Your smile lights up my darkest days, and your laugh is the melody that plays in my heart.

You make ordinary moments feel magical, and I can't imagine my world without you in it. The way you care for others, your incredible strength, and your beautiful soul inspire me every single day.

Thank you for being my partner, my best friend, and my greatest love. Here's to all our tomorrows together.

Forever yours,
With all my love ❤️`,
    type: "letter",
    color: "from-pink-400 to-rose-400",
  },
  {
    id: 2,
    title: "Our Love Playlist",
    description: "Songs that remind me of us",
    icon: <Music className="w-6 h-6" />,
    content: `🎵 Our Special Playlist:

1. Lover - Taylor Swift (Our love anthem)
2. Wildest Dreams - Taylor Swift (Dreaming of our future)
3. White Mustang - Lana Del Rey (Your free spirit)
4. Chemtrails - Lana Del Rey (Our dreamy moments)
5. Drinks or Coffee / Gameboy - Rosé (Your playful side)
6. Your Love - Jisoo (Perfect for you)
7. Khuda Jaane - (Divine love like ours)
8. Tum Mile - (You complete me)
9. Titli - (You're my butterfly)
10. Perfect - Ed Sheeran (Our original song)
11. All of Me - John Legend (Every part of you)
12. Thinking Out Loud - Ed Sheeran (Growing old together)

Each song tells a part of our story 💕🎶`,
    type: "playlist",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: 3,
    title: "Date Night Vouchers",
    description: "Special experiences just for us",
    icon: <Gift className="w-6 h-6" />,
    content: `💝 Your Special Vouchers:

🍕 One homemade pizza night with your favorite toppings
🎬 Movie marathon of your choice (with unlimited snacks)
🌅 Sunrise picnic at our favorite spot
💆‍♀️ Full spa day at home (massages included!)
🍳 Breakfast in bed on any Sunday
🎨 Art class together (we'll make beautiful messes)
🌟 Stargazing night with hot chocolate
🚗 Spontaneous road trip adventure
🍰 Baking session with your favorite dessert
💃 Dancing in our living room to our playlist
🎵 Concert night featuring our favorite artists
🌸 Garden picnic with Hindi music playing

Valid forever, redeemable with kisses! 😘`,
    type: "voucher",
    color: "from-green-400 to-blue-400",
  },
  {
    id: 4,
    title: "Virtual Bouquet",
    description: "Flowers that never wilt, just like my love",
    icon: <Flower className="w-6 h-6" />,
    content: `🌹 Your Digital Bouquet 🌹

Red Roses - For my passionate love for you
Pink Peonies - For the joy you bring to my life
White Lilies - For the purity of our connection
Sunflowers - Because you're my sunshine
Baby's Breath - For all the little moments we share
Purple Lavender - For the peace you bring to my soul
Yellow Daisies - For your bright, beautiful spirit
Cherry Blossoms - For the beauty in every season with you

These flowers will bloom forever in my heart, just like my love for you will never fade. 🌸✨`,
    type: "memory",
    color: "from-yellow-400 to-pink-400",
  },
]

interface EnhancedDigitalGiftBasketProps {
  onNext: () => void
  currentSection: number
  totalSections: number
  onSectionChange: (section: number) => void
}

export default function EnhancedDigitalGiftBasket({
  onNext,
  currentSection,
  totalSections,
  onSectionChange,
}: EnhancedDigitalGiftBasketProps) {
  const [selectedGift, setSelectedGift] = useState<DigitalGift | null>(null)
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set())
  const [showBouquet, setShowBouquet] = useState(false)
  const [showTypewriter, setShowTypewriter] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  const openGift = (gift: DigitalGift) => {
    setSelectedGift(gift)
    setOpenedGifts((prev) => new Set([...prev, gift.id]))

    if (gift.id === 4) {
      setShowBouquet(true)
    } else if (gift.id === 1) {
      setShowTypewriter(true)
      setTypewriterComplete(false)
    }

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100])
    }
  }

  const closeGift = () => {
    setSelectedGift(null)
    setShowBouquet(false)
    setShowTypewriter(false)
    setTypewriterComplete(false)
  }

  return (
    <MobileOptimizedLayout
      currentSection={currentSection}
      totalSections={totalSections}
      onSectionChange={onSectionChange}
    >
      <div className="min-h-screen p-3 sm:p-4 pt-8">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 sm:mb-8 text-center px-4"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          Your Digital Gift Basket 🎁
        </motion.h2>

        {/* Enhanced Gift Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
          {digitalGifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              onClick={() => openGift(gift)}
            >
              <MobileResponsiveCard
                animate={false}
                className={`relative overflow-hidden ${
                  openedGifts.has(gift.id) ? "ring-2 ring-pink-300 bg-pink-50" : ""
                }`}
              >
                {/* Gift Ribbon */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${gift.color} opacity-20 transform rotate-45 translate-x-8 -translate-y-8`}
                />

                <div className="text-center relative z-10">
                  <motion.div
                    animate={
                      openedGifts.has(gift.id)
                        ? {
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.8 }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${gift.color} text-white shadow-lg`}
                  >
                    {gift.icon}
                  </motion.div>

                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{gift.title}</h3>

                  <p className="text-gray-600 text-sm sm:text-base mb-4">{gift.description}</p>

                  {openedGifts.has(gift.id) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 text-pink-500" />
                      <span className="text-pink-500 text-sm font-medium">Opened!</span>
                      <Sparkles className="w-4 h-4 text-pink-500" />
                    </motion.div>
                  )}
                </div>
              </MobileResponsiveCard>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Gift Modal */}
        <AnimatePresence>
          {selectedGift && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeGift}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="bg-white rounded-2xl p-4 sm:p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${selectedGift.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                  >
                    {selectedGift.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{selectedGift.title}</h3>
                </div>

                {/* Virtual Bouquet Animation */}
                {selectedGift.id === 4 && showBouquet && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6 text-center"
                  >
                    <div className="text-6xl mb-4">💐</div>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block text-4xl"
                    >
                      🌹🌸🌺🌻🌷
                    </motion.div>
                  </motion.div>
                )}

                {/* Content */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 sm:p-6 mb-6">
                  {selectedGift.id === 1 && showTypewriter ? (
                    <EnhancedTypewriter
                      text={selectedGift.content}
                      speed={40}
                      delay={500}
                      className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base leading-relaxed font-serif"
                      onComplete={() => setTypewriterComplete(true)}
                      pauseOnPunctuation={200}
                    />
                  ) : (
                    <pre className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base leading-relaxed font-serif">
                      {selectedGift.content}
                    </pre>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Save Gift
                  </Button>

                  <Button
                    onClick={closeGift}
                    className={`bg-gradient-to-r ${selectedGift.color} hover:opacity-90 text-white shadow-lg`}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Love It!
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        <div className="text-center pb-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              One More Surprise... 🎭
            </Button>
          </motion.div>
        </div>
      </div>
    </MobileOptimizedLayout>
  )
}
