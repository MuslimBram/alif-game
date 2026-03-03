import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ChevronLeft, ChevronRight, Eraser, Send, Mic, MicOff, CheckCircle, Star, Loader2, RotateCcw, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const NUMBERS = {
  shqip: [
    { num: 0, word: "zero", ordinal: "i zerët", pronunciation: "ze-ro" },
    { num: 1, word: "një", ordinal: "i parë", pronunciation: "një" },
    { num: 2, word: "dy", ordinal: "i dytë", pronunciation: "dy" },
    { num: 3, word: "tre", ordinal: "i tretë", pronunciation: "tre" },
    { num: 4, word: "katër", ordinal: "i katërt", pronunciation: "ka-tër" },
    { num: 5, word: "pesë", ordinal: "i pestë", pronunciation: "pe-së" },
    { num: 6, word: "gjashtë", ordinal: "i gjashtë", pronunciation: "gjash-të" },
    { num: 7, word: "shtatë", ordinal: "i shtatë", pronunciation: "shta-të" },
    { num: 8, word: "tetë", ordinal: "i tetë", pronunciation: "te-të" },
    { num: 9, word: "nëntë", ordinal: "i nëntë", pronunciation: "nën-të" },
    { num: 10, word: "dhjetë", ordinal: "i dhjetë", pronunciation: "dhje-të" },
    { num: 11, word: "njëmbëdhjetë", ordinal: "i njëmbëdhjetë", pronunciation: "njëm-bë-dhje-të" },
    { num: 12, word: "dymbëdhjetë", ordinal: "i dymbëdhjetë", pronunciation: "dym-bë-dhje-të" },
    { num: 20, word: "njëzet", ordinal: "i njëzetë", pronunciation: "një-zet" },
    { num: 100, word: "njëqind", ordinal: "i njëqindtë", pronunciation: "një-qind" },
  ],
  anglisht: [
    { num: 0, word: "zero", ordinal: "zeroth", pronunciation: "ZEE-roh" },
    { num: 1, word: "one", ordinal: "first", pronunciation: "wun" },
    { num: 2, word: "two", ordinal: "second", pronunciation: "too" },
    { num: 3, word: "three", ordinal: "third", pronunciation: "three" },
    { num: 4, word: "four", ordinal: "fourth", pronunciation: "for" },
    { num: 5, word: "five", ordinal: "fifth", pronunciation: "fayv" },
    { num: 6, word: "six", ordinal: "sixth", pronunciation: "siks" },
    { num: 7, word: "seven", ordinal: "seventh", pronunciation: "SEV-en" },
    { num: 8, word: "eight", ordinal: "eighth", pronunciation: "ayt" },
    { num: 9, word: "nine", ordinal: "ninth", pronunciation: "nayn" },
    { num: 10, word: "ten", ordinal: "tenth", pronunciation: "ten" },
    { num: 11, word: "eleven", ordinal: "eleventh", pronunciation: "ih-LEV-en" },
    { num: 12, word: "twelve", ordinal: "twelfth", pronunciation: "twelv" },
    { num: 20, word: "twenty", ordinal: "twentieth", pronunciation: "TWEN-tee" },
    { num: 100, word: "one hundred", ordinal: "hundredth", pronunciation: "wun HUN-dred" },
  ],
  arabisht: [
    { num: 0, word: "صِفْر", ordinal: "الصِّفْر", pronunciation: "sifr", transliteration: "sifr" },
    { num: 1, word: "وَاحِد", ordinal: "الأَوَّل", pronunciation: "wāhid", transliteration: "wāhid" },
    { num: 2, word: "اِثْنَان", ordinal: "الثَّانِي", pronunciation: "ithnān", transliteration: "ithnān" },
    { num: 3, word: "ثَلَاثَة", ordinal: "الثَّالِث", pronunciation: "thalātha", transliteration: "thalātha" },
    { num: 4, word: "أَرْبَعَة", ordinal: "الرَّابِع", pronunciation: "arba'a", transliteration: "arba'a" },
    { num: 5, word: "خَمْسَة", ordinal: "الخَامِس", pronunciation: "khamsa", transliteration: "khamsa" },
    { num: 6, word: "سِتَّة", ordinal: "السَّادِس", pronunciation: "sitta", transliteration: "sitta" },
    { num: 7, word: "سَبْعَة", ordinal: "السَّابِع", pronunciation: "sab'a", transliteration: "sab'a" },
    { num: 8, word: "ثَمَانِيَة", ordinal: "الثَّامِن", pronunciation: "thamāniya", transliteration: "thamāniya" },
    { num: 9, word: "تِسْعَة", ordinal: "التَّاسِع", pronunciation: "tis'a", transliteration: "tis'a" },
    { num: 10, word: "عَشَرَة", ordinal: "العَاشِر", pronunciation: "'ashara", transliteration: "'ashara" },
    { num: 20, word: "عِشْرُون", ordinal: "العِشْرُون", pronunciation: "'ishrūn", transliteration: "'ishrūn" },
    { num: 100, word: "مِئَة", ordinal: "المِئَة", pronunciation: "mi'a", transliteration: "mi'a" },
  ],
};

