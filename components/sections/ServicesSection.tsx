'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, User, Sparkles, Mountain, Camera, Briefcase, CalendarDays,
} from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { services } from '@/lib/placeholder-data'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { stagger, fadeUp } from '@/styles/animations'
import { cn } from '@/lib/utils'
import type { Service } from '@/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users,
  User,
  Sparkles,
  Mountain,
  Camera,
  Briefcase,
  CalendarDays,
}

function ServiceCard({ service, isPhotography }: { service: Service; isPhotography: boolean }) {
  const Icon = iconMap[service.icon] ?? Sparkles

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'group flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-500',
        'hover:scale-[1.02] hover:shadow-lg',
        isPhotography
          ? 'bg-[#252220] border-[#302C28] hover:border-[#C4A882]/30 hover:bg-[#302C28]'
          : 'bg-[#FDFAF6] border-[#DDD5C8] hover:border-[#8B7355]/30 hover:bg-white',
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300',
          isPhotography
            ? 'bg-[#302C28] group-hover:bg-[#3D3830] text-[#C4A882]'
            : 'bg-[#EDE8E0] group-hover:bg-[#DDD5C8] text-[#6B7C5C]',
        )}
      >
        <Icon size={18} />
      </div>
      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            'font-sans font-medium text-base',
            isPhotography ? 'text-[#F0EAE0]' : 'text-[#2C2420]',
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            'font-sans font-light text-sm leading-relaxed',
            isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]',
          )}
        >
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'
  const filtered = services.filter((s) => s.category === mode).sort((a, b) => a.order - b.order)

  return (
    <section
      id="servicios"
      className={cn(
        'section-padding transition-colors duration-700',
        isPhotography ? 'bg-[#1A1815]' : 'bg-[#EDE8E0]',
      )}
    >
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <ScrollReveal>
              <span className={cn('label-text', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}>
                Servicios
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`services-title-${mode}`}
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
                  {isPhotography ? 'Qué puedo fotografiar para ti' : 'Cómo practicamos juntas'}
                </motion.h2>
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`services-grid-${mode}`}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((service) => (
              <ServiceCard key={service._id} service={service} isPhotography={isPhotography} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <ScrollReveal className="mt-12 flex justify-center">
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={cn(
              'px-7 py-3 rounded-full font-sans font-medium text-sm tracking-wide border transition-all duration-300 hover:scale-[1.02]',
              isPhotography
                ? 'border-[#C4A882]/40 text-[#C4A882] hover:bg-[#C4A882]/10'
                : 'border-[#8B7355]/40 text-[#8B7355] hover:bg-[#8B7355]/10',
            )}
          >
            {isPhotography ? 'Cuéntame tu proyecto' : 'Escríbeme'}
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
