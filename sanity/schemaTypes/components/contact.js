import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact Us',
  type: 'object', // Use 'object' as it's a module in the `modules` array
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
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
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'placeholders',
      title: 'Contact Form Placeholders',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'namePlaceholder',
          title: 'Name Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'phonePlaceholder',
          title: 'Phone Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'subjectPlaceholder',
          title: 'Subject Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'messagePlaceholder',
          title: 'Message Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'sendButtonText',
          title: 'Send Button Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Us',
      };
    },
  },
});
