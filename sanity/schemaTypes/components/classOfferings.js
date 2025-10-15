// sanity/schemaTypes/components/classOfferings.js
export default {
    name: 'classOfferings',
    title: 'Class Offerings',
    type: 'object',
    fields: [
      { name: 'subtitle', title: 'Subtitle', type: 'string' },
      { name: 'title',    title: 'Title',    type: 'string' },
      {
        name: 'items',
        title: 'Classes',
        type: 'array',
        of: [
          {
            name: 'classItem',
            title: 'Class',
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Class name',
                type: 'string',
                validation: (Rule) => Rule.required(),
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true },
                fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text',
                rows: 3,
              },
            ],
            preview: {
              select: { title: 'name', media: 'image', subtitle: 'description' },
            },
          },
        ],
        validation: (Rule) => Rule.min(1),
      },
    ],
    preview: {
      select: { title: 'title', subtitle: 'subtitle', media: 'items.0.image' },
      prepare({ title, subtitle, media }) {
        return { title: title || 'Class Offerings', subtitle, media };
      },
    },
  };
  