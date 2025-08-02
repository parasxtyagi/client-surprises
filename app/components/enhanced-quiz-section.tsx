"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Heart, Star, Sparkles } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which song from our new playlist best describes our love?",
    options: ["Lover by Taylor Swift", "Khuda Jaane", "White Mustang by Lana Del Rey", "All of them!"],
    correct: 3,
    explanation: "Trick question! Each song captures a different beautiful aspect of our relationship! 🎵",
  },
  {
    id: 2,
    question: "What's my favorite thing about you?",
    options: ["Your smile", "Your laugh", "Your kindness", "Everything"],
    correct: 3,
    explanation: "Trick question! It's impossible to pick just one thing ✨",
  },
  {
    id: 3,
    question: "Which artist combination in our playlist makes it special?",
    options: ["Taylor Swift & Lana Del Rey", "K-Pop & Bollywood", "Ed Sheeran & John Legend", "The perfect mix of all"],
    correct: 3,
    explanation: "Our playlist is special because it reflects all the different sides of our love story! 💕",
  },
  {
    id: 4,
    question: "What's our favorite song to dance to?",
    options: ["Perfect by Ed Sheeran", "Lover by Taylor Swift", "Titli", "Any song when we're together"],
    correct: 3,
    explanation: "Every song becomes our favorite when we're dancing together in our kitchen! 🎵💃",
  },
]

interface EnhancedQuizSectionProps {
  onNext: () => void
}

export default function EnhancedQuizSection({ onNext }: EnhancedQuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)

      // Haptic feedback for correct answer
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100])
      }
    } else {
      // Haptic feedback for wrong answer
      if (navigator.vibrate) {
        navigator.vibrate(200)
      }
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20 pb-24">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-center"
        >
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">Quiz Complete! 🎉</h2>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 dark:border-pink-800 mb-6">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
              Your Score: {score}/{quizQuestions.length}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {score === quizQuestions.length
                ? "Perfect! You know our love story so well! 💕🎵"
                : score >= quizQuestions.length / 2
                  ? "Great job! Our playlist tells our story perfectly! ✨"
                  : "Every song in our playlist has a special meaning for us! 😘🎶"}
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Claim Your Gifts!
            </Button>
            <Button
              onClick={resetQuiz}
              variant="outline"
              className="border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-900 px-6 py-2 rounded-full bg-transparent"
            >
              Play Again
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20 pb-24">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                }}
              >
                <Star className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400 mb-8 text-center px-4"
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        How Well Do You Know Us? 💕
      </motion.h2>

      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">Score: {score}</span>
        </div>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-pink-200 dark:border-pink-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg text-center text-gray-800 dark:text-gray-200">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className={`w-full text-left justify-start p-4 h-auto border-2 transition-all duration-300 ${
                    selectedAnswer === index
                      ? index === question.correct
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                      : showResult && index === question.correct
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "border-pink-200 dark:border-pink-800 hover:border-pink-300 dark:hover:border-pink-700 hover:bg-pink-50 dark:hover:bg-pink-900"
                  }`}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                >
                  {option}
                  {showResult && index === question.correct && (
                    <Heart className="w-4 h-4 ml-auto text-green-600 dark:text-green-400 fill-current" />
                  )}
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6"
            >
              <Card className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
                <CardContent className="p-4 text-center">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{question.explanation}</p>
                  <Button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-full"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
