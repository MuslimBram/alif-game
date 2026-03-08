import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, X, Play, Pause, Mic, MicOff, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VERSE_DATA, HADITH_QURAN, countArabicConsonants } from "./VERSE_DATA";

const REVELATION_CONTEXT = {
  1: { period: "Meke — fillimi i shpalljes", context: "Sure Al-Fatiha u shpall dy herë — një herë në Meke dhe një herë në Medine. Ajo është themeli i namazit dhe quhet 'Umm Al-Quran' (Nëna e Kur'anit). U shpall në fillimin e profetësisë." },
  2: { period: "Medine — pas hixhretit", context: "Sureja e gjatë e Kur'anit, zbriti pas emigrimit të Profetit (s.a.s.) në Medine. Trajton ligjet islame, historinë e Israilëve, dhe udhëzimet për jetën e besimtarit." },
  3: { period: "Medine — viti 3 H pas Uhudit", context: "Zbriti pas Betejës së Uhudit. Diskuton teologjinë islame kundrejt krishterizmit dhe flet për familjen e Imranit." },
  5: { period: "Medine — viti 10 H (revelata e fundit)", context: "Ndër revelatat e fundit. Zbriti në Haxhin e Lamtumirës. Përfshin kompletimin e fesë: 'Sot ju plotësova fenë tuaj...' (5:3)." },
  9: { period: "Medine — viti 9 H (pa Bismillah)", context: "E vetmja sure pa Bismillah në fillim. Zbriti pas thyerjes së traktateve me mushrikët." },
  12: { period: "Meke — periudha e vështirësive", context: "Quhet 'Ahsanul Qasas' (Tregimi Më i Bukur). Zbriti kur Profeti (s.a.s.) kalonte vështirësi — viti i hidhërimit." },
  18: { period: "Meke — si përgjigje ndaj mushrikëve", context: "Rekomandohet leximi çdo të Premte. Tregon historinë e Eshab Al-Kehf (djemtë e shpellës)." },
  36: { period: "Meke — periudha e mesme", context: "Quhet 'Zemra e Kur'anit'. Rekomandohet leximi para vdekjes." },
  55: { period: "Medine / Meke", context: "Ajeti 'Cila nga mirësitë e Zotit tuaj i mohoni?' përsëritet 31 herë." },
  67: { period: "Meke — periudha e vonë", context: "Quhet 'Mbrojtësi' — mbrojtje nga dënimi i varrit. Rekomandohet leximi çdo natë." },
  96: { period: "Meke — REVELATA E PARË", context: "Ajetet 1-5 janë revelata e parë e Kur'anit, zbritur në Shpellën Hira në vitin 610 e.s." },
  97: { period: "Meke — periudha e hershme", context: "Flet për Natën e Kadrit — 'më e mirë se njëmijë muaj'." },
  108: { period: "Meke — si mbrojtje për Profetin", context: "Sureja më e shkurtër (3 ajete). Zbriti kur armiqtë gëzoheshin për vdekjen e djemve të Profetit." },
  110: { period: "Medine — ndër revelatat e fundit", context: "Tregon fundin e misionit të Profetit (s.a.s.). Zbriti pas Çlirimit të Mekës." },
  112: { period: "Meke — si përgjigje mbi natyrën e Allahut", context: "Vlera e saj barazohet me 1/3 e Kur'anit sipas hadithit." },
  113: { period: "Medine / Meke", context: "Suret mbrojtëse (Muavvidhetejn). Mbrojtje nga magjia dhe syri i keq." },
  114: { period: "Medine / Meke", context: "Sureja e fundit e Kur'anit. Kërkon mbrojtje nga shejtani." },
};

function getDefaultContext(surah) {
  return {
    period: `${surah.revelation} — periudha e shpalljes`,
    context: `Sure ${surah.name} (${surah.name_sq}) zbriti në ${surah.revelation} dhe ka ${surah.verses} ajete. ${surah.type === "Mekase" ? "Suret Mekase trajtojnë teuhidin, ringjalljen dhe historitë e profetëve." : "Suret Medinase trajtojnë ligjet islamike dhe organizimin shoqëror."}`
  };
}

function padNum(n, len) { return n.toString().padStart(len, "0"); }

