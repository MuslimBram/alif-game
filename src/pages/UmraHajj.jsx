import React, { useState, useEffect } from "react";
import VR3DExperience from "@/components/umra/VR3DExperience";
import PhotoGenerator360 from "@/components/admin/PhotoGenerator360";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Volume2, CheckCircle, Timer, XCircle, Trophy, RotateCcw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const UMRA_STEPS = [
  {
    num: 1, title: "Ihrami", arabic: "الإحرام",
    description: "Veshja e rrobave të bardha të ihramit dhe shqiptimi i nijetit.",
    details: ["Bëj gusël (larje e plotë e trupit)", "Vesh rrobet e bardha të ihramit (2 copë pambuk)", "Shqipto nijetin: 'Lebbeyk Allahumme Umreten'", "Talbija: لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ", "Shmang: qethjen, parfumin, marrëdhëniet, grindjat"],
    dua: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ",
    dua_sq: "Lebbeyk Allahumme lebbeyk, lebbeyk la sherike leke lebbeyk",
    info: "Ihrami simbolizon barazi — të gjithë njerëzit janë barabar para Allahut.",
    location: "🗺️ Mikat — Dera e Medinës", map_emoji: "⬜", color: "bg-emerald-50 border-emerald-300", icon: "🤍",
  },
  {
    num: 2, title: "Tavafi", arabic: "الطواف",
    description: "Rrotullimi 7 herë rreth Qabesë, duke filluar nga Guri i Zi.",
    details: ["Fillo nga Haxheri Esvedi (këndi i zi)", "Rrotullohu 7 herë kundër akrepave të orës", "Qabeja gjithmonë në të majtë", "Preku ose sinjalo Gurin e Zi", "Çdo rrotullim fillon dhe mbaron te Guri i Zi"],
    dua: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    dua_sq: "Rabbena atine fid-dunja hasene ve fil-ahireti hasene ve kina adhaben-nar",
    info: "Tavafi është adhurim i pastër — zemra juaj drejtuar nga Allahu ndërkohë që lëvizni fizikisht.",
    location: "🕋 Masjid Al-Haram — Qabeja", map_emoji: "🕋", color: "bg-blue-50 border-blue-300", icon: "🕋",
  },
  {
    num: 3, title: "Namazi pas Tavafit", arabic: "صلاة الطواف",
    description: "Dy rekate namaz pranë Makam Ibrahimit.",
    details: ["Shko te Makam Ibrahimi pas tavafit", "Fal 2 rekat namaz", "Lexo Surel Kafirun (rekati i parë)", "Lexo Surel Ihlas (rekati i dytë)", "Ky namaz është Sunnet e fortë"],
    dua: "وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى",
    dua_sq: "Vettehidhu min makame Ibrahime musallan",
    info: "Makam Ibrahimi — guri ku Ibrahimi (a.s.) qëndroi gjatë ndërtimit të Qabesë. Gjurma e tij e këmbës është ruajtur në të.",
    location: "🏛️ Makam Ibrahim — pranë Qabesë", map_emoji: "🤲", color: "bg-purple-50 border-purple-300", icon: "🤲",
  },
  {
    num: 4, title: "Safa dhe Merva (Sa'j)", arabic: "السعي بين الصفا والمروة",
    description: "Ecja 7 herë ndërmjet Safas dhe Mervës, duke ndjekur rrugën e Hajares.",
    details: ["Fillo nga Safa (klim pak)", "Shko te Merva (~450m)", "Kthehu nga Merva te Safa = 2 herë", "Gjithsej 7 ecje", "Meshkujt vrapojnë midis sinjalizuesve jeshilë"],
    dua: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
    dua_sq: "Innes-Safa vel-Meruveta min sha'airillah",
    info: "Sa'ji kujton heroizmin e Hajares — nënës së Ismailit (a.s.) — që vrapoi duke kërkuar ujë për fëmijën e saj.",
    location: "🏔️ Safa ↔ Merva (brenda xhamisë)", map_emoji: "🏃", color: "bg-amber-50 border-amber-300", icon: "🏔️",
  },
  {
    num: 5, title: "Qethja / Shkurtimi", arabic: "الحلق أو التقصير",
    description: "Meshkujt qethin kokën ose shkurtojnë flokët — Ihrami përfundon.",
    details: ["Meshkujt: preferohet qethja e plotë (Halq)", "Alternativë: shkurtim i njëtrajtshëm (Taksir)", "Gratë: presin vetëm majën e flokëve (~2cm)", "Pas kësaj, IHRAMI PËRFUNDON", "Mund të veshësh rrobat normale"],
    dua: "اللَّهُمَّ اغْفِرْ لِلْمُحَلِّقِينَ",
    dua_sq: "Allahumme-ghfir lil-muhallikin",
    info: "Qethja simbolizon përulësinë, hedhjen e krenarisë botërore dhe fillimin e ri shpirtëror.",
    location: "✂️ Çdo vend pranë Harem-it", map_emoji: "✂️", color: "bg-rose-50 border-rose-300", icon: "✂️",
  },
];

