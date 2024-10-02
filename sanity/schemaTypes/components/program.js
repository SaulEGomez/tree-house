export default {
    name: 'program',
    title: 'Programs',
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
        name: 'cards',
        title: 'Program Cards',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'price',
                title: 'Price',
                type: 'number',
                validation: (Rule) =>
                  Rule.precision(2).positive().error('Price should be a positive number with up to two decimal places.'),
              },
              {
                name: 'redText',
                title: 'Red Text',
                type: 'string',
              },
              {
                name: 'title',
                title: 'Card Title',
                type: 'string',
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text',
              },
              {
                name: 'titleBottom',
                title: 'Title Bottom',
                type: 'string',
              },
              {
                name: 'list',
                title: 'List',
                type: 'array',
                of: [{ type: 'string' }],
                options: {
                  sortable: true,
                },
              },
              {
                name: 'learnMoreButton',
                title: 'Learn More Button',
                type: 'object',
                fields: [
                  {
                    name: 'text',
                    title: 'Button Text',
                    type: 'string',
                  },
                  {
                    name: 'url',
                    title: 'Button URL',
                    type: 'string',
                  },
                ],
              },
            ],
            preview: {
              select: {
                title: 'title',
                subtitle: 'price',
              },
            },
          },
        ],
      },
      {
        name: 'whiteText',
        title: 'White Text',
        type: 'string',
      },
      {
        name: 'redText',
        title: 'Red Text',
        type: 'string', 
      },
      {
        name: 'redUrl',
        title: 'Red URL',
        type: 'string',
      },
    ],
    preview: {
      select: {
        title: 'heading',
      },
      prepare({ title }) {
        return {
          title: title || 'Programs',
        };
      },
    },
  };
  