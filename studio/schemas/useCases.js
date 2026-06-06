export const useCases = {
  name: "useCases",
  title: "Use Cases",
  type: "document",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      options: { list: [{ title: "English", value: "en" }, { title: "中文", value: "zh" }] },
    },
    { name: "title", title: "Section Title", type: "string" },
    { name: "subtitle", title: "Section Subtitle", type: "text" },
    {
      name: "items",
      title: "Use Case Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "desc", title: "Description", type: "text" },
            { name: "icon", title: "Icon (emoji)", type: "string" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({ title: `Use Cases - ${language === "en" ? "English" : "中文"}` }),
  },
};
