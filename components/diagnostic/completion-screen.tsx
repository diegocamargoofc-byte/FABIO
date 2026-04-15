"use client"

import { motion } from "framer-motion"
import { CheckCircle2, MessageCircle, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Answer, Question } from "./diagnostic-flow"

interface CompletionScreenProps {
  onSendWhatsApp: () => void
  answers: Answer[]
  questions: Question[]
}

export function CompletionScreen({ onSendWhatsApp }: CompletionScreenProps) {
  return (
    <div className="h-dvh w-full max-w-full flex flex-col relative overflow-hidden">
      {/* Sophisticated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(34,197,94,0.06),transparent)]" />

      <div className="relative flex-1 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[calc(100%-24px)] sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
        >
          {/* Main card */}
          <div className="relative bg-card rounded-2xl sm:rounded-3xl shadow-xl shadow-foreground/[0.03] border border-border/60 p-4 sm:p-7 md:p-10 lg:p-12 backdrop-blur-sm overflow-hidden max-w-full">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/50 to-transparent opacity-60 pointer-events-none" />
            {/* Success accent gradient */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            
            <div className="relative text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="mb-5 sm:mb-6 flex justify-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/25">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  {/* Glow ring */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ delay: 0.5, duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
                    className="absolute inset-0 rounded-full border-2 border-green-500/30"
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-2 sm:mb-3"
              >
                Pré-análise concluída
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6"
              >
                Com base nas suas respostas, já conseguimos ter uma visão inicial do seu cenário.
              </motion.p>

              {/* Value proposition */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-5 sm:mb-7 border border-border/40 text-left"
              >
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  Se o seu perfil estiver alinhado, você poderá avançar para a{" "}
                  <span className="font-semibold">Sessão Estratégica</span>, onde será apresentado um plano claro para{" "}
                  <span className="font-semibold">crescimento, estrutura e escala</span> do seu negócio.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-3"
              >
                <Button
                  onClick={onSendWhatsApp}
                  className="w-full h-12 sm:h-14 md:h-16 text-[13px] sm:text-base md:text-lg font-semibold rounded-xl gap-2 bg-[#25D366] hover:bg-[#1fba59] text-white shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 group px-3 sm:px-6"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span className="truncate">Falar com especialista no WhatsApp</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                {/* Micro reinforcement */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-muted-foreground"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Leva menos de 1 minuto</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center text-[10px] sm:text-xs text-muted-foreground/60 mt-3 sm:mt-5 tracking-wide"
          >
            Suas respostas serão enviadas automaticamente pelo WhatsApp
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
