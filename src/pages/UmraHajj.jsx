import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, ChevronUp, Volume2, CheckCircle, Timer, XCircle, Star, Heart, Trophy, RotateCcw, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

const UMRA_STEPS = [
  {
    num: 1, title: "Ihrami", arabic: "الإحرام",
    description: "Veshja e rrobave të bardha të ihramit dhe shqiptimi i nijetit. Kërkon larje dhe pastrim të plotë.",
    details: ["Bëj gusël (larje e plotë e trupit)", "Vesh rrobet e bardha të ihramit (2 copë pambuk)", "Shqipto nijetin: 'Lebbeyk Allahumme lebbeyk Umreten'", "Talbija: لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ", "Shmang: qethjen, parfumin, marrëdhëniet, grindjat"],
    dua: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
    dua_transliteration: "Lebbeyk Allahumme lebbeyk, lebbeyk la sherike leke lebbeyk, innel-hamde ven-ni'mete leke vel-mulk, la sherike lek",
    color: "bg-emerald-50 border-emerald-200", icon: "🤍",
  },
  {
    num: 2, title: "Tavafi", arabic: "الطواف",
    description: "Rrotullimi 7 herë rreth Qabesë, duke filluar nga Guri i Zi (Haxheri Esvedi).",
    details: ["Fillo nga Haxheri Esvedi (këndi i zi)", "Rrotullohu 7 herë kundër akrepave", "Qa'aba të jetë gjithmonë në të majtë", "Preku ose puthni Haxherin Esvedi nëse mundesh", "Çdo rrotullim fillon dhe mbaron te Guri i Zi"],
    dua: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    dua_transliteration: "Rabbena atine fid-dunja hasene ve fil-ahireti hasene ve kina adhaben-nar",
    color: "bg-blue-50 border-blue-200", icon: "🕋",
  },
  {
    num: 3, title: "Namazi pas Tavafin", arabic: "صلاة الطواف",
    description: "Kryerja e dy rekatëve namazit pranë Makam Ibrahimit pas çdo tavafi.",
    details: ["Shko te Makam Ibrahimi", "Fal 2 rekat namaz", "Lexo Surel Kafirun dhe Surel Ihlas", "Ky namaz është Sunnet"],
    dua: "وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى",
    dua_transliteration: "Vettehidhu min makame Ibrahime musallan",
    color: "bg-purple-50 border-purple-200", icon: "🤲",
  },
  {
    num: 4, title: "Safa dhe Merva (Sa'j)", arabic: "السعي بين الصفا والمروة",
    description: "Ecja 7 herë ndërmjet kodrës Safa dhe kodrës Merva, duke ndjekur rrugën e Hajares.",
    details: ["Fillo nga Safa — klim kodrën", "Shko te Merva (rreth 450 m)", "Kthehu nga Merva te Safa (= 2 herë)", "Gjithsej 7 ecje (4 drejt Mervës, 3 drejt Safas)", "Meshkujt vrapojnë lehtë midis sinjalizuesve jeshilë"],
    dua: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
    dua_transliteration: "Innes-Safa vel-Meruveta min sha'airillah",
    color: "bg-amber-50 border-amber-200", icon: "🏔️",
  },
  {
    num: 5, title: "Qethja ose Shkurtimi i Flokëve", arabic: "الحلق أو التقصير",
    description: "Meshkujt qethin kokën ose shkurtojnë flokët, gratë prerë deri 2.5 cm.",
    details: ["Meshkujt: preferohet qethja e plotë (Halq)", "Alternativë: shkurtim i njëtrajtshëm (Taksir)", "Gratë: priti vetëm gishtin e fundit (rreth 2-3 cm)", "Pas kësaj, ihrami përfundon", "Mund të veshë rrobat normale sërish"],
    dua: "اللَّهُمَّ اغْفِرْ لِلْمُحَلِّقِينَ",
    dua_transliteration: "Allahumme-ghfir lil-muhallikin",
    color: "bg-rose-50 border-rose-200", icon: "✂️",
  },
];

