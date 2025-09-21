import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutPhotosReel',
  title: 'About – Photos Reel',
  type: 'object',
  fields: [
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'list',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [],
    }),
    defineField({
      name: 'photos',
      type: 'array',
      title: 'Photos',
      initialValue: [],
      of: [
        defineField({
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        }),
      ],
      validation: (R) => R.min(1).error('Add at least one photo'),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'photos.0' },
    prepare: ({ title, media }) => ({ title: title || 'About – Photos Reel', media }),
  },
})
