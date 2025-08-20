import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutReels',
  title: 'About us (videos)',
  type: 'object',
  fields: [
    defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({
      name: 'list',
      title: 'Bulleted Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'videos',
      title: 'Clips',
      type: 'array',
      of: [{ type: 'videoClip' }],
      validation: (Rule) => Rule.min(1).error('Add at least one clip'),
    }),
  ],
})
