"use client"

import { motion } from "framer-motion"
import type React from "react"
import { type HTMLAttributes, useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  beamOpacity?: number
  gridColor?: string
}

const Beam = ({
  width,
  x,
  delay,
  duration,
  hue,
  opacity,
}: {
  width: string | number
  x: string | number
  delay: number
  duration: number
  hue: number
  opacity: number
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ar = useMemo(() => Math.floor(Math.random() * 8) + 4, [])

  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${ar}`,
          "--background": `linear-gradient(hsl(${hue} 48% 46% / ${opacity}), transparent)`,
        } as React.CSSProperties
      }
      className="absolute left-[var(--x)] top-0 [aspect-ratio:1/var(--aspect-ratio)] [background:var(--background)] [width:var(--width)]"
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

const gridFaceClass =
  "[transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax]"

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 140,
  className,
  beamsPerSide = 2,
  beamSize = 7,
  beamDelayMax = 6,
  beamDelayMin = 0.5,
  beamDuration = 7,
  beamOpacity = 0.45,
  gridColor = "rgba(180,148,60,0.065)",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      // Gold–amber palette: hue 36–58
      const hue = Math.floor(Math.random() * 22) + 36
      beams.push({ x, delay, hue })
    }
    return beams
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  const topBeams    = useMemo(() => generateBeams(), [generateBeams])
  const rightBeams  = useMemo(() => generateBeams(), [generateBeams])
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams])
  const leftBeams   = useMemo(() => generateBeams(), [generateBeams])

  const renderBeams = (beams: ReturnType<typeof generateBeams>, prefix: string) =>
    beams.map((b, i) => (
      <Beam
        key={`${prefix}-${i}`}
        width={`${beamSize}%`}
        x={`${b.x * beamSize}%`}
        delay={b.delay}
        duration={beamDuration}
        hue={b.hue}
        opacity={beamOpacity}
      />
    ))

  return (
    <div className={cn("relative", className)} {...props}>
      {/* ── 3-D perspective stage ── */}
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": gridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
      >
        {/* TOP floor */}
        <div className={`absolute ${gridFaceClass} [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]`}>
          {renderBeams(topBeams, "top")}
        </div>
        {/* BOTTOM floor */}
        <div className={`absolute top-full ${gridFaceClass} [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]`}>
          {renderBeams(bottomBeams, "bottom")}
        </div>
        {/* LEFT wall */}
        <div className={`absolute left-0 top-0 ${gridFaceClass} [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]`}>
          {renderBeams(leftBeams, "left")}
        </div>
        {/* RIGHT wall */}
        <div className={`absolute right-0 top-0 ${gridFaceClass} [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)]`}>
          {renderBeams(rightBeams, "right")}
        </div>
      </div>

      {/* Children rendered above the 3D stage */}
      {children != null && <div className="relative">{children}</div>}
    </div>
  )
}