function generateSurahQuiz(surah) {
  return [
    { q: `Sa ajete ka Sureja "${surah.name}"?`, options: shuffle([surah.verses, surah.verses + 3, Math.max(1, surah.verses - 5), surah.verses + 10].map(String)), correct: String(surah.verses) },
    { q: `Sureja "${surah.name}" i përket kategorisë:`, options: ["Mekase", "Medinase", "Nga të dyja", "Asnjëra"], correct: surah.type },
    { q: `Emri shqip i Sures "${surah.name}" është:`, options: shuffle([surah.name_sq, "Lopa", "Drita", "Profetët"].filter((v, i, a) => a.indexOf(v) === i)), correct: surah.name_sq },
    { q: `Sureja "${surah.name}" ka zbritur në:`, options: shuffle(["Meke", "Medine", "Taif", "Jeruzalem"]), correct: surah.revelation },
    { q: `Numri i Sures "${surah.name}" në Mushaf është:`, options: shuffle([surah.num, Math.max(1, surah.num - 2), surah.num + 3, Math.max(1, surah.num - 5)].map(String)), correct: String(surah.num) },
  ];
}

function shuffle(arr) {
  const u = [...new Set(arr)].slice(0, 4);
  while (u.length < 4) u.push("—");
  return u.sort(() => Math.random() - 0.5);
}

