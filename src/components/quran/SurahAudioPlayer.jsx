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
  const handleError = () => {setError(true);setLoading(false);setPlaying(false);};

  return null;















































}