import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  options: {
    singleton: true, // Ensures there's only one instance of this document
  },
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of your site.',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'The favicon displayed in the browser tab.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required().min(10).max(60),
          description: 'The meta title of your site (max 60 characters).',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule) => Rule.required().min(50).max(160),
          description: 'A short description of your site (50-160 characters).',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'string',
          description: 'Enter keywords separated by commas (e.g., music, lessons, guitar).',
        }),
        defineField({
          name: 'image',
          title: 'Open Graph Image',
          type: 'image',
          description: 'The image that appears when your site is shared on social media.',
        }),
        defineField({
          name: 'url',
          title: 'Site URL',
          type: 'url',
          description: 'The base URL of your site (e.g., https://example.com).',
        }),
      ],
    }),
    defineField({
      name: 'baseSettings',
      title: 'Theme Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'bg1',
          title: 'Background Color 1',
          type: 'string',
          description: 'Main background color (e.g., #fff7e7).',
        }),
        defineField({
          name: 'bg2',
          title: 'Background Color 2',
          type: 'string',
          description: 'Secondary background color (e.g., #ffffff).',
        }),
        defineField({
          name: 'bgBlack',
          title: 'Background Black Color',
          type: 'string',
          description: 'Background color for dark areas (e.g., #000000).',
        }),
        defineField({
          name: 'textBlack',
          title: 'Text Black Color',
          type: 'string',
          description: 'Color for black text (e.g., black or #000000).',
        }),
        defineField({
          name: 'textRed',
          title: 'Text Red Color',
          type: 'string',
          description: 'Color for red text (e.g., red or #ff0000).',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'favicon',
    },
  },
});
