"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface ProgressBarProps {
  current: number
  total: number
  message?: string
}

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div
      className="sticky top-0 z-10 backdrop-blur-md w-full max-w-full overflow-hidden"
      style={{
        background: "rgba(9,9,14,0.90)",
        borderBottom: "1px solid rgba(255,255,255,0.055)",
      }}
    >
      {/* Linha dourada no topo */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(180,148,60,0.28), transparent)" }}
      />

      <div style={{ padding: "10px 24px 0" }}>
        {/* Logo centralizada */}
        <div className="flex justify-center" style={{ marginBottom: "10px" }}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9445.PNG-N9T7xNmMLXKf0pEjipobXSb0q2Pwdj.png"
            alt="IL Negócios"
            width={110}
            height={36}
            style={{
              height: "20px",
              width: "auto",
              objectFit: "contain",
              filter: "brightness(1.12) contrast(1.06) drop-shadow(0 1px 6px rgba(180,148,60,0.16))",
              opacity: 0.88,
            }}
          />
        </div>

        {/* Linha de progresso */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{ height: "1.5px", background: "rgba(255,255,255,0.06)" }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: "linear-gradient(90deg, #C9A84C 0%, #B4943C 100%)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Contador de etapas */}
        <div className="flex justify-end" style={{ marginTop: "6px", marginBottom: "8px" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "11px",
                color: "rgba(180,148,60,0.42)",
                letterSpacing: "0.04em",
              }}
            >
              {String(current).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