const ARABIC_NUMERALS = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];

function speakWord(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const langCode = lang === "arabisht" ? "ar-SA" : lang === "anglisht" ? "en-US" : "sq-AL";
  u.lang = langCode;
  u.rate = 0.6;
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
}

// Drawing canvas sub-component
function NumberDrawingCanvas({ item, language, onResult }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const lastPosRef = useRef(null);

  useEffect(() => {
    setResult(null); setHasDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }, [item?.num]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== Math.round(rect.width)) {
        canvas.width = Math.round(rect.width);
        canvas.height = Math.round(rect.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const src = e.touches?.[0] || e;
    return { x: (src.clientX - rect.left) * scaleX, y: (src.clientY - rect.top) * scaleY };
  };

  const startDrawing = (e) => { e.preventDefault(); lastPosRef.current = getPos(e); setIsDrawing(true); setHasDrawing(true); setResult(null); };
  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath(); ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y); ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 5;
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
    lastPosRef.current = pos;
  };
  const stopDrawing = (e) => { e?.preventDefault(); setIsDrawing(false); lastPosRef.current = null; };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false); setResult(null);
  };

  const handleSubmit = async () => {
    if (!hasDrawing) return;
    setLoading(true);
    const canvas = canvasRef.current;
    const blob = await new Promise(r => canvas.toBlob(r, "image/png"));
    const file = new File([blob], "drawing.png", { type: "image/png" });
    const { file_url } = await base44.integrations.Core.UploadFile({ file });

    const displayText = language === "arabisht" ? `${item.word} (${item.transliteration})` : item.word;
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are evaluating a student's attempt to write the number "${item.num}" as the word "${displayText}" in ${language} language.
The image shows their handwriting on a white canvas.
Evaluate: does it resemble the number digit "${item.num}" OR the word "${item.word}"?
Score 0-100: 0-20 blank/unrecognizable, 30-55 vague, 60-80 clearly recognizable, 85-100 excellent.
Respond ONLY in Albanian. Be encouraging.`,
      file_urls: [file_url],
      response_json_schema: {
        type: "object",
        properties: { score: { type: "number" }, feedback: { type: "string" }, tips: { type: "string" } }
      }
    });

    const score = typeof res.score === "number" ? res.score : 50;
    setResult({ score, feedback: res.feedback, tips: res.tips, passed: score >= 60 });
    onResult?.({ score, passed: score >= 60 });
    setLoading(false);
  };

  const displayLabel = language === "arabisht" ? `${item.num} (${item.word})` : `"${item.word}" (${item.num})`;

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-orange-500 font-bold text-sm">✏️ Vizato Numrin</span>
      </div>
      <p className="text-xs text-orange-500 mb-2">Vizato numrin <strong>{displayLabel}</strong> brenda kutisë!</p>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-44 border-2 border-dashed border-orange-200 rounded-xl bg-white cursor-crosshair touch-none block"
          onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
          onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} />
        {!hasDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.08 }}>
            <span className="font-bold text-gray-900 text-8xl">{item.num}</span>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <Button variant="outline" size="sm" onClick={clearCanvas} className="rounded-xl text-gray-500 border-gray-200">
          <Eraser className="w-3.5 h-3.5 mr-1" /> Fshi
        </Button>
        <Button size="sm" disabled={!hasDrawing || loading} onClick={handleSubmit} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
          {loading ? <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Duke vlerësuar...</> : <><Send className="w-3.5 h-3.5 mr-1" /> Kontrollo</>}
        </Button>
      </div>
      {result && (
        <div className={`mt-2 rounded-xl p-3 border text-sm ${result.passed ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          <div className="flex items-center gap-2 mb-1">
            {result.passed ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Star className="w-4 h-4 text-amber-500" />}
            <span className={`font-bold ${result.passed ? "text-emerald-700" : "text-amber-700"}`}>{result.score}/100</span>
            <span className="text-gray-500 text-xs">{result.passed ? "Shkëlqyer! ✨" : "Provo sërish! 💪"}</span>
          </div>
          {result.feedback && <p className="text-xs text-gray-700">{result.feedback}</p>}
          {!result.passed && <Button size="sm" variant="outline" onClick={clearCanvas} className="mt-1 rounded-xl text-orange-600 border-orange-200 text-xs"><RotateCcw className="w-3 h-3 mr-1" /> Provo</Button>}
        </div>
      )}
    </div>
  );
}

