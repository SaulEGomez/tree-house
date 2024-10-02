export default {
  name: 'formSubmissions',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true, // Make this field read-only
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true, // Make this field read-only
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      readOnly: true, // Make this field read-only
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true, // Make this field read-only
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
      readOnly: true, // Make this field read-only
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: '_createdAt',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: `Submitted on: ${new Date(subtitle).toLocaleString()}`,
      };
    },
  },
};