const HAJJ_STEPS = [
  {
    num: 1, title: "Ihrami për Haxhin", arabic: "إحرام الحج",
    description: "Hyrja në gjendje ihram nga Mikati — 8 Dhul-Hixhe.",
    details: ["Gusël dhe vesh ihramin", "Nijeti: 'Lebbeyk Allahumme Hajjan'", "Shko në Mina pas agimit", "Fal 5 namaze në Mina", "Qëndro natën në Mina"],
    dua: "لَبَّيْكَ اللَّهُمَّ حَجًّا", dua_sq: "Lebbeyk Allahumme Haxhen",
    info: "8 Dhul-Hixhe quhet 'Dita e Tervijas' — dita e ujit, pasi dikur njerëzit merrnin ujë për udhëtimin.",
    location: "🗺️ Mikat → Mina", map_emoji: "⬜", color: "bg-emerald-50 border-emerald-300", icon: "🤍",
  },
  {
    num: 2, title: "Dita e Arafatit (9 Dhul-Hixhe)", arabic: "يوم عرفة",
    description: "SHTYLLA KRYESORE E HAXHIT — Qëndrimi në Arafat.",
    details: ["Shko në Arafat pas agimit", "Fal Drekën dhe Ikindinë bashkë (shkurtuar)", "Lutu me zemër — ky është momenti kryesor!", "Dërgo salavatë Profetit ﷺ", "Qëndro deri pas perëndimit", "Nises drejt Muzdelifes pas perëndimit"],
    dua: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    dua_sq: "La ilahe illallahu vahdehu la sherike leh",
    info: "Profeti ﷺ tha: 'Haxhi është Arafati.' Nëse e mungon qëndrimin në Arafat, Haxhi është i pavlefshëm.",
    location: "🌄 Fusha e Arafatit", map_emoji: "🌅", color: "bg-amber-50 border-amber-300", icon: "🌅",
  },
  {
    num: 3, title: "Muzdelifa — Grumbullimi i Gurëve", arabic: "مزدلفة",
    description: "Kaloj natën dhe mblidh gurë — 9-10 Dhul-Hixhe.",
    details: ["Mblidh 49 ose 70 gurë (si lajthia)", "Fal Akshamin dhe Jacinë bashkë", "Fal Sabahun herët", "Qëndro deri pak para lindjes së diellit", "Nises para lindjes së diellit drejt Minës"],
    dua: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", dua_sq: "Rabbena atina fid-dunja hasene",
    info: "Muzdelifa është mes Arafatit dhe Minës. Nata këtu është adhurim i madh dhe shumë lugata kryhen.",
    location: "🌙 Muzdelifa (mes Arafatit dhe Minës)", map_emoji: "🌙", color: "bg-indigo-50 border-indigo-300", icon: "🌙",
  },
  {
    num: 4, title: "Dita e Kurbanit (10 Dhul-Hixhe)", arabic: "يوم النحر",
    description: "Kryhen 4 veprime: gurët, kurbani, qethja, Tavafi i Ifadës.",
    details: ["1️⃣ Hidh 7 gurë te Xhemretul-Akabe", "2️⃣ Ther kurbanin (nëse keni)", "3️⃣ Qethu ose shkurto flokët", "4️⃣ Tavafi i Ifadës (i detyrueshëm)", "5️⃣ Sa'j nëse nuk e ke bërë me Tavafin e Kudum"],
    dua: "اللَّهُ أَكْبَرُ", dua_sq: "Allahu Akbar (duke hedhur çdo gur)",
    info: "Hedhja e gurëve simbolizon refuzimin e shejtanit — kujton vendosmërinë e Ibrahimit (a.s.).",
    location: "🪨 Xhemretul-Akabe → Qabeja", map_emoji: "🕋", color: "bg-rose-50 border-rose-300", icon: "🕋",
  },
  {
    num: 5, title: "Ditët e Teshrîkut (11-13 Dhul-Hixhe)", arabic: "أيام التشريق",
    description: "Qëndrim në Mina dhe hedhja e gurëve te 3 Xhemratat çdo ditë.",
    details: ["Hidh 7+7+7 gurë te 3 Xhemratat (Sugra, Vusta, Akabe)", "Fillo nga Xhemretul-Sugra (e vogla)", "Dërgoji salavate pas çdo hedhje", "Mund të largohesh 12 ose 13 Dhul-Hixhe", "Nëse ikën 12, duhet para perëndimit"],
    dua: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللهُ",
    dua_sq: "Allahu Akbar, Allahu Akbar, La ilahe illallahu",
    info: "Mina quhet 'Qyteti i Tentave' — miliona pelegrinë jetojnë bashkërisht në tendat e bardha.",
    location: "🏕️ Mina — Qyteti i Tentave", map_emoji: "🪨", color: "bg-teal-50 border-teal-300", icon: "🪨",
  },
  {
    num: 6, title: "Tavafi i Lamtumirës (Veda)", arabic: "طواف الوداع",
    description: "Para nisjes — Tavafi i fundit i lamtumirës.",
    details: ["Kryhet para nisjes nga Meka", "7 rrotullime rreth Qabesë", "Detyrueshëm për ata nga jashtë Mekes", "Pas kësaj mos qëndro në Mekë shumë gjatë", "Gratë në menstruacion janë të liruara"],
    dua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ",
    dua_sq: "Allahumme inni as'eluke ridake vel-xhennete",
    info: "Tavafi i Vedas është momenti i lamtumirës me Qabenë — shumë pelegrinë qajnë me lot duke shpresuar të kthehen sërish.",
    location: "🕋 Masjid Al-Haram — Qabeja", map_emoji: "👋", color: "bg-purple-50 border-purple-300", icon: "👋",
  },
];

