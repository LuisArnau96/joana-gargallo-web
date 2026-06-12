import { defineType, defineField } from 'sanity'

export const aboutSchema = defineType({
  name: 'about',
  title: 'Sobre mí',
  type: 'document',
  fields: [
    defineField({ name: 'mode', title: 'Modo', type: 'string',
      options: { list: [{ title: 'Yoga', value: 'yoga' }, { title: 'Fotografía', value: 'photography' }] },
      validation: r => r.required(),
    }),
    defineField({ name: 'profileImage', title: 'Foto de perfil', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'mainText', title: 'Texto principal (cita)', type: 'text', rows: 3 }),
    defineField({ name: 'trajectory', title: 'Trayectoria', type: 'text', rows: 4 }),
    defineField({ name: 'highlights', title: 'Puntos destacados', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { select: { title: 'mode', media: 'profileImage' } },
})
