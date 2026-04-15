"use client"

import { motion } from "framer-motion"
import { Search, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HowItWorksProps {
  onStart: () => void
}

const steps = [
  {
    number: "01",
    title: "Pré-entrevista rápida",
    description: "Você responde algumas perguntas objetivas sobre seu negócio. Leva menos de 3 minutos.",
  },
  {
    number: "02",
    title: "Análise do seu momento",
    description: "Avaliamos seu perfil, identificamos os principais gargalos e oportunidades do seu negócio.",
  },
  {
    number: "03",
    title: "Sessão personalizada",
    description: "Se o perfil for compatível, agendamos sua Sessão Estratégica com foco total no seu resultado.",
  },
]

export function HowItWorks({ onStart }: HowItWorksProps) {
  return (
    <section className="w-full bg-neutral-950 px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl lg:max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-amber-400/80 uppercase mb-3">
            Entenda antes de começar
          </p>
          <h2 className="text-[26px] sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-5">
            Como funciona a{" "}
            <span className="text-amber-400">Sessão Estratégica?</span>
          </h2>
          <p className="text-[14px] sm:text-base text-white/60 leading-relaxed max-w-2xl">
            A Sessão Estratégica é um encontro exclusivo para empresários que querem crescer, vender mais e organizar o negócio com método.
          </p>
        </motion.div>

        {/* Two text blocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-12 sm:mb-16"
        >
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sm:p-6">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
              <Search className="w-4 h-4 text-amber-400/80" />
            </div>
            <p className="text-[13px] sm:text-[14px] text-white/75 leading-relaxed">
              Durante a sessão, analisamos o seu momento atual e identificamos com clareza os{" "}
              <span className="text-white font-medium">erros e oportunidades</span>{" "}
              que podem estar travando seu faturamento.
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sm:p-6">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
              <Target className="w-4 h-4 text-amber-400/80" />
            </div>
            <p className="text-[13px] sm:text-[14px] text-white/75 leading-relaxed">
              A pré-entrevista garante que a sessão seja{" "}
              <span className="text-white font-medium">direta, personalizada e focada em resultado</span>{" "}
              — sem perder tempo com quem não está pronto para crescer.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-3 sm:space-y-4 mb-12 sm:mb-14">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 sm:gap-5"
            >
              {/* Number + connector */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-amber-400">{step.number}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px h-6 sm:h-8 bg-white/10 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="pb-2 pt-1">
                <p className="text-[13px] sm:text-[14px] font-semibold text-white mb-1">{step.title}</p>
                <p className="text-[12px] sm:text-[13px] text-white/50 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-3"
        >
          <Button
            onClick={onStart}
            className="w-full sm:w-auto sm:px-8 h-12 sm:h-14 text-[14px] sm:text-[15px] font-bold rounded-xl gap-2 group bg-amber-400 hover:bg-amber-300 text-neutral-900 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 transition-all duration-300"
            size="lg"
          >
            <span className="truncate">Quero aplicar para a Sessão Estratégica</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <p className="text-[11px] text-white/35">
            Leva menos de 3 minutos • Vagas limitadas para análise
          </p>
        </motion.div>

      </div>
    </section>
  )
}
