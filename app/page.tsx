import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { ScheduleSection } from '@/components/sections/ScheduleSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TimelineSection />
        <ScheduleSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
