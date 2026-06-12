'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { cn } from '@/lib/utils'
import type { GalleryImage, GalleryGroup } from '@/types'
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

// ─── Grid de grupos ───────────────────────────────────────────────────────────
function GroupGrid({ groups, isPhotography, onSelect }: {
  groups: GalleryGroup[]
  isPhotography: boolean
  onSelect: (g: GalleryGroup) => void
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {groups.map((group, i) => (
        <motion.button
          key={group._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease }}
          onClick={() => onSelect(group)}
          className="group relative overflow-hidden rounded-xl cursor-pointer text-left"
          style={{ aspectRatio: '3/4' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={group.coverImage}
            alt={group.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-sans font-medium text-white text-sm leading-tight">{group.name}</p>
            <p className="font-sans text-white/60 text-xs mt-0.5">{group.images.length} fotos</p>
          </div>
        </motion.button>
      ))}
    </div>
  )
}

// ─── Masonry dentro de un grupo (yoga) ───────────────────────────────────────
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

// ─── Carousel dentro de un grupo (fotografía) ────────────────────────────────
function PhotoCarousel({ images, onOpenLightbox }: { images: GalleryImage[]; onOpenLightbox: (i: number) => void }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (next: number) => { setDirection(next > current ? 1 : -1); setCurrent(next) }
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
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_56px] gap-0 items-start">
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
              <img src={img.src} alt={img.alt} className="w-auto max-w-full" style={{ maxHeight: '75vh', display: 'block' }} />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <ZoomIn size={28} className="text-white" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hidden lg:flex flex-col items-center justify-center gap-4 pl-4 h-full">
          <button onClick={prev} disabled={current === 0}
            className={cn('w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300',
              current === 0 ? 'border-white/10 text-white/15 cursor-not-allowed' : 'border-white/25 text-white/60 hover:border-white/60 hover:text-white')}>
            <ChevronLeft size={14} />
          </button>
          <button onClick={next} disabled={current === images.length - 1}
            className={cn('w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300',
              current === images.length - 1 ? 'border-white/10 text-white/15 cursor-not-allowed' : 'border-white/25 text-white/60 hover:border-white/60 hover:text-white')}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-start justify-between gap-4">
        <AnimatePresence mode="wait">
          <motion.p key={`desc-${current}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }} className="text-white/70 font-sans font-light" style={{ fontSize: '0.8rem', letterSpacing: '0.06em' }}>
            {img.alt}
          </motion.p>
        </AnimatePresence>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 lg:hidden">
            <button onClick={prev} disabled={current === 0}
              className={cn('w-8 h-8 rounded-full border flex items-center justify-center transition-all',
                current === 0 ? 'border-white/10 text-white/15' : 'border-white/30 text-white/60 hover:border-white/60 hover:text-white')}>
              <ChevronLeft size={13} />
            </button>
            <button onClick={next} disabled={current === images.length - 1}
              className={cn('w-8 h-8 rounded-full border flex items-center justify-center transition-all',
                current === images.length - 1 ? 'border-white/10 text-white/15' : 'border-white/30 text-white/60 hover:border-white/60 hover:text-white')}>
              <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? 16 : 6, height: 6, borderRadius: 2, backgroundColor: i === current ? '#C4A882' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function GallerySection({ galleryGroups }: { galleryGroups: GalleryGroup[] }) {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'
  const [selectedGroup, setSelectedGroup] = useState<GalleryGroup | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => { setSelectedGroup(null); setLightboxIndex(null) }, [mode])

  const groups = galleryGroups.filter(g => g.category === mode)
  const activeImages = selectedGroup?.images ?? []

  const handleGroupSelect = (g: GalleryGroup) => { setSelectedGroup(g); setLightboxIndex(null) }
  const handleBack = () => { setSelectedGroup(null); setLightboxIndex(null) }

  return (
    <section
      id="galeria"
      className="section-padding transition-colors duration-700"
      style={{ backgroundColor: isPhotography ? '#1A1815' : '#F7F3EE' }}
    >
      <div className="container-max">
        {/* Header */}
        <div className="mb-10">
          <ScrollReveal>
            <span className="label-text" style={{ color: isPhotography ? '#9E948A' : '#8B7B6B' }}>
              Galería
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-4 mt-2">
              <AnimatePresence mode="wait">
                {selectedGroup ? (
                  <motion.button
                    key="back"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={handleBack}
                    className="flex items-center gap-1.5 font-sans text-sm transition-opacity hover:opacity-60"
                    style={{ color: isPhotography ? '#9E948A' : '#8B7B6B' }}
                  >
                    <ArrowLeft size={14} />
                    Proyectos
                  </motion.button>
                ) : null}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`gallery-title-${mode}-${selectedGroup?._id ?? 'root'}`}
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
                    color: isPhotography ? '#F0EAE0' : '#2C2420',
                  }}
                >
                  {selectedGroup ? selectedGroup.name : isPhotography ? 'Portfolio' : 'Momentos de práctica'}
                </motion.h2>
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>

        {/* Contenido */}
        <AnimatePresence mode="wait">
          {!selectedGroup ? (
            <motion.div key="groups" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <GroupGrid groups={groups} isPhotography={isPhotography} onSelect={handleGroupSelect} />
            </motion.div>
          ) : (
            <motion.div key={`group-${selectedGroup._id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <MasonryGrid images={activeImages} onSelect={setLightboxIndex} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={activeImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i))}
            onNext={() => setLightboxIndex(i => (i !== null && i < activeImages.length - 1 ? i + 1 : i))}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
