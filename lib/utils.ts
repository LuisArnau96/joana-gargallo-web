import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: string): string {
  return time
}

export function getDayLabel(day: string): string {
  const days: Record<string, string> = {
    L: 'Lunes',
    M: 'Martes',
    X: 'Miércoles',
    J: 'Jueves',
    V: 'Viernes',
    S: 'Sábado',
    D: 'Domingo',
  }
  return days[day] ?? day
}
