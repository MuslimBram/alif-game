import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

const CHAPTERS = [
  {
    chapter: "Kapitulli 1 — Sinqeriteti & Nijeti",
    color: "emerald",
    hadiths: [
      {
        arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        text: "Veprat vlerësohen sipas qëllimeve, dhe çdo njeriu i takon ajo që ka synuar.",
        source: "Buhari & Muslim — Riyadu Es-Salihin 1",
        explanation: "Ky është hadithi themelor i Islamit. Nëse dikush bën namaz për t'u dukur para njerëzve, nuk ka shpërblim. Nëse migron për ndonjë arsye tjetër dhe jo për Allahun, nuk ka shpërblim të migrimit. Nijeti (qëllimi) është zemra e çdo vepre."
      },
      {
        arabic: "مَنْ كَانَ آخِرُ كَلَامِهِ لَا إِلَهَ إِلَّا اللَّهُ دَخَلَ الْجَنَّةَ",
        text: "Kush fjalën e fundit të tij e ka 'La ilahe illallah', hyn në Xhennet.",
        source: "Ebu Davud — Riyadu Es-Salihin 18",
        explanation: "Fjalët e fundit të njeriut para vdekjes janë pasqyra e gjendjes shpirtërore. Kush jeton me La ilahe illallah, shpresojmë se vdes me të. Kjo është arsyeja pse muslimanët i lexojnë të sëmurëve rëndë këtë kelime."
      }
    ]
  },
  {
    chapter: "Kapitulli 2 — Pendimi & Kthimi tek Allahu",
    color: "blue",
    hadiths: [
      {
        arabic: "التَّائِبُ مِنَ الذَّنْبِ كَمَنْ لَا ذَنْبَ لَهُ",
        text: "Ai që pendohet nga mëkati është si ai që nuk ka bërë mëkat.",
        source: "Ibn Maxheh — Riyadu Es-Salihin 16",
        explanation: "Pendimi i sinqertë (Tewbe Nasuh) fshin plotësisht mëkatin — si letra e bardhë. Allahu nuk vetëm që fal, por e kthen mëkatin në të mirë. Kushti i tewbes: braktisja e mëkatit, pendimi i zemrës, vendosmëria për të mos kthyer."
      },
      {
        arabic: "إِنَّ اللَّهَ يَبْسُطُ يَدَهُ بِاللَّيْلِ لِيَتُوبَ مُسِيءُ النَّهَارِ",
        text: "Allahu shtrin Dorën e Tij natën për të pranuar pendimin e atij që ka mëkatuar ditën, dhe shtrin Dorën ditën për të pranuar pendimin e atij që ka mëkatuar natën.",
        source: "Muslim — Riyadu Es-Salihin 19",
        explanation: "Dera e pendimit është gjithnjë e hapur derisa dielli të lindë nga perëndimi (shenjë e Kiametit). Allahu është Al-Ghaffar (Faluesi i Madh) dhe At-Tawwab (Pranusi i Pendimit). Askush nuk është shumë mëkatar për t'u falur."
      }
    ]
  },
  {
    chapter: "Kapitulli 3 — Durimi (Sabri)",
    color: "amber",
    hadiths: [
      {
        arabic: "مَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ",
        text: "Askujt nuk i është dhënë një dhunti më e mirë dhe më e gjerë se durimi.",
        source: "Buhari & Muslim — Riyadu Es-Salihin 26",
        explanation: "Durimi (sabri) ka tre lloje: durim ndaj adhurimeve (i vështirë por i shpërblyeshëm), durim ndaj sprovave dhe durim ndaj ndalimeve. Sabri është gjysma e besimit — 'Iman' dhe 'Sabr' janë çifti i rrugës drejt Xhennetit."
      },
      {
        arabic: "عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ",
        text: "Sa e mrekullueshme është çështja e besimtarit — çdo gjë është e mirë për të!",
        source: "Muslim — Riyadu Es-Salihin 27",
        explanation: "Nëse e godet gëzimi, falënderon dhe kjo është mirë për të. Nëse e godet sprova, duron dhe kjo është mirë për të. Kjo dinamikë unike i takon vetëm besimtarit. Muslimani nuk humbet kurrë — as në gëzim, as në fatkeqësi."
      }
    ]
  },
  {
    chapter: "Kapitulli 4 — E Drejta e Prindërve",
    color: "rose",
    hadiths: [
      {
        arabic: "رِضَا اللَّهِ فِي رِضَا الْوَالِدَيْنِ وَسَخَطُ اللَّهِ فِي سَخَطِ الْوَالِدَيْنِ",
        text: "Kënaqësia e Allahut është në kënaqësinë e prindërve, dhe zemërimi i Allahut është në zemërimin e prindërve.",
        source: "Tirmidhi — Riyadu Es-Salihin 48",
        explanation: "Pas teuhidit dhe namazit, respekti ndaj prindërve është farzul-ajni (detyrim individual). Edhe prindi jobesimtar meriton respekt dhe kujdes — vetëm nuk i bindesh atij në mëkat. 'Uf' i thënë prindërve është i ndaluar — çfarë të thuhet goditja?!"
      }
    ]
  },
  {
    chapter: "Kapitulli 5 — Vlera e Dijes",
    color: "indigo",
    hadiths: [
      {
        arabic: "إِذَا مَاتَ ابْنُ آدَمَ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ",
        text: "Kur vdes biri i Ademit, veprat i ndërpriten, me përjashtim të tre gjërave: sadakaja xharije, dija nga e cila përfitohet, ose fëmija i devotshëm që lutet për të.",
        source: "Muslim — Riyadu Es-Salihin 90",
        explanation: "Tre mënyrat e shpërblimit pas vdekjes: 1) Sadakaja xharije — si ujë i gërmuar, xhami e ndërtuar, libër i shkruar. 2) Dija — mësuesi merr sevap sa herë studenti aplikon mësimet. 3) Lutja e fëmijës — kjo është arsyeja pse rritja e fëmijëve të devotshëm është investimi më i madh."
      },
      {
        arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        text: "Kërkimi i dijes është detyrim (farz) për çdo musliman.",
        source: "Ibn Maxheh — Riyadu Es-Salihin 95",
        explanation: "Dija islame nuk është opsionale — ajo është detyrim. Dija minimale rreth namazit, agjërimit, hallallit dhe haramit është farz. Pastaj dija specifike si mjekësia, inxhinieria etj., është farz kifaje (detyrim kolektiv) — duhet të ketë nga komuniteti."
      }
    ]
  }
];

