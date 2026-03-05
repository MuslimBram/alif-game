import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Info, ChevronDown, ChevronUp } from "lucide-react";

const speak = (text, lang) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "arabisht" ? "ar-SA" : lang === "anglisht" ? "en-GB" : "sq-AL";
  u.rate = 0.7;
  window.speechSynthesis.speak(u);
};

// ─── SHQIP ────────────────────────────────────────────────────────────────
const SHQIP_GRAMMAR = {
  gjinia: {
    title: "Gjinia (Mashkullore / Femërore)",
    icon: "⚥",
    color: "bg-emerald-50 border-emerald-200",
    explanation: "Emrat shqip kanë dy gjini: mashkullore dhe femërore. Femërorja zakonisht formohet me prapashtesën -ë ose -a.",
    interactive: {
      label: "Ndërro gjininë:",
      pairs: [
        { m: { word: "mësuesi", note: "mashk." }, f: { word: "mësuesja", note: "fem." }, meaning: "mësuesi/ja" },
        { m: { word: "studenti", note: "mashk." }, f: { word: "studentia", note: "fem." }, meaning: "studenti/ja" },
        { m: { word: "fëmija", note: "mashk." }, f: { word: "fëmija", note: "fem. (njëjtë)" }, meaning: "fëmija" },
        { m: { word: "djali", note: "mashk." }, f: { word: "vajza", note: "fem." }, meaning: "djali/vajza" },
      ]
    },
    rules: [
      "Shumë emra mashk. mbarojnë me zanore + i: libri, djali, burri",
      "Emrat femërorë shpesh mbarojnë me -ë: vajzë, grua, motër",
      "Mbiemrat pajtohen me gjininë: libër i mirë / grua e mirë",
    ]
  },
  numri: {
    title: "Numri (Njëjës / Shumës)",
    icon: "🔢",
    color: "bg-blue-50 border-blue-200",
    explanation: "Shumësi në shqip formohet me mbaresa të ndryshme: -e, -a, -ë, -ra, -nj etj.",
    interactive: {
      label: "Shiko shumësin:",
      pairs: [
        { s: { word: "libër", note: "njëjës" }, p: { word: "libra", note: "shumës" }, meaning: "libër/libra" },
        { s: { word: "vajzë", note: "njëjës" }, p: { word: "vajza", note: "shumës" }, meaning: "vajzë/vajza" },
        { s: { word: "zog", note: "njëjës" }, p: { word: "zogj", note: "shumës" }, meaning: "zog/zogj" },
        { s: { word: "fëmijë", note: "njëjës" }, p: { word: "fëmijë", note: "shumës (njëjtë)" }, meaning: "fëmijë" },
        { s: { word: "mik", note: "njëjës" }, p: { word: "miq", note: "shumës" }, meaning: "mik/miq" },
      ]
    },
    rules: [
      "-ë → -a: vajzë → vajza",
      "konsonant → +e: mal → male",
      "-ër → -ra: libër → libra",
      "k/g → q/gj: mik → miq, zog → zogj",
    ]
  },
  rasat: {
    title: "Rasat (Lakimi i Emrit)",
    icon: "📐",
    color: "bg-amber-50 border-amber-200",
    explanation: "Shqipja ka 5 rasa: Emërore, Gjinore, Dhanore, Kallëzore, Rrjedhore. Çdo rasë tregon funksionin e emrit në fjali.",
    interactive: {
      label: "Kliko rasën:",
      word: "djalë",
      declension: [
        { rasa: "Emërore", form: "djali", usage: "Kush? — Djali shkon." },
        { rasa: "Gjinore", form: "djalit", usage: "I kujt? — Libri i djalit." },
        { rasa: "Dhanore", form: "djalit", usage: "Kujt? — I jap djalit." },
        { rasa: "Kallëzore", form: "djalin", usage: "Kë? — Shoh djalin." },
        { rasa: "Rrjedhore", form: "djalit", usage: "Prej kujt? — Prej djalit." },
      ]
    },
    rules: [
      "Emërorja: subjekti kryesor i fjalisë",
      "Gjinorja: tregon përkatësi (i/e/të/së)",
      "Dhanorja = Gjinorja për shumicën e emrave",
      "Kallëzorja: objekti direkt i foljes",
    ]
  }
};

