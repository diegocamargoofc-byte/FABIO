"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Target, Users } from "lucide-react"
import Image from "next/image"

interface WelcomeScreenProps {
  onStart: () => void
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

const LOGO_SRC = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9445.PNG-N9T7xNmMLXKf0pEjipobXSb0q2Pwdj.png"
const GOLD = "rgba(180,148,60,1)"
const GOLD_DIM = "rgba(180,148,60,0.75)"
const GOLD_MUTED = "rgba(180,148,60,0.4)"
const GOLD_FAINT = "rgba(180,148,60,0.5)"
const TEXT_PRIMARY = "#F0EDE6"
const TEXT_BODY = "rgba(240,237,230,0.62)"
const TEXT_FAINT = "rgba(240,237,230,0.32)"
const TEXT_GHOST = "rgba(240,237,230,0.2)"
const BG = "#09090E"

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div
      className="w-full max-w-full overflow-x-hidden flex flex-col"
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: BG,
        boxSizing: "border-box",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "500px",
          height: "120px",
          borderRadius: "50%",
          filter: "blur(80px)",
          background: "rgba(180,148,60,0.05)",
        }}
      />

      {/* ── HEADER ── */}
      <header
        className="relative z-10 shrink-0 w-full flex items-center"
        style={{
          height: "56px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          paddingLeft: "clamp(16px, 5vw, 40px)",
          paddingRight: "clamp(16px, 5vw, 40px)",
          justifyContent: "flex-start",
        }}
      >
        {/* Mobile: centered; Desktop: left */}
        <div className="lg:hidden absolute left-0 right-0 flex justify-center pointer-events-none">
          <Image
            src={LOGO_SRC}
            alt="IL Negócios — Performance & Resultado"
            width={130}
            height={42}
            priority
            className="object-contain"
            style={{
              height: "28px",
              width: "auto",
              filter: "brightness(1.15) contrast(1.06) drop-shadow(0 1px 6px rgba(180,148,60,0.18))",
            }}
          />
        </div>
        <div className="hidden lg:flex">
          <Image
            src={LOGO_SRC}
            alt="IL Negócios — Performance & Resultado"
            width={144}
            height={46}
            priority
            className="object-contain"
            style={{
              height: "34px",
              width: "auto",
              filter: "brightness(1.15) contrast(1.06) drop-shadow(0 1px 6px rgba(180,148,60,0.18))",
            }}
          />
        </div>
      </header>

      {/* ── MAIN ── */}
      <main
        className="relative z-10 flex-1 overflow-hidden flex items-center justify-center"
        style={{ boxSizing: "border-box" }}
      >
        {/* Mobile / Tablet */}
        <div
          className="lg:hidden w-full flex flex-col items-center text-center overflow-hidden"
          style={{
            padding: "20px 20px 24px",
            maxWidth: "400px",
            marginInline: "auto",
            boxSizing: "border-box",
          }}
        >
          <MobileContent onStart={onStart} />
        </div>

        {/* Desktop — duas colunas */}
        <div
          className="hidden lg:grid w-full h-full"
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            padding: "0 clamp(32px, 4vw, 56px)",
            gridTemplateColumns: "1.15fr 0.85fr",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: "560px", paddingRight: "48px" }}>
            <DesktopContent onStart={onStart} />
          </div>
          <div
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RightPanel />
          </div>
        </div>
      </main>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Conteúdo mobile — tudo centralizado
