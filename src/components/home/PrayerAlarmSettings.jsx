import React, { useState, useEffect } from "react";
import { Bell, BellOff, Vibrate, VolumeX, Clock } from "lucide-react";

const PRAYER_NAMES = {
  Fajr: "Sabahu",
  Dhuhr: "Dreka",
  Asr: "Ikindia",
  Maghrib: "Akshami",
  Isha: "Jacia",
};
const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const DEFAULT_SETTINGS = {
  enabledPrayers: { Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true },
  minutesBefore: 10,
  mosqueModeEnabled: false,
  mosqueModeType: "vibrate", // "vibrate" | "silent"
  mosqueDurationMinutes: 30,
};

export function loadAlarmSettings() {
  try {
    const s = localStorage.getItem("prayerAlarmSettings");
    return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAlarmSettings(settings) {
  localStorage.setItem("prayerAlarmSettings", JSON.stringify(settings));
}

export default function PrayerAlarmSettings({ open, onClose }) {
  const [settings, setSettings] = useState(loadAlarmSettings);

  const update = (key, val) => {
    const next = { ...settings, [key]: val };
    setSettings(next);
    saveAlarmSettings(next);
  };

  const togglePrayer = (p) => {
    const next = { ...settings.enabledPrayers, [p]: !settings.enabledPrayers[p] };
    update("enabledPrayers", next);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-5 w-full max-w-sm mx-4 mb-4 sm:mb-0 text-white shadow-2xl"
        onClick={e => e.stopPropagation()}>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">Alarmet e Namazit</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg leading-none">✕</button>
        </div>

        {/* Minutes before alarm */}
        <div className="bg-white/5 rounded-2xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold">Njoftim para namazit</span>
            </div>
            <span className="text-amber-300 font-bold text-sm">{settings.minutesBefore} min</span>
          </div>
          <input
            type="range"
            min={0} max={30} step={5}
            value={settings.minutesBefore}
            onChange={e => update("minutesBefore", Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>0 min</span><span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30 min</span>
          </div>
        </div>

        {/* Prayer toggles */}
        <div className="bg-white/5 rounded-2xl p-3 mb-3">
          <p className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">Aktivizo alarmin për:</p>
          <div className="grid grid-cols-2 gap-2">
            {PRAYERS.map(p => (
              <button key={p} onClick={() => togglePrayer(p)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  settings.enabledPrayers[p]
                    ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                    : "bg-white/5 text-gray-500 border border-white/5"
                }`}>
                {settings.enabledPrayers[p]
                  ? <Bell className="w-3.5 h-3.5" />
                  : <BellOff className="w-3.5 h-3.5" />}
                {PRAYER_NAMES[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Mosque mode */}
        <div className="bg-white/5 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🕌</span>
              <span className="text-sm font-semibold">Mënyra e Xhamisë</span>
            </div>
            <button onClick={() => update("mosqueModeEnabled", !settings.mosqueModeEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                settings.mosqueModeEnabled ? "bg-emerald-500" : "bg-gray-600"
              }`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.mosqueModeEnabled ? "translate-x-5" : "translate-x-0.5"
              }`} />
            </button>
          </div>
          {settings.mosqueModeEnabled && (
            <>
              <p className="text-xs text-gray-400 mb-2">Telefoni kalon automatikisht në:</p>
              <div className="flex gap-2 mb-3">
                <button onClick={() => update("mosqueModeType", "vibrate")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all ${
                    settings.mosqueModeType === "vibrate"
                      ? "bg-violet-600/30 text-violet-300 border border-violet-500/40"
                      : "bg-white/5 text-gray-400"
                  }`}>
                  <Vibrate className="w-3.5 h-3.5" /> Dridhjeje
                </button>
                <button onClick={() => update("mosqueModeType", "silent")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all ${
                    settings.mosqueModeType === "silent"
                      ? "bg-slate-600/50 text-gray-200 border border-gray-500/40"
                      : "bg-white/5 text-gray-400"
                  }`}>
                  <VolumeX className="w-3.5 h-3.5" /> Heshtje
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Kohëzgjatja në xhami</span>
                <div className="flex items-center gap-2">
                  <input type="range" min={15} max={90} step={15}
                    value={settings.mosqueDurationMinutes}
                    onChange={e => update("mosqueDurationMinutes", Number(e.target.value))}
                    className="w-24 accent-violet-400" />
                  <span className="text-xs text-violet-300 font-bold w-10 text-right">
                    {settings.mosqueDurationMinutes} min
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                ⚠️ Disa shfletues kufizojnë aksesin te cilësimet e telefonit. 
                Aplikacioni do të njoftojë — ndryshimi mund të kërkojë konfirmimin tuaj.
              </p>
            </>
          )}
        </div>

        <button onClick={onClose}
          className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-3 text-sm font-bold transition-colors">
          Ruaj Cilësimet
        </button>
      </div>
    </div>
  );
}