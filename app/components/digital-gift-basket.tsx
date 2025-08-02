"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Heart, Music, Download, Flower } from "lucide-react"
import TypewriterText from "./typewriter-text"

interface DigitalGift {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  content: string
  type: "letter" | "playlist" | "voucher" | "memory"
}

const digitalGifts: DigitalGift[] = [
  {
    id: 1,
    title: "Handwritten Love Letter",
    description: "A letter written from my heart to yours",
    icon: <Heart className="w-6 h-6" />,
    content:
      "My Dearest Love,\n\nEvery morning I wake up grateful that you're in my life. Your smile lights up my darkest days, and your laugh is the melody that plays in my heart. You make ordinary moments feel magical, and I can't imagine my world without you in it.\n\nThank you for being my partner, my best friend, and my greatest love.\n\nForever yours,\nWith all my love ❤️",
    type: "letter",
  },
  {
    id: 2,
    title: "Our Love Playlist",
    description: "Songs that remind me of us",
    icon: <Music className="w-6 h-6" />,
    content:
      "🎵 Our Special Playlist:\n\n1. Perfect - Ed Sheeran (Our Song)\n2. All of Me - John Legend\n3. Thinking Out Loud - Ed Sheeran\n4. A Thousand Years - Christina Perri\n5. Can't Help Myself - Four Tops\n6. At Last - Etta James\n7. The Way You Look Tonight - Frank Sinatra\n8. Make You Feel My Love - Adele\n\nEach song tells a part of our story 💕",
    type: "playlist",
  },
  {
    id: 3,
    title: "Date Night Vouchers",
    description: "Special experiences just for us",
    icon: <Gift className="w-6 h-6" />,
    content:
      "💝 Your Special Vouchers:\n\n🍕 One homemade pizza night with your favorite toppings\n🎬 Movie marathon of your choice (with unlimited snacks)\n🌅 Sunrise picnic at our favorite spot\n💆‍♀️ Full spa day at home (massages included!)\n🍳 Breakfast in bed on any Sunday\n🎨 Art class together (we'll make beautiful messes)\n🌟 Stargazing night with hot chocolate\n\nValid forever, redeemable with kisses! 😘",
    type: "voucher",
  },
  {
    id: 4,
    title: "Virtual Bouquet",
    description: "Flowers that never wilt, just like my love",
    icon: <Flower className="w-6 h-6" />,
    content:
      "🌹 Your Digital Bouquet 🌹\n\nRed Roses - For my passionate love for you\nPink Peonies - For the joy you bring to my life\nWhite Lilies - For the purity of our connection\nSunflowers - Because you're my sunshine\nBaby's Breath - For all the little moments we share\n\nThese flowers will bloom forever in my heart, just like my love for you will never fade. 🌸✨",
    type: "memory",
  },
]

interface DigitalGiftBasketProps {
  onNext: () => void
}

export default function DigitalGiftBasket({ onNext }: DigitalGiftBasketProps) {
  const [selectedGift, setSelectedGift] = useState<DigitalGift | null>(null)
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set())
  const [showBouquet, setShowBouquet] = useState(false)
  const [showTypewriter, setShowTypewriter] = useState(false)

  const openGift = (gift: DigitalGift) => {
    setSelectedGift(gift)
    setOpenedGifts((prev) => new Set([...prev, gift.id]))

    if (gift.id === 4) {
      // Virtual Bouquet
      setShowBouquet(true)
    } else if (gift.id === 1) {
      // Love Letter - trigger typewriter
      setShowTypewriter(true)
    }
  }

  const closeGift = () => {
    setSelectedGift(null)
    setShowBouquet(false)
    setShowTypewriter(false)
  }

  return (
    <div className="min-h-screen p-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-pink-600 mb-8 text-center"
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        Your Digital Gift Basket 🎁
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {digitalGifts.map((gift, index) => (
          <motion.div
            key={gift.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => openGift(gift)}
          >
            <Card
              className={`bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                openedGifts.has(gift.id) ? "border-pink-300 bg-pink-50" : "border-pink-200"
              }`}
            >
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={openedGifts.has(gift.id) ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    openedGifts.has(gift.id) ? "bg-pink-200 text-pink-600" : "bg-pink-100 text-pink-500"
                  }`}
                >
                  {gift.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{gift.title}</h3>
                <p className="text-gray-600 text-sm">{gift.description}</p>
                {openedGifts.has(gift.id) && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                    <span className="text-pink-500 text-sm font-medium">✨ Opened!</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Gift Modal */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeGift}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
                  {selectedGift.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedGift.title}</h3>
              </div>

              {selectedGift.id === 4 && showBouquet && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6 text-center">
                  <div className="text-6xl mb-2">💐</div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="inline-block"
                  >
                    🌹🌸🌺🌻🌷
                  </motion.div>
                </motion.div>
              )}

              <div className="bg-pink-50 rounded-lg p-4 mb-6">
                {selectedGift.id === 1 && showTypewriter ? (
                  <TypewriterText
                    text={selectedGift.content}
                    speed={30}
                    delay={500}
                    className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed font-sans"
                  />
                ) : (
                  <pre className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed font-sans">
                    {selectedGift.content}
                  </pre>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 bg-transparent">
                  <Download className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  onClick={closeGift}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Love It!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center pb-20">
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-full"
        >
          One More Surprise... 🎭
        </Button>
      </div>
    </div>
  )
}
