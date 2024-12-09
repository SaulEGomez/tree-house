import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
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
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'string',
          description: 'Enter keywords separated by commas (e.g., my, keyword, is, here)',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image used for social media link previews.',
          options: { hotspot: true },
        }),
        defineField({
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Twitter username (e.g., @yourhandle).',
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
          description: 'Main background color (e.g., #fff7e7)',
        }),
        defineField({
          name: 'bg2',
          title: 'Background Color 2',
          type: 'string',
          description: 'Secondary background color (e.g., #ffffff)',
        }),
        defineField({
          name: 'bgBlack',
          title: 'Background Color Black',
          type: 'string',
          description: 'Background color (e.g., Black)',
        }),
        defineField({
          name: 'textBlack',
          title: 'Text Black Color',
          type: 'string',
          description: 'Color for black text (e.g., black or #000000)',
        }),
        defineField({
          name: 'textRed',
          title: 'Text Red Color',
          type: 'string',
          description: 'Color for red text (e.g., red or #ff0000)',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Site settings',
    }),
  },
});

// Function to convert keywords string to an array
export const getKeywordsArray = (keywordsString) => {
  return keywordsString ? keywordsString.split(',').map((keyword) => keyword.trim()) : [];
};