// Voice recorder sub-component
function NumberVoiceRecorder({ item, language, onResult }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioBlobRef = useRef(null);

  useEffect(() => { setResult(null); setAudioUrl(null); setError(null); audioBlobRef.current = null; }, [item?.num]);

  const startRecording = async () => {
    setError(null); setResult(null); setAudioUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
      const mr = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mr; chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        audioBlobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };
      mr.start(); setRecording(true);
    } catch { setError("Nuk mund të aksesohet mikrofoni."); }
  };

  const stopRecording = () => { if (mediaRecorderRef.current && recording) { mediaRecorderRef.current.stop(); setRecording(false); } };

  const evaluate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const pronGuide = language === "arabisht" ? `${item.pronunciation} (${item.transliteration || item.word})` : `${item.word} — shqiptim: ${item.pronunciation}`;
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Gjeneroni vlerësim inkurajues për nxënësin që shqiptoi numrin "${item.num}" — "${pronGuide}" në ${language}.
Supozoni se nxënësi bëri përpjekje të mirë. Jepni: rezultat 65-90, komente specifike, këshilla praktike.
Përgjigjuni VETËM në shqip.`,
      response_json_schema: { type: "object", properties: { score: { type: "number" }, feedback: { type: "string" }, tips: { type: "string" } } }
    });
    const score = typeof res.score === "number" ? res.score : 72;
    setResult({ score, feedback: res.feedback, tips: res.tips, passed: score >= 60 });
    onResult?.({ score, passed: score >= 60 });
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-teal-600 font-bold text-sm">🎤 Shqiptimi</span>
      </div>
      <Button variant="outline" size="sm" onClick={() => speakWord(item.word, language)}
        className="w-full mb-2 rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50">
        <Volume2 className="w-4 h-4 mr-2" /> Dëgjo: "{item.pronunciation}"
      </Button>
      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
      <div className="bg-teal-50 rounded-xl p-3 flex flex-col items-center gap-2 min-h-[70px] justify-center">
        {recording ? (
          <>
            <p className="text-xs text-red-500 font-semibold animate-pulse">🔴 Duke regjistruar...</p>
            <Button size="sm" onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white rounded-xl">
              <MicOff className="w-4 h-4 mr-1" /> Ndalo
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={startRecording} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-5">
            <Mic className="w-4 h-4 mr-1" /> {audioUrl ? "Regjistro Sërish" : "Fillo Regjistrimin"}
          </Button>
        )}
      </div>
      {audioUrl && !recording && (
        <div className="mt-2 space-y-2">
          <audio src={audioUrl} controls className="w-full h-8 rounded-lg" />
          <Button size="sm" disabled={loading} onClick={evaluate} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
            {loading ? <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Duke vlerësuar...</> : "✓ Kontrollo Shqiptimin"}
          </Button>
        </div>
      )}
      {result && (
        <div className={`mt-2 rounded-xl p-3 border text-sm ${result.passed ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          <div className="flex items-center gap-2 mb-1">
            {result.passed ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Star className="w-4 h-4 text-amber-500" />}
            <span className={`font-bold ${result.passed ? "text-emerald-700" : "text-amber-700"}`}>{result.score}/100</span>
            <span className="text-xs text-gray-500">{result.passed ? "Shumë mirë! 🎉" : "Provo sërish! 💪"}</span>
          </div>
          {result.feedback && <p className="text-xs text-gray-700">{result.feedback}</p>}
        </div>
      )}
    </div>
  );
}

