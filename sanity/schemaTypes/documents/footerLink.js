import { defineType } from 'sanity';

export default defineType({
  name: 'footerLink',
  title: 'Footer Link',
  type: 'object',
	
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
});
