import { defineType, defineField } from 'sanity'

export const galleryGroupSchema = defineType({
  name: 'galleryGroup',
  title: 'Galería — Grupos',
  type: 'document',
  fields: [
    defineField({ name: 'category', title: 'Modo', type: 'string',
      options: { list: [{ title: 'Yoga', value: 'yoga' }, { title: 'Fotografía', value: 'photography' }] },
      validation: r => r.required(),
    }),
    defineField({ name: 'name', title: 'Nombre del grupo', type: 'string',
      description: 'Ej: Santté Fit, Yoga B&W, Golden Hour',
      validation: r => r.required(),
    }),
    defineField({ name: 'coverImage', title: 'Imagen de portada', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'images', title: 'Fotos', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } },
        { name: 'alt', title: 'Descripción', type: 'string' },
      ],
      preview: { select: { title: 'alt', media: 'image' } },
    }]}),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
  orderings: [{ title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'category', media: 'coverImage' } },
})
