import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'formSubmissions',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'firstname',
      title: 'First Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'lastname',
      title: 'Last Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'instruments',
      title: 'Instruments',
      type: 'array',
      of: [{ type: 'string' }],
      readOnly: true,
    }),
    defineField({
      name: 'pastExperience',
      title: 'Past Experience',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
            }),
            defineField({
              name: 'fromTime',
              title: 'From Time',
              type: 'string',
            }),
            defineField({
              name: 'toTime',
              title: 'To Time',
              type: 'string',
            }),
          ],
        },
      ],
      readOnly: true,
    }),
    defineField({
      name: 'additionalComments',
      title: 'Additional Comments',
      type: 'text',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'firstname',
      instruments: 'instruments',
      createdAt: '_createdAt'
    },
    prepare(selection) {
      const { title, instruments, createdAt } = selection;
      return {
        title: `${title}'s Submission`,
        subtitle: `Instruments: ${instruments?.join(', ') || 'None'} | ${new Date(createdAt).toLocaleDateString()}`
      };
    }
  }
});
