"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface WelcomeScreenProps {
  onStart: () => void
}

const LOGO_SRC     = "/logo-il-negocios.png"
const GOLD         = "rgba(180,148,60,1)"
const GOLD_DIM     = "rgba(180,148,60,0.72)"
const GOLD_MUTED   = "rgba(180,148,60,0.28)"
const TEXT_PRIMARY = "#F0EDE6"
const TEXT_BODY    = "rgba(240,237,230,0.56)"
const TEXT_GHOST   = "rgba(240,237,230,0.14)"
const BG           = "#09090E"
const SERIF        = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0, distance = 18) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease, delay },
})

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div
      className="w-full max-w-full overflow-hidden flex flex-col"
      style={{ height: "100dvh", background: BG, boxSizing: "border-box" }}
    >
      {/* ── Layers de fundo ── */}

      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "210px 210px",
        }}
      />

      {/* Radial glow — topo esquerdo */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-8%", left: "-4%",
          width: "60vw", height: "60vw",
          maxWidth: "760px", maxHeight: "760px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,148,60,0.048) 0%, transparent 65%)",
        }}
      />

      {/* Radial glow — inferior direito */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-12%", right: "-4%",
          width: "44vw", height: "44vw",
          maxWidth: "560px", maxHeight: "560px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,148,60,0.026) 0%, transparent 65%)",
        }}
      />

      {/* Linha dourada superior */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(180,148,60,0.38) 38%, rgba(180,148,60,0.38) 62%, transparent 95%)" }}
      />

      {/* ── HEADER ── */}
      <header
        className="relative z-10 shrink-0 w-full flex items-center"
        style={{
          height: "64px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          paddingLeft: "clamp(20px, 5vw, 60px)",
          paddingRight: "clamp(20px, 5vw, 60px)",
        }}
      >
        {/* Mobile — logo centralizada */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.04 }}
          className="lg:hidden absolute left-0 right-0 flex justify-center pointer-events-none"
        >
          <Image
            src={LOGO_SRC}
            alt="IL Negócios — Performance & Resultado"
            width={130} height={42} priority
            className="object-contain"
            style={{
              height: "24px", width: "auto",
              filter: "brightness(1.18) contrast(1.06) drop-shadow(0 1px 10px rgba(180,148,60,0.22))",
            }}
          />
        </motion.div>

        {/* Desktop — logo à esquerda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.04 }}
          className="hidden lg:flex"
        >
          <Image
            src={LOGO_SRC}
            alt="IL Negócios — Performance & Resultado"
            width={180} height={58} priority
            className="object-contain"
            style={{
              height: "36px", width: "auto",
              filter: "brightness(1.18) contrast(1.06) drop-shadow(0 1px 14px rgba(180,148,60,0.28))",
            }}
          />
        </motion.div>
      </header>

      {/* ── MAIN ── */}
      <main
        className="relative z-10 flex-1 flex items-center justify-center overflow-hidden"
        style={{ boxSizing: "border-box" }}
      >
        {/* ─ Mobile ─ */}
        <div
          className="lg:hidden w-full flex flex-col items-center"
          style={{
            padding: "clamp(20px, 3vh, 40px) 28px",
            maxWidth: "460px",
            marginInline: "auto",
            boxSizing: "border-box",
          }}
        >
          <MobileContent onStart={onStart} />
        </div>

        {/* ─ Desktop ─ */}
        <div className="hidden lg:flex w-full h-full items-stretch">

          {/* Left column */}
          <div
            className="flex-1 min-w-0 flex items-center"
            style={{ padding: "0 clamp(48px, 5.5vw, 96px)" }}
          >
            <div style={{ width: "100%", maxWidth: "680px" }}>
              <DesktopContent onStart={onStart} />
            </div>
          </div>

          {/* Glow central — conexão visual entre colunas */}
          <div
            className="absolute pointer-events-none hidden lg:block"
            style={{
              top: "50%",
              right: "clamp(300px, 30vw, 440px)",
              transform: "translate(50%, -50%)",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(180,148,60,0.055) 0%, rgba(180,148,60,0.012) 45%, transparent 72%)",
              zIndex: 1,
            }}
          />

          {/* Right accent panel */}
          <div
            style={{
              width: "clamp(300px, 30vw, 440px)",
              flexShrink: 0,
              borderLeft: "1px solid rgba(180,148,60,0.12)",
              background: "linear-gradient(160deg, rgba(180,148,60,0.04) 0%, rgba(180,148,60,0.01) 50%, transparent 100%)",
              display: "flex",
              alignItems: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <RightPanel />
          </div>

        </div>
      </main>
    </div>
  )
}

