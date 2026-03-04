import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Volume2, RotateCcw, X, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Revelation context for each surah (when/why it was revealed)
const REVELATION_CONTEXT = {
  1: { period: "Meke — fillimi i shpalljes", context: "Sure Al-Fatiha u shpall dy herë — një herë në Meke dhe një herë në Medine. Ajo është themeli i namazit dhe quhet 'Umm Al-Quran' (Nëna e Kur'anit). U shpall në fillimin e profetësisë." },
  2: { period: "Medine — pas hixhretit", context: "Sureja e gjatë e Kur'anit, zbriti pas emigrimit të Profetit (s.a.s.) në Medine. Trajton ligjet islame, historinë e Israilëve, dhe udhëzimet për jetën e besimtarit." },
  3: { period: "Medine — viti 3 H pas Uhudit", context: "Zbriti pas Betejës së Uhudit dhe delegacionit të Krishterëve nga Nexhrani. Diskuton teologjinë islame kundrejt krishterizmit dhe flet për familjen e Imranit (Merjemja dhe Isai a.s.)." },
  4: { period: "Medine — viti 4-5 H", context: "Zbriti në periudhën e konsolidimit të shtetit Islam. Trajton të drejtat e grave, trashëgiminë, martesën, dhe ligjet penale. Shpallet rëndësia e drejtësisë sociale." },
  5: { period: "Medine — viti 10 H (revelata e fundit)", context: "Ndër revelatat e fundit para vdekjes së Profetit (s.a.s.). Zbriti në Haxhin e Lamtumirës. Përfshin kompletimin e fesë: 'Sot ju plotësova fenë tuaj...' (5:3)." },
  6: { period: "Meke — periudha e mesme", context: "Zbriti tërësisht në Meke gjatë natës. Trajton teuhidin (monoteizmin), argëtimet kundër politeizmit, dhe historinë e Profetit Ibrahim (a.s.)." },
  7: { period: "Meke — periudha e vonë mekase", context: "Njëra nga suret e gjata mekase. Tregon historinë e shumë profetëve (Ademi, Nuhu, Hudu, Salihu, Lutu, Shuajbi, Musai). Mesazhi kryesor: pasojat e mohimit." },
  9: { period: "Medine — viti 9 H (pa Bismillah)", context: "E vetmja sure pa Bismillah në fillim. Zbriti pas thyerjes së traktateve me mushrikët. Quhet 'Al-Bara'ah' (Çlirimi). Shpallet xhihadi i armatosur dhe urdhëri i taksës së zeqatit." },
  12: { period: "Meke — periudha e vështirësive", context: "Quhet 'Ahsanul Qasas' (Tregimi Më i Bukur). Zbriti kur Profeti (s.a.s.) kalonte vështirësi — viti i hidhërimit pas vdekjes së Hadixhes dhe Ebu Talibit. Jep shpresë nëpërmjet historisë së Jusufit (a.s.)." },
  17: { period: "Meke — pas Isra dhe Mi'raxhit", context: "Fillon me ngjarjen e Isra (udhëtimit naktësor) të Profetit (s.a.s.) nga Meka në Jeruzalem. Zbriti pas kësaj ngjarjeje historike dhe përmban 'Dhjetë Urdhërimet' islamike (ajetet 22-37)." },
  18: { period: "Meke — si përgjigje ndaj mushrikëve", context: "Zbriti si përgjigje pyetjeve të Kurejshëve mbi 'Shpellën, Dhul-Karnejnin dhe Shpirtin'. Rekomandohet leximi çdo të Premte. Tregon historinë e Eshab Al-Kehf (djemtë e shpellës)." },
  19: { period: "Meke — periudha e hershme", context: "Zbriti për grupin e parë musliman që emigroi në Abisini (Etiopenë). Mbreti Nexhashi qau kur dëgjoi ajetet rreth Merjemës (a.s.) dhe Isait (a.s.). Flet për lindjen mrekullimore të Jahjas (a.s.) dhe Isait (a.s.)." },
  36: { period: "Meke — periudha e mesme", context: "Quhet 'Zemra e Kur'anit'. Rekomandohet leximi para vdekjes. Trajton ringjalljen, shenjat e Allahut në natyrë, dhe tregimin e banorëve të qytetit që mohuan të dërguarit." },
  55: { period: "Medine (sipas disa — Meke)", context: "Sure Ar-Rahman fillon me 'I Gjithëmëshirshmi — e mësoi Kur'anin'. Ajeti 'Cila nga mirësitë e Zotit tuaj i mohoni?' përsëritet 31 herë — si pyetje si drejtuar njerëzve dhe xhinëve." },
  56: { period: "Meke — periudha e hershme", context: "Flet për Ditën e Kiametit dhe ndarjen e njerëzve në tre grupe: Të Parët, Të Djathtët, dhe Të Majtët. Sipas hadithit, leximi i saj çdo natë mbron nga varfëria." },
  67: { period: "Meke — periudha e vonë", context: "Quhet 'Mbrojtësi' — sipas hadithit, mbrojtje nga dënimi i varrit. Rekomandohet leximi çdo natë. Trajton madhësinë e krijimit të qiejve dhe pyetjet rreth ringjalljes." },
  96: { period: "Meke — AJETET E PARA të shpalljes", context: "Ajetet 1-5 janë REVELATA E PARË e Kur'anit, zbritur në Shpellën Hira në vitin 610 e.s. Meleku Xhibrili e shtrëngoi Profetin (s.a.s.) tri herë dhe i tha: 'Lexo!' Kjo shënoi fillimin e Islamit." },
  97: { period: "Meke — periudha e hershme", context: "Flet për Natën e Kadrit (Laylat Al-Qadr) — nata kur zbriti Kur'ani. Kjo natë gjendet ndër 10 netët e fundit të Ramazanit dhe është 'më e mirë se njëmijë muaj'." },
  108: { period: "Meke — si mbrojtje për Profetin", context: "Sureja më e shkurtër (3 ajete). Zbriti kur armiqtë e Profetit (s.a.s.) gëzoheshin për vdekjen e djemve të tij, duke e quajtur 'Abter' (pa pasardhës). Allahu i premtoi Kautherit (lumit në Xhennet)." },
  110: { period: "Medine — ndër revelatat e fundit", context: "Sipas Ibn Abasit, kjo sure tregon se Profeti (s.a.s.) po afrohej vdekjes. Zbriti pas Çlirimit të Mekës (viti 8 H). Është shenja e fundit e misionit të Profetit." },
  112: { period: "Meke — si përgjigje mbi natyrën e Allahut", context: "Zbriti kur mushrikët ose hebrenjtë pyetën: 'Perndo yti nga çfarë është bërë?' Vlera e saj barazohet me 1/3 e Kur'anit sipas hadithit të Profetit (s.a.s.)." },
  113: { period: "Medine (sipas disa — Meke)", context: "Njëra nga dy 'Muavvidhetejn' (suret mbrojtëse). Zbriti si mbrojtje nga magjia. Sipas hadithit, Profeti (s.a.s.) e lexonte çdo natë para gjumit bashkë me An-Nas dhe Al-Ikhlas." },
  114: { period: "Medine (sipas disa — Meke)", context: "Sureja e fundit e Kur'anit dhe njëra nga 'Muavvidhetejn'. Kërkon mbrojtje nga Allahu kundër shejtanit që fshihet në gjoksin e njerëzve. Lexohet bashkë me Al-Falaq dhe Al-Ikhlas." },
};

