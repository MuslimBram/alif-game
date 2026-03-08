import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Settings as SettingsIcon, Globe, Moon, Sun, Bell, Save, User, Palette, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const LANGUAGES = [
  { code: "sq", label: "Shqip", flag: "🇦🇱", dialects: ["Standard", "Gegërishte", "Toskërishte"] },
  { code: "en", label: "English", flag: "🇬🇧", dialects: ["British", "American"] },
  { code: "ar", label: "العربية", flag: "🇸🇦", dialects: ["Fusha (Standard)", "Hixhazi", "Misri"] },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", dialects: ["Standard"] },
  { code: "de", label: "Deutsch", flag: "🇩🇪", dialects: ["Standard"] },
];

const THEMES = [
  { id: "light", label: "E çelët", icon: Sun, preview: "bg-white border-gray-200" },
  { id: "dark", label: "E errët", icon: Moon, preview: "bg-gray-900 border-gray-700" },
  { id: "emerald", label: "Gjelbërt", icon: Palette, preview: "bg-emerald-50 border-emerald-200" },
];

const DEFAULT_SETTINGS = {
  language: "sq",
  dialect: "Standard",
  theme: "light",
  notifications_enabled: true,
  notify_daily_reminder: true,
  notify_challenges: true,
  notify_group_activity: true,
  notify_achievements: true,
  sync_progress: true,
  auto_play_audio: true,
  font_size: "medium",
};