const HAJJ_STEPS = [
  {
    num: 1, title: "Ihrami për Haxhin", arabic: "إحرام الحج",
    description: "Hyrja në gjendje ihram nga Mikati ose nga Meka nëse jeni tashmë atje.",
    details: ["Bëj gusël dhe vesh ihramin", "Nijeti për Haxh: 'Lebbeyk Allahumme Hajjan'", "Talbija vazhdon deri te hedhja e gurëve në Akabe"],
    dua: "لَبَّيْكَ اللَّهُمَّ حَجًّا",
    dua_transliteration: "Lebbeyk Allahumme Haxhen",
    color: "bg-emerald-50 border-emerald-200", icon: "🤍",
  },
  {
    num: 2, title: "8 Dhul-Hixhe — Dita e Tervijas", arabic: "يوم التروية",
    description: "Niset drejt Minas, ku kalon natën.",
    details: ["Shko në Mina pas agimit", "Fal 5 namaze në Mina (shkurtuar pa bashkim)", "Qëndro në Mina gjatë gjithë ditës", "Kaloj natën në Mina"],
    dua: "", dua_transliteration: "",
    color: "bg-blue-50 border-blue-200", icon: "🏕️",
  },
  {
    num: 3, title: "9 Dhul-Hixhe — Dita e Arafatit", arabic: "يوم عرفة",
    description: "Qëndrimi në Arafat — SHTYLLA KRYESORE E HAXHIT.",
    details: ["Shko në Arafat pas agimit", "Kjo është shtylla kryesore e Haxhit", "Fal Drekën dhe Ikindinë bashkë", "Lutu, dërgoji salavate Profetit ﷺ", "Qëndro deri pas perëndimit", "Niset drejt Muzdelifes pas perëndimit"],
    dua: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    dua_transliteration: "La ilahe illallahu vahdehu la sherike leh, lehul-mulku ve lehul-hamdu ve huve ala kulli shej'in kadir",
    color: "bg-amber-50 border-amber-200", icon: "🌅",
  },
  {
    num: 4, title: "Muzdelifa — Grumbullimi i Gurëve", arabic: "مزدلفة",
    description: "Kaloj natën në Muzdelifa dhe mblidh 49 ose 70 gurë.",
    details: ["Mblidh 49 gurë (ose 70 nëse hedhja bëhet me 10 gurë/ditë)", "Fal Akshamin dhe Jacinë bashkë", "Fal Sabahun herët", "Niset para lindjes së diellit"],
    dua: "", dua_transliteration: "",
    color: "bg-indigo-50 border-indigo-200", icon: "🌙",
  },
  {
    num: 5, title: "10 Dhul-Hixhe — Dita e Kurbanit", arabic: "يوم النحر",
    description: "Kryhen 4 veprime: hedhja e gurëve, therja e kurbanit, qethja, tavafi.",
    details: ["1. Hidh 7 gurë te Xhemretul-Akabe", "2. Ther kurbanin (nëse keni)", "3. Qethu ose shkurto flokët", "4. Tavafi i Ifadës (i detyrueshëm)", "5. Saj-i nëse nuk e ke bërë me Tavafin e Kudum", "Ihrami përfundon pas qethjes"],
    dua: "اللَّهُ أَكْبَرُ",
    dua_transliteration: "Allahu Akbar (duke hedhur çdo gur)",
    color: "bg-rose-50 border-rose-200", icon: "🕋",
  },
  {
    num: 6, title: "11-13 Dhul-Hixhe — Ditët e Teshrîkut", arabic: "أيام التشريق",
    description: "Qëndrim në Mina dhe hedhja e gurëve te të tre Xhemratat çdo ditë.",
    details: ["Hidh 7+7+7 gurë te 3 Xhemratat (Sugra, Vusta, Akabe)", "Fillo nga Xhemretul-Sugra (e vogla)", "Shpallet Tekbiri pas çdo hedhje", "Mund të dalësh 12 ose 13 Dhul-Hixhe", "Nëse ikën 12, duhet të largohesh para perëndimit"],
    dua: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
    dua_transliteration: "Allahu Akbar, Allahu Akbar, La ilahe illallahu vallahu Akbar, Allahu Akbar ve lillahil-hamd",
    color: "bg-teal-50 border-teal-200", icon: "🪨",
  },
  {
    num: 7, title: "Tavafi i Lamtumirës (Veda)", arabic: "طواف الوداع",
    description: "Para nisjes nga Meka, kryhet tavafi i fundit i lamtumirës.",
    details: ["Kryhet para nisjes nga Meka", "7 rrotullime rreth Qabesë", "Detyrueshëm për ata që vijnë nga jashtë", "Gratë në menstruacion janë të liruara"],
    dua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ",
    dua_transliteration: "Allahumme inni as'eluke ridake vel-xhennete",
    color: "bg-purple-50 border-purple-200", icon: "👋",
  },
];

