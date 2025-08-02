"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Play, Pause, Trash2, Download } from "lucide-react"

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void
  maxDuration?: number
}

export default function VoiceRecorder({ onRecordingComplete, maxDuration = 60 }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [recordingTime, setRecordingTime] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      })

      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm;codecs=opus" })
        setAudioBlob(blob)

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }

        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        onRecordingComplete?.(blob)

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= maxDuration) {
            stopRecording()
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const playRecording = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioBlob(null)
    setAudioUrl(null)
    setDuration(0)
    setRecordingTime(0)
    setIsPlaying(false)
  }

  const downloadRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `voice-note-${new Date().toISOString().slice(0, 19)}.webm`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-lg">
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Voice Message 🎤</h3>

          {/* Recording Controls */}
          <div className="flex justify-center items-center space-x-4 mb-4">
            {!audioBlob ? (
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-16 h-16 rounded-full ${
                  isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-pink-500 hover:bg-pink-600"
                } text-white shadow-lg`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={playRecording}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  onClick={deleteRecording}
                  variant="outline"
                  className="border-red-200 text-red-500 hover:bg-red-50 rounded-full w-12 h-12 bg-transparent"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
                <Button
                  onClick={downloadRecording}
                  variant="outline"
                  className="border-blue-200 text-blue-500 hover:bg-blue-50 rounded-full w-12 h-12 bg-transparent"
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Recording Status */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4"
              >
                <div className="text-red-600 font-medium mb-2">🔴 Recording... {formatTime(recordingTime)}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-red-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(recordingTime / maxDuration) * 100}%` }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audio Player */}
          {audioUrl && (
            <div className="mt-4">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                onLoadedMetadata={(e) => {
                  const audio = e.target as HTMLAudioElement
                  setDuration(Math.floor(audio.duration))
                }}
                className="hidden"
              />
              <div className="text-sm text-gray-600">Voice note ready • {formatTime(duration)}</div>
            </div>
          )}

          <div className="text-xs text-gray-500 mt-2">
            {!audioBlob
              ? isRecording
                ? "Tap to stop recording"
                : "Tap to start recording"
              : "Tap play to listen, or record a new message"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