function getDefaultContext(surah) {
  return {
    period: `${surah.revelation} — periudha e shpalljes`,
    context: `Sure ${surah.name} (${surah.name_sq}) zbriti në ${surah.revelation} dhe ka ${surah.verses} ajete. ${surah.type === "Mekase" ? "Suret Mekase zakonisht trajtohet tema e teuhidit, ringjalljes dhe historive të profetëve." : "Suret Medinase zakonisht trajtojnë ligjet islamike, rregullat shoqërore dhe organizimin e komunitetit musliman."}`
  };
}

function padNum(n, len) {
  return n.toString().padStart(len, "0");
}

// Generate verses list for a surah (verse numbers 1..N)
function getVerseList(surah) {
  return Array.from({ length: surah.verses }, (_, i) => i + 1);
}

// Quiz questions generated from surah info
function generateSurahQuiz(surah) {
  const questions = [
    {
      q: `Sa ajete ka Sureja "${surah.name}"?`,
      options: shuffleOptions([surah.verses, surah.verses + 3, Math.max(1, surah.verses - 5), surah.verses + 10].map(String)),
      correct: String(surah.verses),
    },
    {
      q: `Sureja "${surah.name}" i përket kategorisë:`,
      options: ["Mekase", "Medinase", "Nga të dyja", "Asnjëra"],
      correct: surah.type,
    },
    {
      q: `Emri shqip i Sures "${surah.name}" është:`,
      options: shuffleOptions([surah.name_sq, "Lopa", "Drita", "Profetët"].filter((v, i, a) => a.indexOf(v) === i)),
      correct: surah.name_sq,
    },
    {
      q: `Sureja "${surah.name}" ka zbritur në:`,
      options: ["Meke", "Medine", "Taif", "Jeruzalem"],
      correct: surah.revelation,
    },
    {
      q: `Numri i Sures "${surah.name}" në Mushaf është:`,
      options: shuffleOptions([surah.num, Math.max(1, surah.num - 2), surah.num + 3, Math.max(1, surah.num - 5)].map(String)),
      correct: String(surah.num),
    },
  ];
  return questions;
}

function shuffleOptions(arr) {
  const unique = [...new Set(arr)].slice(0, 4);
  while (unique.length < 4) unique.push("—");
  return unique.sort(() => Math.random() - 0.5);
}

