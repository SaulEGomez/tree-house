
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'socialMediaGroup',
  title: 'Social Media Links',
  type: 'object',
  fieldsets: [
    { name: 'socials', title: 'Social Links', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'string',
      fieldset: 'socials',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'string',
      fieldset: 'socials',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter URL',
      type: 'string',
      fieldset: 'socials',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'string',
      fieldset: 'socials',
    }),
  ],
});