const KUDSI_HADITHS = [
  {
    arabic: "أَنَا عِنْدَ ظَنِّ عَبْدِي بِي",
    text: "Jam ashtu siç mendon robi Im për Mua.",
    source: "Buhari & Muslim — Hadith Kudsi",
    explanation: "Ky hadith kudsi mëson rreth 'husn udh-dhann' (mendimit të mirë ndaj Allahut). Nëse mendon se Allahu do të të falë — Ai fal. Nëse mendon se lutja jote pranohet — pranohet. Optimizmi i besimtarit ndaj Allahut është ibadet."
  },
  {
    arabic: "يَا ابْنَ آدَمَ، إِنَّكَ مَا دَعَوْتَنِي وَرَجَوْتَنِي غَفَرْتُ لَكَ عَلَى مَا كَانَ فِيكَ وَلَا أُبَالِي",
    text: "O bir i Ademit! Sa kohë që më lutesh dhe shpresosh tek Unë, Unë të fal gjithçka pa u shqetësuar.",
    source: "Tirmidhi — Hadith Kudsi",
    explanation: "Ky hadith është ndër hadithet më shpresëdhënëse. Allahu thotë se edhe nëse mëkatet arrijnë deri në qiell, dhe pastaj robi pendohet, Ai e fal. Madhëria e faljes hyjnore e tejkalon çdo imagjinatë njerëzore."
  },
  {
    arabic: "مَنْ أَتَانِي يَمْشِي أَتَيْتُهُ هَرْوَلَةً",
    text: "Kush vjen tek Unë duke ecur, Unë shkoj tek ai duke vrapuar.",
    source: "Buhari — Hadith Kudsi",
    explanation: "Allahu është gjithnjë gati për t'u afruar me robin e Tij. Sa herë që njeriu bën hap drejt Allahut, Allahu i afrohet me të madhe. Kjo tregon dashurinë hyjnore dhe dëshirën e Allahut për t'i falur njerëzit."
  },
  {
    arabic: "يَا عِبَادِي، إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلَا تَظَالَمُوا",
    text: "O robërit e Mi! Unë e kam ndaluar padrejtësinë për Veten Time dhe e kam bërë të ndaluar midis jush — prandaj mos i bëni padrejtësi njëri-tjetrit.",
    source: "Muslim — Hadith Kudsi (i famshëm nga Ebu Dherri)",
    explanation: "Ky hadith kudsi i mrekullueshëm tregon se Allahu vetë është i drejtë dhe nuk bën padrejtësi. Padrejtësia midis njerëzve është absolutisht e ndaluar. Dua e mazlumit (të padrejtit) pranohet — mes saj dhe Allahut nuk ka perde."
  },
  {
    arabic: "كُلُّ عَمَلِ ابْنِ آدَمَ لَهُ إِلَّا الصَّوْمَ، فَإِنَّهُ لِي وَأَنَا أَجْزِي بِهِ",
    text: "Çdo vepër e birit të Ademit i takon atij, me përjashtim të agjërimit — ai është për Mua dhe Unë shpërblyej për të.",
    source: "Buhari & Muslim — Hadith Kudsi",
    explanation: "Allahu e veçoi agjërimin si adhurim të Tij të posaçëm. Agjëruesi i braktis ushqimin, pijen dhe dëshirat trupore vetëm për Allahun — prandaj shpërblimi është i pakufizuar. 'Allahu shpërblyej për të' nënkupton se shpërblimi i agjërimit është i papërcaktuar dhe i pakufizuar."
  }
];

