import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, ChevronDown } from "lucide-react";

const AZAN_OPTIONS = [
  {
    id: "makkah",
    name: "Ezan Meke (Shafi'i)",
    url: "https://www.islamcan.com/audio/adhan/azan1.mp3",
  },
  {
    id: "madina",
    name: "Ezan Medine",
    url: "https://www.islamcan.com/audio/adhan/azan2.mp3",
  },
  {
    id: "egypt",
    name: "Ezan Egjiptian",
    url: "https://www.islamcan.com/audio/adhan/azan3.mp3",
  },
  {
    id: "fajr",
    name: "Ezan Sabahut (Fajr)",
    url: "https://www.islamcan.com/audio/adhan/azan4.mp3",
  },
  {
    id: "none",
    name: "Pa Ezan (vetëm njoftim)",
    url: null,
  },
];

export default function PrayerAzan({ selectedAzan, onChange, onTest }) {
  const [open, setOpen] = useState(false);
  const [testing, setTesting] = useState(false);
  const audioRef = useRef(null);
  const selected = AZAN_OPTIONS.find((a) => a.id === selectedAzan) || AZAN_OPTIONS[0];

  const testAzan = () => {
    if (!selected.url) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(selected.url);
    audioRef.current.volume = 0.7;
    audioRef.current.play().catch(() => {});
    setTesting(true);
    audioRef.current.onended = () => setTesting(false);
    if (onTest) onTest(audioRef.current);
  };

  const stopAzan = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setTesting(false);
  };

  useEffect(() => () => stopAzan(), []);

  return (
    <div className="bg-white/5 rounded-2xl p-3 mt-3">
      <div className="flex items-center gap-2 mb-2">
        <Music className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-bold text-emerald-300">Ezan</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between bg-white/10 hover:bg-white/15 rounded-xl px-3 py-2 text-xs text-white transition-colors"
          >
            <span>{selected.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden">
              {AZAN_OPTIONS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => { onChange(a.id); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-white/10 ${
                    a.id === selectedAzan ? "text-emerald-300 bg-emerald-500/10" : "text-white"
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {selected.url && (
          <button
            onClick={testing ? stopAzan : testAzan}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
              testing
                ? "bg-red-500/30 text-red-300 hover:bg-red-500/40"
                : "bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/40"
            }`}
          >
            {testing ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {testing ? "Stop" : "Test"}
          </button>
        )}
      </div>
    </div>
  );
}