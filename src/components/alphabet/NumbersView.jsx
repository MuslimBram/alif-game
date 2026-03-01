import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, Timer, CheckCircle, XCircle, Star, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

const NUMBERS = {
  shqip: [
    { num: 0, word: "zero", ordinal: "i zerët" },
    { num: 1, word: "një", ordinal: "i parë" },
    { num: 2, word: "dy", ordinal: "i dytë" },
    { num: 3, word: "tre", ordinal: "i tretë" },
    { num: 4, word: "katër", ordinal: "i katërt" },
    { num: 5, word: "pesë", ordinal: "i pestë" },
    { num: 6, word: "gjashtë", ordinal: "i gjashtë" },
    { num: 7, word: "shtatë", ordinal: "i shtatë" },
    { num: 8, word: "tetë", ordinal: "i tetë" },
    { num: 9, word: "nëntë", ordinal: "i nëntë" },
    { num: 10, word: "dhjetë", ordinal: "i dhjetë" },
    { num: 11, word: "njëmbëdhjetë", ordinal: "i njëmbëdhjetë" },
    { num: 12, word: "dymbëdhjetë", ordinal: "i dymbëdhjetë" },
    { num: 13, word: "trembëdhjetë", ordinal: "i trembëdhjetë" },
    { num: 14, word: "katërmbëdhjetë", ordinal: "i katërmbëdhjetë" },
    { num: 15, word: "pesëmbëdhjetë", ordinal: "i pesëmbëdhjetë" },
    { num: 16, word: "gjashtëmbëdhjetë", ordinal: "i gjashtëmbëdhjetë" },
    { num: 17, word: "shtatëmbëdhjetë", ordinal: "i shtatëmbëdhjetë" },
    { num: 18, word: "tetëmbëdhjetë", ordinal: "i tetëmbëdhjetë" },
    { num: 19, word: "nëntëmbëdhjetë", ordinal: "i nëntëmbëdhjetë" },
    { num: 20, word: "njëzet", ordinal: "i njëzetë" },
    { num: 30, word: "tridhjetë", ordinal: "i tridhjetë" },
    { num: 40, word: "dyzet", ordinal: "i dyzetë" },
    { num: 50, word: "pesëdhjetë", ordinal: "i pesëdhjetë" },
    { num: 60, word: "gjashtëdhjetë", ordinal: "i gjashtëdhjetë" },
    { num: 70, word: "shtatëdhjetë", ordinal: "i shtatëdhjetë" },
    { num: 80, word: "tetëdhjetë", ordinal: "i tetëdhjetë" },
    { num: 90, word: "nëntëdhjetë", ordinal: "i nëntëdhjetë" },
    { num: 100, word: "njëqind", ordinal: "i njëqindtë" },
    { num: 1000, word: "një mijë", ordinal: "i mijëtë" },
  ],
  anglisht: [
    { num: 0, word: "zero", ordinal: "zeroth" },
    { num: 1, word: "one", ordinal: "first" },
    { num: 2, word: "two", ordinal: "second" },
    { num: 3, word: "three", ordinal: "third" },
    { num: 4, word: "four", ordinal: "fourth" },
    { num: 5, word: "five", ordinal: "fifth" },
    { num: 6, word: "six", ordinal: "sixth" },
    { num: 7, word: "seven", ordinal: "seventh" },
    { num: 8, word: "eight", ordinal: "eighth" },
    { num: 9, word: "nine", ordinal: "ninth" },
    { num: 10, word: "ten", ordinal: "tenth" },
    { num: 11, word: "eleven", ordinal: "eleventh" },
    { num: 12, word: "twelve", ordinal: "twelfth" },
    { num: 13, word: "thirteen", ordinal: "thirteenth" },
    { num: 14, word: "fourteen", ordinal: "fourteenth" },
    { num: 15, word: "fifteen", ordinal: "fifteenth" },
    { num: 16, word: "sixteen", ordinal: "sixteenth" },
    { num: 17, word: "seventeen", ordinal: "seventeenth" },
    { num: 18, word: "eighteen", ordinal: "eighteenth" },
    { num: 19, word: "nineteen", ordinal: "nineteenth" },
    { num: 20, word: "twenty", ordinal: "twentieth" },
    { num: 30, word: "thirty", ordinal: "thirtieth" },
    { num: 40, word: "forty", ordinal: "fortieth" },
    { num: 50, word: "fifty", ordinal: "fiftieth" },
    { num: 100, word: "one hundred", ordinal: "one hundredth" },
    { num: 1000, word: "one thousand", ordinal: "one thousandth" },
  ],
  arabisht: [
    { num: 0, word: "صِفْر", ordinal: "الصِّفْر", transliteration: "sifr" },
    { num: 1, word: "وَاحِد", ordinal: "الأَوَّل", transliteration: "wāḥid" },
    { num: 2, word: "اِثْنَان", ordinal: "الثَّانِي", transliteration: "ithnan" },
    { num: 3, word: "ثَلَاثَة", ordinal: "الثَّالِث", transliteration: "thalātha" },
    { num: 4, word: "أَرْبَعَة", ordinal: "الرَّابِع", transliteration: "arba'a" },
    { num: 5, word: "خَمْسَة", ordinal: "الخَامِس", transliteration: "khamsa" },
    { num: 6, word: "سِتَّة", ordinal: "السَّادِس", transliteration: "sitta" },
    { num: 7, word: "سَبْعَة", ordinal: "السَّابِع", transliteration: "sab'a" },
    { num: 8, word: "ثَمَانِيَة", ordinal: "الثَّامِن", transliteration: "thamāniya" },
    { num: 9, word: "تِسْعَة", ordinal: "التَّاسِع", transliteration: "tis'a" },
    { num: 10, word: "عَشَرَة", ordinal: "العَاشِر", transliteration: "'ashara" },
    { num: 11, word: "أَحَدَ عَشَر", ordinal: "الحَادِي عَشَر", transliteration: "aḥada 'ashar" },
    { num: 12, word: "اِثْنَا عَشَر", ordinal: "الثَّانِي عَشَر", transliteration: "ithnā 'ashar" },
    { num: 20, word: "عِشْرُون", ordinal: "العِشْرُون", transliteration: "'ishrūn" },
    { num: 30, word: "ثَلَاثُون", ordinal: "الثَّلَاثُون", transliteration: "thalāthūn" },
    { num: 40, word: "أَرْبَعُون", ordinal: "الأَرْبَعُون", transliteration: "arba'ūn" },
    { num: 50, word: "خَمْسُون", ordinal: "الخَمْسُون", transliteration: "khamsūn" },
    { num: 100, word: "مِئَة", ordinal: "المِئَة", transliteration: "mi'a" },
    { num: 1000, word: "أَلْف", ordinal: "الأَلْف", transliteration: "alf" },
  ],
};