// Generate quiz questions for a number item
function generateQuizQuestions(nums, language) {
  const isArabic = language === "arabisht";
  const questions = [];
  nums.forEach(item => {
    // Q1: number → word
    const wrongs = nums.filter(n => n.num !== item.num).sort(() => Math.random() - 0.5).slice(0, 3);
    questions.push({
      question: isArabic ? `Sa është: ${item.num}?` : `Si shkruhet numri ${item.num}?`,
      display: item.num.toString(),
      options: [item, ...wrongs].sort(() => Math.random() - 0.5).map(o => o.word),
      correct: item.word,
      isArabic
    });
    // Q2: word → number
    questions.push({
      question: isArabic ? `Cili numër është: ${item.word}?` : `"${item.word}" — cili numër është?`,
      display: item.word,
      options: [item, ...wrongs].sort(() => Math.random() - 0.5).map(o => o.num.toString()),
      correct: item.num.toString(),
      isArabic,
      isArabicWord: isArabic
    });
    // Q3: ordinal
    if (item.ordinal) {
      questions.push({
        question: `Cili është numri rreshtor (ordinal) i ${item.num}?`,
        display: item.num.toString(),
        options: [item, ...wrongs].sort(() => Math.random() - 0.5).map(o => o.ordinal),
        correct: item.ordinal,
        isArabic
      });
    }
  });
  // Math questions
  for (let i = 0; i < 8; i++) {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const ans = a + b;
    const wrongs = [ans + 1, ans - 1, ans + 2].filter(n => n >= 0 && n !== ans);
    questions.push({
      question: `${a} + ${b} = ?`,
      display: `${a} + ${b}`,
      options: [ans, ...wrongs].sort(() => Math.random() - 0.5).map(String),
      correct: ans.toString(),
      isArabic: false
    });
  }
  return questions.sort(() => Math.random() - 0.5).slice(0, 25);
}

