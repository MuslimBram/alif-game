import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, CheckCircle, XCircle, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// 50+ exercise questions per level - mixed types
const generateExercises = (language, level) => {
  const isArabic = language === "arabisht";
  const isEng = language === "anglisht";

  const alphabetSQ = ["A","B","C","Ç","D","Dh","E","Ë","F","G","Gj","H","I","J","K","L","Ll","M","N","Nj","O","P","Q","R","Rr","S","Sh","T","Th","U","V","X","Xh","Y","Z","Zh"];
  const alphabetEN = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const alphabetAR = ["ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","صو","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","و","ه","ي"];

  const alphabet = isArabic ? alphabetAR : isEng ? alphabetEN : alphabetSQ;

  const emojiWords = [
    { emoji: "🍎", sq: "mollë", en: "apple", ar: "تفاح", missing_sq: "M", missing_en: "A", missing_ar: "ت" },
    { emoji: "🐶", sq: "qen", en: "dog", ar: "كلب", missing_sq: "Q", missing_en: "D", missing_ar: "ك" },
    { emoji: "🏠", sq: "shtëpi", en: "house", ar: "بيت", missing_sq: "SH", missing_en: "H", missing_ar: "ب" },
    { emoji: "☀️", sq: "diell", en: "sun", ar: "شمس", missing_sq: "D", missing_en: "S", missing_ar: "ش" },
    { emoji: "📚", sq: "libër", en: "book", ar: "كتاب", missing_sq: "L", missing_en: "B", missing_ar: "ك" },
    { emoji: "🌙", sq: "hënë", en: "moon", ar: "قمر", missing_sq: "H", missing_en: "M", missing_ar: "ق" },
    { emoji: "🐱", sq: "mace", en: "cat", ar: "قطة", missing_sq: "M", missing_en: "C", missing_ar: "ق" },
    { emoji: "💧", sq: "ujë", en: "water", ar: "ماء", missing_sq: "U", missing_en: "W", missing_ar: "م" },
    { emoji: "🌳", sq: "pemë", en: "tree", ar: "شجرة", missing_sq: "P", missing_en: "T", missing_ar: "ش" },
    { emoji: "❤️", sq: "zemër", en: "heart", ar: "قلب", missing_sq: "Z", missing_en: "H", missing_ar: "ق" },
    { emoji: "⭐", sq: "yll", en: "star", ar: "نجم", missing_sq: "Y", missing_en: "ST", missing_ar: "ن" },
    { emoji: "🦁", sq: "luan", en: "lion", ar: "أسد", missing_sq: "L", missing_en: "L", missing_ar: "أ" },
    { emoji: "✋", sq: "dorë", en: "hand", ar: "يد", missing_sq: "D", missing_en: "H", missing_ar: "ي" },
    { emoji: "👁️", sq: "sy", en: "eye", ar: "عين", missing_sq: "S", missing_en: "E", missing_ar: "ع" },
    { emoji: "🎒", sq: "çantë", en: "bag", ar: "حقيبة", missing_sq: "Ç", missing_en: "B", missing_ar: "ح" },
  ];

  // Fill / Feel / Fell style - sound-alike words
  const soundAlikeSQ = [
    { words: ["bal","pal","gal","kal"], correct: "kal", emoji: "🐎", question: "Cila fjalë do të thotë 'kalë'?" },
    { words: ["deta","meta","beta","feta"], correct: "deta", emoji: "🌊", question: "Cila fjalë do të thotë 'det'?" },
    { words: ["guri","muri","buri","zuri"], correct: "guri", emoji: "🪨", question: "Cila fjalë do të thotë 'gur'?" },
    { words: ["lumi","sumi","tumi","bumi"], correct: "lumi", emoji: "🏞️", question: "Cila fjalë do të thotë 'lumë'?" },
  ];
  const soundAlikeEN = [
    { words: ["Fill","Feel","Fell","Fail"], correct: "Fill", emoji: "⛽", question: "Which word means 'to fill'?" },
    { words: ["Leaf","Leave","Live","Life"], correct: "Leaf", emoji: "🍂", question: "Which word means 'a leaf'?" },
    { words: ["Ball","Bell","Bill","Bull"], correct: "Ball", emoji: "⚽", question: "Which word means 'round object'?" },
    { words: ["Cat","Cut","Cot","Coat"], correct: "Cat", emoji: "🐱", question: "Which word is the animal?" },
    { words: ["Ship","Shop","Chip","Chop"], correct: "Ship", emoji: "🚢", question: "Which word means 'vessel on water'?" },
  ];

  const questions = [];

  // 1. Emoji → word (missing letter)
  emojiWords.forEach(w => {
    const word = isArabic ? w.ar : isEng ? w.en : w.sq;
    const missing = isArabic ? w.missing_ar : isEng ? w.missing_en : w.missing_sq;
    const wordWithBlank = word.replace(missing, "___");
    const wrongLetters = alphabet.filter(l => l !== missing).sort(() => Math.random() - 0.5).slice(0, 3);
    questions.push({
      type: "missing_letter",
      question: "Cila germë mungon?",
      emoji: w.emoji,
      display: wordWithBlank,
      options: [missing, ...wrongLetters].sort(() => Math.random() - 0.5),
      correct: missing,
      isArabic,
      explanation: `Fjala e plotë: ${word}`
    });
  });

  // 2. Emoji → identify word
  emojiWords.forEach(w => {
    const correctWord = isArabic ? w.ar : isEng ? w.en : w.sq;
    const others = emojiWords.filter(x => x !== w).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [w, ...others].sort(() => Math.random() - 0.5);
    questions.push({
      type: "emoji_identify",
      question: "Çfarë tregon kjo figurë?",
      emoji: w.emoji,
      options: options.map(o => isArabic ? o.ar : isEng ? o.en : o.sq),
      correct: correctWord,
      isArabic,
    });
  });

  // 3. Sound-alike words
  const soundAlikes = isEng ? soundAlikeEN : soundAlikeSQ;
  soundAlikes.forEach(s => {
    questions.push({
      type: "sound_alike",
      question: s.question,
      emoji: s.emoji,
      options: s.words,
      correct: s.correct,
      isArabic: false,
    });
  });

  // 4. Alphabet order questions
  for (let i = 0; i < 10; i++) {
    const idx = Math.floor(Math.random() * (alphabet.length - 2)) + 1;
    const correct = alphabet[idx + 1];
    const wrong = [alphabet[idx - 1], alphabet[Math.min(idx + 2, alphabet.length - 1)], alphabet[Math.max(0, idx - 2)]];
    questions.push({
      type: "alphabet_order",
      question: `Cila germë vjen pas "${alphabet[idx]}" në alfabet?`,
      options: [correct, ...wrong].sort(() => Math.random() - 0.5),
      correct,
      isArabic,
    });
  }

  // 5. Uppercase / Lowercase
  if (!isArabic) {
    const letters = isEng ? alphabetEN : alphabetSQ.slice(0, 20);
    letters.slice(0, 10).forEach(l => {
      const upper = l.toUpperCase();
      const lower = l.toLowerCase();
      const others = letters.filter(x => x !== l).sort(() => Math.random() - 0.5).slice(0, 3).map(x => x.toLowerCase());
      questions.push({
        type: "case_match",
        question: `Cila është shkronja e vogël e "${upper}"?`,
        options: [lower, ...others].sort(() => Math.random() - 0.5),
        correct: lower,
        isArabic: false,
      });
    });
  }

  return questions.sort(() => Math.random() - 0.5);
};

