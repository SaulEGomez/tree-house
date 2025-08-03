export default {
  name: 'formSubmissions',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'firstname',
      title: 'First Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'lastname',
      title: 'Last Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'instruments',
      title: 'Instruments',
      type: 'array',
      of: [{ type: 'string' }],
      readOnly: true,
    },
    {
      name: 'pastExperience',
      title: 'Past Experience',
      type: 'text',
      readOnly: true,
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'day',
              title: 'Day',
              type: 'string',
            },
            { 
              name: 'fromTime',
              title: 'From Time',
              type: 'string',
            },
            { 
              name: 'toTime',
              title: 'To Time',
              type: 'string',
            },
          ],
        },
      ],
      readOnly: true,
    },
    {
      name: 'additionalComments',
      title: 'Additional Comments',
      type: 'text',
      readOnly: true,
    },
  ],

  preview: {
    select: {
      title: 'firstname',
      subtitle: '_createdAt',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Title of submissions",
        subtitle: `Submitted on: ${new Date(subtitle).toLocaleString()}`,
      };
    },
  },
};
