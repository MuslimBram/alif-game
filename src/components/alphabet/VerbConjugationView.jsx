import React, { useState } from "react";
import { Volume2 } from "lucide-react";

// A selection of common Albanian verbs with conjugation tables
const VERBS = [
  {
    verb: "jam",
    meaning: "to be (jam)",
    translations: { shqip: "jam", english: "to be", arabic: "أكون" },
    conjugation: {
      present: { une: "jam", ti: "je", ai: "është", ajo: "është", ne: "jemi", ju: "jeni", ata: "janë", ato: "janë" },
      past: { une: "isha", ti: "ishe", ai: "ishte", ajo: "ishte", ne: "ishim", ju: "ishit", ata: "ishin", ato: "ishin" },
      future: { une: "do të jem", ti: "do të jesh", ai: "do të jetë", ajo: "do të jetë", ne: "do të jemi", ju: "do të jeni", ata: "do të jenë", ato: "do të jenë" },
      subjunctive: { une: "të jem", ti: "të jesh", ai: "të jetë", ajo: "të jetë", ne: "të jemi", ju: "të jeni", ata: "të jenë", ato: "të jenë" },
    }
  },
  {
    verb: "kam",
    meaning: "to have (kam)",
    translations: { shqip: "kam", english: "to have", arabic: "أملك" },
    conjugation: {
      present: { une: "kam", ti: "ke", ai: "ka", ajo: "ka", ne: "kemi", ju: "keni", ata: "kanë", ato: "kanë" },
      past: { une: "pata", ti: "pate", ai: "pati", ajo: "pati", ne: "patëm", ju: "patët", ata: "patën", ato: "patën" },
      future: { une: "do të kem", ti: "do të kesh", ai: "do të ketë", ajo: "do të ketë", ne: "do të kemi", ju: "do të keni", ata: "do të kenë", ato: "do të kenë" },
      subjunctive: { une: "të kem", ti: "të kesh", ai: "të ketë", ajo: "të ketë", ne: "të kemi", ju: "të keni", ata: "të kenë", ato: "të kenë" },
    }
  },
  {
    verb: "shkoj",
    meaning: "to go (shkoj)",
    translations: { shqip: "shkoj", english: "to go", arabic: "أذهب" },
    conjugation: {
      present: { une: "shkoj", ti: "shkon", ai: "shkon", ajo: "shkon", ne: "shkojmë", ju: "shkoni", ata: "shkojnë", ato: "shkojnë" },
      past: { une: "shkova", ti: "shkove", ai: "shkoi", ajo: "shkoi", ne: "shkuam", ju: "shkuat", ata: "shkuan", ato: "shkuan" },
      future: { une: "do të shkoj", ti: "do të shkosh", ai: "do të shkojë", ajo: "do të shkojë", ne: "do të shkojmë", ju: "do të shkoni", ata: "do të shkojnë", ato: "do të shkojnë" },
      subjunctive: { une: "të shkoj", ti: "të shkosh", ai: "të shkojë", ajo: "të shkojë", ne: "të shkojmë", ju: "të shkoni", ata: "të shkojnë", ato: "të shkojnë" },
    }
  },
  {
    verb: "bëj",
    meaning: "to do/make (bëj)",
    translations: { shqip: "bëj", english: "to do/make", arabic: "أفعل" },
    conjugation: {
      present: { une: "bëj", ti: "bën", ai: "bën", ajo: "bën", ne: "bëjmë", ju: "bëni", ata: "bëjnë", ato: "bëjnë" },
      past: { une: "bëra", ti: "bëre", ai: "bëri", ajo: "bëri", ne: "bëmë", ju: "bëtë", ata: "bënë", ato: "bënë" },
      future: { une: "do të bëj", ti: "do të bësh", ai: "do të bëjë", ajo: "do të bëjë", ne: "do të bëjmë", ju: "do të bëni", ata: "do të bëjnë", ato: "do të bëjnë" },
      subjunctive: { une: "të bëj", ti: "të bësh", ai: "të bëjë", ajo: "të bëjë", ne: "të bëjmë", ju: "të bëni", ata: "të bëjnë", ato: "të bëjnë" },
    }
  },
  {
    verb: "flas",
    meaning: "to speak (flas)",
    translations: { shqip: "flas", english: "to speak", arabic: "أتكلم" },
    conjugation: {
      present: { une: "flas", ti: "flet", ai: "flet", ajo: "flet", ne: "flasim", ju: "flisni", ata: "flasin", ato: "flasin" },
      past: { une: "fola", ti: "fole", ai: "foli", ajo: "foli", ne: "folëm", ju: "folët", ata: "folën", ato: "folën" },
      future: { une: "do të flas", ti: "do të flasësh", ai: "do të flasë", ajo: "do të flasë", ne: "do të flasim", ju: "do të flisni", ata: "do të flasin", ato: "do të flasin" },
      subjunctive: { une: "të flas", ti: "të flasësh", ai: "të flasë", ajo: "të flasë", ne: "të flasim", ju: "të flisni", ata: "të flasin", ato: "të flasin" },
    }
  },
  {
    verb: "lexoj",
    meaning: "to read (lexoj)",
    translations: { shqip: "lexoj", english: "to read", arabic: "أقرأ" },
    conjugation: {
      present: { une: "lexoj", ti: "lexon", ai: "lexon", ajo: "lexon", ne: "lexojmë", ju: "lexoni", ata: "lexojnë", ato: "lexojnë" },
      past: { une: "lexova", ti: "lexove", ai: "lexoi", ajo: "lexoi", ne: "lexuam", ju: "lexuat", ata: "lexuan", ato: "lexuan" },
      future: { une: "do të lexoj", ti: "do të lexosh", ai: "do të lexojë", ajo: "do të lexojë", ne: "do të lexojmë", ju: "do të lexoni", ata: "do të lexojnë", ato: "do të lexojnë" },
      subjunctive: { une: "të lexoj", ti: "të lexosh", ai: "të lexojë", ajo: "të lexojë", ne: "të lexojmë", ju: "të lexoni", ata: "të lexojnë", ato: "të lexojnë" },
    }
  },
];

