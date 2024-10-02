export default {
    name: 'header',
    title: 'Header',
    type: 'document',
    options: {
      singleton: true,
    },
    fields: [
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
      },
      {
        name: 'menuItems',
        title: 'Menu Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
              {
                name: 'link',
                title: 'Link',
                type: 'string',
              },
            ],
          },
        ],
      },
      {
        name: 'specialButton',
        title: 'Special Button',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string',
          },
          {
            name: 'link',
            title: 'Link',
            type: 'string',
          },
        ],
      },
    ],
  };
  