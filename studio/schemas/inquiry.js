export const inquiry = {
  name: "inquiry",
  title: "Inquiries (Submitted)",
  type: "document",
  fields: [
    { name: "company", title: "Company Name", type: "string" },
    { name: "name", title: "Contact Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "country", title: "Country", type: "string" },
    { name: "product", title: "Interested Product", type: "string" },
    { name: "message", title: "Message", type: "text" },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Contacted", value: "contacted" },
          { title: "Closed", value: "closed" },
        ],
      },
      initialValue: "new",
    },
    { name: "createdAt", title: "Submitted At", type: "datetime", readOnly: true },
  ],
  preview: {
    select: { title: "company", subtitle: "email" },
  },
  orderings: [
    { title: "Newest First", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] },
  ],
};
