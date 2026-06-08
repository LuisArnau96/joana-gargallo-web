'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { galleryImages } from '@/lib/placeholder-data'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/types'

function MasonryGrid({
  images,
  onSelect,
  isPhotography,
}: {
  images: GalleryImage[]
  onSelect: (i: number) => void
  isPhotography: boolean
}) {
  const col1 = images.filter((_, i) => i % 3 === 0)
  const col2 = images.filter((_, i) => i % 3 === 1)
  const col3 = images.filter((_, i) => i % 3 === 2)

  const renderCol = (imgs: GalleryImage[], offset: number) =>
    imgs.map((img, ci) => {
      const globalIndex = images.indexOf(img)
      return (
        <motion.div
          key={img._id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onSelect(globalIndex)}
          className="group relative overflow-hidden rounded-xl cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className={cn(
              'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
              'flex items-center justify-center',
              isPhotography ? 'bg-[#1A1815]/50' : 'bg-[#2C2420]/40',
            )}
          >
            <ZoomIn size={24} className="text-white" />
          </div>
        </motion.div>
      )
    })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <div className="flex flex-col gap-3">{renderCol(col1, 0)}</div>
      <div className="flex flex-col gap-3 mt-6">{renderCol(col2, 1)}</div>
      <div className="hidden md:flex flex-col gap-3 mt-12">{renderCol(col3, 2)}</div>
    </div>
  )
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
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
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X size={24} />
      </button>

      {/* Nav prev */}
      {index > 0 && (
        <button
          className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Anterior"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Imagen */}
      <motion.div
        key={image._id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-4xl max-h-[85vh] px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
        />
        {image.alt && (
          <p className="text-center text-white/50 text-sm mt-3 font-sans">{image.alt}</p>
        )}
      </motion.div>

      {/* Nav next */}
      {index < images.length - 1 && (
        <button
          className="absolute right-4 text-white/70 hover:text-white transition-colors p-2"
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Siguiente"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs font-sans">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = galleryImages
    .filter((img) => img.category === mode)
    .sort((a, b) => a.order - b.order)

  return (
    <section
      id="galeria"
      className={cn(
        'section-padding transition-colors duration-700',
        isPhotography ? 'bg-[#1A1815]' : 'bg-[#F7F3EE]',
      )}
    >
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <ScrollReveal>
              <span className={cn('label-text', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}>
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
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
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
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`gallery-${mode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MasonryGrid
              images={filtered}
              onSelect={setLightboxIndex}
              isPhotography={isPhotography}
            />
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
            onPrev={() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
            onNext={() =>
              setLightboxIndex((i) =>
                i !== null && i < filtered.length - 1 ? i + 1 : i,
              )
            }
          />
        )}
      </AnimatePresence>
    </section>
  )
}
