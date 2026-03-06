import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import GrammarRulesView from "./GrammarRulesView";
import FlashcardsView from "./FlashcardsView";
import LanguageRulesView from "./LanguageRulesView";
import { speakText } from "@/components/utils/speakAlbanian";

const speak = (text, lang = "arabisht") => speakText(text, lang);

// ─────────────────────────────────────────────
// HAREKET — shenjat e vokaleve
// ─────────────────────────────────────────────
const HAREKET = [
  { symbol: "بَ",  sign: "َ",  name: "Fatha",           sound: "a / e (i shkurtër)", color: "bg-amber-50 border-amber-300",   tip: "Vizë e vogël sipër germës → lexohet 'a'" },
  { symbol: "بِ",  sign: "ِ",  name: "Kasra",           sound: "i (i shkurtër)",      color: "bg-sky-50 border-sky-300",       tip: "Vizë e vogël poshtë germës → lexohet 'i'" },
  { symbol: "بُ",  sign: "ُ",  name: "Damma",           sound: "u (i shkurtër)",      color: "bg-emerald-50 border-emerald-300", tip: "Kërpudhë e vogël sipër → lexohet 'u'" },
  { symbol: "بَا", sign: "اَ", name: "Alif (Madd)",     sound: "ea / aa (i gjatë)",   color: "bg-yellow-50 border-yellow-300", tip: "Fatha + Alif → tingulli 'ea' zgjatet 2 beat" },
  { symbol: "بِي", sign: "يِ", name: "Ya (Madd)",       sound: "ii (i gjatë)",        color: "bg-cyan-50 border-cyan-300",     tip: "Kasra + Ya → tingulli 'ii' zgjatet 2 beat" },
  { symbol: "بُو", sign: "وُ", name: "Waw (Madd)",      sound: "uu (i gjatë)",        color: "bg-lime-50 border-lime-300",     tip: "Damma + Waw → tingulli 'uu' zgjatet 2 beat" },
  { symbol: "بً",  sign: "ً",  name: "Tanwin Fatha",    sound: "en (fundore)",        color: "bg-orange-50 border-orange-300", tip: "Dy fatha → lexohet '-en' në fund të fjalës" },
  { symbol: "بٍ",  sign: "ٍ",  name: "Tanwin Kasra",    sound: "in (fundore)",        color: "bg-indigo-50 border-indigo-300", tip: "Dy kasra → lexohet '-in' në fund të fjalës" },
  { symbol: "بٌ",  sign: "ٌ",  name: "Tanwin Damma",    sound: "un (fundore)",        color: "bg-teal-50 border-teal-300",     tip: "Dy damma → lexohet '-un' në fund të fjalës" },
  { symbol: "بْ",  sign: "ْ",  name: "Sukun (ـْ)",      sound: "pa vokal (i qetë)",   color: "bg-gray-50 border-gray-300",     tip: "Rreth i vogël → asnjë vokal, germë e qetë/e mbyllur" },
  { symbol: "بَّ", sign: "ّ",  name: "Shadda (ّ)",      sound: "dyfishim germës",     color: "bg-rose-50 border-rose-300",     tip: "W e vogël → germë e dyfishuar, lexohet dyfish më fortë" },
  { symbol: "آ",   sign: "آ",  name: "Alif Madda (آ)", sound: "aaa (shumë i gjatë)", color: "bg-purple-50 border-purple-300", tip: "Alif me tilda sipër → tingull 'aa' shumë i zgjatur (4 beat)" },
  { symbol: "ء",   sign: "ء",  name: "Hamza (ء)",       sound: "glotal stop",         color: "bg-pink-50 border-pink-300",     tip: "Ndalim glotal — si mbyllja e fytit para 'a' në shqip" },
  { symbol: "ة",   sign: "ة",  name: "Ta Marbuta (ة)",  sound: "a / at",              color: "bg-fuchsia-50 border-fuchsia-300", tip: "Ta e lidhur — lexohet 'a' veças, 'at' kur lidhet me fjalën tjetër" },
  { symbol: "ـٰـ", sign: "ٰ",  name: "Dagger Alif (ٰ)", sound: "ea / aa (i gjatë)",   color: "bg-violet-50 border-violet-300", tip: "Alif i vogël sipër germës (أَلِفْ خَنْجَرِيَّة) → si alif madd por shkruhet sipër" },
];

