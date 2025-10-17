export default {
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    {
      name: "topImage",
      title: "Top Image",
      type: "imageWithAlt",
    },
    {
      name: "welcomeText",
      title: "Welcome Title",
      type: "string",
    },
    {
      name: "blackTitle",
      title: "Black Title",
      type: "string",
    },
    {
      name: "redTitle",
      title: "Red Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "blackButton",
      title: "Black Button",
      type: "link",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "transparentButton",
      title: "Transparent Button",
      type: "link",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "socialMediaGroup",
      title: "Social Media Group",
      type: "socialMediaGroup",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'welcomeText',
    },
    prepare({ title }) {
      return {
        title: title || 'Hero',
      };
    },
  },
};
