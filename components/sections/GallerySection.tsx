'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { galleryImages } from '@/lib/placeholder-data'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/types'
import { ease } from '@/styles/animations'

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const image = images[index]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92"
      onClick={onClose}
    >
      <button className="absolute top-5 right-5 text-white/60 hover:text-white p-2" onClick={onClose}>
        <X size={22} />
      </button>
      {index > 0 && (
        <button className="absolute left-4 text-white/60 hover:text-white p-2" onClick={e => { e.stopPropagation(); onPrev() }}>
          <ChevronLeft size={30} />
        </button>
      )}
      <motion.div
        key={image._id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="px-16 max-w-4xl"
        onClick={e => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl" />
        {image.alt && <p className="text-white/40 text-xs text-center mt-3 font-sans">{image.alt}</p>}
      </motion.div>
      {index < images.length - 1 && (
        <button className="absolute right-4 text-white/60 hover:text-white p-2" onClick={e => { e.stopPropagation(); onNext() }}>
          <ChevronRight size={30} />
        </button>
      )}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs font-sans">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  )
}

// ─── Masonry (Yoga) ───────────────────────────────────────────────────────────
function MasonryGrid({ images, onSelect }: { images: GalleryImage[]; onSelect: (i: number) => void }) {
  return (
    <div className="columns-2 md:columns-3 gap-3">
      {images.map((img, i) => (
        <motion.div
          key={img._id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease }}
          onClick={() => onSelect(i)}
          className="group relative overflow-hidden rounded-xl cursor-pointer mb-3 break-inside-avoid"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={img.alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-[#2C2420]/40">
            <ZoomIn size={24} className="text-white" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Carousel editorial (Fotografía) ─────────────────────────────────────────
function PhotoCarousel({ images, onOpenLightbox }: { images: GalleryImage[]; onOpenLightbox: (i: number) => void }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1)
    setCurrent(next)
  }

  const prev = () => current > 0 && go(current - 1)
  const next = () => current < images.length - 1 && go(current + 1)

  const img = images[current]
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.98 }),
  }

  return (
    <div className="relative w-full">
      {/* Layout principal */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_56px] gap-0 items-start">

        {/* Imagen */}
        <div className="relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={img._id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease }}
              className="relative cursor-pointer flex justify-center"
              onClick={() => onOpenLightbox(current)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-auto max-w-full"
                style={{ maxHeight: '75vh', display: 'block' }}
              />
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                <ZoomIn size={28} className="text-white" />
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Barra lateral derecha — navegación vertical */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-4 pl-4 h-full">
          <button
            onClick={prev}
            disabled={current === 0}
            className={cn(
              'w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300',
              current === 0
                ? 'border-white/10 text-white/15 cursor-not-allowed'
                : 'border-white/25 text-white/60 hover:border-white/60 hover:text-white',
            )}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={next}
            disabled={current === images.length - 1}
            className={cn(
              'w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300',
              current === images.length - 1
                ? 'border-white/10 text-white/15 cursor-not-allowed'
                : 'border-white/25 text-white/60 hover:border-white/60 hover:text-white',
            )}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Descripción y dots — debajo */}
      <div className="mt-6 flex items-start justify-between gap-4">
        {/* Descripción */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-1"
          >
            <p
              className="text-white/70 font-sans font-light"
              style={{ fontSize: '0.8rem', letterSpacing: '0.06em' }}
            >
              {img.alt}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots + flechas móvil */}
        <div className="flex items-center gap-3">
          {/* Flechas en móvil */}
          <div className="flex gap-2 lg:hidden">
            <button
              onClick={prev}
              disabled={current === 0}
              className={cn('w-8 h-8 rounded-full border flex items-center justify-center transition-all',
                current === 0 ? 'border-white/10 text-white/15' : 'border-white/30 text-white/60 hover:border-white/60 hover:text-white')}
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={next}
              disabled={current === images.length - 1}
              className={cn('w-8 h-8 rounded-full border flex items-center justify-center transition-all',
                current === images.length - 1 ? 'border-white/10 text-white/15' : 'border-white/30 text-white/60 hover:border-white/60 hover:text-white')}
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === current
                    ? 'w-4 h-1.5 bg-[#C4A882]'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function GallerySection() {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = galleryImages
    .filter(img => img.category === mode)
    .sort((a, b) => a.order - b.order)

  return (
    <section
      id="galeria"
      className="section-padding transition-colors duration-700"
      style={{ backgroundColor: isPhotography ? '#1A1815' : '#F7F3EE' }}
    >
      <div className="container-max">
        {/* Header sección */}
        <div className="mb-10">
          <ScrollReveal>
            <span className="label-text" style={{ color: isPhotography ? '#9E948A' : '#8B7B6B' }}>
              Galería
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={`gallery-title-${mode}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.15,
                  marginTop: '0.5rem',
                  color: isPhotography ? '#F0EAE0' : '#2C2420',
                }}
              >
                {isPhotography ? 'Portfolio' : 'Momentos de práctica'}
              </motion.h2>
            </AnimatePresence>
          </ScrollReveal>
        </div>

        {/* Contenido */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`gallery-${mode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isPhotography ? (
              <PhotoCarousel images={filtered} onOpenLightbox={setLightboxIndex} />
            ) : (
              <MasonryGrid images={filtered} onSelect={setLightboxIndex} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i))}
            onNext={() => setLightboxIndex(i => (i !== null && i < filtered.length - 1 ? i + 1 : i))}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
