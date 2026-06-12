'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { type Mode } from '@/types'

export function useMode(): { mode: Mode; setMode: (m: Mode) => void } {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const raw = searchParams.get('modo')
  const mode: Mode = raw === 'fotografia' ? 'photography' : 'yoga'

  const setMode = useCallback(
    (m: Mode) => {
      const params = new URLSearchParams(window.location.search)
      if (m === 'photography') {
        params.set('modo', 'fotografia')
      } else {
        params.delete('modo')
      }
      const query = params.toString()
      router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    },
    [router, pathname],
  )

  return { mode, setMode }
}