const TENSE_LABELS = {
  present: "E tashmja (Présent)",
  past: "E kryera (Passé)",
  future: "E ardhmja (Futur)",
  subjunctive: "Lidhore (Subjonctif)",
};

const PRONOUNS = [
  { key: "une", label: "Unë (I)" },
  { key: "ti", label: "Ti (You sg.)" },
  { key: "ai", label: "Ai (He)" },
  { key: "ajo", label: "Ajo (She)" },
  { key: "ne", label: "Ne (We)" },
  { key: "ju", label: "Ju (You pl.)" },
  { key: "ata", label: "Ata (They m.)" },
  { key: "ato", label: "Ato (They f.)" },
];

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "sq-AL";
  u.rate = 0.75;
  const voices = window.speechSynthesis.getVoices();
  const sqVoice = voices.find(v => v.lang.startsWith("sq")) || voices.find(v => v.lang.startsWith("en"));
  if (sqVoice) u.voice = sqVoice;
  window.speechSynthesis.speak(u);
}

export default function VerbConjugationView() {
  const [selectedVerb, setSelectedVerb] = useState(VERBS[0]);
  const [selectedTense, setSelectedTense] = useState("present");
  const [quizMode, setQuizMode] = useState(false);
  const [quizQ, setQuizQ] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCount, setQuizCount] = useState(0);

  const generateQuiz = () => {
    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    const tenses = Object.keys(TENSE_LABELS);
    const tense = tenses[Math.floor(Math.random() * tenses.length)];
    const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
    const correct = verb.conjugation[tense][pronoun.key];
    setQuizQ({ verb, tense, pronoun, correct });
    setQuizAnswer("");
    setQuizResult(null);
  };

  const checkAnswer = () => {
    const isCorrect = quizAnswer.trim().toLowerCase() === quizQ.correct.toLowerCase();
    setQuizResult({ isCorrect, correct: quizQ.correct });
    setQuizCount(c => c + 1);
    if (isCorrect) setScore(s => s + 1);
  };

  const conjugation = selectedVerb.conjugation[selectedTense];

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-1">📚 Zgjedhimi i Foljeve Shqipe</h2>
        <p className="text-sm text-gray-500 mb-4">Mëso zgjedhimin e foljeve të shqipes në të gjitha kohët</p>

        {/* Verb selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {VERBS.map(v => (
            <button key={v.verb} onClick={() => setSelectedVerb(v)}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${selectedVerb.verb === v.verb ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {v.verb}
            </button>
          ))}
        </div>

        {/* Verb info */}
        <div className="bg-emerald-50 rounded-xl p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-emerald-800">{selectedVerb.verb}</p>
            <p className="text-sm text-gray-600">{selectedVerb.meaning}</p>
            <p className="text-xs text-gray-400 mt-0.5">🇬🇧 {selectedVerb.translations.english} · 🇸🇦 {selectedVerb.translations.arabic}</p>
          </div>
          <button onClick={() => speak(selectedVerb.verb)} className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-all">
            <Volume2 className="w-5 h-5 text-emerald-700" />
          </button>
        </div>

        {/* Tense selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(TENSE_LABELS).map(([key, label]) => (
            <button key={key} onClick={() => setSelectedTense(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedTense === key ? "bg-teal-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-teal-300"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Conjugation table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase">Përemri</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase">{TENSE_LABELS[selectedTense]}</th>
                <th className="px-4 py-2.5 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {PRONOUNS.map((p, i) => (
                <tr key={p.key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 font-semibold text-gray-700">{p.label}</td>
                  <td className="px-4 py-3 font-bold text-emerald-700 text-base">{conjugation[p.key]}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => speak(`${p.label.split(" ")[0]} ${conjugation[p.key]}`)}
                      className="w-7 h-7 bg-teal-100 hover:bg-teal-200 rounded-lg flex items-center justify-center transition-all">
                      <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={() => { setQuizMode(true); generateQuiz(); setScore(0); setQuizCount(0); }}
          className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm transition-all">
          🎯 Fillo Kuizin e Zgjedhimit (Quiz)
        </button>
      </div>

      {/* Quiz mode */}
      {quizMode && quizQ && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">🎯 Kuizi i Zgjedhimit</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-emerald-600">✓ {score}/{quizCount}</span>
              <button onClick={() => setQuizMode(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 mb-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Zgjedho foljen (conjugate the verb):</p>
            <p className="text-2xl font-extrabold text-amber-700">"{quizQ.verb.verb}"</p>
            <p className="text-sm text-gray-600 mt-1">
              Koha: <strong>{TENSE_LABELS[quizQ.tense]}</strong> · Veta: <strong>{quizQ.pronoun.label}</strong>
            </p>
          </div>
          <div className="flex gap-2 mb-3">
            <input
              type="text" value={quizAnswer}
              onChange={e => setQuizAnswer(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !quizResult && checkAnswer()}
              placeholder="Shkruaj formën e saktë..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              disabled={!!quizResult}
            />
            {!quizResult ? (
              <button onClick={checkAnswer} disabled={!quizAnswer.trim()}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50">
                ✓ Kontrollo
              </button>
            ) : (
              <button onClick={generateQuiz} className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold">
                Tjetër →
              </button>
            )}
          </div>
          {quizResult && (
            <div className={`rounded-xl p-3 text-sm font-semibold ${quizResult.isCorrect ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
              {quizResult.isCorrect ? "✅ Saktë! Bravo!" : `❌ Gabim. E sakta: "${quizResult.correct}"`}
              <button onClick={() => speak(quizResult.correct)} className="ml-2 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                <Volume2 className="w-3 h-3" /> Dëgjo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}