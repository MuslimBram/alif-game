import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ChevronRight, CheckCircle, XCircle, Timer, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Syllables data for all 3 languages
const SYLLABLES = {
  shqip: {
    title: "Rrokjet Shqipe",
    vowels: ["a", "e", "ë", "i", "o", "u", "y"],
    consonants: ["B", "C", "Ç", "D", "Dh", "F", "G", "Gj", "H", "J", "K", "L", "Ll", "M", "N", "Nj", "P", "Q", "R", "Rr", "S", "Sh", "T", "Th", "V", "X", "Xh", "Z", "Zh"],
    generateSyllables: (cons) => {
      const v = ["a","e","ë","i","o","u","y"];
      return v.map(vow => ({ syllable: cons.toLowerCase() + vow, pronunciation: cons.toLowerCase() + vow }));
    }
  },
  anglisht: {
    title: "English Syllables",
    vowels: ["a","e","i","o","u"],
    consonants: ["B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"],
    generateSyllables: (cons) => {
      const combos = [
        {s: cons.toLowerCase()+"a", p: cons.toLowerCase()+"ay"},
        {s: cons.toLowerCase()+"e", p: cons.toLowerCase()+"ee"},
        {s: cons.toLowerCase()+"i", p: cons.toLowerCase()+"ai"},
        {s: cons.toLowerCase()+"o", p: cons.toLowerCase()+"oh"},
        {s: cons.toLowerCase()+"u", p: cons.toLowerCase()+"oo"},
        {s: cons.toLowerCase()+"ee", p: cons.toLowerCase()+"ee"},
        {s: cons.toLowerCase()+"oo", p: cons.toLowerCase()+"oo"},
        {s: cons.toLowerCase()+"in", p: cons.toLowerCase()+"in"},
        {s: cons.toLowerCase()+"un", p: cons.toLowerCase()+"un"},
        {s: cons.toLowerCase()+"en", p: cons.toLowerCase()+"en"},
        {s: cons.toLowerCase()+"an", p: cons.toLowerCase()+"an"},
      ];
      return combos.map(c => ({ syllable: c.s, pronunciation: c.p }));
    }
  },
  arabisht: {
    title: "المقاطع العربية",
    vowels: ["َ (fatha/a)", "ِ (kasra/i)", "ُ (damma/u)", "اَ (long a)", "ِي (long i)", "وُ (long u)"],
    consonants: ["ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","و","ه","ي"],
    arabicWithHarakat: {
      "ب": [
        {syllable:"بَ", pronunciation:"Ba (fatha)"},
        {syllable:"بِ", pronunciation:"Bi (kasra)"},
        {syllable:"بُ", pronunciation:"Bu (damma)"},
        {syllable:"بَا", pronunciation:"Baa (long a)"},
        {syllable:"بِي", pronunciation:"Bii (long i)"},
        {syllable:"بُو", pronunciation:"Buu (long u)"},
        {syllable:"بَن", pronunciation:"Ban"},
        {syllable:"بِن", pronunciation:"Bin"},
        {syllable:"بُن", pronunciation:"Bun"},
        {syllable:"بَّ", pronunciation:"Bba (shadda)"},
      ],
      "ت": [
        {syllable:"تَ", pronunciation:"Ta"},
        {syllable:"تِ", pronunciation:"Ti"},
        {syllable:"تُ", pronunciation:"Tu"},
        {syllable:"تَا", pronunciation:"Taa"},
        {syllable:"تِي", pronunciation:"Tii"},
        {syllable:"تُو", pronunciation:"Tuu"},
      ],
      "ك": [
        {syllable:"كَ", pronunciation:"Ka"},
        {syllable:"كِ", pronunciation:"Ki"},
        {syllable:"كُ", pronunciation:"Ku"},
        {syllable:"كَا", pronunciation:"Kaa"},
        {syllable:"كِي", pronunciation:"Kii"},
        {syllable:"كُو", pronunciation:"Kuu"},
      ],
      "ل": [
        {syllable:"لَ", pronunciation:"La"},
        {syllable:"لِ", pronunciation:"Li"},
        {syllable:"لُ", pronunciation:"Lu"},
        {syllable:"لَا", pronunciation:"Laa"},
        {syllable:"لِي", pronunciation:"Lii"},
        {syllable:"لُو", pronunciation:"Luu"},
      ],
      "م": [
        {syllable:"مَ", pronunciation:"Ma"},
        {syllable:"مِ", pronunciation:"Mi"},
        {syllable:"مُ", pronunciation:"Mu"},
        {syllable:"مَا", pronunciation:"Maa"},
        {syllable:"مِي", pronunciation:"Mii"},
        {syllable:"مُو", pronunciation:"Muu"},
      ],
      "ن": [
        {syllable:"نَ", pronunciation:"Na"},
        {syllable:"نِ", pronunciation:"Ni"},
        {syllable:"نُ", pronunciation:"Nu"},
        {syllable:"نَا", pronunciation:"Naa"},
        {syllable:"نِي", pronunciation:"Nii"},
        {syllable:"نُو", pronunciation:"Nuu"},
      ],
    }
  }
};