const QUIZ_QUESTIONS = [
  { q: "Cila është shtylla kryesore e Haxhit?", options: ["Tavafi", "Qëndrimi në Arafat", "Sa'ji", "Ihrami"], correct: "Qëndrimi në Arafat" },
  { q: "Sa herë rrotullohet Qabeja gjatë Tavafit?", options: ["5", "6", "7", "8"], correct: "7" },
  { q: "Nga fillon Tavafi?", options: ["Makam Ibrahimi", "Kapja e Zymsymit", "Haxheri Esvedi", "Safa"], correct: "Haxheri Esvedi" },
  { q: "Sa ecje ka Sa'ji ndërmjet Safas dhe Mervës?", options: ["5", "6", "7", "8"], correct: "7" },
  { q: "Në cilin vend kalohet nata para Arafatit?", options: ["Muzdelifa", "Mina", "Meka", "Medine"], correct: "Mina" },
  { q: "Kur mblidhen gurët për hedhje gjatë Haxhit?", options: ["Muzdelifa", "Mina", "Arafat", "Safa"], correct: "Muzdelifa" },
  { q: "Sa gurë hidhen te Xhemretul-Akabe në 10 Dhul-Hixhe?", options: ["3", "5", "7", "10"], correct: "7" },
  { q: "Çfarë bëhet pas qethjes gjatë Umrës?", options: ["Fillon Sa'ji", "Ihrami mbaron", "Fillon Tavafi", "Shkon në Mina"], correct: "Ihrami mbaron" },
  { q: "Cila sure lexohet te Makam Ibrahimi?", options: ["Fatiha + Bakara", "Kafirun + Ihlas", "Jasin + Mulk", "Nas + Felak"], correct: "Kafirun + Ihlas" },
  { q: "Cila ditë quhet 'Dita e Arafatit'?", options: ["7 Dhul-Hixhe", "8 Dhul-Hixhe", "9 Dhul-Hixhe", "10 Dhul-Hixhe"], correct: "9 Dhul-Hixhe" },
  { q: "Sa hapa (rituale) ka Umra?", options: ["3", "4", "5", "6"], correct: "5" },
  { q: "Sa hapa kryesore ka Haxhi?", options: ["5", "6", "7", "8"], correct: "7" },
  { q: "Çfarë është Talbija?", options: ["Lutja e Tavafit", "Formula e Ihramit", "Namazi i veçantë", "Gurët e Minës"], correct: "Formula e Ihramit" },
  { q: "Ku falet namazi pas Tavafit?", options: ["Safa", "Makam Ibrahimi", "Haxheri Esvedi", "Muzdelifa"], correct: "Makam Ibrahimi" },
  { q: "Kur përfundon Ihrami gjatë Haxhit?", options: ["Pas Tavafit", "Pas Sa'jit", "Pas qethjes", "Pas Arafatit"], correct: "Pas qethjes" },
  { q: "Sa gurë hidhen çdo ditë te secila Xhemrat gjatë Teshrîkut?", options: ["3", "5", "7", "10"], correct: "7" },
  { q: "Cila është dita e parë e Haxhit zyrtarisht?", options: ["7 Dhul-Hixhe", "8 Dhul-Hixhe", "9 Dhul-Hixhe", "10 Dhul-Hixhe"], correct: "8 Dhul-Hixhe" },
  { q: "Nga fillon Sa'ji?", options: ["Merva", "Safa", "Haxheri Esvedi", "Makam Ibrahimi"], correct: "Safa" },
  { q: "Si quhet Tavafi i fundit para largimit nga Meka?", options: ["Tavafi i Kudum", "Tavafi i Ifadës", "Tavafi i Vedas", "Tavafi i Rritjes"], correct: "Tavafi i Vedas" },
  { q: "Çfarë quhet Tavafi i parë pas mbërritjes në Meka?", options: ["Tavaf i Ifadës", "Tavaf i Kudum", "Tavaf i Vedas", "Tavaf i Nijetit"], correct: "Tavaf i Kudum" },
];

