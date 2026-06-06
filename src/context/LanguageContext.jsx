import { createContext, useContext, useState, useEffect } from "react";
import translations from "../i18n/translations.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("hanfang-lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("hanfang-lang", lang);
    } catch {}
  }, [lang]);

  const t = (path) => {
    const keys = path.split(".");
    let result = translations[lang];
    for (const key of keys) {
      if (result == null) return path;
      result = result[key];
    }
    return result ?? path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
