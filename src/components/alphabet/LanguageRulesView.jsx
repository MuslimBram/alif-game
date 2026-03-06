import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, CheckCircle, XCircle, Timer, RotateCcw, Trophy, Info } from "lucide-react";
import { speakText } from "@/components/utils/speakAlbanian";

// ─── RREGULLAT SHQIP ─────────────────────────────────────────────────────
const SHQIP_RULES = [
  {
    id: "zanore_bashketingellore",
    title: "🔤 Zanore & Bashkëtingëllore",
    color: "bg-emerald-50 border-emerald-200",
    icon: "🔤",
    explanation: "Shqipja ka 7 zanore: A, E, Ë, I, O, U, Y dhe 29 bashkëtingëllore. Çdo rrokje ka të paktën një zanore.",
    examples: [
      { word: "avion", highlight: "a, i, o", note: "3 zanore" },
      { word: "ëmbëlsirë", highlight: "ë, ë, i, ë", note: "4 zanore" },
      { word: "brezat", highlight: "e, a", note: "2 zanore" },
      { word: "yll", highlight: "y", note: "1 zanore" },
      { word: "shkronjë", highlight: "o, ë", note: "2 zanore" },
      { word: "ujë", highlight: "u, ë", note: "2 zanore" },
    ],
    rules: [
      "7 zanore: A, E, Ë, I, O, U, Y",
      "Çdo rrokje ka të paktën 1 zanore",
      "Bashkëtingëlloret: B, C, Ç, D, Dh, F, G, Gj...",
      "Bashkëtingëlloret dyfishe: Dh, Gj, Ll, Nj, Rr, Sh, Th, Xh, Zh",
    ]
  },
  {
    id: "ndarja_rrokjeve",
    title: "✂️ Ndarja e Rrokjeve",
    color: "bg-blue-50 border-blue-200",
    icon: "✂️",
    explanation: "Fjalët ndahen në rrokje sipas zanoreve. Bashkëtingëllorja midis dy zanoreve i takon rrokjes pasardhëse.",
    examples: [
      { word: "ma-li", highlight: "ma | li", note: "2 rrokje" },
      { word: "bu-ku-ri", highlight: "bu | ku | ri", note: "3 rrokje" },
      { word: "dri-ta", highlight: "dri | ta", note: "2 rrokje" },
      { word: "ë-më-lsi-rë", highlight: "ë | mbël | si | rë", note: "4 rrokje" },
      { word: "va-rro-sa", highlight: "va | rro | sa", note: "3 rrokje" },
      { word: "shko-llë", highlight: "shko | llë", note: "2 rrokje" },
    ],
    rules: [
      "Rrokja = zanore + bashkëtingëllore/t rreth saj",
      "V-BT-V: bashkëtingëllorja i takon rrokjes pasardhëse (ma-li)",
      "V-BT-BT-V: ndahen mes (bar-dha)",
      "Rrokja hundore: BT+BT pa zanore (nuk ndahet)",
    ]
  },
  {
    id: "gjinia_emrit",
    title: "⚥ Gjinia e Emrit",
    color: "bg-purple-50 border-purple-200",
    icon: "⚥",
    explanation: "Emrat shqip ndahen në mashkullore dhe femërorë. Mbaresa i fund-fjalës shpesh tregon gjininë.",
    examples: [
      { word: "djali — vajza", highlight: "mashk. / fem.", note: "gjini të ndryshme" },
      { word: "libri — libra", highlight: "mashk. njëjës / shumës", note: "libër → libra" },
      { word: "mësuesi — mësuesja", highlight: "mashk. / fem.", note: "+ja për femërorën" },
      { word: "mali — malet", highlight: "njëjës / shumës", note: "mal → male" },
      { word: "zogu — zogjtë", highlight: "njëjës / shumës", note: "zog → zogj" },
      { word: "shtëpia — shtëpitë", highlight: "njëjës / shumës", note: "shtëpi → shtëpitë" },
    ],
    rules: [
      "Mashkullore: zakonisht mbarojnë me konsonant + i: djali, mali",
      "Femërorja: zakonisht mbarojnë me -ë/-a: vajzë, grua",
      "Shumësi: -a, -e, -ra, -nj varësi nga emri",
      "Nyja e shquar: -i (mashk.), -a/-ja (fem.)",
    ]
  },
  {
    id: "shkronjat_e_veçanta",
    title: "🔡 Shkronjat e Veçanta Shqipe",
    color: "bg-amber-50 border-amber-200",
    icon: "🔡",
    explanation: "Shqipja ka disa shkronja të veçanta: Ë (schwa), Ç (ch), dhe 9 digrafë (shkronja dyshe që paraqesin tingull të vetëm).",
    examples: [
      { word: "ëmbël", highlight: "ë ë", note: "schwa — tingull neutral" },
      { word: "çadër", highlight: "ç", note: "si 'ch' anglisht" },
      { word: "xhaxhai", highlight: "xh, xh", note: "si 'j' anglisht" },
      { word: "zhurma", highlight: "zh", note: "si 's' frëngjisht" },
      { word: "llambë", highlight: "ll", note: "L-ja e trashë" },
      { word: "njerëz", highlight: "nj", note: "ni-ja e butë" },
    ],
    rules: [
      "Ë (schwa): tingull neutral, si 'u' anglisht në 'about'",
      "Digrafët: Dh, Gj, Ll, Nj, Rr, Sh, Th, Xh, Zh",
      "Ç ≠ C: Ç lexohet 'ch', C lexohet 'ts'",
      "Rr vs R: Rr është R e dyfishuar (rrugë ≠ rugë)",
    ]
  },
];

