'use client'

import { motion } from 'framer-motion'
import { Mail, ExternalLink } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import type { SiteSettings } from '@/types'
import { cn } from '@/lib/utils'

function ContactLink({
  href,
  icon: Icon,
  label,
  sublabel,
  isPhotography,
}: {
  href: string
  icon: React.ComponentType<{ size?: number }>
  label: string
  sublabel: string
  isPhotography: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]',
        isPhotography
          ? 'border-[#302C28] bg-[#252220] hover:border-[#C4A882]/30 hover:bg-[#302C28]'
          : 'border-[#DDD5C8] bg-[#FDFAF6] hover:border-[#8B7355]/30 hover:bg-white',
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
          isPhotography ? 'bg-[#302C28] text-[#C4A882]' : 'bg-[#EDE8E0] text-[#6B7C5C]',
        )}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className={cn('font-sans font-medium text-sm', isPhotography ? 'text-[#F0EAE0]' : 'text-[#2C2420]')}>
          {label}
        </p>
        <p className={cn('font-sans text-xs', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}>
          {sublabel}
        </p>
      </div>
    </a>
  )
}

export function ContactSection({ siteSettings }: { siteSettings: SiteSettings }) {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'

  return (
    <section
      id="contacto"
      className={cn(
        'section-padding transition-colors duration-700',
        isPhotography ? 'bg-[#252220]' : 'bg-[#EDE8E0]',
      )}
    >
      <div className="container-max max-w-2xl">
        <ScrollReveal className="mb-14">
          <span className={cn('label-text', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}>
            Contacto
          </span>
          <h2
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
            Hablemos
          </h2>
          <p
            className={cn(
              'font-sans font-light text-sm mt-3 max-w-md leading-relaxed',
              isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]',
            )}
          >
            {isPhotography
              ? 'Cuéntame tu proyecto, sesión o idea. Respondo siempre en menos de 24h.'
              : 'Tienes alguna duda sobre las clases, quieres reservar o simplemente quieres saber más. Escríbeme.'}
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <ContactLink
            href={`https://instagram.com/${siteSettings.instagramHandle}`}
            icon={ExternalLink}
            label={`@${siteSettings.instagramHandle}`}
            sublabel="Instagram · DM siempre abierto"
            isPhotography={isPhotography}
          />
          <ContactLink
            href={`mailto:${siteSettings.email}`}
            icon={Mail}
            label={siteSettings.email}
            sublabel="Email"
            isPhotography={isPhotography}
          />
        </motion.div>
      </div>
    </section>
  )
}
