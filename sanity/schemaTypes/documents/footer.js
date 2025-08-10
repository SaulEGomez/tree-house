// sanity/schemaTypes/documents/footer.js
import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [{ type: 'menuItem', icon: LinkIcon }],
    }),

    defineField({
      name: 'newsletterText',
      title: 'Newsletter Text',
      type: 'string',
      initialValue: 'Get updates in your inbox.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      initialValue: 'Your email',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'sendButtonText',
      title: 'Send Button Text',
      type: 'string',
      initialValue: 'Subscribe',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'socialMediaGroup',
      title: 'Social Links',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'youtube',  title: 'YouTube URL',  type: 'url' },
        { name: 'twitter',  title: 'Twitter URL',  type: 'url' },
        { name: 'instagram',title: 'Instagram URL',type: 'url' },
      ],
    }),

    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt text', type: 'string' },
      ],
    }),
  ],
})