// --- Hadithet Section ---
function HadithSection() {
  return (
    <div className="p-5 space-y-4">
      <div className="text-center mb-2">
        <div className="text-3xl mb-1">📚</div>
        <h3 className="text-lg font-bold text-gray-900">Hadithe mbi Mësimin e Kur'anit</h3>
        <p className="text-xs text-gray-500">Fjalët e Profetit Muhammed (s.a.s.) që na nxisin të mësojmë Kur'anin</p>
      </div>
      {HADITH_QURAN.map((h, i) => (
        <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4">
          <p className="text-right text-sm text-gray-700 mb-2 leading-loose font-medium" style={{ fontFamily: "serif", direction: "rtl" }}>{h.arabic}</p>
          <div className="border-t border-emerald-100 pt-3">
            <p className="text-sm text-gray-800 leading-relaxed italic">"{h.text}"</p>
            <p className="text-xs text-emerald-600 font-semibold mt-2">— {h.source}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Voice Recitation Test ---
function VoiceTest({ surah, verses }) {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const totalLetters = verses.reduce((sum, v) => {
    const count = countArabicConsonants(v.ar || "");
    return sum + count;
  }, 0);
  const totalSevape = totalLetters * 10;

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Shfletuesi juaj nuk mbështet njohjen e zërit. Provoni Chrome.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "ar-SA";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript + " ";
      setTranscript(t.trim());
    };
    rec.onerror = () => setRecording(false);
    rec.onend = () => setRecording(false);
    recognitionRef.current = rec;
    rec.start();
    setRecording(true);
    setResult(null);
    setTranscript("");
  };

  const stopAndEvaluate = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setRecording(false);
    setLoading(true);

    // Compare transcript with full surah text
    setTimeout(() => {
      const fullText = verses.map(v => v.ar).join(" ");
      const score = calculateScore(transcript, fullText);
      setResult(score);
      setLoading(false);
    }, 800);
  };

  const calculateScore = (spoken, original) => {
    if (!spoken || spoken.length < 3) return 0;
    const origWords = original.replace(/[^\u0600-\u06FF ]/g, "").split(/\s+/).filter(Boolean);
    const spokenWords = spoken.replace(/[^\u0600-\u06FF ]/g, "").split(/\s+/).filter(Boolean);
    if (origWords.length === 0) return 0;
    let matched = 0;
    spokenWords.forEach(w => { if (origWords.some(o => o.includes(w.slice(0, 3)) || w.includes(o.slice(0, 3)))) matched++; });
    return Math.min(100, Math.round((matched / Math.max(origWords.length, 1)) * 130));
  };

  return (
    <div className="p-5 space-y-5">
      {/* Sevape calculator */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5">
        <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">🌟 Sevapet e Kësaj Sure</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
            <p className="text-2xl font-extrabold text-amber-600">{totalLetters}</p>
            <p className="text-xs text-gray-500">Germa arabe</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
            <p className="text-2xl font-extrabold text-emerald-600">{totalSevape.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Sevape minimum</p>
          </div>
        </div>
        <p className="text-xs text-amber-700 mt-3 leading-relaxed">
          🌿 Bazuar në hadith: <em>"Kush lexon një germa nga Kur'ani merr 1 sevap, dhe çdo sevap shumëzohet me 10"</em> — Tirmidhiu
        </p>
      </div>

      {/* Voice recorder */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-1">🎤 Testo Recitimin Tënd</h4>
        <p className="text-xs text-gray-500 mb-4">Incizo veten duke lexuar suren dhe do të llogarisim sa % ke realizuar</p>

        {!recording && !loading && result === null && (
          <button onClick={startRecording}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all">
            <Mic className="w-5 h-5" /> Fillo Incizimin
          </button>
        )}

        {recording && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-semibold text-sm animate-pulse">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" /> Duke incizuar...
            </div>
            {transcript && (
              <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600" style={{ direction: "rtl", fontFamily: "serif" }}>
                {transcript}
              </div>
            )}
            <button onClick={stopAndEvaluate}
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm flex items-center justify-center gap-2">
              <MicOff className="w-5 h-5" /> Ndalo dhe Vlerëso
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-6">
            <div className="inline-block w-8 h-8 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin mb-2" />
            <p className="text-sm text-gray-500">Duke analizuar recitimin...</p>
          </div>
        )}

        {result !== null && !loading && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-extrabold mb-1" style={{ color: result >= 80 ? "#16a34a" : result >= 50 ? "#d97706" : "#ef4444" }}>
                {result}%
              </div>
              <p className="text-sm text-gray-600">
                {result >= 80 ? "🏆 Shkëlqyeshëm! Recitimi yt është shumë i mirë!" :
                 result >= 50 ? "👍 Mirë! Vazhdo të praktikosh!" :
                 "📚 Rishiko ajetet dhe provo sërish!"}
              </p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4">
              <div className="h-4 rounded-full transition-all duration-1000"
                style={{ width: `${result}%`, background: result >= 80 ? "#16a34a" : result >= 50 ? "#d97706" : "#ef4444" }} />
            </div>
            {transcript && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Ajo çfarë u njoh:</p>
                <p className="text-sm text-gray-700" style={{ direction: "rtl", fontFamily: "serif" }}>{transcript}</p>
              </div>
            )}
            <button onClick={() => { setResult(null); setTranscript(""); }}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              🔄 Provo Sërish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Per-verse quiz generator
function generateVerseQuiz(verse, surah, verseNum) {
  const questions = [];
  if (verse.sq) {
    questions.push({
      q: `Cili është kuptimi i Ajetit ${verseNum} të Sures "${surah.name}"?`,
      options: shuffle([verse.sq.slice(0, 60) + "...", "Allahu është i vetëm", "Kërko mbrojtje nga e keqja", "Falënderim i takon Allahut"]),
      correct: verse.sq.slice(0, 60) + "..."
    });
  }
  questions.push({
    q: `Ajeti ${verseNum} i Sures "${surah.name}" i përket cilës sure?`,
    options: shuffle([surah.name, "Al-Fatiha", "Al-Ikhlas", "Al-Falaq"].filter((v,i,a) => a.indexOf(v) === i)),
    correct: surah.name
  });
  questions.push({
    q: `Sa ajete ka Sureja "${surah.name}"?`,
    options: shuffle([String(surah.verses), String(surah.verses + 5), String(Math.max(1,surah.verses - 3)), String(surah.verses + 12)]),
    correct: String(surah.verses)
  });
  return questions.slice(0, 2);
}

export default function SurahVerseViewer({ surah, onClose }) {
  const [phase, setPhase] = useState("hadiths"); // hadiths | verses | voicetest | quiz
  const [verseIdx, setVerseIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [verseQuizActive, setVerseQuizActive] = useState(false);
  const [verseQuizQuestions, setVerseQuizQuestions] = useState([]);
  const [verseQuizIdx, setVerseQuizIdx] = useState(0);
  const [verseQuizAnswered, setVerseQuizAnswered] = useState(null);
  const [verseQuizScore, setVerseQuizScore] = useState(0);
  const [verseQuizDone, setVerseQuizDone] = useState(false);
  const [quizQuestions] = useState(() => generateSurahQuiz(surah));
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [apiVerses, setApiVerses] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const audioRef = useRef(null);

  const localVerses = VERSE_DATA[surah.num] || [];
  const hasLocalData = localVerses.length > 0;

  // Fetch from API if no local data — with transliteration + Albanian
  useEffect(() => {
    if (hasLocalData) return;
    setApiLoading(true);

    // Fetch Arabic + transliteration in parallel
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surah.num}`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surah.num}/en.transliteration`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surah.num}/sq.ahmeti`).then(r => r.json()).catch(() => null),
    ])
      .then(([arData, translitData, sqData]) => {
        if (arData.code === 200 && arData.data?.ayahs) {
          const translitMap = {};
          if (translitData?.code === 200 && translitData.data?.ayahs) {
            translitData.data.ayahs.forEach(a => { translitMap[a.numberInSurah] = a.text; });
          }
          const sqMap = {};
          if (sqData?.code === 200 && sqData.data?.ayahs) {
            sqData.data.ayahs.forEach(a => { sqMap[a.numberInSurah] = a.text; });
          }
          setApiVerses(arData.data.ayahs.map(a => ({
            ar: a.text,
            translit: translitMap[a.numberInSurah] || null,
            sq: sqMap[a.numberInSurah] || null,
            tafsir: null,
          })));
        }
      })
      .catch(() => {})
      .finally(() => setApiLoading(false));
  }, [surah.num, hasLocalData]);

  const surahVerses = hasLocalData ? localVerses : apiVerses;
  const hasVerseData = surahVerses.length > 0;
  const currentVerse = verseIdx + 1;
  const revCtx = REVELATION_CONTEXT[surah.num] || getDefaultContext(surah);
  const isLastVerse = verseIdx === surah.verses - 1;

  const currentVerseData = surahVerses[verseIdx] || null;
  const letterCount = currentVerseData ? countArabicConsonants(currentVerseData.ar) : 0;
  const sevapeVerse = letterCount * 10;

  const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${padNum(surah.num, 3)}${padNum(currentVerse, 3)}.mp3`;

  const playAudio = () => {
    if (!audioRef.current) return;
    setAudioError(false);
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setAudioError(true));
  };
  const replayAudio = () => { if (!audioRef.current) return; audioRef.current.currentTime = 0; playAudio(); };
  const pauseAudio = () => { if (!audioRef.current) return; audioRef.current.pause(); setPlaying(false); };

  const goTo = (idx) => {
    if (audioRef.current) audioRef.current.pause();
    setPlaying(false); setAudioError(false); setVerseIdx(idx);
    setShowTranslit(false); setShowTranslation(false);
    setVerseQuizActive(false); setVerseQuizDone(false); setVerseQuizIdx(0); setVerseQuizAnswered(null);
  };

  const startVerseQuiz = () => {
    const qs = generateVerseQuiz(currentVerseData, surah, currentVerse);
    setVerseQuizQuestions(qs);
    setVerseQuizIdx(0); setVerseQuizAnswered(null); setVerseQuizScore(0); setVerseQuizDone(false);
    setVerseQuizActive(true);
  };

  const handleVerseQuizAnswer = (opt) => {
    if (verseQuizAnswered !== null) return;
    const isCorrect = opt === verseQuizQuestions[verseQuizIdx].correct;
    setVerseQuizAnswered({ selected: opt, correct: verseQuizQuestions[verseQuizIdx].correct, isCorrect });
    if (isCorrect) setVerseQuizScore(s => s + 1);
    setTimeout(() => {
      if (verseQuizIdx + 1 >= verseQuizQuestions.length) { setVerseQuizDone(true); return; }
      setVerseQuizIdx(i => i + 1); setVerseQuizAnswered(null);
    }, 1200);
  };

  const handleQuizAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === quizQuestions[quizIdx].correct;
    setAnswered({ selected: opt, correct: quizQuestions[quizIdx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= quizQuestions.length) { setQuizDone(true); return; }
      setQuizIdx(i => i + 1); setAnswered(null);
    }, 1200);
  };

  const pct = Math.round((score / quizQuestions.length) * 100);

  const phaseButtons = [
    { val: "hadiths", label: "📜 Hadithe" },
    { val: "verses", label: "📖 Ajetet" },
    { val: "voicetest", label: "🎤 Incizo" },
    { val: "quiz", label: "🎯 Kuiz" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-white rounded-t-3xl border-b border-gray-100 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="font-bold text-gray-900">{surah.name} — {surah.name_sq}</h2>
            <p className="text-xs text-gray-400">{surah.verses} ajete · {surah.type}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Phase tabs */}
        <div className="flex gap-1 px-4 py-2 bg-gray-50 border-b border-gray-100 flex-shrink-0">
          {phaseButtons.map(p => (
            <button key={p.val} onClick={() => setPhase(p.val)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${phase === p.val ? "bg-emerald-600 text-white shadow" : "text-gray-500 hover:text-gray-700"}`}>
              {p.label}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">

          {/* HADITHS */}
          {phase === "hadiths" && (
            <div>
              <HadithSection />
              <div className="px-5 pb-5">
                <button onClick={() => setPhase("verses")}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4" /> Fillo Leximin e Ajeteve
                </button>
              </div>
            </div>
          )}

          {/* VERSES */}
          {phase === "verses" && (
            <div className="p-5 space-y-4">
              {/* Revelation context — Transmetimi */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-amber-700 mb-1">📅 Transmetimi — {revCtx.period}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{revCtx.context}</p>
              </div>

              {/* Verse display */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5">
                <p className="text-xs text-emerald-600 font-semibold mb-3 text-center">Ajeti {currentVerse} / {surah.verses}</p>

                {apiLoading ? (
                  <div className="text-center py-6">
                    <div className="inline-block w-8 h-8 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin mb-2" />
                    <p className="text-sm text-gray-500">Duke ngarkuar ajetet...</p>
                  </div>
                ) : currentVerseData ? (
                  <>
                    {/* Arabic text */}
                    <p className="text-2xl text-gray-900 mb-3 leading-loose text-center" style={{ fontFamily: "Amiri, serif", direction: "rtl" }}>
                      {currentVerseData.ar} ﴿{currentVerse}﴾
                    </p>

                    {/* Transliterim */}
                    <div className="mb-2">
                      <button onClick={() => setShowTranslit(v => !v)}
                        className="text-xs text-teal-600 underline font-semibold mb-1 flex items-center gap-1">
                        {showTranslit ? "▲" : "▼"} Transliterim (Germat Latine)
                      </button>
                      {showTranslit && (
                        currentVerseData.translit
                          ? <p className="text-sm text-teal-700 italic bg-teal-50 rounded-xl p-3 border border-teal-100 text-center">{currentVerseData.translit}</p>
                          : <p className="text-xs text-gray-400 italic px-2">Transliterimi nuk është i disponueshëm për këtë ajet.</p>
                      )}
                    </div>

                    {/* Përkthim shqip */}
                    <div className="mb-3">
                      <button onClick={() => setShowTranslation(v => !v)}
                        className="text-xs text-blue-600 underline font-semibold mb-1 flex items-center gap-1">
                        {showTranslation ? "▲" : "▼"} Kuptimi në Shqip
                      </button>
                      {showTranslation && (
                        currentVerseData.sq
                          ? <p className="text-sm text-blue-800 bg-blue-50 rounded-xl p-3 border border-blue-100 leading-relaxed italic">"{currentVerseData.sq}"</p>
                          : <p className="text-xs text-gray-400 italic px-2">Përkthimi nuk është i disponueshëm për këtë ajet.</p>
                      )}
                    </div>

                    {/* Sevape for this verse */}
                    <div className="flex items-center justify-center gap-3 text-xs mb-3">
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">
                        {letterCount} germa · {sevapeVerse} sevape
                      </span>
                    </div>

                    {/* Tafsir — vetëm nëse ekziston */}
                    {currentVerseData.tafsir && (
                      <div className="bg-white rounded-xl p-4 border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-700 mb-1">📝 Tefsiri (Kuptimi & Shpjegimi)</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{currentVerseData.tafsir}</p>
                      </div>
                    )}

                    {/* Kuiz per kete ajet */}
                    {!verseQuizActive ? (
                      <button onClick={startVerseQuiz}
                        className="w-full mt-2 py-2 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-700 text-xs font-bold border border-violet-200 transition-all">
                        🎯 Testo veten — Kuiz për këtë Ajet
                      </button>
                    ) : (
                      <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 mt-2 space-y-3">
                        {!verseQuizDone ? (
                          <>
                            <p className="text-xs font-bold text-violet-700">🎯 Kuiz — Pyetja {verseQuizIdx + 1}/{verseQuizQuestions.length}</p>
                            <p className="text-sm font-semibold text-gray-800">{verseQuizQuestions[verseQuizIdx]?.q}</p>
                            <div className="space-y-2">
                              {verseQuizQuestions[verseQuizIdx]?.options.map(opt => {
                                let cls = "border border-gray-200 bg-white hover:border-violet-400 text-gray-700";
                                if (verseQuizAnswered) {
                                  if (opt === verseQuizAnswered.correct) cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800";
                                  else if (opt === verseQuizAnswered.selected && !verseQuizAnswered.isCorrect) cls = "border-2 border-red-400 bg-red-50 text-red-700";
                                  else cls = "border border-gray-100 bg-gray-50 text-gray-400";
                                }
                                return (
                                  <button key={opt} onClick={() => handleVerseQuizAnswer(opt)}
                                    className={`w-full p-2.5 rounded-xl text-left text-xs font-medium transition-all ${cls}`}>
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div className="text-center space-y-2">
                            <p className="text-2xl">{verseQuizScore === verseQuizQuestions.length ? "🏆" : "👍"}</p>
                            <p className="font-bold text-gray-800">{verseQuizScore}/{verseQuizQuestions.length} të sakta</p>
                            <button onClick={() => setVerseQuizActive(false)}
                              className="text-xs px-3 py-1.5 rounded-xl bg-violet-600 text-white font-semibold">Mbyll Kuizin</button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-3xl text-gray-400 mb-2">📖</p>
                    <p className="text-sm text-gray-500 italic">{surah.name} — Ajeti {currentVerse}</p>
                    <p className="text-xs text-gray-400 mt-2">Nuk u ngarkua teksti. Mund të dëgjoni audion e ajetit.</p>
                  </div>
                )}
              </div>

              {/* Audio */}
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
                <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} onError={() => { setAudioError(true); setPlaying(false); }} preload="none" />
                <div className="flex items-center gap-2">
                  <button onClick={playing ? pauseAudio : playAudio}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-all">
                    {playing ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Dëgjo</>}
                  </button>
                  <button onClick={replayAudio} className="w-9 h-9 rounded-xl bg-teal-100 hover:bg-teal-200 flex items-center justify-center">
                    <RotateCcw className="w-4 h-4 text-teal-700" />
                  </button>
                  {playing && <span className="text-xs text-teal-600 animate-pulse">🎵 Duke luajtur...</span>}
                  {audioError && <span className="text-xs text-red-500">⚠️ Audio nuk u ngarkua</span>}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Sheikh Mishary Al-Afasy</p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button onClick={() => goTo(verseIdx - 1)} disabled={verseIdx === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-4 h-4" /> Para
                </button>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${((verseIdx + 1) / surah.verses) * 100}%` }} />
                </div>
                {isLastVerse ? (
                  <button onClick={() => setPhase("voicetest")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-all">
                    🎤 Incizo
                  </button>
                ) : (
                  <button onClick={() => goTo(verseIdx + 1)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all">
                    Tjetër <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-center text-xs text-gray-400">
                {verseIdx + 1} nga {surah.verses} ajete — {Math.round(((verseIdx + 1) / surah.verses) * 100)}% e sures
              </p>
            </div>
          )}

          {/* VOICE TEST */}
          {phase === "voicetest" && <VoiceTest surah={surah} verses={surahVerses} />}

          {/* QUIZ */}
          {phase === "quiz" && (
            <div className="p-5">
              {!quizDone ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">🎯 Kuizi — {surah.name}</h3>
                    <span className="text-xs text-gray-400">Pyetja {quizIdx + 1}/{quizQuestions.length}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${(quizIdx / quizQuestions.length) * 100}%` }} />
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4">
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
                  <div className={`text-4xl font-extrabold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>{pct}%</div>
                  <p className="text-gray-600">{score} nga {quizQuestions.length} të sakta</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setQuizIdx(0); setAnswered(null); setScore(0); setQuizDone(false); }}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600">Provo Sërish</button>
                    <button onClick={() => { setPhase("verses"); setVerseIdx(0); }}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">Kthehu te Ajetet</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}