import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import diagnosticAgent from "@/agent"

const MOCK_RESULT: DiagnosticResult = {
  stage: "Negócio em crescimento com gargalo operacional",
  bottleneck:
    "A principal limitação identificada é a ausência de processos comerciais definidos, o que impede a previsibilidade de receita e dificulta a escala sem dependência direta do dono.",
  opportunities: [
    "Implementar um processo de vendas estruturado para aumentar a taxa de conversão de leads",
    "Criar um programa de fidelização para maximizar o retorno de clientes já conquistados",
    "Delegar operações recorrentes para liberar seu tempo para decisões estratégicas de crescimento",
  ],
  recommendation:
    "Seu negócio tem fundamento sólido e potencial real de escala, mas está operando abaixo da capacidade por falta de estrutura. Na Sessão Estratégica, vamos mapear exatamente onde estão os vazamentos de receita e montar um plano de ação com prioridades claras. O próximo passo é dar estrutura ao que já funciona para crescer com controle.",
  score: 74,
  label: "Alto Potencial",
}

const USE_MOCK = !process.env.ANTHROPIC_API_KEY

const client = USE_MOCK ? null : new Anthropic()

export interface DiagnosticAnswer {
  questionId: number
  question: string
  value: string
  extraValue?: string
}

export interface DiagnosticResult {
  stage: string
  bottleneck: string
  opportunities: string[]
  recommendation: string
  score: number
  label: string
}

export async function POST(req: NextRequest) {
  try {
    const { answers }: { answers: DiagnosticAnswer[] } = await req.json()

    if (!answers || answers.length === 0) {
      return NextResponse.json({ error: "Respostas não fornecidas" }, { status: 400 })
    }

    const answersText = answers
      .map((a) => `- ${a.question}: **${a.value}**${a.extraValue ? ` (detalhes: ${a.extraValue})` : ""}`)
      .join("\n")

    const message = await client.messages.create({
      model: diagnosticAgent.model,
      max_tokens: 1024,
      system: typeof diagnosticAgent.systemPrompt === "string"
        ? diagnosticAgent.systemPrompt
        : "Você é um especialista em diagnóstico estratégico de negócios da IL Negócios. Escreva sempre em português do Brasil.",
      messages: [
        {
          role: "user",
          content: `Analise as respostas da pré-entrevista abaixo e retorne um JSON com o diagnóstico estratégico.

RESPOSTAS:
${answersText}

Retorne APENAS um JSON válido (sem markdown, sem explicações) com exatamente esta estrutura:
{
  "stage": "string curta descrevendo o estágio atual do negócio (ex: 'Negócio em crescimento com gargalo operacional')",
  "bottleneck": "string descrevendo o principal gargalo identificado",
  "opportunities": ["oportunidade 1", "oportunidade 2", "oportunidade 3"],
  "recommendation": "parágrafo de 2-3 frases com recomendação personalizada para a Sessão Estratégica",
  "score": número de 1 a 100 representando o potencial de crescimento identificado,
  "label": "string curta de classificação (ex: 'Alto Potencial', 'Em Transição', 'Atenção Necessária')"
}`,
        },
      ],
    })

    const rawText = message.content[0].type === "text" ? message.content[0].text : ""
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Resposta da IA não contém JSON válido")
    }

    const result: DiagnosticResult = JSON.parse(jsonMatch[0])

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Erro na análise:", error)
    return NextResponse.json(
      { error: "Falha ao gerar diagnóstico" },
      { status: 500 }
    )
  }
}
