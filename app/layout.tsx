import type { Metadata } from 'next'
import './globals.css'
import { ModeProvider } from '@/components/providers/ModeProvider'

export const metadata: Metadata = {
  title: 'Joana Gargallo — Profesora de Yoga · Fotógrafa',
  description:
    'Joana Gargallo — Profesora de Yoga certificada y fotógrafa en Puerto de Sagunto (Valencia). Clases grupales, privadas y talleres. Fotografía de naturaleza, retrato y marca personal.',
  keywords: ['yoga', 'profesora yoga', 'Puerto de Sagunto', 'Valencia', 'fotografía', 'clases yoga'],
  openGraph: {
    title: 'Joana Gargallo — Profesora de Yoga · Fotógrafa',
    description: 'Clases de yoga en Puerto de Sagunto y fotografía de naturaleza y retrato.',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full antialiased">
        <ModeProvider>{children}</ModeProvider>
      </body>
    </html>
  )
}
