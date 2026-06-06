export const footer = {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      options: { list: [{ title: "English", value: "en" }, { title: "中文", value: "zh" }] },
    },
    { name: "description", title: "Description", type: "text" },
    { name: "quickLinks", title: "Quick Links Label", type: "string" },
    { name: "contact", title: "Contact Label", type: "string" },
    { name: "privacy", title: "Privacy Policy Label", type: "string" },
    { name: "terms", title: "Terms of Service Label", type: "string" },
    { name: "copyright", title: "Copyright Text", type: "string" },
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({ title: `Footer - ${language === "en" ? "English" : "中文"}` }),
  },
};
