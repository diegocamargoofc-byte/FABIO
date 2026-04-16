"use client"

import { motion } from "framer-motion"
import { MessageCircle, ArrowRight, Clock, TrendingUp, AlertTriangle, Zap, Sparkles } from "lucide-react"
import type { Answer, Question, DiagnosticResult } from "./diagnostic-flow"

interface CompletionScreenProps {
  onSendWhatsApp: () => void
  answers: Answer[]
  questions: Question[]
  diagnosticResult: DiagnosticResult | null
}

// ─── tokens
const GOLD        = "rgba(180,148,60,1)"
const GOLD_DIM    = "rgba(180,148,60,0.72)"
const GOLD_FAINT  = "rgba(180,148,60,0.08)"
const GOLD_BORDER = "rgba(180,148,60,0.2)"
const TEXT_HERO   = "#F0EDE6"
const TEXT_BODY   = "rgba(240,237,230,0.62)"
const TEXT_MUTED  = "rgba(240,237,230,0.32)"
const CARD_BG     = "rgba(13,13,20,0.8)"
const CARD_BORDER = "rgba(255,255,255,0.06)"
const SERIF       = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
const ease        = [0.22, 1, 0.36, 1] as [number, number, number, number]

// ─── Score ring
function ScoreRing({ score }: { score: number }) {
  const r    = 42
  const circ = 2 * Math.PI * r

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 136,
        height: 136,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={136}
        height={136}
        style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
      >
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#8C6220" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
        <motion.circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (circ * score) / 100 }}
          transition={{ delay: 0.6, duration: 1.5, ease }}
        />
      </svg>
      <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
        <motion.span
          style={{
            display: "block",
            fontFamily: SERIF,
            fontSize: "36px",
            fontWeight: 500,
            color: TEXT_HERO,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5, ease }}
        >
          {score}%
        </motion.span>
        <motion.span
          style={{
            display: "block",
            fontSize: "8px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: TEXT_MUTED,
            marginTop: "4px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          potencial
        </motion.span>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          boxShadow: "0 0 44px rgba(180,148,60,0.08)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

// ─── Section label
function SectionLabel({ icon: Icon, label, color }: {
  icon: React.ElementType
  label: string
  color: string
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: `${color}14`,
          border: `1px solid ${color}28`,
        }}
      >
        <Icon style={{ width: "12px", height: "12px", color }} />
      </div>
      <span
        style={{
          fontSize: "9.5px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color,
        }}
      >
        {label}
      </span>
    </div>
  )
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease },
})

