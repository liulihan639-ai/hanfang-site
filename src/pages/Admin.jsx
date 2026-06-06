import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const GITHUB_REPO = "liulihan639-ai/hanfang-site";
const GITHUB_BRANCH = "main";

const sectionMap = {
  nav: { label: "Navigation / 导航栏", fileEn: "content/en/nav.json", fileZh: "content/zh/nav.json" },
  hero: { label: "Hero Banner / 首屏横幅", fileEn: "content/en/hero.json", fileZh: "content/zh/hero.json" },
  highlights: { label: "Why Hanfang / 优势展示", fileEn: "content/en/highlights.json", fileZh: "content/zh/highlights.json" },
  products: { label: "Products / 产品家族", fileEn: "content/en/products.json", fileZh: "content/zh/products.json" },
  usecases: { label: "Use Cases / 应用场景", fileEn: "content/en/usecases.json", fileZh: "content/zh/usecases.json" },
  specs: { label: "Specs / 技术规格", fileEn: "content/en/specs.json", fileZh: "content/zh/specs.json" },
  inquiry: { label: "Inquiry / 询盘表单", fileEn: "content/en/inquiry.json", fileZh: "content/zh/inquiry.json" },
  footer: { label: "Footer / 页脚", fileEn: "content/en/footer.json", fileZh: "content/zh/footer.json" },
};

