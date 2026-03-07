import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, LocateFixed } from "lucide-react";

const PRAYER_NAMES = {
  Fajr: "Sabahu",
  Dhuhr: "Dreka",
  Asr: "Ikindia",
  Maghrib: "Akshami",
  Isha: "Jacia",
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

export default function PrayerTimesWidget() {
  const [times, setTimes] = useState(null);
  const [city, setCity] = useState("Tirane");
  const [coords, setCoords] = useState(null); // { lat, lng }
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

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

  const SHOW_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-base">Kohët e Namazit</h3>
        </div>
        <div className="flex items-center gap-1 bg-white/10 rounded-xl px-2 py-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-300" />
          <select value={city} onChange={e => setCity(e.target.value)}
            className="bg-transparent text-white text-xs font-semibold outline-none cursor-pointer">
            <option value="Tirane" className="text-black">Tiranë</option>
            <option value="Durres" className="text-black">Durrës</option>
            <option value="Shkoder" className="text-black">Shkodër</option>
            <option value="Vlore" className="text-black">Vlorë</option>
            <option value="Elbasan" className="text-black">Elbasan</option>
            <option value="Skopje" className="text-black">Shkup</option>
            <option value="Pristina" className="text-black">Prishtinë</option>
          </select>
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
            // Për Fajr, shfaqim Sabahun (Fajr+30min) si kohë kryesore dhe Fajrin si nënshënim
            const displayTime = prayer === "Fajr" ? sabahTime : times[prayer];
            const displayName = PRAYER_NAMES[prayer] || prayer;
            return (
              <motion.div key={prayer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${
                  isNext ? "bg-emerald-500/30 border border-emerald-500/50" : "bg-white/5"
                }`}>
                <div className="flex items-center gap-2">
                  {isNext && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                  <div>
                    <span className={`text-sm font-semibold ${isNext ? "text-emerald-300" : "text-gray-300"}`}>
                      {displayName}
                    </span>
                    {prayer === "Fajr" && fajrTime && (
                      <p className="text-[10px] text-gray-500">Fajri (ezani): {fajrTime}</p>
                    )}
                  </div>
                </div>
                <span className={`font-bold text-sm ${isNext ? "text-emerald-300" : "text-white"}`}>
                  {displayTime}
                </span>
              </motion.div>
            );
          })}
          {/* Lindja e Diellit */}
          {sunriseTime && (
            <div className="flex items-center justify-between rounded-2xl px-4 py-2 bg-white/5">
              <span className="text-xs text-amber-300">☀️ Lindja e Diellit</span>
              <span className="text-xs font-semibold text-amber-300">{sunriseTime}</span>
            </div>
          )}
          <p className="text-xs text-gray-500 text-center mt-2 pt-2 border-t border-white/10">
            Ora aktuale: {currentTime.toLocaleTimeString("sq-AL", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      )}
    </div>
  );
}