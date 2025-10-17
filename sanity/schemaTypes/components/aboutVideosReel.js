export default {
  name: 'aboutVideosReel',
  title: 'About (Video Reel)',
  type: 'object',
  fields: [
    { name: 'subtitle', type: 'string', title: 'Subtitle' },
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'list', type: 'array', title: 'Bullets', of: [{ type: 'string' }] },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label (optional)' },
            { name: 'src', type: 'url', title: 'External video URL (optional)' },
            { name: 'video', type: 'file', title: 'Upload video', options: { accept: 'video/*' } },
            {
              name: 'poster',
              type: 'imageWithAlt',
              title: 'Poster',
            },
          ],
        },
      ],
    },
  ],
  preview: { select: { title: 'title', media: 'videos.0.poster' } },
}
