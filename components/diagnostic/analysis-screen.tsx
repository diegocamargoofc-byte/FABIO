"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Brain, CheckCircle2 } from "lucide-react"

interface AnalysisScreenProps {
  onComplete: () => void
}

const analysisSteps = [
  "Processando informações...",
  "Analisando perfil do negócio...",
  "Identificando oportunidades...",
  "Gerando diagnóstico personalizado...",
]

export function AnalysisScreen({ onComplete }: AnalysisScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 35)

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 450)

    // Complete after animation
    const completeTimeout = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(completeTimeout)
    }
  }, [onComplete])

  return (
    <div className="h-dvh w-full max-w-full flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(99,102,241,0.08),transparent)]" />

      <div className="relative flex-1 flex items-center justify-center px-4 py-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md text-center"
        >
          {/* Brain icon with pulse */}
          <motion.div
            className="mb-8 flex justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
            Analisando seu perfil
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8">
            Aguarde enquanto processamos suas respostas
          </p>

          {/* Progress bar */}
          <div className="relative h-2 bg-muted/60 rounded-full overflow-hidden mb-6">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full"
              style={{ width: `${progress}%` }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: index <= currentStep ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-center justify-center gap-2 text-sm"
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : index === currentStep ? (
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                )}
                <span className={index <= currentStep ? "text-foreground" : "text-muted-foreground/50"}>
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
