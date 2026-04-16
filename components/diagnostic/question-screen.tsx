"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react"
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
void applyPhoneMask

function validateField(type: Question["type"], value: string, extra?: string, questionId?: number): string | null {
  const v = value.trim()
  if (!v) return "Este campo é obrigatório"
  if (type === "name") {
    if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(v)) return "Por favor, informe seu nome completo."
    const words = v.split(/\s+/).filter(Boolean)
    if (words.length < 2) return "Por favor, informe seu nome completo."
    return null
  }
  if (type === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Digite um e-mail válido."
    return null
  }
  if (type === "text" && questionId === 19) {
    if (v.includes("instagram.com")) return "Informe seu @ do Instagram corretamente."
    if (!v.startsWith("@")) return "Informe seu @ do Instagram corretamente."
    if (v.length < 4) return "Informe seu @ do Instagram corretamente."
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

// ─── tokens ──────────────────────────────────────────────────────────────────
const GOLD      = "rgba(180,148,60,1)"
const GOLD_DIM  = "rgba(180,148,60,0.55)"
const TEXT_HERO = "#F0EDE6"
const TEXT_BODY = "rgba(240,237,230,0.62)"
const TEXT_MUTED = "rgba(240,237,230,0.22)"
const SERIF     = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
const easeOut   = [0.22, 1, 0.36, 1] as const
const easeIn    = [0.4, 0, 1, 1] as const

// ─── Question card transition ─────────────────────────────────────────────────
const questionVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(6px)",
    transition: { duration: 0.2, ease: easeIn },
  },
}