export default function Settings() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const authed = await base44.auth.isAuthenticated();
        setIsAuthenticated(authed);
        if (authed) {
          const u = await base44.auth.me();
          setUser(u);
          // Load saved settings from user profile
          if (u.settings) {
            setSettings({ ...DEFAULT_SETTINGS, ...u.settings });
          } else {
            // Try localStorage as fallback
            const local = localStorage.getItem("app_settings");
            if (local) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
          }
        } else {
          const local = localStorage.getItem("app_settings");
          if (local) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
        }
      } catch (e) {}
      setLoading(false);
    };
    load().then(() => {
      const local = localStorage.getItem("app_settings");
      if (local) {
        const s = JSON.parse(local);
        if (s.font_size) applyFontSize(s.font_size);
      }
    });
  }, []);

  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    // Always save to localStorage
    localStorage.setItem("app_settings", JSON.stringify(settings));
    // Also apply theme immediately
    applyTheme(settings.theme);

    if (isAuthenticated) {
      try {
        await base44.auth.updateMe({ settings });
        toast.success("Cilësimet u ruajtën dhe u sinkronizuan!");
      } catch (e) {
        toast.success("Cilësimet u ruajtën lokalisht!");
      }
    } else {
      toast.success("Cilësimet u ruajtën!");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.classList.remove("dark");
    document.body.style.background = "";
    document.body.style.setProperty("--theme-override", "");
    if (theme === "dark") {
      root.classList.add("dark");
      document.body.style.background = "#111827";
    } else if (theme === "emerald") {
      document.body.style.background = "linear-gradient(180deg, #d1fae5 0%, #ffffff 50%, #d1fae5 100%)";
      root.style.setProperty("--color-primary", "#059669");
    } else {
      root.style.removeProperty("--color-primary");
    }
  };

  const applyFontSize = (size) => {
    const root = document.documentElement;
    if (size === "small") root.style.fontSize = "13px";
    else if (size === "large") root.style.fontSize = "18px";
    else root.style.fontSize = "16px";
  };

  const selectedLang = LANGUAGES.find(l => l.code === settings.language) || LANGUAGES[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Cilësimet Personale</h1>
          <p className="text-sm text-gray-500">Personalizo përvojën tënde të mësimit</p>
        </div>
      </div>

      {/* User info */}
      {user && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
            {user.full_name?.[0] || "U"}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.full_name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full font-semibold">
            <Check className="w-3 h-3" /> Sinkronizim aktiv
          </div>
        </div>
      )}

      <div className="space-y-5">
        {/* Language Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-gray-900">Gjuha dhe Dialekti</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {LANGUAGES.map(lang => (
              <button key={lang.code} onClick={() => { update("language", lang.code); update("dialect", lang.dialects[0]); }}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${settings.language === lang.code ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                <span className="text-lg">{lang.flag}</span>
                {lang.label}
                {settings.language === lang.code && <Check className="w-3.5 h-3.5 ml-auto text-emerald-600" />}
              </button>
            ))}
          </div>
          {selectedLang.dialects.length > 1 && (
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Dialekti i preferuar</Label>
              <div className="flex flex-wrap gap-2">
                {selectedLang.dialects.map(d => (
                  <button key={d} onClick={() => update("dialect", d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all ${settings.dialect === d ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-gray-900">Tema</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {THEMES.map(theme => {
              const Icon = theme.icon;
              return (
                <button key={theme.id} onClick={() => { update("theme", theme.id); applyTheme(theme.id); }}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${settings.theme === theme.id ? "border-emerald-500 ring-2 ring-emerald-100" : "border-gray-200 hover:border-gray-300"}`}>
                  <div className={`w-full h-10 rounded-lg mb-2 border ${theme.preview}`} />
                  <div className="flex items-center justify-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{theme.label}</span>
                  </div>
                  {settings.theme === theme.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <Label className="text-xs text-gray-500 mb-2 block">Madhësia e shkrimit</Label>
            <div className="flex gap-2">
              {["small", "medium", "large"].map(size => (
                <button key={size} onClick={() => { update("font_size", size); applyFontSize(size); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${settings.font_size === size ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"}`}>
                  {size === "small" ? "I vogël" : size === "medium" ? "Normal" : "I madh"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-gray-900">Njoftimet</h2>
            </div>
            <Switch checked={settings.notifications_enabled} onCheckedChange={v => update("notifications_enabled", v)} />
          </div>
          {settings.notifications_enabled && (
            <div className="space-y-3">
              {[
                { key: "notify_daily_reminder", label: "Kujtues ditor mësimi", icon: "📅" },
                { key: "notify_challenges", label: "Sfida të reja", icon: "⚔️" },
                { key: "notify_group_activity", label: "Aktiviteti i grupit", icon: "👥" },
                { key: "notify_achievements", label: "Arritje dhe badges", icon: "🏆" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <Switch checked={settings[item.key]} onCheckedChange={v => update(item.key, v)} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sync & Learning Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-gray-900">Sinkronizimi dhe Mësimi</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <p className="text-sm font-semibold text-emerald-800">🧠 Niveli përcaktohet automatikisht</p>
              <p className="text-xs text-emerald-600 mt-1">Niveli juaj llogaritet automatikisht bazuar në rezultatet e testeve dhe kuizeve që bëni në platformë. Sa më shumë teste bëni, aq më saktë është niveli juaj.</p>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-50">
              <div>
                <p className="text-sm font-semibold text-gray-700">Luaj audio automatikisht</p>
                <p className="text-xs text-gray-400">Shqiptimi automatik gjatë mësimit</p>
              </div>
              <Switch checked={settings.auto_play_audio} onCheckedChange={v => update("auto_play_audio", v)} />
            </div>
          </div>
          {!isAuthenticated && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              ⚠️ Hyr në llogari për të sinkronizuar progresin ndërmjet pajisjeve.
              <button onClick={() => base44.auth.redirectToLogin()} className="ml-1 underline font-semibold">Hyr tani</button>
            </div>
          )}
        </div>

        {/* Admin Panel Link — only for admins */}
        {user?.role === "admin" && (
          <Link to={createPageUrl("AdminPanel")}
            className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl p-5 shadow-lg hover:opacity-90 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-base">Admin Panel</p>
              <p className="text-xs text-red-100">Ndrysho ose shto përmbajtje në të gjitha faqet</p>
            </div>
            <span className="text-white/70 text-lg">→</span>
          </Link>
        )}

        {/* Save Button */}
        <Button onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-bold text-base shadow-lg transition-all ${saved ? "bg-emerald-500" : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90"}`}>
          {saved ? <><Check className="w-5 h-5 mr-2" /> U ruajtën!</> : <><Save className="w-5 h-5 mr-2" /> Ruaj Cilësimet</>}
        </Button>
      </div>
    </div>
  );
}