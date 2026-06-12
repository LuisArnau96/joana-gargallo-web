import { defineType, defineField } from 'sanity'

export const scheduleSchema = defineType({
  name: 'schedule',
  title: 'Horarios',
  type: 'document',
  fields: [
    defineField({ name: 'venueName', title: 'Centro', type: 'string', validation: r => r.required() }),
    defineField({ name: 'address', title: 'Dirección', type: 'string' }),
    defineField({ name: 'slots', title: 'Clases', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'dayOfWeek', title: 'Día', type: 'string',
          options: { list: [
            { title: 'Lunes', value: 'L' }, { title: 'Martes', value: 'M' },
            { title: 'Miércoles', value: 'X' }, { title: 'Jueves', value: 'J' },
            { title: 'Viernes', value: 'V' }, { title: 'Sábado', value: 'S' },
            { title: 'Domingo', value: 'D' },
          ]},
        },
        { name: 'startTime', title: 'Hora inicio', type: 'string', placeholder: '18:00' },
        { name: 'endTime', title: 'Hora fin', type: 'string', placeholder: '19:00' },
        { name: 'className', title: 'Tipo de clase', type: 'string',
          options: { list: ['Hatha', 'Vinyasa', 'Yin', 'Restaurativo'] },
        },
      ],
      preview: { select: { title: 'dayOfWeek', subtitle: 'className' } },
    }]}),
  ],
  preview: { select: { title: 'venueName', subtitle: 'address' } },
})
