'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { menuItem } from '@/styles/animations'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Horarios', href: '#horarios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'bg-black/40 backdrop-blur-md border-b border-white/10' : 'bg-transparent',
        )}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

          {/* Nombre — izquierda */}
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
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </motion.a>

          {/* Derecha — contacto + hamburguesa */}
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => handleNavClick('#contacto')}
              className="hidden sm:flex items-center px-4 py-1.5 rounded-full border border-white/30 text-white/80 hover:border-white/60 hover:text-white transition-all duration-300 font-sans font-light"
              style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
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

      {/* Overlay */}
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
              <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span className="font-sans font-light text-white/40" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Menú
                </span>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors p-1" aria-label="Cerrar menú">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col flex-1 px-8 py-8 gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    variants={menuItem}
                    initial="closed"
                    animate="open"
                    custom={i}
                    transition={{ delay: i * 0.05 }}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="group flex items-center gap-4 py-3.5 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <span className="font-sans text-white/25 group-hover:text-white/50 transition-colors w-5 text-right" style={{ fontSize: '0.6rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-white/70 group-hover:text-white transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.9rem', fontWeight: 300 }}
                    >
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="px-8 py-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="font-sans text-white/30" style={{ fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                  joanagargalloantoni@gmail.com
                </p>
                <p className="font-sans text-white/20 mt-1" style={{ fontSize: '0.6rem' }}>
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