// ─── ANGLISHT ─────────────────────────────────────────────────────────────
const ANGLISHT_GRAMMAR = {
  articles: {
    title: "Nyjat (A / An / The)",
    icon: "📌",
    color: "bg-sky-50 border-sky-200",
    explanation: "Anglishtja ka nyje të pacaktuar (a/an) dhe të caktuar (the). Nuk ka gjini gramatikore.",
    interactive: {
      label: "Provoni nyjat:",
      pairs: [
        { s: { word: "a cat", note: "konsonant" }, p: { word: "the cat", note: "e caktuar" }, meaning: "macja" },
        { s: { word: "an apple", note: "zanore" }, p: { word: "the apple", note: "e caktuar" }, meaning: "molla" },
        { s: { word: "a university", note: "ju-: konsonant" }, p: { word: "an hour", note: "ou-: zanore" }, meaning: "shembuj" },
      ]
    },
    rules: [
      "a + konsonant: a dog, a book, a cat",
      "an + zanore (a,e,i,o,u): an egg, an orange",
      "the: i/e njohur nga konteksti",
      "Asnjë nyje: emra abstrakt (love, water, music)",
    ]
  },
  numri: {
    title: "Shumësi i Emrave",
    icon: "🔢",
    color: "bg-indigo-50 border-indigo-200",
    explanation: "Shumësi formohet kryesisht me +(e)s, por ka shumë forma të parregullta.",
    interactive: {
      label: "Shiko shumësin:",
      pairs: [
        { s: { word: "book", note: "rregullt" }, p: { word: "books", note: "+s" }, meaning: "libër/libra" },
        { s: { word: "church", note: "rregullt" }, p: { word: "churches", note: "+es" }, meaning: "kishë/kisha" },
        { s: { word: "child", note: "parregullt" }, p: { word: "children", note: "ndryshim" }, meaning: "fëmijë" },
        { s: { word: "man", note: "parregullt" }, p: { word: "men", note: "ndryshim zanore" }, meaning: "burrë/burra" },
        { s: { word: "sheep", note: "njëjtë" }, p: { word: "sheep", note: "pa ndryshim" }, meaning: "dele/dele" },
      ]
    },
    rules: [
      "+s: dogs, cats, books (rregulla bazë)",
      "+es: churches, boxes, buses (ch, sh, x, ss, o)",
      "y→ies: city→cities (konsonant+y)",
      "Parregullt: man→men, woman→women, child→children",
    ]
  },
  kohet: {
    title: "Kohët Kryesore të Foljes",
    icon: "⏰",
    color: "bg-purple-50 border-purple-200",
    explanation: "Anglishtja ka 12 kohë, por 3 kryesoret janë: e tashme, e shkuara e thjeshtë, e ardhmja.",
    interactive: {
      label: "Shiko ndryshimin:",
      word: "to go (shkoj)",
      declension: [
        { rasa: "Present Simple", form: "I go / She goes", usage: "Zakonisht, çdo ditë" },
        { rasa: "Past Simple", form: "I went / She went", usage: "Ngjarje e kryer (parregullt)" },
        { rasa: "Present Cont.", form: "I am going", usage: "Tani, në këtë moment" },
        { rasa: "Future (will)", form: "I will go", usage: "Vendim spontan" },
        { rasa: "Future (going to)", form: "I am going to go", usage: "Plan i planifikuar" },
      ]
    },
    rules: [
      "Present simple: He/She/It + verb+s (she goes)",
      "Past simple rregullt: verb+ed (walked, played)",
      "Past simple parregullt: go→went, see→saw",
      "Continuous: be + verb+ing (is going, was going)",
    ]
  }
};

