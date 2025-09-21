export default {
    name: 'aboutPhotosReel',           
    title: 'About — Photos Reel',
    type: 'object',
    fields: [
      { name: 'subtitle', type: 'string', title: 'Subtitle' },
      { name: 'title', type: 'string', title: 'Title' },
      { name: 'description', type: 'text', title: 'Description' },
      {
        name: 'list',
        title: 'Bulleted Points',
        type: 'array',
        of: [{ type: 'string' }],
        options: { sortable: true },
      },
      {
        name: 'photos',
        title: 'Photos',
        type: 'array',
        of: [
          {
            type: 'image',
            options: { hotspot: true },
            fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
          },
        ],
      },
    ],
    preview: {
      select: { title: 'title', media: 'photos.0' },
      prepare({ title, media }) {
        return { title: title || 'About — Photos Reel', media }
      },
    },
  }
  