'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { heroData } from '@/lib/placeholder-data'
import { ease } from '@/styles/animations'
import { type Mode } from '@/types'
import { cn } from '@/lib/utils'

const MODES: Mode[] = ['yoga', 'photography']
const DRAG_THRESHOLD = 60

// SVG con evenodd: exterior blanco, interior hueco transparente real
function IsotipoIcon({ width, opacity }: { width: number; opacity?: number }) {
  const h = Math.round(width * (88 / 102))
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 102 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: opacity ?? 1 }}
    >
      {/* Un solo path con evenodd: el interior queda transparente de verdad */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.80359 28.6212L32.5426 7.07962C33.7663 6.05543 35.1356 5.18696 36.6701 4.61013C40.4478 3.19008 48.372 0.673372 56.2963 1.03512C61.2843 1.26284 67.9759 2.5274 73.7854 3.83736C81.3634 5.54609 86.4213 11.8909 86.4213 19.0257V22.9431C86.4213 28.0012 89.1883 32.7242 93.7941 35.5276C100.09 39.3595 102.752 46.6125 99.7953 52.9764C96.9988 58.9959 93.2127 66.373 89.1599 72.0466C80.944 83.5485 65.0599 85.5488 65.0599 85.5488L29.6636 86.9851C21.4906 87.3168 14.541 82.0507 17.677 75.1435C17.7664 74.9466 17.8591 74.7478 17.9553 74.547C19.1279 72.1 19.989 69.9322 20.6206 68.0879C22.0697 63.8568 19.6191 59.6516 15.3633 57.5252L10.2989 54.9948C-0.449871 49.6242 -2.23129 36.1828 6.80359 28.6212Z M38.8158 30.5403L51.9351 19.9565C53.8434 18.417 56.6587 18.2774 58.7379 19.6193C59.9004 20.3696 60.699 21.503 60.9655 22.7807L62.3299 29.3225C62.9096 32.1016 64.5829 34.5902 67.0336 36.3181C70.3533 38.6587 72.3124 42.3838 71.5204 46.1471C69.0823 57.7326 62.1831 64.3106 54.8732 67.794C46.4749 71.7959 38.5769 64.3979 38.5769 55.7404V54.8418C38.5769 52.2889 37.7685 49.7906 36.2494 47.6485C32.3513 42.1518 33.443 34.8749 38.8158 30.5403Z"
        fill="white"
      />
    </svg>
  )
}

