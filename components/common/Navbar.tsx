'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { menuItem } from '@/styles/animations'
import { useModeContext } from '@/components/providers/ModeProvider'
import { type Mode } from '@/types'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Horarios', href: '#horarios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
]

const MODES: { value: Mode; label: string; sub: string }[] = [
  { value: 'yoga', label: 'Yoga', sub: 'Profesora de Yoga' },
  { value: 'photography', label: 'Fotografía', sub: 'Fotógrafa' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { mode, setMode } = useModeContext()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleModeSwitch = (m: Mode) => {
    setMode(m)
    setOpen(false)
    setTimeout(() => {
      document.querySelector('#inicio')?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'bg-black/40 backdrop-blur-md border-b border-white/10' : 'bg-transparent',
        )}
      >
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4">
          <motion.a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNavClick('#inicio') }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hover:opacity-70 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Joana Gargallo"
              className="h-7 w-auto"
              style={{ filter: mode === 'photography' ? 'brightness(0) invert(1)' : 'brightness(0)' }}
            />
          </motion.a>

          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => handleNavClick('#contacto')}
              className="hidden sm:flex items-center px-5 py-2 rounded-full border border-white/60 text-white hover:border-white hover:bg-white/10 transition-all duration-300 font-sans font-light"
              style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              Contacto
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onClick={() => setOpen(true)}
              className="text-white p-1.5 hover:opacity-70 transition-opacity"
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-sm flex flex-col"
              style={{ backgroundColor: '#1C1713' }}
            >
              {/* Header panel */}
              <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span className="font-sans font-light text-white/40" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Menú
                </span>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors p-1" aria-label="Cerrar menú">
                  <X size={20} />
                </button>
              </div>

              {/* Selector de perfil */}
              <div className="px-8 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="font-sans text-white/30 mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Perfil activo
                </p>
                <div className="flex flex-col gap-2">
                  {MODES.map((m) => {
                    const active = mode === m.value
                    return (
                      <button
                        key={m.value}
                        onClick={() => handleModeSwitch(m.value)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 text-left',
                          active
                            ? 'border-[#C4A882]/50 bg-[#C4A882]/10'
                            : 'border-white/8 bg-white/4 hover:border-white/20 hover:bg-white/8',
                        )}
                        style={{ borderColor: active ? 'rgba(196,168,130,0.4)' : 'rgba(255,255,255,0.06)' }}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="font-sans font-medium"
                            style={{ fontSize: '0.8rem', color: active ? '#C4A882' : 'rgba(255,255,255,0.5)' }}
                          >
                            {m.label}
                          </span>
                          <span
                            className="font-sans font-light"
                            style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)' }}
                          >
                            {m.sub}
                          </span>
                        </div>
                        {active && (
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: '#C4A882' }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Links de navegación */}
              <nav className="flex flex-col flex-1 px-8 py-6 gap-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    variants={menuItem}
                    initial="closed"
                    animate="open"
                    custom={i}
                    transition={{ delay: i * 0.04 }}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="group flex items-center gap-4 py-3 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <span className="font-sans text-white/20 group-hover:text-white/45 transition-colors w-5 text-right" style={{ fontSize: '0.58rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-white/65 group-hover:text-white transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', fontWeight: 300 }}
                    >
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Footer */}
              <div className="px-8 py-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="font-sans text-white/25" style={{ fontSize: '0.63rem', letterSpacing: '0.06em' }}>
                  joanagargalloantoni@gmail.com
                </p>
                <p className="font-sans text-white/15 mt-0.5" style={{ fontSize: '0.58rem' }}>
                  Puerto de Sagunto, Valencia
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