const PROGRESS_KEY = "umrahajj_progress";

function loadUHProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"); } catch { return {}; }
}

const speak = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find(v => v.lang.startsWith("ar"));
  if (arVoice) u.voice = arVoice;
  u.lang = "ar-SA";
  u.rate = 0.6;
  window.speechSynthesis.speak(u);
};

export default function UmraHajj() {
  const [tab, setTab] = useState("umra");
  const [expanded, setExpanded] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(loadUHProgress);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("umrahajj_favorites") || "[]"); } catch { return []; }
  });

  // Quiz
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (!quizStarted || quizFinished || tab !== "quiz") return;
    if (timer <= 0) { handleQuizAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, quizStarted, quizFinished, tab, quizIdx]);

  const startQuiz = () => {
    setQuizIdx(0); setAnswered(null); setScore(0); setTimer(20);
    setQuizFinished(false); setQuizStarted(true);
  };

  const handleQuizAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === QUIZ_QUESTIONS[quizIdx].correct;
    setAnswered({ selected: opt, correct: QUIZ_QUESTIONS[quizIdx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= QUIZ_QUESTIONS.length) { setQuizFinished(true); return; }
      setQuizIdx(i => i + 1); setTimer(20); setAnswered(null);
    }, 1300);
  };

  const toggleStep = (key) => {
    const next = { ...completedSteps, [key]: !completedSteps[key] };
    setCompletedSteps(next);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  };

  const toggleFav = (key) => {
    const next = favorites.includes(key) ? favorites.filter(f => f !== key) : [...favorites, key];
    setFavorites(next);
    localStorage.setItem("umrahajj_favorites", JSON.stringify(next));
  };

  const steps = tab === "umra" ? UMRA_STEPS : HAJJ_STEPS;
  const completedCount = steps.filter(s => completedSteps[`${tab}_${s.num}`]).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Umra & Haxhi</h1>
            <p className="text-sm text-gray-500">Ritet, duatë dhe udhëzimi i plotë hap pas hapi</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-2xl w-fit flex-wrap">
        {[
          { val: "umra", label: "🕌 Umra", count: `${UMRA_STEPS.length} hapa` },
          { val: "hajj", label: "🕋 Haxhi", count: `${HAJJ_STEPS.length} hapa` },
          { val: "quiz", label: "🎯 Kuiz", count: `${QUIZ_QUESTIONS.length} pyetje` },
        ].map(t => (
          <button key={t.val} onClick={() => { setTab(t.val); setExpanded(null); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.val ? "bg-white shadow text-emerald-700" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label} <span className="ml-1 text-xs text-gray-400">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Progress bar for umra/hajj */}
      {(tab === "umra" || tab === "hajj") && (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                {tab === "umra" ? "🕌 Progresi i Umrës" : "🕋 Progresi i Haxhit"}
              </span>
              <span className="text-sm text-emerald-600 font-bold">{completedCount}/{steps.length} hapa</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${(completedCount / steps.length) * 100}%` }} />
            </div>
            {completedCount === steps.length && (
              <p className="text-sm text-emerald-600 font-semibold mt-2 text-center">🎉 Mashallah! Të gjitha hapat u kompletuan!</p>
            )}
          </div>

          <div className="space-y-3">
            {steps.map((step) => {
              const key = `${tab}_${step.num}`;
              const isDone = completedSteps[key];
              const isFav = favorites.includes(key);
              return (
                <motion.div key={step.num} className={`rounded-2xl border-2 overflow-hidden transition-all ${isDone ? "border-emerald-300 bg-emerald-50/50" : step.color}`}>
                  <div className="w-full flex items-center gap-4 p-5">
                    <div className="text-3xl">{step.icon}</div>
                    <button className="flex-1 text-left" onClick={() => setExpanded(expanded === step.num ? null : step.num)}>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className={`w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center shadow-sm ${isDone ? "bg-emerald-500 text-white" : "bg-white text-gray-700"}`}>
                          {isDone ? "✓" : step.num}
                        </span>
                        <span className="font-bold text-gray-900">{step.title}</span>
                        {isDone && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Kompletuar</span>}
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </button>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold hidden sm:block" style={{ fontFamily: "serif", direction: "rtl" }}>{step.arabic}</p>
                      <button onClick={() => toggleFav(key)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isFav ? "bg-red-50 text-red-500" : "bg-white/60 text-gray-300 hover:text-red-400"}`}>
                        <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                      </button>
                      <button onClick={() => setExpanded(expanded === step.num ? null : step.num)}>
                        {expanded === step.num ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded === step.num && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <div className="border-t border-white/50 p-5 bg-white/60 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <h4 className="text-sm font-bold text-gray-700 mb-3">Hapat:</h4>
                              <ul className="space-y-2">
                                {step.details.map((d, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {step.dua && (
                              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                                <h4 className="text-sm font-bold text-gray-700 mb-3">Duaja:</h4>
                                <p className="text-xl text-gray-900 mb-2 text-right leading-relaxed" style={{ fontFamily: "serif", direction: "rtl" }}>{step.dua}</p>
                                <p className="text-xs text-gray-500 italic mb-3">{step.dua_transliteration}</p>
                                <Button size="sm" onClick={() => speak(step.dua)} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
                                  <Volume2 className="w-3.5 h-3.5 mr-1.5" /> Dëgjo
                                </Button>
                              </div>
                            )}
                          </div>
                          {/* Mark as done */}
                          <div className="flex items-center gap-3 pt-2 border-t border-white/50">
                            <Button
                              size="sm"
                              onClick={() => toggleStep(key)}
                              className={isDone ? "bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-xl" : "bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"}>
                              {isDone ? "↩ Shëno si i pakompletuar" : "✓ Shëno si i kompletuar"}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {/* Quiz */}
      {tab === "quiz" && (
        <div>
          {!quizStarted && !quizFinished && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-5xl mb-4">🕋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Kuiz — Umra & Haxhi</h3>
              <p className="text-gray-500 mb-2">{QUIZ_QUESTIONS.length} pyetje, 20 sekonda për çdo pyetje</p>
              <p className="text-sm text-teal-600 mb-6">Testo njohuritë e tua për ritet e Umrës dhe Haxhit!</p>
              <Button onClick={startQuiz} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8">Fillo Kuizin</Button>
            </div>
          )}

          {quizStarted && !quizFinished && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-600">Pyetja {quizIdx + 1}/{QUIZ_QUESTIONS.length}</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
                  <Timer className="w-4 h-4" /> {timer}s
                </div>
                <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${((quizIdx) / QUIZ_QUESTIONS.length) * 100}%` }} />
              </div>
              <div className="bg-teal-50 rounded-2xl p-6 text-center mb-5">
                <p className="text-lg font-semibold text-gray-800">{QUIZ_QUESTIONS[quizIdx].q}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {QUIZ_QUESTIONS[quizIdx].options.map(opt => {
                  let cls = "border-gray-200 bg-white text-gray-800 hover:border-teal-300 hover:bg-teal-50";
                  if (answered) {
                    if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800";
                    else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
                    else cls = "border-gray-100 bg-gray-50 text-gray-400";
                  }
                  return (
                    <button key={opt} disabled={!!answered} onClick={() => handleQuizAnswer(opt)}
                      className={`border-2 rounded-2xl p-4 font-semibold text-sm text-center transition-all ${cls}`}>
                      {opt}
                      {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-600" />}
                      {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 inline ml-1 text-red-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {quizFinished && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Kuizi Mbaroi!</h3>
              <p className="text-5xl font-bold text-emerald-600 mb-2">{score}/{QUIZ_QUESTIONS.length}</p>
              <p className="text-gray-500 mb-6">
                {score >= 17 ? "Mashallah! Njohuri të shkëlqyera! 🌟" : score >= 12 ? "Shumë mirë! 👍" : score >= 7 ? "Mirë, vazhdo! 💪" : "Studjoi hapat sërish! 📚"}
              </p>
              <Button onClick={startQuiz} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8">
                <RotateCcw className="w-4 h-4 mr-2" /> Provo Sërish
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}