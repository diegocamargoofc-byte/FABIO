import { agent, tool, z } from "@21st-sdk/agent"

export default agent({
  model: "claude-sonnet-4-6",
  runtime: "claude-code",
  systemPrompt: `Você é um especialista em diagnóstico estratégico de negócios da IL Negócios.
Sua função é analisar as respostas da pré-entrevista de um empresário e gerar um diagnóstico
personalizado, identificando o estágio do negócio, os principais gargalos e as oportunidades
de crescimento. Seja direto, profissional e perspicaz. Escreva sempre em português do Brasil.`,
  tools: {
    analyzeDiagnostic: tool({
      description: "Analisa as respostas do diagnóstico estratégico e gera um relatório personalizado",
      inputSchema: z.object({
        answers: z.array(
          z.object({
            questionId: z.number(),
            question: z.string(),
            value: z.string(),
            extraValue: z.string().optional(),
          })
        ),
      }),
      execute: async ({ answers }) => {
        const summary = answers
          .map((a) => `${a.question}: ${a.value}${a.extraValue ? ` (${a.extraValue})` : ""}`)
          .join("\n")

        return {
          content: [
            {
              type: "text",
              text: `Diagnóstico baseado nas seguintes respostas:\n\n${summary}`,
            },
          ],
        }
      },
    }),
  },
  maxTurns: 3,
})