/* ── MOBILE ─────────────────────────────────────────────────── */
function MobileContent({ onStart }: { onStart: () => void }) {
  return (
    <>
      {/* Eyebrow */}
      <motion.p
        {...fadeUp(0.07)}
        style={{
          fontSize: "9px",
          fontWeight: 500,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: GOLD_DIM,
          marginBottom: "clamp(12px, 2.5vh, 28px)",
          width: "100%",
          textAlign: "center",
        }}
      >
        Sessão Estratégica&nbsp;·&nbsp;IL Negócios
      </motion.p>

      {/* Headline */}
      <motion.div
        style={{ width: "100%", marginBottom: "clamp(14px, 3vh, 32px)", textAlign: "center" }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.12 }}
      >
        <h1
          style={{
            fontFamily: SERIF,
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
          } as React.CSSProperties}
        >
          <span
            style={{
              display: "block",
              fontSize: "clamp(28px, min(7.5vw, 5.5vh), 42px)",
              fontWeight: 400,
              background: "linear-gradient(135deg, #E8E2D8 0%, #C8C0B0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Antes de avançarmos,
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(32px, min(9vw, 6.8vh), 50px)",
              fontWeight: 600,
              fontStyle: "italic",
              background: "linear-gradient(135deg, #D4AC50 0%, #F0CE70 48%, #C9963C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 22px rgba(180,148,60,0.28))",
            }}
          >
            preciso entender
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(24px, min(6.5vw, 4.8vh), 38px)",
              fontWeight: 400,
              background: "linear-gradient(135deg, #E8E2D8 0%, #C8C0B0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            o seu cenário.
          </span>
        </h1>
      </motion.div>

      {/* Divisor editorial */}
      <motion.div
        {...fadeUp(0.2)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "clamp(10px, 2vh, 24px)",
          maxWidth: "280px",
          marginInline: "auto",
          width: "100%",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(180,148,60,0.2), transparent)" }} />
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: GOLD_MUTED }} />
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(180,148,60,0.2), transparent)" }} />
      </motion.div>

      {/* Body */}
      <motion.div
        {...fadeUp(0.24)}
        style={{
          color: TEXT_BODY,
          fontSize: "13.5px",
          lineHeight: "1.72",
          maxWidth: "390px",
          marginInline: "auto",
          width: "100%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(8px, 1.5vh, 14px)",
          marginBottom: "clamp(10px, 2vh, 22px)",
          letterSpacing: "0.01em",
        }}
      >
        <p>
          A <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>Sessão Estratégica</strong> é um encontro exclusivo para empresários que querem crescer, vender mais e organizar o negócio com método.
        </p>
        <p>
          Vou analisar o seu momento atual e mostrar, com clareza, os{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>erros e oportunidades</strong>{" "}
          que podem estar limitando o seu <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>faturamento</strong>.
        </p>
        <p>
          Para isso, você responderá uma{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>pré-entrevista rápida</strong>{" "}
          sobre o seu negócio.
        </p>
      </motion.div>

      {/* Quote */}
      <motion.p
        {...fadeUp(0.27)}
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "15px",
          lineHeight: "1.62",
          color: "rgba(180,148,60,0.78)",
          borderLeft: `2px solid ${GOLD_MUTED}`,
          paddingLeft: "14px",
          maxWidth: "380px",
          marginInline: "auto",
          width: "100%",
          textAlign: "left",
          marginBottom: "clamp(14px, 2.8vh, 32px)",
        }}
      >
        Isso garante que a sessão seja{" "}
        <strong style={{ fontWeight: 600 }}>direta, personalizada</strong>{" "}
        e focada em resultados.
      </motion.p>

      {/* CTA */}
      <motion.div
        {...fadeUp(0.31)}
        style={{ width: "100%", maxWidth: "360px", marginInline: "auto", marginBottom: "clamp(6px, 1.2vh, 12px)" }}
      >
        <CtaButton onStart={onStart} />
      </motion.div>

      <motion.p {...fadeUp(0.35)} style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: TEXT_GHOST }}>
        Leva menos de 3 minutos&nbsp;&nbsp;·&nbsp;&nbsp;Vagas limitadas
      </motion.p>
    </>
  )
}

