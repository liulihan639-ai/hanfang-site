export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social Media" },
  ],
  fields: [
    { name: "siteName", title: "Site Name", type: "string", group: "general" },
    { name: "siteDescription", title: "Site Description", type: "text", group: "general" },
    { name: "email", title: "Email", type: "string", group: "contact" },
    { name: "phone", title: "Phone", type: "string", group: "contact" },
    { name: "address", title: "Address", type: "string", group: "contact" },
    { name: "whatsapp", title: "WhatsApp Number", type: "string", group: "social" },
    { name: "wechat", title: "WeChat", type: "string", group: "social" },
    { name: "linkedin", title: "LinkedIn URL", type: "url", group: "social" },
    { name: "youtube", title: "YouTube URL", type: "url", group: "social" },
  ],
  preview: { select: { title: "siteName" } },
};
