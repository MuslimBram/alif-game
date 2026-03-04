import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Volume2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Exercise 1: Multiple Choice Quiz
function VocabQuiz({ unit, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = unit.vocab.map((v, i) => {
    const others = unit.vocab.filter((_, idx) => idx !== i).sort(() => Math.random() - 0.5).slice(0, 2);
    return {
      ar: v.ar,
      correct: v.trans,
      options: [v.trans, ...others.map(o => o.trans)].sort(() => Math.random() - 0.5),
    };
  });

  const q = questions[currentQ];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setAnswered(true);
    if (option === q.correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      onComplete(Math.round((score + (selectedAnswer === q.correct ? 1 : 0)) / questions.length * 100));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-emerald-700">
          Pyetja {currentQ + 1} / {questions.length}
        </p>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <p className="text-2xl font-bold text-right mb-6 text-emerald-800" style={{ fontFamily: "serif", direction: "rtl" }}>
          {q.ar}
        </p>
        <p className="text-sm text-gray-600 mb-4">Zgjidhni përkthimin e saktë:</p>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !answered && handleAnswer(opt)}
              disabled={answered}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                answered
                  ? opt === q.correct
                    ? "border-green-500 bg-green-50 text-green-700"
                    : opt === selectedAnswer
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                  : "border-gray-200 hover:border-emerald-400 cursor-pointer"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {answered && (
        <Button onClick={nextQuestion} className="w-full bg-emerald-600 hover:bg-emerald-700">
          {currentQ < questions.length - 1 ? "Pyetja Tjetër" : "Përfundo"}
        </Button>
      )}
    </div>
  );
}

// Exercise 2: Fill in the Blank
function FillBlank({ unit, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = unit.examples.map((ex) => {
    const vocabForOptions = unit.vocab.slice(0, 4);
    return {
      sentence: ex.trans,
      correct: ex.ar,
      options: [ex.ar, ...vocabForOptions.slice(0, 2).map(v => v.ar)].sort(() => Math.random() - 0.5),
    };
  });

  if (questions.length === 0) {
    return <p className="text-gray-500 text-center py-8">Nuk ka shembuj për këtë ushtrim</p>;
  }

  const q = questions[currentQ];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setAnswered(true);
    if (option === q.correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      onComplete(Math.round((score + (selectedAnswer === q.correct ? 1 : 0)) / questions.length * 100));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-emerald-700">
          Shembulli {currentQ + 1} / {questions.length}
        </p>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <p className="text-lg font-semibold text-gray-800 mb-6">{q.sentence}</p>
        <p className="text-sm text-gray-600 mb-4">Zgjidhni fjalën arabe të saktë:</p>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !answered && handleAnswer(opt)}
              disabled={answered}
              className={`w-full p-4 rounded-lg border-2 transition-all text-center font-bold text-xl ${
                answered
                  ? opt === q.correct
                    ? "border-green-500 bg-green-50 text-green-700"
                    : opt === selectedAnswer
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                  : "border-gray-200 hover:border-emerald-400 cursor-pointer"
              }`}
              style={{ fontFamily: "serif", direction: "rtl" }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {answered && (
        <Button onClick={nextQuestion} className="w-full bg-emerald-600 hover:bg-emerald-700">
          {currentQ < questions.length - 1 ? "Shembulli Tjetër" : "Përfundo"}
        </Button>
      )}
    </div>
  );
}

// Exercise 3: Translation Practice
function TranslationPractice({ unit, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = unit.vocab.map((v) => ({
    ar: v.ar,
    roman: v.roman,
    correct: v.trans,
    wrongOptions: unit.vocab
      .filter(x => x.trans !== v.trans)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(x => x.trans),
  }));

  const q = questions[currentQ];
  const options = [q.correct, ...q.wrongOptions].sort(() => Math.random() - 0.5);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setAnswered(true);
    if (option === q.correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      onComplete(Math.round((score + (selectedAnswer === q.correct ? 1 : 0)) / questions.length * 100));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-emerald-700">
          Fjala {currentQ + 1} / {questions.length}
        </p>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
        <p className="text-4xl font-bold text-emerald-800 mb-2" style={{ fontFamily: "serif", direction: "rtl" }}>
          {q.ar}
        </p>
        {q.roman && <p className="text-xs italic text-gray-400 mb-6">{q.roman}</p>}
        <p className="text-sm text-gray-600 mb-6">Çfarë do të thotë kjo fjalë?</p>
        <div className="space-y-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !answered && handleAnswer(opt)}
              disabled={answered}
              className={`w-full p-4 rounded-lg border-2 transition-all font-semibold ${
                answered
                  ? opt === q.correct
                    ? "border-green-500 bg-green-50 text-green-700"
                    : opt === selectedAnswer
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                  : "border-gray-200 hover:border-emerald-400 cursor-pointer"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {answered && (
        <Button onClick={nextQuestion} className="w-full bg-emerald-600 hover:bg-emerald-700">
          {currentQ < questions.length - 1 ? "Fjala Tjetër" : "Përfundo"}
        </Button>
      )}
    </div>
  );
}

export default function MedineExercises({ unit, onBack }) {
  const [exercise, setExercise] = useState(null);
  const [result, setResult] = useState(null);

  if (result) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${result >= 70 ? "bg-green-100" : "bg-amber-100"}`}>
            <p className="text-4xl font-bold">{result}%</p>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">
            {result >= 80 ? "🎉 Shkëlqyeshëm!" : result >= 60 ? "👏 Mirë bërë!" : "💪 Vazhdo të praktikosh!"}
          </p>
          <p className="text-gray-600 mb-6">{result >= 70 ? "Ke zotëruar mirë këtë mësim!" : "Duhen më shumë ushtrime!"}</p>
          <div className="space-y-3">
            <Button onClick={() => { setExercise(null); setResult(null); }} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Provoj Përsëri
            </Button>
            <Button onClick={onBack} variant="outline" className="w-full">
              Kthehu në Mësim
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (exercise) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <button
          onClick={() => setExercise(null)}
          className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          ← Kthehu te Ushtrimi
        </button>

        {exercise === "vocab" && <VocabQuiz unit={unit} onComplete={setResult} />}
        {exercise === "blank" && <FillBlank unit={unit} onComplete={setResult} />}
        {exercise === "translation" && <TranslationPractice unit={unit} onComplete={setResult} />}
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-gray-600 mb-6">Zgjidhni llojin e ushtrimit:</p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setExercise("vocab")}
        className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition-shadow"
      >
        <p className="text-lg font-bold mb-1">📚 Fjalor — Kuiz Zgjedhimi</p>
        <p className="text-sm text-blue-100">Zgjidhni përkthimin e saktë për çdo fjalë arabe</p>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setExercise("blank")}
        className="w-full bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition-shadow"
      >
        <p className="text-lg font-bold mb-1">✍️ Plotëso Boshllëkun</p>
        <p className="text-sm text-purple-100">Zgjidhni fjalën arabe që përshtatet në fjali</p>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setExercise("translation")}
        className="w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition-shadow"
      >
        <p className="text-lg font-bold mb-1">🌐 Përkthimi</p>
        <p className="text-sm text-orange-100">Përkthejeni fjalën arabe në shqip</p>
      </motion.button>
    </div>
  );
}