export const specs = {
  name: "specs",
  title: "Technical Specs",
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
      name: "sections",
      title: "Spec Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Section Title", type: "string" },
            {
              name: "rows",
              title: "Spec Rows",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Label", type: "string" },
                    { name: "value", title: "Value", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({ title: `Technical Specs - ${language === "en" ? "English" : "中文"}` }),
  },
};
