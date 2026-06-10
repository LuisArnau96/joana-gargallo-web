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
      <div className="hidden md:flex h-full">

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

          {/* ── ISOTIPO arrastrable — centro de la imagen ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative pointer-events-auto" style={{ width: 160, height: 160 }}>

              {/* Hints direccionales */}
              <AnimatePresence>
                {isDragging && leftLabel && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: hint === 'left' ? 1 : 0.3, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-[110%] top-1/2 -translate-y-1/2 text-white font-sans font-light whitespace-nowrap"
                    style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    ← {leftLabel}
                  </motion.span>
                )}
                {isDragging && rightLabel && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: hint === 'right' ? 1 : 0.3, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-[110%] top-1/2 -translate-y-1/2 text-white font-sans font-light whitespace-nowrap"
                    style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    {rightLabel} →
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Isotipo */}
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
                className="cursor-grab active:cursor-grabbing select-none"
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/isotipo.svg"
                  alt="Cambiar modo"
                  draggable={false}
                  style={{
                    width: 100,
                    height: 86,
                    filter: 'brightness(0) invert(1)',
                    opacity: isDragging ? 1 : 0.85,
                  }}
                />
              </motion.div>

              {/* Hint en reposo */}
              {!isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-white/40 font-sans font-light whitespace-nowrap"
                  style={{ fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                >
                  ← desliza →
                </motion.div>
              )}
            </div>
          </div>

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/isotipo.svg"
                alt="Cambiar modo"
                draggable={false}
                style={{ width: 90, height: 78, filter: 'brightness(0) invert(1)', opacity: 0.9 }}
              />
            </motion.div>

            {/* Hint desliza */}
            <AnimatePresence>
              {!isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/45 font-sans font-light whitespace-nowrap"
                  style={{ fontSize: '0.54rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                >
                  ← desliza →
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
