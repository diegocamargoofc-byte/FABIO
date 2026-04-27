import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Diagnóstico Estratégico de Crescimento',
  description: 'Identifique o momento atual da sua empresa, gargalos e potencial de crescimento.',
  metadataBase: new URL('https://www.ilnegocios.com.br'),
  openGraph: {
    title: 'Diagnóstico Estratégico de Crescimento',
    description: 'Identifique o momento atual da sua empresa, gargalos e potencial de crescimento.',
    url: 'https://www.ilnegocios.com.br/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IL Negócios — Performance & Resultado',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico Estratégico de Crescimento',
    description: 'Identifique o momento atual da sua empresa, gargalos e potencial de crescimento.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
    ],
    apple: '/og-image.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`dark ${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