const QUIZ_QUESTIONS = [
  { q: "Cila është shtylla kryesore e Haxhit?", options: ["Tavafi", "Qëndrimi në Arafat", "Sa'ji", "Ihrami"], correct: "Qëndrimi në Arafat" },
  { q: "Sa herë rrotullohet Qabeja gjatë Tavafit?", options: ["5", "6", "7", "8"], correct: "7" },
  { q: "Nga fillon Tavafi?", options: ["Makam Ibrahimi", "Safa", "Haxheri Esvedi", "Muzdelifa"], correct: "Haxheri Esvedi" },
  { q: "Sa ecje ka Sa'ji mes Safas dhe Mervës?", options: ["5", "6", "7", "8"], correct: "7" },
  { q: "Ku kalohet nata para Arafatit?", options: ["Muzdelifa", "Mina", "Meka", "Medine"], correct: "Mina" },
  { q: "Ku mblidhen gurët gjatë Haxhit?", options: ["Muzdelifa", "Mina", "Arafat", "Safa"], correct: "Muzdelifa" },
  { q: "Sa gurë hidhen te Xhemretul-Akabe?", options: ["3", "5", "7", "10"], correct: "7" },
  { q: "Çfarë ndodh pas qethjes gjatë Umrës?", options: ["Fillon Sa'ji", "Ihrami mbaron", "Fillon Tavafi", "Shkon në Mina"], correct: "Ihrami mbaron" },
  { q: "Cila sure lexohet te Makam Ibrahimi?", options: ["Fatiha + Bakara", "Kafirun + Ihlas", "Jasin + Mulk", "Nas + Felak"], correct: "Kafirun + Ihlas" },
  { q: "Cila ditë quhet 'Dita e Arafatit'?", options: ["7", "8", "9", "10"], correct: "9" },
  { q: "Sa hapa ka Umra?", options: ["3", "4", "5", "6"], correct: "5" },
  { q: "Çfarë është Talbija?", options: ["Lutja e Tavafit", "Formula e Ihramit", "Namaz i veçantë", "Gurët"], correct: "Formula e Ihramit" },
  { q: "Sa gurë mblidhen gjatë natës në Muzdelifa?", options: ["7", "21", "49 ose 70", "100"], correct: "49 ose 70" },
  { q: "Cila ditë fillon zyrtarisht Haxhi?", options: ["7 Dhul-Hixhe", "8 Dhul-Hixhe", "9 Dhul-Hixhe", "10 Dhul-Hixhe"], correct: "8 Dhul-Hixhe" },
  { q: "Si quhet Tavafi i fundit?", options: ["Kudum", "Ifadah", "Veda", "Nijet"], correct: "Veda" },
];

