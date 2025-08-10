// sanity/schemaTypes/components/menuItem.js
import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'menuItem',
  title: 'Menu',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subLinks',
      title: 'Sub Links',
      type: 'array',
      of: [{ type: 'footerLink' }], // uses your footerLink {title, url}
      validation: (Rule) => Rule.min(1),
      options: { sortable: true },
    }),
  ],
  preview: {
    select: { title: 'title', links: 'subLinks' },
    prepare({ title, links }) {
      const count = Array.isArray(links) ? links.length : 0
      return {
        title: title || 'Untitled menu',
        subtitle: `${count} link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
