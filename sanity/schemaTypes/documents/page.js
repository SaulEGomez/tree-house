import { defineField, defineType } from 'sanity';
import { VscHome, VscEyeClosed } from 'react-icons/vsc';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      initialValue: {
        current: 'index',
      },
      onChange: (slug) => {
        if (slug?.current === '' || slug?.current === '/'|| slug?.current === 'index'|| slug?.current === 'home') {
          return { current: 'index' };
        }
        return { current: slug?.current.replace(/^\/|\/$/g, '') || 'index' };
      },
    }),
    defineField({
      name: 'modules',
      description: 'Dynamic content sections for the page',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'rating' },
        { type: 'aboutVideosReel' },
        { type: 'ourClass' },
        { type: 'why' },
        { type: 'program' },
        { type: 'testimonial' },
        { type: 'contact' },
        { type: 'aboutPhotosReel' },
        { type: 'classOfferings' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'metadata.image',
      noindex: 'metadata.noIndex',
    },
    prepare: ({ title, slug, media, noindex }) => ({
      title,
      subtitle: slug ? `/${slug}` : 'No slug set',
      media: media || (noindex ? VscEyeClosed : VscHome),
    }),
  },
});
