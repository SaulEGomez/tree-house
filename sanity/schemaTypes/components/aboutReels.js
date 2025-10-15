export default {
  name: 'aboutReels',
  title: 'Founder (Photo Reel)',
  type: 'object',
  fields: [
    { name: 'subtitle', type: 'string', title: 'Subtitle' },
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'list', type: 'array', title: 'Bullets', of: [{ type: 'string' }] },
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
      options: { layout: 'grid' },
    },
  ],
  preview: { select: { title: 'title', media: 'photos.0' } },
}
