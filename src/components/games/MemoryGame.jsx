import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, Timer } from "lucide-react";

const CARD_SETS = {
  shqip: ["🍎Mollë","🐶Qen","🌙Hënë","⭐Yll","🌊Det","🏔️Mal","🌺Lule","🦋Flutur","📚Libër","🎵Muzikë","🌳Pemë","🦁Luan"],
  arabisht: ["ا Elif","ب Ba","ت Ta","ث Tha","ج Xhim","ح Ha","خ Kha","د Dal","ر Ra","ز Zayn","س Sin","ش Shin"],
  anglisht: ["🐱Cat","🐦Bird","🌻Sun","🌊Sea","🏠Home","🍕Pizza","🎸Guitar","🚀Rocket","🦋Butterfly","🌈Rainbow","⚡Thunder","🎯Target"],
};

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

export default function MemoryGame({ onClose }) {
  const [lang, setLang] = useState(null);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [phase, setPhase] = useState("select");
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (phase !== "playing" || done) return;
    const t = setInterval(() => setTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [phase, done]);

  const startGame = (l) => {
    setLang(l);
    const items = CARD_SETS[l].slice(0, 8);
    const doubled = shuffle([...items, ...items].map((v, i) => ({ id: i, value: v })));
    setCards(doubled);
    setFlipped([]); setMatched([]); setMoves(0); setTime(0); setDone(false);
    setPhase("playing");
  };

  const handleFlip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(cards[id].value)) return;
    const nf = [...flipped, id];
    setFlipped(nf);
    if (nf.length === 2) {
      setMoves(m => m + 1);
      if (cards[nf[0]].value === cards[nf[1]].value) {
        const nm = [...matched, cards[nf[0]].value];
        setMatched(nm);
        setFlipped([]);
        if (nm.length === 8) setDone(true);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || matched.includes(cards[id]?.value);
  const rating = moves <= 12 ? "🏆 Perfekt!" : moves <= 18 ? "👍 Shumë mirë!" : moves <= 25 ? "💪 Mirë!" : "📚 Mëso koordinimin!";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-3xl p-5 text-white flex justify-between items-center">
          <div><p className="text-2xl">🎴</p><h2 className="font-bold text-lg">Lojë Memorie</h2></div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold">✕</button>
        </div>

        {phase === "select" && (
          <div className="p-8 text-center">
            <p className="text-4xl mb-4">🎴</p>
            <h3 className="text-xl font-bold mb-2">Zgjedh Gjuhën</h3>
            <p className="text-gray-500 text-sm mb-6">Gjej 8 çifte kartash duke pasur sa më pak lëvizje!</p>
            <div className="space-y-3">
              {[
                { l: "shqip", label: "🇦🇱 Shqip — Fjalë & Emoji" },
                { l: "arabisht", label: "🇸🇦 Arabisht — Shkronjat" },
                { l: "anglisht", label: "🇬🇧 Anglisht — Fjalë & Emoji" },
              ].map(item => (
                <button key={item.l} onClick={() => startGame(item.l)}
                  className="w-full py-4 rounded-2xl bg-pink-50 border border-pink-200 hover:border-pink-400 font-semibold text-gray-800 transition-all">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "playing" && !done && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4 text-sm font-semibold text-gray-600">
              <span>Lëvizje: {moves}</span>
              <div className="flex items-center gap-1 text-gray-500"><Timer className="w-4 h-4" /> {Math.floor(time/60)}:{String(time%60).padStart(2,"0")}</div>
              <span>Çifte: {matched.length}/8</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div className="bg-pink-500 h-2 rounded-full transition-all" style={{ width: `${(matched.length / 8) * 100}%` }} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {cards.map((card, i) => {
                const flippedNow = isFlipped(i);
                const isMatched = matched.includes(card.value);
                return (
                  <button key={card.id} onClick={() => handleFlip(i)} disabled={flippedNow}
                    className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isMatched ? "bg-emerald-100 border-2 border-emerald-400 text-emerald-700"
                      : flippedNow ? "bg-pink-100 border-2 border-pink-400 text-gray-800"
                      : "bg-gray-200 hover:bg-gray-300 text-transparent"}`}>
                    {flippedNow ? card.value : "?"}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => startGame(lang)} className="flex-1 py-2 rounded-xl bg-pink-100 text-pink-700 font-semibold text-sm flex items-center justify-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> Rifillo
              </button>
              <button onClick={() => setPhase("select")} className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm">
                Gjuha
              </button>
            </div>
          </div>
        )}

        {done && (
          <div className="p-8 text-center space-y-4">
            <Trophy className="w-14 h-14 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-bold">Gjete të gjitha! 🎉</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Lëvizje", v: moves, i: "🎯" },
                { l: "Koha", v: `${Math.floor(time/60)}:${String(time%60).padStart(2,"0")}`, i: "⏱️" },
                { l: "Çifte", v: "8/8", i: "🃏" },
              ].map(s => (
                <div key={s.l} className="bg-pink-50 rounded-xl p-3 text-center">
                  <p className="text-xl">{s.i}</p>
                  <p className="font-bold">{s.v}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>
            <p className="font-semibold text-gray-700">{rating}</p>
            <div className="flex gap-3">
              <button onClick={() => startGame(lang)} className="flex-1 py-3 rounded-xl bg-pink-500 text-white font-bold">🔄 Sërish</button>
              <button onClick={() => setPhase("select")} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold">Gjuha</button>
              <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold">Mbyll</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}