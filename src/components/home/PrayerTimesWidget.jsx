import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, LocateFixed, Bell, Settings2 } from "lucide-react";
import PrayerAzan from "./PrayerAzan";
import PrayerAlarmSettings from "./PrayerAlarmSettings";
import PrayerAlarmManager from "./PrayerAlarmManager";

const PRAYER_NAMES = {
  Fajr: "Sabahu",
  Dhuhr: "Dreka",
  Asr: "Ikindia",
  Maghrib: "Akshami",
  Isha: "Jacia",
};

// Ikona dhe ngjyra për çdo namaz
const PRAYER_ICONS = {
  Fajr:    { emoji: "🌄", label: "Agimi", color: "text-sky-300",    bg: "bg-sky-500/10",    border: "border-sky-500/20"    },
  Dhuhr:   { emoji: "☀️",  label: "Mesditja", color: "text-yellow-300", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  Asr:     { emoji: "🌤️", label: "Pasditja", color: "text-orange-300", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  Maghrib: { emoji: "🌇", label: "Perëndimi", color: "text-rose-300",   bg: "bg-rose-500/10",   border: "border-rose-500/20"   },
  Isha:    { emoji: "🌙", label: "Nata",     color: "text-indigo-300", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
};

// Shton minuta në formatin HH:MM dhe kthen HH:MM
function addMinutes(timeStr, mins) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + mins;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
}

export default function PrayerTimesWidget({ onPrayerTimesUpdate }) {
  const [times, setTimes] = useState(null);
  const [city, setCity] = useState("Tirane");
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [azanId, setAzanId] = useState(() => localStorage.getItem("prayerAzanId") || "makkah");
  const [showAlarmSettings, setShowAlarmSettings] = useState(false);
  const [showAzanPanel, setShowAzanPanel] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (times && onPrayerTimesUpdate) {
      onPrayerTimesUpdate(times);
    }
  }, [times, onPrayerTimesUpdate]);

  const fetchByCoords = async (lat, lng) => {
    setLoading(true); setError(null);
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=3`);
      const data = await res.json();
      if (data.data?.timings) {
        setTimes(data.data.timings);
      } else {
        setError("Nuk u gjeten kohët");
      }
    } catch {
      setError("Nuk u lidh me serverin");
    }
    setLoading(false);
  };

  const fetchByCity = async (cityName) => {
    setLoading(true); setError(null);
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(cityName)}&country=Albania&method=3`);
      const data = await res.json();
      if (data.data?.timings) {
        setTimes(data.data.timings);
      } else {
        setError("Nuk u gjeten kohët");
      }
    } catch {
      setError("Nuk u lidh me serverin");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (coords) {
      fetchByCoords(coords.lat, coords.lng);
    } else {
      fetchByCity(city);
    }
  }, [city, coords]);

  const detectLocation = () => {
    if (!navigator.geolocation) { setError("GPS nuk mbështetet nga shfletuesi."); return; }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        // Reverse geocode to get city name
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
          const d = await r.json();
          const name = d.address?.city || d.address?.town || d.address?.village || d.address?.county || "Vendndodhja";
          setLocationName(name);
        } catch {
          setLocationName("Vendndodhja GPS");
        }
        setGpsLoading(false);
      },
      () => { setError("GPS nuk u lejua. Zgjidh qytetin manualisht."); setGpsLoading(false); }
    );
  };

  const getNextPrayer = () => {
    if (!times) return null;
    const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    for (const p of order) {
      const [h, m] = (times[p] || "00:00").split(":").map(Number);
      if (h * 60 + m > now) return p;
    }
    return "Fajr";
  };

  const nextPrayer = getNextPrayer();

  // Sabahu = Fajr + 30 minuta; Imsaku = koha e Fajrit; Lindja = Sunrise nga API
  const fajrTime = times?.Fajr || "";
  const sabahTime = fajrTime ? addMinutes(fajrTime, 30) : "";
  const imsakTime = times?.Imsak || fajrTime;
  const sunriseTime = times?.Sunrise || "";

  const handleAzanChange = (id) => {
    setAzanId(id);
    localStorage.setItem("prayerAzanId", id);
  };

  const SHOW_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white">
      <PrayerAlarmManager times={times} azanId={azanId} sabahTime={sabahTime} />
      <PrayerAlarmSettings open={showAlarmSettings} onClose={() => setShowAlarmSettings(false)} />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-base">Kohët e Namazit</h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Alarm settings */}
          <button onClick={() => setShowAlarmSettings(true)}
            className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl px-2 py-1 transition-colors"
            title="Alarmet & Xhamia">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
          </button>
          {/* Azan toggle */}
          <button onClick={() => setShowAzanPanel(!showAzanPanel)}
            className="flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-xl px-2 py-1 transition-colors"
            title="Zgjidhni Ezanin">
            <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
          </button>
          {/* GPS Button */}
          <button onClick={detectLocation} disabled={gpsLoading}
            className="flex items-center gap-1 bg-emerald-600/40 hover:bg-emerald-600/60 rounded-xl px-2 py-1 transition-colors"
            title="Zbulo vendndodhjen aktuale">
            {gpsLoading
              ? <div className="w-3.5 h-3.5 border-2 border-emerald-300 border-t-transparent rounded-full animate-spin" />
              : <LocateFixed className="w-3.5 h-3.5 text-emerald-300" />}
            <span className="text-xs text-emerald-200 font-semibold">
              {locationName ? locationName : "GPS"}
            </span>
          </button>
          {/* Manual city selector — hidden when GPS active */}
          {!coords && (
            <div className="flex items-center gap-1 bg-white/10 rounded-xl px-2 py-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <select value={city} onChange={e => { setCoords(null); setLocationName(null); setCity(e.target.value); }}
                className="bg-transparent text-white text-xs font-semibold outline-none cursor-pointer">
                <option value="Tirane" className="text-black">Tiranë</option>
                <option value="Durres" className="text-black">Durrës</option>
                <option value="Shkoder" className="text-black">Shkodër</option>
                <option value="Vlore" className="text-black">Vlorë</option>
                <option value="Elbasan" className="text-black">Elbasan</option>
                <option value="Skopje" className="text-black">Shkup</option>
                <option value="Pristina" className="text-black">Prishtinë</option>
                <option value="Prizren" className="text-black">Prizren</option>
                <option value="Tetovo" className="text-black">Tetovë</option>
              </select>
            </div>
          )}
          {coords && (
            <button onClick={() => { setCoords(null); setLocationName(null); }}
              className="text-[10px] text-gray-400 hover:text-white underline">
              ✕ Manual
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-6">
          <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-center py-4 text-red-300 text-sm">{error}</div>
      )}

      {showAzanPanel && (
        <PrayerAzan selectedAzan={azanId} onChange={handleAzanChange} />
      )}

      {times && !loading && (
        <div className="space-y-2">
          {/* Imsak */}
          {imsakTime && (
            <div className="flex items-center justify-between rounded-2xl px-4 py-2 bg-white/5">
              <span className="text-xs text-gray-400">🌙 Imsaku (fillim agjërimi)</span>
              <span className="text-xs font-semibold text-gray-400">{imsakTime}</span>
            </div>
          )}
          {SHOW_PRAYERS.map(prayer => {
            const isNext = prayer === nextPrayer;
            const displayTime = prayer === "Fajr" ? sabahTime : times[prayer];
            const displayName = PRAYER_NAMES[prayer] || prayer;
            const icon = PRAYER_ICONS[prayer];
            return (
              <React.Fragment key={prayer}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all border ${
                    isNext
                      ? "bg-emerald-500/30 border-emerald-500/50"
                      : `${icon.bg} ${icon.border}`
                  }`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{icon.emoji}</span>
                    {isNext && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                    <div>
                      <span className={`text-sm font-semibold ${isNext ? "text-emerald-300" : icon.color}`}>
                        {displayName}
                      </span>
                      {prayer === "Fajr" && fajrTime && (
                        <p className="text-[10px] text-gray-500">Ezani (Fajr): {fajrTime}</p>
                      )}
                      {!isNext && (
                        <p className={`text-[10px] opacity-60 ${icon.color}`}>{icon.label}</p>
                      )}
                    </div>
                  </div>
                  <span className={`font-bold text-sm ${isNext ? "text-emerald-300" : icon.color}`}>
                    {displayTime}
                  </span>
                </motion.div>
                {/* Lindja e Diellit — direkt pas Sabahut/Fajr */}
                {prayer === "Fajr" && sunriseTime && (
                  <div className="flex items-center justify-between rounded-2xl px-4 py-2 bg-amber-500/10 border border-amber-500/20">
                    <span className="text-xs text-amber-300 flex items-center gap-1.5">☀️ <span>Lindja e Diellit</span></span>
                    <span className="text-xs font-semibold text-amber-300">{sunriseTime}</span>
                  </div>
                )}
                {/* Perëndimi i Diellit = Maghrib nga API (GPS bazuar) */}
                {prayer === "Maghrib" && times?.Sunset && (
                  <div className="flex items-center justify-between rounded-2xl px-4 py-2 bg-rose-500/10 border border-rose-500/20">
                    <span className="text-xs text-rose-300 flex items-center gap-1.5">🌅 <span>Perëndimi i Diellit</span></span>
                    <span className="text-xs font-semibold text-rose-300">{times.Sunset}</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
          <p className="text-xs text-gray-500 text-center mt-2 pt-2 border-t border-white/10">
            Ora aktuale: {currentTime.toLocaleTimeString("sq-AL", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      )}
    </div>
  );
}