function JsonEditor({ data, onChange, path = "" }) {
  if (data === null || data === undefined) return null;
  if (typeof data === "string") {
    return (
      <div className="mb-2">
        <label className="block text-xs text-white/40 mb-1">{path}</label>
        <textarea className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white resize-y" rows={2} value={data} onChange={(e) => onChange(path, e.target.value)} />
      </div>
    );
  }
  if (typeof data === "number") {
    return (
      <div className="mb-2">
        <label className="block text-xs text-white/40 mb-1">{path}</label>
        <input type="number" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" value={data} onChange={(e) => onChange(path, Number(e.target.value))} />
      </div>
    );
  }
  if (Array.isArray(data)) {
    return (
      <div className="mb-3 border-l-2 border-white/10 pl-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white/50">{path} [{data.length}]</span>
          <button onClick={() => onChange(path, [...data, typeof data[0] === "string" ? "" : {}])} className="rounded bg-brand-600 px-2 py-0.5 text-xs text-white">+ Add</button>
        </div>
        {data.map((item, i) => (
          <div key={i} className="flex gap-2 items-start mb-1">
            <span className="text-xs text-white/30 mt-2 w-5">{i}</span>
            <div className="flex-1">
              <JsonEditor data={item} onChange={(p, v) => { const a = [...data]; a[i] = v; onChange(path, a); }} path={`${path}[${i}]`} />
            </div>
            <button onClick={() => onChange(path, data.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 text-xs mt-2">✕</button>
          </div>
        ))}
      </div>
    );
  }
  if (typeof data === "object") {
    return (
      <div className="mb-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-2 border-l-2 border-white/5 pl-3">
            <div className="text-xs font-medium text-white/40 mb-1">{key}</div>
            <JsonEditor data={value} onChange={onChange} path={path ? `${path}.${key}` : key} />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function EditorPanel({ title, content, onContentChange }) {
  const handleChange = (path, value) => {
    const keys = path.split(".");
    const newContent = JSON.parse(JSON.stringify(content));
    let obj = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      const m = k.match(/^(.+)\[(\d+)\]$/);
      obj = m ? obj[m[1]][parseInt(m[2])] : obj[k];
    }
    const lastKey = keys[keys.length - 1];
    const lastMatch = lastKey.match(/^(.+)\[(\d+)\]$/);
    if (lastMatch) { obj[lastMatch[1]][parseInt(lastMatch[2])] = value; }
    else { obj[lastKey] = value; }
    onContentChange(newContent);
  };
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      <div className="space-y-1"><JsonEditor data={content} onChange={handleChange} /></div>
    </div>
  );
}

function LoginScreen({ token, setToken, handleLogin }) {
  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Hanfang CMS</h1>
          <p className="text-white/40 text-sm mt-2">Enter your GitHub token to access the admin panel</p>
        </div>
        <input type="password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white mb-4" placeholder="GitHub Personal Access Token" value={token} onChange={(e) => setToken(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
        <button onClick={handleLogin} className="w-full rounded-xl bg-brand-600 py-3 font-semibold hover:bg-brand-500 transition-colors">Login</button>
        <p className="text-white/30 text-xs text-center mt-4">Token stored locally. Create one at github.com/settings/tokens with <code className="text-brand-400">repo</code> scope.</p>
      </div>
    </div>
  );
}

const TABS = [
  { id: "cms", label: "📝 Content Editor" },
  { id: "studio", label: "🎨 Sanity Studio" },
];

export default function Admin() {
  const { lang } = useLanguage();
  const [token, setToken] = useState(() => localStorage.getItem("hf-admin-token") || "");
  const [authenticated, setAuthenticated] = useState(() => !!token);
  const [activeTab, setActiveTab] = useState("cms");
  const [activeSection, setActiveSection] = useState("hero");
  const [enContent, setEnContent] = useState({});
  const [zhContent, setZhContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [shaCache, setShaCache] = useState({});

  const handleLogin = async () => {
    try {
      const r = await fetch("https://api.github.com/user", { headers: { Authorization: `token ${token}` } });
      if (!r.ok) throw new Error("Invalid token");
      localStorage.setItem("hf-admin-token", token);
      setAuthenticated(true);
    } catch { alert("Invalid token. Please check your GitHub token."); }
  };

  useEffect(() => {
    if (!authenticated) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const contents = {};
      const shas = {};
      for (const [key, sec] of Object.entries(sectionMap)) {
        for (const [langCode, store] of [["en", "enContent"], ["zh", "zhContent"]]) {
          const file = langCode === "en" ? sec.fileEn : sec.fileZh;
          try {
            const r = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${file}?ref=${GITHUB_BRANCH}`, {
              headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" },
            });
            if (r.ok) {
              const data = await r.json();
              shas[file] = data.sha;
              const decoded = JSON.parse(decodeURIComponent(escape(atob(data.content))));
              if (!contents[langCode]) contents[langCode] = {};
              contents[langCode][key] = decoded;
            }
          } catch {}
        }
      }
      if (!cancelled) {
        setEnContent(contents.en || {});
        setZhContent(contents.zh || {});
        setShaCache(shas);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [authenticated, token]);

  const saveSection = async (sectionKey) => {
    setSaving(true); setMessage("");
    const section = sectionMap[sectionKey];
    try {
      for (const [langCode, data, file] of [
        ["en", enContent[sectionKey], section.fileEn],
        ["zh", zhContent[sectionKey], section.fileZh],
      ]) {
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2) + "\n")));
        const body = { message: `Update ${file} via admin panel`, content, branch: GITHUB_BRANCH, sha: shaCache[file] };
        const r = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${file}`, {
          method: "PUT",
          headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json", "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (r.ok) {
          const res = await r.json();
          shaCache[file] = res.content.sha;
          setShaCache({ ...shaCache });
          setMessage("✅ Saved!");
        } else { setMessage("❌ Save failed"); }
      }
    } catch { setMessage("❌ Error saving"); }
    setSaving(false);
  };

  if (!authenticated) return <LoginScreen token={token} setToken={setToken} handleLogin={handleLogin} />;

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <div className="text-white/50">Loading content...</div>
      </div>
    );
  }

  const currentSection = sectionMap[activeSection];
  const hasContent = enContent[activeSection] && zhContent[activeSection];
  const STUDIO_URL = import.meta.env.VITE_SANITY_STUDIO_URL || "http://localhost:3333";

  return (
    <div className="min-h-screen bg-surface-900 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-surface-900/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <h1 className="font-bold">Hanfang CMS</h1>
            <span className="text-xs text-white/30">|</span>
            <a href="/" className="text-xs text-white/40 hover:text-white">View Site →</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors ${activeTab === t.id ? "bg-brand-600 text-white" : "text-white/50 hover:text-white"}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <span className="text-xs text-white/30">{message}</span>
            <button onClick={() => { localStorage.removeItem("hf-admin-token"); setAuthenticated(false); }} className="text-xs text-white/40 hover:text-white">Logout</button>
          </div>
        </div>
      </header>

      {activeTab === "cms" && (
        <div className="mx-auto flex max-w-7xl">
          <aside className="w-56 shrink-0 border-r border-white/5 p-4 space-y-1">
            {Object.entries(sectionMap).map(([key, { label }]) => (
              <button key={key} onClick={() => setActiveSection(key)}
                className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${activeSection === key ? "bg-brand-600/20 text-brand-300" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                {label}
              </button>
            ))}
          </aside>
          <main className="flex-1 p-6 overflow-auto">
            {hasContent ? (
              <div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">🇬🇧 English</span>
                    </div>
                    <EditorPanel title="" content={enContent[activeSection]} onContentChange={(v) => setEnContent({...enContent, [activeSection]: v})} />
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">🇨🇳 中文</span>
                    </div>
                    <EditorPanel title="" content={zhContent[activeSection]} onContentChange={(v) => setZhContent({...zhContent, [activeSection]: v})} />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => saveSection(activeSection)} disabled={saving}
                    className="rounded-xl bg-brand-600 px-8 py-3 font-semibold hover:bg-brand-500 transition-colors disabled:opacity-50">
                    {saving ? "Saving..." : "💾 Save Changes"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-white/30 text-center py-20">Click a section on the left to edit content</div>
            )}
          </main>
        </div>
      )}

      {activeTab === "studio" && (
        <div className="h-[calc(100vh-57px)]">
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
            <p className="text-sm text-white/50">
              Sanity Studio provides a rich editing experience for all content.
            </p>
            <div className="flex gap-2">
              <a href={STUDIO_URL} target="_blank" rel="noopener noreferrer"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-500 transition-colors">
                Open Studio ↗
              </a>
            </div>
          </div>
          <iframe src={STUDIO_URL} className="w-full h-[calc(100%-57px)] border-0" title="Sanity Studio" />
        </div>
      )}
    </div>
  );
}
