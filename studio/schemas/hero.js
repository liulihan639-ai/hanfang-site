export const hero = {
  name: "hero",
  title: "Hero Banner",
  type: "document",
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
      options: { list: [{ title: "English", value: "en" }, { title: "中文", value: "zh" }] },
    },
    { name: "badge", title: "Badge", type: "string" },
    { name: "headline", title: "Headline Prefix", type: "string" },
    { name: "headlineHighlight", title: "Headline Highlight", type: "string" },
    { name: "headlineSuffix", title: "Headline Suffix", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "text" },
    { name: "exploreProducts", title: "Explore Products Button", type: "string" },
    { name: "becomePartner", title: "Become Partner Button", type: "string" },
    { name: "globalReach", title: "Global Reach Label", type: "string" },
    { name: "countries", title: "Countries Label", type: "string" },
    { name: "partners", title: "Partners Label", type: "string" },
    { name: "capacity", title: "Capacity Label", type: "string" },
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({ title: `Hero Banner - ${language === "en" ? "English" : "中文"}` }),
  },
};
