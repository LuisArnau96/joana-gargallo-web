import type { HeroData, AboutData, Service, TimelineItem, ScheduleData, GalleryImage, GalleryGroup, SiteSettings } from '@/types'

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
    backgroundImage: '/images/hero-yoga.png',
    isDark: false,
    objectPosition: 'center 10%',
    headline: 'Encuentra tu equilibrio',
    subheadline:
      'Clases de yoga en Puerto de Sagunto pensadas para reconectar con tu cuerpo, tu respiración y tu calma interior.',
    ctaPrimary: 'Reservar clase',
    ctaSecondary: 'Conocer más',
  },
  photography: {
    backgroundImage: '/images/hero-visual.png',
    isDark: true,
    objectPosition: 'center 55%',
    headline: 'La imagen como lenguaje',
    subheadline:
      'Comunicación audiovisual que captura la quietud de los paisajes, la luz del amanecer y la autenticidad de las personas.',
    ctaPrimary: 'Ver portfolio',
    ctaSecondary: 'Trabajemos juntos',
  },
}

export const aboutData: AboutData = {
  profileImage: '/images/perfil-yoga.jpeg',
  yoga: {
    profileImage: '/images/perfil-yoga.jpeg',
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
    profileImage: '/images/perfil-fotografia.webp',
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
  // ── Fotografía de yoga ──
  {
    _id: 's8',
    category: 'photography',
    group: 'Fotografía de yoga',
    title: 'Sesiones de práctica',
    description:
      'Capturo la práctica en movimiento: posturas, ajustes, la energía del grupo. Fotos auténticas para profesoras de yoga y estudios.',
    icon: 'Sparkles',
    featured: true,
    order: 5,
  },
  {
    _id: 's9',
    category: 'photography',
    group: 'Fotografía de yoga',
    title: 'Clases y talleres',
    description:
      'Cobertura completa de tus clases grupales o talleres especiales. Imágenes para redes sociales, web y material promocional.',
    icon: 'Users',
    featured: true,
    order: 6,
  },
  {
    _id: 's10',
    category: 'photography',
    group: 'Fotografía de yoga',
    title: 'Retrato de profesora',
    description:
      'Sesión personal para construir tu imagen como profesora. Fotos que transmiten quién eres y cómo enseñas.',
    icon: 'User',
    featured: false,
    order: 7,
  },
  // ── Fotografía de producto ──
  {
    _id: 's11',
    category: 'photography',
    group: 'Fotografía de producto',
    title: 'Props y accesorios',
    description:
      'Fotografía de esterillas, bloques, correas y accesorios de yoga. Imágenes limpias y con estilo para tiendas y catálogos.',
    icon: 'Briefcase',
    featured: true,
    order: 8,
  },
  {
    _id: 's12',
    category: 'photography',
    group: 'Fotografía de producto',
    title: 'Ropa deportiva',
    description:
      'Fotografía de moda deportiva y ropa de yoga, en estudio o en exterior. Estética cuidada para marcas con valores.',
    icon: 'Camera',
    featured: true,
    order: 9,
  },
  {
    _id: 's13',
    category: 'photography',
    group: 'Fotografía de producto',
    title: 'Espacios y estudios',
    description:
      'Fotografía de interiores para centros de yoga, spas y espacios de bienestar. Mostramos la atmósfera que creas.',
    icon: 'Mountain',
    featured: false,
    order: 10,
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
        { dayOfWeek: 'X', startTime: '18:00', endTime: '19:00', className: 'Yin' },
        { dayOfWeek: 'J', startTime: '18:00', endTime: '19:00', className: 'Hatha' },
        { dayOfWeek: 'J', startTime: '19:00', endTime: '20:00', className: 'Vinyasa' },
      ],
    },
    // Para añadir un nuevo centro, copia este bloque y cambia name, address y slots:
    // {
    //   name: 'Nombre del centro',
    //   address: 'Dirección',
    //   slots: [
    //     { dayOfWeek: 'L', startTime: '10:00', endTime: '11:00', className: 'Hatha' },
    //   ],
    // },
  ],
}