export function HeroSection() {
  const { mode, setMode } = useModeContext()
  const content = heroData[mode]
  const isPhotography = mode === 'photography'
  const currentIndex = MODES.indexOf(mode)
  const [isDragging, setIsDragging] = useState(false)
  const [hint, setHint] = useState<'left' | 'right' | null>(null)
  const dragX = useMotionValue(0)
  const isotopoRotate = useTransform(dragX, [-120, 0, 120], [-35, 0, 35])
  const isotopoScale = useTransform(dragX, [-120, -40, 0, 40, 120], [0.9, 1.05, 1, 1.05, 0.9])
  const constraintsRef = useRef(null)

  const handleScrollDown = () =>
    document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' })

  const panelBg = isPhotography ? '#1C1713' : '#F5F0E8'
  const panelText = isPhotography ? '#F0EAE0' : '#2C2420'
  const panelMuted = isPhotography ? '#9E948A' : '#8B7B6B'
  const panelBorder = isPhotography ? 'rgba(255,255,255,0.06)' : 'rgba(44,36,32,0.08)'

  // Hint labels
  const leftLabel = currentIndex > 0 ? 'Yoga' : null
  const rightLabel = currentIndex < MODES.length - 1 ? 'Comunic. Audiovisual' : null

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] overflow-hidden">

      {/* ── DESKTOP: split layout ── */}
      <div className="hidden md:flex h-full relative">

        {/* Panel izquierdo */}
        <motion.div
          animate={{ backgroundColor: panelBg }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-between flex-shrink-0 px-8 py-8"
          style={{ width: 'clamp(220px, 26vw, 340px)' }}
        >
          <div />

          {/* Nombre rotado */}
          <div className="flex-1 flex items-center justify-center py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`name-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}
              >
                <span style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  letterSpacing: '0.08em',
                  color: panelText,
                }}>
                  JOANA GARGALLO
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Abajo — subtítulo + disponible */}
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`sub-${mode}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-2"
              >
                <p className="font-sans font-light" style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: panelMuted }}>
                  {isPhotography ? 'Comunicación Audiovisual' : 'Profesora de Yoga'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <span className="font-sans font-light" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ade80' }}>
                    Disponible
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Borde derecho */}
          <div className="absolute right-0 top-0 bottom-0 w-px" style={{ backgroundColor: panelBorder }} />
        </motion.div>

        {/* Imagen derecha */}
        <div ref={constraintsRef} className="relative flex-1 overflow-hidden">
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
                ? 'linear-gradient(to bottom, rgba(26,24,21,0.2) 0%, rgba(26,24,21,0.0) 60%, rgba(26,24,21,0.5) 100%)'
                : 'linear-gradient(to bottom, rgba(30,22,16,0.15) 0%, rgba(30,22,16,0.0) 60%, rgba(30,22,16,0.45) 100%)',
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          />

          {/* Label modo — bottom left */}
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
                {isPhotography ? 'Comunicación Audiovisual' : 'Yoga'}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* ── ISOTIPO — placeholder inside wrapper, real one outside below ── */}
        <div className="hidden">
          <div className="relative pointer-events-auto" style={{ width: 160, height: 160 }}>

            {/* Hints direccionales al arrastrar */}
            <AnimatePresence>
              {isDragging && leftLabel && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: hint === 'left' ? 1 : 0.3, x: 0 }} exit={{ opacity: 0 }}
                  className="absolute right-[110%] top-1/2 -translate-y-1/2 text-white font-sans font-light whitespace-nowrap"
                  style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                >← {leftLabel}</motion.span>
              )}
              {isDragging && rightLabel && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: hint === 'right' ? 1 : 0.3, x: 0 }} exit={{ opacity: 0 }}
                  className="absolute left-[110%] top-1/2 -translate-y-1/2 text-white font-sans font-light whitespace-nowrap"
                  style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                >{rightLabel} →</motion.span>
              )}
            </AnimatePresence>

            {/* Isotipo arrastrable */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              style={{ x: dragX, rotate: isotopoRotate, scale: isotopoScale }}
              onDragStart={() => setIsDragging(true)}
              onDrag={(_, info) => {
                if (info.offset.x < -20) setHint('left')
                else if (info.offset.x > 20) setHint('right')
                else setHint(null)
              }}
              onDragEnd={(_, info) => {
                setIsDragging(false); setHint(null); dragX.set(0)
                if (info.offset.x < -DRAG_THRESHOLD && currentIndex > 0) setMode(MODES[currentIndex - 1])
                else if (info.offset.x > DRAG_THRESHOLD && currentIndex < MODES.length - 1) setMode(MODES[currentIndex + 1])
              }}
              className="cursor-grab active:cursor-grabbing select-none"
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <IsotipoIcon width={100} opacity={isDragging ? 1 : 0.85} />
            </motion.div>

            {/* Hint en reposo */}
            <AnimatePresence>
              {!isDragging && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <motion.span animate={{ x: [-4, 0, -4] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-white/60" style={{ fontSize: '0.75rem' }}>←</motion.span>
                    <span className="text-white/50 font-sans font-light" style={{ fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>desliza</span>
                    <motion.span animate={{ x: [4, 0, 4] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-white/60" style={{ fontSize: '0.75rem' }}>→</motion.span>
                  </div>
                  <div className="flex items-center gap-3">
                    {currentIndex > 0 && <span className="text-white/35 font-sans font-light" style={{ fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Yoga</span>}
                    {currentIndex < MODES.length - 1 && <span className="text-white/35 font-sans font-light" style={{ fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Comunic. Audiovisual</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Descubrir centrado */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={handleScrollDown}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 hover:opacity-60 transition-opacity"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          <span style={{ fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
            Descubrir
          </span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={13} />
          </motion.div>
        </motion.button>
      </div>

      {/* ── ISOTIPO desktop — directo en section, centrado en toda la pantalla ── */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative pointer-events-auto flex flex-col items-center" style={{ width: 160 }}>

          {/* Hints direccionales al arrastrar */}
          <AnimatePresence>
            {isDragging && leftLabel && (
              <motion.span
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: hint === 'left' ? 1 : 0.3, x: 0 }} exit={{ opacity: 0 }}
                className="absolute right-[110%] top-1/2 -translate-y-1/2 text-white font-sans font-light whitespace-nowrap"
                style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >← {leftLabel}</motion.span>
            )}
            {isDragging && rightLabel && (
              <motion.span
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: hint === 'right' ? 1 : 0.3, x: 0 }} exit={{ opacity: 0 }}
                className="absolute left-[110%] top-1/2 -translate-y-1/2 text-white font-sans font-light whitespace-nowrap"
                style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >{rightLabel} →</motion.span>
            )}
          </AnimatePresence>

          {/* Isotipo arrastrable */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            style={{ x: dragX, rotate: isotopoRotate, scale: isotopoScale }}
            onDragStart={() => setIsDragging(true)}
            onDrag={(_, info) => {
              if (info.offset.x < -20) setHint('left')
              else if (info.offset.x > 20) setHint('right')
              else setHint(null)
            }}
            onDragEnd={(_, info) => {
              setIsDragging(false); setHint(null); dragX.set(0)
              if (info.offset.x < -DRAG_THRESHOLD && currentIndex > 0) setMode(MODES[currentIndex - 1])
              else if (info.offset.x > DRAG_THRESHOLD && currentIndex < MODES.length - 1) setMode(MODES[currentIndex + 1])
            }}
            className="cursor-grab active:cursor-grabbing select-none"
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <IsotipoIcon width={100} opacity={isDragging ? 1 : 0.85} />
          </motion.div>

          {/* Hint en reposo */}
          <AnimatePresence>
            {!isDragging && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <motion.span animate={{ x: [-4, 0, -4] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-white/60" style={{ fontSize: '0.75rem' }}>←</motion.span>
                  <span className="text-white/50 font-sans font-light" style={{ fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>desliza</span>
                  <motion.span animate={{ x: [4, 0, 4] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-white/60" style={{ fontSize: '0.75rem' }}>→</motion.span>
                </div>
                <div className="flex items-center gap-3">
                  {currentIndex > 0 && <span className="text-white/35 font-sans font-light" style={{ fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Yoga</span>}
                  {currentIndex < MODES.length - 1 && <span className="text-white/35 font-sans font-light" style={{ fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Comunic. Audiovisual</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="flex md:hidden h-full flex-col">
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

        <div className="h-20 flex-shrink-0 relative z-10" />

        {/* Isotipo móvil — centro */}
        <div className="flex-1 relative z-10 flex items-center justify-center">
          <div className="relative" style={{ width: 130, height: 130 }}>
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              style={{ x: dragX, rotate: isotopoRotate, scale: isotopoScale }}
              onDragStart={() => setIsDragging(true)}
              onDrag={(_, info) => {
                if (info.offset.x < -20) setHint('left')
                else if (info.offset.x > 20) setHint('right')
                else setHint(null)
              }}
              onDragEnd={(_, info) => {
                setIsDragging(false)
                setHint(null)
                dragX.set(0)
                if (info.offset.x < -DRAG_THRESHOLD && currentIndex > 0) {
                  setMode(MODES[currentIndex - 1])
                } else if (info.offset.x > DRAG_THRESHOLD && currentIndex < MODES.length - 1) {
                  setMode(MODES[currentIndex + 1])
                }
              }}
              className="cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
            >
              <IsotipoIcon width={90} opacity={0.9} />
            </motion.div>

            {/* Hint desliza móvil */}
            <AnimatePresence>
              {!isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <motion.span animate={{ x: [-4, 0, -4] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-white/60" style={{ fontSize: '0.75rem' }}>←</motion.span>
                    <span className="text-white/50 font-sans font-light" style={{ fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>desliza para cambiar</span>
                    <motion.span animate={{ x: [4, 0, 4] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-white/60" style={{ fontSize: '0.75rem' }}>→</motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Texto móvil abajo */}
        <div className="relative z-10 flex flex-col px-6 pb-10 gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${mode}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              <h1 className="text-white leading-none" style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(2.8rem, 9vw, 4.5rem)',
                letterSpacing: '-0.02em',
              }}>
                JOANA<br />GARGALLO
              </h1>
              <div className="flex flex-col gap-1">
                <span className="text-white/55 font-sans font-light" style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {isPhotography ? 'Comunicación Audiovisual' : 'Profesora de Yoga'}
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

          <button onClick={handleScrollDown} className="self-start text-white/40 hover:text-white/65 transition-colors mt-1">
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowDown size={15} />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  )
}