export default function RiyaduSalihin() {
  const [activeTab, setActiveTab] = useState("riyadu");
  const [expanded, setExpanded] = useState(null);
  const [expandedKudsi, setExpandedKudsi] = useState(null);

  const colorMap = {
    emerald: { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-800", badge: "bg-emerald-100 text-emerald-700", header: "bg-emerald-600" },
    blue: { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-800", badge: "bg-blue-100 text-blue-700", header: "bg-blue-600" },
    amber: { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-800", badge: "bg-amber-100 text-amber-700", header: "bg-amber-600" },
    rose: { bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-800", badge: "bg-rose-100 text-rose-700", header: "bg-rose-600" },
    indigo: { bg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-800", badge: "bg-indigo-100 text-indigo-700", header: "bg-indigo-600" },
  };

  const downloadLinks = {
    sq: "https://waqfeya.net/book.php?bid=4707",
    ar: "https://waqfeya.net/book.php?bid=1005",
    en: "https://sunnah.com/riyad-us-saliheen"
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-5 text-center mb-4">
        <p className="text-2xl mb-2">🌹</p>
        <h2 className="text-xl font-bold text-rose-800 mb-1">Riyadu Es-Salihin & Hadithet Kudsije</h2>
        <p className="text-sm text-rose-700">Imam An-Newewiu · Hadithe Kudsije (fjalë hyjnore)</p>
        <div className="flex gap-2 justify-center mt-3 flex-wrap">
          <a href={downloadLinks.sq} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5" /> 🇦🇱 Shqip
          </a>
          <a href={downloadLinks.ar} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5" /> 🇸🇦 العربية
          </a>
          <a href={downloadLinks.en} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5" /> 🇬🇧 English
          </a>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setActiveTab("riyadu")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "riyadu" ? "bg-rose-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600"}`}>
          🌹 Riyadu Es-Salihin
        </button>
        <button onClick={() => setActiveTab("kudsi")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "kudsi" ? "bg-purple-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600"}`}>
          ✨ Hadithet Kudsije
        </button>
      </div>

      {activeTab === "riyadu" && (
        <div className="space-y-3">
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
            <p className="text-sm text-rose-800">
              <strong>Riyadu Es-Salihin</strong> ("Kopshtet e të Mirëve") — Imam An-Newewiu (1234–1278 M) mblodhi rreth 1.900 hadithe nga Buhari, Muslimi dhe koleksionet e tjera, të organizuara sipas temave islame.
            </p>
          </div>
          {CHAPTERS.map((chapter, chapIdx) => {
            const colors = colorMap[chapter.color];
            return (
              <div key={chapIdx} className={`${colors.bg} ${colors.border} border rounded-2xl overflow-hidden`}>
                <div className={`${colors.header} text-white px-4 py-3`}>
                  <p className="font-bold text-sm">{chapter.chapter}</p>
                </div>
                <div className="p-3 space-y-2">
                  {chapter.hadiths.map((h, hIdx) => {
                    const key = `${chapIdx}-${hIdx}`;
                    return (
                      <div key={hIdx} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <button onClick={() => setExpanded(expanded === key ? null : key)}
                          className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-right text-base font-bold text-gray-900 leading-relaxed mb-2" dir="rtl" style={{ fontFamily: "Amiri,serif" }}>
                                {h.arabic}
                              </p>
                              <p className="text-sm text-gray-700 italic">"{h.text}"</p>
                              <p className={`text-xs font-semibold mt-1 ${colors.text}`}>— {h.source}</p>
                            </div>
                            {expanded === key ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />}
                          </div>
                        </button>
                        <AnimatePresence>
                          {expanded === key && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                              <div className={`${colors.bg} ${colors.border} border-t px-4 py-3`}>
                                <p className={`text-xs font-bold uppercase tracking-wider ${colors.text} mb-2`}>Shpjegim:</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{h.explanation}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "kudsi" && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-sm text-purple-800">
              <strong>Hadithet Kudsije</strong> janë fjalë të Allahut (jo pjesë e Kur'anit) të transmetuara nëpërmjet Profetit ﷺ. Ato kanë kuptim hyjnor por formulim profetik — kap thelbin e marrëdhënies midis Allahut dhe robit.
            </p>
          </div>
          {KUDSI_HADITHS.map((h, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm">
              <button onClick={() => setExpandedKudsi(expandedKudsi === idx ? null : idx)}
                className="w-full p-4 text-left hover:bg-purple-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold mb-2 inline-block">Hadith Kudsi</span>
                    <p className="text-right text-base font-bold text-purple-900 leading-relaxed mb-2" dir="rtl" style={{ fontFamily: "Amiri,serif" }}>
                      {h.arabic}
                    </p>
                    <p className="text-sm text-gray-700 italic">"{h.text}"</p>
                    <p className="text-xs font-semibold mt-1 text-purple-700">— {h.source}</p>
                  </div>
                  {expandedKudsi === idx ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />}
                </div>
              </button>
              <AnimatePresence>
                {expandedKudsi === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <div className="bg-purple-50 border-t border-purple-100 px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">Kuptimi & Shpjegimi:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{h.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}