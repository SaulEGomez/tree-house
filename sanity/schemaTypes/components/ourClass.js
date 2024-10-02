export default {
    name: 'ourClass',
    title: 'Our Class',
    type: 'document',
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
        name: 'classCards',
        title: 'Class Cards',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
                fields: [
                  {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'title',
                title: 'Card Title',
                type: 'string',
              },
              {
                name: 'description',
                title: 'Card Description',
                type: 'text',
              },
              {
                name: 'buttonText',
                title: 'Button Text',
                type: 'string',
              },
              {
                name: 'buttonUrl',
                title: 'Button URL',
                type: 'string', // Using 'string' instead of 'url' to avoid strict validation
              },
            ],
            preview: {
              select: {
                title: 'title',
                media: 'image',
              },
            },
          },
        ],
      },
    ],
    preview: {
      select: {
        title: 'heading',
      },
      prepare({ title }) {
        return {
          title: title || 'Our Class',
        };
      },
    },
  };
  