───────────────────────────────────────────────── */
function MobileContent({ onStart }: { onStart: () => void }) {
  return (
    <>
      <motion.p
        {...fadeUp(0.05)}
        className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-4 w-full"
        style={{ color: GOLD_DIM }}
      >
        Sessão Estratégica&nbsp;·&nbsp;IL Negócios
      </motion.p>

      <motion.h1
        {...fadeUp(0.1)}
        className="text-[28px] font-bold leading-[1.08] tracking-[-0.01em] mb-5 w-full"
        style={{ color: TEXT_PRIMARY, textWrap: "balance" } as React.CSSProperties}
      >
        Antes de avançarmos,<br />
        <span style={{ color: GOLD }}>preciso entender</span><br />
        o seu cenário.
      </motion.h1>

      <motion.div
        {...fadeUp(0.13)}
        className="w-8 h-px mb-5"
        style={{ background: GOLD_MUTED }}
      />

      <motion.div
        {...fadeUp(0.15)}
        className="flex flex-col gap-3 text-[14px] leading-[1.6] mb-4 w-full"
        style={{ color: TEXT_BODY, maxWidth: "360px", marginInline: "auto" }}
      >
        <p>
          A <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>Sessão Estratégica</strong> é um encontro exclusivo para empresários que querem crescer, vender mais e organizar o negócio com método.
        </p>
        <p>
          Vou analisar seu momento atual e mostrar com clareza os{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>erros e oportunidades</strong>{" "}
          que podem estar limitando o seu{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>faturamento</strong>.
        </p>
        <p>
          Antes de avançar, você responderá uma{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>pré-entrevista rápida</strong>{" "}
          sobre o seu negócio.
        </p>
      </motion.div>

      <motion.p
        {...fadeUp(0.19)}
        className="text-[13px] leading-[1.6] mb-5 pl-3 border-l text-left w-full"
        style={{
          color: "rgba(180,148,60,0.88)",
          borderColor: GOLD_MUTED,
          fontStyle: "italic",
          maxWidth: "360px",
          marginInline: "auto",
        }}
      >
        Isso garante que a sessão seja <strong style={{ fontWeight: 600 }}>direta, personalizada</strong> e focada em resultado.
      </motion.p>

      <motion.p
        {...fadeUp(0.22)}
        className="text-[12px] mb-6 w-full"
        style={{ color: TEXT_FAINT, maxWidth: "340px", marginInline: "auto" }}
      >
        No final, você saberá se faz sentido avançarmos para a sua Sessão Estratégica.
      </motion.p>

      <motion.div
        {...fadeUp(0.26)}
        className="w-full"
        style={{ maxWidth: "320px", marginInline: "auto" }}
      >
        <CtaButton onStart={onStart} />
      </motion.div>

      <motion.p
        {...fadeUp(0.3)}
        className="text-[10px] tracking-[0.07em] mt-3"
        style={{ color: TEXT_GHOST }}
      >
        Leva menos de 3 minutos&nbsp;&nbsp;·&nbsp;&nbsp;Vagas limitadas
      </motion.p>
    </>
  )
}

/* ─────────────────────────────────────────────────
   Conteúdo desktop — coluna esquerda
───────────────────────────────────────────────── */
function DesktopContent({ onStart }: { onStart: () => void }) {
  return (
    <>
      <motion.p
        {...fadeUp(0.05)}
        className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-5"
        style={{ color: GOLD_DIM }}
      >
        Sessão Estratégica&nbsp;·&nbsp;IL Negócios
      </motion.p>

      <motion.h1
        {...fadeUp(0.1)}
        className="font-bold leading-[1.05] tracking-[-0.015em] mb-6"
        style={{
          color: TEXT_PRIMARY,
          fontSize: "clamp(32px, 2.8vw, 44px)",
          textWrap: "balance",
        } as React.CSSProperties}
      >
        Antes de avançarmos,<br />
        <span style={{ color: GOLD }}>preciso entender</span><br />
        o seu cenário.
      </motion.h1>

      <motion.div
        {...fadeUp(0.13)}
        className="w-8 h-px mb-6"
        style={{ background: GOLD_MUTED }}
      />

      <motion.div
        {...fadeUp(0.16)}
        className="flex flex-col gap-3.5 mb-6"
        style={{ color: TEXT_BODY, fontSize: "15px", lineHeight: "1.62", maxWidth: "520px" }}
      >
        <p>
          A <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>Sessão Estratégica</strong> é um encontro exclusivo para empresários que querem crescer, vender mais e organizar o negócio com método.
        </p>
        <p>
          Vou analisar seu momento atual e mostrar com clareza os{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>erros e oportunidades</strong>{" "}
          que podem estar limitando o seu{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>faturamento</strong>.
        </p>
        <p>
          Para isso, você vai responder uma{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>pré-entrevista rápida</strong>{" "}
          sobre o seu negócio.
        </p>
      </motion.div>

      <motion.p
        {...fadeUp(0.2)}
        className="text-[14px] leading-[1.6] mb-6 pl-4 border-l"
        style={{
          color: "rgba(180,148,60,0.9)",
          borderColor: GOLD_MUTED,
          fontStyle: "italic",
          maxWidth: "480px",
        }}
      >
        Isso garante que a sessão seja <strong style={{ fontWeight: 600 }}>direta, personalizada</strong> e focada em resultado.
      </motion.p>

      <motion.p
        {...fadeUp(0.23)}
        className="text-[13px] mb-7"
        style={{ color: TEXT_FAINT, maxWidth: "460px" }}
      >
        No final, você saberá se faz sentido avançarmos para a sua Sessão Estratégica.
      </motion.p>

      <motion.div {...fadeUp(0.27)} style={{ maxWidth: "340px" }}>
        <CtaButton onStart={onStart} />
      </motion.div>

      <motion.p
        {...fadeUp(0.31)}
        className="text-[10px] tracking-[0.07em] mt-3"
        style={{ color: TEXT_GHOST }}
      >
        Leva menos de 3 minutos&nbsp;&nbsp;·&nbsp;&nbsp;Vagas limitadas
      </motion.p>
    </>
  )
}

/* ─────────────────────────────────────────────────
   Painel direito — desktop only
───────────────────────────────────────────────── */
const pillars = [
  { icon: TrendingUp, label: "Crescimento", desc: "Estratégias para aumentar faturamento com consistência" },
  { icon: Target,     label: "Posicionamento", desc: "Clareza de mercado, cliente ideal e proposta de valor" },
  { icon: Users,      label: "Estruturação", desc: "Processos, equipe e gestão para escalar com controle" },
]

function RightPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
      style={{
        padding: "0 clamp(32px, 4vw, 56px)",
        maxWidth: "380px",
        width: "100%",
        gap: "20px",
      }}
    >
      <Image
        src={LOGO_SRC}
        alt="IL Negócios"
        width={148}
        height={48}
        className="object-contain"
        style={{
          height: "36px",
          width: "auto",
          filter: "brightness(1.18) contrast(1.06) drop-shadow(0 2px 10px rgba(180,148,60,0.2))",
        }}
      />

      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

      <div className="flex flex-col" style={{ gap: "16px" }}>
        {pillars.map(({ icon: Icon, label, desc }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start"
            style={{ gap: "14px" }}
          >
            <div
              className="shrink-0 flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(180,148,60,0.1)",
                border: "1px solid rgba(180,148,60,0.18)",
                marginTop: "2px",
              }}
            >
              <Icon style={{ width: "15px", height: "15px", color: "rgba(180,148,60,0.85)" }} />
            </div>
            <div>
              <p className="text-[13px] font-medium mb-0.5" style={{ color: TEXT_PRIMARY }}>{label}</p>
              <p className="text-[12px] leading-[1.55]" style={{ color: "rgba(240,237,230,0.45)" }}>{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

      <p
        className="text-[10px] font-medium tracking-[0.14em] uppercase"
        style={{ color: GOLD_FAINT }}
      >
        Performance &amp; Resultado
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────
   Botão CTA
───────────────────────────────────────────────── */
function CtaButton({ onStart }: { onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="group w-full flex items-center justify-center gap-2.5 font-medium tracking-[0.01em] transition-all duration-300"
      style={{
        height: "52px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #C9A84C 0%, #B0852A 100%)",
        color: "#0D0A04",
        fontSize: "14px",
        boxShadow: "0 2px 18px rgba(180,148,60,0.24), inset 0 1px 0 rgba(255,255,255,0.14)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)"
        e.currentTarget.style.boxShadow = "0 6px 28px rgba(180,148,60,0.34), inset 0 1px 0 rgba(255,255,255,0.14)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 2px 18px rgba(180,148,60,0.24), inset 0 1px 0 rgba(255,255,255,0.14)"
      }}
    >
      <span>Começar pré-entrevista</span>
      <ArrowRight
        className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        style={{ width: "15px", height: "15px" }}
      />
    </button>
  )
}
