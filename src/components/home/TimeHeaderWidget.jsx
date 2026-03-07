import React, { useState, useEffect } from "react";
import { Calendar, Clock, Compass } from "lucide-react";

export default function TimeHeaderWidget({ prayerTimes, timeFormat = "24" }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Gregorian calendar
  const gregorianDate = time.toLocaleDateString("sq-AL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });

  // Hijri calendar (simplified approximation)
  const hijriDate = getHijriDate(time);

  // Current time
  const currentTime = time.toLocaleTimeString("sq-AL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // Upcoming prayer
  const nextPrayer = getNextPrayer(prayerTimes, time);

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time & Calendars */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-2xl font-bold">
            <Clock className="w-6 h-6" />
            {currentTime}
          </div>

          <div className="flex items-center gap-2 text-emerald-100">
            <Calendar className="w-4 h-4" />
            <div className="text-sm">
              <p className="font-semibold">{gregorianDate}</p>
              <p className="text-xs opacity-90">{hijriDate}</p>
            </div>
          </div>
        </div>

        {/* Upcoming Prayer */}
        {nextPrayer && (
          <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-3xl">🕌</div>
            <div className="flex-1">
              <p className="text-xs opacity-90">Namazi i ardhshëm</p>
              <p className="font-bold text-lg">{nextPrayer.name}</p>
              <p className="text-sm opacity-90">{nextPrayer.time}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simplified Hijri calculation
function getHijriDate(gregorianDate) {
  const g = gregorianDate;
  const jd = Math.floor((1461 * (g.getFullYear() + 4800 + Math.floor((g.getMonth() + 1 - 14) / 12))) / 4 +
    Math.floor((367 * ((g.getMonth() + 1) - 2 - 12 * (Math.floor((g.getMonth() + 1 - 14) / 12)))) / 12) -
    Math.floor((3 * (Math.floor((g.getFullYear() + 4900 + Math.floor((g.getMonth() + 1 - 14) / 12)) / 100))) / 4) +
    g.getDate() - 32045);

  const l = jd + 68569;
  const n = Math.floor((4 * l) / 146097);
  const l2 = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l2 + 1)) / 1461001);
  const l3 = l2 - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l3) / 2447);
  const d = l3 - Math.floor((2447 * j) / 80);
  const l4 = Math.floor(j / 11);
  const m = j + 2 - 12 * l4;
  const y = 100 * (n - 49) + i + l4;

  const hijri = Math.floor((jd - 1948439.5) / 354.36667);
  const month = Math.floor(((jd - 1948439.5) % 354.36667) / 29.5306);
  const day = Math.floor(((jd - 1948439.5) % 354.36667) % 29.5306) + 1;

  const hijriMonths = ["Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani", "Jumada al-awwal",
    "Jumada al-thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"];

  return `${day} ${hijriMonths[Math.max(0, Math.min(11, month))]} ${hijri} H`;
}

function getNextPrayer(prayerTimes, currentTime) {
  if (!prayerTimes) return null;

  const now = currentTime.getHours() * 60 + currentTime.getMinutes();
  const prayers = [
    { name: "Fajr", time: prayerTimes.Fajr },
    { name: "Dhuhr", time: prayerTimes.Dhuhr },
    { name: "Asr", time: prayerTimes.Asr },
    { name: "Maghrib", time: prayerTimes.Maghrib },
    { name: "Isha", time: prayerTimes.Isha }
  ];

  for (let prayer of prayers) {
    const [h, m] = prayer.time.split(":").map(Number);
    const prayerMins = h * 60 + m;
    if (prayerMins > now) {
      return { name: prayer.name, time: prayer.time };
    }
  }

  return { name: "Fajr (Nesër)", time: prayerTimes.Fajr };
}