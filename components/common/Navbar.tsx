'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useModeContext } from '@/components/providers/ModeProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { type Mode } from '@/types'

const ROLES: {
  value: Mode
  label: string
  links: { label: string; href: string }[]
}[] = [
  {
    value: 'yoga',
    label: 'Yoga',
    links: [
      { label: 'Sobre mí', href: '#sobre-mi' },
      { label: 'Servicios', href: '#servicios' },
      { label: 'Horarios', href: '#horarios' },
      { label: 'Galería', href: '#galeria' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    value: 'photography',
    label: 'Comunicación Audiovisual',
    links: [
      { label: 'Sobre mí', href: '#sobre-mi' },
      { label: 'Servicios', href: '#servicios' },
      { label: 'Galería', href: '#galeria' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<Mode | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { mode, setMode } = useModeContext()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const logoFilter = 'brightness(0) invert(1)'

  // Al abrir el menú, expandir el rol activo
  useEffect(() => {
    if (open) setExpanded(mode)
  }, [open, mode])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const handleRoleClick = (roleValue: Mode) => {
    if (expanded === roleValue) {
      setExpanded(null)
    } else {
      setExpanded(roleValue)
      if (roleValue !== mode) {
        setMode(roleValue)
        setTimeout(() => document.querySelector('#inicio')?.scrollIntoView({ behavior: 'smooth' }), 150)
      }
    }
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
            <img src="/logo.svg" alt="Joana Gargallo" className="h-7 w-auto" style={{ filter: logoFilter }} />
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-sm flex flex-col overflow-y-auto"
              style={{ backgroundColor: '#1C1713' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span className="font-sans font-light text-white/40" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Menú
                </span>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors p-1">
                  <X size={20} />
                </button>
              </div>

              {/* Roles acordeón */}
              <nav className="flex flex-col flex-1 px-6 py-6 gap-2">
                {ROLES.map((role) => {
                  const isActive = mode === role.value
                  const isExpanded = expanded === role.value

                  return (
                    <div key={role.value} className="flex flex-col">
                      {/* Cabecera del rol */}
                      <button
                        onClick={() => handleRoleClick(role.value)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 text-left',
                          isActive
                            ? 'bg-white/8'
                            : 'hover:bg-white/4',
                        )}
                        style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                      >
                        <div className="flex items-center gap-3">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                          )}
                          {!isActive && <span className="w-1.5 h-1.5 flex-shrink-0" />}
                          <span
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: '1.7rem',
                              fontWeight: 300,
                              color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                            }}
                          >
                            {role.label}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown size={14} style={{ color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)' }} />
                        </motion.div>
                      </button>

                      {/* Links del rol */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pl-8 pb-2 pt-1 gap-0">
                              {role.links.map((link, i) => (
                                <motion.a
                                  key={link.href}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.04 }}
                                  href={link.href}
                                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                                  className="flex items-center gap-3 py-2.5 border-b group"
                                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                                >
                                  <span className="font-sans text-white/20 group-hover:text-white/45 transition-colors" style={{ fontSize: '0.58rem' }}>
                                    {String(i + 1).padStart(2, '0')}
                                  </span>
                                  <span
                                    className="text-white/55 group-hover:text-white/90 transition-colors font-sans font-light"
                                    style={{ fontSize: '0.85rem', letterSpacing: '0.04em' }}
                                  >
                                    {link.label}
                                  </span>
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="px-8 py-5 border-t flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
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
