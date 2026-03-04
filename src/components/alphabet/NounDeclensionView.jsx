import React, { useState } from "react";
import { Volume2 } from "lucide-react";

// ─── SHQIP NOUNS ──────────────────────────────────────────────────────────────
const SHQIP_NOUNS = [
  {
    noun: "laps", gender: "mashkullore", meaning: "pencil", arabic: "قَلَم",
    pashquar: {
      njejes: { emerore: "një laps", gjinore: "i/e një lapsi", dhanore: "një lapsi", kallezore: "një laps", rrjedhore: "prej një lapsi" },
      shumes: { emerore: "disa lapsa", gjinore: "i/e disa lapsave", dhanore: "disa lapsave", kallezore: "disa lapsa", rrjedhore: "prej disa lapsave" },
    },
    shquar: {
      njejes: { emerore: "lapsi", gjinore: "i lapsit", dhanore: "lapsit", kallezore: "lapsin", rrjedhore: "prej lapsit" },
      shumes: { emerore: "lapsat", gjinore: "i lapsave", dhanore: "lapsave", kallezore: "lapsat", rrjedhore: "prej lapsave" },
    },
  },
  {
    noun: "qytet", gender: "mashkullore", meaning: "city", arabic: "مَدِينَة",
    pashquar: {
      njejes: { emerore: "një qytet", gjinore: "i/e një qyteti", dhanore: "një qyteti", kallezore: "një qytet", rrjedhore: "prej një qyteti" },
      shumes: { emerore: "disa qytete", gjinore: "i/e disa qyteteve", dhanore: "disa qyteteve", kallezore: "disa qytete", rrjedhore: "prej disa qyteteve" },
    },
    shquar: {
      njejes: { emerore: "qyteti", gjinore: "i qytetit", dhanore: "qytetit", kallezore: "qytetin", rrjedhore: "prej qytetit" },
      shumes: { emerore: "qytetet", gjinore: "i qyteteve", dhanore: "qyteteve", kallezore: "qytetet", rrjedhore: "prej qyteteve" },
    },
  },
  {
    noun: "mal", gender: "mashkullore", meaning: "mountain", arabic: "جَبَل",
    pashquar: {
      njejes: { emerore: "një mal", gjinore: "i/e një mali", dhanore: "një mali", kallezore: "një mal", rrjedhore: "prej një mali" },
      shumes: { emerore: "disa male", gjinore: "i/e disa maleve", dhanore: "disa maleve", kallezore: "disa male", rrjedhore: "prej disa maleve" },
    },
    shquar: {
      njejes: { emerore: "mali", gjinore: "i malit", dhanore: "malit", kallezore: "malin", rrjedhore: "prej malit" },
      shumes: { emerore: "malet", gjinore: "i maleve", dhanore: "maleve", kallezore: "malet", rrjedhore: "prej maleve" },
    },
  },
  {
    noun: "shkollë", gender: "femërore", meaning: "school", arabic: "مَدْرَسَة",
    pashquar: {
      njejes: { emerore: "një shkollë", gjinore: "i/e një shkolle", dhanore: "një shkolle", kallezore: "një shkollë", rrjedhore: "prej një shkolle" },
      shumes: { emerore: "disa shkolla", gjinore: "i/e disa shkollave", dhanore: "disa shkollave", kallezore: "disa shkolla", rrjedhore: "prej disa shkollave" },
    },
    shquar: {
      njejes: { emerore: "shkolla", gjinore: "i shkollës", dhanore: "shkollës", kallezore: "shkollën", rrjedhore: "prej shkollës" },
      shumes: { emerore: "shkollat", gjinore: "i shkollave", dhanore: "shkollave", kallezore: "shkollat", rrjedhore: "prej shkollave" },
    },
  },
  {
    noun: "fletore", gender: "femërore", meaning: "notebook", arabic: "دَفْتَر",
    pashquar: {
      njejes: { emerore: "një fletore", gjinore: "i/e një fletoreje", dhanore: "një fletoreje", kallezore: "një fletore", rrjedhore: "prej një fletoreje" },
      shumes: { emerore: "disa fletore", gjinore: "i/e disa fletoreve", dhanore: "disa fletoreve", kallezore: "disa fletore", rrjedhore: "prej disa fletoreve" },
    },
    shquar: {
      njejes: { emerore: "fletorja", gjinore: "i fletores", dhanore: "fletores", kallezore: "fletoren", rrjedhore: "prej fletores" },
      shumes: { emerore: "fletoret", gjinore: "i fletoreve", dhanore: "fletoreve", kallezore: "fletoret", rrjedhore: "prej fletoreve" },
    },
  },
];

