import type { HeroData, AboutData, Service, TimelineItem, ScheduleData, GalleryImage, SiteSettings } from '@/types'

export const siteSettings: SiteSettings = {
  siteName: 'Joana Gargallo',
  tagline: 'Profesora de Yoga · Fotógrafa',
  seoDescription:
    'Joana Gargallo — Profesora de Yoga certificada y fotógrafa en Puerto de Sagunto (Valencia). Clases grupales, privadas y talleres. Fotografía de naturaleza, retrato y marca personal.',
  whatsappNumber: '34600000000',
  instagramHandle: 'Joana.Yog',
  email: 'joanagargalloantoni@gmail.com',
  address: 'Puerto de Sagunto, Valencia 46520',
}

export const heroData: HeroData = {
  yoga: {
    backgroundImage:
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1920&q=80',
    headline: 'Encuentra tu equilibrio',
    subheadline:
      'Clases de yoga en Puerto de Sagunto pensadas para reconectar con tu cuerpo, tu respiración y tu calma interior.',
    ctaPrimary: 'Reservar clase',
    ctaSecondary: 'Conocer más',
  },
  photography: {
    backgroundImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    headline: 'La imagen como lenguaje',
    subheadline:
      'Comunicación audiovisual que captura la quietud de los paisajes, la luz del amanecer y la autenticidad de las personas.',
    ctaPrimary: 'Ver portfolio',
    ctaSecondary: 'Trabajemos juntos',
  },
}

export const aboutData: AboutData = {
  profileImage:
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  yoga: {
    philosophy:
      'El yoga no es una práctica que se hace sobre la esterilla y se deja allí. Es una forma de habitar el mundo con más consciencia, más amabilidad y más presencia. Eso es lo que quiero compartir contigo.',
    trajectory:
      'Llegué al yoga buscando calma y encontré mucho más. Tras años de práctica personal, completé mi formación de 200 horas RYT y desde entonces enseño en Puerto de Sagunto, acompañando a personas que quieren sentirse mejor en su propio cuerpo.',
    highlights: [
      'Certificación 200h RYT',
      'Especialización en Yin Yoga',
      'Yoga Terapéutico',
      'Más de 3 años enseñando',
    ],
  },
  photography: {
    artisticStyle:
      'Mi fotografía nace de la misma mirada que el yoga me ha enseñado: parar, observar, esperar el momento. Me interesan la luz natural, los paisajes que invitan a respirar y los retratos donde la persona se muestra tal como es.',
    trajectory:
      'La fotografía y el yoga comparten algo esencial: los dos requieren presencia. Empecé fotografiando los lugares donde practicaba y poco a poco encontré mi propio lenguaje visual, siempre cerca de la naturaleza y la autenticidad.',
    highlights: [
      'Fotografía de naturaleza y paisaje',
      'Retrato natural y editorial',
      'Fotografía de marca personal',
      'Eventos y talleres de yoga',
    ],
  },
}

export const services: Service[] = [
  {
    _id: 's1',
    category: 'yoga',
    title: 'Clases grupales',
    description:
      'Sesiones en grupo en Clínica Santé, Puerto de Sagunto. Un espacio seguro para practicar, respirar y desconectar de la rutina junto a otras personas.',
    icon: 'Users',
    featured: true,
    order: 1,
  },
  {
    _id: 's2',
    category: 'yoga',
    title: 'Clases privadas',
    description:
      'Práctica personalizada adaptada a tus necesidades, horarios y objetivos. Ideal si buscas atención individualizada o quieres avanzar más rápido.',
    icon: 'User',
    featured: true,
    order: 2,
  },
  {
    _id: 's3',
    category: 'yoga',
    title: 'Talleres',
    description:
      'Sesiones especiales temáticas: Yin Yoga, respiración consciente, yoga restaurativo. Fechas anunciadas en Instagram.',
    icon: 'Sparkles',
    featured: false,
    order: 3,
  },
  {
    _id: 's4',
    category: 'photography',
    title: 'Fotografía de naturaleza',
    description:
      'Paisajes, flora y la luz de la hora dorada. Imágenes que transmiten la misma calma que se siente al estar en la naturaleza.',
    icon: 'Mountain',
    featured: true,
    order: 1,
  },
  {
    _id: 's5',
    category: 'photography',
    title: 'Retrato',
    description:
      'Sesiones de retrato en exterior con luz natural. Sin poses forzadas — buscamos lo auténtico, lo que te hace ser tú.',
    icon: 'Camera',
    featured: true,
    order: 2,
  },
  {
    _id: 's6',
    category: 'photography',
    title: 'Marca personal',
    description:
      'Imágenes para tu proyecto, negocio o presencia online. Fotos que cuentan quién eres y qué haces, con honestidad y estilo.',
    icon: 'Briefcase',
    featured: true,
    order: 3,
  },
  {
    _id: 's7',
    category: 'photography',
    title: 'Eventos',
    description:
      'Cobertura de talleres, retiros y eventos de bienestar. Capturo los momentos auténticos que ocurren cuando la gente está presente.',
    icon: 'CalendarDays',
    featured: false,
    order: 4,
  },
]