// ─────────────────────────────────────────────
// RREGULLA DIELLI/HËNA (Shamsiyye / Qamariyye)
// ─────────────────────────────────────────────
const SHAMS_LETTERS = ["ت","ث","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ل","ن"];
const QAMAR_LETTERS = ["ا","ب","ج","ح","خ","ع","غ","ف","ق","ك","م","ه","و","ي"];

const AL_RULE = {
  shamsiyye: {
    title: "🌞 Harfet Shamsiyye (شَمْسِيَّة)",
    color: "bg-orange-50 border-orange-200",
    headerColor: "bg-orange-100",
    explanation: "Kur artikulli 'ال' (al) vjen para këtyre germave, 'ل' absorbohet dhe germë e parë e fjalës dyfishohet (shadda). Pra NUK thuhet 'al-...' por thuhet drejtpërdrejt germë e dyfishuar.",
    examples: [
      { ar: "الشَّمْس", trans: "ash-Shams", meaning: "Dielli" },
      { ar: "الرَّحْمٰن", trans: "ar-Rahmaan", meaning: "I Mëshirshmi" },
      { ar: "النَّاس", trans: "an-Naas", meaning: "Njerëzit" },
      { ar: "الدِّين", trans: "ad-Diin", meaning: "Feja" },
      { ar: "التَّوْبَة", trans: "at-Tawbah", meaning: "Pendimi" },
      { ar: "الزَّيْتُون", trans: "az-Zaytun", meaning: "Ulliri" },
    ],
    letters: SHAMS_LETTERS,
  },
  qamariyye: {
    title: "🌙 Harfet Qamariyye (قَمَرِيَّة)",
    color: "bg-blue-50 border-blue-200",
    headerColor: "bg-blue-100",
    explanation: "Kur artikulli 'ال' (al) vjen para këtyre germave, 'ل' lexohet normalisht — thuhet 'al-...' në mënyrë të qartë.",
    examples: [
      { ar: "الْقَمَر", trans: "al-Qamar", meaning: "Hëna" },
      { ar: "الْكِتَاب", trans: "al-Kitaab", meaning: "Libri" },
      { ar: "الْبَيْت", trans: "al-Bayt", meaning: "Shtëpia" },
      { ar: "الْحَمْد", trans: "al-Hamd", meaning: "Lavdërimi" },
      { ar: "الْعَالَم", trans: "al-'Aalam", meaning: "Bota" },
      { ar: "الْمَسْجِد", trans: "al-Masjid", meaning: "Xhamia" },
    ],
    letters: QAMAR_LETTERS,
  }
};

// ─────────────────────────────────────────────
// RROKJET PER CDO GERMË — funksion gjenerik
// ─────────────────────────────────────────────
const generateArabicSyllables = (letter) => [
  { syllable: letter + "َ",   pronunciation: letter + "a  (fatha — e shkurtër)" },
  { syllable: letter + "ِ",   pronunciation: letter + "i  (kasra — i shkurtër)" },
  { syllable: letter + "ُ",   pronunciation: letter + "u  (damma — u shkurtër)" },
  { syllable: letter + "َا",  pronunciation: letter + "aa (fatha+alif — ea i gjatë)" },
  { syllable: letter + "ِي",  pronunciation: letter + "ii (kasra+ya — ii i gjatë)" },
  { syllable: letter + "ُو",  pronunciation: letter + "uu (damma+waw — uu i gjatë)" },
  { syllable: letter + "ً",   pronunciation: letter + "en (tanwin fatha — fundore)" },
  { syllable: letter + "ٍ",   pronunciation: letter + "in (tanwin kasra — fundore)" },
  { syllable: letter + "ٌ",   pronunciation: letter + "un (tanwin damma — fundore)" },
  { syllable: letter + "ْ",   pronunciation: letter + "° (sukun — pa vokal, e qetë)" },
  { syllable: letter + "َّ",  pronunciation: letter + letter + "a (shadda — dyfishim)" },
];

