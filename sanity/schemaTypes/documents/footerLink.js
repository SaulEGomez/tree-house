import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footerLink',
  title: 'Footer Link',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'url',
      title: 'Target',
      type: 'string', // keep string so you can use anchors (`contact`) or paths (`/about`) or full URLs
      description: 'Anchor id (e.g. contact), internal path (/about), or full URL (https://...)',
      validation: R => R.required(),
    }),
  ],
  preview: {
    select: { title: 'title', url: 'url' },
    prepare: ({ title, url }) => ({ title, subtitle: url }),
  },
})
