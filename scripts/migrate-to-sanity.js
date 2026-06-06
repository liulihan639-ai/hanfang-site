// Script to migrate existing JSON content to Sanity
// Usage: node scripts/migrate-to-sanity.js <SANITY_TOKEN>
// Get token from https://sanity.io/manage

const fs = require("fs");
const path = require("path");

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || "YOUR_PROJECT_ID";
const DATASET = process.env.VITE_SANITY_DATASET || "production";
const API_TOKEN = process.argv[2];

if (!API_TOKEN) {
  console.error("Usage: node scripts/migrate-to-sanity.js <SANITY_TOKEN>");
  console.error("Get your token from https://sanity.io/manage");
  process.exit(1);
}

const CONTENT_DIR = path.join(__dirname, "..", "content");

// Mapping from JSON file names to Sanity _type and language
const TYPE_MAP = {
  "nav": "navigation",
  "hero": "hero",
  "highlights": "highlights",
  "products": "products",
  "usecases": "useCases",
  "specs": "specs",
  "inquiry": "inquiryConfig",
  "footer": "footer",
};

async function migrate() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  };
  const baseUrl = `https://${PROJECT_ID}.api.sanity.io/v2026-06-06/data/mutate/${DATASET}`;

  for (const [fileBase, type] of Object.entries(TYPE_MAP)) {
    for (const lang of ["en", "zh"]) {
      const filePath = path.join(CONTENT_DIR, lang, `${fileBase}.json`);
      if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${filePath} (not found)`);
        continue;
      }
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const doc = {
        _type: type,
        _id: `${type}-${lang}`,
        language: lang,
        ...data,
      };

      const mutation = {
        mutations: [{ createOrReplace: doc }],
      };

      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(mutation),
        });
        const result = await response.json();
        if (response.ok) {
          console.log(`✅ Migrated ${lang}/${fileBase}.json → ${type}`);
        } else {
          console.error(`❌ Failed ${lang}/${fileBase}.json:`, result.message || JSON.stringify(result));
        }
      } catch (err) {
        console.error(`❌ Error ${lang}/${fileBase}.json:`, err.message);
      }
    }
  }
}

migrate().catch(console.error);
