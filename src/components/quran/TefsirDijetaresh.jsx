import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { downloadLinks } from "./downloadLinksConfig";

const TEFSIR_DATA = [
  {
    surah: "Al-Fatiha (1)",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    verse: "Lavdërimi i takon Allahut, Zotit të botëve.",
    tefsir: [
      {
        scholar: "Ibn Kethir",
        text: "Kjo sure quhet 'Umm Al-Kitab' (Nëna e Librit) dhe 'Umm Al-Quran'. Fjala 'Hamd' do të thotë lavdërim i plotë dhe falënderim ndaj Allahut për të gjitha dhuntitë. 'Rabb Al-Alemin' tregon se Allahu është Zot, Krijues dhe Mirëmbajtës i të gjitha krijesave — njerëzit, xhinët, engjëjt dhe të gjitha gjallesat.",
        source: "Tefsiru Ibn Kethir, Vëll. 1, f. 22"
      },
      {
        scholar: "Es-Sadi",
        text: "Sure Al-Fatiha përmban bazat e fesë islame: teuhidin (njësinë e Allahut), adhurimin e sinqertë dhe kërkimin e udhëzimit. Ajeti 'Iyyaka nabudu wa iyyaka nastainu' (Vetëm Ty të adhurojmë dhe vetëm Ty të kërkojmë ndihmë) është shtylla e adhurimit islam.",
        source: "Taisiru Al-Kerimi Ar-Rahman, f. 39"
      },
      {
        scholar: "Al-Qurtubi",
        text: "Dijetarët kanë rënë dakord se leximi i Al-Fatiha është farz (detyrim) në çdo rekat të namazit. Kjo sure ndahet midis robit dhe Zotit të tij — gjysma është falënderim dhe gjysma është lutje.",
        source: "Al-Xhami' li Ahkam Al-Quran, Vëll. 1, f. 110"
      }
    ]
  },
  {
    surah: "Ajetu'l-Kursi — Al-Baqarah 2:255",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    verse: "Allahu — nuk ka zot tjetër përveç Tij — i Gjalli, Mbajtësi i gjithçkaje.",
    tefsir: [
      {
        scholar: "Ibn Kethir",
        text: "Ajetu'l-Kursi është ajeti më i madh në Kur'an. Ai përmban emrat më të lartë të Allahut: Al-Hayy (i Gjalli) dhe Al-Qayyum (Ai që mban gjithçka). Allahu është i Gjallë me një jetë absolute, pa fillim dhe pa mbarim, dhe Ai mban ekzistencën e gjithë krijesave.",
        source: "Tefsiru Ibn Kethir, Vëll. 1, f. 456"
      },
      {
        scholar: "Ibn El-Qayyim",
        text: "Emri 'Al-Hayy Al-Qayyum' është emri më i madh i Allahut (Ismul Adzham). Kush lutet me të, lutja i pranohet. Ky ajet është mburoja e muslimanit — kush e lexon para gjumit, Allahu e mbron deri në mëngjes.",
        source: "Bedaiu Al-Fewaid, Vëll. 1, f. 29"
      },
      {
        scholar: "Es-Sadi",
        text: "Ky ajet tregon se Allahu ka njohuri absolute për çdo gjë — asgjë nuk ndodh pa dijen e Tij. 'Kursiyu' (Froni i Tij) e mbërthen qiellin dhe tokën — kjo tregon madhërinë e pafund të Allahut.",
        source: "Taisiru Al-Kerimi Ar-Rahman, f. 107"
      }
    ]
  },
  {
    surah: "Al-Ikhlas (112)",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    verse: "Thuaj: Allahu është Një.",
    tefsir: [
      {
        scholar: "Ibn Kethir",
        text: "Kjo sure është e barabartë me një të tretën e Kur'anit, sepse Kur'ani ka tri tema kryesore: teuhidi (njësia e Allahut), ligjet islame dhe tregjimet historike. Sure Al-Ikhlas trajton vetëm teuhidin. 'Ahad' tregon njësinë absolute pa asnjë partner apo ortak.",
        source: "Tefsiru Ibn Kethir, Vëll. 4, f. 569"
      },
      {
        scholar: "Es-Sadi",
        text: "Fjala 'Samad' — Allahu është Ai te Kimi drejtohen të gjithë krijesat për nevojat e tyre, ndërkohë Ai nuk ka nevojë për asnjërin. Ai nuk ka lindje dhe nuk ka të ngjashëm. Kjo sure e rrënon çdo formë shirku (politeizmi).",
        source: "Taisiru Al-Kerimi Ar-Rahman, f. 934"
      },
      {
        scholar: "Ibn Tejmijje",
        text: "Sure Al-Ikhlas përmban esencën e teuhidit. 'Lam yelid we lem yuled' — Allahu nuk ka lindur dhe nuk është lindur. Kjo kundërshton besimet e krishtera dhe çdo besim që atribuon fëmijë Allahut. 'Lem yekun lehu kufuwen ehad' — Asgjë nuk i ngjan Atij.",
        source: "Mexhmu Al-Fetawa, Vëll. 17, f. 214"
      }
    ]
  },
  {
    surah: "Ya-Sin (36) — Zemra e Kur'anit",
    arabic: "يس وَالْقُرْآنِ الْحَكِيمِ",
    verse: "Ya-Sin. Betohem në Kur'anin e urtë.",
    tefsir: [
      {
        scholar: "Ibn Kethir",
        text: "Sure Ya-Sin quhet 'Zemra e Kur'anit' sepse trajton temat qendrore: ringjallja pas vdekjes, njësia e Allahut dhe çështja e profetësisë. Kush e lexon para vdekjes, Allahu e lehtëson procesin e vdekjes.",
        source: "Tefsiru Ibn Kethir, Vëll. 3, f. 559"
      },
      {
        scholar: "Es-Sadi",
        text: "Hurufat Mukattaat (germat e lirë si Ya-Sin) janë argument mbi natyrën muxhizë të Kur'anit — Arabët e kuptuan se nuk mund të sjellin asgjë të ngjashme me Kur'anin, edhe pse ai është ndërtuar nga germat e gjuhës së tyre.",
        source: "Taisiru Al-Kerimi Ar-Rahman, f. 687"
      }
    ]
  },
  {
    surah: "Al-Mulk (67) — Mbrojtëse nga dënimi i varrit",
    arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    verse: "I bekuar është Ai Që në Dorën e Tij është Sundimi dhe Ai ka fuqi mbi çdo gjë.",
    tefsir: [
      {
        scholar: "Ibn Kethir",
        text: "Sure Al-Mulk quhet edhe 'Al-Waqiyah' (Mbrojtëse) dhe 'Al-Manieh' (Pengimtare). Ajo mbron lexuesin e saj nga dënimi i varrit. Kjo sure është argument i madh i sundimit të Allahut mbi çdo gjë.",
        source: "Tefsiru Ibn Kethir, Vëll. 4, f. 387"
      },
      {
        scholar: "Es-Sadi",
        text: "Fjala 'Tebareke' tregon madhërinë, bereqetin dhe lartësinë absolute të Allahut. Ky ajet i parë i sures vendos bazën: çdo gjë është në kontrollin e Allahut — jeta, vdekja, mirësia dhe sprova.",
        source: "Taisiru Al-Kerimi Ar-Rahman, f. 875"
      }
    ]
  },
  {
    surah: "Al-Kahf (18) — Mbrojtje nga Dexhxhalli",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ",
    verse: "Falënderimi i takon Allahut, i Cili ia zbriti Librin robit të Tij.",
    tefsir: [
      {
        scholar: "Ibn Kethir",
        text: "Sure Al-Kahf ka katër tema kryesore, secila me sprovën e vet: Sprova e fesë (Shokët e Shpellës), sprova e pasurisë (pronari i dy kopshteve), sprova e dijes (Musai me Hidrin) dhe sprova e pushtetit (Dhul-Karnejni). Kush e lexon çdo të Premte, mbrohet nga Dexhxhalli.",
        source: "Tefsiru Ibn Kethir, Vëll. 3, f. 67"
      },
      {
        scholar: "Al-Qurtubi",
        text: "Dhjetë ajetet e para dhe të fundit të Al-Kahfit janë mburojë nga fitnet e kohës së fundit. Kjo sure mëson njeriun të mos u besojë iluzioneve të kësaj bote dhe të mbajë besimin e fortë edhe në sprova të mëdha.",
        source: "Al-Xhami' li Ahkam Al-Quran, Vëll. 10, f. 351"
      }
    ]
  }
];

