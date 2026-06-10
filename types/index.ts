export type Mode = 'yoga' | 'photography'

export interface HeroContent {
  backgroundImage: string
  isDark: boolean  // true = foto oscura → texto blanco; false = foto clara → texto oscuro
  objectPosition?: string
  headline: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary?: string
}

export interface HeroData {
  yoga: HeroContent
  photography: HeroContent
}

export interface AboutContent {
  profileImage?: string
  philosophy?: string
  artisticStyle?: string
  trajectory: string
  highlights: string[]
}

export interface AboutData {
  profileImage: string
  yoga: AboutContent
  photography: AboutContent
}

export interface Service {
  _id: string
  category: 'yoga' | 'photography'
  title: string
  description: string
  icon: string
  featured: boolean
  order: number
}

export interface TimelineItem {
  _id: string
  category: 'yoga' | 'photography' | 'both'
  year: number
  title: string
  description: string
  order: number
}

export interface ScheduleSlot {
  dayOfWeek: string
  startTime: string
  endTime: string
  className?: string
}

export interface Venue {
  name: string
  address: string
  slots: ScheduleSlot[]
}

export interface ScheduleData {
  venues: Venue[]
}

export interface GalleryImage {
  _id: string
  src: string
  alt: string
  category: 'yoga' | 'photography'
  featured: boolean
  order: number
  width?: number
  height?: number
}

export interface SiteSettings {
  siteName: string
  tagline: string
  seoDescription: string
  whatsappNumber: string
  instagramHandle: string
  email: string
  address: string
}
