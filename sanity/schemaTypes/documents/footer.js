import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [{ type: 'menuItem' }], // Reference the new menu item type
    }),
    defineField({
      name: 'newsletterText',
      title: 'Newsletter Text',
      type: 'string',
      initialValue: 'Lorem ipsum dolor sit amet, consectetur.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      initialValue: 'Email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sendButtonText',
      title: 'Send Button Text',
      type: 'string',
      initialValue: 'Send',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      initialValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialMediaGroup',
      title: 'Social Media Group',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'string', initialValue: '#' },
        { name: 'youtube', title: 'YouTube URL', type: 'string', initialValue: '#' },
        { name: 'twitter', title: 'Twitter URL', type: 'string', initialValue: '#' },
        { name: 'instagram', title: 'Instagram URL', type: 'string', initialValue: '#' },
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
    }),
  ],
});
