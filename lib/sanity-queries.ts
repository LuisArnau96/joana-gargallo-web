import { client } from '@/sanity/client'
import type { HeroData, AboutData, Service, ScheduleData, GalleryGroup, SiteSettings } from '@/types'

export async function getHeroData(): Promise<HeroData> {
  const docs = await client.fetch(`*[_type == "hero"] {
    mode,
    "backgroundImage": backgroundImage.asset->url,
    isDark,
    objectPosition,
    headline,
    subheadline,
    ctaPrimary,
    ctaSecondary
  }`)

  const result: Partial<HeroData> = {}
  for (const doc of docs) {
    result[doc.mode as 'yoga' | 'photography'] = doc
  }
  return result as HeroData
}

export async function getAboutData(): Promise<AboutData> {
  const docs = await client.fetch(`*[_type == "about"] {
    mode,
    "profileImage": profileImage.asset->url,
    mainText,
    trajectory,
    highlights
  }`)

  const base: Partial<AboutData> = { profileImage: '' }
  for (const doc of docs) {
    const mode = doc.mode as 'yoga' | 'photography'
    base[mode] = {
      profileImage: doc.profileImage ?? '',
      philosophy: mode === 'yoga' ? doc.mainText : undefined,
      artisticStyle: mode === 'photography' ? doc.mainText : undefined,
      trajectory: doc.trajectory,
      highlights: doc.highlights ?? [],
    }
    if (!base.profileImage) base.profileImage = doc.profileImage ?? ''
  }
  return base as AboutData
}

export async function getServices(): Promise<Service[]> {
  return client.fetch(`*[_type == "service"] | order(order asc) {
    "_id": _id,
    category,
    group,
    title,
    description,
    icon,
    featured,
    order
  }`)
}

export async function getScheduleData(): Promise<ScheduleData> {
  const venues = await client.fetch(`*[_type == "schedule"] | order(order asc) {
    "name": venueName,
    "address": coalesce(address, venueAddress),
    slots[] {
      dayOfWeek,
      startTime,
      endTime,
      className
    }
  }`)
  return { venues }
}

export async function getGalleryGroups(): Promise<GalleryGroup[]> {
  return client.fetch(`*[_type == "galleryGroup"] | order(order asc) {
    "_id": _id,
    category,
    name,
    "coverImage": coverImage.asset->url,
    "images": images[] {
      "_id": _key,
      "src": image.asset->url,
      alt,
      "category": ^.category
    }
  }`)
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await client.fetch(`*[_type == "siteSettings"][0] {
    instagramHandle,
    email,
    address
  }`)
  return {
    siteName: 'Joana Gargallo',
    tagline: 'Profesora de Yoga · Fotógrafa',
    seoDescription: 'Joana Gargallo — Profesora de Yoga certificada y fotógrafa en Puerto de Sagunto (Valencia).',
    whatsappNumber: '34600000000',
    instagramHandle: doc?.instagramHandle ?? 'Joana.Yog',
    email: doc?.email ?? 'joanagargalloantoni@gmail.com',
    address: doc?.address ?? 'Puerto de Sagunto, Valencia 46520',
  }
}
