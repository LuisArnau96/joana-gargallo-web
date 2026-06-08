'use client'

import { useModeContext } from '@/components/providers/ModeProvider'
import { siteSettings } from '@/lib/placeholder-data'
import { cn } from '@/lib/utils'

export function Footer() {
  const { mode } = useModeContext()
  const isPhotography = mode === 'photography'

  return (
    <footer
      className={cn(
        'py-10 px-4 sm:px-6 border-t transition-colors duration-700',
        isPhotography
          ? 'bg-[#1A1815] border-[#252220]'
          : 'bg-[#F7F3EE] border-[#DDD5C8]',
      )}
    >
      <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontWeight: 300,
            fontSize: '1rem',
            letterSpacing: '0.05em',
            color: isPhotography ? '#9E948A' : '#8B7B6B',
          }}
        >
          JOANA GARGALLO
        </span>

        <p className={cn('font-sans text-xs text-center', isPhotography ? 'text-[#9E948A]' : 'text-[#8B7B6B]')}>
          {siteSettings.address} · {siteSettings.email}
        </p>

        <p className={cn('font-sans text-xs', isPhotography ? 'text-[#9E948A]/50' : 'text-[#8B7B6B]/50')}>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
