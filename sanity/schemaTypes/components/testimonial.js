export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'object', 
  fields: [
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'title',    title: 'Title',    type: 'string' },

    {
      name: 'gallery',
      title: 'Gallery Photos',
      description: 'Add 8–12 images that will display in a grid.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt text', type: 'string' },
            // optional caption
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(12),
    },

    // Existing testimonials (right side)
    {
      name: 'testimonialList',
      title: 'Testimonial List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'message',     title: 'Message',     type: 'text' },
            { name: 'name',        title: 'Name',        type: 'string' },
            { name: 'designation', title: 'Designation', type: 'string' },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'designation',
              description: 'message',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    },
  ],
  preview: {
    select: {
      title: 'welcomeText',
    },
    prepare({ title }) {
      return {
        title: title || 'Testimonials',
      };
    },
  },
}
