import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Trophy, CheckCircle, XCircle, RotateCcw, Star, Zap } from "lucide-react";

// All quiz questions by module
const QUIZ_DATA = {
  alphabeti_shqip: {
    title: "Kuiz Alfabeti Shqip", emoji: "🇦🇱", timePerQ: 15,
    questions: [
      { q: "Sa shkronja ka alfabeti shqip?", opts: ["32", "36", "28", "30"], correct: "36" },
      { q: "Cila shkronjë vjen pas 'B' në alfabet?", opts: ["C", "D", "E", "Ç"], correct: "C" },
      { q: "Cila shkronjë nuk është zanore?", opts: ["A", "E", "B", "I"], correct: "B" },
      { q: "Sa zanore ka alfabeti shqip?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Cila fjalë fillon me shkronjën 'Ë'?", opts: ["Ëmbël", "Emër", "Enë", "Erë"], correct: "Ëmbël" },
      { q: "Cila shkronjë shqipe nuk ka anglisht?", opts: ["A", "B", "Ë", "C"], correct: "Ë" },
      { q: "Cila shkronjë vjen para 'Z'?", opts: ["X", "Y", "ZH", "XH"], correct: "ZH" },
      { q: "Kuptimi i shkronjës 'GJ'?", opts: ["Gjen", "Gjuhë", "Gjell", "Gjithë"], correct: "Gjuhë" },
      { q: "Sa bashkëtingëllore ka shqipja?", opts: ["25", "29", "27", "23"], correct: "29" },
      { q: "Cila fjalë ka dy zanore radhazi?", opts: ["Shtëpi", "Ia", "Libër", "Dritë"], correct: "Ia" },
    ]
  },
  alfabeti_anglisht: {
    title: "Kuiz Alfabeti Anglisht", emoji: "🇬🇧", timePerQ: 15,
    questions: [
      { q: "Sa shkronja ka alfabeti anglez?", opts: ["24", "25", "26", "27"], correct: "26" },
      { q: "Cila shkronjë vjen pas 'M'?", opts: ["L", "N", "O", "P"], correct: "N" },
      { q: "Sa zanore ka anglishtja?", opts: ["4", "5", "6", "7"], correct: "5" },
      { q: "Cila nuk është zanore angleze?", opts: ["A", "E", "B", "I"], correct: "B" },
      { q: "Shkronja e fundit e alfabetit anglez?", opts: ["Y", "X", "Z", "W"], correct: "Z" },
      { q: "'Dog' fillon me shkronjën?", opts: ["B", "C", "D", "E"], correct: "D" },
      { q: "Sa shkronja ka fjala 'School'?", opts: ["5", "6", "7", "4"], correct: "6" },
      { q: "Cila shkronjë quhet 'double-you'?", opts: ["U", "V", "W", "X"], correct: "W" },
    ]
  },
  alfabeti_arab: {
    title: "Kuiz Alfabeti Arab", emoji: "🕌", timePerQ: 20,
    questions: [
      { q: "Sa shkronja ka alfabeti arab?", opts: ["26", "28", "29", "28"], correct: "28" },
      { q: "Cila shkronjë arabe quhet 'Elif'?", opts: ["ب", "ا", "ت", "ث"], correct: "ا" },
      { q: "Cila shkronjë është 'Ba'?", opts: ["ا", "ب", "ت", "ث"], correct: "ب" },
      { q: "Kah shkruhet arabishtja?", opts: ["Majtas-djathtas", "Djathtas-majtas", "Poshtë-lart", "Lart-poshtë"], correct: "Djathtas-majtas" },
      { q: "Cila shkronjë arabe është 'Mim'?", opts: ["م", "ن", "و", "ي"], correct: "م" },
      { q: "Shkronja 'Nun' shkruhet?", opts: ["م", "ن", "و", "ه"], correct: "ن" },
      { q: "Cila është 'Waw'?", opts: ["و", "ي", "ه", "ن"], correct: "و" },
      { q: "Shkronja 'Ya' arabe?", opts: ["و", "ه", "ي", "ن"], correct: "ي" },
      { q: "Cila shkronjë ka pikë sipër (Tha)?", opts: ["ت", "ث", "ب", "ن"], correct: "ث" },
      { q: "Cila quhet 'Alef Lam Mim'?", opts: ["الله", "الم", "بسم", "رحم"], correct: "الم" },
    ]
  },
  texhuidi: {
    title: "Kuiz Texhuidi", emoji: "📖", timePerQ: 20,
    questions: [
      { q: "Çfarë është 'Idgham'?", opts: ["Zgjatje", "Bashkim i dy shkronjave", "Shqiptim i qartë", "Vibrim"], correct: "Bashkim i dy shkronjave" },
      { q: "Çfarë është 'Ikhfa'?", opts: ["Fshehje e pjesshme", "Shqiptim i qartë", "Zgjatje", "Kthim"], correct: "Fshehje e pjesshme" },
      { q: "Çfarë është 'Izhar'?", opts: ["Fshehje", "Bashkim", "Shqiptim i qartë", "Vibrim"], correct: "Shqiptim i qartë" },
      { q: "Çfarë është 'Iqlab'?", opts: ["Bashkim", "Kthim i Nunës në Mim", "Zgjatje", "Fshehje"], correct: "Kthim i Nunës në Mim" },
      { q: "Çfarë është 'Qalqalah'?", opts: ["Zgjatje e zërit", "Vibrim/jehonë", "Shqiptim i qartë", "Bashkim"], correct: "Vibrim/jehonë" },
      { q: "Çfarë do të thotë 'Madd'?", opts: ["Bashkim", "Zgjatje e zërit", "Fshehje", "Shkurtim"], correct: "Zgjatje e zërit" },
      { q: "Sa lloje kryesore ka Madd-i?", opts: ["2", "3", "4", "5"], correct: "2" },
      { q: "Çfarë është 'Ghunnah'?", opts: ["Zë hundor", "Zë gjuhësor", "Vibrim", "Fshehje"], correct: "Zë hundor" },
      { q: "Shkronjat e Qalqalah janë?", opts: ["ق ط ب ج د", "ن م ل ر", "ب ت ث ج", "ه و ي ا"], correct: "ق ط ب ج د" },
      { q: "Çfarë është 'Waqf'?", opts: ["Fillim leximi", "Ndalim gjatë leximit", "Zgjatje", "Bashkim"], correct: "Ndalim gjatë leximit" },
    ]
  },
  kurani: {
    title: "Kuiz Kurani", emoji: "📚", timePerQ: 20,
    questions: [
      { q: "Sa sure ka Kur'ani?", opts: ["100", "110", "114", "120"], correct: "114" },
      { q: "Sure Al-Fatiha ka sa ajete?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Sureja e parë e Kur'anit?", opts: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "Al-Nasr"], correct: "Al-Fatiha" },
      { q: "Cila sure ka 286 ajete?", opts: ["Al-Fatiha", "Al-Baqarah", "Ali Imran", "An-Nisa"], correct: "Al-Baqarah" },
      { q: "Revelata e parë e Kur'anit?", opts: ["Al-Fatiha", "Al-Baqarah", "Al-Alaq", "Al-Ikhlas"], correct: "Al-Alaq" },
      { q: "Sa xhuz ka Kur'ani?", opts: ["20", "25", "30", "114"], correct: "30" },
      { q: "Cila sure quhet 'Zemra e Kur'anit'?", opts: ["Al-Fatiha", "Al-Baqarah", "Ya-Sin", "Al-Mulk"], correct: "Ya-Sin" },
      { q: "Sure Al-Ikhlas ka sa ajete?", opts: ["3", "4", "5", "6"], correct: "4" },
      { q: "Sa ajete ka Kur'ani gjithsej (afërsisht)?", opts: ["5000", "6236", "7000", "8000"], correct: "6236" },
      { q: "Kur u kompletua shpallja e Kur'anit?", opts: ["5 AH", "10 AH", "23 vjet", "30 vjet"], correct: "23 vjet" },
    ]
  },
  lojera_numra: {
    title: "Kuiz Numrat", emoji: "🔢", timePerQ: 15,
    questions: [
      { q: "Si shkruhet numri 1 shqip?", opts: ["dy", "një", "tre", "katër"], correct: "një" },
      { q: "Si shkruhet numri 2 anglisht?", opts: ["one", "three", "two", "four"], correct: "two" },
      { q: "Numri arab 'واحد' është?", opts: ["2", "3", "1", "4"], correct: "1" },
      { q: "Sa është 5 + 3?", opts: ["7", "8", "9", "6"], correct: "8" },
      { q: "Sa është 7 + 4?", opts: ["10", "11", "12", "9"], correct: "11" },
      { q: "Si quhet numri rreshtor i 1-it shqip?", opts: ["i parë", "i dytë", "i tretë", "i katërt"], correct: "i parë" },
      { q: "Si quhet numri rreshtor i 1-it anglisht?", opts: ["second", "third", "first", "fourth"], correct: "first" },
      { q: "Numri arab 'عَشَرَة' është?", opts: ["5", "8", "10", "20"], correct: "10" },
      { q: "Sa është 9 + 9?", opts: ["16", "17", "18", "19"], correct: "18" },
      { q: "Si shkruhet 100 shqip?", opts: ["njëzet", "njëqind", "dhjetë", "dyqind"], correct: "njëqind" },
    ]
  },
  umra_haxh: {
    title: "Kuiz Umra & Haxhi", emoji: "🕋", timePerQ: 20,
    questions: [
      { q: "Sa hapa ka Umra?", opts: ["3", "4", "5", "6"], correct: "5" },
      { q: "Shtylla kryesore e Haxhit?", opts: ["Tavafi", "Qëndrimi në Arafat", "Sa'ji", "Ihrami"], correct: "Qëndrimi në Arafat" },
      { q: "Sa herë rrotullohet Qabeja?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Cila ditë është 'Dita e Arafatit'?", opts: ["7 Dhul-Hixhe", "8 Dhul-Hixhe", "9 Dhul-Hixhe", "10 Dhul-Hixhe"], correct: "9 Dhul-Hixhe" },
      { q: "Sa ecje ka Sa'ji?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Ku mblidhen gurët për Xhemrat?", opts: ["Mina", "Arafat", "Muzdelifa", "Meka"], correct: "Muzdelifa" },
      { q: "Sa gurë hidhen në Akabe (ditën e parë)?", opts: ["3", "5", "7", "10"], correct: "7" },
      { q: "Nga fillon Sa'ji?", opts: ["Merva", "Safa", "Qabeja", "Makam Ibrahimi"], correct: "Safa" },
      { q: "Cila sure lexohet te Makam Ibrahimi?", opts: ["Fatiha + Bakara", "Kafirun + Ihlas", "Jasin + Mulk", "Nas + Felak"], correct: "Kafirun + Ihlas" },
      { q: "Si quhet Tavafi i fundit para largimit?", opts: ["Tavafi i Kudum", "Tavafi i Ifadës", "Tavafi i Vedas", "Tavafi i Rritjes"], correct: "Tavafi i Vedas" },
    ]
  }
};

