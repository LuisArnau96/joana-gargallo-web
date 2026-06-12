import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Ajustes del sitio',
  type: 'document',
  fields: [
    defineField({ name: 'instagramHandle', title: 'Usuario de Instagram', type: 'string' }),
    defineField({ name: 'email', title: 'Email de contacto', type: 'string' }),
    defineField({ name: 'address', title: 'Dirección', type: 'string' }),
  ],
  preview: { select: { title: 'email' } },
})