// ─── RREGULLAT ANGLISHT ───────────────────────────────────────────────────
const ANGLISHT_RULES = [
  {
    id: "silent_letters",
    title: "🔇 Silent Letters (Shkronjat e Heshtura)",
    color: "bg-sky-50 border-sky-200",
    icon: "🔇",
    explanation: "Anglishtja ka shumë shkronja që shkruhen por nuk lexohen! Kjo e bën shqiptimin shumë të vështirë.",
    examples: [
      { word: "knife", highlight: "k-nife → nаif", note: "K e heshtur" },
      { word: "write", highlight: "w-rite → rаit", note: "W e heshtur" },
      { word: "island", highlight: "is-land → ailand", note: "S e heshtur" },
      { word: "listen", highlight: "lis-ten → lisen", note: "T e heshtur" },
      { word: "hour", highlight: "h-our → аuer", note: "H e heshtur" },
      { word: "know", highlight: "k-now → nou", note: "K e heshtur" },
    ],
    rules: [
      "K para N: knife, knee, know, knock → K nuk lexohet",
      "W para R: write, wrong, wrap → W nuk lexohet",
      "G para H: night, light, right → GH nuk lexohet",
      "B pas M: lamb, bomb, comb → B nuk lexohet",
    ]
  },
  {
    id: "vowel_sounds",
    title: "🔊 Zanorет dhe Tingujt e Tyre",
    color: "bg-indigo-50 border-indigo-200",
    icon: "🔊",
    explanation: "Anglishtja ka vetëm 5 zanore (a,e,i,o,u) por mbi 20 tinguj vokalikë! E njëjta shkronjë lexohet ndryshe sipas kontekstit.",
    examples: [
      { word: "cat / cake", highlight: "cat='æ' / cake='eɪ'", note: "A = 2 tinguj" },
      { word: "bed / beat", highlight: "bed='ɛ' / beat='iː'", note: "E = 2 tinguj" },
      { word: "sit / site", highlight: "sit='ɪ' / site='aɪ'", note: "I = 2 tinguj" },
      { word: "hot / hope", highlight: "hot='ɒ' / hope='oʊ'", note: "O = 2 tinguj" },
      { word: "cup / cute", highlight: "cup='ʌ' / cute='juː'", note: "U = 2 tinguj" },
      { word: "read / read", highlight: "read(now)='riːd' / read(past)='rɛd'", note: "E njëjta fjalë!" },
    ],
    rules: [
      "Zanore e shkurtër + konsonant: cat, bed, sit, hot, cup",
      "Zanore e gjatë: zanore + e fundore ose para-r: cake, kite",
      "Double vowel = zgjatje: ee='iː', oo='uː', ai='eɪ'",
      "Vowel + r ndryshon tingullin: ar='ɑː', er='ɜː', or='ɔː'",
    ]
  },
  {
    id: "th_sounds",
    title: "🦷 TH — Tingujt Anglez",
    color: "bg-teal-50 border-teal-200",
    icon: "🦷",
    explanation: "TH anglez nuk ekziston në shqip! Ka dy variante: TH i butë (ð - si Dh shqip) dhe TH i fortë (θ - si Th shqip).",
    examples: [
      { word: "the / this / that", highlight: "ð — TH i butë (me zë)", note: "si 'Dh' shqip" },
      { word: "think / three / thank", highlight: "θ — TH i fortë (pa zë)", note: "si 'Th' shqip" },
      { word: "mother / father", highlight: "ð — midis zanoreve = i butë", note: "gjithmonë ð" },
      { word: "teeth / bath", highlight: "θ — në fund = i fortë zakonisht", note: "teeth, bath, path" },
      { word: "there / their / they", highlight: "ð — nyje + pronë + pers.", note: "gjithmonë i butë" },
      { word: "thousand / through", highlight: "θ — numra + fjalë të shumta", note: "thousand = mijë" },
    ],
    rules: [
      "TH i butë (ð): the, this, that, these, those, there, then",
      "TH i fortë (θ): think, three, thank, teeth, bath, math",
      "Mes zanoreve: zakonisht i butë — mother, father, weather",
      "Mësoje me praktikë: gjuha preket dhëmbëve lehtë!",
    ]
  },
  {
    id: "plural_rules",
    title: "🔢 Rregullat e Shumësit",
    color: "bg-rose-50 border-rose-200",
    icon: "🔢",
    explanation: "Shumësi anglez formohet me +s ose +es, por ka shumë raste të parregullta që duhen mësuar përmendsh.",
    examples: [
      { word: "cat → cats", highlight: "+s", note: "rregullë bazë" },
      { word: "box → boxes", highlight: "+es (x,s,sh,ch)", note: "pas x, s, sh, ch" },
      { word: "baby → babies", highlight: "y→ies", note: "konsonant+y → ies" },
      { word: "child → children", highlight: "parregullt!", note: "ndryshon plotësisht" },
      { word: "man → men", highlight: "a→e", note: "ndryshon zanore" },
      { word: "sheep → sheep", highlight: "pa ndryshim", note: "sheep, fish, deer" },
    ],
    rules: [
      "+s: dogs, cats, books, chairs (rregulla bazë)",
      "+es: boxes, churches, buses, dishes (x, ch, sh, s, o)",
      "y→ies: baby→babies, city→cities (konsonant+y)",
      "Parregullt: man→men, woman→women, child→children, mouse→mice",
    ]
  },
];

