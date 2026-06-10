'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { heroData } from '@/lib/placeholder-data'
import { ease } from '@/styles/animations'
import { type Mode } from '@/types'

const MODES: Mode[] = ['yoga', 'photography']
const DRAG_THRESHOLD = 60

function IsotipoIcon({ width, opacity, color = 'white' }: { width: number; opacity?: number; color?: string }) {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.80359 28.6212L32.5426 7.07962C33.7663 6.05543 35.1356 5.18696 36.6701 4.61013C40.4478 3.19008 48.372 0.673372 56.2963 1.03512C61.2843 1.26284 67.9759 2.5274 73.7854 3.83736C81.3634 5.54609 86.4213 11.8909 86.4213 19.0257V22.9431C86.4213 28.0012 89.1883 32.7242 93.7941 35.5276C100.09 39.3595 102.752 46.6125 99.7953 52.9764C96.9988 58.9959 93.2127 66.373 89.1599 72.0466C80.944 83.5485 65.0599 85.5488 65.0599 85.5488L29.6636 86.9851C21.4906 87.3168 14.541 82.0507 17.677 75.1435C17.7664 74.9466 17.8591 74.7478 17.9553 74.547C19.1279 72.1 19.989 69.9322 20.6206 68.0879C22.0697 63.8568 19.6191 59.6516 15.3633 57.5252L10.2989 54.9948C-0.449871 49.6242 -2.23129 36.1828 6.80359 28.6212Z M38.8158 30.5403L51.9351 19.9565C53.8434 18.417 56.6587 18.2774 58.7379 19.6193C59.9004 20.3696 60.699 21.503 60.9655 22.7807L62.3299 29.3225C62.9096 32.1016 64.5829 34.5902 67.0336 36.3181C70.3533 38.6587 72.3124 42.3838 71.5204 46.1471C69.0823 57.7326 62.1831 64.3106 54.8732 67.794C46.4749 71.7959 38.5769 64.3979 38.5769 55.7404V54.8418C38.5769 52.2889 37.7685 49.7906 36.2494 47.6485C32.3513 42.1518 33.443 34.8749 38.8158 30.5403Z"
        fill={color}
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

  // Adaptive colors based on photo tone
  const isDark = content.isDark
  const pageBg = isPhotography ? '#1A1815' : '#F7F3EE'
  const textPrimary = isDark ? 'rgba(255,255,255,1)' : 'rgba(44,36,32,0.95)'
  const textSecondary = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(44,36,32,0.75)'
  const subtitleColor = isDark ? 'rgba(220,188,138,1)' : 'rgba(139,100,60,1)'
  const hintColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,36,32,0.55)'
  const dotActive = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(44,36,32,0.8)'
  const dotInactive = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(44,36,32,0.25)'
  const isotipoColor = isDark ? 'white' : '#2C2420'
  const shadow = isDark ? '0 1px 12px rgba(0,0,0,0.5)' : '0 1px 8px rgba(255,255,255,0.4)'

  const subtitle = isPhotography ? 'Fotógrafa · Creadora Audiovisual' : 'Profesora de Yoga'

  return (
    <section id="inicio" ref={constraintsRef} className="relative h-screen min-h-[600px] overflow-hidden">

      {/* Background image */}
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
          <img src={content.backgroundImage} alt="" className="w-full h-full object-cover" style={{ objectPosition: content.objectPosition ?? 'center center' }} loading="eager" />
        </motion.div>
      </AnimatePresence>

      {/* Top gradient — navbar readability */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{ height: '35%', background: isDark ? 'linear-gradient(to bottom, rgba(20,15,10,0.5) 0%, transparent 100%)' : 'linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, transparent 100%)' }}
      />

      {/* Bottom gradient — fades into page background */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{ height: '55%' }}
        animate={{
          background: `linear-gradient(to top, ${pageBg} 0%, ${pageBg}cc 20%, ${pageBg}66 45%, transparent 100%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Centered content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-start gap-4 px-4" style={{ paddingTop: '14vh' }}>

        {/* Isotipo row with mode labels */}
        <div className="flex items-center gap-6 md:gap-10">

          {/* Left label — Yoga */}
          <motion.button
            onClick={() => currentIndex > 0 && setMode(MODES[currentIndex - 1])}
            animate={{ opacity: mode === 'yoga' ? 0 : 0.85 }}
            whileHover={{ opacity: mode === 'yoga' ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="font-sans font-medium whitespace-nowrap select-none"
            style={{ fontSize: 'clamp(0.62rem, 1.3vw, 0.78rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: textSecondary, textShadow: shadow }}
          >
            ← Yoga
          </motion.button>

          {/* Isotipo draggable */}
          <div className="relative flex flex-col items-center">
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
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <IsotipoIcon width={100} opacity={isDragging ? 1 : 0.92} color={isotipoColor} />
            </motion.div>
          </div>

          {/* Right label — Visual */}
          <motion.button
            onClick={() => currentIndex < MODES.length - 1 && setMode(MODES[currentIndex + 1])}
            animate={{ opacity: mode === 'photography' ? 0 : 0.85 }}
            whileHover={{ opacity: mode === 'photography' ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="font-sans font-medium whitespace-nowrap select-none"
            style={{ fontSize: 'clamp(0.62rem, 1.3vw, 0.78rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: textSecondary, textShadow: shadow }}
          >
            Visual →
          </motion.button>
        </div>

        {/* Name */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`name-${mode}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-center leading-none"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
              color: textPrimary,
              textShadow: shadow,
            }}
          >
            Joana Gargallo
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${mode}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-center font-sans font-medium"
            style={{
              fontSize: 'clamp(0.65rem, 1.4vw, 0.8rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: subtitleColor,
              textShadow: shadow,
            }}
          >
            {subtitle}
          </motion.p>
        </AnimatePresence>

        {/* Drag hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col items-center gap-2 mt-1"
        >
          {/* Dots indicator */}
          <div className="flex items-center gap-2">
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="transition-all duration-300"
                style={{
                  width: mode === m ? 20 : 6,
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: mode === m ? dotActive : dotInactive,
                }}
              />
            ))}
          </div>

          <AnimatePresence>
            {!isDragging && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-sans font-medium"
                style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: hintColor, textShadow: shadow }}
              >
                Arrastra para ver el otro perfil
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Descubrir */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        onClick={handleScrollDown}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 hover:opacity-60 transition-opacity"
        style={{ color: hintColor }}
      >
        <span style={{ fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
          Descubrir
        </span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={13} />
        </motion.div>
      </motion.button>
    </section>
  )
}