// Holy sites data with visual map
const HOLY_SITES = [
  { name: "Qabeja (Bait Allah)", emoji: "🕋", desc: "Shtëpia e Allahut — pikë fokusi i çdo namazi dhe tavafit. Ndërtuar nga Ibrahimi dhe Ismaili (a.s.).", color: "bg-amber-100 border-amber-300" },
  { name: "Haxheri Esvedi", emoji: "⚫", desc: "Guri i Zi — meteorit nga Xhenneti. Puthja e tij është Sunet. Tavafi fillon dhe mbaron këtu.", color: "bg-gray-100 border-gray-300" },
  { name: "Makam Ibrahimi", emoji: "👣", desc: "Guri ku Ibrahimi (a.s.) qëndroi gjatë ndërtimit të Qabesë. Gjurma e tij e këmbës ruhet ende.", color: "bg-emerald-100 border-emerald-300" },
  { name: "Safa dhe Merva", emoji: "🏃", desc: "Dy kodra brenda xhamisë. Sa'ji kujton Hajaren duke vrapuar për ujë.", color: "bg-blue-100 border-blue-300" },
  { name: "Arafati", emoji: "🌄", desc: "Fusha ku Haxhillinjtë qëndrojnë në lutje — shtylla e Haxhit. 9 Dhul-Hixhe.", color: "bg-orange-100 border-orange-300" },
  { name: "Muzdelifa", emoji: "🌙", desc: "Ndërmjet Arafatit dhe Minës. Nata e natës — mblidhen gurët për hedhje.", color: "bg-indigo-100 border-indigo-300" },
  { name: "Mina", emoji: "🏕️", desc: "Qyteti i Tentave — miliona pelegrinë qëndrojnë 3-4 netë. Hedhja e gurëve bëhet këtu.", color: "bg-teal-100 border-teal-300" },
  { name: "Zemzemi", emoji: "💧", desc: "Burimi i shenjtë i ujit që rrjedh prej kohës së Hajares dhe Ismailit (a.s.). Pijë sa të duash!", color: "bg-cyan-100 border-cyan-300" },
];

const PROGRESS_KEY = "umrahajj_progress";
function loadUHProgress() { try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"); } catch { return {}; } }

const speak = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find(v => v.lang.startsWith("ar"));
  if (arVoice) u.voice = arVoice;
  u.lang = "ar-SA"; u.rate = 0.6;
  window.speechSynthesis.speak(u);
};

