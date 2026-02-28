import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Trophy, AlertTriangle } from "lucide-react";

// Quiz questions generated from letter data
function generateQuestions(letter, allLetters) {
  const questions = [];

  // Q1: Which form is this? (image recognition)
  if (letter.form_lowercase) {
    const wrongOptions = allLetters
      .filter((l) => l.id !== letter.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((l) => l.letter);
    const options = [...wrongOptions, letter.letter].sort(() => Math.random() - 0.5);
    questions.push({
      id: 1,
      type: "identify",
      question: `Cila është shkronja e vogël e "${letter.letter}"?`,
      options: allLetters
        .filter((l) => l.language === letter.language)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((l) => l.form_lowercase || l.letter?.toLowerCase())
        .concat([letter.form_lowercase || letter.letter?.toLowerCase()])
        .filter(Boolean)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4),
      correct: letter.form_lowercase || letter.letter?.toLowerCase(),
    });
  }

  // Q2: Word association
  if (letter.example_words && letter.example_words.length > 0) {
    const correctWord = letter.example_words[0];
    const wrongWords = allLetters
      .filter((l) => l.id !== letter.id && l.example_words?.length > 0)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((l) => l.example_words[0]);
    const allOptions = [...wrongWords, correctWord].sort(() => Math.random() - 0.5).slice(0, 4);
    questions.push({
      id: 2,
      type: "word",
      question: `Cila fjalë fillon me shkronjën "${letter.letter}"?`,
      options: allOptions.map((w) => w.word),
      correct: correctWord.word,
    });
  }

  // Q3: Pronunciation
  questions.push({
    id: 3,
    type: "pronunciation",
    question: `Si shqiptohet shkronja "${letter.letter}"?`,
    options: allLetters
      .filter((l) => l.language === letter.language && l.pronunciation)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((l) => l.pronunciation)
      .concat([letter.pronunciation])
      .filter(Boolean)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4),
    correct: letter.pronunciation,
  });

  // Q4: Translation of example word
  if (letter.example_words && letter.example_words.length > 0) {
    const correctWord = letter.example_words[0];
    const wrongTranslations = allLetters
      .filter((l) => l.id !== letter.id && l.example_words?.length > 0)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((l) => l.example_words[0].translation);
    const allOptions = [...wrongTranslations, correctWord.translation]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    questions.push({
      id: 4,
      type: "translation",
      question: `Çfarë do të thotë "${correctWord.word}"?`,
      options: allOptions,
      correct: correctWord.translation,
    });
  }

  // Q5: Which letter?
  questions.push({
    id: 5,
    type: "category",
    question: `Shkronja "${letter.letter}" është?`,
    options: ["Vokal", "Bashkëtingëllore", "Digraf", "Numër"],
    correct: ["a", "e", "ë", "i", "o", "u", "A", "E", "Ë", "I", "O", "U"].includes(letter.letter)
      ? "Vokal"
      : "Bashkëtingëllore",
  });

  return questions.filter((q) => q.options && q.options.length >= 2 && q.correct);
}

export default function LetterQuiz({ letter, allLetters, letterIndex, totalLetters, onPass, onFail }) {
  const QUESTION_TIME = 15; // seconds per question
  const PASS_THRESHOLD = 80;

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    const qs = generateQuestions(letter, allLetters);
    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
    setResults([]);
    setSelectedAnswer(null);
    setAnswered(false);
    setTimeLeft(QUESTION_TIME);
  }, [letter?.id]);

  useEffect(() => {
    if (finished || answered || questions.length === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null); // time out = wrong
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQ, finished, answered, questions.length]);

  const handleAnswer = (answer) => {
    clearInterval(timerRef.current);
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQ]?.correct;
    if (correct) setScore((s) => s + 1);
    setResults((r) => [...r, { correct, answer, expected: questions[currentQ]?.correct }]);

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrentQ((q) => q + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setTimeLeft(QUESTION_TIME);
      }
    }, 1000);
  };

  if (questions.length === 0) return null;

  const percentage = finished ? Math.round((score / questions.length) * 100) : 0;
  const passed = percentage >= PASS_THRESHOLD;

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl border border-gray-100 p-6 text-center"
      >
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
          passed ? "bg-emerald-100" : "bg-red-100"
        }`}>
          {passed
            ? <Trophy className="w-8 h-8 text-emerald-600" />
            : <AlertTriangle className="w-8 h-8 text-red-500" />
          }
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {passed ? "Bravo! Kaluat!" : "Duhet të rishikoni!"}
        </h3>
        <p className="text-3xl font-extrabold mb-1" style={{ color: passed ? "#0d7c3e" : "#dc2626" }}>
          {percentage}%
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {score}/{questions.length} përgjigje korrekte
        </p>
        {!passed && (
          <p className="text-sm text-amber-600 bg-amber-50 rounded-xl px-4 py-2 mb-4 flex items-center gap-2 justify-center">
            <AlertTriangle className="w-4 h-4" />
            Duhet të arrini pakën 80% për të vazhduar!
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onFail}
            variant="outline"
            className="rounded-xl"
          >
            Provo Sërish
          </Button>
          {passed && (
            <Button
              onClick={() => onPass(percentage)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
            >
              Vazhdo →
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  const q = questions[currentQ];
  const timerPct = (timeLeft / QUESTION_TIME) * 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      {/* Progress & Timer */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-gray-500">
          Pyetja {currentQ + 1}/{questions.length}
        </span>
        <div className={`flex items-center gap-1.5 text-sm font-bold ${
          timeLeft <= 5 ? "text-red-500" : "text-emerald-600"
        }`}>
          <Clock className="w-4 h-4" />
          {timeLeft}s
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${timerPct}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full rounded-full transition-colors ${
            timeLeft <= 5 ? "bg-red-400" : "bg-emerald-500"
          }`}
        />
      </div>

      {/* Question */}
      <p className="text-base font-semibold text-gray-900 mb-4">{q.question}</p>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {q.options.map((opt, i) => {
            let bg = "bg-white hover:bg-gray-50 border-gray-200";
            if (answered) {
              if (opt === q.correct) bg = "bg-emerald-100 border-emerald-400";
              else if (opt === selectedAnswer && opt !== q.correct) bg = "bg-red-100 border-red-400";
              else bg = "bg-white border-gray-200 opacity-60";
            }
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleAnswer(opt)}
                disabled={answered}
                className={`border-2 rounded-xl p-3 text-sm font-medium text-left transition-all ${bg}`}
              >
                <span className="text-xs text-gray-400 mr-2">{["A", "B", "C", "D"][i]}.</span>
                {opt}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}