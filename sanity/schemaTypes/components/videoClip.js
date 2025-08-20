import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'videoClip',
  title: 'Video Clip',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({
      name: 'video',
      title: 'Video (upload MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'src',
      title: 'External MP4 URL (optional)',
      type: 'url',
      description: 'If set, this overrides the uploaded file',
    }),
    defineField({
      name: 'poster',
      title: 'Poster image (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'label', poster: 'poster', hasFile: 'video.asset', hasUrl: 'src' },
    prepare({title, poster, hasFile, hasUrl}) {
      const subtitle = hasUrl ? 'External URL' : hasFile ? 'Uploaded file' : 'Missing video'
      return { title: title || 'Untitled clip', subtitle, media: poster }
    },
  },
})
