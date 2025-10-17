export default {
    name: 'rating',
    title: 'Rating',
    type: 'object',
    fields: [
      {
        name: 'mainText',
        title: 'Main Text',
        type: 'string',
      },
      {
        name: 'totalUsers',
        title: 'Total Users',
        type: 'object',
        fields: [
          {
            name: 'whiteText',
            title: 'Total Users (White Text)',
            type: 'string',
          },
          {
            name: 'redText',
            title: 'Total Users (Red Text)',
            type: 'string',
          },
        ],
        options: {
          collapsible: true,
          collapsed: true,
        },
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'object',
        fields: [
          {
            name: 'whiteText',
            title: 'Rating (White Text)',
            type: 'string',
          },
          {
            name: 'redText',
            title: 'Rating (Red Text)',
            type: 'string',
          },
        ],
        options: {
          collapsible: true,
          collapsed: true,
        },
      },
    ],
    preview: {
      select: {
        title: 'welcomeText',
      },
      prepare({ title }) {
        return {
          title: title || 'Rating',
        };
      },
    },
  };
  