export default function TefsirDijetaresh() {
  const [expanded, setExpanded] = useState(null);
  const [expandedScholar, setExpandedScholar] = useState({});
  const [links, setLinks] = useState(downloadLinks.tefsir);
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");

  const toggleScholar = (surahIdx, scholarIdx) => {
    const key = `${surahIdx}-${scholarIdx}`;
    setExpandedScholar(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEdit = (lang) => {
    setEditMode(lang);
    setEditValue(links[lang]);
  };

  const handleSave = (lang) => {
    setLinks(prev => ({ ...prev, [lang]: editValue }));
    setEditMode(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 text-center mb-4">
        <p className="text-2xl mb-2">📚</p>
        <h2 className="text-xl font-bold text-emerald-800 mb-1">Tefsir i Dijetarëve të Mëdhenj</h2>
        <p className="text-sm text-emerald-700">Ibn Kethir · Es-Sadi · Al-Qurtubi · Ibn Tejmijje · Ibn El-Qayyim</p>
        <div className="flex gap-2 justify-center mt-3 flex-wrap">
          {editMode === "sq" ? (
            <div className="flex gap-2">
              <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-2 py-1 text-xs border rounded" />
              <button onClick={() => handleSave("sq")} className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">Save</button>
              <button onClick={() => setEditMode(null)} className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500">Cancel</button>
            </div>
          ) : (
            <div className="flex gap-1.5">
              <a href={links.sq} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors">
                <Download className="w-3.5 h-3.5" /> 🇦🇱
              </a>
              <button onClick={() => handleEdit("sq")} className="px-2 py-1.5 bg-gray-400 hover:bg-gray-500 text-white text-xs rounded-lg transition-colors">Edit</button>
            </div>
          )}
          
          {editMode === "ar" ? (
            <div className="flex gap-2">
              <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-2 py-1 text-xs border rounded" />
              <button onClick={() => handleSave("ar")} className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">Save</button>
              <button onClick={() => setEditMode(null)} className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500">Cancel</button>
            </div>
          ) : (
            <div className="flex gap-1.5">
              <a href={links.ar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors">
                <Download className="w-3.5 h-3.5" /> 🇸🇦
              </a>
              <button onClick={() => handleEdit("ar")} className="px-2 py-1.5 bg-gray-400 hover:bg-gray-500 text-white text-xs rounded-lg transition-colors">Edit</button>
            </div>
          )}

          {editMode === "en" ? (
            <div className="flex gap-2">
              <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-2 py-1 text-xs border rounded" />
              <button onClick={() => handleSave("en")} className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">Save</button>
              <button onClick={() => setEditMode(null)} className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500">Cancel</button>
            </div>
          ) : (
            <div className="flex gap-1.5">
              <a href={links.en} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors">
                <Download className="w-3.5 h-3.5" /> 🇬🇧
              </a>
              <button onClick={() => handleEdit("en")} className="px-2 py-1.5 bg-gray-400 hover:bg-gray-500 text-white text-xs rounded-lg transition-colors">Edit</button>
            </div>
          )}
        </div>
      </div>

      {TEFSIR_DATA.map((item, idx) => (
        <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <button
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            className="w-full p-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors text-left">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-bold text-gray-900 text-sm">{item.surah}</span>
              </div>
              <p className="text-right text-base font-bold text-amber-800 leading-relaxed" dir="rtl" style={{ fontFamily: "Amiri,serif" }}>
                {item.arabic}
              </p>
              <p className="text-xs text-gray-500 mt-1 italic">"{item.verse}"</p>
            </div>
            <div className="flex-shrink-0">
              {expanded === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </div>
          </button>

          <AnimatePresence>
            {expanded === idx && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-100">
                <div className="p-4 space-y-3">
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">Shpjegimi i Dijetarëve:</p>
                  {item.tefsir.map((t, sIdx) => {
                    const key = `${idx}-${sIdx}`;
                    return (
                      <div key={sIdx} className="bg-emerald-50 rounded-xl border border-emerald-100 overflow-hidden">
                        <button
                          onClick={() => toggleScholar(idx, sIdx)}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-emerald-100 transition-colors text-left">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {t.scholar[0]}
                            </span>
                            <span className="font-semibold text-emerald-800 text-sm">{t.scholar}</span>
                          </div>
                          {expandedScholar[key] ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />}
                        </button>
                        <AnimatePresence>
                          {expandedScholar[key] && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                              <div className="px-4 pb-4">
                                <p className="text-sm text-gray-700 leading-relaxed mb-2">{t.text}</p>
                                <p className="text-xs text-emerald-600 font-semibold">📖 {t.source}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}