// ─── ARABISHT ─────────────────────────────────────────────────────────────
const ARABISHT_GRAMMAR = {
  fatha_rules: {
    title: "🔴 Kur fatha lexohet 'A' dhe jo 'E'",
    icon: "🔠",
    color: "bg-orange-50 border-orange-200",
    explanation: "Fatha normalisht lexohet si 'e' (e shkurtër). Por pas disa germave TRASHA (حروف مستعلية) dhe germës R (ر), fatha lexohet si 'A' e hapur dhe e ngrohtë.",
    interactive: {
      label: "Krahaso shqiptimin:",
      pairs: [
        { s: { word: "بَ", note: "Ba → 'be'" }, p: { word: "رَ", note: "Ra → 'RA' (e hapur!)" }, meaning: "b vs R" },
        { s: { word: "كَ", note: "Ka → 'ke'" }, p: { word: "طَ", note: "Taa → 'TA'" }, meaning: "k vs ط" },
        { s: { word: "نَ", note: "Na → 'ne'" }, p: { word: "صَ", note: "Saad → 'SA'" }, meaning: "n vs ص" },
        { s: { word: "لَ", note: "La → 'le'" }, p: { word: "ظَ", note: "Dhaa → 'DHA'" }, meaning: "l vs ظ" },
        { s: { word: "مَ", note: "Ma → 'me'" }, p: { word: "ضَ", note: "Daad → 'DA'" }, meaning: "m vs ض" },
        { s: { word: "تَ", note: "Ta → 'te'" }, p: { word: "قَ", note: "Qaaf → 'QA'" }, meaning: "t vs ق" },
      ]
    },
    rules: [
      "Germët trasha (مستعلية): ص ض ط ظ خ غ ق — fatha = 'A'",
      "Germa ر (Ra): gjithmonë fatha = 'RA' e ngrohtë",
      "Germa ع (Ayn): fatha merr ngjyrë të ngrohtë = 'A'",
      "Germa ح (Ha e thellë): fatha = 'HA' e ngrohtë",
      "Pas germave të buta (ب ت ن م لـ): fatha = 'e' e lehtë",
      "Shembull: رَحْمَن → Ra-HMA-n (jo 're-hme-n'!)",
    ],
    arabic_examples: [
      { ar: "رَحْمَن", trans: "Rahmaan", note: "R+ط trasha → AA" },
      { ar: "صَلَاة", trans: "Salaah", note: "ص → SA (jo 'se')" },
      { ar: "طَالِب", trans: "Taalib", note: "ط → TA e plotë" },
      { ar: "قَلَم", trans: "Qalam", note: "ق → QA e thellë" },
      { ar: "بَاب", trans: "Baab", note: "ب → 'be' (e lehtë)" },
      { ar: "ضَرَب", trans: "Daraba", note: "ض → DA (RA gjith. A!)" },
    ]
  },
  gjinia: {
    title: "Gjinia Gramatikore (مذكر / مؤنث)",
    icon: "⚥",
    color: "bg-rose-50 border-rose-200",
    explanation: "Arabishtja ka dy gjini: Mashkullore (مذكر) dhe Femërore (مؤنث). Femërorja zakonisht shënohet me Ta Marbuta (ة) në fund.",
    interactive: {
      label: "Ndërro gjininë:",
      pairs: [
        { s: { word: "مُعَلِّم", note: "mësuesi (mashk.)" }, p: { word: "مُعَلِّمَة", note: "mësuesja (fem. +ة)" }, meaning: "mësues" },
        { s: { word: "طَالِب", note: "student (mashk.)" }, p: { word: "طَالِبَة", note: "studente (fem. +ة)" }, meaning: "student" },
        { s: { word: "كَبِير", note: "i madh (mashk.)" }, p: { word: "كَبِيرَة", note: "e madhe (fem. +ة)" }, meaning: "madh" },
        { s: { word: "مَلِك", note: "mbret (mashk.)" }, p: { word: "مَلِكَة", note: "mbretëreshë (fem.)" }, meaning: "mbret/eshë" },
      ]
    },
    rules: [
      "Femërorja: +ة (Ta Marbuta) — lexohet -a veças, -at kur lidhet",
      "Mbiemrat pajtohen me gjininë e emrit",
      "كِتَاب كَبِير (libër i madh) / مَكْتَبَة كَبِيرَة (bibliotekë e madhe)",
      "Disa emra femërorë pa ة: شَمْس (diell), أَرْض (tokë)",
    ]
  },
  numri: {
    title: "Numri: Njëjës, Dyshe, Shumës",
    icon: "🔢",
    color: "bg-cyan-50 border-cyan-200",
    explanation: "Arabishtja ka 3 numra: njëjës (مفرد), dyshe (مثنى — vetëm 2), dhe shumës (جمع — 3+).",
    interactive: {
      label: "Shiko format:",
      word: "kitaab (libër)",
      declension: [
        { rasa: "Njëjës (مفرد)", form: "كِتَابٌ", usage: "Kitaabun — një libër" },
        { rasa: "Dyshe (مثنى)", form: "كِتَابَانِ", usage: "Kitaabaani — dy libra (emërorja)" },
        { rasa: "Dyshe (kallëzore)", form: "كِتَابَيْنِ", usage: "Kitaabayni — dy libra (kallëz.)" },
        { rasa: "Shumës (جمع سالم)", form: "كُتُبٌ", usage: "Kutubun — shumë libra (i thyer)" },
        { rasa: "Fem. shumës i rregullt", form: "مُعَلِّمَاتٌ", usage: "Mu'allimaatun — mësuese (shumës +ات)" },
        { rasa: "Mashk. shumës i rregullt", form: "مُعَلِّمُونَ", usage: "Mu'allimuuna — mësues (shumës +ون)" },
      ]
    },
    rules: [
      "Dyshe: +اَن (emërorja) / +يَن (gjinorja/kallëzorja)",
      "Shumës i rregullt femëror: +اَت (mu'allimaat)",
      "Shumës i rregullt mashkullor: +ون/ين (mu'allimuun)",
      "Shumës i thyer: ndryshon zanore brenda (kitaab → kutub)",
    ]
  }
};