const ARABIC_LETTER_FORMS = {
  "ب": { isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب" },
  "ت": { isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت" },
  "ث": { isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث" },
  "ج": { isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج" },
  "ح": { isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح" },
  "خ": { isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ" },
  "س": { isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس" },
  "ش": { isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش" },
  "ع": { isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع" },
  "غ": { isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ" },
  "ف": { isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف" },
  "ق": { isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق" },
  "ك": { isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك" },
  "ل": { isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل" },
  "م": { isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم" },
  "ن": { isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن" },
  "ه": { isolated: "ه", initial: "هـ", medial: "ـهـ", final: "ـه" },
  "ي": { isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي" },
  "ر": { isolated: "ر", initial: "ر", medial: "ـر", final: "ـر" },
  "ز": { isolated: "ز", initial: "ز", medial: "ـز", final: "ـز" },
  "د": { isolated: "د", initial: "د", medial: "ـد", final: "ـد" },
  "ذ": { isolated: "ذ", initial: "ذ", medial: "ـذ", final: "ـذ" },
  "و": { isolated: "و", initial: "و", medial: "ـو", final: "ـو" },
};

const speak = (text, lang) => {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en" : "sq";
  u.rate = 0.7;
  window.speechSynthesis.speak(u);
};

export default function SyllablesView({ language }) {
  const [selectedCons, setSelectedCons] = useState(null);
  const [mode, setMode] = useState("learn"); // learn | forms | quiz
  const [quizState, setQuizState] = useState(null);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const langData = SYLLABLES[language] || SYLLABLES.shqip;
  const arabicLetters = Object.keys(ARABIC_LETTER_FORMS);
  const consonants = language === "arabisht" ? arabicLetters : langData.consonants;

  useEffect(() => {
    setSelectedCons(null);
    setMode("learn");
  }, [language]);

  const getSyllables = (cons) => {
    if (language === "arabisht") {
      return SYLLABLES.arabisht.arabicWithHarakat[cons] || [
        {syllable: cons + "َ", pronunciation: cons + "a"},
        {syllable: cons + "ِ", pronunciation: cons + "i"},
        {syllable: cons + "ُ", pronunciation: cons + "u"},
        {syllable: cons + "َا", pronunciation: cons + "aa"},
        {syllable: cons + "ِي", pronunciation: cons + "ii"},
        {syllable: cons + "ُو", pronunciation: cons + "uu"},
      ];
    }
    return langData.generateSyllables(cons);
  };

  const generateQuizQuestion = (cons) => {
    const sylls = getSyllables(cons);
    const correct = sylls[Math.floor(Math.random() * sylls.length)];
    const wrongOptions = sylls.filter(s => s.syllable !== correct.syllable).slice(0, 3);
    const allOptions = [...wrongOptions, correct].sort(() => Math.random() - 0.5);
    return {
      question: `Cila rrokje shqiptohet "${correct.pronunciation}"?`,
      options: allOptions.map(o => o.syllable),
      correct: correct.syllable,
      type: "syllable"
    };
  };

  const startQuiz = () => {
    if (!selectedCons) return;
    const q = generateQuizQuestion(selectedCons);
    setQuizState(q);
    setTimer(30);
    setScore(0);
    setQuestionNum(1);
    setAnswered(null);
    setQuizFinished(false);
    setMode("quiz");
  };

  useEffect(() => {
    if (mode !== "quiz" || quizFinished) return;
    if (timer <= 0) {
      handleAnswer(null);
      return;
    }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, mode, quizFinished]);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === quizState.correct;
    setAnswered({ selected: opt, correct: quizState.correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (questionNum >= 10) {
        setQuizFinished(true);
      } else {
        const q = generateQuizQuestion(selectedCons);
        setQuizState(q);
        setTimer(30);
        setQuestionNum(n => n + 1);
        setAnswered(null);
      }
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{langData.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          Zgjidh shkronjën dhe shiko rrokjet e saj me të gjitha zanoret
        </p>

        {/* Consonant selector */}
        <div className="flex flex-wrap gap-2 mb-5">
          {consonants.map((c) => (
            <button
              key={c}
              onClick={() => { setSelectedCons(c); setMode("learn"); }}
              className={`px-3 py-2 rounded-xl font-bold text-sm transition-all ${
                selectedCons === c
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-gray-50 border border-gray-200 text-gray-700 hover:border-emerald-300"
              } ${language === "arabisht" ? "text-xl font-arabic" : ""}`}
              style={language === "arabisht" ? { fontFamily: "serif", direction: "rtl" } : {}}
            >
              {c}
            </button>
          ))}
        </div>

        {selectedCons && (
          <div className="flex gap-2 mb-4">
            {["learn", "forms", "quiz"].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); if (m === "quiz") startQuiz(); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  mode === m
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {m === "learn" ? "📚 Mëso Rrokjet" : m === "forms" ? "🔤 Format e Shkronjës" : "🎯 Kuiz Rrokjesh"}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedCons && mode === "learn" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            Rrokjet me shkronjën{" "}
            <span className={`text-emerald-600 ${language === "arabisht" ? "text-3xl" : "text-2xl"}`}
              style={language === "arabisht" ? { fontFamily: "serif" } : {}}
            >{selectedCons}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {getSyllables(selectedCons).map((syll, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => speak(syll.syllable, language)}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 text-center hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <div
                  className={`font-bold text-gray-900 mb-1 ${language === "arabisht" ? "text-3xl" : "text-2xl"}`}
                  style={language === "arabisht" ? { fontFamily: "serif", direction: "rtl" } : {}}
                >
                  {syll.syllable}
                </div>
                <div className="text-xs text-emerald-600 font-medium">{syll.pronunciation}</div>
                <Volume2 className="w-3.5 h-3.5 text-teal-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {selectedCons && mode === "forms" && language === "arabisht" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">
            Format e shkronjës{" "}
            <span className="text-3xl text-emerald-600" style={{ fontFamily: "serif" }}>{selectedCons}</span>
            {" "}brenda fjalës
          </h3>
          {ARABIC_LETTER_FORMS[selectedCons] ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "E vetme", key: "isolated", color: "bg-purple-50 border-purple-200" },
                { label: "Në fillim", key: "initial", color: "bg-blue-50 border-blue-200" },
                { label: "Në mes", key: "medial", color: "bg-amber-50 border-amber-200" },
                { label: "Në fund", key: "final", color: "bg-rose-50 border-rose-200" },
              ].map(({ label, key, color }) => (
                <div key={key} className={`${color} border rounded-2xl p-6 text-center`}>
                  <p className="text-xs font-semibold text-gray-500 mb-3">{label}</p>
                  <p className="text-5xl font-bold text-gray-900" style={{ fontFamily: "serif", direction: "rtl" }}>
                    {ARABIC_LETTER_FORMS[selectedCons][key]}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => speak(ARABIC_LETTER_FORMS[selectedCons][key], "arabisht")}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Format per kete shkronje nuk jane te disponueshme</p>
          )}
        </div>
      )}

      {selectedCons && mode === "forms" && language !== "arabisht" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">Format e shkronjës <span className="text-2xl text-emerald-600">{selectedCons}</span></h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "E madhe shtypi", form: selectedCons.toUpperCase(), color: "bg-blue-50 border-blue-200" },
              { label: "E vogël shtypi", form: selectedCons.toLowerCase(), color: "bg-emerald-50 border-emerald-200" },
              { label: "E madhe dorëshkrim", form: selectedCons.toUpperCase(), style: { fontFamily: "cursive" }, color: "bg-amber-50 border-amber-200" },
              { label: "E vogël dorëshkrim", form: selectedCons.toLowerCase(), style: { fontFamily: "cursive" }, color: "bg-rose-50 border-rose-200" },
            ].map(({ label, form, style, color }) => (
              <div key={label} className={`${color} border rounded-2xl p-6 text-center`}>
                <p className="text-xs font-semibold text-gray-500 mb-3">{label}</p>
                <p className="text-6xl font-bold text-gray-900" style={style}>{form}</p>
                <Button variant="ghost" size="sm" className="mt-2" onClick={() => speak(form, language)}>
                  <Volume2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "quiz" && !quizFinished && quizState && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-600">Pyetja {questionNum}/10</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"}`}>
              <Timer className="w-4 h-4" /> {timer}s
            </div>
            <span className="text-sm font-semibold text-emerald-600">Pikë: {score}</span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 text-center mb-6">
            <p className="text-lg font-semibold text-gray-800">{quizState.question}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quizState.options.map((opt) => {
              let cls = "border-gray-200 bg-white text-gray-800 hover:border-emerald-300";
              if (answered) {
                if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800";
                else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
                else cls = "border-gray-100 bg-gray-50 text-gray-400";
              }
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!answered}
                  className={`border-2 rounded-2xl p-4 text-center font-bold text-2xl transition-all ${cls}`}
                  style={language === "arabisht" ? { fontFamily: "serif", direction: "rtl" } : {}}
                >
                  {opt}
                  {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-2 text-emerald-600" />}
                  {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 inline ml-2 text-red-500" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {mode === "quiz" && quizFinished && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <Star className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Kuizi Mbaroi!</h3>
          <p className="text-4xl font-bold text-emerald-600 mb-2">{score}/10</p>
          <p className="text-gray-500 mb-6">{score >= 8 ? "Shkëlqyer! 🎉" : score >= 5 ? "Shumë mirë! 👍" : "Provo sërish! 💪"}</p>
          <Button onClick={startQuiz} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
            Provo Sërish
          </Button>
        </div>
      )}
    </div>
  );
}