// ─── QUIZ DATA ─────────────────────────────────────────────────────────────
const SHQIP_QUIZ = [
  { q: "Cilat janë zanore shqip?", options: ["A E Ë I O U Y", "A B C D E", "A E I O U", "B C D F G"], correct: "A E Ë I O U Y" },
  { q: "Sa digrafë ka gjuha shqipe?", options: ["9", "5", "7", "12"], correct: "9" },
  { q: "Cili digraff shqip tingëllon si 'ch' anglez?", options: ["Ç", "Xh", "Zh", "Sh"], correct: "Ç" },
  { q: "Si formohet shumësi i 'libër'?", options: ["libra", "libri", "librë", "libret"], correct: "libra" },
  { q: "Cila është mbaresa e gjinisë femërore zakonisht?", options: ["-ë/-a", "-i", "-u", "-o"], correct: "-ë/-a" },
  { q: "Ndaj rrokjet e fjalës 'bukuri'?", options: ["bu-ku-ri", "buk-uri", "bu-kuri", "bukur-i"], correct: "bu-ku-ri" },
  { q: "Cila shkronjë paraqet tingullin 'L të trashë'?", options: ["Ll", "L", "Lj", "Ly"], correct: "Ll" },
  { q: "Cili tingull është 'Ë'?", options: ["Vokal neutral (schwa)", "Si 'E' e zakonshme", "Si 'A'", "Nuk lexohet"], correct: "Vokal neutral (schwa)" },
  { q: "Sa rrokje ka fjala 'shtëpi'?", options: ["3", "2", "4", "1"], correct: "3" },
  { q: "'Dh' shqip është:", options: ["Digrafi bashkëtingëllor", "Zanore", "Shkronjë e vetme", "S e zëshme"], correct: "Digrafi bashkëtingëllor" },
];

