import { useEffect, useRef } from "react";
import { loadAlarmSettings } from "./PrayerAlarmSettings";

const PRAYER_NAMES = {
  Fajr: "Sabahu",
  Dhuhr: "Dreka",
  Asr: "Ikindia",
  Maghrib: "Akshami",
  Isha: "Jacia",
};
const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const AZAN_URLS = {
  makkah: "https://www.islamcan.com/audio/adhan/azan1.mp3",
  madina: "https://www.islamcan.com/audio/adhan/azan2.mp3",
  egypt: "https://www.islamcan.com/audio/adhan/azan3.mp3",
  fajr: "https://www.islamcan.com/audio/adhan/azan4.mp3",
};

function timeToMinutes(timeStr) {
  if (!timeStr) return -1;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function showNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body, icon: "/favicon.ico" });
  }
}

function tryVibrateOrSilent(type, durationMs) {
  if (type === "vibrate" && navigator.vibrate) {
    navigator.vibrate([500, 300, 500, 300, 500]);
  }
  // Note: Web APIs cannot programmatically silence the phone — this is by design for security.
  // We notify the user to do it manually.
  showNotification(
    type === "vibrate" ? "📳 Kaloni në dridhjeje" : "🔇 Kaloni telefonin në heshtje",
    `Jeni në xhami. Kohëzgjatja: ${durationMs / 60000} minuta.`
  );
}

export default function PrayerAlarmManager({ times, azanId, sabahTime }) {
  const firedRef = useRef(new Set());
  const audioRef = useRef(null);

  useEffect(() => {
    if (!times) return;
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const settings = loadAlarmSettings();
      const now = new Date();
      const nowMin = now.getHours() * 60 + now.getMinutes();
      const todayKey = now.toDateString();

      PRAYERS.forEach((prayer) => {
        if (!settings.enabledPrayers[prayer]) return;

        // Get the actual prayer time (Fajr uses sabahTime)
        const rawTime = prayer === "Fajr" ? sabahTime : times[prayer];
        const prayerMin = timeToMinutes(rawTime);
        if (prayerMin < 0) return;

        // Alarm before prayer
        const alarmMin = prayerMin - settings.minutesBefore;
        const alarmKey = `${todayKey}-${prayer}-before`;
        if (settings.minutesBefore > 0 && nowMin === alarmMin && !firedRef.current.has(alarmKey)) {
          firedRef.current.add(alarmKey);
          showNotification(
            `🕌 ${PRAYER_NAMES[prayer]} pas ${settings.minutesBefore} minutash`,
            `Bëhuni gati për namaz! Koha e ${PRAYER_NAMES[prayer]}: ${rawTime}`
          );
        }

        // At prayer time: play azan + mosque mode
        const prayerKey = `${todayKey}-${prayer}-azan`;
        if (nowMin === prayerMin && !firedRef.current.has(prayerKey)) {
          firedRef.current.add(prayerKey);

          // Play azan
          const azanUrl = AZAN_URLS[azanId];
          if (azanUrl && azanId !== "none") {
            if (audioRef.current) { audioRef.current.pause(); }
            audioRef.current = new Audio(azanUrl);
            audioRef.current.volume = 0.8;
            audioRef.current.play().catch(() => {});
          }

          showNotification(
            `🕌 Koha e ${PRAYER_NAMES[prayer]}`,
            `Allahu Akbar! Ka ardhur koha e ${PRAYER_NAMES[prayer]}.`
          );

          // Mosque mode: activate at azan, schedule deactivation notification after N minutes
          if (settings.mosqueModeEnabled) {
            const deactivateMin = settings.mosqueDeactivateMinutes ?? 29;
            tryVibrateOrSilent(settings.mosqueModeType, deactivateMin * 60000);
            // Schedule deactivation notification
            setTimeout(() => {
              showNotification(
                "🔔 Namazi u krye",
                `Kaloi ${deactivateMin} minuta — mund ta kaloni telefonin në tingull normal.`
              );
              if (settings.mosqueModeType === "vibrate" && navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
              }
            }, deactivateMin * 60000);
          }
        }
      });
    }, 15000); // check every 15 seconds

    return () => clearInterval(interval);
  }, [times, azanId, sabahTime]);

  return null;
}