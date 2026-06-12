'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle, ExternalLink } from 'lucide-react'
import { useModeContext } from '@/components/providers/ModeProvider'
import { siteSettings } from '@/lib/placeholder-data'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Tu nombre es muy corto'),
  email: z.string().email('Email no válido'),
  message: z.string().min(10, 'Cuéntame un poco más'),
})

type ContactFormData = z.infer<typeof contactSchema>

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
        <p
          className={cn(
            'font-sans font-medium text-sm',
            isPhotography ? 'text-[#F0EAE0]' : 'text-[#2C2420]',
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            'font-sans text-xs',
            isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]',
          )}
        >
          {sublabel}
        </p>
      </div>
    </a>
  )
}

export function ContactSection() {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      reset()
    } catch {
      setError('Algo salió mal. Escríbeme directamente a Instagram o por email.')
    } finally {
      setSending(false)
    }
  }

  const inputClass = cn(
    'w-full rounded-xl px-4 py-3 font-sans text-sm outline-none transition-all duration-300',
    'border focus:ring-2',
    isPhotography
      ? 'bg-[#252220] border-[#302C28] text-[#F0EAE0] placeholder-[#9E948A] focus:border-[#C4A882]/50 focus:ring-[#C4A882]/10'
      : 'bg-[#FDFAF6] border-[#DDD5C8] text-[#2C2420] placeholder-[#8B7B6B] focus:border-[#8B7355]/50 focus:ring-[#8B7355]/10',
  )

  return (
    <section
      id="contacto"
      className={cn(
        'section-padding transition-colors duration-700',
        isPhotography ? 'bg-[#252220]' : 'bg-[#EDE8E0]',
      )}
    >
      <div className="container-max max-w-5xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Canales directos */}
          <div className="flex flex-col gap-4">
            <p className={cn('label-text mb-2', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}>
              Canales directos
            </p>

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
          </div>

          {/* Formulario */}
          <div>
            <p className={cn('label-text mb-6', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}>
              O escríbeme aquí
            </p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    'flex flex-col items-center justify-center gap-4 py-16 rounded-2xl border text-center',
                    isPhotography
                      ? 'bg-[#252220] border-[#302C28]'
                      : 'bg-[#FDFAF6] border-[#DDD5C8]',
                  )}
                >
                  <CheckCircle
                    size={40}
                    className={isPhotography ? 'text-[#8B9E8A]' : 'text-[#6B7C5C]'}
                  />
                  <div>
                    <p
                      className={cn(
                        'font-serif font-light text-xl',
                        isPhotography ? 'text-[#F0EAE0]' : 'text-[#2C2420]',
                      )}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Mensaje enviado
                    </p>
                    <p
                      className={cn(
                        'font-sans text-sm mt-1',
                        isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]',
                      )}
                    >
                      Te responderé pronto.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <input
                      {...register('name')}
                      placeholder="Tu nombre"
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1 font-sans">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Tu email"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1 font-sans">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <textarea
                      {...register('message')}
                      placeholder={
                        isPhotography
                          ? 'Cuéntame tu idea o proyecto...'
                          : 'Pregunta lo que quieras sobre las clases...'
                      }
                      rows={4}
                      className={cn(inputClass, 'resize-none')}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 font-sans">{errors.message.message}</p>
                    )}
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 font-sans">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className={cn(
                      'flex items-center justify-center gap-2 py-3 px-6 rounded-full font-sans font-medium text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-60',
                      isPhotography
                        ? 'bg-[#C4A882] text-[#1A1815] hover:bg-[#D4B892]'
                        : 'bg-[#8B7355] text-white hover:bg-[#6B5740]',
                    )}
                  >
                    <Send size={14} />
                    {sending ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