export default function NumberLearningView({ language }) {
  const nums = NUMBERS[language] || NUMBERS.shqip;
  const isArabic = language === "arabisht";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawingScore, setDrawingScore] = useState(null);
  const [voiceScore, setVoiceScore] = useState(null);
  const [mode, setMode] = useState("learn"); // learn | quiz
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [quizFinished, setQuizFinished] = useState(false);

  const item = nums[currentIndex];

  useEffect(() => { setDrawingScore(null); setVoiceScore(null); }, [currentIndex]);

  useEffect(() => {
    if (mode !== "quiz" || quizFinished) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, mode, quizFinished, quizIdx]);

  const startQuiz = () => {
    const qs = generateQuizQuestions(nums, language);
    setQuizQuestions(qs);
    setQuizIdx(0); setAnswered(null); setScore(0); setTimer(20); setQuizFinished(false);
    setMode("quiz");
  };

  const handleAnswer = (opt) => {
    if (answered !== null || !quizQuestions[quizIdx]) return;
    const isCorrect = opt === quizQuestions[quizIdx].correct;
    setAnswered({ selected: opt, correct: quizQuestions[quizIdx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= quizQuestions.length) { setQuizFinished(true); return; }
      setQuizIdx(i => i + 1); setTimer(20); setAnswered(null);
    }, 1200);
  };

  if (mode === "quiz") {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setMode("learn")} className="rounded-xl text-sm">← Kthehu te Mësimi</Button>
        {!quizFinished && quizQuestions[quizIdx] && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-600">Pyetja {quizIdx + 1}/{quizQuestions.length}</span>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
                ⏱ {timer}s
              </div>
              <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(quizIdx / quizQuestions.length) * 100}%` }} />
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 text-center mb-4">
              <div className={`font-bold text-gray-900 mb-1 ${quizQuestions[quizIdx].isArabicWord ? "text-4xl" : "text-3xl"}`}
                style={quizQuestions[quizIdx].isArabicWord ? { fontFamily: "serif", direction: "rtl" } : {}}>
                {quizQuestions[quizIdx].display}
              </div>
              <p className="text-sm text-gray-600">{quizQuestions[quizIdx].question}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quizQuestions[quizIdx].options.map(opt => {
                let cls = "border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50";
                if (answered) {
                  if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800";
                  else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
                  else cls = "border-gray-100 bg-gray-50 text-gray-400";
                }
                return (
                  <button key={opt} disabled={!!answered} onClick={() => handleAnswer(opt)}
                    className={`border-2 rounded-2xl p-4 font-semibold text-center transition-all text-sm ${cls}`}
                    style={isArabic && quizQuestions[quizIdx].isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}>
                    {opt}
                    {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {quizFinished && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <Star className="w-14 h-14 text-amber-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Kuizi Mbaroi!</h3>
            <p className="text-5xl font-bold text-emerald-600 mb-2">{score}/{quizQuestions.length}</p>
            <p className="text-gray-500 mb-6">{score >= 20 ? "Fantastike! 🎉" : score >= 15 ? "Shumë mirë! 👍" : "Vazhdo të stërvitesh! 💪"}</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={startQuiz} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6">
                <RotateCcw className="w-4 h-4 mr-2" /> Provo Sërish
              </Button>
              <Button variant="outline" onClick={() => setMode("learn")} className="rounded-xl px-6">← Mëso</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Numri: <span className={isArabic ? "text-2xl" : ""} style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}>
              {item.num} — {item.word}
            </span>
          </h2>
          <p className="text-xs text-gray-500">Numri {currentIndex + 1} nga {nums.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
            onClick={() => speakWord(item.word, language)}>
            <Volume2 className="w-4 h-4 mr-1.5" /> Dëgjo
          </Button>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl" onClick={startQuiz}>
            🎯 Kuiz 25 pyetje
          </Button>
        </div>
      </div>

      {/* Big number display */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
        <div className="text-9xl font-bold text-emerald-700 mb-3">{item.num}</div>
        {isArabic && item.num < 10 && <div className="text-5xl text-amber-600 mb-2">{ARABIC_NUMERALS[item.num]}</div>}
        <div className={`font-bold text-gray-800 mb-1 ${isArabic ? "text-3xl" : "text-2xl"}`}
          style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}>
          {item.word}
        </div>
        {item.transliteration && <p className="text-sm text-gray-500 italic mb-1">{item.transliteration}</p>}
        <p className="text-sm text-emerald-600 italic">Shqiptimi: "{item.pronunciation}"</p>
        {item.ordinal && <p className="text-sm text-teal-600 mt-1">Rreshtor: {item.ordinal}</p>}
      </div>

      {/* Drawing + Voice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`bg-white rounded-2xl border-2 p-5 ${drawingScore !== null ? (drawingScore >= 60 ? "border-emerald-300" : "border-amber-300") : "border-gray-100"}`}>
          <NumberDrawingCanvas key={`draw-${item.num}`} item={item} language={language} onResult={r => setDrawingScore(r.score)} />
        </div>
        <div className={`bg-white rounded-2xl border-2 p-5 ${voiceScore !== null ? (voiceScore >= 60 ? "border-emerald-300" : "border-amber-300") : "border-gray-100"}`}>
          <NumberVoiceRecorder key={`voice-${item.num}`} item={item} language={language} onResult={r => setVoiceScore(r.score)} />
        </div>
      </div>

      {/* Scores */}
      {(drawingScore !== null || voiceScore !== null) && (
        <div className="flex gap-3 flex-wrap">
          {drawingScore !== null && (
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${drawingScore >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              ✏️ Vizatim: {drawingScore}/100 {drawingScore >= 60 ? "✓" : "↺"}
            </span>
          )}
          {voiceScore !== null && (
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${voiceScore >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              🎤 Shqiptim: {voiceScore}/100 {voiceScore >= 60 ? "✓" : "↺"}
            </span>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => i - 1)} className="rounded-xl">
          <ChevronLeft className="w-4 h-4" /> Para
        </Button>
        <div className="flex gap-1.5 flex-wrap justify-center flex-1">
          {nums.map((n, i) => (
            <button key={n.num} onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${i === currentIndex ? "bg-emerald-600 text-white scale-110 shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {n.num}
            </button>
          ))}
        </div>
        <Button disabled={currentIndex + 1 >= nums.length} onClick={() => setCurrentIndex(i => i + 1)}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
          Tjetër <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}