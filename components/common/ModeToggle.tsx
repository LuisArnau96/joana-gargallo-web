'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useModeContext } from '@/components/providers/ModeProvider'
import { type Mode } from '@/types'
import { cn } from '@/lib/utils'

interface ModeToggleProps {
  variant?: 'hero' | 'compact'
  className?: string
}

export function ModeToggle({ variant = 'hero', className }: ModeToggleProps) {
  const { mode, setMode } = useModeContext()
  const isPhotography = mode === 'photography'

  const handleToggle = (newMode: Mode) => {
    if (newMode !== mode) setMode(newMode)
  }

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center gap-1 rounded-full border p-1',
          'border-white/20 bg-white/10 backdrop-blur-sm',
          className,
        )}
      >
        {(['yoga', 'photography'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => handleToggle(m)}
            className={cn(
              'relative px-3 py-1 rounded-full text-xs font-sans font-medium tracking-wide transition-colors duration-300',
              mode === m ? 'text-tierra-800' : 'text-white/70 hover:text-white',
            )}
          >
            {mode === m && (
              <motion.span
                layoutId="toggle-bg-compact"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 capitalize">
              {m === 'yoga' ? 'Yoga' : 'Fotografía'}
            </span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <p className="label-text text-white/50">Elige tu experiencia</p>

      <div
        className={cn(
          'relative flex items-center rounded-full border p-1.5',
          'border-white/25 bg-white/10 backdrop-blur-md',
          'shadow-[0_8px_32px_rgba(0,0,0,0.15)]',
        )}
        style={{ minWidth: 260 }}
      >
        <motion.div
          className={cn(
            'absolute inset-1.5 w-[calc(50%-6px)] rounded-full',
            isPhotography ? 'bg-carbon-900/90' : 'bg-white/95',
          )}
          animate={{ x: isPhotography ? '100%' : '0%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 32 }}
        />

        {(['yoga', 'photography'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => handleToggle(m)}
            className={cn(
              'relative z-10 flex-1 py-2.5 px-6 rounded-full',
              'font-sans font-medium text-sm tracking-wide',
              'transition-colors duration-500',
              mode === m
                ? m === 'yoga'
                  ? 'text-tierra-700'
                  : 'text-beige-100'
                : 'text-white/70 hover:text-white',
            )}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${m}-${mode === m}`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2"
              >
                {m === 'yoga' ? (
                  <>
                    <span>🌿</span>
                    <span>Yoga</span>
                  </>
                ) : (
                  <>
                    <span>📷</span>
                    <span>Fotografía</span>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  )
}