// ─── ENGLISH NOUNS (cases approximate) ───────────────────────────────────────
const ENGLISH_NOUNS = [
  {
    noun: "book", gender: "neutral", meaning: "libër / كِتَاب",
    singular: { nominative: "book (a book)", possessive: "book's", objective: "book", prepositional: "of/from a book" },
    plural:   { nominative: "books", possessive: "books'", objective: "books", prepositional: "of/from books" },
    definite: { singular: "the book", plural: "the books" },
  },
  {
    noun: "teacher", gender: "common", meaning: "mësues / مُعَلِّم",
    singular: { nominative: "teacher (a teacher)", possessive: "teacher's", objective: "teacher", prepositional: "of/from a teacher" },
    plural:   { nominative: "teachers", possessive: "teachers'", objective: "teachers", prepositional: "of/from teachers" },
    definite: { singular: "the teacher", plural: "the teachers" },
  },
  {
    noun: "city", gender: "neutral", meaning: "qytet / مَدِينَة",
    singular: { nominative: "city (a city)", possessive: "city's", objective: "city", prepositional: "of/from a city" },
    plural:   { nominative: "cities", possessive: "cities'", objective: "cities", prepositional: "of/from cities" },
    definite: { singular: "the city", plural: "the cities" },
  },
];

// ─── ARABIC NOUNS (إعراب) ─────────────────────────────────────────────────────
const ARABIC_NOUNS = [
  {
    noun: "كِتَاب", meaning: "libër / book", transliteration: "kitaab",
    nakerah: {
      mufrad: { rafe: "كِتَابٌ", nasb: "كِتَابًا", jarr: "كِتَابٍ" },
      jama:   { rafe: "كُتُبٌ", nasb: "كُتُبًا", jarr: "كُتُبٍ" },
    },
    marifah: {
      mufrad: { rafe: "الكِتَابُ", nasb: "الكِتَابَ", jarr: "الكِتَابِ" },
      jama:   { rafe: "الكُتُبُ", nasb: "الكُتُبَ", jarr: "الكُتُبِ" },
    },
  },
  {
    noun: "مُعَلِّم", meaning: "mësues / teacher", transliteration: "mu'allim",
    nakerah: {
      mufrad: { rafe: "مُعَلِّمٌ", nasb: "مُعَلِّمًا", jarr: "مُعَلِّمٍ" },
      jama:   { rafe: "مُعَلِّمُونَ", nasb: "مُعَلِّمِينَ", jarr: "مُعَلِّمِينَ" },
    },
    marifah: {
      mufrad: { rafe: "الْمُعَلِّمُ", nasb: "الْمُعَلِّمَ", jarr: "الْمُعَلِّمِ" },
      jama:   { rafe: "الْمُعَلِّمُونَ", nasb: "الْمُعَلِّمِينَ", jarr: "الْمُعَلِّمِينَ" },
    },
  },
  {
    noun: "مَدِينَة", meaning: "qytet / city", transliteration: "madiinah",
    nakerah: {
      mufrad: { rafe: "مَدِينَةٌ", nasb: "مَدِينَةً", jarr: "مَدِينَةٍ" },
      jama:   { rafe: "مُدُنٌ", nasb: "مُدُنًا", jarr: "مُدُنٍ" },
    },
    marifah: {
      mufrad: { rafe: "الْمَدِينَةُ", nasb: "الْمَدِينَةَ", jarr: "الْمَدِينَةِ" },
      jama:   { rafe: "الْمُدُنُ", nasb: "الْمُدُنَ", jarr: "الْمُدُنِ" },
    },
  },
];

