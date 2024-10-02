export default {
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    {
      name: "topImage",
      title: "Top Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
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
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "string",
        },
        {
          name: "url",
          title: "Button URL",
          type: "string",
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "transparentButton",
      title: "Transparent Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "string",
        },
        {
          name: "url",
          title: "Button URL",
          type: "string", // Changed from 'url' to 'string' to disable validation
        },
      ],
      options: {
        collapsible: true, // Makes the object collapsible
        collapsed: true, // Start in collapsed mode
      },
    },
    {
      name: "socialMediaGroup",
      title: "Social Media Group",
      type: "object",
      fields: [
        {
          name: "facebook",
          title: "Facebook URL",
          type: "string",
        },
        {
          name: "youtube",
          title: "YouTube URL",
          type: "string",
        },
        {
          name: "twitter",
          title: "Twitter URL",
          type: "string",
        },
        {
          name: "instagram",
          title: "Instagram URL",
          type: "string",
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Hero',
      };
    },
  },
};