const GRAMMAR_DATA = {
  shqip: SHQIP_GRAMMAR,
  anglisht: ANGLISHT_GRAMMAR,
  arabisht: ARABISHT_GRAMMAR,
};

function InteractivePairs({ data, language }) {
  const [selected, setSelected] = useState(null);
  if (!data) return null;

  if (data.pairs) {
    return (
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-3">{data.label}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {data.pairs.map((pair, i) => {
            const left = pair.m || pair.s;
            const right = pair.f || pair.p;
            const isSelected = selected === i;
            return (
              <button key={i} onClick={() => setSelected(isSelected ? null : i)}
                className={`rounded-2xl p-3 border-2 text-center transition-all ${isSelected ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white hover:border-emerald-300"}`}>
                <div className="flex justify-around items-center gap-2">
                  <div>
                    <div className={`font-bold ${language === "arabisht" ? "text-2xl" : "text-lg"} text-gray-900`}
                      style={language === "arabisht" ? { fontFamily:"serif", direction:"rtl" } : {}}>
                      {left.word}
                    </div>
                    <div className="text-xs text-gray-400">{left.note}</div>
                    <button onClick={(e)=>{e.stopPropagation(); speak(left.word, language)}}
                      className="text-gray-300 hover:text-emerald-500 mt-1"><Volume2 className="w-3 h-3 mx-auto" /></button>
                  </div>
                  <div className="text-gray-300 text-lg">→</div>
                  <div>
                    <div className={`font-bold ${language === "arabisht" ? "text-2xl" : "text-lg"} text-emerald-700`}
                      style={language === "arabisht" ? { fontFamily:"serif", direction:"rtl" } : {}}>
                      {right.word}
                    </div>
                    <div className="text-xs text-gray-400">{right.note}</div>
                    <button onClick={(e)=>{e.stopPropagation(); speak(right.word, language)}}
                      className="text-gray-300 hover:text-emerald-500 mt-1"><Volume2 className="w-3 h-3 mx-auto" /></button>
                  </div>
                </div>
                {isSelected && <div className="mt-2 text-xs text-emerald-600 font-medium">{pair.meaning}</div>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (data.declension) {
    return (
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-3">{data.label || "Kliko rasën/kohën:"}</p>
        <div className="space-y-2">
          {data.declension.map((d, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-left ${
                selected === i ? "border-emerald-400 bg-emerald-50" : "border-gray-100 bg-white hover:border-emerald-200"
              }`}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 w-28 shrink-0">{d.rasa}</span>
                <span className={`font-bold text-gray-900 ${language === "arabisht" ? "text-2xl" : "text-lg"}`}
                  style={language === "arabisht" ? { fontFamily:"serif", direction:"rtl" } : {}}>
                  {d.form}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selected === i && <span className="text-xs text-emerald-600 font-medium">{d.usage}</span>}
                <button onClick={(e)=>{ e.stopPropagation(); speak(d.form, language) }}
                  className="text-gray-300 hover:text-emerald-500 shrink-0"><Volume2 className="w-3.5 h-3.5" /></button>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function GrammarSection({ section, language }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${section.color} border rounded-2xl overflow-hidden`}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left hover:opacity-90 transition-opacity">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{section.icon}</span>
          <span className="font-bold text-gray-800 text-base">{section.title}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5 space-y-5">
              {/* Shpjegim */}
              <div className="bg-white/70 rounded-xl p-4 text-sm text-gray-700">{section.explanation}</div>

              {/* Interaktive */}
              {section.interactive && <InteractivePairs data={section.interactive} language={language} />}

              {/* Shembuj arabë specifikë */}
              {section.arabic_examples && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-3">Shembuj për të dëgjuar:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {section.arabic_examples.map((ex, i) => (
                      <button key={i} onClick={() => speak(ex.ar, "arabisht")}
                        className="bg-white border border-gray-100 rounded-xl p-3 text-center hover:shadow-md transition-all group">
                        <div className="text-2xl font-bold text-gray-900 mb-0.5" style={{ fontFamily:"serif", direction:"rtl" }}>{ex.ar}</div>
                        <div className="text-xs font-semibold text-emerald-700">{ex.trans}</div>
                        <div className="text-xs text-gray-400 italic">{ex.note}</div>
                        <Volume2 className="w-3 h-3 text-gray-300 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rregullat */}
              <div className="bg-white/60 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1"><Info className="w-3.5 h-3.5" /> Rregullat kryesore:</p>
                <ul className="space-y-1">
                  {section.rules.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span> {r}
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

export default function GrammarRulesView({ language }) {
  const data = GRAMMAR_DATA[language] || GRAMMAR_DATA.shqip;
  const langLabel = { shqip: "Shqip 🇦🇱", anglisht: "English 🇬🇧", arabisht: "Arabisht 🇸🇦" }[language];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1">📐 Gramatika Bazë — {langLabel}</h2>
        <p className="text-sm text-gray-500">Kliko çdo seksion për të mësuar rregullat dhe për të provuar shembujt interaktivë</p>
      </div>
      <div className="space-y-3">
        {Object.values(data).map((section, i) => (
          <GrammarSection key={i} section={section} language={language} />
        ))}
      </div>
    </div>
  );
}