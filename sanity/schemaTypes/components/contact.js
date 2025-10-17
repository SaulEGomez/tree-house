import { defineType, defineField } from 'sanity';

export default {
  name: 'contact',
  title: 'Contact Us',
  type: 'object',
  fields: [
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    defineField({
      name: 'placeholders',
      title: 'Contact Form Placeholders',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'namePlaceholder',
          title: 'Name Placeholder',
          type: 'string',
        },
        {
          name: 'phonePlaceholder',
          title: 'Phone Placeholder',
          type: 'string',
        },
        {
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'string',
        },
        {
          name: 'subjectPlaceholder',
          title: 'Subject Placeholder',
          type: 'string',
        },
        {
          name: 'messagePlaceholder',
          title: 'Message Placeholder',
          type: 'string',
        },
        {
          name: 'sendButtonText',
          title: 'Send Button Text',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'welcomeText',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Us',
      };
    },
  },
};