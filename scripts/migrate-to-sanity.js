// Script to migrate existing JSON content to Sanity
// Usage: node scripts/migrate-to-sanity.js <PROJECT_ID> <SANITY_TOKEN>
// Get project ID from sanity.io/manage
// Get token from sanity.io/manage -> API -> Add API token

const fs = require("fs");
const path = require("path");

const PROJECT_ID = process.argv[2];
const API_TOKEN = process.argv[3];

if (!PROJECT_ID || !API_TOKEN) {
  console.error("Usage: node scripts/migrate-to-sanity.js <PROJECT_ID> <SANITY_TOKEN>");
  console.error("Example: node scripts/migrate-to-sanity.js abc123 sk...");
  process.exit(1);
}

const DATASET = "production";
const CONTENT_DIR = path.join(__dirname, "..", "content");

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

  let success = 0;
  let failed = 0;

  for (const [fileBase, type] of Object.entries(TYPE_MAP)) {
    for (const lang of ["en", "zh"]) {
      const filePath = path.join(CONTENT_DIR, lang, `${fileBase}.json`);
      if (!fs.existsSync(filePath)) {
        console.log(`⏭ Skipping ${filePath} (not found)`);
        continue;
      }
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const doc = {
        _type: type,
        _id: `${type}-${lang}`,
        language: lang,
        ...data,
      };

      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
        });
        const result = await response.json();
        if (response.ok) {
          console.log(`✅ ${lang}/${fileBase}.json → ${type}`);
          success++;
        } else {
          console.error(`❌ ${lang}/${fileBase}.json:`, result.message || JSON.stringify(result));
          failed++;
        }
      } catch (err) {
        console.error(`❌ ${lang}/${fileBase}.json:`, err.message);
        failed++;
      }
    }
  }

  console.log(`\nDone! ${success} migrated, ${failed} failed.`);
}

migrate().catch(console.error);
