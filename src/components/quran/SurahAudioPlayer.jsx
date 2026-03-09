import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, ChevronRight, ChevronLeft } from "lucide-react";

function padNum(n, len) {
  return n.toString().padStart(len, "0");
}

// Plays the full surah by streaming verse by verse
export default function SurahAudioPlayer({ surahNum, surahName, totalVerses = 1 }) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const audioRef = useRef(null);

  const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${padNum(surahNum, 3)}${padNum(currentVerse, 3)}.mp3`;

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [surahNum]);

  // When verse changes while playing, auto-play next
  useEffect(() => {
    if (playing && audioRef.current) {
      setError(false);
      audioRef.current.load();
      audioRef.current.play().catch(() => { setError(true); setPlaying(false); });
    }
  }, [currentVerse]);

  const handleEnded = () => {
    if (currentVerse < totalVerses) {
      setCurrentVerse(v => v + 1);
    } else {
      setPlaying(false);
      setCurrentVerse(1);
    }
  };

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

  const restart = () => {
    if (audioRef.current) audioRef.current.pause();
    setPlaying(false);
    setCurrentVerse(1);
    setError(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => setError(true));
      }
    }, 100);
  };

  const handleError = () => { setError(true); setLoading(false); setPlaying(false); };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-bold text-amber-800">🎵 Audio — {surahName}</span>
        </div>
        <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">
          Ajet {currentVerse}/{totalVerses}
        </span>
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
          ⚠️ Audio nuk u ngarkua. Kontrollo lidhjen.
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
          >
            {loading ? <span className="animate-spin">⏳</span>
              : playing ? <><Pause className="w-4 h-4" /> Pause</>
              : <><Play className="w-4 h-4" /> Dëgjo Suren</>}
          </button>
          <button onClick={restart} className="w-9 h-9 rounded-xl bg-amber-100 hover:bg-amber-200 flex items-center justify-center" title="Rinis">
            <RotateCcw className="w-4 h-4 text-amber-700" />
          </button>
          {playing && (
            <span className="text-xs text-amber-600 animate-pulse font-medium">
              🎵 Po luan...
            </span>
          )}
        </div>
      )}
      <p className="text-[10px] text-gray-400 mt-2">Recitim: Sheikh Mishary Al-Afasy</p>
    </div>
  );











































}