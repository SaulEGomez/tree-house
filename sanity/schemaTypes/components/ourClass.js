export default {
    name: 'ourClass',
    title: 'Our Class',
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
                type: 'imageWithAlt',
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
                name: 'callToAction',
                title: 'Call to Action',
                type: 'link',
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
        title: 'welcomeText',
      },
      prepare({ title }) {
        return {
          title: title || 'Our Class',
        };
      },
    },
  };
  