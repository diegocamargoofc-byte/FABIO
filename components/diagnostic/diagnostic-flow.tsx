"use client"

import { useState, useCallback } from "react"
import { WelcomeScreen } from "./welcome-screen"
import { QuestionScreen } from "./question-screen"
import { AnalysisScreen } from "./analysis-screen"
import { CompletionScreen } from "./completion-screen"
import { ProgressBar } from "./progress-bar"
import { LogoIntro } from "./logo-intro"
import { WarpBackground } from "@/components/ui/warp-background"
import type { DiagnosticResult } from "@/app/api/analyze/route"

export interface Answer {
  questionId: number
  value: string
  extraValue?: string // for "Outro" open text
}

export type { DiagnosticResult }

export interface Question {
  id: number
  text: string
  type: "text" | "name" | "select" | "select-with-text" | "textarea"
  options?: string[]
  placeholder?: string
  conditionalOn?: {
    questionId: number
    value: string
  }
}

// Campo inicial: nome completo (id 0) e instagram (id 0b via negative id)
const questions: Question[] = [
  {
    id: 1,
    text: "Qual é o seu nome completo?",
    type: "name",
    placeholder: "Ex: João Silva",
  },
  {
    id: 2,
    text: "Qual é o seu Instagram?",
    type: "text",
    placeholder: "@seuinstagram",
  },
  {
    id: 3,
    text: "Qual é o nome da sua empresa?",
    type: "text",
    placeholder: "Nome da empresa",
  },
  {
    id: 4,
    text: "Qual é o seu segmento?",
    type: "text",
    placeholder: "Ex: Alimentação, Estética, Varejo...",
  },
  {
    id: 5,
    text: "Há quanto tempo você está no mercado?",
    type: "text",
    placeholder: "Ex: 2 anos, 6 meses...",
  },
  {
    id: 6,
    text: "Qual é o seu faturamento médio mensal?",
    type: "select",
    options: ["Até R$10 mil", "R$10 mil a R$30 mil", "R$30 mil a R$100 mil", "Acima de R$100 mil"],
  },
  {
    id: 7,
    text: "Hoje sua empresa está:",
    type: "select",
    options: ["Crescendo", "Estagnada", "Caindo"],
  },
  {
    id: 8,
    text: "Qual é o seu maior desafio hoje?",
    type: "select-with-text",
    options: ["Falta de clientes", "Baixa conversão", "Equipe não performa", "Falta de processo", "Clientes não voltam", "Outro"],
  },
  {
    id: 9,
    text: "Você investe em marketing atualmente?",
    type: "select",
    options: ["Sim, com resultado", "Sim, sem resultado", "Não"],
  },
  {
    id: 10,
    text: "Você possui equipe de vendas ou atendimento?",
    type: "select",
    options: ["Sim", "Não"],
  },
  {
    id: 11,
    text: "Sua equipe performa bem?",
    type: "select",
    options: ["Sim", "Não", "Pode melhorar muito"],
    conditionalOn: {
      questionId: 10,
      value: "Sim",
    },
  },
  {
    id: 12,
    text: "Seus clientes costumam voltar?",
    type: "select",
    options: ["Sim", "Às vezes", "Raramente"],
  },
  {
    id: 13,
    text: "Você tem processos definidos na empresa?",
    type: "select",
    options: ["Sim", "Mais ou menos", "Não"],
  },
  {
    id: 14,
    text: "Se você parar hoje, a empresa funciona?",
    type: "select",
    options: ["Sim", "Parcialmente", "Não"],
  },
  {
    id: 15,
    text: "Qual é seu principal objetivo hoje?",
    type: "select-with-text",
    options: ["Vender mais", "Organizar a empresa", "Crescer", "Montar equipe", "Outro"],
  },
  {
    id: 16,
    text: "Você está disposto a investir para crescer seu negócio?",
    type: "select",
    options: ["Sim", "Depende da proposta", "Não"],
  },
  {
    id: 17,
    text: "Em quanto tempo você quer ver resultados?",
    type: "select",
    options: ["Imediato", "1 a 3 meses", "Sem pressa"],
  },
  {
    id: 18,
    text: "Por que você acredita que sua empresa ainda não chegou no nível que poderia?",
    type: "textarea",
    placeholder: "Escreva com sinceridade. Essa resposta é fundamental para entendermos seu cenário.",
  },
]

function getProgressMessage(progress: number): string {
  if (progress <= 15) return "Pré-entrevista — Sessão Estratégica IL Negócios"
  if (progress <= 40) return "Analisando o perfil do seu negócio..."
  if (progress <= 70) return "Entendendo seus desafios e objetivos..."
  if (progress <= 90) return "Finalizando sua pré-análise..."
  return "Quase lá... encerrando a pré-entrevista"
}

