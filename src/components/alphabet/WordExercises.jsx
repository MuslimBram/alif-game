import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Sentence templates per language ────────────────────────────────────────
const SENTENCE_TEMPLATES = {
  shqip: [
    { template: "Unë shoh një ___ në shtëpi.", key: "translation" },
    { template: "Kjo është një ___ e bukur.", key: "translation" },
    { template: "Djali bleu një ___ nga tregu.", key: "translation" },
    { template: "Mësuesi tregoi një ___.", key: "translation" },
    { template: "Nëna gatoi me ___.", key: "translation" },
  ],
  anglisht: [
    { template: "I see a ___ in the room.", key: "meaning" },
    { template: "She bought a ___ at the store.", key: "meaning" },
    { template: "The teacher showed a ___.", key: "meaning" },
    { template: "There is a ___ on the table.", key: "meaning" },
    { template: "He found a ___ outside.", key: "meaning" },
  ],
  arabisht: [
    { template: "رَأَيْتُ ___ في الحديقة", key: "meaning" },
    { template: "اشتريتُ ___ من السوق", key: "meaning" },
    { template: "وَجَدْتُ ___ في البيت", key: "meaning" },
  ],
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── Exercise 1: Emoji→Word Matching ─────────────────────────────────────────
function MatchingExercise({ words, language, onComplete }) {
  const items = shuffle(words).slice(0, 6);
  const [leftSel, setLeftSel] = useState(null);
  const [rightSel, setRightSel] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongPair, setWrongPair] = useState(null);

  const rights = shuffle(items.map(w => ({ id: w.word, label: w.meaning })));
  const lefts = items;

  const handleLeft = (w) => {
    if (matched[w.word]) return;
    setLeftSel(w.word);
    setRightSel(null);
  };

  const handleRight = (r) => {
    if (!leftSel) return;
    if (matched[r.id]) return;
    if (leftSel === r.id) {
      const newMatched = { ...matched, [r.id]: true };
      setMatched(newMatched);
      setLeftSel(null);
      setRightSel(null);
      if (Object.keys(newMatched).length === items.length) {
        setTimeout(() => onComplete(100), 700);
      }
    } else {
      setWrongPair({ left: leftSel, right: r.id });
      setTimeout(() => { setWrongPair(null); setLeftSel(null); setRightSel(null); }, 800);
    }
  };

  const isArabic = language === "arabisht";

  return (
    <div>
      <p className="text-sm font-semibold text-gray-600 mb-4 text-center">🔗 Lidhni Emoji-n me Fjalën</p>
      <div className="flex gap-4">
        {/* Left: emojis */}
        <div className="flex-1 space-y-2">
          {lefts.map(w => (
            <button
              key={w.word}
              onClick={() => handleLeft(w)}
              className={`w-full py-3 rounded-xl text-2xl border-2 transition-all ${
                matched[w.word] ? "bg-emerald-50 border-emerald-300 opacity-50" :
                leftSel === w.word ? "border-indigo-500 bg-indigo-50 scale-105" :
                wrongPair?.left === w.word ? "border-red-400 bg-red-50" :
                "border-gray-200 bg-white hover:border-indigo-300"
              }`}
            >
              {w.emoji}
            </button>
          ))}
        </div>
        {/* Right: words */}
        <div className="flex-1 space-y-2">
          {rights.map(r => (
            <button
              key={r.id}
              onClick={() => handleRight(r)}
              className={`w-full py-3 px-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                matched[r.id] ? "bg-emerald-50 border-emerald-300 opacity-50 text-emerald-700" :
                wrongPair?.right === r.id ? "border-red-400 bg-red-50" :
                "border-gray-200 bg-white hover:border-indigo-300 text-gray-800"
              }`}
              style={isArabic ? { fontFamily: "serif", direction: "rtl", fontSize: "1rem" } : {}}
            >
              {r.label}
              {matched[r.id] && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-500" />}
            </button>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">{Object.keys(matched).length}/{items.length} çifte</p>
    </div>
  );
}

// ── Exercise 2: Fill in the Blank ────────────────────────────────────────────
function FillBlankExercise({ words, language, onComplete }) {
  const templates = SENTENCE_TEMPLATES[language] || SENTENCE_TEMPLATES.shqip;
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const total = Math.min(5, words.length);

  const word = words[idx % words.length];
  const tmpl = templates[idx % templates.length];
  const correct = tmpl.key === "meaning" ? word.meaning : word.translation;
  const wrongs = words.filter(w => w.word !== word.word)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  const options = shuffle([word, ...wrongs]).map(w => tmpl.key === "meaning" ? w.meaning : w.translation);

  const handleAnswer = (opt) => {
    if (answered) return;
    const ok = opt === correct;
    setAnswered({ selected: opt, correct, ok });
    if (ok) setScore(s => s + 1);
    setTimeout(() => {
      setAnswered(null);
      if (idx + 1 >= total) {
        onComplete(Math.round(((ok ? score + 1 : score) / total) * 100));
      } else {
        setIdx(i => i + 1);
      }
    }, 1200);
  };

  const isArabic = language === "arabisht";
  const sentence = tmpl.template.replace("___", `[ _____ ]`);

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>Pyetja {idx + 1}/{total}</span>
        <span className="text-emerald-600 font-bold">✓ {score}</span>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 text-center mb-4">
        <div className="text-4xl mb-3">{word.emoji}</div>
        <p className={`text-base font-semibold text-gray-800 mb-1 ${isArabic ? "text-right" : ""}`}
          style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}>
          {sentence}
        </p>
        <p className="text-xs text-gray-400">Plotësoni boshllëkun me fjalën e duhur</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, i) => {
          let cls = "border-gray-200 bg-white text-gray-800 hover:border-amber-300";
          if (answered) {
            if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800";
            else if (opt === answered.selected && !answered.ok) cls = "border-red-400 bg-red-50 text-red-700";
            else cls = "border-gray-100 bg-gray-50 text-gray-400";
          }
          return (
            <button key={i} disabled={!!answered} onClick={() => handleAnswer(opt)}
              className={`border-2 rounded-xl p-3 text-sm font-semibold transition-all ${cls}`}
              style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Exercise 3: Sentence Construction ────────────────────────────────────────
const SENTENCE_BUILDERS = {
  shqip: [
    { words: ["Unë", "lexoj", "librin"], answer: "Unë lexoj librin" },
    { words: ["Ajo", "ha", "mollë"], answer: "Ajo ha mollë" },
    { words: ["Ne", "shkojmë", "në", "shkollë"], answer: "Ne shkojmë në shkollë" },
    { words: ["Ai", "pi", "ujë"], answer: "Ai pi ujë" },
    { words: ["Fëmijët", "luajnë", "në", "oborr"], answer: "Fëmijët luajnë në oborr" },
  ],
  anglisht: [
    { words: ["I", "read", "the", "book"], answer: "I read the book" },
    { words: ["She", "eats", "an", "apple"], answer: "She eats an apple" },
    { words: ["We", "go", "to", "school"], answer: "We go to school" },
    { words: ["He", "drinks", "water"], answer: "He drinks water" },
    { words: ["The", "cat", "sits", "on", "the", "mat"], answer: "The cat sits on the mat" },
  ],
  arabisht: [
    { words: ["أنا", "أقرأ", "الكتاب"], answer: "أنا أقرأ الكتاب" },
    { words: ["هي", "تأكل", "تفاحة"], answer: "هي تأكل تفاحة" },
    { words: ["نحن", "نذهب", "إلى", "المدرسة"], answer: "نحن نذهب إلى المدرسة" },
  ],
};

function SentenceConstructionExercise({ language, onComplete }) {
  const sentences = SENTENCE_BUILDERS[language] || SENTENCE_BUILDERS.shqip;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState(() => shuffle(sentences[0].words));
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const total = Math.min(3, sentences.length);
  const isArabic = language === "arabisht";

  const sentence = sentences[idx % sentences.length];

  const pick = (word, i) => {
    if (result) return;
    setSelected(s => [...s, word]);
    setAvailable(a => { const n = [...a]; n.splice(i, 1); return n; });
  };

  const unpick = (i) => {
    if (result) return;
    const word = selected[i];
    setAvailable(a => shuffle([...a, word]));
    setSelected(s => { const n = [...s]; n.splice(i, 1); return n; });
  };

  const check = () => {
    const built = selected.join(" ");
    const ok = built === sentence.answer;
    setResult(ok ? "correct" : "wrong");
    if (ok) setScore(s => s + 1);
  };

  const next = () => {
    setResult(null);
    if (idx + 1 >= total) {
      onComplete(Math.round((score / total) * 100));
    } else {
      const nextIdx = idx + 1;
      setIdx(nextIdx);
      setSelected([]);
      setAvailable(shuffle(sentences[nextIdx % sentences.length].words));
    }
  };

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>Fjali {idx + 1}/{total}</span>
        <span className="text-emerald-600 font-bold">✓ {score}</span>
      </div>
      <p className="text-sm font-semibold text-gray-700 mb-3 text-center">🔨 Ndërtoni fjalinë duke rradhitur fjalët</p>

      {/* Drop zone */}
      <div className={`min-h-14 bg-gray-50 border-2 rounded-2xl p-3 mb-4 flex flex-wrap gap-2 items-center ${
        result === "correct" ? "border-emerald-400 bg-emerald-50" :
        result === "wrong" ? "border-red-400 bg-red-50" : "border-dashed border-gray-300"
      }`} style={isArabic ? { direction: "rtl" } : {}}>
        {selected.length === 0 && <p className="text-xs text-gray-400 mx-auto">Klikoni fjalët më poshtë...</p>}
        {selected.map((w, i) => (
          <button key={i} onClick={() => unpick(i)}
            className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-red-100 hover:text-red-700 transition-all"
            style={isArabic ? { fontFamily: "serif" } : {}}>
            {w} ×
          </button>
        ))}
      </div>

      {result && (
        <div className={`text-center text-sm font-bold mb-3 ${result === "correct" ? "text-emerald-600" : "text-red-600"}`}>
          {result === "correct" ? "✓ Saktë! Bravo!" : `✗ Përgjigja: "${sentence.answer}"`}
        </div>
      )}

      {/* Available words */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center" style={isArabic ? { direction: "rtl" } : {}}>
        {available.map((w, i) => (
          <button key={i} onClick={() => pick(w, i)} disabled={!!result}
            className="bg-white border-2 border-gray-200 text-gray-800 px-3 py-2 rounded-xl text-sm font-semibold hover:border-indigo-400 hover:bg-indigo-50 transition-all"
            style={isArabic ? { fontFamily: "serif" } : {}}>
            {w}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {!result ? (
          <Button onClick={check} disabled={selected.length === 0}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
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

// ── Main WordExercises wrapper ───────────────────────────────────────────────
export default function WordExercises({ words, language, onClose }) {
  const [exercise, setExercise] = useState(null); // null | "match" | "fill" | "sentence"
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
        <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">🏋️ Ushtrime Interaktive</h3>
        <p className="text-sm text-gray-500 mb-5 text-center">Zgjidhni llojin e ushtrimit</p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { key: "match", icon: "🔗", title: "Lidh Emoji me Fjalën", desc: "Çiftoni 6 emoji me fjalët e tyre" },
            { key: "fill", icon: "✏️", title: "Plotëso Boshllëkun", desc: "Zgjidhni fjalën e saktë në kontekst fjalie" },
            { key: "sentence", icon: "🔨", title: "Ndërto Fjalinë", desc: "Rradhitni fjalët për të formuar fjali" },
          ].map(ex => (
            <button key={ex.key} onClick={() => setExercise(ex.key)}
              className="flex items-center gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-4 hover:shadow-md transition-all text-left">
              <span className="text-3xl">{ex.icon}</span>
              <div>
                <p className="font-bold text-gray-800">{ex.title}</p>
                <p className="text-xs text-gray-500">{ex.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-400 ml-auto" />
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
      {exercise === "match" && <MatchingExercise words={words} language={language} onComplete={handleComplete} />}
      {exercise === "fill" && <FillBlankExercise words={words} language={language} onComplete={handleComplete} />}
      {exercise === "sentence" && <SentenceConstructionExercise language={language} onComplete={handleComplete} />}
    </div>
  );
}