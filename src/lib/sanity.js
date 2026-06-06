import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "YOUR_PROJECT_ID";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-06-06",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getContent(type, language) {
  const query = `*[_type == $type && language == $language][0]`;
  return await client.fetch(query, { type, language });
}

export async function getInquiries() {
  const query = `*[_type == "inquiry"] | order(createdAt desc)`;
  return await client.fetch(query);
}

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]`;
  return await client.fetch(query);
}
