export const highlights = {
  name: "highlights",
  title: "Why Hanfang (Highlights)",
  type: "document",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      options: { list: [{ title: "English", value: "en" }, { title: "中文", value: "zh" }] },
    },
    { name: "title", title: "Section Title", type: "string" },
    { name: "subtitle", title: "Section Subtitle", type: "string" },
    {
      name: "items",
      title: "Highlight Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "desc", title: "Description", type: "text" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({ title: `Why Hanfang - ${language === "en" ? "English" : "中文"}` }),
  },
};
