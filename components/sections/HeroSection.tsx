'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { heroData } from '@/lib/placeholder-data'
import { ease } from '@/styles/animations'
import { type Mode } from '@/types'
import { cn } from '@/lib/utils'

const MODES: Mode[] = ['yoga', 'photography']

export function HeroSection() {
  const { mode, setMode } = useModeContext()
  const content = heroData[mode]
  const isPhotography = mode === 'photography'
  const currentIndex = MODES.indexOf(mode)

  const go = (dir: 1 | -1) => {
    const next = MODES[currentIndex + dir]
    if (next) setMode(next)
  }

  const handleScrollDown = () =>
    document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' })

  // Panel colors
  const panelBg = isPhotography ? '#1C1713' : '#F5F0E8'
  const panelText = isPhotography ? '#F0EAE0' : '#2C2420'
  const panelMuted = isPhotography ? '#9E948A' : '#8B7B6B'
  const panelAccent = isPhotography ? '#C4A882' : '#6B7C5C'
  const panelBorder = isPhotography ? 'rgba(255,255,255,0.06)' : 'rgba(44,36,32,0.08)'

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] overflow-hidden">

      {/* ── DESKTOP: split layout ── */}
      <div className="hidden md:flex h-full">

        {/* Panel izquierdo — texto */}
        <motion.div
          animate={{ backgroundColor: panelBg }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-between flex-shrink-0 px-10 py-8"
          style={{ width: 'clamp(280px, 30vw, 400px)' }}
        >
          {/* Logo */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Joana Gargallo"
              className="h-8 w-auto"
              style={{ filter: isPhotography ? 'brightness(0) invert(1)' : 'brightness(0)' }}
            />
          </div>

          {/* Centro — nombre + subtítulo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${mode}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-col gap-4"
            >
              {/* Número del modo */}
              <span
                className="font-sans font-light"
                style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: panelAccent }}
              >
                {String(currentIndex + 1).padStart(2, '0')}
              </span>

              <h1
                className="leading-none"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                  letterSpacing: '-0.02em',
                  color: panelText,
                }}
              >
                JOANA<br />GARGALLO
              </h1>

              <div
                className="w-8 h-px"
                style={{ backgroundColor: panelAccent, opacity: 0.6 }}
              />

              <div className="flex flex-col gap-1.5">
                <p
                  className="font-sans font-light"
                  style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: panelMuted }}
                >
                  {isPhotography ? 'Fotógrafa' : 'Profesora de Yoga'}
                </p>
                <p
                  className="font-sans font-light leading-relaxed max-w-[200px]"
                  style={{ fontSize: '0.78rem', color: panelMuted, lineHeight: 1.6 }}
                >
                  {content.subheadline}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                />
                <span
                  className="font-sans font-light"
                  style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ade80' }}
                >
                  Disponible
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Scroll indicator */}
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-start gap-1.5 transition-opacity hover:opacity-60"
            style={{ color: panelMuted }}
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
          </button>

          {/* Número grande decorativo — borde derecho del panel */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 select-none pointer-events-none"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(6rem, 10vw, 9rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: isPhotography ? 'rgba(196,168,130,0.12)' : 'rgba(44,36,32,0.07)',
              zIndex: 20,
            }}
          >
            {String(currentIndex + 1).padStart(2, '0')}
          </div>

          {/* Borde derecho */}
          <div
            className="absolute right-0 top-0 bottom-0 w-px"
            style={{ backgroundColor: panelBorder }}
          />
        </motion.div>

        {/* Imagen derecha — fullbleed */}
        <div className="relative flex-1 overflow-hidden">
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
              <img
                src={content.backgroundImage}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay suave */}
          <motion.div
            animate={{
              background: isPhotography
                ? 'linear-gradient(to bottom, rgba(26,24,21,0.2) 0%, rgba(26,24,21,0.0) 60%, rgba(26,24,21,0.5) 100%)'
                : 'linear-gradient(to bottom, rgba(30,22,16,0.15) 0%, rgba(30,22,16,0.0) 60%, rgba(30,22,16,0.45) 100%)',
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          />

          {/* Flechas navegación — bottom right */}
          <div className="absolute bottom-8 right-8 flex gap-2 z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(-1)}
              disabled={currentIndex === 0}
              className={cn(
                'w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-sm transition-all duration-300',
                currentIndex === 0
                  ? 'border-white/15 text-white/20 cursor-not-allowed'
                  : 'border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/70',
              )}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(1)}
              disabled={currentIndex === MODES.length - 1}
              className={cn(
                'w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-sm transition-all duration-300',
                currentIndex === MODES.length - 1
                  ? 'border-white/15 text-white/20 cursor-not-allowed'
                  : 'border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/70',
              )}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>

          {/* Label del modo actual — bottom left de la imagen */}
          <div className="absolute bottom-8 left-6 z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="text-white/50 font-sans font-light"
                style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}
              >
                {isPhotography ? 'Fotografía' : 'Yoga'}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── MOBILE: imagen fullscreen + panel overlay ── */}
      <div className="flex md:hidden h-full flex-col">
        {/* Imagen fullscreen */}
        <div className="absolute inset-0">
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
          <motion.div
            animate={{
              background: isPhotography
                ? 'linear-gradient(to top, rgba(26,24,21,0.9) 0%, rgba(26,24,21,0.3) 50%, rgba(26,24,21,0.5) 100%)'
                : 'linear-gradient(to top, rgba(30,22,16,0.85) 0%, rgba(30,22,16,0.2) 55%, rgba(30,22,16,0.5) 100%)',
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          />
        </div>

        {/* Spacer navbar */}
        <div className="h-20 flex-shrink-0 relative z-10" />

        {/* Contenido mobile */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-10 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${mode}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3"
            >
              <h1
                className="text-white leading-none"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(3rem, 9vw, 5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                JOANA<br />GARGALLO
              </h1>
              <div className="flex flex-col gap-1">
                <span className="text-white/55 font-sans font-light" style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {isPhotography ? 'Fotógrafa' : 'Profesora de Yoga'}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400/75 font-sans font-light" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Disponible
                  </span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <button onClick={handleScrollDown} className="text-white/35 hover:text-white/65 transition-colors">
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <ArrowDown size={15} />
              </motion.div>
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                disabled={currentIndex === 0}
                className={cn('w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-sm',
                  currentIndex === 0 ? 'border-white/10 text-white/15' : 'border-white/40 text-white bg-white/10')}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => go(1)}
                disabled={currentIndex === MODES.length - 1}
                className={cn('w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-sm',
                  currentIndex === MODES.length - 1 ? 'border-white/10 text-white/15' : 'border-white/40 text-white bg-white/10')}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
