"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import type { Answer, Question, DiagnosticResult } from "./diagnostic-flow"

interface AnalysisScreenProps {
  answers: Answer[]
  questions: Question[]
  onComplete: (result: DiagnosticResult | null) => void
}

const analysisSteps = [
  "Processando informações...",
  "Analisando perfil do negócio...",
  "Identificando oportunidades...",
  "Gerando diagnóstico personalizado...",
]

const GOLD      = "rgba(180,148,60,1)"
const GOLD_DIM  = "rgba(180,148,60,0.65)"
const GOLD_FAINT= "rgba(180,148,60,0.12)"
const TEXT_HERO = "#F0EDE6"
const TEXT_MUTED= "rgba(240,237,230,0.35)"
const SERIF     = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
const ease      = [0.22, 1, 0.36, 1] as const

export function AnalysisScreen({ answers, questions, onComplete }: AnalysisScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) { clearInterval(stepInterval); return prev }
        return prev + 1
      })
    }, 600)

    const enrichedAnswers = answers.map((a) => {
      const question = questions.find((q) => q.id === a.questionId)
      return {
        questionId: a.questionId,
        question: question?.text ?? `Pergunta ${a.questionId}`,
        value: a.value,
        extraValue: a.extraValue,
      }
    })

    const analyzePromise = fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: enrichedAnswers }),
    })
      .then((res) => res.json())
      .then((data) => data.result as DiagnosticResult | null)
      .catch(() => null)

    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 2500))

    Promise.all([analyzePromise, minDelay]).then(([result]) => {
      clearInterval(stepInterval)
      setCurrentStep(analysisSteps.length - 1)
      setProgress(100)
      setTimeout(() => onComplete(result), 400)
    })

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) { clearInterval(progressInterval); return 92 }
        return prev + 1.5
      })
    }, 40)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="h-dvh w-full max-w-full flex flex-col relative overflow-hidden"
      style={{ background: "#09090E" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_30%,rgba(180,148,60,0.06),transparent)]" />
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Linha dourada superior */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(180,148,60,0.28), transparent)" }}
      />

      <div className="relative flex-1 flex items-center justify-center px-6 py-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}
        >
          {/* Anel animado — minimalista */}
          <div
            className="flex justify-center"
            style={{ marginBottom: "40px" }}
          >
            <div style={{ position: "relative", width: "72px", height: "72px" }}>
              {/* Anel externo pulsante */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1px solid rgba(180,148,60,0.2)",
                }}
                animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1px solid rgba(180,148,60,0.15)",
                }}
                animate={{ scale: [1, 1.55], opacity: [0.35, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
              />

              {/* Anel base */}
              <div
                style={{
                  position: "absolute",
                  inset: "8px",
                  borderRadius: "50%",
                  background: GOLD_FAINT,
                  border: "1px solid rgba(180,148,60,0.22)",
                  boxShadow: "0 0 24px rgba(180,148,60,0.1)",
                }}
              />

              {/* Cruz editorial no centro */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ position: "relative", width: "18px", height: "18px" }}
                >
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: GOLD_DIM,
                    transform: "translateY(-50%)",
                  }} />
                  <div style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    background: GOLD_DIM,
                    transform: "translateX(-50%)",
                  }} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Título */}
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(28px, 4vw, 38px)",
              fontWeight: 500,
              color: TEXT_HERO,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              marginBottom: "10px",
            }}
          >
            Analisando seu perfil
          </h2>
          <p
            style={{
              fontSize: "13px",
              color: TEXT_MUTED,
              letterSpacing: "0.02em",
              marginBottom: "36px",
            }}
          >
            Aguarde enquanto a IA processa suas respostas
          </p>

          {/* Barra de progresso */}
          <div
            style={{
              position: "relative",
              height: "1.5px",
              borderRadius: "99px",
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
              marginBottom: "28px",
              maxWidth: "240px",
              marginInline: "auto",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                inset: "0 auto 0 0",
                background: "linear-gradient(90deg, #C9A84C 0%, #B4943C 100%)",
                borderRadius: "99px",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <motion.div
                style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {analysisSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: index <= currentStep ? 1 : 0.2, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  fontSize: "12px",
                  color: index <= currentStep ? "rgba(240,237,230,0.7)" : "rgba(240,237,230,0.2)",
                  letterSpacing: "0.02em",
                }}
              >
                {index < currentStep ? (
                  <CheckCircle2 style={{ width: "13px", height: "13px", flexShrink: 0, color: "rgba(74,222,128,0.7)" }} />
                ) : index === currentStep ? (
                  <motion.div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      border: "1.5px solid transparent",
                      borderTopColor: GOLD,
                      flexShrink: 0,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.1)",
                      flexShrink: 0,
                    }}
                  />
                )}
                {step}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
