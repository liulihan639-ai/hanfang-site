import { useState, useEffect, useRef } from "react";
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

export default function Inquiry() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ company: "", name: "", email: "", country: "", product: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const benefits = t("inquiry.benefits");
  return (
    <section id="inquiry" className="relative border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-500/[0.02] to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("inquiry.title")}</h2>
            <p className="mt-4 text-white/50">{t("inquiry.subtitle")}</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal delay="1">
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-lg font-semibold">{t("inquiry.partnerTitle")}</h3>
                <ul className="mt-5 space-y-4">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-white/60">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-lg font-semibold">{t("inquiry.quickContact")}</h3>
                <div className="mt-4 space-y-3 text-sm text-white/50">
                  <p className="flex items-center gap-3">
                    <svg className="h-4 w-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    {t("inquiry.emailContact")}
                  </p>
                  <p className="flex items-center gap-3">
                    <svg className="h-4 w-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    {t("inquiry.phone")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay="2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="text-lg font-semibold">{t("inquiry.formTitle")}</h3>
              <p className="mt-2 text-sm text-white/40">{t("inquiry.formSubtitle")}</p>
              <form className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="w-full rounded-xl border border-white/10 bg-surface-800 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/30 focus:border-brand-500/50 focus:shadow-[0_0_0_3px_rgba(39,136,255,0.1)]" placeholder={t("inquiry.companyName")} />
                  <input className="w-full rounded-xl border border-white/10 bg-surface-800 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/30 focus:border-brand-500/50 focus:shadow-[0_0_0_3px_rgba(39,136,255,0.1)]" placeholder={t("inquiry.contactName")} />
                </div>
                <input className="w-full rounded-xl border border-white/10 bg-surface-800 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/30 focus:border-brand-500/50 focus:shadow-[0_0_0_3px_rgba(39,136,255,0.1)]" placeholder={t("inquiry.email")} />
                <input className="w-full rounded-xl border border-white/10 bg-surface-800 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/30 focus:border-brand-500/50 focus:shadow-[0_0_0_3px_rgba(39,136,255,0.1)]" placeholder={t("inquiry.country")} />
                <select className="w-full rounded-xl border border-white/10 bg-surface-800 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/30 focus:border-brand-500/50 focus:shadow-[0_0_0_3px_rgba(39,136,255,0.1)] text-white/50" defaultValue="">
                  <option value="" disabled>{t("inquiry.interestedProduct")}</option>
                  <option value="portable">{t("inquiry.options.portable")}</option>
                  <option value="home">{t("inquiry.options.home")}</option>
                  <option value="commercial">{t("inquiry.options.commercial")}</option>
                  <option value="oem">{t("inquiry.options.oem")}</option>
                  <option value="other">{t("inquiry.options.other")}</option>
                </select>
                <textarea rows={4} className="w-full resize-none rounded-xl border border-white/10 bg-surface-800 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/30 focus:border-brand-500/50 focus:shadow-[0_0_0_3px_rgba(39,136,255,0.1)]" placeholder={t("inquiry.message")} />
                <button type="button" className="group relative w-full overflow-hidden rounded-2xl bg-brand-600 px-6 py-4 text-sm font-semibold transition-all hover:bg-brand-500">
                  <span className="relative z-10">{t("inquiry.submit")}</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <p className="text-center text-xs text-white/30">{t("inquiry.demoNote")}</p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


