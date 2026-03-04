import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, BookOpen, ChevronLeft, ChevronRight, Lock, CheckCircle, Loader2 } from "lucide-react";
import DrawingCanvas from "./DrawingCanvas";
import VoiceRecorder from "./VoiceRecorder";
import LetterQuiz from "./LetterQuiz";
import LetterExercises from "./LetterExercises";

const formLabels = {
  uppercase: "E Madhe shtypi",
  lowercase: "E Vogël shtypi",
  handwritten_upper: "E Madhe dorëshkrim",
  handwritten_lower: "E Vogël dorëshkrim",
};

const arabicFormLabels = {
  handwritten_upper: "Stypi Dore",
};

export default function LetterLearningView({ letters, initialIndex = 0, onProgressUpdate }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [activeForm, setActiveForm] = useState("uppercase");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [passedLetters, setPassedLetters] = useState({});
  const [scores, setScores] = useState({});
  const [drawingScore, setDrawingScore] = useState(null);
  const [voiceScore, setVoiceScore] = useState(null);

  const letter = letters[currentIndex];
  const totalLetters = letters.length;

  useEffect(() => {
    const isArabic = letters[currentIndex]?.language === "arabisht";
    setActiveForm(isArabic ? "handwritten_upper" : "uppercase");
    setShowQuiz(false);
    setShowExercises(false);
    setDrawingScore(null);
    setVoiceScore(null);
  }, [currentIndex]);

  if (!letter) return null;

  const forms = {
    uppercase: letter.form_uppercase || letter.letter?.toUpperCase(),
    lowercase: letter.form_lowercase || letter.letter?.toLowerCase(),
    handwritten_upper: letter.form_handwritten_upper || letter.letter?.toUpperCase(),
    handwritten_lower: letter.form_handwritten_lower || letter.letter?.toLowerCase(),
  };

  const isLetterPassed = (idx) => passedLetters[letters[idx]?.id];
  const canGoNext = isLetterPassed(currentIndex);

  const handlePass = (score) => {
    const newPassed = { ...passedLetters, [letter.id]: true };
    const newScores = { ...scores, [letter.id]: score };
    setPassedLetters(newPassed);
    setScores(newScores);
    setShowQuiz(false);
    onProgressUpdate && onProgressUpdate(letter.id, score);
    if (currentIndex + 1 < totalLetters) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 500);
    }
  };

  const handleFail = () => {
    setShowQuiz(false);
    setTimeout(() => setShowQuiz(true), 100);
  };

  const goTo = (idx) => {
    if (idx < 0 || idx >= totalLetters) return;
    if (idx > currentIndex && !canGoNext && idx !== 0) {
      alert("Duhet të arrini pakën 80% para se të vazhdoni!");
      return;
    }
    setCurrentIndex(idx);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Shkronja: {letter.letter}</h2>
          <p className="text-xs text-gray-500">
            Shkronja {currentIndex + 1} nga {totalLetters}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {passedLetters[letter.id] && (
            <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-xl px-3 py-1">
              <CheckCircle className="w-4 h-4" /> {scores[letter.id]}%
            </span>
          )}
          <Button
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
            onClick={() => {
              if (!window.speechSynthesis) return;
              window.speechSynthesis.cancel();
              const u = new SpeechSynthesisUtterance(letter.pronunciation || letter.letter);
              const langCode = letter.language === "arabisht" ? "ar-SA" : letter.language === "anglisht" ? "en-US" : "sq-AL";
              u.lang = langCode;
              u.rate = 0.55;
              const doSpeak = () => {
                const voices = window.speechSynthesis.getVoices();
                const prefix = langCode.split("-")[0];
                const voice = voices.find(v => v.lang.startsWith(prefix)) || voices.find(v => v.lang.startsWith("en"));
                if (voice) u.voice = voice;
                window.speechSynthesis.speak(u);
              };
              const voices = window.speechSynthesis.getVoices();
              if (voices.length > 0) doSpeak();
              else { window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.onvoiceschanged = null; doSpeak(); }; setTimeout(doSpeak, 500); }
            }}
          >
            <Volume2 className="w-4 h-4 mr-1.5" />
            Dëgjo Tingullin
          </Button>
        </div>
      </div>

      {/* Form selector */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Zgjidhni Formën</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {(letter.language === "arabisht"
            ? Object.keys(arabicFormLabels)
            : Object.keys(formLabels)
          ).map((key) => {
            const labels = letter.language === "arabisht" ? arabicFormLabels : formLabels;
            return (
              <button
                key={key}
                onClick={() => setActiveForm(key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeForm === key
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                {labels[key]} {activeForm === key && forms[key] && `(${forms[key]})`}
              </button>
            );
          })}
        </div>

        {/* Big letter display */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center mb-4">
          <motion.div
            key={activeForm}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-8xl font-bold text-gray-900 mb-3"
            style={activeForm.includes("handwritten") ? { fontFamily: "cursive" } : {}}
          >
            {forms[activeForm]}
          </motion.div>
          <p className="text-sm text-emerald-600 italic">
            Shqiptimi: Shqiptohet si '{letter.pronunciation}'
          </p>
        </div>

        {/* Description */}
        {letter.description && (
          <div className="bg-emerald-50/50 rounded-xl p-4 flex items-start gap-3 mb-4">
            <BookOpen className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-700 mb-1">Përshkrimi</p>
              <p className="text-sm text-gray-600">{letter.description}</p>
            </div>
          </div>
        )}

        {/* Example words */}
        {letter.example_words?.length > 0 && (
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">Shembuj Fjalësh</p>
            <div className="grid grid-cols-2 gap-3">
              {letter.example_words.map((ex, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="font-bold text-gray-900">{ex.word}</p>
                  <p className="text-xs text-gray-500">{ex.translation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawing + Voice — each evaluated separately */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`bg-white rounded-2xl border-2 p-5 transition-all ${drawingScore !== null ? (drawingScore >= 60 ? "border-emerald-300" : "border-amber-300") : "border-gray-100"}`}>
          <DrawingCanvas
            key={letter.id + "-draw"}
            letter={letter}
            onResult={(r) => setDrawingScore(r.score)}
          />
        </div>
        <div className={`bg-white rounded-2xl border-2 p-5 transition-all ${voiceScore !== null ? (voiceScore >= 60 ? "border-emerald-300" : "border-amber-300") : "border-gray-100"}`}>
          <VoiceRecorder
            key={letter.id + "-voice"}
            letter={letter}
            onResult={(r) => setVoiceScore(r.score)}
          />
        </div>
      </div>

      {/* Progress badges */}
      {(drawingScore !== null || voiceScore !== null) && (
        <div className="flex gap-3 flex-wrap">
          {drawingScore !== null && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${drawingScore >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              ✏️ Vizatim: {drawingScore}/100 {drawingScore >= 60 ? "✓" : "↺"}
            </div>
          )}
          {voiceScore !== null && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${voiceScore >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              🎤 Shqiptim: {voiceScore}/100 {voiceScore >= 60 ? "✓" : "↺"}
            </div>
          )}
        </div>
      )}

      {/* Exercises Section */}
      {showExercises ? (
        <LetterExercises letters={letters} onClose={() => setShowExercises(false)} />
      ) : null}

      {/* Quiz Section */}
      {!showQuiz && !showExercises ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-gray-900">📝 Kontrollo Vlerësimin</p>
              <p className="text-xs text-gray-500">
                Duhet të marrësh pakën 80% për të vazhduar
              </p>
            </div>
            {passedLetters[letter.id] && (
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                ✓ Kaluar {scores[letter.id]}%
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowQuiz(true)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
            >
              {passedLetters[letter.id] ? "Bëj Kuizin Sërish" : "Fillo Kuizin"}
            </Button>
            <Button
              onClick={() => setShowExercises(true)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
            >
              ✏️ Ushtrime
            </Button>
          </div>
        </div>
      ) : showQuiz ? (
        <LetterQuiz
          letter={letter}
          allLetters={letters}
          letterIndex={currentIndex}
          totalLetters={totalLetters}
          onPass={handlePass}
          onFail={handleFail}
        />
      ) : null}

      {/* Instructions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-sm font-bold text-gray-700 mb-3">
          📋 Shkronja {currentIndex + 1} nga {totalLetters}
        </p>
        <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>Zgjidhni llojin e shkronjës që dëshironi të mësoni</li>
          <li>Shikoni shkronjën dhe studioni formën e saj</li>
          <li>Vizatoni shkronjën brenda kutisë duke ndjekur udhëzimet</li>
          <li>Klikoni "Kontrollo Vizatimin" për të parë si e keni bërë</li>
          <li>Dëgjoni tingullin dhe regjistroni zërin tuaj duke shqiptuar shkronjën</li>
          <li>Klikoni "Kontrollo Shqiptimin" për të marrë reagime</li>
          <li>Klikoni "Vazhdo" për të kaluar te shkronja tjetër</li>
        </ol>
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-amber-500">⚠️</span>
          <p className="text-xs text-amber-700 font-medium">
            Duhet të marrësh pakën 80% për të vazhduar!
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="rounded-xl flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Para
        </Button>

        {/* Letter dots */}
        <div className="flex gap-1.5 flex-wrap justify-center flex-1">
          {letters.map((l, i) => (
            <button
              key={l.id}
              onClick={() => goTo(i)}
              className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                i === currentIndex
                  ? "bg-emerald-600 text-white scale-110 shadow"
                  : passedLetters[l.id]
                  ? "bg-emerald-200 text-emerald-800"
                  : i > currentIndex && !isLetterPassed(i - 1)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i <= currentIndex || passedLetters[l.id] ? l.letter : <Lock className="w-3 h-3 mx-auto" />}
            </button>
          ))}
        </div>

        <Button
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex + 1 >= totalLetters || !canGoNext}
          className={`rounded-xl flex items-center gap-2 ${
            canGoNext
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Tjetër <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}