export const galleryImages: GalleryImage[] = [
  {
    _id: 'g1',
    src: '/images/yoga-1.jpg',
    alt: 'Postura de extensión en el estudio',
    category: 'yoga',
    featured: true,
    order: 1,
    width: 1000,
    height: 1250,
  },
  {
    _id: 'g2',
    src: '/images/yoga-2.jpg',
    alt: 'Clase grupal — momento de guía',
    category: 'yoga',
    featured: true,
    order: 2,
    width: 1000,
    height: 1250,
  },
  {
    _id: 'g3',
    src: '/images/yoga-3.jpg',
    alt: 'Savasana en clase grupal',
    category: 'yoga',
    featured: false,
    order: 3,
    width: 1000,
    height: 1250,
  },
  {
    _id: 'g4',
    src: '/images/yoga-4.jpg',
    alt: 'Ajuste postural individual',
    category: 'yoga',
    featured: false,
    order: 4,
    width: 1000,
    height: 1250,
  },
  {
    _id: 'g5',
    src: '/images/foto-1.jpeg',
    alt: 'Flexión hacia adelante — B&W',
    category: 'photography',
    featured: true,
    order: 1,
    width: 480,
    height: 640,
  },
  {
    _id: 'g6',
    src: '/images/foto-2.jpeg',
    alt: 'Piernas al cielo — B&W',
    category: 'photography',
    featured: true,
    order: 2,
    width: 480,
    height: 640,
  },
  {
    _id: 'g7',
    src: '/images/foto-3.jpeg',
    alt: 'Trabajo en pareja — B&W',
    category: 'photography',
    featured: true,
    order: 3,
    width: 864,
    height: 1296,
  },
  {
    _id: 'g8',
    src: '/images/foto-4.jpeg',
    alt: 'Silueta al contraluz dorado',
    category: 'photography',
    featured: false,
    order: 4,
    width: 864,
    height: 1296,
  },
  {
    _id: 'g9',
    src: '/images/foto-5.jpeg',
    alt: 'Equilibrio sobre las rocas al atardecer',
    category: 'photography',
    featured: false,
    order: 5,
    width: 864,
    height: 1296,
  },
  {
    _id: 'g10',
    src: '/images/foto-6.jpeg',
    alt: 'Guerrero III en la playa dorada',
    category: 'photography',
    featured: false,
    order: 6,
    width: 864,
    height: 1296,
  },
]

export const galleryGroups: GalleryGroup[] = [
  // ── Yoga — grupos por centro ──
  {
    _id: 'gg1',
    category: 'yoga',
    name: 'Santté Fit',
    coverImage: '/images/yoga-3.jpg',
    images: [
      { _id: 'g1', src: '/images/yoga-1.jpg', alt: 'Postura de extensión en el estudio', category: 'yoga', featured: true, order: 1 },
      { _id: 'g2', src: '/images/yoga-2.jpg', alt: 'Clase grupal — momento de guía',      category: 'yoga', featured: true, order: 2 },
      { _id: 'g3', src: '/images/yoga-3.jpg', alt: 'Savasana en clase grupal',             category: 'yoga', featured: false, order: 3 },
      { _id: 'g4', src: '/images/yoga-4.jpg', alt: 'Ajuste postural individual',           category: 'yoga', featured: false, order: 4 },
    ],
  },
  // Para añadir otro centro: copia el bloque anterior y cambia _id, name, coverImage e images

  // ── Fotografía — grupos por proyecto ──
  {
    _id: 'gg2',
    category: 'photography',
    name: 'Yoga B&W',
    coverImage: '/images/foto-3.jpeg',
    images: [
      { _id: 'g5', src: '/images/foto-1.jpeg', alt: 'Flexión hacia adelante — B&W', category: 'photography', featured: true, order: 1 },
      { _id: 'g6', src: '/images/foto-2.jpeg', alt: 'Piernas al cielo — B&W',       category: 'photography', featured: true, order: 2 },
      { _id: 'g7', src: '/images/foto-3.jpeg', alt: 'Trabajo en pareja — B&W',      category: 'photography', featured: true, order: 3 },
    ],
  },
  {
    _id: 'gg3',
    category: 'photography',
    name: 'Golden Hour',
    coverImage: '/images/foto-5.jpeg',
    images: [
      { _id: 'g8',  src: '/images/foto-4.jpeg', alt: 'Silueta al contraluz dorado',             category: 'photography', featured: false, order: 1 },
      { _id: 'g9',  src: '/images/foto-5.jpeg', alt: 'Equilibrio sobre las rocas al atardecer', category: 'photography', featured: false, order: 2 },
      { _id: 'g10', src: '/images/foto-6.jpeg', alt: 'Guerrero III en la playa dorada',         category: 'photography', featured: false, order: 3 },
    ],
  },
  // Para añadir un proyecto: copia un bloque y cambia _id, name, coverImage e images
]
