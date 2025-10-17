
export default {
    name: 'link',
    title: 'Link/Button',
    type: 'object',
    fields: [
      { name: 'text', title: 'Button Text', type: 'string' },
      { name: 'url', title: 'URL', type: 'string' },
    ],
    preview: {
      select: { title: 'text', subtitle: 'url' },
    },
  };