// Rrokjet speciale vetëm për disa germë
const SPECIAL_SYLLABLES = {
  "ر": [
    ...generateArabicSyllables("ر"),
    { syllable: "الرَّ", pronunciation: "ar-Ra (shamsiyye — 'al' bëhet 'ar')" },
  ],
  "ن": [
    ...generateArabicSyllables("ن"),
    { syllable: "نَّ",   pronunciation: "nna (shadda + ghunnah — zë nga hunda)" },
    { syllable: "نْ",    pronunciation: "n° (nun sukun — shiko texhuid)" },
  ],
  "م": [
    ...generateArabicSyllables("م"),
    { syllable: "مَّ",   pronunciation: "mma (shadda + ghunnah)" },
    { syllable: "مْ",    pronunciation: "m° (mim sukun)" },
  ],
  "ا": [
    { syllable: "آ",    pronunciation: "Alif Madda — aaa (shumë i gjatë, 4 beat)" },
    { syllable: "أَ",   pronunciation: "Hamzat al-wasl — a (glotal+fatha)" },
    { syllable: "إِ",   pronunciation: "Hamzat al-wasl — i (glotal+kasra)" },
    { syllable: "أُ",   pronunciation: "Hamzat al-wasl — u (glotal+damma)" },
    { syllable: "اَ",   pronunciation: "Alif madd fatha — ea/aa (2 beat)" },
  ],
  "ء": [
    { syllable: "ءَ",   pronunciation: "Hamza + fatha — a (glotal)" },
    { syllable: "ءِ",   pronunciation: "Hamza + kasra — i (glotal)" },
    { syllable: "ءُ",   pronunciation: "Hamza + damma — u (glotal)" },
    { syllable: "ئِ",   pronunciation: "Hamza mbi ya — i" },
    { syllable: "ؤُ",   pronunciation: "Hamza mbi waw — u" },
    { syllable: "أَ",   pronunciation: "Hamza mbi alif — a" },
  ],
  "ة": [
    { syllable: "ةً",   pronunciation: "-eten / -atan (tanwin e ta marbutës)" },
    { syllable: "ةٍ",   pronunciation: "-etin / -atin (tanwin kasra)" },
    { syllable: "ةٌ",   pronunciation: "-etun / -atun (tanwin damma)" },
    { syllable: "ةَ",   pronunciation: "-eta / -ata (fatha, e lidhur)" },
    { syllable: "ة",    pronunciation: "-a / -ah (veças ose në fund)" },
  ],
  "و": [
    { syllable: "وَ",   pronunciation: "Wa (fatha)" },
    { syllable: "وِ",   pronunciation: "Wi (kasra)" },
    { syllable: "وُ",   pronunciation: "Wu (damma)" },
    { syllable: "وُو",  pronunciation: "Wuu (madd waw — uu i gjatë)" },
    { syllable: "وْ",   pronunciation: "W° (sukun — waw e qetë)" },
  ],
  "ي": [
    { syllable: "يَ",   pronunciation: "Ya (fatha)" },
    { syllable: "يِ",   pronunciation: "Yi (kasra)" },
    { syllable: "يُ",   pronunciation: "Yu (damma)" },
    { syllable: "يِي",  pronunciation: "Yii (madd ya — ii i gjatë)" },
    { syllable: "يْ",   pronunciation: "Y° (sukun — ya e qetë)" },
  ],
};

const ALL_ARABIC_LETTERS = [
  "ا","ء","ب","ت","ث","ج","ح","خ","د","ذ",
  "ر","ز","س","ش","ص","ض","ط","ظ","ع","غ",
  "ف","ق","ك","ل","م","ن","ه","و","ي","ة"
];

