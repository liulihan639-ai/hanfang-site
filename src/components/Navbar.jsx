import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";

const navLinks = [
  { key: "products", href: "#products" },
  { key: "solutions", href: "#usecases" },
  { key: "specs", href: "#specs" },
  { key: "contact", href: "#inquiry" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface-900/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 transition-colors group-hover:bg-brand-500">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none" className="text-white">
              <path d="M10 16L14 8L18 16L14 24Z" fill="currentColor"/>
              <rect x="14" y="10" width="4" height="12" rx="1" fill="#50abff" opacity="0.6"/>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">Hanfang</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
              {t("nav." + link.key)}
            </a>
          ))}
          <div className="flex items-center gap-3 border-l border-white/10 pl-6">
            <button
              onClick={() => setLang("zh")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                lang === "zh" ? "text-white bg-white/10" : "text-white/50 hover:text-white"
              }`}
            >
              中文
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setLang("en")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                lang === "en" ? "text-white bg-white/10" : "text-white/50 hover:text-white"
              }`}
            >
              EN
            </button>
            <a href="#inquiry" className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold transition-all hover:bg-brand-500 hover:shadow-glow-sm">
              {t("nav.getInTouch")}
            </a>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 md:hidden"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1">
            <span className={`block h-px w-4 bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block h-px w-4 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-4 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5 bg-surface-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {t("nav." + link.key)}
                </a>
              ))}
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                <button onClick={() => setLang("zh")} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  lang === "zh" ? "text-white bg-white/10" : "text-white/50"
                }`}>中文</button>
                <span className="text-white/20">|</span>
                <button onClick={() => setLang("en")} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  lang === "en" ? "text-white bg-white/10" : "text-white/50"
                }`}>EN</button>
              </div>
              <a href="#inquiry" onClick={() => setMobileOpen(false)} className="mt-4 rounded-xl bg-brand-600 px-5 py-3 text-center text-sm font-semibold">
                {t("nav.getInTouch")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