const RASAS = [
  { key: "emerore",   label: "Emërore",   question: "kush? cili?",        color: "bg-emerald-100 text-emerald-800", arColor: "bg-emerald-100 text-emerald-800" },
  { key: "gjinore",   label: "Gjinore",   question: "i/e kujt? i cilit?", color: "bg-blue-100 text-blue-800",     arColor: "bg-blue-100 text-blue-800" },
  { key: "dhanore",   label: "Dhanore",   question: "kujt? cilit?",       color: "bg-purple-100 text-purple-800", arColor: "bg-purple-100 text-purple-800" },
  { key: "kallezore", label: "Kallëzore", question: "kë? cilin?",         color: "bg-amber-100 text-amber-800",   arColor: "bg-amber-100 text-amber-800" },
  { key: "rrjedhore", label: "Rrjedhore", question: "prej kujt?",         color: "bg-red-100 text-red-800",       arColor: "bg-red-100 text-red-800" },
];

function speak(text, lang = "sq-AL") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

// ─── SHQIP TABLE ──────────────────────────────────────────────────────────────
function ShqipDeclensionTable({ noun }) {
  const [trajta, setTrajta] = useState("pashquar");
  const data = noun[trajta];
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {[{ k: "pashquar", l: "Trajta e Pashquar" }, { k: "shquar", l: "Trajta e Shquar" }].map(t => (
          <button key={t.k} onClick={() => setTrajta(t.k)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all ${trajta === t.k ? "border-emerald-500 bg-emerald-600 text-white" : "border-gray-200 bg-white text-gray-600"}`}>
            {t.l}
          </button>
        ))}
      </div>
      {/* Gender badge */}
      <div className="mb-3">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${noun.gender === "mashkullore" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}>
          {noun.gender === "mashkullore" ? "♂ Gjinia Mashkullore (KY, AI)" : "♀ Gjinia Femërore (KJO, AJO)"}
        </span>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Rasa</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Pyetja</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Njëjës</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Shumës</th>
              <th className="px-4 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {RASAS.map((r, i) => (
              <tr key={r.key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.color}`}>{r.label}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 italic">{r.question}</td>
                <td className="px-4 py-3 font-bold text-emerald-700">{data.njejes[r.key]}</td>
                <td className="px-4 py-3 font-bold text-teal-700">{data.shumes[r.key]}</td>
                <td className="px-4 py-3">
                  <button onClick={() => speak(data.njejes[r.key], "sq-AL")}
                    className="w-7 h-7 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-700"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ENGLISH TABLE ─────────────────────────────────────────────────────────────
function EnglishDeclensionTable({ noun }) {
  const rows = [
    { label: "Nominative", sub: "subject", sg: noun.singular.nominative, pl: noun.plural.nominative },
    { label: "Possessive / Genitive", sub: "'s", sg: noun.singular.possessive, pl: noun.plural.possessive },
    { label: "Objective", sub: "object", sg: noun.singular.objective, pl: noun.plural.objective },
    { label: "Prepositional", sub: "of, from", sg: noun.singular.prepositional, pl: noun.plural.prepositional },
    { label: "Definite", sub: "the", sg: noun.definite.singular, pl: noun.definite.plural },
  ];
  const colors = ["bg-emerald-100 text-emerald-800","bg-blue-100 text-blue-800","bg-amber-100 text-amber-800","bg-purple-100 text-purple-800","bg-teal-100 text-teal-800"];
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <th className="px-4 py-3 text-left text-xs font-bold uppercase">Case / Form</th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase">Use</th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase">Singular</th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase">Plural</th>
            <th className="px-4 py-3 w-8"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
              <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[i]}`}>{r.label}</span></td>
              <td className="px-4 py-3 text-xs text-gray-400 italic">{r.sub}</td>
              <td className="px-4 py-3 font-bold text-blue-700">{r.sg}</td>
              <td className="px-4 py-3 font-bold text-indigo-700">{r.pl}</td>
              <td className="px-4 py-3"><button onClick={() => speak(r.sg, "en-GB")} className="w-7 h-7 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center"><Volume2 className="w-3.5 h-3.5 text-blue-700"/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── ARABIC TABLE (إعراب) ─────────────────────────────────────────────────────
function ArabicDeclensionTable({ noun }) {
  const [type, setType] = useState("nakerah");
  const data = noun[type];
  const rows = [
    { label: "الرَّفْع", sub: "rafe — kryefjala", key: "rafe", color: "bg-emerald-100 text-emerald-800" },
    { label: "النَّصْب", sub: "nasb — kundrinori", key: "nasb", color: "bg-amber-100 text-amber-800" },
    { label: "الجَرّ",  sub: "jarr — me parafjalë", key: "jarr", color: "bg-purple-100 text-purple-800" },
  ];
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {[{ k: "nakerah", l: "النَّكِرَة — e Pashquar" }, { k: "marifah", l: "الْمَعْرِفَة — e Shquar" }].map(t => (
          <button key={t.k} onClick={() => setType(t.k)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all ${type === t.k ? "border-amber-500 bg-amber-600 text-white" : "border-gray-200 bg-white text-gray-600"}`}>
            <span className="arabic-text">{t.l.split("—")[0]}</span> <span className="text-xs font-normal">— {t.l.split("—")[1]}</span>
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <th className="px-4 py-3 text-right text-xs font-bold uppercase arabic-text">الإعراب</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Shqip</th>
              <th className="px-4 py-3 text-right text-sm font-bold arabic-text">الْمُفْرَد</th>
              <th className="px-4 py-3 text-right text-sm font-bold arabic-text">الْجَمْع</th>
              <th className="px-4 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.key} className={i % 2 === 0 ? "bg-white" : "bg-amber-50/40"}>
                <td className="px-4 py-3 text-right"><span className={`text-xs font-bold px-2 py-0.5 rounded-full arabic-text ${r.color}`}>{r.label}</span></td>
                <td className="px-4 py-3 text-xs text-gray-400 italic">{r.sub}</td>
                <td className="px-4 py-3 font-bold text-amber-800 text-xl text-right arabic-text">{data.mufrad[r.key]}</td>
                <td className="px-4 py-3 font-bold text-orange-800 text-xl text-right arabic-text">{data.jama[r.key]}</td>
                <td className="px-4 py-3">
                  <button onClick={() => speak(data.mufrad[r.key], "ar-SA")} className="w-7 h-7 bg-amber-100 hover:bg-amber-200 rounded-lg flex items-center justify-center">
                    <Volume2 className="w-3.5 h-3.5 text-amber-700"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function NounQuiz({ lang }) {
  const nouns = lang === "sq" ? SHQIP_NOUNS : lang === "en" ? ENGLISH_NOUNS : ARABIC_NOUNS;
  const [q, setQ] = useState(null);
  const [ans, setAns] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ ok: 0, total: 0 });

  const gen = () => {
    if (lang === "sq") {
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const trajta = Math.random() > 0.5 ? "pashquar" : "shquar";
      const num = Math.random() > 0.5 ? "njejes" : "shumes";
      const rasa = RASAS[Math.floor(Math.random() * RASAS.length)];
      const correct = noun[trajta][num][rasa.key];
      setQ({ label: `"${noun.noun}" — trajta ${trajta}, ${num}, ${rasa.label}`, correct });
    } else if (lang === "en") {
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const cases = [
        { l: `"${noun.noun}" — Singular Nominative`, c: noun.singular.nominative },
        { l: `"${noun.noun}" — Plural Nominative`, c: noun.plural.nominative },
        { l: `"${noun.noun}" — Singular Possessive`, c: noun.singular.possessive },
        { l: `"${noun.noun}" — Definite Singular`, c: noun.definite.singular },
      ];
      const pick = cases[Math.floor(Math.random() * cases.length)];
      setQ({ label: pick.l, correct: pick.c });
    } else {
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const type = Math.random() > 0.5 ? "nakerah" : "marifah";
      const num = Math.random() > 0.5 ? "mufrad" : "jama";
      const irab = ["rafe","nasb","jarr"][Math.floor(Math.random() * 3)];
      const correct = noun[type][num][irab];
      const typelabel = type === "nakerah" ? "نَكِرَة" : "مَعْرِفَة";
      const numlabel = num === "mufrad" ? "مُفْرَد" : "جَمْع";
      setQ({ label: `"${noun.noun}" (${typelabel}، ${numlabel}، ${irab})`, correct });
    }
    setAns(""); setResult(null);
  };

  const check = () => {
    const ok = ans.trim() === q.correct.trim();
    setResult({ ok, correct: q.correct });
    setScore(s => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }));
  };

  if (!q) return (
    <button onClick={gen} className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-bold text-sm shadow-md">
      🎯 Fillo Kuizin e Lakimit
    </button>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">🎯 Kuizi i Lakimit</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-emerald-600">✓ {score.ok}/{score.total}</span>
          <button onClick={() => setQ(null)} className="text-gray-400 text-lg">✕</button>
        </div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 mb-4 border border-purple-100">
        <p className="text-sm text-gray-700 font-semibold text-center">{q.label}</p>
      </div>
      <div className="flex gap-2 mb-3">
        <input type="text" value={ans} onChange={e => setAns(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !result && ans.trim() && check()}
          placeholder="Shkruaj formën e saktë..."
          className={`flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 ${lang === "ar" ? "arabic-text text-right text-base" : ""}`}
          disabled={!!result} dir={lang === "ar" ? "rtl" : "ltr"}/>
        {!result ? (
          <button onClick={check} disabled={!ans.trim()} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40">✓</button>
        ) : (
          <button onClick={gen} className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold">→</button>
        )}
      </div>
      {result && (
        <div className={`rounded-xl p-3 text-sm font-semibold ${result.ok ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {result.ok ? "✅ Saktë! Bravo!" : <span>❌ E sakta: <span className={lang === "ar" ? "arabic-text text-base" : ""}>{result.correct}</span></span>}
        </div>
      )}
    </div>
  );
}

// ─── AI DECLENSION (custom word) ──────────────────────────────────────────────
function CustomNounForm({ lang, onResult }) {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generate = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { base44 } = await import("@/api/base44Client");
      const langLabel = lang === "sq" ? "Albanian (shqip)" : lang === "en" ? "English" : "Arabic";
      let schema;
      if (lang === "sq") {
        schema = {
          type: "object",
          properties: {
            gender: { type: "string" },
            pashquar: {
              type: "object",
              properties: {
                njejes: { type: "object", properties: { emerore: {type:"string"}, gjinore: {type:"string"}, dhanore: {type:"string"}, kallezore: {type:"string"}, rrjedhore: {type:"string"} } },
                shumes: { type: "object", properties: { emerore: {type:"string"}, gjinore: {type:"string"}, dhanore: {type:"string"}, kallezore: {type:"string"}, rrjedhore: {type:"string"} } },
              }
            },
            shquar: {
              type: "object",
              properties: {
                njejes: { type: "object", properties: { emerore: {type:"string"}, gjinore: {type:"string"}, dhanore: {type:"string"}, kallezore: {type:"string"}, rrjedhore: {type:"string"} } },
                shumes: { type: "object", properties: { emerore: {type:"string"}, gjinore: {type:"string"}, dhanore: {type:"string"}, kallezore: {type:"string"}, rrjedhore: {type:"string"} } },
              }
            }
          }
        };
      } else if (lang === "en") {
        schema = {
          type: "object",
          properties: {
            singular: { type: "object", properties: { nominative:{type:"string"}, possessive:{type:"string"}, objective:{type:"string"}, prepositional:{type:"string"} } },
            plural: { type: "object", properties: { nominative:{type:"string"}, possessive:{type:"string"}, objective:{type:"string"}, prepositional:{type:"string"} } },
            definite: { type: "object", properties: { singular:{type:"string"}, plural:{type:"string"} } },
          }
        };
      } else {
        schema = {
          type: "object",
          properties: {
            nakerah: { type: "object", properties: {
              mufrad: { type: "object", properties: { rafe:{type:"string"}, nasb:{type:"string"}, jarr:{type:"string"} } },
              jama: { type: "object", properties: { rafe:{type:"string"}, nasb:{type:"string"}, jarr:{type:"string"} } },
            }},
            marifah: { type: "object", properties: {
              mufrad: { type: "object", properties: { rafe:{type:"string"}, nasb:{type:"string"}, jarr:{type:"string"} } },
              jama: { type: "object", properties: { rafe:{type:"string"}, nasb:{type:"string"}, jarr:{type:"string"} } },
            }},
          }
        };
      }
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Provide the full noun declension for the ${langLabel} word: "${word}". Fill all forms correctly according to grammar rules.`,
        response_json_schema: schema
      });
      setResult({ noun: word.trim(), meaning: `(${word.trim()})`, ...res, ...(lang === "sq" ? { gender: res.gender || "mashkullore" } : {}) });
      onResult && onResult({ noun: word.trim(), meaning: `(${word.trim()})`, ...res });
    } catch(e) {
      setResult({ error: e.message });
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-4 mb-4">
      <p className="text-xs font-bold text-indigo-700 mb-2">✨ Provo me fjalën tënde (AI):</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={word}
          onChange={e => setWord(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !loading && generate()}
          placeholder={lang === "ar" ? "أدخل كلمة..." : lang === "en" ? "Enter a word..." : "Shkruaj emrin..."}
          className={`flex-1 border border-indigo-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${lang === "ar" ? "arabic-text text-right" : ""}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
        <button onClick={generate} disabled={!word.trim() || loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold disabled:opacity-40 transition-all">
          {loading ? "⏳" : "→"}
        </button>
      </div>
      {result?.error && <p className="text-red-500 text-xs mt-2">{result.error}</p>}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const LANG_OPTS2 = [
  { value: "sq", label: "🇦🇱 Shqip" },
  { value: "en", label: "🇬🇧 Anglisht" },
  { value: "ar", label: "🇸🇦 Arabisht" },
];

export default function NounDeclensionView({ sharedLang }) {
  const [activeLang, setActiveLang] = useState("sq");
  const [sqNoun, setSqNoun] = useState(SHQIP_NOUNS[0]);
  const [enNoun, setEnNoun] = useState(ENGLISH_NOUNS[0]);
  const [arNoun, setArNoun] = useState(ARABIC_NOUNS[0]);
  const [showQuiz, setShowQuiz] = useState(false);

  const nouns = activeLang === "sq" ? SHQIP_NOUNS : activeLang === "en" ? ENGLISH_NOUNS : ARABIC_NOUNS;
  const current = activeLang === "sq" ? sqNoun : activeLang === "en" ? enNoun : arNoun;
  const setCurrent = activeLang === "sq" ? setSqNoun : activeLang === "en" ? setEnNoun : setArNoun;

  const handleCustomResult = (data) => {
    if (activeLang === "sq") setSqNoun(data);
    else if (activeLang === "en") setEnNoun(data);
    else setArNoun(data);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h2 className="text-lg font-extrabold text-gray-900 mb-1">📘 Lakimi i Emrit</h2>
        <p className="text-sm text-gray-500 mb-2">Pesë rasat e shqipes • English noun forms • الإعراب العربي</p>
        {/* Language selector */}
        <div className="flex gap-2 mb-4">
          {LANG_OPTS2.map(l => (
            <button key={l.value} onClick={() => setActiveLang(l.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${activeLang === l.value ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"}`}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Info boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 text-xs text-emerald-800">
            <strong>🇦🇱 Shqip — 5 Rasa:</strong><br/>Emërore, Gjinore, Dhanore, Kallëzore, Rrjedhore<br/>
            <span className="text-gray-500">+ Gjinia (m/f) + Trajta (e/pa shquar) + Numri (nj/sh)</span>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-xs text-blue-800">
            <strong>🇬🇧 English — Cases:</strong><br/>Nominative, Possessive, Objective, Prepositional<br/>
            <span className="text-gray-500">+ Definite (the) / Indefinite (a/an) + Plural</span>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-xs text-amber-800">
            <strong>🇸🇦 Arabisht — الإعراب:</strong><br/>الرَّفْع (rafe) · النَّصْب (nasb) · الجَرّ (jarr)<br/>
            <span className="text-gray-500">+ النَّكِرَة (pashquar) / المَعْرِفَة (shquar) + مُفْرَد/جَمْع</span>
          </div>
        </div>

        {/* Custom word input */}
        <CustomNounForm lang={activeLang} onResult={handleCustomResult} />

        {/* Noun selector */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">Ose zgjidhni nga lista:</p>
          <div className="flex flex-wrap gap-2">
            {nouns.map(n => (
              <button key={n.noun} onClick={() => setCurrent(n)}
                className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${current.noun === n.noun ? "border-emerald-500 bg-emerald-600 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                <span className={activeLang === "ar" ? "arabic-text text-base" : ""}>{n.noun}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Noun info */}
        <div className={`rounded-xl p-4 mb-5 flex items-center justify-between ${activeLang === "sq" ? "bg-emerald-50 border border-emerald-100" : activeLang === "en" ? "bg-blue-50 border border-blue-100" : "bg-amber-50 border border-amber-100"}`}>
          <div>
            <p className={`text-2xl font-extrabold ${activeLang === "sq" ? "text-emerald-800" : activeLang === "en" ? "text-blue-800" : "text-amber-800 arabic-text"}`}>{current.noun}</p>
            <p className="text-sm text-gray-600 mt-0.5">{current.meaning}</p>
            {activeLang === "sq" && <p className="text-xs text-gray-400 mt-0.5 arabic-text">{current.arabic}</p>}
            {activeLang === "ar" && <p className="text-xs text-gray-400 italic mt-0.5">{current.transliteration}</p>}
          </div>
          <button onClick={() => speak(current.noun, activeLang === "sq" ? "sq-AL" : activeLang === "en" ? "en-GB" : "ar-SA")}
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${activeLang === "sq" ? "bg-emerald-100 hover:bg-emerald-200" : activeLang === "en" ? "bg-blue-100 hover:bg-blue-200" : "bg-amber-100 hover:bg-amber-200"}`}>
            <Volume2 className={`w-5 h-5 ${activeLang === "sq" ? "text-emerald-700" : activeLang === "en" ? "text-blue-700" : "text-amber-700"}`}/>
          </button>
        </div>

        {activeLang === "sq" && <ShqipDeclensionTable noun={sqNoun}/>}
        {activeLang === "en" && <EnglishDeclensionTable noun={enNoun}/>}
        {activeLang === "ar" && <ArabicDeclensionTable noun={arNoun}/>}

        <button onClick={() => setShowQuiz(q => !q)}
          className="mt-5 w-full py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white rounded-2xl font-bold text-sm shadow-md">
          🎯 {showQuiz ? "Mbyll Kuizin" : "Fillo Kuizin e Lakimit"}
        </button>
      </div>
      {showQuiz && <NounQuiz lang={activeLang}/>}
    </div>
  );
}