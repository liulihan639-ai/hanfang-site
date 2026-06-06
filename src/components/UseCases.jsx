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
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
  </svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>,
];

const gradients = ["from-emerald-500/10 via-transparent to-transparent", "from-brand-500/10 via-transparent to-transparent", "from-violet-500/10 via-transparent to-transparent"];

export default function UseCases() {
  const { t } = useLanguage();
  const items = t("useCases.items");
  return (
    <section id="usecases" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("useCases.title")}</h2>
            <p className="mt-4 text-white/50">{t("useCases.subtitle")}</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={String(i + 1)}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-brand-500/30 hover:shadow-card-hover">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500/20">{icons[i]}</div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
