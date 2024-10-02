import { defineType } from 'sanity';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subLinks',
      title: 'Sub-Menu Links',
      type: 'array',
      of: [{ type: 'footerLink' }], // Reference the footer link type for sub-links
    },
  ],
});