export default function QuizGame({ gameId, quizKey: quizKeyProp, onClose }) {
  const quizKey = quizKeyProp || {
    8: "alphabeti_shqip", 9: "alfabeti_anglisht", 10: "alfabeti_arab",
    13: "texhuidi", 14: "texhuidi", 19: "texhuidi",
    15: "kurani", 16: "kurani", 20: "kurani",
    17: "umra_haxh", 18: "umra_haxh", 21: "umra_haxh", 22: "umra_haxh", 28: "umra_haxh",
  }[gameId] || "kurani";

  const data = QUIZ_DATA[quizKey];
  const questions = [...data.questions].sort(() => Math.random() - 0.5);

  const [phase, setPhase] = useState("start"); // start | playing | done
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timer, setTimer] = useState(data.timePerQ);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (phase !== "playing" || answered !== null) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, phase, answered]);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setTotalTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const handleAnswer = useCallback((opt) => {
    if (answered !== null) return;
    const q = questions[idx];
    const isCorrect = opt === q.correct;
    setAnswered({ selected: opt, correct: q.correct, isCorrect });
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => { const ns = s + 1; setMaxStreak(m => Math.max(m, ns)); return ns; });
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setPhase("done");
        // Award points based on performance
        const finalScore = isCorrect ? score + 1 : score;
        const pts = finalScore * 10 + (maxStreak >= 3 ? 25 : 0);
        if (pts > 0) awardPoints(pts, "lojera", `nga kuizi "${data.title}"`);
        return;
      }
      setIdx(i => i + 1);
      setTimer(data.timePerQ);
      setAnswered(null);
    }, 1200);
  }, [answered, idx, questions, data.timePerQ, score, maxStreak, data.title]);

  const restart = () => {
    setPhase("start"); setIdx(0); setAnswered(null);
    setScore(0); setStreak(0); setMaxStreak(0);
    setTimer(data.timePerQ); setTotalTime(0);
  };

  const pct = Math.round((score / questions.length) * 100);
  const timerPct = (timer / data.timePerQ) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-3xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl">{data.emoji}</p>
              <h2 className="font-bold text-lg">{data.title}</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold">✕</button>
          </div>
        </div>

        {/* START */}
        {phase === "start" && (
          <div className="p-8 text-center space-y-4">
            <div className="text-6xl mb-2">{data.emoji}</div>
            <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
            <div className="grid grid-cols-3 gap-3 my-4">
              {[
                { label: "Pyetje", val: questions.length, icon: "❓" },
                { label: "Kohë/Pyetje", val: `${data.timePerQ}s`, icon: "⏱️" },
                { label: "Niveli", val: "Kuiz", icon: "🎯" },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl">{s.icon}</p>
                  <p className="font-bold text-gray-900">{s.val}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setPhase("playing"); setTimer(data.timePerQ); }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg">
              🚀 Fillo Kuizin
            </button>
          </div>
        )}

        {/* PLAYING */}
        {phase === "playing" && (
          <div className="p-5 space-y-4">
            {/* Stats bar */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-600">{idx + 1}/{questions.length}</span>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : timer <= 10 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                <Timer className="w-4 h-4" /> {timer}s
              </div>
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Zap className="w-4 h-4" /> {streak}x
              </div>
            </div>

            {/* Timer bar */}
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="h-2 rounded-full transition-all duration-1000"
                style={{ width: `${timerPct}%`, background: timer <= 5 ? "#ef4444" : timer <= 10 ? "#f59e0b" : "#10b981" }} />
            </div>

            {/* Progress dots */}
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
                <p className="font-bold text-gray-900 text-lg text-center leading-relaxed">{questions[idx].q}</p>
              </motion.div>
            </AnimatePresence>

            {/* Options */}
            <div className="grid grid-cols-1 gap-2">
              {questions[idx].opts.map((opt) => {
                let cls = "border-2 border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 text-gray-800";
                if (answered) {
                  if (opt === answered.correct) cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800";
                  else if (opt === answered.selected && !answered.isCorrect) cls = "border-2 border-red-400 bg-red-50 text-red-700";
                  else cls = "border-2 border-gray-100 bg-gray-50 text-gray-400";
                }
                return (
                  <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!answered}
                    className={`p-3.5 rounded-xl text-left font-semibold text-sm transition-all flex items-center justify-between ${cls}`}>
                    {opt}
                    {answered && opt === answered.correct && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                    {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {/* Score */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>✓ {score} të sakta</span>
              <span>•</span>
              <span>⏱️ {Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, "0")}</span>
            </div>
          </div>
        )}

        {/* DONE */}
        {phase === "done" && (
          <div className="p-8 text-center space-y-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900">Kuizi Mbaroi!</h3>
            <div className={`text-6xl font-extrabold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>{pct}%</div>
            <p className="text-gray-600">{score} nga {questions.length} të sakta</p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Pikë", val: score * 10, icon: "⭐" },
                { label: "Stria Max", val: maxStreak, icon: "⚡" },
                { label: "Koha", val: `${Math.floor(totalTime / 60)}:${String(totalTime % 60).padStart(2, "0")}`, icon: "⏱️" },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl">{s.icon}</p>
                  <p className="font-bold text-gray-900">{s.val}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700">
                {pct >= 90 ? "🏆 Shkëlqyeshëm! Ekspert i vërtetë!" :
                 pct >= 70 ? "👍 Shumë mirë! Vazhdo kështu!" :
                 pct >= 50 ? "💪 Mirë! Mund ta bësh edhe më mirë!" :
                 "📚 Studjoi edhe pak dhe provo sërish!"}
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={restart}
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700">
                🔄 Provo Sërish
              </button>
              <button onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50">
                ✕ Mbyll
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}