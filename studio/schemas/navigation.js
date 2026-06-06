export const navigation = {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      options: { list: [{ title: "English", value: "en" }, { title: "中文", value: "zh" }] },
    },
    { name: "products", title: "Products Label", type: "string" },
    { name: "solutions", title: "Solutions Label", type: "string" },
    { name: "specs", title: "Specs Label", type: "string" },
    { name: "contact", title: "Contact Label", type: "string" },
    { name: "getInTouch", title: "Get in Touch Label", type: "string" },
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({ title: `Navigation - ${language === "en" ? "English" : "中文"}` }),
  },
};
