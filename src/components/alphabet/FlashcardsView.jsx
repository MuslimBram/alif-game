import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RefreshCw, ChevronLeft, ChevronRight, Check, X, Shuffle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { speakText } from "@/components/utils/speakAlbanian";

function FlashCard({ word, flipped, onFlip, onAudio }) {
  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: "1000px", height: "260px" }}
      onClick={onFlip}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "absolute", inset: 0 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-7xl mb-4">{word.emoji || "❓"}</div>
          <div className="text-white/80 text-sm font-medium uppercase tracking-widest">
            {word.language === "arabisht" ? "Arabic" : word.language === "anglisht" ? "English" : "Shqip"}
          </div>
          <div className="text-white/60 text-xs mt-3">Kliko për të parë fjalën →</div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 border-2 border-emerald-100"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            className={`font-bold text-gray-900 mb-2 text-center ${word.language === "arabisht" ? "text-5xl" : "text-4xl"}`}
            style={word.language === "arabisht" ? { fontFamily: "serif", direction: "rtl" } : {}}
          >
            {word.word}
          </div>
          {word.transliteration && (
            <div className="text-gray-400 text-sm italic mb-2">{word.transliteration}</div>
          )}
          <div className="text-emerald-600 font-semibold text-xl mb-1">{word.translation}</div>
          {word.meaning && word.meaning !== word.word && (
            <div className="text-gray-400 text-sm">{word.meaning}</div>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onAudio(); }}
            className="mt-4 p-3 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-all group"
          >
            <Volume2 className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function FlashcardsView({ language }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [shuffled, setShuffled] = useState(false);
  const [deck, setDeck] = useState([]);
  const [finished, setFinished] = useState(false);

  const { data: allWords = [] } = useQuery({
    queryKey: ["words-flashcards", language],
    queryFn: () => base44.entities.Word.filter({ language }),
  });

  useEffect(() => {
    if (allWords.length > 0) {
      setDeck([...allWords].sort(() => Math.random() - 0.5));
      setCurrentIdx(0);
      setFlipped(false);
      setKnown([]);
      setUnknown([]);
      setFinished(false);
    }
  }, [allWords, language]);

  const card = deck[currentIdx];
  const total = deck.length;

  const handleKnow = (knew) => {
    if (knew) setKnown(p => [...p, card]);
    else setUnknown(p => [...p, card]);
    setFlipped(false);
    setTimeout(() => {
      if (currentIdx + 1 >= total) setFinished(true);
      else setCurrentIdx(i => i + 1);
    }, 200);
  };

  const handleShuffle = () => {
    setDeck(d => [...d].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setFinished(false);
    setShuffled(true);
  };

  const handleRestart = () => {
    setDeck([...allWords].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setFinished(false);
  };

  const handleRetryUnknown = () => {
    if (unknown.length === 0) return;
    setDeck([...unknown].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setFinished(false);
  };

  if (allWords.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-4xl mb-3">📭</div>
        <p>Nuk ka fjalë për këtë gjuhë ende.</p>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((known.length / total) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-gray-100 p-10 text-center max-w-lg mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">Karta mbaruan!</h3>
        <div className="flex justify-center gap-8 my-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">{known.length}</div>
            <div className="text-xs text-gray-500 mt-1">✅ I dija</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">{unknown.length}</div>
            <div className="text-xs text-gray-500 mt-1">❌ Nuk e dija</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{pct}%</div>
            <div className="text-xs text-gray-500 mt-1">Rezultat</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleRestart} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" /> Rifillo të gjitha
          </Button>
          {unknown.length > 0 && (
            <Button onClick={handleRetryUnknown} variant="outline" className="rounded-xl border-red-200 text-red-600 hover:bg-red-50">
              <X className="w-4 h-4 mr-2" /> Provo të padijturat ({unknown.length})
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-gray-500">{currentIdx + 1} / {total} karta</span>
          <div className="flex gap-3 text-xs">
            <span className="text-emerald-600 font-semibold">✅ {known.length}</span>
            <span className="text-red-500 font-semibold">❌ {unknown.length}</span>
          </div>
          <button onClick={handleShuffle} className="text-gray-400 hover:text-emerald-600 transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div key={currentIdx}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.2 }}
        >
          {card && (
            <FlashCard
              word={card}
              flipped={flipped}
              onFlip={() => setFlipped(f => !f)}
              onAudio={() => speak(card.word, card.language)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Know / Don't know */}
      <div className="flex gap-3">
        <button
          onClick={() => handleKnow(false)}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-2xl font-bold text-red-600 transition-all text-sm"
        >
          <X className="w-5 h-5" /> Nuk e dija
        </button>
        <button
          onClick={() => handleKnow(true)}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 rounded-2xl font-bold text-emerald-600 transition-all text-sm"
        >
          <Check className="w-5 h-5" /> E dija!
        </button>
      </div>

      <p className="text-center text-xs text-gray-400">Kliko kartën për të parë fjalën</p>
    </div>
  );
}