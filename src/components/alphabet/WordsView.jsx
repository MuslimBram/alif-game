import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, Timer, CheckCircle, XCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WORDS_DATA } from "./wordsData.js";

const QUIZ_TYPES_WORDS = ["emoji_to_word", "missing_letter", "word_to_translation", "translation_to_word"];

function generateWordQuestion(language, level) {
  const words = WORDS_DATA[language]?.[level] || WORDS_DATA[language]?.fillestar || [];
  if (!words.length) return null;

  const item = words[Math.floor(Math.random() * words.length)];
  const type = QUIZ_TYPES_WORDS[Math.floor(Math.random() * QUIZ_TYPES_WORDS.length)];
  const isArabic = language === "arabisht";

  const getOtherWords = () => words.filter(w => w.word !== item.word).sort(() => Math.random() - 0.5).slice(0, 3);

  if (type === "emoji_to_word") {
    const others = getOtherWords();
    const options = [item, ...others].sort(() => Math.random() - 0.5);
    return {
      question: `Çfarë tregon kjo figurë?`,
      display: item.emoji,
      displayType: "emoji",
      options: options.map(o => o.meaning),
      correct: item.meaning,
      hint: isArabic ? `(${item.transliteration})` : "",
      type
    };
  }

  if (type === "missing_letter") {
    const wordWithBlank = item.word.replace(item.missing, "_".repeat(item.missing.length));
    const allLetters = isArabic
      ? ["ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","و","ه","ي"]
      : language === "anglisht"
        ? ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","XH","Y","Z"];
    const wrongOptions = allLetters.filter(l => l !== item.missing).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [item.missing, ...wrongOptions].sort(() => Math.random() - 0.5);
    return {
      question: `Cila germë mungon?`,
      display: wordWithBlank,
      subDisplay: item.emoji + " " + item.translation,
      displayType: "word",
      options,
      correct: item.missing,
      isArabic,
      type
    };
  }

  if (type === "word_to_translation") {
    const others = getOtherWords();
    const options = [item, ...others].sort(() => Math.random() - 0.5);
    return {
      question: isArabic ? `Çfarë do të thotë kjo fjalë arabe?` : `Çfarë do të thotë "${item.meaning}"?`,
      display: item.meaning + " " + item.emoji,
      displayType: "word",
      isArabic,
      options: options.map(o => o.translation),
      correct: item.translation,
      type
    };
  }

  // translation_to_word
  const others = getOtherWords();
  const options = [item, ...others].sort(() => Math.random() - 0.5);
  return {
    question: `Si thuhet "${item.translation}" ${isArabic ? "në arabisht" : language === "anglisht" ? "në anglisht" : "në shqip"}?`,
    display: item.emoji,
    displayType: "emoji",
    options: options.map(o => o.meaning),
    correct: item.meaning,
    isArabic,
    type
  };
}

const speak = (text, lang) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "arabisht" ? "ar-SA" : lang === "anglisht" ? "en-US" : "sq";
  u.rate = 0.7;
  window.speechSynthesis.speak(u);
};

const TOTAL = 10;
const TIME = 25;

export default function WordsView({ language }) {
  const [level, setLevel] = useState("fillestar");
  const [mode, setMode] = useState("browse");
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(null);
  const [timer, setTimer] = useState(TIME);
  const [score, setScore] = useState(0);
  const [qNum, setQNum] = useState(1);
  const [finished, setFinished] = useState(false);

  const wordList = WORDS_DATA[language]?.[level] || WORDS_DATA[language]?.fillestar || [];
  const isArabic = language === "arabisht";

  const startQuiz = () => {
    const q = generateWordQuestion(language, level);
    setQuestion(q);
    setTimer(TIME);
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
      if (qNum >= TOTAL) { setFinished(true); return; }
      const q = generateWordQuestion(language, level);
      setQuestion(q);
      setTimer(TIME);
      setQNum(n => n + 1);
      setAnswered(null);
    }, 1300);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          {isArabic ? "🇸🇦 الكلمات العربية" : language === "anglisht" ? "🇬🇧 English Words" : "🇦🇱 Fjalët Shqipe"}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { v: "fillestar", label: "🌱 Fillestar" },
            { v: "mesatar",   label: "🌿 Mesatar" },
            { v: "avancuar",  label: "🌲 Avancuar" },
            { v: "profesionist", label: "🏆 Profesionist" },
          ].map(l => {
            const count = WORDS_DATA[language]?.[l.v]?.length || 0;
            return (
              <button key={l.v} onClick={() => setLevel(l.v)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex flex-col items-center ${level === l.v ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                <span>{l.label}</span>
                <span className={`text-xs ${level === l.v ? "text-emerald-100" : "text-gray-400"}`}>{count} fjalë</span>
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setMode("browse")} variant={mode === "browse" ? "default" : "outline"} className="rounded-xl">
            📚 Shfleto Fjalët
          </Button>
          <Button onClick={startQuiz} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
            🎯 Fillo Ushtrimet
          </Button>
        </div>
      </div>

      {/* Browse mode */}
      {mode === "browse" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-700 mb-4">Fjalë — Nivel {level} ({wordList.length} fjalë)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {wordList.map((w, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.02, 1) }}
                whileHover={{ scale: 1.03 }}
                onClick={() => speak(w.meaning, language)}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{w.emoji}</div>
                <div
                  className={`font-bold text-gray-800 mb-1 ${isArabic ? "text-xl" : "text-base"}`}
                  style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
                >
                  {w.meaning}
                </div>
                {w.transliteration && <div className="text-xs text-gray-400 italic mb-1">{w.transliteration}</div>}
                <div className="text-xs text-indigo-500">{w.translation}</div>
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
            <span className="text-sm font-semibold text-gray-600">Pyetja {qNum}/{TOTAL}</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-amber-100 text-amber-700"}`}>
              <Timer className="w-4 h-4" /> {timer}s
            </div>
            <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center mb-5">
            {question.displayType === "emoji" ? (
              <div className="text-7xl mb-3">{question.display}</div>
            ) : (
              <div
                className={`font-bold text-gray-900 mb-2 ${isArabic ? "text-4xl" : "text-3xl"}`}
                style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
              >
                {question.display}
              </div>
            )}
            {question.subDisplay && <p className="text-sm text-gray-500 mb-1">{question.subDisplay}</p>}
            <p className="text-sm font-semibold text-gray-700">{question.question}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {question.options.map((opt) => {
              let cls = "border-gray-200 bg-white text-gray-800 hover:border-indigo-300 hover:bg-indigo-50";
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
                  className={`border-2 rounded-2xl p-4 font-semibold text-center transition-all ${cls}`}
                  style={isArabic && question.isArabic ? { fontFamily: "serif", direction: "rtl", fontSize: "1.2rem" } : {}}
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
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Ushtrimet Mbaruan!</h3>
          <p className="text-5xl font-bold text-emerald-600 mb-2">{score}/{TOTAL}</p>
          <p className="text-gray-500 mb-6">{score >= 8 ? "Fantastike! 🎉" : score >= 5 ? "Shumë mirë! 👍" : "Provo sërish! 💪"}</p>
          <Button onClick={startQuiz} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-8">
            Provo Sërish
          </Button>
        </div>
      )}
    </div>
  );
}