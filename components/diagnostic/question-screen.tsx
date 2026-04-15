"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Question } from "./diagnostic-flow"

interface QuestionScreenProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  value: string
  extraValue?: string
  onChange: (value: string, extra?: string) => void
  onNext: () => void
  onBack: () => void
  onAutoAdvance: (value: string, extra?: string) => void
  canProceed: boolean
}

function applyPhoneMask(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ""
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function validateField(type: Question["type"], value: string, extra?: string): string | null {
  const v = value.trim()
  if (!v) return "Este campo é obrigatório"
  if (type === "name") {
    if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(v)) return "Digite apenas letras, sem números"
    return null
  }
  if (type === "select-with-text") {
    if (v === "Outro") {
      if (!extra || extra.trim().length < 2) return "Por favor, descreva sua resposta"
    }
    return null
  }
  return null
}

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  value,
  extraValue = "",
  onChange,
  onNext,
  onBack,
  onAutoAdvance,
  canProceed,
}: QuestionScreenProps) {
  const [touched, setTouched] = useState(false)
  const [touchedExtra, setTouchedExtra] = useState(false)
  const extraInputRef = useRef<HTMLInputElement>(null)

  const errorMessage = touched ? validateField(question.type, value, extraValue) : null
  const hasError = !!errorMessage

  // Auto-focus the extra input when "Outro" is selected
  useEffect(() => {
    if (value === "Outro" && extraInputRef.current) {
      setTimeout(() => extraInputRef.current?.focus(), 100)
    }
  }, [value])

  const handleChange = useCallback(
    (raw: string) => {
      if (question.type === "name") {
        onChange(raw.replace(/[0-9]/g, ""))
      } else {
        onChange(raw)
      }
    },
    [question.type, onChange]
  )

  const handleExtraChange = (raw: string) => {
    onChange(value, raw)
  }

  const handleBlur = () => setTouched(true)
  const handleExtraBlur = () => setTouchedExtra(true)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceed && question.type !== "textarea") {
      setTouched(true)
      onNext()
    }
  }

  const handleNext = () => {
    setTouched(true)
    setTouchedExtra(true)
    if (canProceed) onNext()
  }

  const handleSelectOption = (option: string) => {
    if (option === "Outro") {
      onChange(option, extraValue)
      // Don't auto-advance, wait for text input
    } else {
      onAutoAdvance(option)
    }
  }

  const handleSelectWithTextContinue = () => {
    setTouched(true)
    setTouchedExtra(true)
    if (canProceed) {
      onAutoAdvance(value, extraValue)
    }
  }

  const isTextType = ["text", "name", "textarea"].includes(question.type)
  const isSelectType = question.type === "select"
  const isSelectWithText = question.type === "select-with-text"

  const inputClass = `h-11 sm:h-12 text-sm sm:text-base rounded-xl transition-all duration-200 placeholder:text-muted-foreground/50
    ${hasError
      ? "border-2 border-red-400 bg-red-50/30 focus-visible:ring-red-300/30"
      : "border-border/60 bg-muted/30 focus-visible:ring-primary/20"
    }`

  const optionClass = (option: string) => {
    const isSelected = value === option
    return `w-full p-3 sm:p-4 rounded-xl text-left text-sm sm:text-base font-medium
      transition-all duration-200 border-2 relative overflow-hidden
      ${isSelected
        ? "border-primary bg-primary/[0.08] text-foreground shadow-sm"
        : "border-border/50 bg-muted/20 text-foreground hover:border-primary/40 hover:bg-muted/40"
      }`
  }

  return (
    <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-4 overflow-hidden">
      <div className="w-full max-w-[calc(100%-24px)] sm:max-w-xl md:max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 24, scale: 0.99 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onAnimationStart={() => { setTouched(false); setTouchedExtra(false) }}
          >
            {/* Card */}
            <div className="bg-card rounded-2xl border border-border/60 shadow-lg p-4 sm:p-6 md:p-8 max-w-full">

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground text-xs font-bold">
                  {questionNumber}
                </span>
                <span className="text-xs text-muted-foreground">de {totalQuestions}</span>
              </div>

              {/* Question text */}
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-5 leading-snug">
                {question.text}
              </h2>

              {/* --- TEXT / NAME --- */}
              {isTextType && question.type !== "textarea" && (
                <div className="space-y-1.5 mb-5">
                  <Input
                    key={question.id}
                    type="text"
                    inputMode={question.type === "name" ? "text" : "text"}
                    autoCapitalize={question.type === "name" ? "words" : "sentences"}
                    autoComplete={question.type === "name" ? "name" : "off"}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={question.placeholder}
                    className={inputClass}
                    autoFocus
                  />
                  <AnimatePresence>
                    {hasError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-500"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* --- TEXTAREA --- */}
              {question.type === "textarea" && (
                <div className="space-y-1.5 mb-5">
                  <Textarea
                    key={question.id}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    placeholder={question.placeholder}
                    className={`min-h-28 sm:min-h-36 text-sm sm:text-base rounded-xl resize-none placeholder:text-muted-foreground/50 transition-all duration-200
                      ${hasError ? "border-2 border-red-400 bg-red-50/30" : "border-border/60 bg-muted/30"}`}
                    autoFocus
                  />
                  <AnimatePresence>
                    {hasError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-500"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* --- SELECT (auto-advance) --- */}
              {isSelectType && question.options && (
                <div className="grid gap-2 mb-2">
                  {question.options.map((option, i) => {
                    const isSelected = value === option
                    return (
                      <motion.button
                        key={option}
                        onClick={() => handleSelectOption(option)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        whileTap={{ scale: 0.98 }}
                        className={optionClass(option)}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="leading-snug">{option}</span>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200
                            ${isSelected ? "bg-primary" : "border-2 border-border/60"}`}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                              >
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              )}

              {/* --- SELECT WITH TEXT (Outro expands a field) --- */}
              {isSelectWithText && question.options && (
                <div className="space-y-2 mb-5">
                  <div className="grid gap-2">
                    {question.options.map((option, i) => {
                      const isSelected = value === option
                      return (
                        <motion.button
                          key={option}
                          onClick={() => handleSelectOption(option)}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          whileTap={{ scale: 0.98 }}
                          className={optionClass(option)}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="leading-snug">{option}</span>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200
                              ${isSelected ? "bg-primary" : "border-2 border-border/60"}`}>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                >
                                  <Check className="w-3 h-3 text-primary-foreground" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* "Outro" expanded input */}
                  <AnimatePresence>
                    {value === "Outro" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-1 space-y-1.5">
                          <Input
                            ref={extraInputRef}
                            type="text"
                            value={extraValue}
                            onChange={(e) => handleExtraChange(e.target.value)}
                            onBlur={handleExtraBlur}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && canProceed) handleSelectWithTextContinue()
                            }}
                            placeholder="Descreva brevemente..."
                            className={`h-11 text-sm rounded-xl transition-all duration-200 placeholder:text-muted-foreground/50
                              ${touchedExtra && (!extraValue || extraValue.trim().length < 2)
                                ? "border-2 border-red-400 bg-red-50/30"
                                : "border-border/60 bg-muted/30"
                              }`}
                          />
                          {touchedExtra && (!extraValue || extraValue.trim().length < 2) && (
                            <p className="flex items-center gap-1.5 text-xs text-red-500">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              Por favor, descreva sua resposta
                            </p>
                          )}
                          <Button
                            onClick={handleSelectWithTextContinue}
                            disabled={!canProceed}
                            className="w-full h-10 rounded-xl text-sm font-medium gap-2 group disabled:opacity-40"
                          >
                            Continuar
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Navigation for text/textarea */}
              {isTextType && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="h-11 px-4 rounded-xl border-border/60 text-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Voltar
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="flex-1 h-11 rounded-xl gap-2 group disabled:opacity-40 text-sm font-medium"
                  >
                    {questionNumber === totalQuestions ? "Finalizar" : "Continuar"}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
              )}

              {/* Back button only for select types */}
              {(isSelectType || isSelectWithText) && (
                <div className="flex justify-start mt-3">
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="h-9 px-3 rounded-lg text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Voltar
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
