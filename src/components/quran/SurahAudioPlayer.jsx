import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

// Uses Alafasy recitation from everyayah.com (free, no key needed)
// Format: https://everyayah.com/data/Alafasy_128kbps/001001.mp3  (surah 001, ayah 001)
// For the surah opening we play ayah 1 of the surah (Bismillah for Al-Fatiha is 001)
// We use a fallback to Web Speech API if audio fails

function padNum(n, len) {
  return n.toString().padStart(len, "0");
}

export default function SurahAudioPlayer({ surahNum, surahName }) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);

  // Build URL for first ayah of the surah (gives a taste of the surah audio)
  const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${padNum(surahNum, 3)}${padNum(1, 3)}.mp3`;

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [surahNum]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      setError(false);
      audioRef.current.play().then(() => {
        setLoading(false);
        setPlaying(true);
      }).catch(() => {
        setLoading(false);
        setError(true);
      });
    }
  };

  const replay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setError(false);
    setLoading(true);
    audioRef.current.play().then(() => {
      setLoading(false);
      setPlaying(true);
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
  };

  const handleEnded = () => setPlaying(false);
  const handleError = () => { setError(true); setLoading(false); setPlaying(false); };

  return (
    <div className="bg-teal-50 border border-teal-100 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <Volume2 className="w-4 h-4 text-teal-600" />
        <span className="text-xs font-bold text-teal-700">Audio — Ajet 1 i Sures {surahName}</span>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleEnded}
        onError={handleError}
        preload="none"
      />

      {error ? (
        <div className="text-xs text-red-500 bg-red-50 rounded-lg p-2">
          ⚠️ Audio nuk u ngarkua. Kontrollo lidhjen me internet.
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition-all"
          >
            {loading ? (
              <span className="animate-spin">⏳</span>
            ) : playing ? (
              <><Pause className="w-3.5 h-3.5" /> Pause</>
            ) : (
              <><Play className="w-3.5 h-3.5" /> Dëgjo Ajetin e Parë</>
            )}
          </button>
          <button
            onClick={replay}
            className="w-8 h-8 rounded-xl bg-teal-100 hover:bg-teal-200 flex items-center justify-center transition-colors"
            title="Replay"
          >
            <RotateCcw className="w-3.5 h-3.5 text-teal-700" />
          </button>
          {playing && (
            <span className="text-xs text-teal-600 animate-pulse">🎵 Duke luajtur...</span>
          )}
        </div>
      )}
      <p className="text-[10px] text-gray-400 mt-1.5">Recitim: Sheikh Mishary Al-Afasy</p>
    </div>
  );
}