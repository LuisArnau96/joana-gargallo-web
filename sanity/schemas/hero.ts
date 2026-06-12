import { defineType, defineField } from 'sanity'

export const heroSchema = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({ name: 'mode', title: 'Modo', type: 'string',
      options: { list: [{ title: 'Yoga', value: 'yoga' }, { title: 'Fotografía', value: 'photography' }] },
      validation: r => r.required(),
    }),
    defineField({ name: 'backgroundImage', title: 'Imagen de fondo', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'isDark', title: 'Foto oscura (texto blanco)', type: 'boolean', initialValue: true }),
    defineField({ name: 'headline', title: 'Titular', type: 'string', validation: r => r.required() }),
    defineField({ name: 'subheadline', title: 'Subtitular', type: 'text', rows: 2 }),
    defineField({ name: 'ctaPrimary', title: 'Botón principal', type: 'string' }),
    defineField({ name: 'ctaSecondary', title: 'Botón secundario', type: 'string' }),
  ],
  preview: { select: { title: 'mode', media: 'backgroundImage' } },
})
