export default {
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      readOnly: true,
    },
  ],

  preview: {
    select: {
      title: 'email',
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
