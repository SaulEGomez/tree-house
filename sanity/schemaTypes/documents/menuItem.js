import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    // Menu Title
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Link to internal or external pages
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'URL or slug for the menu item. Use relative paths (e.g., "/contact") for internal pages.',
    }),

    // Whether the link is internal
    defineField({
      name: 'isInternal',
      title: 'Is Internal Link',
      type: 'boolean',
      description: 'Set to true if the link points to an internal page.',
      initialValue: false,
    }),

    // Sub-menu links
    defineField({
      name: 'subLinks',
      title: 'Sub-Menu Links',
      type: 'array',
      of: [{ type: 'footerLink' }], // Reference the footer link type for sub-links
    }),
  ],

  preview: {
    select: {
      title: 'title',
      link: 'link',
      isInternal: 'isInternal',
    },
    prepare({ title, link, isInternal }) {
      return {
        title: `${title} ${isInternal ? '(Internal)' : ''}`,
        subtitle: link || 'No link set',
      };
    },
  },
});
