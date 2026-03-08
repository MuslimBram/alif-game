import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ChevronRight, Trophy, Brain } from "lucide-react";

const QUIZ_QUESTIONS = [
  { q: "Sa shkronja ka alfabeti arabisht?", opts: ["22", "26", "28", "30"], correct: "28", points: 1 },
  { q: "Cila sure është e para në Kur'an?", opts: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"], correct: "Al-Fatiha", points: 1 },
  { q: "Sa namaze janë të obliguara çdo ditë?", opts: ["3", "4", "5", "6"], correct: "5", points: 1 },
  { q: "Cilat janë 5 shtyllat e Islamit?", opts: ["Shehadet, Namaz, Zekat, Saum, Haxh", "Namaz, Zekat, Sadaka, Haxh, Umra", "Shehadet, Dua, Zekat, Saum, Haxh", "Besim, Namaz, Zekat, Haxh, Dua"], correct: "Shehadet, Namaz, Zekat, Saum, Haxh", points: 2 },
  { q: "Cili shkronjë arabe është 'Ba'?", opts: ["ب", "ت", "ث", "ن"], correct: "ب", points: 2 },
  { q: "Çfarë do të thotë 'Bismillah'?", opts: ["Lavdi Allahut", "Allahu është Një", "Me emrin e Allahut", "Falënderimi Allahut"], correct: "Me emrin e Allahut", points: 2 },
  { q: "Cilat janë 4 Farzet e Abdestit?", opts: ["Fytyra, duart deri bërryla, koka (mes'h), këmbët deri nyja", "Duart, fytyra, koka, qafa", "Nijet, fytyrë, duar, këmbë", "Fytyra, koka, duar, këmbë"], correct: "Fytyra, duart deri bërryla, koka (mes'h), këmbët deri nyja", points: 3 },
  { q: "Çfarë thuhet gjatë Sexhdes në namaz?", opts: ["Subhana rabbijel adhim", "Allahu Ekber", "Subhana rabbijel ala", "Semia Allahu"], correct: "Subhana rabbijel ala", points: 3 },
  { q: "Cili ishte Profeti i parë?", opts: ["Nuhu ﷺ", "Ibrahimi ﷺ", "Ademi ﷺ", "Musai ﷺ"], correct: "Ademi ﷺ", points: 3 },
  { q: "Nisabi i zekatit të arit është:", opts: ["50g", "75g", "85g (20 mithkal)", "100g"], correct: "85g (20 mithkal)", points: 4 },
];

const LEVELS = [
  { value: "fillestar", label: "🌱 Fillestar", min: 0, max: 5, color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50 border-emerald-200", desc: "Niveli i fillimit" },
  { value: "mesatar", label: "🌿 Mesatar", min: 6, max: 12, color: "from-blue-400 to-indigo-500", bg: "bg-blue-50 border-blue-200", desc: "Njohuri bazë" },
  { value: "avancuar", label: "🌲 I Avancuar", min: 13, max: 22, color: "from-purple-400 to-violet-500", bg: "bg-purple-50 border-purple-200", desc: "Njohuri të zgjeruara" },
  { value: "profesionist", label: "🏆 Profesionist", min: 23, max: 999, color: "from-amber-400 to-orange-500", bg: "bg-amber-50 border-amber-200", desc: "Nivel i lartë" },
];

function getLevelFromScore(score) {
  return LEVELS.find(l => score >= l.min && score <= l.max) || LEVELS[0];
}

export default function LevelSelectionModal({ onClose }) {
  const [phase, setPhase] = useState("intro"); // intro | quiz | result
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const [detectedLevel, setDetectedLevel] = useState(null);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const q = QUIZ_QUESTIONS[qIdx];
    const isCorrect = opt === q.correct;
    setAnswered({ selected: opt, correct: q.correct, isCorrect });
    const newScore = isCorrect ? totalScore + q.points : totalScore;
    if (isCorrect) setTotalScore(newScore);

    setTimeout(() => {
      if (qIdx + 1 >= QUIZ_QUESTIONS.length) {
        const level = getLevelFromScore(newScore);
        setDetectedLevel(level);
        setPhase("result");
      } else {
        setQIdx(i => i + 1);
        setAnswered(null);
      }
    }, 1000);
  };

  const handleConfirm = async (levelValue) => {
    setSaving(true);
    try {
      await base44.auth.updateMe({ user_level: levelValue });
    } catch (e) {}
    setSaving(false);
    onClose(levelValue);
  };

  const q = QUIZ_QUESTIONS[qIdx];
  const maxScore = QUIZ_QUESTIONS.reduce((s, q) => s + q.points, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* INTRO */}
        {phase === "intro" && (
          <div className="text-center">
            <div className="text-5xl mb-4">🧠</div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Mirë se vini!</h2>
            <p className="text-gray-600 text-sm mb-2 leading-relaxed">
              Bëjmë <strong>10 pyetje të shpejta</strong> për të kuptuar nivelin tuaj — dhe automatikisht ju vendosim në grupin e duhur!
            </p>
            <p className="text-xs text-gray-400 mb-6">Nuk ka gabim dhe nuk ka presion — është vetëm për ju!</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {LEVELS.map(l => (
                <div key={l.value} className={`rounded-2xl border-2 p-3 ${l.bg} text-left`}>
                  <p className="font-bold text-gray-800 text-sm">{l.label}</p>
                  <p className="text-xs text-gray-500">{l.desc}</p>
                </div>
              ))}
            </div>

            <button onClick={() => setPhase("quiz")}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-base shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <Brain className="w-5 h-5" /> Fillo Testin e Nivelit
            </button>
            <button onClick={() => onClose(null)} className="w-full mt-3 py-2 text-gray-400 hover:text-gray-600 text-sm">
              Kalon — hyr si Fillestar
            </button>
          </div>
        )}

        {/* QUIZ */}
        {phase === "quiz" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">Pyetja {qIdx + 1}/{QUIZ_QUESTIONS.length}</span>
              <span className="text-sm font-bold text-emerald-600">⭐ {totalScore} pikë</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
              <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${((qIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-5">
              <p className="font-bold text-gray-800 text-base leading-relaxed">{q.q}</p>
              <p className="text-xs text-emerald-500 mt-1">+{q.points} pikë nëse saktë</p>
            </div>
            <div className="space-y-2.5">
              {q.opts.map((opt) => {
                let cls = "border-2 border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50";
                if (answered) {
                  if (opt === answered.correct) cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                  else if (opt === answered.selected && !answered.isCorrect) cls = "border-2 border-red-400 bg-red-50 text-red-700";
                  else cls = "border-2 border-gray-100 bg-gray-50 text-gray-400";
                }
                return (
                  <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!answered}
                    className={`w-full p-3 rounded-xl text-left text-sm font-medium transition-all ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && detectedLevel && (
          <div className="text-center">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-3" />
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Testi u krye!</h2>
            <p className="text-gray-500 text-sm mb-4">{totalScore} nga {maxScore} pikë</p>

            <div className={`rounded-2xl border-2 p-5 mb-5 ${detectedLevel.bg}`}>
              <p className="text-3xl mb-2">{detectedLevel.label.split(" ")[0]}</p>
              <h3 className="text-xl font-extrabold text-gray-900 mb-1">{detectedLevel.label.split(" ").slice(1).join(" ")}</h3>
              <p className="text-sm text-gray-600">{detectedLevel.desc}</p>
              <p className="text-xs text-gray-400 mt-2">Ky nivel u caktua automatikisht bazuar në përgjigjet tuaja</p>
            </div>

            <button onClick={() => handleConfirm(detectedLevel.value)} disabled={saving}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-base shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 mb-3 disabled:opacity-50">
              {saving ? "Duke ruajtur..." : <><ChevronRight className="w-5 h-5" /> Konfirmo dhe Fillo</>}
            </button>

            <p className="text-xs text-gray-400 mb-3">ose ndrysho manualisht:</p>
            <div className="grid grid-cols-2 gap-2">
              {LEVELS.filter(l => l.value !== detectedLevel.value).map(l => (
                <button key={l.value} onClick={() => handleConfirm(l.value)}
                  className={`p-2.5 rounded-xl border-2 text-xs font-bold ${l.bg} hover:opacity-80 transition-all`}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}