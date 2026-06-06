import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-glow-radial opacity-60" />
      <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-96 w-96 rounded-full bg-brand-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 top-60 -z-10 h-80 w-80 rounded-full bg-brand-400/5 blur-[100px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-32 pb-20 text-center lg:flex-row lg:text-left lg:pt-36 lg:pb-28">
        <div className="flex-1">
          <Reveal delay="1">
            <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-300">{t("hero.badge")}</span>
          </Reveal>
          <Reveal delay="2">
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              {t("hero.headline")}
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent">{t("hero.headlineHighlight")}</span>
              {t("hero.headlineSuffix")}
            </h1>
          </Reveal>
          <Reveal delay="3">
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/50 lg:mx-0">{t("hero.subtitle")}</p>
          </Reveal>
          <Reveal delay="4">
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a href="#products" className="group relative overflow-hidden rounded-2xl bg-brand-600 px-8 py-4 text-sm font-semibold transition-all hover:bg-brand-500">
                <span className="relative z-10">{t("hero.exploreProducts")}</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a href="#inquiry" className="rounded-2xl border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-semibold backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/[0.06]">
                {t("hero.becomePartner")}
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-white/40">
              <span className="text-xs uppercase tracking-widest text-white/30">{t("hero.globalReach")}</span>
              <span className="flex items-center gap-2"><span className="text-lg font-bold text-white">50+</span> {t("hero.countries")}</span>
              <span className="flex items-center gap-2"><span className="text-lg font-bold text-white">200+</span> {t("hero.partners")}</span>
              <span className="flex items-center gap-2"><span className="text-lg font-bold text-white">10GWh+</span> {t("hero.capacity")}</span>
            </div>
          </Reveal>
        </div>
        <div className="mt-16 flex-1 lg:mt-0">
          <Reveal>
            <div className="relative mx-auto flex h-[380px] w-full max-w-[480px] items-center justify-center sm:h-[480px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(39,136,255,0.2)_0%,rgba(39,136,255,0.05)_40%,transparent_70%)]" />
              <div className="absolute h-72 w-72 animate-float rounded-full border border-white/10 sm:h-96 sm:w-96" />
              <div className="absolute h-56 w-56 animate-float-delayed rounded-full border border-brand-500/20 sm:h-80 sm:w-80" />
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="relative z-10">
                <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-gradient-to-br from-surface-700 to-surface-900 shadow-[0_20px_80px_rgba(39,136,255,0.15)] ring-1 ring-white/10 sm:h-52 sm:w-52">
                  <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-surface-800 sm:h-36 sm:w-36">
                    <div className="flex items-end gap-1.5">
                      <motion.div animate={{ height: ["60%", "100%", "60%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="w-3 rounded-t-sm bg-brand-400" />
                      <motion.div animate={{ height: ["40%", "90%", "40%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }} className="w-3 rounded-t-sm bg-brand-500" />
                      <motion.div animate={{ height: ["70%", "95%", "70%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }} className="w-3 rounded-t-sm bg-brand-300" />
                      <motion.div animate={{ height: ["50%", "85%", "50%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.6 }} className="w-3 rounded-t-sm bg-brand-400" />
                    </div>
                    <span className="mt-3 text-xs font-medium text-white/50">LiFePO₄</span>
                  </div>
                </div>
                <div className="absolute -left-4 -top-4 h-3 w-3 rounded-full bg-brand-400 shadow-[0_0_12px_rgba(39,136,255,0.5)] animate-pulse-glow" />
                <div className="absolute -bottom-2 -right-2 h-2.5 w-2.5 rounded-full bg-brand-300 shadow-[0_0_10px_rgba(39,136,255,0.4)] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
                <div className="absolute -left-2 bottom-8 h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(39,136,255,0.4)] animate-pulse-glow" style={{ animationDelay: "3s" }} />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