export default function SurahVerseViewer({ surah, onClose }) {
  const [verseIdx, setVerseIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions] = useState(() => generateSurahQuiz(surah));
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const audioRef = useRef(null);

  const verses = getVerseList(surah);
  const currentVerse = verses[verseIdx];
  const revCtx = REVELATION_CONTEXT[surah.num] || getDefaultContext(surah);
  const isLast = verseIdx === verses.length - 1;

  const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${padNum(surah.num, 3)}${padNum(currentVerse, 3)}.mp3`;

  const playAudio = () => {
    if (!audioRef.current) return;
    setAudioError(false);
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setAudioError(true));
  };

  const replayAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    playAudio();
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  };

  const goTo = (idx) => {
    if (audioRef.current) { audioRef.current.pause(); }
    setPlaying(false);
    setAudioError(false);
    setVerseIdx(idx);
  };

  const handleQuizAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === quizQuestions[quizIdx].correct;
    setAnswered({ selected: opt, correct: quizQuestions[quizIdx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= quizQuestions.length) { setQuizDone(true); return; }
      setQuizIdx(i => i + 1);
      setAnswered(null);
    }, 1200);
  };

  const pct = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="font-bold text-gray-900">{surah.name} — {surah.name_sq}</h2>
            <p className="text-xs text-gray-400">{surah.verses} ajete · {surah.type}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {!showQuiz ? (
          <div className="p-5 space-y-4">
            {/* Revelation context */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-amber-700 mb-1">📅 {revCtx.period}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{revCtx.context}</p>
            </div>

            {/* Verse display */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5 text-center">
              <p className="text-xs text-emerald-600 font-semibold mb-3">
                Ajeti {currentVerse} / {surah.verses}
              </p>
              <div className="text-3xl text-gray-800 mb-4 leading-loose" style={{ fontFamily: "Amiri, serif", direction: "rtl" }}>
                ﴿{currentVerse}﴾
              </div>
              <p className="text-sm text-gray-500 italic">
                {surah.name} — Ajeti {currentVerse}
              </p>
            </div>

            {/* Audio player */}
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setPlaying(false)}
                onError={() => { setAudioError(true); setPlaying(false); }}
                preload="none"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={playing ? pauseAudio : playAudio}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-all"
                >
                  {playing ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Dëgjo Ajetin</>}
                </button>
                <button onClick={replayAudio} className="w-9 h-9 rounded-xl bg-teal-100 hover:bg-teal-200 flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 text-teal-700" />
                </button>
                {playing && <span className="text-xs text-teal-600 animate-pulse">🎵 Duke luajtur...</span>}
                {audioError && <span className="text-xs text-red-500">⚠️ Audio nuk u ngarkua</span>}
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">Sheikh Mishary Al-Afasy</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(verseIdx - 1)}
                disabled={verseIdx === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Para
              </button>

              {/* Progress dots */}
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${((verseIdx + 1) / verses.length) * 100}%` }}
                />
              </div>

              {isLast ? (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-all"
                >
                  🎯 Kuizi
                </button>
              ) : (
                <button
                  onClick={() => goTo(verseIdx + 1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all"
                >
                  Tjetër <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Verse counter */}
            <p className="text-center text-xs text-gray-400">
              {verseIdx + 1} nga {surah.verses} ajete — {Math.round(((verseIdx + 1) / surah.verses) * 100)}% e sures
            </p>
          </div>
        ) : (
          /* QUIZ SECTION */
          <div className="p-5">
            {!quizDone ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">🎯 Kuizi i Sures {surah.name}</h3>
                  <span className="text-xs text-gray-400">Pyetja {quizIdx + 1}/{quizQuestions.length}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${((quizIdx) / quizQuestions.length) * 100}%` }} />
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 mb-4">
                  <p className="font-semibold text-gray-900">{quizQuestions[quizIdx].q}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {quizQuestions[quizIdx].options.map((opt) => {
                    let cls = "border-2 border-gray-200 bg-white hover:border-amber-400 text-gray-800";
                    if (answered) {
                      if (opt === answered.correct) cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800";
                      else if (opt === answered.selected && !answered.isCorrect) cls = "border-2 border-red-400 bg-red-50 text-red-700";
                      else cls = "border-2 border-gray-100 bg-gray-50 text-gray-400";
                    }
                    return (
                      <button key={opt} onClick={() => handleQuizAnswer(opt)}
                        className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${cls}`}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="text-5xl">{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
                <h3 className="text-xl font-bold text-gray-900">Rezultati yt</h3>
                <div className={`text-4xl font-extrabold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>
                  {pct}%
                </div>
                <p className="text-gray-600">{score} nga {quizQuestions.length} pyetje të sakta</p>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-600">
                    {pct >= 80 ? "Shkëlqyeshëm! E njeh mirë këtë sure!" :
                     pct >= 60 ? "Mirë! Lexoje edhe pak herë sure-n." :
                     "Rishiko ajetet dhe provo sërish."}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => { setQuizIdx(0); setAnswered(null); setScore(0); setQuizDone(false); }}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600">
                    Provo Sërish
                  </button>
                  <button onClick={() => { setShowQuiz(false); setVerseIdx(0); }}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                    Kthehu te Ajetet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}