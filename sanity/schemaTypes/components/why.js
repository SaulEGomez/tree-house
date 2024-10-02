export default {
    name: 'why',
    title: 'Why',
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
        name: 'ceoSection',
        title: 'CEO Section',
        type: 'object',
        fields: [
          {
            name: 'ceoName',
            title: 'CEO Name',
            type: 'string',
          },
          {
            name: 'ceoMessage',
            title: 'CEO Message',
            type: 'text',
          },
          {
            name: 'ceoImage',
            title: 'CEO Image',
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
            name: 'ceoPosition',
            title: 'CEO Position',
            type: 'string',
          },
        ],
        options: {
          collapsible: true,
          collapsed: true,
        },
      },
      {
        name: 'cards',
        title: 'Cards',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Card Title',
                type: 'string',
              },
              {
                name: 'number',
                title: 'Number',
                type: 'string',
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text',
              },
            ],
            preview: {
              select: {
                title: 'title',
                subtitle: 'number',
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
          title: title || 'Why',
        };
      },
    },
  };
  