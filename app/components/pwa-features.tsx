"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Bell, WifiOff } from "lucide-react"

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setShowInstallPrompt(false)
      }

      setDeferredPrompt(null)
    }
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-20 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm"
        >
          <Card className="bg-white/95 backdrop-blur-sm border-pink-200 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">Install Love Story</h3>
                  <p className="text-xs text-gray-600">Add to home screen for quick access</p>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => setShowInstallPrompt(false)} variant="ghost" size="sm" className="text-xs">
                    Later
                  </Button>
                  <Button
                    onClick={handleInstall}
                    size="sm"
                    className="bg-pink-500 hover:bg-pink-600 text-white text-xs"
                  >
                    Install
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Card className="bg-orange-100 border-orange-200">
            <CardContent className="p-2 px-4">
              <div className="flex items-center space-x-2">
                <WifiOff className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-700">You're offline</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function NotificationPermission() {
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false)

  useEffect(() => {
    // Check if notifications are supported and permission is default
    if ("Notification" in window && Notification.permission === "default") {
      // Show prompt after a delay
      setTimeout(() => {
        setShowPermissionPrompt(true)
      }, 10000) // Show after 10 seconds
    }
  }, [])

  const requestPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()

      if (permission === "granted") {
        // Schedule a test notification
        setTimeout(() => {
          new Notification("Love Story 💕", {
            body: "Thanks for allowing notifications! I'll remind you of special moments.",
            icon: "/placeholder.svg?height=64&width=64&text=💕",
            tag: "welcome",
          })
        }, 2000)
      }
    }
    setShowPermissionPrompt(false)
  }

  return (
    <AnimatePresence>
      {showPermissionPrompt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <Card className="bg-white max-w-sm w-full">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Connected</h3>
              <p className="text-gray-600 text-sm mb-6">
                Get gentle reminders about special dates and new memories added to your love story.
              </p>
              <div className="flex space-x-3">
                <Button onClick={() => setShowPermissionPrompt(false)} variant="outline" className="flex-1">
                  Maybe Later
                </Button>
                <Button onClick={requestPermission} className="flex-1 bg-pink-500 hover:bg-pink-600">
                  Allow
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Interactive particle system - Mobile optimized
export function InteractiveParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const createParticle = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const newParticle = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
    }
    setParticles((prev) => [...prev.slice(-5), newParticle]) // Limit particles on mobile

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
    }, 1500) // Shorter duration on mobile
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-20" onTouchMove={createParticle} onMouseMove={createParticle}>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x - 4,
              y: particle.y - 4,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [1, 0.7, 0],
              y: particle.y - 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute w-2 h-2 bg-pink-400 rounded-full shadow-sm"
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