export const timelineItems: TimelineItem[] = [
  {
    _id: 't1',
    category: 'yoga',
    year: 2024,
    title: 'Especialización en Yin Yoga',
    description: 'Formación avanzada en Yin Yoga y técnicas de fascia. Una práctica más lenta, más profunda, más transformadora.',
    order: 1,
  },
  {
    _id: 't2',
    category: 'yoga',
    year: 2023,
    title: 'Apertura en Clínica Santé',
    description: 'Inicio de clases regulares en Clínica Santé, Puerto de Sagunto. Primeros grupos, primeras comunidades.',
    order: 2,
  },
  {
    _id: 't3',
    category: 'yoga',
    year: 2022,
    title: 'Certificación 200h RYT',
    description: 'Formación completa de 200 horas en Hatha Yoga. El inicio de un camino como profesora.',
    order: 3,
  },
  {
    _id: 't4',
    category: 'yoga',
    year: 2019,
    title: 'Primeros pasos en yoga',
    description: 'El yoga llega como herramienta de calma en un momento de búsqueda personal. Primer encuentro con la práctica.',
    order: 4,
  },
  {
    _id: 't5',
    category: 'photography',
    year: 2023,
    title: 'Fotografía de marca personal',
    description: 'Primeros proyectos de fotografía para marcas de bienestar y profesionales del sector.',
    order: 1,
  },
  {
    _id: 't6',
    category: 'photography',
    year: 2021,
    title: 'Portfolio de naturaleza',
    description: 'Construcción del portfolio fotográfico. Los paisajes de la Comunidad Valenciana como primer gran tema.',
    order: 2,
  },
  {
    _id: 't7',
    category: 'photography',
    year: 2020,
    title: 'La cámara como cuaderno',
    description: 'La fotografía como extensión del yoga: aprender a mirar, a esperar, a capturar lo esencial.',
    order: 3,
  },
]

export const scheduleData: ScheduleData = {
  venues: [
    {
      name: 'Santté Fit',
      address: 'Puerto de Sagunto, Valencia',
      slots: [
        { dayOfWeek: 'M', startTime: '18:00', endTime: '19:00', className: 'Hatha' },
        { dayOfWeek: 'M', startTime: '19:00', endTime: '20:00', className: 'Vinyasa' },
        { dayOfWeek: 'J', startTime: '18:00', endTime: '19:00', className: 'Hatha' },
        { dayOfWeek: 'J', startTime: '19:00', endTime: '20:00', className: 'Vinyasa' },
      ],
    },
  ],
}

export const galleryImages: GalleryImage[] = [
  {
    _id: 'g1',
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    alt: 'Práctica de yoga al amanecer',
    category: 'yoga',
    featured: true,
    order: 1,
    width: 800,
    height: 1067,
  },
  {
    _id: 'g2',
    src: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80',
    alt: 'Postura de equilibrio en la naturaleza',
    category: 'yoga',
    featured: true,
    order: 2,
    width: 800,
    height: 600,
  },
  {
    _id: 'g3',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    alt: 'Meditación en exterior',
    category: 'yoga',
    featured: false,
    order: 3,
    width: 800,
    height: 533,
  },
  {
    _id: 'g4',
    src: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80',
    alt: 'Clase grupal de yoga',
    category: 'yoga',
    featured: false,
    order: 4,
    width: 800,
    height: 1200,
  },
  {
    _id: 'g5',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Montañas al atardecer',
    category: 'photography',
    featured: true,
    order: 1,
    width: 800,
    height: 533,
  },
  {
    _id: 'g6',
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    alt: 'Luz dorada en el bosque',
    category: 'photography',
    featured: true,
    order: 2,
    width: 800,
    height: 1067,
  },
  {
    _id: 'g7',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    alt: 'Sendero entre árboles',
    category: 'photography',
    featured: true,
    order: 3,
    width: 800,
    height: 533,
  },
  {
    _id: 'g8',
    src: 'https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=800&q=80',
    alt: 'Amanecer en la costa',
    category: 'photography',
    featured: false,
    order: 4,
    width: 800,
    height: 600,
  },
  {
    _id: 'g9',
    src: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80',
    alt: 'Retrato al natural',
    category: 'photography',
    featured: false,
    order: 5,
    width: 800,
    height: 1067,
  },
]
