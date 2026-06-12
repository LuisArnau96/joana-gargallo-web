'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useModeContext } from '@/components/providers/ModeProvider'
import { timelineItems } from '@/lib/placeholder-data'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { cn } from '@/lib/utils'

export function TimelineSection() {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'

  const filtered = timelineItems
    .filter((t) => t.category === mode || t.category === 'both')
    .sort((a, b) => a.order - b.order)

  return (
    <section
      id="formacion"
      className={cn(
        'section-padding transition-colors duration-700',
        isPhotography ? 'bg-[#252220]' : 'bg-[#F7F3EE]',
      )}
    >
      <div className="container-max max-w-3xl">
        <ScrollReveal className="mb-16">
          <span className={cn('label-text', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}>
            Trayectoria
          </span>
          <AnimatePresence mode="wait">
            <motion.h2
              key={`timeline-title-${mode}`}
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
              {isPhotography ? 'El camino hasta aquí' : 'Formación y experiencia'}
            </motion.h2>
          </AnimatePresence>
        </ScrollReveal>

        <div className="relative">
          {/* Línea vertical */}
          <div
            className={cn(
              'absolute left-[19px] top-2 bottom-2 w-px',
              isPhotography ? 'bg-[#302C28]' : 'bg-[#DDD5C8]',
            )}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`timeline-items-${mode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-0"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 pb-10"
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      'absolute left-0 top-1 w-10 h-10 rounded-full border-2 flex items-center justify-center',
                      isPhotography
                        ? 'bg-[#1A1815] border-[#C4A882]/40'
                        : 'bg-[#F7F3EE] border-[#8B7355]/40',
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs font-sans font-medium',
                        isPhotography ? 'text-[#C4A882]' : 'text-[#8B7355]',
                      )}
                    >
                      {item.year.toString().slice(2)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn('label-text', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}
                      >
                        {item.year}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        'font-sans font-medium text-base',
                        isPhotography ? 'text-[#F0EAE0]' : 'text-[#2C2420]',
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        'font-sans font-light text-sm leading-relaxed',
                        isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]',
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
