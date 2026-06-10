'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useModeContext } from '@/components/providers/ModeProvider'
import { aboutData } from '@/lib/placeholder-data'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { slideInLeft, slideInRight } from '@/styles/animations'
import { cn } from '@/lib/utils'

export function AboutSection() {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'
  const content = isPhotography ? aboutData.photography : aboutData.yoga

  const mainText = isPhotography
    ? content.artisticStyle ?? content.trajectory
    : content.philosophy ?? content.trajectory

  const bg = isPhotography ? '#1A1815' : '#F7F3EE'
  const textPrimary = isPhotography ? '#F0EAE0' : '#2C2420'
  const textMuted = isPhotography ? '#9E948A' : '#8B7B6B'
  const textBody = isPhotography ? '#C4B09A' : '#6B5740'
  const accent = isPhotography ? '#C4A882' : '#6B7C5C'

  return (
    <section
      id="sobre-mi"
      className="section-padding transition-colors duration-700"
      style={{ backgroundColor: bg }}
    >
      <div className="container-max">
        <ScrollReveal className="mb-12">
          <span className="label-text" style={{ color: textMuted }}>Sobre mí</span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">

          {/* Imagen — pequeña, izquierda */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative flex-shrink-0"
          >
            <div
              className="overflow-hidden rounded-2xl w-full"
              style={{
                aspectRatio: '3/4',
                maxWidth: 320,
                boxShadow: isPhotography
                  ? '0 20px 60px rgba(0,0,0,0.40)'
                  : '0 20px 60px rgba(44,36,32,0.12)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aboutData[mode].profileImage ?? aboutData.profileImage}
                alt="Joana Gargallo"
                className="w-full h-full object-cover"
              />
            </div>

          </motion.div>

          {/* Texto — derecha */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-6 md:pt-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`about-${mode}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col gap-5"
              >
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontWeight: 300,
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    color: textPrimary,
                  }}
                >
                  {isPhotography
                    ? 'La mirada que nace\nde la práctica'
                    : 'El yoga como\ncamino de vida'}
                </h2>

                <p
                  className="font-sans font-light text-base leading-relaxed"
                  style={{ color: textBody, fontStyle: 'italic' }}
                >
                  &ldquo;{mainText}&rdquo;
                </p>

                <p
                  className="font-sans font-light text-sm leading-relaxed"
                  style={{ color: textMuted }}
                >
                  {content.trajectory}
                </p>

                {/* CTA suave */}
                <button
                  onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="self-start font-sans font-medium text-sm transition-all duration-300 hover:opacity-70"
                  style={{
                    color: accent,
                    letterSpacing: '0.05em',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Contactar →
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