// ─── Stagger variants for option list ────────────────────────────────────────
const optionVariants = {
  initial: { opacity: 0, y: 8 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.32, ease: easeOut },
  }),
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
  const [touched, setTouched]           = useState(false)
  const [touchedExtra, setTouchedExtra] = useState(false)
  const [textFocused, setTextFocused]   = useState(false)
  const [taFocused, setTaFocused]       = useState(false)

  const extraInputRef = useRef<HTMLInputElement>(null)
  const inputRef      = useRef<HTMLInputElement>(null)
  const textareaRef   = useRef<HTMLTextAreaElement>(null)

  const errorMessage = touched ? validateField(question.type, value, extraValue, question.id) : null
  const hasError     = !!errorMessage
  const isValid      = touched && !errorMessage && value.trim().length > 0

  const handleChange = useCallback(
    (raw: string) => {
      if (question.type === "name") onChange(raw.replace(/[0-9]/g, ""))
      else if (question.type === "email") onChange(raw.trim().toLowerCase())
      else onChange(raw)
    },
    [question.type, onChange]
  )

  const handleExtraChange = (raw: string) => onChange(value, raw)
  const handleBlur        = () => setTouched(true)
  const handleExtraBlur   = () => setTouchedExtra(true)

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
      setTimeout(() => extraInputRef.current?.focus(), 80)
    } else {
      onAutoAdvance(option)
    }
  }

  const handleSelectWithTextContinue = () => {
    setTouched(true)
    setTouchedExtra(true)
    if (canProceed) onAutoAdvance(value, extraValue)
  }

  const isTextType       = ["text", "name", "email", "textarea"].includes(question.type)
  const isSelectType     = question.type === "select"
  const isSelectWithText = question.type === "select-with-text"

  // ─── Input underline base ──────────────────────────────────────────────────
  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${
      hasError ? "rgba(239,68,68,0.38)" : textFocused ? "transparent" : "rgba(255,255,255,0.20)"
    }`,
    borderRadius: 0,
    outline: "none",
    color: "#FDFCFA",
    fontSize: "clamp(19px, 2vw, 24px)",
    letterSpacing: "0.01em",
    paddingBottom: "clamp(12px, 1.4vw, 18px)",
    paddingTop: "4px",
    paddingLeft: 0,
    paddingRight: 0,
    caretColor: GOLD,
    transition: "border-color 0.25s",
    fontFamily: "inherit",
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto min-h-0">
      {/* ── maxWidth container ── */}
      <div className="w-full" style={{ maxWidth: "740px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            variants={questionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationStart={() => {
              setTouched(false)
              setTouchedExtra(false)
              setTextFocused(false)
              setTaFocused(false)
            }}
          >

            {/* ════════════════════════════════════════
                CARD — elevated dark surface
            ════════════════════════════════════════ */}
            <div
              style={{
                position: "relative",
                // Gradient surface: top-left slightly lighter, bottom-right near-opaque
                // creates the illusion of a physical lit panel floating above the bg
                background:
                  "linear-gradient(158deg, rgba(22,18,30,0.93) 0%, rgba(11,10,16,0.97) 100%)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                border: "1px solid rgba(180,148,60,0.18)",
                borderRadius: "12px",
                padding: "clamp(20px, 3.5vh, 40px) clamp(24px, 5vw, 56px) clamp(18px, 3vh, 36px)",
                boxShadow: [
                  // Thin gold outline ring — separates card edge from bg
                  "0 0 0 1px rgba(180,148,60,0.07)",
                  // Near contact shadow — lift off surface
                  "0 4px 18px rgba(0,0,0,0.50)",
                  // Mid diffuse shadow
                  "0 20px 64px rgba(0,0,0,0.62)",
                  // Wide atmosphere shadow
                  "0 56px 120px rgba(0,0,0,0.48)",
                  // Ambient gold glow — halo that ties card to the WarpBg beams
                  "0 0 120px rgba(180,148,60,0.10)",
                ].join(", "),
                overflow: "hidden",
              }}
            >

              {/* Top catch-light — thin gold spectral line */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: "8%",
                  right: "8%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(180,148,60,0.42), transparent)",
                  pointerEvents: "none",
                }}
              />

              {/* Interior top tint — simulates ambient light falling on card face */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "72px",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.022), transparent)",
                  pointerEvents: "none",
                  borderRadius: "12px 12px 0 0",
                }}
              />

              {/* ── Step indicator ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "clamp(16px, 2.8vh, 36px)",
                }}
              >
                {/* Ghost number */}
                <span
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(44px, 7vw, 76px)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    lineHeight: 0.9,
                    background: "linear-gradient(160deg, rgba(220,186,90,0.72) 0%, rgba(180,148,60,0.48) 50%, rgba(140,110,40,0.28) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                    textShadow: "none",
                    filter: "drop-shadow(0 0 18px rgba(180,148,60,0.22))",
                  }}
                >
                  {String(questionNumber).padStart(2, "0")}
                </span>

                {/* Dot track */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "6px",
                    paddingTop: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(240,237,230,0.52)",
                      fontWeight: 500,
                    }}
                  >
                    <span style={{
                      color: "rgba(200,168,80,0.9)",
                      fontWeight: 700,
                    }}>{questionNumber}</span>
                    {" "}de {totalQuestions}
                  </span>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    {Array.from({ length: Math.min(totalQuestions, 18) }).map((_, i) => {
                      const done    = i < questionNumber - 1
                      const current = i === questionNumber - 1
                      return (
                        <motion.div
                          key={i}
                          animate={{
                            width: current ? "20px" : "4px",
                            background: done
                              ? "rgba(180,148,60,0.62)"
                              : current
                              ? "linear-gradient(90deg, rgba(220,186,90,1), rgba(180,148,60,0.9))"
                              : "rgba(255,255,255,0.14)",
                            boxShadow: current
                              ? "0 0 8px rgba(180,148,60,0.55)"
                              : "none",
                          }}
                          transition={{ duration: 0.32, ease: easeOut }}
                          style={{ height: "4px", borderRadius: "2px", flexShrink: 0 }}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* ── Question text ── */}
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(24px, 4.2vw, 52px)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  color: "#FDFCFA",
                  letterSpacing: "-0.025em",
                  marginBottom: "clamp(18px, 2.8vh, 36px)",
                  textShadow: "0 1px 28px rgba(180,148,60,0.14)",
                }}
              >
                {question.text}
              </h2>

              {/* ─────────────────────────────────────────
                  TEXT / NAME
              ───────────────────────────────────────── */}
              {isTextType && question.type !== "textarea" && (
                <div style={{ marginBottom: "clamp(16px, 2.8vh, 36px)" }}>
                  <div style={{ position: "relative" }}>
                    <input
                      ref={inputRef}
                      key={question.id}
                      type="text"
                      inputMode="text"
                autoCapitalize={question.type === "name" ? "words" : "none"}
                autoComplete={question.type === "name" ? "name" : question.type === "email" ? "email" : "off"}
                inputMode={question.type === "email" ? "email" : undefined}
                      value={value}
                      onChange={(e) => handleChange(e.target.value)}
                      onFocus={() => setTextFocused(true)}
                      onBlur={() => { setTextFocused(false); handleBlur() }}
                      onKeyDown={handleKeyDown}
                      placeholder={question.placeholder}
                      autoFocus
                      style={inputBase}
                      className="placeholder:text-white/35 w-full"
                    />
                    {/* Static rail */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: hasError
                          ? "rgba(239,68,68,0.38)"
                          : "rgba(255,255,255,0.20)",
                        pointerEvents: "none",
                      }}
                    />
                    {/* Animated gold focus line — expands from centre */}
                    {!hasError && (
                      <motion.div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "1px",
                          background: isValid
                            ? "linear-gradient(90deg, transparent 0%, rgba(120,200,120,0.55) 25%, rgba(120,200,120,0.55) 75%, transparent 100%)"
                            : `linear-gradient(90deg, transparent 0%, ${GOLD} 25%, ${GOLD} 75%, transparent 100%)`,
                          transformOrigin: "center",
                          pointerEvents: "none",
                        }}
                        animate={{
                          scaleX: textFocused || isValid ? 1 : 0,
                          opacity: textFocused || isValid ? 1 : 0,
                          boxShadow: isValid
                            ? "0 0 8px 1px rgba(120,200,120,0.18)"
                            : textFocused
                            ? "0 0 10px 2px rgba(180,148,60,0.32)"
                            : "none",
                        }}
                        transition={{ duration: 0.38, ease: easeOut }}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {hasError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "11px",
                          color: "rgba(239,100,100,0.55)",
                          marginTop: "10px",
                          letterSpacing: "0.02em",
                        }}
                      >
                        <AlertCircle style={{ width: "12px", height: "12px", flexShrink: 0 }} />
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ─────────────────────────────────────────
                  TEXTAREA
              ───────────────────────────────────────── */}
              {question.type === "textarea" && (
                <div style={{ marginBottom: "clamp(16px, 2.8vh, 36px)" }}>
                  <textarea
                    ref={textareaRef}
                    key={question.id}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setTaFocused(true)}
                    onBlur={() => { setTaFocused(false); handleBlur() }}
                    placeholder={question.placeholder}
                    autoFocus
                    rows={5}
                    style={{
                      width: "100%",
                      background: taFocused
                        ? "rgba(180,148,60,0.028)"
                        : "rgba(255,255,255,0.022)",
                      border: `1px solid ${
                        hasError
                          ? "rgba(239,68,68,0.5)"
                          : taFocused
                          ? "rgba(180,148,60,0.32)"
                          : "rgba(255,255,255,0.10)"
                      }`,
                      borderRadius: "6px",
                      outline: "none",
                      color: "#FDFCFA",
                      fontSize: "clamp(16px, 1.5vw, 19px)",
                      letterSpacing: "0.01em",
                      lineHeight: "1.75",
                      padding: "clamp(14px, 1.6vw, 20px) clamp(16px, 1.8vw, 22px)",
                      resize: "none",
                      caretColor: GOLD,
                      transition: "border-color 0.28s, background 0.28s, box-shadow 0.28s",
                      fontFamily: "inherit",
                      boxShadow: taFocused && !hasError
                        ? "0 0 0 3px rgba(180,148,60,0.08), 0 0 16px rgba(180,148,60,0.06)"
                        : "none",
                    }}
                    className="placeholder:text-white/35"
                  />
                  <AnimatePresence>
                    {hasError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "11px",
                          color: "rgba(239,100,100,0.55)",
                          marginTop: "10px",
                          letterSpacing: "0.02em",
                        }}
                      >
                        <AlertCircle style={{ width: "12px", height: "12px", flexShrink: 0 }} />
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ─────────────────────────────────────────
                  SELECT (auto-advance)
              ───────────────────────────────────────── */}
              {isSelectType && question.options && (
                <div style={{ marginBottom: "16px" }}>
                  {question.options.map((option, i) => (
                    <SelectOption
                      key={option}
                      option={option}
                      index={i}
                      isSelected={value === option}
                      onClick={() => handleSelectOption(option)}
                    />
                  ))}
                </div>
              )}

              {/* ─────────────────────────────────────────
                  SELECT WITH TEXT
              ───────────────────────────────────────── */}
              {isSelectWithText && question.options && (
                <div style={{ marginBottom: "24px" }}>
                  {question.options.map((option, i) => (
                    <SelectOption
                      key={option}
                      option={option}
                      index={i}
                      isSelected={value === option}
                      onClick={() => handleSelectOption(option)}
                    />
                  ))}

                  {/* "Outro" expand */}
                  <AnimatePresence>
                    {value === "Outro" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: easeOut }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            paddingTop: "22px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                          }}
                        >
                          <div style={{ position: "relative" }}>
                            <input
                              ref={extraInputRef}
                              type="text"
                              value={extraValue}
                              onChange={(e) => handleExtraChange(e.target.value)}
                              onBlur={handleExtraBlur}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && canProceed)
                                  handleSelectWithTextContinue()
                              }}
                              placeholder="Descreva brevemente..."
                              style={{
                                width: "100%",
                                background: "transparent",
                                border: "none",
                                borderBottom: `1px solid ${
                                  touchedExtra &&
                                  (!extraValue || extraValue.trim().length < 2)
                                    ? "rgba(239,68,68,0.55)"
                                    : "rgba(255,255,255,0.13)"
                                }`,
                                borderRadius: 0,
                                outline: "none",
                                color: TEXT_HERO,
                                fontSize: "16px",
                                letterSpacing: "0.02em",
                                paddingBottom: "11px",
                                paddingTop: "4px",
                                paddingLeft: 0,
                                paddingRight: 0,
                                caretColor: GOLD,
                                transition: "border-color 0.25s",
                                fontFamily: "inherit",
                              }}
                              className="placeholder:text-white/20 w-full"
                            />
                          </div>
                          {touchedExtra &&
                            (!extraValue || extraValue.trim().length < 2) && (
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  fontSize: "11px",
                                  color: "rgba(239,100,100,0.55)",
                                  letterSpacing: "0.02em",
                                }}
                              >
                                <AlertCircle
                                  style={{ width: "13px", height: "13px", flexShrink: 0 }}
                                />
                                Por favor, descreva sua resposta
                              </p>
                            )}
                          <ContinueButton
                            onClick={handleSelectWithTextContinue}
                            disabled={!canProceed}
                            label="Continuar"
                            isLast={false}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── Navigation — text / textarea ── */}
              {isTextType && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "clamp(8px, 1.8vh, 18px)",
                  }}
                >
                  <BackButton onClick={onBack} />
                  <ContinueButton
                    onClick={handleNext}
                    disabled={!canProceed}
                    label={questionNumber === totalQuestions ? "Finalizar" : "Continuar"}
                    isLast={questionNumber === totalQuestions}
                  />
                </div>
              )}

              {/* ── Back — select screens ── */}
              {(isSelectType || isSelectWithText) && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingTop: "clamp(10px, 1.6vh, 20px)",
                  }}
                >
                  <BackButton onClick={onBack} />
                </div>
              )}

            </div>
            {/* /CARD */}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── SelectOption ─────────────────────────────────────────────────────────── */

function SelectOption({
  option,
  index,
  isSelected,
  onClick,
}: {
  option: string
  index: number
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      variants={optionVariants}
      initial="initial"
      animate="animate"
      custom={index}
      whileTap={{ scale: 0.995 }}
      className="w-full text-left cursor-pointer"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "clamp(14px, 1.5vw, 20px)",
        paddingTop: "clamp(10px, 1.2vh, 15px)",
        paddingBottom: "clamp(10px, 1.2vh, 15px)",
        paddingLeft: 0,
        paddingRight: 0,
        background: isSelected ? "rgba(180,148,60,0.08)" : "transparent",
        outline: "none",
        border: "none",
        borderBottom: `1px solid ${isSelected ? "rgba(180,148,60,0.18)" : "rgba(255,255,255,0.08)"}`,
        transition: "background 0.18s, border-color 0.18s",
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (!isSelected)
          e.currentTarget.style.background = "rgba(255,255,255,0.024)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isSelected
          ? "rgba(180,148,60,0.05)"
          : "transparent"
      }}
    >
      {/* Left accent bar */}
      <motion.span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: "18%",
          bottom: "18%",
          width: "1.5px",
          background: GOLD,
          borderRadius: "1px",
          transformOrigin: "center",
          pointerEvents: "none",
        }}
        animate={{ scaleY: isSelected ? 1 : 0, opacity: isSelected ? 0.7 : 0 }}
        transition={{ duration: 0.2, ease: easeOut }}
      />

      {/* Dot */}
      <motion.div
        animate={{
          background: isSelected ? "linear-gradient(135deg, rgba(220,186,90,1), rgba(180,148,60,0.9))" : "transparent",
          borderColor: isSelected ? "rgba(220,186,90,0.9)" : "rgba(255,255,255,0.28)",
          boxShadow: isSelected ? "0 0 14px rgba(180,148,60,0.65), 0 0 6px rgba(180,148,60,0.4)" : "none",
          scale: isSelected ? 1.2 : 1,
        }}
        transition={{ duration: 0.18 }}
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          flexShrink: 0,
          border: "1.5px solid rgba(255,255,255,0.28)",
        }}
      />

      {/* Label */}
      <span
        style={{
          flex: 1,
          fontSize: "clamp(16px, 1.4vw, 19px)",
          fontWeight: isSelected ? 500 : 400,
          color: isSelected ? "#FDFCFA" : TEXT_BODY,
          transition: "color 0.18s",
          letterSpacing: "0.005em",
        }}
      >
        {option}
      </span>

      {/* Check */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            <Check style={{ width: "12px", height: "12px", color: GOLD_DIM }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ── BackButton ───────────────────────────────────────────────────────────── */

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        background: "transparent",
        border: "none",
        outline: "none",
        color: "rgba(240,237,230,0.48)",
        fontSize: "10px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        padding: "8px 0",
        cursor: "pointer",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.color = "rgba(240,237,230,0.82)"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.color = "rgba(240,237,230,0.48)"
      }}
    >
      <ArrowLeft style={{ width: "10px", height: "10px" }} />
      Voltar
    </button>
  )
}

/* ── ContinueButton ──────────��─────────────────────���──────────────────────── */

function ContinueButton({
  onClick,
  disabled,
  label,
  isLast,
}: {
  onClick: () => void
  disabled: boolean
  label: string
  isLast: boolean
}) {
  const isActive = !disabled

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={
        disabled
          ? {}
          : {
              y: -2,
              boxShadow: isLast
                ? "0 0 48px rgba(180,148,60,0.42), 0 8px 28px rgba(180,148,60,0.26)"
                : "0 0 32px rgba(180,148,60,0.30), 0 6px 20px rgba(180,148,60,0.16)",
            }
      }
      whileTap={disabled ? {} : { scale: 0.962, y: 0 }}
      className="cursor-pointer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "50px",
        paddingLeft: "32px",
        paddingRight: "32px",
        borderRadius: "6px",
        border: `1px solid ${
          disabled
            ? "rgba(255,255,255,0.07)"
            : "rgba(180,148,60,0.70)"
        }`,
        background: disabled
          ? "rgba(255,255,255,0.04)"
          : isLast
          ? "linear-gradient(135deg, rgba(210,170,65,0.95) 0%, rgba(170,138,48,0.95) 55%, rgba(145,115,35,0.90) 100%)"
          : "linear-gradient(135deg, rgba(195,158,58,0.88) 0%, rgba(160,130,42,0.88) 55%, rgba(135,108,30,0.84) 100%)",
        color: disabled ? "rgba(240,237,230,0.20)" : "#0B0A10",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "border-color 0.22s, background 0.22s, box-shadow 0.22s",
        boxShadow: isActive
          ? "0 0 22px rgba(180,148,60,0.20), 0 4px 14px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.14)"
          : "none",
      }}
    >
      {label}
      <ArrowRight style={{ width: "12px", height: "12px" }} />
    </motion.button>
  )
}
