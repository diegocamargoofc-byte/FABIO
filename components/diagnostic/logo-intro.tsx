"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface LogoIntroProps {
  onComplete: () => void
}

export function LogoIntro({ onComplete }: LogoIntroProps) {
  const [fadeOut, setFadeOut] = useState(false)
  const doneRef = useRef(false)

  useEffect(() => {
    // Logo visível ~1.4s — hold até 3.8s — fade out 1.3s → done ~5.1s
    const t1 = setTimeout(() => setFadeOut(true), 3800)
    const t2 = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true
        onComplete()
      }
    }, 5600) // fallback

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (fadeOut && !doneRef.current) {
          doneRef.current = true
          onComplete()
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#09090E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Grain premium */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.016,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "210px 210px",
          pointerEvents: "none",
        }}
      />

      {/* Vinheta cinematográfica */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 42%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Glow dourado central — respira sob o logo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(180,148,60,0.07), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Logo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <Image
          src="/logo-il-negocios.png"
          alt="IL Negócios — Performance & Resultado"
          width={5000}
          height={3138}
          priority
          style={{
            width: "min(78vw, 520px)",
            height: "auto",
            filter: "drop-shadow(0 0 40px rgba(180,148,60,0.14)) drop-shadow(0 2px 20px rgba(0,0,0,0.6))",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