// ─── Main
export function CompletionScreen({ onSendWhatsApp, diagnosticResult }: CompletionScreenProps) {
  const hasResult = !!diagnosticResult

  return (
    <div
      className="h-dvh w-full max-w-full flex flex-col relative overflow-hidden"
      style={{ background: "#09090E" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(180,148,60,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_35%_at_50%_110%,rgba(37,211,102,0.035),transparent)]" />
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px)
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

      {/* Scroll */}
      <div className="relative flex-1 overflow-y-auto">
        <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px 48px" }}>
          <div style={{ width: "100%", maxWidth: "520px" }}>

            {/* ── HERO ── */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
              style={{ textAlign: "center", marginBottom: "36px" }}
            >
              {/* Eyebrow */}
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: GOLD_DIM,
                  marginBottom: "28px",
                }}
              >
                Diagnóstico concluído&nbsp;·&nbsp;IL Negócios
              </p>

              {/* Score ring ou ícone */}
              {hasResult ? (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                  <ScoreRing score={diagnosticResult.score} />
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: GOLD_FAINT,
                      border: `1px solid ${GOLD_BORDER}`,
                    }}
                  >
                    <TrendingUp style={{ width: "28px", height: "28px", color: GOLD }} />
                  </div>
                </div>
              )}

              {/* Título */}
              <h1
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(26px, 4vw, 38px)",
                  fontWeight: 500,
                  color: TEXT_HERO,
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  marginBottom: "10px",
                }}
              >
                {hasResult ? "Sua pré-análise está pronta" : "Pré-análise concluída"}
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: TEXT_BODY,
                  marginBottom: "24px",
                  maxWidth: "400px",
                  marginInline: "auto",
                  letterSpacing: "0.01em",
                }}
              >
                {hasResult
                  ? "Com base nas suas respostas, identificamos oportunidades reais no seu negócio."
                  : "Com base nas suas respostas, geramos um diagnóstico inicial do seu cenário."}
              </p>

              {/* Stage badge */}
              {hasResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "2px",
                    background: GOLD_FAINT,
                    border: `1px solid ${GOLD_BORDER}`,
                    boxShadow: "0 2px 12px rgba(180,148,60,0.08)",
                  }}
                >
                  <TrendingUp style={{ width: "12px", height: "12px", flexShrink: 0, color: GOLD }} />
                  <span style={{ fontSize: "11px", fontWeight: 600, color: GOLD }}>
                    {diagnosticResult.label}
                  </span>
                  <span style={{ color: TEXT_MUTED, fontSize: "9px" }}>·</span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: TEXT_MUTED,
                      maxWidth: "180px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={diagnosticResult.stage}
                  >
                    {diagnosticResult.stage}
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* ── INSIGHTS ── */}
            {hasResult && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>

                {/* Gargalo */}
                <motion.div {...fadeUp(0.4)}>
                  <div
                    style={{
                      borderRadius: "3px",
                      padding: "20px 20px 20px 28px",
                      position: "relative",
                      overflow: "hidden",
                      background: "linear-gradient(135deg, rgba(249,115,22,0.065) 0%, rgba(249,115,22,0.02) 100%)",
                      border: "1px solid rgba(249,115,22,0.18)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "20px",
                        bottom: "20px",
                        width: "2px",
                        background: "linear-gradient(to bottom, #f97316, #ea580c)",
                        borderRadius: "99px",
                      }}
                    />
                    <SectionLabel icon={AlertTriangle} label="Gargalo crítico" color="#f97316" />
                    <p style={{ fontSize: "13.5px", lineHeight: "1.68", fontWeight: 500, color: TEXT_HERO, letterSpacing: "0.01em" }}>
                      {diagnosticResult.bottleneck}
                    </p>
                  </div>
                </motion.div>

                {/* Oportunidades */}
                <motion.div {...fadeUp(0.52)}>
                  <div
                    style={{
                      borderRadius: "3px",
                      padding: "20px",
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    <SectionLabel icon={Zap} label="Oportunidades identificadas" color={GOLD} />
                    <ul style={{ display: "flex", flexDirection: "column", gap: "12px", margin: 0, padding: 0, listStyle: "none" }}>
                      {diagnosticResult.opportunities.map((opp, i) => (
                        <motion.li
                          key={i}
                          style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.62 + i * 0.1, duration: 0.38 }}
                        >
                          <span
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              fontSize: "9.5px",
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: "1px",
                              background: GOLD_FAINT,
                              color: GOLD,
                              border: `1px solid ${GOLD_BORDER}`,
                            }}
                          >
                            {i + 1}
                          </span>
                          <span style={{ fontSize: "13.5px", lineHeight: "1.66", color: TEXT_HERO, letterSpacing: "0.01em" }}>
                            {opp}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Recomendação */}
                <motion.div {...fadeUp(0.64)}>
                  <div
                    style={{
                      borderRadius: "3px",
                      padding: "20px",
                      position: "relative",
                      overflow: "hidden",
                      background: "linear-gradient(135deg, rgba(180,148,60,0.055) 0%, rgba(13,13,19,0.65) 55%)",
                      border: `1px solid ${GOLD_BORDER}`,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "90px",
                        height: "90px",
                        background: "radial-gradient(circle at top right, rgba(180,148,60,0.07), transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                    <SectionLabel icon={Sparkles} label="Recomendação" color={GOLD_DIM} />
                    <p style={{ fontSize: "13.5px", lineHeight: "1.7", color: TEXT_BODY, letterSpacing: "0.01em" }}>
                      {diagnosticResult.recommendation}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Fallback */}
            {!hasResult && (
              <motion.div
                {...fadeUp(0.4)}
                style={{
                  borderRadius: "3px",
                  padding: "20px",
                  marginBottom: "36px",
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                }}
              >
                <p style={{ fontSize: "14px", lineHeight: "1.72", color: TEXT_BODY, letterSpacing: "0.01em" }}>
                  Se o seu perfil estiver alinhado, você poderá avançar para a{" "}
                  <span style={{ fontWeight: 500, color: TEXT_HERO }}>Sessão Estratégica</span>,
                  onde será apresentado um plano claro para{" "}
                  <span style={{ fontWeight: 500, color: TEXT_HERO }}>
                    crescimento, estrutura e escala
                  </span>{" "}
                  do seu negócio.
                </p>
              </motion.div>
            )}

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasResult ? 0.82 : 0.5, duration: 0.5 }}
            >
              {/* Divisor */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
                <span
                  style={{
                    fontSize: "8.5px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: TEXT_MUTED,
                  }}
                >
                  próximo passo
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
              </div>

              {/* WhatsApp button */}
              <motion.button
                onClick={onSendWhatsApp}
                whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(37,211,102,0.38), inset 0 1px 0 rgba(255,255,255,0.16)" }}
                whileTap={{ y: 0, scale: 0.985 }}
                className="w-full cursor-pointer"
                style={{
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  borderRadius: "4px",
                  background: "linear-gradient(135deg, #25D366 0%, #1da34a 100%)",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  border: "none",
                  outline: "none",
                  boxShadow: "0 4px 24px rgba(37,211,102,0.26), inset 0 1px 0 rgba(255,255,255,0.16)",
                  transition: "box-shadow 0.2s",
                }}
              >
                <MessageCircle style={{ width: "18px", height: "18px", flexShrink: 0 }} />
                <span>Falar com especialista no WhatsApp</span>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight style={{ width: "14px", height: "14px", flexShrink: 0 }} />
                </motion.span>
              </motion.button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "12px",
                }}
              >
                <Clock style={{ width: "11px", height: "11px", color: TEXT_MUTED }} />
                <span style={{ fontSize: "11px", color: TEXT_MUTED, letterSpacing: "0.02em" }}>
                  Leva menos de 1 minuto
                </span>
              </div>
            </motion.div>

            {/* Footer */}
            <p
              style={{
                textAlign: "center",
                fontSize: "10px",
                marginTop: "28px",
                letterSpacing: "0.04em",
                color: "rgba(240,237,230,0.16)",
              }}
            >
              Suas respostas serão enviadas automaticamente pelo WhatsApp
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