/* ── DESKTOP ──────────────────────────────────────────────────── */
function DesktopContent({ onStart }: { onStart: () => void }) {
  return (
    <>
      {/* Eyebrow */}
      <motion.p
        {...fadeUp(0.07)}
        style={{
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: GOLD_DIM,
          marginBottom: "clamp(20px, min(4vw, 4vh), 48px)",
        }}
      >
        Sessão Estratégica&nbsp;·&nbsp;IL Negócios
      </motion.p>

      {/* Headline — clamp usa min(vw, vh) para nunca vazar em telas baixas */}
      <motion.div
        style={{ marginBottom: "clamp(20px, min(4.5vw, 4.5vh), 52px)" }}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease, delay: 0.12 }}
      >
        <h1
          style={{
            fontFamily: SERIF,
            lineHeight: 1.03,
            letterSpacing: "-0.028em",
          } as React.CSSProperties}
        >
          {/* Line 1 */}
          <span
            style={{
              display: "block",
              fontSize: "clamp(44px, min(5.8vw, 7.5vh), 104px)",
              fontWeight: 400,
              background: "linear-gradient(135deg, #F8F4EC 0%, #DDD5C0 60%, #C4BBA8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Antes de avançarmos,
          </span>
          {/* Line 2 — dominant */}
          <span
            style={{
              display: "block",
              fontSize: "clamp(52px, min(7.2vw, 9.5vh), 128px)",
              fontWeight: 600,
              fontStyle: "italic",
              background: "linear-gradient(135deg, #D4AC50 0%, #F2D06A 44%, #C08030 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 48px rgba(180,148,60,0.42))",
            }}
          >
            preciso entender
          </span>
          {/* Line 3 */}
          <span
            style={{
              display: "block",
              fontSize: "clamp(38px, min(4.9vw, 6.5vh), 88px)",
              fontWeight: 400,
              background: "linear-gradient(135deg, #F8F4EC 0%, #DDD5C0 60%, #C4BBA8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            o seu cenário.
          </span>
        </h1>
      </motion.div>

      {/* Divisor editorial */}
      <motion.div
        {...fadeUp(0.21)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "clamp(14px, min(3.5vw, 3vh), 40px)",
          maxWidth: "clamp(320px, 40vw, 560px)",
        }}
      >
        <div style={{ width: "36px", height: "1px", background: GOLD_MUTED }} />
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
      </motion.div>

      {/* Body */}
      <motion.div
        {...fadeUp(0.25)}
        style={{
          color: TEXT_BODY,
          fontSize: "clamp(15px, min(1.2vw, 1.8vh), 19px)",
          lineHeight: "1.76",
          maxWidth: "clamp(480px, 50vw, 640px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(8px, min(1.2vw, 1.2vh), 18px)",
          marginBottom: "clamp(14px, min(3vw, 2.5vh), 40px)",
          letterSpacing: "0.012em",
        }}
      >
        <p>
          A <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>Sessão Estratégica</strong> é um encontro exclusivo para empresários que querem crescer, vender mais e organizar o negócio com método.
        </p>
        <p>
          Vou analisar o seu momento atual e mostrar, com clareza, os{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>erros e oportunidades</strong>{" "}
          que podem estar limitando o seu{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>faturamento</strong>.
        </p>
        <p>
          Para isso, você responderá uma{" "}
          <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>pré-entrevista rápida</strong>{" "}
          sobre o seu negócio.
        </p>
      </motion.div>

      {/* Quote */}
      <motion.p
        {...fadeUp(0.29)}
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "clamp(17px, min(1.55vw, 2.4vh), 24px)",
          lineHeight: "1.58",
          color: "rgba(180,148,60,0.82)",
          borderLeft: `2px solid ${GOLD_MUTED}`,
          paddingLeft: "clamp(16px, 1.5vw, 24px)",
          maxWidth: "clamp(460px, 48vw, 620px)",
          marginBottom: "clamp(18px, min(3.5vw, 3.5vh), 48px)",
        }}
      >
        Isso garante que a sessão seja{" "}
        <strong style={{ fontWeight: 600 }}>direta, personalizada</strong>{" "}
        e focada em resultados.
      </motion.p>

      {/* CTA */}
      <motion.div {...fadeUp(0.33)} style={{ maxWidth: "clamp(330px, 30vw, 420px)", marginBottom: "clamp(6px, min(1.5vw, 1.5vh), 18px)" }}>
        <CtaButton onStart={onStart} />
      </motion.div>

      <motion.p {...fadeUp(0.37)} style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: TEXT_GHOST }}>
        Leva menos de 3 minutos&nbsp;&nbsp;·&nbsp;&nbsp;Vagas limitadas
      </motion.p>
    </>
  )
}

