"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface MobileResponsiveCardProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  delay?: number
}

export default function MobileResponsiveCard({
  children,
  className = "",
  animate = true,
  delay = 0,
}: MobileResponsiveCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut",
      },
    },
  }

  const CardComponent = animate ? motion.div : "div"

  return (
    <CardComponent
      variants={animate ? cardVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      className="w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg"
    >
      <Card
        className={`bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
      >
        <CardContent className="p-4 sm:p-6">{children}</CardContent>
      </Card>
    </CardComponent>
  )
}
