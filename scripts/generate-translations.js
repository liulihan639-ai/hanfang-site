const fs = require("fs");
const path = require("path");

const contentDir = path.resolve(__dirname, "..", "content");
const outputFile = path.resolve(__dirname, "..", "src/i18n/translations.js");

const langDirs = ["en", "zh"];
const sectionMap = {
  nav: "nav", hero: "hero", highlights: "highlights",
  productFamily: "products", useCases: "usecases",
  specs: "specs", inquiry: "inquiry", footer: "footer"
};

const translations = { en: {}, zh: {} };

for (const lang of langDirs) {
  for (const [origName, fileName] of Object.entries(sectionMap)) {
    const filePath = path.join(contentDir, lang, fileName + ".json");
    if (fs.existsSync(filePath)) {
      translations[lang][origName] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  }
}

const jsonStr = JSON.stringify(translations, null, 2);
const output = "const translations = " + jsonStr + ";\n\nexport default translations;\n";
fs.writeFileSync(outputFile, output, "utf-8");
console.log("translations.js generated successfully from CMS content");