const TOTAL = 10;
const TIME = 20;

export default function ExercisesView({ language }) {
  const [level, setLevel] = useState("fillestar");
  const [exercises, setExercises] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [timer, setTimer] = useState(TIME);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = exercises[currentIdx];
  const isArabic = language === "arabisht";

  const start = () => {
    const exs = generateExercises(language, level);
    setExercises(exs.slice(0, 50));
    setCurrentIdx(0);
    setAnswered(null);
    setTimer(TIME);
    setScore(0);
    setStarted(true);
    setFinished(false);
  };

  useEffect(() => {
    if (!started || finished || !current) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, started, finished, current]);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === current.correct;
    setAnswered({ selected: opt, correct: current.correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (currentIdx + 1 >= Math.min(exercises.length, TOTAL)) {
        setFinished(true); return;
      }
      setCurrentIdx(i => i + 1);
      setTimer(TIME);
      setAnswered(null);
    }, 1300);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold text-gray-800">Ushtrime Interaktive</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Ushtrime të ndryshme: shkronja mungon, figura → fjalë, rendi i alfabetit, shkronja të mëdha/vogla, dhe të tjera!
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["fillestar","mesatar","avancuar"].map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${level === l ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {l === "fillestar" ? "🌱 Fillestar" : l === "mesatar" ? "🌿 Mesatar" : "🌲 Avancuar"}
            </button>
          ))}
        </div>
        <Button onClick={start} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-6">
          {started && !finished ? "🔄 Rinis Ushtrimet" : "⚡ Fillo 50+ Ushtrime"}
        </Button>
      </div>

      {started && !finished && current && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-600">Ushtrimi {currentIdx + 1}/{Math.min(exercises.length, TOTAL)}</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-amber-100 text-amber-700"}`}>
              <Timer className="w-4 h-4" /> {timer}s
            </div>
            <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center mb-5">
            {current.emoji && <div className="text-6xl mb-3">{current.emoji}</div>}
            {current.display && (
              <div
                className={`font-bold text-gray-900 mb-2 ${isArabic ? "text-3xl" : "text-2xl"}`}
                style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
              >
                {current.display}
              </div>
            )}
            <p className="text-base font-semibold text-gray-700">{current.question}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {current.options?.map((opt) => {
              let cls = "border-gray-200 bg-white text-gray-800 hover:border-amber-300 hover:bg-amber-50";
              if (answered) {
                if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800";
                else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
                else cls = "border-gray-100 bg-gray-50 text-gray-400";
              }
              return (
                <button
                  key={opt}
                  disabled={!!answered}
                  onClick={() => handleAnswer(opt)}
                  className={`border-2 rounded-2xl p-4 font-bold text-center transition-all ${cls}`}
                  style={current.isArabic ? { fontFamily: "serif", direction: "rtl", fontSize: "1.3rem" } : { fontSize: "1rem" }}
                >
                  {opt}
                  {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-600" />}
                  {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 inline ml-1 text-red-500" />}
                </button>
              );
            })}
          </div>

          {answered && current.explanation && (
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-700">
              💡 {current.explanation}
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <Star className="w-14 h-14 text-amber-400 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Ushtrimet Mbaruan!</h3>
          <p className="text-5xl font-bold text-emerald-600 mb-2">{score}/{TOTAL}</p>
          <p className="text-2xl font-bold text-emerald-500 mb-2">{Math.round((score / TOTAL) * 100)}%</p>
          <p className="text-gray-500 mb-6">{score >= 8 ? "Fantastike! 🎉" : score >= 5 ? "Shumë mirë! 👍" : "Vazhdo të stërvitesh! 💪"}</p>
          <Button onClick={start} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-8">
            Provo Sërish
          </Button>
        </div>
      )}
    </div>
  );
}