const LETTER_NAMES = {
  "ا": "Alif","ء": "Hamza","ب": "Ba","ت": "Ta","ث": "Tha","ج": "Jiim",
  "ح": "Ha","خ": "Kha","د": "Dal","ذ": "Dhal","ر": "Ra","ز": "Zayn",
  "س": "Siin","ش": "Shiin","ص": "Saad","ض": "Daad","ط": "Taa",
  "ظ": "Dhaa","ع": "Ayn","غ": "Ghayn","ف": "Fa","ق": "Qaaf",
  "ك": "Kaaf","ل": "Lam","م": "Miim","ن": "Nuun","ه": "Ha",
  "و": "Waw","ي": "Ya","ة": "Ta Marbuta"
};

// ─── SHQIP ────────────────────────────────────
const SHQIP_SYLLABLES = {
  title: "Rrokjet Shqipe",
  consonants: ["B","C","Ç","D","Dh","F","G","Gj","H","J","K","L","Ll","M","N","Nj","P","Q","R","Rr","S","Sh","T","Th","V","X","Xh","Z","Zh"],
  generate: (c) => ["a","e","ë","i","o","u","y"].map(v => ({ syllable: c.toLowerCase()+v, pronunciation: c.toLowerCase()+v }))
};

// ─── ANGLISHT ─────────────────────────────────
const ANGLISHT_SYLLABLES = {
  title: "English Syllables",
  consonants: ["B","C","D","F","G","H","J","K","L","M","N","P","R","S","T","V","W","X","Y","Z"],
  generate: (c) => [
    {syllable: c.toLowerCase()+"a", pronunciation: c.toLowerCase()+"ay"},
    {syllable: c.toLowerCase()+"e", pronunciation: c.toLowerCase()+"ee"},
    {syllable: c.toLowerCase()+"i", pronunciation: c.toLowerCase()+"ai"},
    {syllable: c.toLowerCase()+"o", pronunciation: c.toLowerCase()+"oh"},
    {syllable: c.toLowerCase()+"u", pronunciation: c.toLowerCase()+"oo"},
  ]
};

// ─────────────────────────────────────────────
// TABS per arabisht
// ─────────────────────────────────────────────
const AR_TABS = [
  { id: "hareket",    label: "🔤 Hareket (Zanore)" },
  { id: "rrokje",     label: "📖 Rrokjet" },
  { id: "pyesor",     label: "⏱️ Pyesor" },
  { id: "al_rule",    label: "☀️🌙 Rregulli AL" },
  { id: "gramatika",  label: "📐 Gramatika" },
  { id: "flashcards", label: "🃏 Flashcards" },
];

