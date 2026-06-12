'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { scheduleData } from '@/lib/placeholder-data'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { getDayLabel } from '@/lib/utils'

const DAY_ORDER = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const CLASS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Hatha:   { bg: 'rgba(107,124,92,0.12)', text: '#4E5E42', dot: '#6B7C5C' },
  Vinyasa: { bg: 'rgba(139,115,85,0.12)', text: '#6B5740', dot: '#8B7355' },
}

export function ScheduleSection() {
  const { mode } = useModeContext()
  if (mode === 'photography') return null

  const scrollToContact = () =>
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="horarios" className="section-padding" style={{ backgroundColor: '#EDE8E0' }}>
      <div className="container-max max-w-4xl">
        <ScrollReveal className="mb-14">
          <span className="label-text" style={{ color: '#8B7B6B' }}>Horarios</span>
          <h2
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              marginTop: '0.5rem',
              color: '#2C2420',
            }}
          >
            Cuándo y dónde practicamos
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          {scheduleData.venues.map((venue, vi) => {
            const slotsByDay = venue.slots.reduce<Record<string, typeof venue.slots>>(
              (acc, slot) => {
                if (!acc[slot.dayOfWeek]) acc[slot.dayOfWeek] = []
                acc[slot.dayOfWeek].push(slot)
                return acc
              },
              {},
            )

            const sortedDays = Object.keys(slotsByDay).sort(
              (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b),
            )

            return (
              <motion.div
                key={vi}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl border"
                style={{ backgroundColor: '#FDFAF6', borderColor: '#DDD5C8' }}
              >
                {/* Header venue */}
                <div className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center gap-1" style={{ borderColor: '#DDD5C8' }}>
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin size={13} style={{ color: '#8B7355' }} />
                    <span className="font-sans font-medium text-sm" style={{ color: '#2C2420' }}>
                      {venue.name}
                    </span>
                  </div>
                  <span className="font-sans text-xs" style={{ color: '#8B7B6B' }}>{venue.address}</span>
                </div>

                {/* Días */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sortedDays.map((day) => (
                    <div key={day} className="flex flex-col gap-2">
                      <span className="label-text" style={{ color: '#8B7355' }}>
                        {getDayLabel(day)}
                      </span>
                      <div className="flex flex-col gap-2">
                        {slotsByDay[day].map((slot, si) => {
                          const colors = CLASS_COLORS[slot.className ?? ''] ?? CLASS_COLORS.Hatha
                          return (
                            <div
                              key={si}
                              className="flex items-center justify-between rounded-xl px-3 py-2.5"
                              style={{ backgroundColor: '#EDE8E0' }}
                            >
                              <div className="flex items-center gap-2">
                                <Clock size={11} style={{ color: '#8B7B6B' }} />
                                <span className="font-sans text-sm" style={{ color: '#4A3D2C' }}>
                                  {slot.startTime} – {slot.endTime}
                                </span>
                              </div>
                              {slot.className && (
                                <span
                                  className="font-sans font-medium rounded-full px-2.5 py-0.5"
                                  style={{
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.06em',
                                    backgroundColor: colors.bg,
                                    color: colors.text,
                                  }}
                                >
                                  {slot.className}
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA → contacto */}
        <ScrollReveal className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={scrollToContact}
            className="px-7 py-3 rounded-full font-sans font-medium text-sm tracking-wide text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: '#8B7355' }}
          >
            Reservar plaza
          </button>
          <p className="font-sans text-sm text-center sm:text-left" style={{ color: '#8B7B6B' }}>
            ¿Prefieres una clase privada?{' '}
            <button
              onClick={scrollToContact}
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              style={{ color: '#8B7355' }}
            >
              Escríbeme
            </button>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