/* ── RIGHT PANEL — pilares editoriais numerados ──────────────── */
const pillars = [
  { num: "01", label: "Crescimento",    desc: "Estratégias para aumentar faturamento com consistência e previsibilidade" },
  { num: "02", label: "Posicionamento", desc: "Clareza de mercado, cliente ideal e proposta de valor diferenciada" },
  { num: "03", label: "Estruturação",   desc: "Processos, equipe e gestão para escalar com controle e método" },
]

function RightPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: 0.22, ease }}
      style={{
        padding: "clamp(40px, 5vh, 72px) clamp(32px, 3.2vw, 52px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.18 }}
        style={{ marginBottom: "clamp(24px, 3.5vh, 44px)" }}
      >
        <Image
          src={LOGO_SRC}
          alt="IL Negócios"
          width={220} height={72}
          className="object-contain object-left"
          style={{
            height: "clamp(44px, 5.5vh, 64px)", width: "auto",
            filter: "brightness(1.22) contrast(1.08) drop-shadow(0 2px 20px rgba(180,148,60,0.38))",
          }}
        />
      </motion.div>

      {/* Separador */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, rgba(180,148,60,0.38), rgba(180,148,60,0.08), transparent)",
          marginBottom: "clamp(24px, 3.5vh, 44px)",
        }}
      />

      {/* Pilares em cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.8vh, 20px)" }}>
        {pillars.map(({ num, label, desc }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.33 + i * 0.1, duration: 0.65, ease }}
            style={{
              border: "1px solid rgba(180,148,60,0.22)",
              borderRadius: "6px",
              background: "linear-gradient(135deg, rgba(180,148,60,0.09) 0%, rgba(180,148,60,0.03) 100%)",
              padding: "clamp(14px, 2vh, 22px) clamp(16px, 1.8vw, 24px)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 1px 18px rgba(180,148,60,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Accent corner */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "3px",
                height: "100%",
                background: "linear-gradient(180deg, rgba(180,148,60,0.55) 0%, rgba(180,148,60,0.08) 100%)",
                borderRadius: "6px 0 0 6px",
              }}
            />
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px", paddingLeft: "12px" }}>
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgba(180,148,60,0.35)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  minWidth: "38px",
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontSize: "clamp(11px, 1vw, 13px)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, #F5EFE0 0%, #E8D99A 38%, #F0E6C4 62%, #C8B878 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 8px rgba(180,148,60,0.32))",
                }}
              >
                {label}
              </span>
            </div>
            <p style={{
              fontSize: "clamp(11.5px, 0.95vw, 13.5px)",
              lineHeight: "1.65",
              color: "rgba(240,237,230,0.68)",
              paddingLeft: "12px",
            }}>
              {desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Rodapé */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, rgba(180,148,60,0.22), rgba(180,148,60,0.05), transparent)",
          marginTop: "clamp(24px, 3vh, 40px)",
          marginBottom: "16px",
        }}
      />

      <p
        style={{
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(180,148,60,0.45)",
        }}
      >
        Performance &amp; Resultado
      </p>
    </motion.div>
  )
}

/* ── CTA BUTTON ──────────────────────────────────────────────── */
function CtaButton({ onStart }: { onStart: () => void }) {
  return (
    <motion.button
      onClick={onStart}
      className="group w-full flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden"
      style={{
        height: "54px",
        borderRadius: "4px",
        background: "linear-gradient(135deg, #D4AC50 0%, #C49030 50%, #A87020 100%)",
        color: "#090700",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        border: "none",
        outline: "none",
        boxShadow: "0 1px 0 rgba(255,255,255,0.18) inset, 0 4px 24px rgba(180,148,60,0.26), 0 1px 4px rgba(0,0,0,0.55)",
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 1px 0 rgba(255,255,255,0.18) inset, 0 14px 44px rgba(180,148,60,0.38), 0 2px 8px rgba(0,0,0,0.55)",
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ y: 0, scale: 0.985, transition: { duration: 0.12 } }}
    >
      {/* Shine sweep */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "-100% 0",
        }}
        whileHover={{ backgroundPosition: "200% 0", transition: { duration: 0.55, ease: "linear" } }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>Começar</span>
      <motion.span
        style={{ position: "relative", zIndex: 1, display: "flex" }}
        initial={{ x: 0 }}
        whileHover={{ x: 4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
      >
        <ArrowRight style={{ width: "14px", height: "14px" }} />
      </motion.span>
    </motion.button>
  )
}