function ArabicSyllableQuiz() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [timer, setTimer] = useState(10);
  const [answered, setAnswered] = useState(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const TOTAL_ROUNDS = 12;

  const generateQuestion = () => {
    const letter = ALL_ARABIC_LETTERS[Math.floor(Math.random() * ALL_ARABIC_LETTERS.length)];
    const syllables = SPECIAL_SYLLABLES[letter] || generateArabicSyllables(letter);
    const correct = syllables[Math.floor(Math.random() * syllables.length)];
    // Wrong options from different letters
    const wrongLetters = ALL_ARABIC_LETTERS.filter(l => l !== letter);
    const wrongs = [];
    while (wrongs.length < 3) {
      const wl = wrongLetters[Math.floor(Math.random() * wrongLetters.length)];
      const ws = SPECIAL_SYLLABLES[wl] || generateArabicSyllables(wl);
      const w = ws[Math.floor(Math.random() * ws.length)];
      if (!wrongs.find(x => x.pronunciation === w.pronunciation)) wrongs.push(w);
    }
    const options = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    return { syllable: correct.syllable, correctPronunciation: correct.pronunciation, options };
  };

  const [question, setQuestion] = useState(() => generateQuestion());

  useEffect(() => {
    if (!started || finished) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, started, finished, round]);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt?.pronunciation === question.correctPronunciation;
    setAnswered({ selected: opt?.pronunciation || null, correct: question.correctPronunciation, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    speak(question.syllable, "arabisht");
    setTimeout(() => {
      if (round + 1 >= TOTAL_ROUNDS) { setFinished(true); return; }
      setQuestion(generateQuestion());
      setAnswered(null);
      setTimer(10);
      setRound(r => r + 1);
    }, 1500);
  };

  if (!started) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <div className="text-5xl mb-4">⏱️</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Pyesor Rrokjesh Arabe</h3>
      <p className="text-gray-500 mb-1">{TOTAL_ROUNDS} pyetje · 10 sekonda secila</p>
      <p className="text-sm text-teal-600 mb-6">Shiko rrokjen dhe zgjidh shqiptimin e saktë!</p>
      <button onClick={() => setStarted(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-3 font-bold transition-all">
        🚀 Fillo Pyesorin
      </button>
    </div>
  );

  if (finished) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <div className="text-5xl mb-3">🏆</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Mbaroi!</h3>
      <p className={`text-5xl font-bold mb-3 ${score >= 9 ? "text-emerald-600" : score >= 6 ? "text-amber-600" : "text-red-500"}`}>
        {score}/{TOTAL_ROUNDS}
      </p>
      <p className="text-gray-500 mb-6">
        {score >= 10 ? "🌟 Mashallah! Ekspert i rrokjeve!" : score >= 7 ? "👍 Shumë mirë!" : "📚 Praktiko më shumë!"}
      </p>
      <button onClick={() => { setStarted(false); setFinished(false); setScore(0); setRound(0); setTimer(10); setAnswered(null); setQuestion(generateQuestion()); }}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-3 font-bold transition-all">
        🔄 Provo Sërish
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-600">Pyetja {round + 1}/{TOTAL_ROUNDS}</span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 3 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
          ⏱️ {timer}s
        </div>
        <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(round / TOTAL_ROUNDS) * 100}%` }} />
      </div>
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center mb-5">
        <p className="text-xs text-gray-400 mb-2">Cili është shqiptimi i kësaj rrokje?</p>
        <div className="text-6xl font-bold text-gray-900 mb-1" style={{ fontFamily: "serif", direction: "rtl" }}>{question.syllable}</div>
        <button onClick={() => speak(question.syllable, "arabisht")}
          className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1 mx-auto mt-2">
          <Volume2 className="w-3 h-3" /> Dëgjo
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          let cls = "border-gray-200 bg-white text-gray-800 hover:border-teal-300 hover:bg-teal-50";
          if (answered) {
            if (opt.pronunciation === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
            else if (opt.pronunciation === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
            else cls = "border-gray-100 bg-gray-50 text-gray-400";
          }
          return (
            <button key={i} disabled={!!answered} onClick={() => handleAnswer(opt)}
              className={`border-2 rounded-2xl p-3 text-sm text-center transition-all ${cls}`}>
              {opt.pronunciation}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SyllablesView({ language }) {
  const [arTab, setArTab] = useState("hareket");
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedCons, setSelectedCons] = useState(null);
  const [showTip, setShowTip] = useState(null);

  const getSyllables = (letter) =>
    SPECIAL_SYLLABLES[letter] || generateArabicSyllables(letter);

  // ── ARABIC ──
  if (language === "arabisht") {
    return (
      <div className="space-y-4">
        {/* Tab bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">المقاطع العربية — Rrokjet Arabe</h2>
          <div className="flex flex-wrap gap-2">
            {AR_TABS.map(t => (
              <button key={t.id} onClick={() => setArTab(t.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  arTab === t.id ? "bg-emerald-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB 1: HAREKET ── */}
        {arTab === "hareket" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-1">Shenjat e Vokaleve (حَرَكَات)</h3>
            <p className="text-sm text-gray-500 mb-4">Kliko çdo shenjë për ta dëgjuar dhe mëso rregullin e saj</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {HAREKET.map((h, i) => (
                <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.04 }}>
                  <button
                    onClick={() => { speak(h.symbol, "arabisht"); setShowTip(showTip === i ? null : i); }}
                    className={`w-full ${h.color} border-2 rounded-2xl p-3 text-center hover:shadow-md transition-all`}
                  >
                    <div className="text-3xl font-bold mb-1" style={{ fontFamily: "serif", direction:"rtl" }}>{h.symbol}</div>
                    <div className="text-xs font-bold text-gray-800">{h.name}</div>
                    <div className="text-xs text-emerald-700 font-medium mt-0.5">{h.sound}</div>
                    <Volume2 className="w-3 h-3 text-gray-400 mx-auto mt-1" />
                  </button>
                  {showTip === i && (
                    <div className="mt-1 p-2 bg-gray-800 text-white text-xs rounded-xl text-center">{h.tip}</div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Shpjegim shtesë */}
            <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Rregull i rëndësishëm: Madd (زِيَادَة) — Zgjatja</h4>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                {[
                  { name: "Madd Asli (طبيعي)", beats: "2 beat", ex: "بَا / بِي / بُو", desc: "Fatha+Alif, Kasra+Ya, Damma+Waw = zgjatje e thjeshtë" },
                  { name: "Madd Munfasil", beats: "4-5 beat", ex: "يَا أَيُّهَا", desc: "Madd para Hamzës në fjalën tjetër" },
                  { name: "Madd Muttasil", beats: "4-5 beat", ex: "جَاءَ", desc: "Madd para Hamzës në të njëjtën fjalë" },
                ].map((m, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-amber-100">
                    <div className="font-bold text-amber-700 text-xs">{m.name}</div>
                    <div className="text-lg font-bold text-gray-800 my-1" style={{ fontFamily:"serif", direction:"rtl" }}>{m.ex}</div>
                    <div className="text-xs text-emerald-600 font-semibold">{m.beats}</div>
                    <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: RROKJET ── */}
        {arTab === "rrokje" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-1">Rrokjet e çdo Germë</h3>
            <p className="text-sm text-gray-500 mb-4">Zgjidh germën — do të shohësh të gjitha rrokjet (fatha, kasra, damma, madd, tanwin, sukun, shadda)</p>
            {/* Letter grid */}
            <div className="flex flex-wrap gap-2 mb-5">
              {ALL_ARABIC_LETTERS.map((l) => (
                <button key={l} onClick={() => setSelectedLetter(selectedLetter === l ? null : l)}
                  className={`w-12 h-12 rounded-xl font-bold text-xl transition-all border-2 ${
                    selectedLetter === l
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                      : "bg-gray-50 border-gray-200 text-gray-800 hover:border-emerald-300"
                  }`}
                  style={{ fontFamily:"serif" }}
                  title={LETTER_NAMES[l]}
                >
                  {l}
                </button>
              ))}
            </div>

            {selectedLetter && (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold text-emerald-600" style={{ fontFamily:"serif" }}>{selectedLetter}</span>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{LETTER_NAMES[selectedLetter]}</div>
                    {SHAMS_LETTERS.includes(selectedLetter) && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">☀️ Shamsiyye — AL bëhet shkrirje</span>
                    )}
                    {QAMAR_LETTERS.includes(selectedLetter) && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">🌙 Qamariyye — AL qartë</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {getSyllables(selectedLetter).map((s, i) => (
                    <motion.button key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.04 }}
                      onClick={() => speak(s.syllable, "arabisht")}
                      className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 text-center hover:shadow-md hover:border-emerald-300 transition-all group"
                    >
                      <div className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily:"serif", direction:"rtl" }}>{s.syllable}</div>
                      <div className="text-xs text-emerald-700 font-medium leading-tight">{s.pronunciation}</div>
                      <Volume2 className="w-3 h-3 text-teal-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {!selectedLetter && (
              <div className="text-center py-10 text-gray-400">
                <div className="text-4xl mb-2">☝️</div>
                <p className="text-sm">Zgjidh një germë sipër për të parë rrokjet e saj</p>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: PYESOR ── */}
        {arTab === "pyesor" && <ArabicSyllableQuiz />}

        {/* ── TAB 4: GRAMATIKA ── */}
        {arTab === "gramatika" && <GrammarRulesView language="arabisht" />}

        {/* ── TAB 5: FLASHCARDS ── */}
        {arTab === "flashcards" && <FlashcardsView language="arabisht" />}

        {/* ── TAB 3: RREGULLI AL ── */}
        {arTab === "al_rule" && (
          <div className="space-y-4">
            {Object.values(AL_RULE).map((rule) => (
              <div key={rule.title} className={`${rule.color} border rounded-2xl p-5`}>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{rule.title}</h3>
                <p className="text-sm text-gray-700 mb-4 bg-white/70 rounded-xl p-3">{rule.explanation}</p>

                {/* Letra */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {rule.letters.map(l => (
                    <button key={l} onClick={() => speak("ال"+l, "arabisht")}
                      className={`w-10 h-10 rounded-xl font-bold text-xl border-2 transition-all hover:shadow-md
                        ${rule === AL_RULE.shamsiyye ? "bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200" : "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200"}`}
                      style={{ fontFamily:"serif" }} title={LETTER_NAMES[l]}>
                      {l}
                    </button>
                  ))}
                </div>

                {/* Shembujt */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {rule.examples.map((ex, i) => (
                    <button key={i} onClick={() => speak(ex.ar, "arabisht")}
                      className="bg-white border border-gray-100 rounded-2xl p-3 text-center hover:shadow-md transition-all group">
                      <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily:"serif", direction:"rtl" }}>{ex.ar}</div>
                      <div className="text-xs font-bold text-emerald-700">{ex.trans}</div>
                      <div className="text-xs text-gray-500">{ex.meaning}</div>
                      <Volume2 className="w-3 h-3 text-gray-300 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Shembull i thjeshtë vizual */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-3">📝 Si funksionon në praktikë?</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="font-bold text-orange-700 mb-2">☀️ Shamsiyye: al+ر → ar-Ra</div>
                  <div className="space-y-1">
                    {[["الرَّحْمٰن","ar-Rahmaan"],["الرُّسُل","ar-Rusul"],["الرِّجَال","ar-Rijaal"]].map(([a,t]) => (
                      <div key={a} className="flex justify-between items-center bg-white rounded-lg px-3 py-1.5 border border-orange-100">
                        <span style={{ fontFamily:"serif" }} className="text-xl">{a}</span>
                        <span className="text-xs font-mono text-orange-700">{t}</span>
                        <button onClick={() => speak(a,"arabisht")} className="text-gray-400 hover:text-orange-600"><Volume2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="font-bold text-blue-700 mb-2">🌙 Qamariyye: al+ك → al-Ka</div>
                  <div className="space-y-1">
                    {[["الْكَعْبَة","al-Ka'bah"],["الْكِتَاب","al-Kitaab"],["الْكُرْسِي","al-Kursii"]].map(([a,t]) => (
                      <div key={a} className="flex justify-between items-center bg-white rounded-lg px-3 py-1.5 border border-blue-100">
                        <span style={{ fontFamily:"serif" }} className="text-xl">{a}</span>
                        <span className="text-xs font-mono text-blue-700">{t}</span>
                        <button onClick={() => speak(a,"arabisht")} className="text-gray-400 hover:text-blue-600"><Volume2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── SHQIP / ANGLISHT ──
  const langData = language === "anglisht" ? ANGLISHT_SYLLABLES : SHQIP_SYLLABLES;
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{langData.title}</h2>
        <p className="text-sm text-gray-500 mb-4">Zgjidh shkronjën dhe shiko rrokjet me të gjitha zanoret</p>
        <div className="flex flex-wrap gap-2">
          {langData.consonants.map(c => (
            <button key={c} onClick={() => setSelectedCons(selectedCons === c ? null : c)}
              className={`px-3 py-2 rounded-xl font-bold text-sm transition-all border-2 ${
                selectedCons === c ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-gray-50 border-gray-200 text-gray-700 hover:border-emerald-300"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {selectedCons && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            Rrokjet me <span className="text-emerald-600 text-2xl">{selectedCons}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {langData.generate(selectedCons).map((s, i) => (
              <motion.button key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.05 }}
                onClick={() => speak(s.syllable, language)}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 text-center hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <div className="text-2xl font-bold text-gray-900 mb-1">{s.syllable}</div>
                <div className="text-xs text-emerald-600 font-medium">{s.pronunciation}</div>
                <Volume2 className="w-3.5 h-3.5 text-teal-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}