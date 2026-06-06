export const products = {
  name: "products",
  title: "Product Family",
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
    { name: "requestQuote", title: "Request Quote Button", type: "string" },
    { name: "inquireNow", title: "Inquire Now Button", type: "string" },
    {
      name: "items",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Product Name", type: "string" },
            { name: "tag", title: "Tag", type: "string" },
            { name: "subtitle", title: "Short Subtitle", type: "string" },
            { name: "image", title: "Product Image", type: "image", options: { hotspot: true } },
            {
              name: "specs",
              title: "Specs List",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "points",
              title: "Key Points",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({ title: `Product Family - ${language === "en" ? "English" : "中文"}` }),
  },
};
