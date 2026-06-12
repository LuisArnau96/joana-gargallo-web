import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({ name: 'category', title: 'Categoría', type: 'string',
      options: { list: [{ title: 'Yoga', value: 'yoga' }, { title: 'Fotografía', value: 'photography' }] },
      validation: r => r.required(),
    }),
    defineField({ name: 'group', title: 'Grupo (solo fotografía)', type: 'string',
      description: 'Ej: Fotografía de yoga, Fotografía de producto',
    }),
    defineField({ name: 'title', title: 'Nombre', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'icon', title: 'Icono', type: 'string',
      options: { list: ['Users', 'User', 'Sparkles', 'Mountain', 'Camera', 'Briefcase', 'CalendarDays'] },
    }),
    defineField({ name: 'featured', title: 'Destacado', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
  orderings: [{ title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'category' } },
})