const ANGLISHT_QUIZ = [
  { q: "Cila shkronjë është e heshtur në fjalën 'knife'?", options: ["K", "N", "I", "E"], correct: "K" },
  { q: "Cili tingull ka 'TH' në 'the/this/that'?", options: ["ð (i butë, me zë)", "θ (i fortë, pa zë)", "T", "D"], correct: "ð (i butë, me zë)" },
  { q: "Shumësi i 'child' është:", options: ["children", "childs", "childes", "childies"], correct: "children" },
  { q: "Shumësi i 'city' është:", options: ["cities", "citys", "cityes", "citees"], correct: "cities" },
  { q: "Cila shkronjë është e heshtur në 'write'?", options: ["W", "R", "I", "E"], correct: "W" },
  { q: "Zanorja 'A' në 'cake' tingëllon si:", options: ["'eɪ' (ay)", "'æ' (cat)", "'ɑː' (car)", "'ə' (about)"], correct: "'eɪ' (ay)" },
  { q: "Shumësi i 'box' është:", options: ["boxes", "boxs", "boxies", "boxen"], correct: "boxes" },
  { q: "Cili tingull ka 'TH' në 'think/three'?", options: ["θ (i fortë, pa zë)", "ð (i butë, me zë)", "T", "S"], correct: "θ (i fortë, pa zë)" },
  { q: "Shumësi i 'sheep' është:", options: ["sheep", "sheeps", "sheepes", "sheepen"], correct: "sheep" },
  { q: "Shkronja e heshtur në 'hour' është:", options: ["H", "O", "U", "R"], correct: "H" },
];

