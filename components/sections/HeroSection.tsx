'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ChevronRight, ChevronLeft } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { heroData } from '@/lib/placeholder-data'
import { ease } from '@/styles/animations'
import { type Mode } from '@/types'

export function HeroSection() {
  const { mode, setMode } = useModeContext()
  const content = heroData[mode]
  const isPhotography = mode === 'photography'

  const handleScrollDown = () => {
    document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleToggle = () => {
    setMode(isPhotography ? 'yoga' : 'photography')
  }

  const toggleLabel = isPhotography ? 'Profesora de Yoga' : 'Fotografía'

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] overflow-hidden">

      {/* Background */}
      <AnimatePresence initial={false}>
        <motion.div
          key={content.backgroundImage}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.backgroundImage} alt="" className="w-full h-full object-cover" loading="eager" />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <motion.div
        animate={{
          background: isPhotography
            ? 'linear-gradient(120deg, rgba(26,24,21,0.75) 0%, rgba(26,24,21,0.25) 60%, rgba(26,24,21,0.55) 100%)'
            : 'linear-gradient(120deg, rgba(30,22,16,0.72) 0%, rgba(30,22,16,0.18) 60%, rgba(30,22,16,0.50) 100%)',
        }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      />

      {/* Layout */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Spacer navbar */}
        <div className="h-20 flex-shrink-0" />

        {/* Zona principal — nombre izq + toggle centro-dcha */}
        <div className="flex-1 flex items-start px-6 sm:px-10 pt-6 sm:pt-8">

          {/* Izquierda — nombre + subtítulo + disponible */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="flex flex-col gap-3 flex-1"
          >
            <h1
              className="text-white leading-none"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(3rem, 9vw, 7rem)',
                letterSpacing: '-0.02em',
              }}
            >
              JOANA<br />GARGALLO
            </h1>

            <div className="flex flex-col gap-1 mt-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`sub-${mode}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="text-white/55 font-sans font-light"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                >
                  {isPhotography ? 'Fotógrafa' : 'Profesora de Yoga'}
                </motion.span>
              </AnimatePresence>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400/75 font-sans font-light" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Disponible
                </span>
              </span>
            </div>
          </motion.div>

          {/* Derecha — toggle centrado verticalmente en esta zona */}
          <div className="flex items-center h-full pb-8">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
            >
              <AnimatePresence mode="wait">
                <motion.button
                  key={mode}
                  initial={{ opacity: 0, x: isPhotography ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  onClick={handleToggle}
                  className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm hover:border-white/70 hover:bg-white/20 transition-all duration-300"
                >
                  {isPhotography && (
                    <ChevronLeft size={14} className="text-white/80 group-hover:text-white transition-colors" />
                  )}
                  <span
                    className="text-white/90 group-hover:text-white font-sans font-light transition-colors"
                    style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    {toggleLabel}
                  </span>
                  {!isPhotography && (
                    <ChevronRight size={14} className="text-white/80 group-hover:text-white transition-colors" />
                  )}
                </motion.button>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Centro inferior — scroll */}
        <div className="flex-shrink-0 pb-8 flex justify-center">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-1.5 text-white/35 hover:text-white/65 transition-colors"
            aria-label="Scroll hacia abajo"
          >
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
              Descubrir
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={14} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
