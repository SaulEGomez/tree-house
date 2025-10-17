
import { defineType } from 'sanity';

export default defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true }, 
  fields: [
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (Rule) => Rule.required(), 
    },
  ],
});