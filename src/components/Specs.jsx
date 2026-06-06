import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = "0", className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} ${className}`}>
      {children}
    </div>
  );
}

const sectionIcons = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="10" x2="23" y2="14"/>
  </svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>,
];

export default function Specs() {
  const { t } = useLanguage();
  const sections = t("specs.sections");
  return (
    <section id="specs" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("specs.title")}</h2>
            <p className="mt-4 text-white/50">{t("specs.subtitle")}</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={String(i + 1)}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">{sectionIcons[i]}</div>
                  <h3 className="text-base font-semibold">{section.title}</h3>
                </div>
                <div className="mt-5 divide-y divide-white/5">
                  {section.rows.map((row) => (
                    <div key={row.label} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0">
                      <span className="text-xs text-white/40">{row.label}</span>
                      <span className="text-sm font-medium text-white/80">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
