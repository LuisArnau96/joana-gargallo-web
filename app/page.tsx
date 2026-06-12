import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { ScheduleSection } from '@/components/sections/ScheduleSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { ContactSection } from '@/components/sections/ContactSection'
import {
  getHeroData,
  getAboutData,
  getServices,
  getScheduleData,
  getGalleryGroups,
  getSiteSettings,
} from '@/lib/sanity-queries'
import {
  heroData as fallbackHero,
  aboutData as fallbackAbout,
  services as fallbackServices,
  scheduleData as fallbackSchedule,
  galleryGroups as fallbackGallery,
  siteSettings as fallbackSettings,
} from '@/lib/placeholder-data'

export const revalidate = 60

export default async function Home() {
  const [heroData, aboutData, services, scheduleData, galleryGroups, siteSettings] =
    await Promise.all([
      getHeroData().catch(() => fallbackHero),
      getAboutData().catch(() => fallbackAbout),
      getServices().catch(() => fallbackServices),
      getScheduleData().catch(() => fallbackSchedule),
      getGalleryGroups().catch(() => fallbackGallery),
      getSiteSettings().catch(() => fallbackSettings),
    ])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection heroData={heroData} />
        <AboutSection aboutData={aboutData} />
        <ServicesSection services={services} />
        <TimelineSection />
        <ScheduleSection scheduleData={scheduleData} />
        <GallerySection galleryGroups={galleryGroups} />
        <ContactSection siteSettings={siteSettings} />
      </main>
      <Footer />
    </>
  )
}
