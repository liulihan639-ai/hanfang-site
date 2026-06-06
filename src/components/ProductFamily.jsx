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

const itemColors = [
  { color: "from-cyan-500 to-blue-600", gradient: "from-cyan-500/20 via-blue-600/10 to-transparent" },
  { color: "from-brand-400 to-brand-600", gradient: "from-brand-400/20 via-brand-600/10 to-transparent" },
  { color: "from-violet-500 to-purple-600", gradient: "from-violet-500/20 via-purple-600/10 to-transparent" },
];

export default function ProductFamily() {
  const { t } = useLanguage();
  const products = t("productFamily.items");
  return (
    <section id="products" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("productFamily.title")}</h2>
              <p className="mt-3 max-w-xl text-white/50">{t("productFamily.subtitle")}</p>
            </div>
            <a href="#inquiry" className="hidden shrink-0 rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold transition-all hover:border-white/30 hover:bg-white/[0.03] md:inline-block">
              {t("productFamily.requestQuote")}
            </a>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={String(i + 1)}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/20 hover:shadow-card-hover">
                <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-br ${itemColors[i].gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative p-7 pb-0">
                  <div className="flex h-32 items-center justify-center">
                    <div className={`flex h-24 w-full max-w-[200px] items-center justify-center rounded-2xl bg-gradient-to-br ${itemColors[i].color} bg-opacity-10 shadow-lg ring-1 ring-white/10`}>
                      <div className="flex flex-col items-center gap-1.5">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white/80">
                          <rect x="4" y="10" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                          <rect x="10" y="14" width="12" height="8" rx="1" fill="currentColor" fillOpacity="0.2"/>
                          <circle cx="16" cy="18" r="2" fill="currentColor" fillOpacity="0.5"/>
                        </svg>
                        <span className="text-[10px] font-medium text-white/50">{product.specs[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative p-7 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-400">{product.tag}</p>
                  <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
                  <p className="mt-1 text-sm text-white/40">{product.subtitle}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.specs.map((s) => (
                      <span key={s} className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60">{s}</span>
                    ))}
                  </div>
                  <ul className="mt-5 space-y-2.5 text-sm text-white/50">
                    {product.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1 w-1.5 rounded-full bg-brand-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a href="#inquiry" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200">
                    {t("productFamily.inquireNow")}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