export function DiagnosticFlow() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "questions" | "analysis" | "completion">("welcome")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null)

  const getVisibleQuestions = useCallback(() => {
    return questions.filter((q) => {
      if (!q.conditionalOn) return true
      const conditionalAnswer = answers.find((a) => a.questionId === q.conditionalOn!.questionId)
      return conditionalAnswer?.value === q.conditionalOn.value
    })
  }, [answers])

  const visibleQuestions = getVisibleQuestions()
  const currentQuestion = visibleQuestions[currentQuestionIndex]
  const totalQuestions = visibleQuestions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100
  const progressMessage = getProgressMessage(progress)

  const getAnswer = (questionId: number) => {
    return answers.find((a) => a.questionId === questionId)?.value || ""
  }

  const getExtraAnswer = (questionId: number) => {
    return answers.find((a) => a.questionId === questionId)?.extraValue || ""
  }

  const setAnswer = (questionId: number, value: string, extraValue?: string) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === questionId)
      const updated = { questionId, value, extraValue }
      if (existing >= 0) {
        const arr = [...prev]
        arr[existing] = updated
        return arr
      }
      return [...prev, updated]
    })
  }

  const handleStart = () => setCurrentScreen("questions")

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setCurrentScreen("analysis")
    }
  }

  const handleAnalysisComplete = (result: DiagnosticResult | null) => {
    setDiagnosticResult(result)
    setCurrentScreen("completion")
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    } else {
      setCurrentScreen("welcome")
    }
  }

  const isAnswerValid = (question: Question, value: string, extraValue?: string): boolean => {
    if (!value.trim()) return false
    if (question.type === "name") {
      return /^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(value.trim())
    }
    if (question.type === "select-with-text") {
      if (value === "Outro") return !!(extraValue && extraValue.trim().length >= 2)
      return true
    }
    return value.trim().length > 0
  }

  const canProceed = () => {
    if (!currentQuestion) return false
    const answer = getAnswer(currentQuestion.id)
    const extra = getExtraAnswer(currentQuestion.id)
    return isAnswerValid(currentQuestion, answer, extra)
  }

  const handleAutoAdvance = (value: string, extraValue?: string) => {
    setAnswer(currentQuestion.id, value, extraValue)
    if (value !== "Outro") {
      setTimeout(() => handleNext(), 450)
    }
  }

  const handleSendWhatsApp = () => {
    const WHATSAPP_NUMBER = "5513996145959"

    const a = (id: number) => getAnswer(id)
    const x = (id: number) => getExtraAnswer(id)

    const desafio = a(8) === "Outro" ? `Outro: ${x(8)}` : a(8)
    const objetivo = a(15) === "Outro" ? `Outro: ${x(15)}` : a(15)
    const temEquipe = a(10)

    let message = `Olá! Acabei de preencher a pré-entrevista da Sessão Estratégica IL Negócios.

*Nome:* ${a(1)}
*Instagram:* ${a(2)}
*Empresa:* ${a(3)}
*Segmento:* ${a(4)}
*Tempo no mercado:* ${a(5)}
*Faturamento médio mensal:* ${a(6)}
*Situação atual:* ${a(7)}
*Maior desafio:* ${desafio}
*Investe em marketing:* ${a(9)}
*Possui equipe:* ${temEquipe}`

    if (temEquipe === "Sim") {
      message += `\n*Equipe performa bem:* ${a(11)}`
    }

    message += `
*Clientes voltam:* ${a(12)}
*Processos definidos:* ${a(13)}
*Empresa funciona sem mim:* ${a(14)}
*Objetivo principal:* ${objetivo}
*Disposto a investir:* ${a(16)}
*Prazo para resultados:* ${a(17)}
*Por que ainda não chegou lá:* ${a(18)}

Quero avançar para a Sessão Estratégica.`

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank")
  }

  // ─── Intro de logo — mostra uma única vez, antes da hero
  if (showIntro) {
    return <LogoIntro onComplete={() => setShowIntro(false)} />
  }

  if (currentScreen === "welcome") {
    return <WelcomeScreen onStart={handleStart} />
  }

  if (currentScreen === "analysis") {
    return (
      <AnalysisScreen
        answers={answers}
        questions={visibleQuestions}
        onComplete={handleAnalysisComplete}
      />
    )
  }

  if (currentScreen === "completion") {
    return (
      <CompletionScreen
        onSendWhatsApp={handleSendWhatsApp}
        answers={answers}
        questions={visibleQuestions}
        diagnosticResult={diagnosticResult}
      />
    )
  }

  return (
    <div className="h-dvh w-full max-w-full flex flex-col relative overflow-hidden" style={{ background: "#09090E" }}>

      {/* ── Layer 1: Warp 3-D grid — very subtle amber beams ── */}
      <WarpBackground
        className="absolute inset-0"
        beamsPerSide={1}
        beamSize={9}
        beamDuration={14}
        beamDelayMax={10}
        beamDelayMin={2}
        beamOpacity={0.30}
        gridColor="rgba(180,148,60,0.025)"
        perspective={150}
      />

      {/* ── Layer 2: Flat dark mute — tones down everything uniformly ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(9,9,14,0.28)" }}
      />

      {/* ── Layer 3: Central warm hint — very soft, not dominant ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(180,148,60,0.035) 0%, transparent 65%)",
        }}
      />

      {/* ── Layer 4: Edge vignette — heavy crush on edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 25%, rgba(9,9,14,0.90) 100%)",
        }}
      />

      {/* ── Layer 5: Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(9,9,14,0.70), transparent)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={totalQuestions}
          message={progressMessage}
        />
        <QuestionScreen
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          value={getAnswer(currentQuestion.id)}
          extraValue={getExtraAnswer(currentQuestion.id)}
          onChange={(value, extra) => setAnswer(currentQuestion.id, value, extra)}
          onNext={handleNext}
          onBack={handleBack}
          onAutoAdvance={handleAutoAdvance}
          canProceed={canProceed()}
        />
      </div>
    </div>
  )
}
