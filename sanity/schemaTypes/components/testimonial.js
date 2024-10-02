export default {
    name: 'testimonial',
    title: 'Testimonial',
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
        name: 'testimonialList',
        title: 'Testimonial List',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'message',
                title: 'Message',
                type: 'text',
              },
              {
                name: 'name',
                title: 'Name',
                type: 'string',
              },
              {
                name: 'designation',
                title: 'Designation',
                type: 'string',
              },
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
      },
    ],
    preview: {
      select: {
        title: 'heading',
      },
      prepare({ title }) {
        return {
          title: title || 'Testimonial',
        };
      },
    },
  };
  