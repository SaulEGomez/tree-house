// sanity/schemaTypes/documents/kingdomSound.js
import { defineType, defineField } from 'sanity'
import { HighlightIcon } from '@sanity/icons'

export default defineType({
  name: 'kingdomSound',
  title: 'Kingdom Sound Page',
  type: 'document',
  icon: HighlightIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      group: 'content',
      initialValue: 'Kingdom Sound',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      group: 'content',
      rows: 4,
      validation: (Rule) => Rule.max(500),
      initialValue:
        'Please fill out this interest form for the Kingdom Sound program.',
    }),
    defineField({
      name: 'instruments',
      title: 'Instrument Options',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Options users can choose (the UI still enforces selecting exactly 2).',
      group: 'content',
      initialValue: ['Voice', 'Guitar', 'Bass', 'Drums', 'Piano'],
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      group: 'content',
      initialValue: 'Thank you for your interest in Kingdom Sound!',
    }),

    defineField({
      name: 'address',
      type: 'string',
      title: 'Address',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      group: 'contact',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone',
      group: 'contact',
      // simple US 10–15 digits; adjust as needed
      validation: (Rule) =>
        Rule.regex(/^\+?[0-9\s().-]{7,20}$/, {
          name: 'phone',
          invert: false,
        }),
    }),
  ],
  preview: {
    select: { subtitle: 'subtitle' },
    prepare({ subtitle }) {
      return { title: 'Kingdom Sound Page', subtitle: subtitle || '—' }
    },
  },
})
