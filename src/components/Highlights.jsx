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

const icons = [
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>,
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>,
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>,
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>,
];

export default function Highlights() {
  const { t } = useLanguage();
  const items = t("highlights.items");
  return (
    <section className="relative border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-500/[0.02] to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("highlights.title")}</h2>
            <p className="mt-4 text-white/50">{t("highlights.subtitle")}</p>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={String(i + 1)}>
              <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-brand-500/30 hover:bg-white/[0.06] hover:shadow-card-hover">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500/20">{icons[i]}</div>
                <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
