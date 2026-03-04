import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trophy, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── Exercise 1: Letter Recognition ──────────────────────────────────────────
// Given a pronunciation/description, identify the letter from options
function LetterRecognitionExercise({ letters, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const total = Math.min(8, letters.length);
  const items = letters.slice(0, total);

  const item = items[idx];
  const wrongOptions = letters.filter(l => l.letter !== item.letter)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  const options = shuffle([item, ...wrongOptions]);

  const handle = (opt) => {
    if (answered) return;
    const ok = opt.letter === item.letter;
    setAnswered({ selected: opt.letter, correct: item.letter, ok });
    if (ok) setScore(s => s + 1);
    setTimeout(() => {
      setAnswered(null);
      if (idx + 1 >= total) onComplete(Math.round(((ok ? score + 1 : score) / total) * 100));
      else setIdx(i => i + 1);
    }, 1200);
  };

  const isArabic = item.language === "arabisht";

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>Pyetja {idx + 1}/{total}</span>
        <span className="text-emerald-600 font-bold">✓ {score}</span>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center mb-4">
        <p className="text-xs text-gray-400 mb-2">Shqiptimi</p>
        <p className="text-2xl font-bold text-gray-800 mb-1">
          "{item.pronunciation || item.letter}"
        </p>
        {item.description && (
          <p className="text-sm text-gray-500 mt-2">{item.description}</p>
        )}
        <p className="text-sm font-semibold text-blue-700 mt-3">Cila shkronjë përkon me këtë shqiptim?</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          let cls = "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50";
          if (answered) {
            if (opt.letter === answered.correct) cls = "border-emerald-500 bg-emerald-50";
            else if (opt.letter === answered.selected && !answered.ok) cls = "border-red-400 bg-red-50";
            else cls = "border-gray-100 bg-gray-50 opacity-50";
          }
          return (
            <button key={opt.letter} disabled={!!answered} onClick={() => handle(opt)}
              className={`border-2 rounded-2xl p-4 font-bold text-4xl transition-all ${cls}`}
              style={isArabic ? { fontFamily: "serif" } : {}}>
              {opt.letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Exercise 2: Letter Formation (Multiple-choice stroke description) ────────
const FORMATION_QUESTIONS = {
  shqip: [
    { letter: "A", question: "Si formohet shkronja 'A'?", options: ["Dy linja diagonale dhe një tërthor", "Një lak i rrumbullakët", "Vetëm një linjë vertikale", "Tre linja horizontale"], correct: 0 },
    { letter: "B", question: "Si formohet shkronja 'B'?", options: ["Një linjë vertikale dhe dy gjysmërrathë", "Dy linja horizontale", "Një rreth i plotë", "Tri kënde"], correct: 0 },
    { letter: "O", question: "Si formohet shkronja 'O'?", options: ["Dy linja të drejta", "Një rreth i mbyllur oval", "Tre kënde", "Vetëm një kthesë"], correct: 1 },
    { letter: "E", question: "Si formohet shkronja 'E'?", options: ["Tre linja horizontale dhe një vertikale", "Vetëm një rreth", "Dy diagonale", "Katër pika"], correct: 0 },
    { letter: "M", question: "Si formohet shkronja 'M'?", options: ["Dy maja dhe dy linja vertikale", "Vetëm linja horizontale", "Rreth dhe vijë", "Tre linja rreshtore"], correct: 0 },
  ],
  anglisht: [
    { letter: "A", question: "How is the letter 'A' formed?", options: ["Two diagonal lines and a crossbar", "A round loop", "One vertical line", "Three horizontal lines"], correct: 0 },
    { letter: "S", question: "How is the letter 'S' formed?", options: ["A curved snake-like shape", "Three straight lines", "A full circle", "Two parallel lines"], correct: 0 },
    { letter: "D", question: "How is the letter 'D' formed?", options: ["One vertical line and a curved bump", "Two diagonal lines", "A circle with a stem", "Four corners"], correct: 0 },
    { letter: "T", question: "How is the letter 'T' formed?", options: ["One vertical and one horizontal line", "Two curves", "A triangle shape", "Three circles"], correct: 0 },
  ],
  arabisht: [
    { letter: "ب", question: "Si formohet shkronja 'ب' (Ba)?", options: ["Një lug i hapur lart me pikë poshtë", "Rreth me pikë mbi", "Dy kthesa", "Vijë e drejtë"], correct: 0 },
    { letter: "ن", question: "Si formohet shkronja 'ن' (Nun)?", options: ["Gjysmërreth me pikë mbi", "Rreth i mbyllur", "Dy pika", "Vijë e valëzuar"], correct: 0 },
    { letter: "م", question: "Si formohet shkronja 'م' (Mim)?", options: ["Lug i vogël i mbyllur me bisht poshtë", "Rreth i hapur", "Tre pika", "Vijë e drejtë me kthesë"], correct: 0 },
    { letter: "ع", question: "Si formohet shkronja 'ع' (Ain)?", options: ["Kthesë si sy me bisht", "Rreth i plotë", "Dy linja paralele", "Pikë dhe vijë"], correct: 0 },
  ],
};

function LetterFormationExercise({ letters, onComplete }) {
  const lang = letters[0]?.language || "shqip";
  const questions = FORMATION_QUESTIONS[lang] || FORMATION_QUESTIONS.shqip;
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const total = Math.min(5, questions.length);

  const q = questions[idx % questions.length];

  const handle = (i) => {
    if (answered !== null) return;
    const ok = i === q.correct;
    setAnswered({ selected: i, ok });
    if (ok) setScore(s => s + 1);
    setTimeout(() => {
      setAnswered(null);
      if (idx + 1 >= total) onComplete(Math.round(((ok ? score + 1 : score) / total) * 100));
      else setIdx(i2 => i2 + 1);
    }, 1200);
  };

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>Pyetja {idx + 1}/{total}</span>
        <span className="text-emerald-600 font-bold">✓ {score}</span>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center mb-4">
        <p className="text-7xl font-bold mb-3" style={lang === "arabisht" ? { fontFamily: "serif" } : {}}>{q.letter}</p>
        <p className="text-sm font-semibold text-purple-700">{q.question}</p>
      </div>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let cls = "border-gray-200 bg-white text-gray-800 hover:border-purple-300 hover:bg-purple-50";
          if (answered !== null) {
            if (i === q.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800";
            else if (i === answered.selected && !answered.ok) cls = "border-red-400 bg-red-50 text-red-700";
            else cls = "border-gray-100 bg-gray-50 text-gray-400";
          }
          return (
            <button key={i} disabled={answered !== null} onClick={() => handle(i)}
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm font-medium text-left transition-all ${cls}`}>
              {String.fromCharCode(65 + i)}. {opt}
              {answered !== null && i === q.correct && <CheckCircle className="w-4 h-4 inline ml-2 text-emerald-600" />}
              {answered !== null && i === answered.selected && !answered.ok && <XCircle className="w-4 h-4 inline ml-2 text-red-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Exercise 3: Word Building from Letters ───────────────────────────────────
const WORD_BUILDING = {
  shqip: [
    { letters: ["D", "I", "E", "L", "L"], word: "DIELL", meaning: "diell ☀️" },
    { letters: ["U", "J", "Ë"], word: "UJË", meaning: "ujë 💧" },
    { letters: ["L", "I", "B", "Ë", "R"], word: "LIBËR", meaning: "libër 📚" },
    { letters: ["B", "U", "K", "Ë"], word: "BUKË", meaning: "bukë 🍞" },
    { letters: ["Z", "O", "G", "U"], word: "ZOGU", meaning: "zogu 🐦" },
  ],
  anglisht: [
    { letters: ["S", "U", "N"], word: "SUN", meaning: "sun ☀️" },
    { letters: ["C", "A", "T"], word: "CAT", meaning: "cat 🐱" },
    { letters: ["D", "O", "G"], word: "DOG", meaning: "dog 🐶" },
    { letters: ["S", "T", "A", "R"], word: "STAR", meaning: "star ⭐" },
    { letters: ["B", "O", "O", "K"], word: "BOOK", meaning: "book 📚" },
  ],
  arabisht: [
    { letters: ["ب", "ي", "ت"], word: "بيت", meaning: "shtëpi 🏠" },
    { letters: ["ك", "ل", "ب"], word: "كلب", meaning: "qen 🐶" },
    { letters: ["ن", "ا", "ر"], word: "نار", meaning: "zjarr 🔥" },
    { letters: ["ب", "ا", "ب"], word: "باب", meaning: "derë 🚪" },
  ],
};

function WordBuildingExercise({ letters, onComplete }) {
  const lang = letters[0]?.language || "shqip";
  const exercises = WORD_BUILDING[lang] || WORD_BUILDING.shqip;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState(() => shuffle(exercises[0].letters));
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const total = Math.min(4, exercises.length);
  const ex = exercises[idx % exercises.length];
  const isArabic = lang === "arabisht";

  const pick = (letter, i) => {
    if (result) return;
    setSelected(s => [...s, letter]);
    setAvailable(a => { const n = [...a]; n.splice(i, 1); return n; });
  };

  const unpick = (i) => {
    if (result) return;
    const letter = selected[i];
    setAvailable(a => [...a, letter]);
    setSelected(s => { const n = [...s]; n.splice(i, 1); return n; });
  };

  const check = () => {
    const built = selected.join("");
    const ok = built === ex.word;
    setResult(ok ? "correct" : "wrong");
    if (ok) setScore(s => s + 1);
  };

  const next = () => {
    const nextIdx = idx + 1;
    setResult(null);
    if (nextIdx >= total) {
      onComplete(Math.round((score / total) * 100));
    } else {
      setIdx(nextIdx);
      setSelected([]);
      setAvailable(shuffle(exercises[nextIdx % exercises.length].letters));
    }
  };

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>Fjalë {idx + 1}/{total}</span>
        <span className="text-emerald-600 font-bold">✓ {score}</span>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-5 text-center mb-4">
        <p className="text-sm font-semibold text-teal-700 mb-1">🔤 Ndërtoni fjalën:</p>
        <p className="text-lg font-bold text-gray-800">{ex.meaning}</p>
        <p className="text-xs text-gray-400 mt-1">({ex.letters.length} shkronja)</p>
      </div>

      {/* Drop zone */}
      <div className={`min-h-12 border-2 rounded-2xl p-3 mb-3 flex gap-2 items-center justify-center flex-wrap ${
        result === "correct" ? "border-emerald-400 bg-emerald-50" :
        result === "wrong" ? "border-red-400 bg-red-50" : "border-dashed border-gray-300 bg-gray-50"
      }`} style={isArabic ? { direction: "rtl" } : {}}>
        {selected.length === 0 && <p className="text-xs text-gray-400">Klikoni shkronjat...</p>}
        {selected.map((l, i) => (
          <button key={i} onClick={() => unpick(i)}
            className="bg-teal-100 text-teal-800 w-10 h-10 rounded-xl font-bold text-xl hover:bg-red-100 hover:text-red-700 transition-all"
            style={isArabic ? { fontFamily: "serif" } : {}}>
            {l}
          </button>
        ))}
      </div>

      {result && (
        <p className={`text-center text-sm font-bold mb-3 ${result === "correct" ? "text-emerald-600" : "text-red-600"}`}>
          {result === "correct" ? "✓ Saktë! Fjala është: " + ex.word : "✗ Fjala duhet: " + ex.word}
        </p>
      )}

      {/* Available letters */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {available.map((l, i) => (
          <button key={i} onClick={() => pick(l, i)} disabled={!!result}
            className="bg-white border-2 border-gray-200 text-gray-800 w-10 h-10 rounded-xl font-bold text-xl hover:border-teal-400 hover:bg-teal-50 transition-all"
            style={isArabic ? { fontFamily: "serif" } : {}}>
            {l}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {!result ? (
          <Button onClick={check} disabled={selected.length === 0}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
            Kontrollo
          </Button>
        ) : (
          <Button onClick={next} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
            {idx + 1 >= total ? "Përfundo" : "Tjetër"} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Main LetterExercises wrapper ─────────────────────────────────────────────
export default function LetterExercises({ letters, onClose }) {
  const [exercise, setExercise] = useState(null);
  const [result, setResult] = useState(null);

  const handleComplete = (score) => setResult(score);
  const reset = () => { setResult(null); setExercise(null); };

  if (result !== null) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Ushtrimi Mbaroi!</h3>
        <p className="text-5xl font-bold text-emerald-600 mb-2">{result}%</p>
        <p className="text-gray-500 mb-6">{result >= 80 ? "Shkëlqyeshëm! 🎉" : result >= 50 ? "Shumë mirë! 👍" : "Vazhdo të praktikosh! 💪"}</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="outline" className="rounded-xl">
            <RefreshCw className="w-4 h-4 mr-1" /> Ushtrim tjetër
          </Button>
          <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
            Kthehu
          </Button>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">✏️ Ushtrime Shkronjash</h3>
        <p className="text-sm text-gray-500 mb-5 text-center">Zgjidhni llojin e ushtrimit</p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { key: "recognition", icon: "👁️", title: "Njohja e Shkronjave", desc: "Identifikoni shkronjën nga shqiptimi" },
            { key: "formation", icon: "✍️", title: "Formimi i Shkronjave", desc: "Mësoni si formohet çdo shkronjë" },
            { key: "wordbuilding", icon: "🔤", title: "Ndërtoni Fjalë", desc: "Rradhitni shkronjat për të formuar fjalë" },
          ].map(ex => (
            <button key={ex.key} onClick={() => setExercise(ex.key)}
              className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-2xl p-4 hover:shadow-md transition-all text-left">
              <span className="text-3xl">{ex.icon}</span>
              <div>
                <p className="font-bold text-gray-800">{ex.title}</p>
                <p className="text-xs text-gray-500">{ex.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-400 ml-auto" />
            </button>
          ))}
        </div>
        <Button onClick={onClose} variant="ghost" className="w-full mt-3 rounded-xl text-gray-500">
          Kthehu
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
        ← Kthehu te zgjedhja
      </button>
      {exercise === "recognition" && <LetterRecognitionExercise letters={letters} onComplete={handleComplete} />}
      {exercise === "formation" && <LetterFormationExercise letters={letters} onComplete={handleComplete} />}
      {exercise === "wordbuilding" && <WordBuildingExercise letters={letters} onComplete={handleComplete} />}
    </div>
  );
}