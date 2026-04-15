"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface ProgressBarProps {
  current: number
  total: number
  message?: string
}

export function ProgressBar({ current, total, message }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 w-full max-w-full overflow-hidden">
      <div className="px-3 sm:px-4 py-2.5 sm:py-3.5 max-w-full">
        <div className="max-w-[calc(100%-24px)] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">

          {/* Logo */}
          <div className="flex justify-center mb-2.5">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9445.PNG-N9T7xNmMLXKf0pEjipobXSb0q2Pwdj.png"
              alt="IL Negócios"
              width={110}
              height={36}
              className="h-8 w-auto object-contain brightness-[1.1] contrast-[1.05] opacity-90 drop-shadow-[0_1px_6px_rgba(212,165,0,0.15)]"
            />
          </div>

          {/* Progress message */}
          <AnimatePresence mode="wait">
            <motion.p
              key={message}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm text-muted-foreground mb-2 text-center"
            >
              {message}
            </motion.p>
          </AnimatePresence>

          {/* Progress track */}
          <div className="relative h-1.5 sm:h-2 bg-muted/60 rounded-full overflow-hidden">
            {/* Background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {/* Progress fill */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Current position indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-primary rounded-full shadow-md shadow-primary/30 border-2 border-white"
              initial={{ left: 0 }}
              animate={{ left: `calc(${progress}% - 5px)` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Progress text */}
          <div className="flex items-center justify-between mt-2 sm:mt-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.span 
                key={Math.round(progress)}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs sm:text-sm font-semibold text-foreground tabular-nums"
              >
                {Math.round(progress)}%
              </motion.span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                concluído
              </span>
            </div>
            <motion.span 
              key={current}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] sm:text-xs font-medium text-muted-foreground bg-muted/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md"
            >
              {current} de {total}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  )
}