const ARABIC_NUMERALS = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];

const QUIZ_TYPES = ["number_to_word", "word_to_number", "math_add", "math_sub", "ordinal", "arabic_numeral"];

function generateQuestion(language, level) {
  const nums = NUMBERS[language] || NUMBERS.shqip;
  const basic = nums.filter(n => n.num <= (level === "fillestar" ? 20 : level === "mesatar" ? 100 : 1000));
  if (basic.length === 0) return null;

  const type = QUIZ_TYPES[Math.floor(Math.random() * QUIZ_TYPES.length)];
  const item = basic[Math.floor(Math.random() * basic.length)];

  const getWrong = (correct, count = 3) => {
    const others = basic.filter(n => n.num !== item.num);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, count);
    return shuffled;
  };

  if (type === "number_to_word") {
    const wrongs = getWrong(item);
    const options = [item, ...wrongs].sort(() => Math.random() - 0.5);
    return {
      question: `Si shkruhet numri ${item.num} ${language === "arabisht" ? "në arabisht" : "me fjalë"}?`,
      display: item.num.toString(),
      options: options.map(o => o.word),
      correct: item.word,
      type
    };
  }

  if (type === "word_to_number") {
    const wrongs = getWrong(item);
    const options = [item, ...wrongs].sort(() => Math.random() - 0.5);
    return {
      question: language === "arabisht" ? `Sa është numri: ${item.word}?` : `Cili numër është "${item.word}"?`,
      display: item.word,
      options: options.map(o => o.num.toString()),
      correct: item.num.toString(),
      isArabic: language === "arabisht",
      type
    };
  }

  if (type === "math_add") {
    const a = Math.floor(Math.random() * (level === "fillestar" ? 5 : 10)) + 1;
    const b = Math.floor(Math.random() * (level === "fillestar" ? 5 : 10)) + 1;
    const ans = a + b;
    const wrongs = [ans + 1, ans - 1, ans + 2, ans - 2].filter(n => n >= 0 && n !== ans).slice(0, 3);
    const options = [ans, ...wrongs].sort(() => Math.random() - 0.5);
    return {
      question: `${a} + ${b} = ?`,
      display: `${a} + ${b}`,
      options: options.map(o => o.toString()),
      correct: ans.toString(),
      type
    };
  }

  if (type === "math_sub") {
    const a = Math.floor(Math.random() * (level === "fillestar" ? 10 : 20)) + 5;
    const b = Math.floor(Math.random() * (a - 1)) + 1;
    const ans = a - b;
    const wrongs = [ans + 1, ans - 1, ans + 2].filter(n => n >= 0 && n !== ans);
    const options = [ans, ...wrongs.slice(0, 3)].sort(() => Math.random() - 0.5);
    return {
      question: `${a} − ${b} = ?`,
      display: `${a} − ${b}`,
      options: options.map(o => o.toString()),
      correct: ans.toString(),
      type
    };
  }

  if (type === "ordinal" && item.ordinal) {
    const wrongs = getWrong(item);
    const options = [item, ...wrongs].sort(() => Math.random() - 0.5);
    return {
      question: `Cili është numri rreshtor (ordinal) i ${item.num}?`,
      display: item.num.toString(),
      options: options.map(o => o.ordinal),
      correct: item.ordinal,
      type
    };
  }

  if (type === "arabic_numeral" && language === "arabisht" && item.num < 10) {
    const wrongs = [0,1,2,3,4,5,6,7,8,9].filter(n => n !== item.num).slice(0, 3);
    const options = [item.num, ...wrongs].sort(() => Math.random() - 0.5);
    return {
      question: `Cili numër arab është: ${ARABIC_NUMERALS[item.num]}?`,
      display: ARABIC_NUMERALS[item.num],
      options: options.map(o => o.toString()),
      correct: item.num.toString(),
      type
    };
  }

  // fallback
  return generateQuestion(language, level);
}

