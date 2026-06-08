'use client'

import { createContext, useContext, Suspense } from 'react'
import { useMode } from '@/hooks/useMode'
import { type Mode } from '@/types'

interface ModeContextValue {
  mode: Mode
  setMode: (m: Mode) => void
}

const ModeContext = createContext<ModeContextValue>({
  mode: 'yoga',
  setMode: () => {},
})

function ModeProviderInner({ children }: { children: React.ReactNode }) {
  const { mode, setMode } = useMode()
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ModeProviderInner>{children}</ModeProviderInner>
    </Suspense>
  )
}

export function useModeContext() {
  return useContext(ModeContext)
}