function RuleCard({ rule, language }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${rule.color} border rounded-2xl overflow-hidden`}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:opacity-90 transition-all">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{rule.icon}</span>
          <span className="font-bold text-gray-800">{rule.title}</span>
        </div>
        <span className="text-gray-400 text-lg">{open ? "▲" : "▼"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-5 pb-5 space-y-4">
              <div className="bg-white/70 rounded-xl p-3 text-sm text-gray-700">{rule.explanation}</div>
              {/* Shembuj */}
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">Shembuj:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {rule.examples.map((ex, i) => (
                    <button key={i}
                      onClick={() => speakText(ex.word.split(" ")[0], language)}
                      className="bg-white border border-gray-100 rounded-xl p-3 text-left hover:shadow-md transition-all group">
                      <div className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 flex items-center gap-1">
                        {ex.word} <Volume2 className="w-3 h-3 text-gray-300 group-hover:text-emerald-500" />
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">{ex.highlight}</div>
                      <div className="text-xs text-gray-400 italic">{ex.note}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Rregullat */}
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" /> Rregullat kryesore:
                </p>
                <ul className="space-y-1">
                  {rule.rules.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LanguageQuiz({ questions, language, langLabel }) {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, started, finished, idx]);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === questions[idx].correct;
    setAnswered({ selected: opt, correct: questions[idx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    speakText(questions[idx].correct, language);
    setTimeout(() => {
      if (idx + 1 >= questions.length) { setFinished(true); return; }
      setIdx(i => i + 1); setTimer(15); setAnswered(null);
    }, 1400);
  };

  const restart = () => { setStarted(false); setFinished(false); setIdx(0); setScore(0); setTimer(15); setAnswered(null); };
  const pct = Math.round((score / questions.length) * 100);

  if (!started) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <div className="text-5xl mb-4">🎯</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Kuiz — Rregullat {langLabel}</h3>
      <p className="text-gray-500 mb-1">{questions.length} pyetje · 15 sekonda secila</p>
      <p className="text-sm text-teal-600 mb-6">Testo njohuritë e tua gramatikore!</p>
      <button onClick={() => setStarted(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-3 font-bold transition-all">
        🚀 Fillo Kuizin
      </button>
    </div>
  );

  if (finished) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-3" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Mbaroi!</h3>
      <p className={`text-5xl font-bold mb-3 ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>
        {score}/{questions.length}
      </p>
      <p className="text-gray-500 mb-6">
        {pct >= 85 ? "🌟 Shumë mirë! Ekspert i rregullave!" : pct >= 60 ? "👍 Mirë! Vazhdo të mësosh!" : "📚 Lexo rregullat sërish!"}
      </p>
      <button onClick={restart}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-3 font-bold gap-2 flex items-center mx-auto">
        <RotateCcw className="w-4 h-4" /> Provo Sërish
      </button>
    </motion.div>
  );

  const q = questions[idx];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-600">Pyetja {idx + 1}/{questions.length}</span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
          <Timer className="w-4 h-4" /> {timer}s
        </div>
        <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center mb-4">
        <p className="text-lg font-bold text-gray-800">{q.q}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt) => {
          let cls = "border-gray-200 bg-white text-gray-800 hover:border-teal-300 hover:bg-teal-50";
          if (answered) {
            if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
            else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
            else cls = "border-gray-100 bg-gray-50 text-gray-400";
          }
          return (
            <button key={opt} disabled={!!answered} onClick={() => handleAnswer(opt)}
              className={`border-2 rounded-2xl p-3.5 text-sm text-center transition-all ${cls}`}>
              {opt}
              {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-600" />}
              {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 inline ml-1 text-red-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── TABS ──────────────────────────────────────────────────────────────────
const LANG_TABS = {
  shqip: [
    { id: "rregullat", label: "📚 Rregullat" },
    { id: "kuiz",      label: "🎯 Kuiz" },
  ],
  anglisht: [
    { id: "rregullat", label: "📚 Rules" },
    { id: "kuiz",      label: "🎯 Quiz" },
  ],
};

export default function LanguageRulesView({ language }) {
  const [tab, setTab] = useState("rregullat");
  const rules = language === "shqip" ? SHQIP_RULES : ANGLISHT_RULES;
  const quiz  = language === "shqip" ? SHQIP_QUIZ  : ANGLISHT_QUIZ;
  const tabs  = LANG_TABS[language] || LANG_TABS.shqip;
  const langLabel = language === "shqip" ? "Shqip 🇦🇱" : "English 🇬🇧";

  return (
    <div className="space-y-4">
      {/* Header + tab switcher */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          {language === "shqip" ? "📖 Rregulla Gjuhësore — Shkolla Fillore" : "📖 Language Rules — Primary School"}
        </h2>
        <div className="flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                tab === t.id ? "bg-emerald-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "rregullat" && (
        <div className="space-y-3">
          {rules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} language={language} />
          ))}
        </div>
      )}

      {tab === "kuiz" && (
        <LanguageQuiz questions={quiz} language={language} langLabel={langLabel} />
      )}
    </div>
  );
}