const speak = (text, lang) => {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en" : "sq";
  u.rate = 0.7;
  window.speechSynthesis.speak(u);
};

const TOTAL_QUESTIONS = 10;
const TIMER_SECONDS = 20;

export default function NumbersView({ language }) {
  const [level, setLevel] = useState("fillestar");
  const [mode, setMode] = useState("learn"); // learn | quiz
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(null);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [score, setScore] = useState(0);
  const [qNum, setQNum] = useState(1);
  const [finished, setFinished] = useState(false);

  const nums = NUMBERS[language] || NUMBERS.shqip;
  const isArabic = language === "arabisht";

  const startQuiz = () => {
    const q = generateQuestion(language, level);
    setQuestion(q);
    setTimer(TIMER_SECONDS);
    setScore(0);
    setQNum(1);
    setAnswered(null);
    setFinished(false);
    setMode("quiz");
  };

  useEffect(() => {
    if (mode !== "quiz" || finished || !question) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, mode, finished, question]);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === question.correct;
    setAnswered({ selected: opt, correct: question.correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (qNum >= TOTAL_QUESTIONS) { setFinished(true); return; }
      const q = generateQuestion(language, level);
      setQuestion(q);
      setTimer(TIMER_SECONDS);
      setQNum(n => n + 1);
      setAnswered(null);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-gray-800">
            {isArabic ? "الأرقام العربية" : language === "anglisht" ? "Numbers in English" : "Numrat Shqip"}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {["fillestar","mesatar","avancuar"].map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${level === l ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {l === "fillestar" ? "Fillestar (0-20)" : l === "mesatar" ? "Mesatar (0-100)" : "Avancuar (0-1000+)"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setMode("learn")} variant={mode === "learn" ? "default" : "outline"} className="rounded-xl">📚 Tabela e Numrave</Button>
          <Button onClick={startQuiz} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">🎯 Fillo Kuizin (50+ pyetje)</Button>
        </div>
      </div>

      {/* Learn mode - numbers table */}
      {mode === "learn" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-700 mb-4">Tabela e Numrave — {language}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {nums.filter(n => n.num <= (level === "fillestar" ? 20 : level === "mesatar" ? 100 : 1000)).map((n) => (
              <motion.button
                key={n.num}
                whileHover={{ scale: 1.03 }}
                onClick={() => speak(n.word, language)}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 text-center hover:shadow-md transition-all"
              >
                <div className="text-2xl font-bold text-emerald-700 mb-1">{n.num}</div>
                {isArabic && n.num < 10 && (
                  <div className="text-2xl text-amber-600 mb-1">{ARABIC_NUMERALS[n.num]}</div>
                )}
                <div className={`font-semibold text-gray-800 ${isArabic ? "text-base" : "text-sm"}`}
                  style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}>
                  {n.word}
                </div>
                {n.transliteration && <div className="text-xs text-gray-400 mt-1 italic">{n.transliteration}</div>}
                {n.ordinal && !isArabic && <div className="text-xs text-teal-500 mt-1">{n.ordinal}</div>}
                <Volume2 className="w-3.5 h-3.5 text-teal-400 mx-auto mt-1" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz mode */}
      {mode === "quiz" && !finished && question && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-600">Pyetja {qNum}/{TOTAL_QUESTIONS}</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
              <Timer className="w-4 h-4" /> {timer}s
            </div>
            <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 text-center mb-5">
            <div
              className={`font-bold text-gray-900 mb-2 ${isArabic && question.isArabic ? "text-4xl" : "text-3xl"}`}
              style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
            >
              {question.display}
            </div>
            <p className="text-sm text-gray-600">{question.question}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {question.options.map((opt) => {
              let cls = "border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50";
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
                  className={`border-2 rounded-2xl p-4 font-semibold text-center transition-all ${cls} ${isArabic ? "text-xl" : "text-lg"}`}
                  style={isArabic && question.isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
                >
                  {opt}
                  {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-600" />}
                  {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 inline ml-1 text-red-500" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {mode === "quiz" && finished && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <Star className="w-14 h-14 text-amber-400 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Kuizi Mbaroi!</h3>
          <p className="text-5xl font-bold text-emerald-600 mb-2">{score}/{TOTAL_QUESTIONS}</p>
          <p className="text-gray-500 mb-6">{score >= 8 ? "Fantastike! 🎉" : score >= 5 ? "Shumë mirë! 👍" : "Vazhdo të stërvitesh! 💪"}</p>
          <Button onClick={startQuiz} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8">
            Provo Sërish
          </Button>
        </div>
      )}
    </div>
  );
}