export default function UmraHajj() {
  const [tab, setTab] = useState("harita"); // harita | umra | hajj | quiz | foto360
  const [expanded, setExpanded] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(loadUHProgress);
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

  const steps = tab === "umra" ? UMRA_STEPS : HAJJ_STEPS;
  const completedCount = (tab === "umra" || tab === "hajj") ? steps.filter(s => completedSteps[`${tab}_${s.num}`]).length : 0;

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {show3D && <VR3DExperience onClose={() => setShow3D(false)} />}
      {/* Header */}
      <div className="mb-6">
        <div className="relative bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 rounded-3xl p-6 text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 text-[120px] flex items-center justify-center select-none pointer-events-none">🕋</div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">🕌</div>
              <div>
                <h1 className="text-2xl font-extrabold">Umra & Haxhi</h1>
                <p className="text-emerald-200 text-sm">Udhëzues interaktiv — hap pas hapi</p>
              </div>
            </div>
            <button onClick={() => setShow3D(true)}
              className="mb-3 flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white text-sm font-bold transition-all border border-white/30">
              🥽 Eksplorimi 3D i Vendeve të Shenjta — Vizitë Virtuale
            </button>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Hapat Umra", val: UMRA_STEPS.length, icon: "🕌" },
                { label: "Hapat Haxh", val: HAJJ_STEPS.length, icon: "🕋" },
                { label: "Vendeve Shenjta", val: HOLY_SITES.length, icon: "📍" },
              ].map(s => (
                <div key={s.label} className="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
                  <p className="text-lg">{s.icon}</p>
                  <p className="text-xl font-bold">{s.val}</p>
                  <p className="text-xs text-emerald-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-5 bg-gray-100 p-1.5 rounded-2xl flex-wrap">
        {[
          { val: "harita", label: "🗺️ Harta", desc: "Vendet e Shenjta" },
          { val: "umra", label: "🕌 Umra", desc: `${UMRA_STEPS.length} hapa` },
          { val: "hajj", label: "🕋 Haxhi", desc: `${HAJJ_STEPS.length} hapa` },
          { val: "quiz", label: "🎯 Kuiz", desc: `${QUIZ_QUESTIONS.length} pyetje` },
        ].map(t => (
          <button key={t.val} onClick={() => { setTab(t.val); setExpanded(null); }}
            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.val ? "bg-white shadow text-emerald-700" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label}
            <span className="block text-[10px] font-normal text-gray-400">{t.desc}</span>
          </button>
        ))}
      </div>

      {/* HARTA E VENDEVE TË SHENJTA */}
      {tab === "harita" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">🗺️ Vendet e Shenjta të Haxhit & Umrës</h2>
                <p className="text-sm text-gray-500">Eksploroni vendet kryesore të pelegrinazhit Islam</p>
              </div>
              <button onClick={() => setShow3D(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-md">
                🥽 3D
              </button>
            </div>

            {/* Visual "map" */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl p-4 mb-4 border border-amber-200 relative overflow-hidden">
              <p className="text-xs text-center text-amber-700 font-bold mb-3">🕌 MEKA AL-MUKARRAMAH</p>
              <div className="flex flex-col items-center gap-2">
                {/* Qabeja center */}
                <div className="bg-amber-800 text-white rounded-xl px-4 py-2 text-center shadow-lg">
                  <p className="text-2xl">🕋</p>
                  <p className="text-xs font-bold">Qabeja</p>
                  <p className="text-[10px] text-amber-200">Qendra e çdo Tavafit</p>
                </div>
                {/* Ring around */}
                <div className="flex gap-3 flex-wrap justify-center">
                  {[{ e: "⚫", n: "Haxheri Esvedi" }, { e: "👣", n: "Makam Ibrahim" }, { e: "💧", n: "Zemzemi" }].map(s => (
                    <div key={s.n} className="bg-white rounded-xl px-3 py-2 text-center border border-amber-200 shadow-sm">
                      <p className="text-xl">{s.e}</p>
                      <p className="text-[10px] font-semibold text-gray-700">{s.n}</p>
                    </div>
                  ))}
                </div>
                {/* Sa'j corridor */}
                <div className="bg-blue-100 rounded-xl px-4 py-2 border border-blue-200 text-center w-full max-w-xs">
                  <p className="text-sm">🏃 Safa ←→ Merva (Sa'j)</p>
                </div>
              </div>

              {/* Outer locations */}
              <div className="mt-4 border-t border-amber-200 pt-3">
                <p className="text-[10px] font-bold text-amber-700 mb-2 text-center">JASHTË MEKES</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { e: "🌄", n: "Arafat", d: "~14km" },
                    { e: "🌙", n: "Muzdelifa", d: "~9km" },
                    { e: "🏕️", n: "Mina", d: "~5km" },
                  ].map(s => (
                    <div key={s.n} className="bg-white rounded-xl p-2 text-center border border-amber-200">
                      <p className="text-xl">{s.e}</p>
                      <p className="text-xs font-bold text-gray-700">{s.n}</p>
                      <p className="text-[10px] text-gray-400">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Site details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOLY_SITES.map((site, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }}
                className={`rounded-2xl border-2 p-4 ${site.color} transition-all`}>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{site.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{site.name}</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{site.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* UMRA / HAJJ STEPS */}
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
              <div className="bg-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(completedCount / steps.length) * 100}%` }} />
            </div>
            {completedCount === steps.length && completedCount > 0 && (
              <p className="text-sm text-emerald-600 font-semibold mt-2 text-center">🎉 Mashallah! Të gjitha hapat u kompletuan!</p>
            )}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 to-teal-300 hidden sm:block" />
            <div className="space-y-3">
              {steps.map((step) => {
                const key = `${tab}_${step.num}`;
                const isDone = completedSteps[key];
                return (
                  <motion.div key={step.num} layout className={`rounded-2xl border-2 overflow-hidden transition-all sm:ml-12 relative ${isDone ? "border-emerald-400 bg-emerald-50/30" : step.color}`}>
                    {/* Timeline dot */}
                    <div className="absolute -left-12 top-5 hidden sm:flex w-8 h-8 rounded-full border-2 border-emerald-400 bg-white items-center justify-center font-bold text-emerald-700 text-sm shadow-md">
                      {isDone ? "✓" : step.num}
                    </div>

                    <button className="w-full flex items-start gap-4 p-4" onClick={() => setExpanded(expanded === step.num ? null : step.num)}>
                      <span className="text-3xl">{step.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-bold text-gray-900">{step.title}</span>
                          <span className="text-sm text-gray-500 font-medium" style={{ fontFamily: "serif", direction: "rtl" }}>{step.arabic}</span>
                          {isDone && <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">✓ Kompletuar</span>}
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{step.location}</p>
                      </div>
                      {expanded === step.num ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                    </button>

                    <AnimatePresence>
                      {expanded === step.num && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                          <div className="border-t border-white/60 p-5 bg-white/70 space-y-4">
                            {/* Info box */}
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2">
                              <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-blue-800 italic">{step.info}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-bold text-gray-700 mb-3">📋 Hapat e detajuar:</h4>
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
                                <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                                  <h4 className="text-sm font-bold text-gray-700 mb-3">🤲 Duaja:</h4>
                                  <p className="text-xl text-gray-900 mb-2 text-right leading-relaxed" style={{ fontFamily: "serif", direction: "rtl" }}>{step.dua}</p>
                                  <p className="text-xs text-gray-500 italic mb-3 leading-relaxed">{step.dua_sq}</p>
                                  <Button size="sm" onClick={() => speak(step.dua)} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
                                    <Volume2 className="w-3.5 h-3.5 mr-1.5" /> Dëgjo Duanë
                                  </Button>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                              <Button size="sm" onClick={() => toggleStep(key)}
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
          </div>
        </>
      )}

      {/* QUIZ */}
      {tab === "quiz" && (
        <div>
          {!quizStarted && !quizFinished && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-5xl mb-4">🕋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Kuiz — Umra & Haxhi</h3>
              <p className="text-gray-500 mb-1">{QUIZ_QUESTIONS.length} pyetje · 20 sekonda secila</p>
              <p className="text-sm text-teal-600 mb-6">Testo njohuritë për ritet e Umrës dhe Haxhit!</p>
              <Button onClick={startQuiz} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-3">🚀 Fillo Kuizin</Button>
            </div>
          )}

          {quizStarted && !quizFinished && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-600">Pyetja {quizIdx + 1}/{QUIZ_QUESTIONS.length}</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
                  <Timer className="w-4 h-4" /> {timer}s
                </div>
                <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(quizIdx / QUIZ_QUESTIONS.length) * 100}%` }} />
              </div>
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center mb-4">
                <p className="text-lg font-bold text-gray-800">{QUIZ_QUESTIONS[quizIdx].q}</p>
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
                      className={`border-2 rounded-2xl p-3.5 font-semibold text-sm text-center transition-all ${cls}`}>
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
              <p className={`text-5xl font-bold mb-2 ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>{score}/{QUIZ_QUESTIONS.length}</p>
              <p className="text-gray-500 mb-6">
                {pct >= 85 ? "🏆 Mashallah! Ekspert i Haxhit!" : pct >= 60 ? "👍 Shumë mirë!" : "📚 Studjoi hapat sërish!"}
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