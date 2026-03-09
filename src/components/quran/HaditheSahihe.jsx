import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { downloadLinks } from "./downloadLinksConfig";

const SAHIH_COLLECTIONS = [
  {
    name: "Sahih Al-Buhari",
    color: "bg-blue-600",
    lightColor: "bg-blue-50 border-blue-100",
    textColor: "text-blue-800",
    badgeColor: "bg-blue-100 text-blue-700",
    info: "Koleksioni më i saktë i haditheve. Imam Buhariu (810–870 M) mblodhi 7.275 hadithe nga 600.000 të verifikuara.",
    hadiths: [
      {
        arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
        text: "Veprat vlerësohen sipas qëllimeve.",
        source: "Buhari 1",
        context: "Hadithi i parë i Sahih Buharit. Imam Buhariu e vendosi qëllimisht si hadithin e parë sepse çdo vepër pa qëllim të sinqertë (nijet) nuk ka vlerë tek Allahu.",
        topic: "Nijeti & Sinqeriteti"
      },
      {
        arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        text: "Njerëzit më të mirë ndër ju janë ata që mësojnë Kur'anin dhe ua mësojnë të tjerëve.",
        source: "Buhari 5027",
        context: "Ky hadith motivon muslimanët të mësojnë dhe t'ua mësojnë të tjerëve Kur'anin. Ai i cili mëson dhe mëson të tjerët ka dy shpërblime.",
        topic: "Kur'ani"
      },
      {
        arabic: "الدِّينُ النَّصِيحَةُ",
        text: "Feja është sinqeritet (këshillë e mirë).",
        source: "Buhari 57",
        context: "Sinqeriteti ndaj Allahut, Librit të Tij, Profetit, liderëve muslimanë dhe të gjithë muslimanëve është thelbi i Islamit.",
        topic: "Morali Islam"
      },
      {
        arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        text: "Asnjëri prej jush nuk beson plotësisht derisa të dojë për vëllanë e tij atë që dëshiron për veten e tij.",
        source: "Buhari 13",
        context: "Ky hadith i hollë tregon se dashuria vëllazërore islame është shenjë e besimit të plotë. Besimi nuk është vetëm rituale — ai manifestohet në marrëdhëniet me njerëzit.",
        topic: "Besimi & Vëllazëria"
      },
      {
        arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
        text: "Veprat më të dashura tek Allahu janë ato që bëhen vazhdimisht, edhe nëse janë të vogla.",
        source: "Buhari 6464",
        context: "Konsistenca në adhurim është më e dashur tek Allahu sesa adhurime të mëdha por të rralla. Kjo mëson modestinë dhe qëndrueshmërinë shpirtërore.",
        topic: "Adhurim & Vazhdimësi"
      },
      {
        arabic: "مَنْ أَذَى مُسْلِمًا فَقَدْ أَذَانِي وَمَنْ أَذَانِي فَقَدْ أَذَى اللَّهَ",
        text: "Kush lëndon një musliman, ka lënduar mua; kush lëndon mua, ka lënduar Allahun.",
        source: "Taberani — Sahih",
        context: "Ky hadith tregon lidhjen e drejtpërdrejtë midis trajtimit të muslimanëve dhe respektit ndaj Allahut dhe Profetit ﷺ. Lëndimi i besimtarëve është nga gjynahet më të rënda.",
        topic: "Të drejtat e muslimanit"
      },
      {
        arabic: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
        text: "Besimtari me iman më të plotë është ai me moral më të mirë.",
        source: "Buhari (Edebul-Mufred) — Sahih",
        context: "Morali i lartë është shenjë e imanit të fortë. Profeti ﷺ, morali i të cilit ishte Kur'ani vetë, është shembulli suprem. Besimi nuk matet vetëm me adhurime, por me sjelljen ndaj njerëzve.",
        topic: "Morali & Imani"
      },
      {
        arabic: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا",
        text: "Ndër njerëzit tuaj më të mirë janë ata me moral më të mirë.",
        source: "Buhari 3559",
        context: "Profeti ﷺ e vlerëson moralin si kriter kryesor të shkallëzimit mes njerëzve. Pasurinë, gjininë, ngjyrën Allahu nuk i konsideron kritere vlerësimi — vetëm devotshmëria dhe morali i mirë.",
        topic: "Morali i lartë"
      }
    ]
  },
  {
    name: "Sahih Muslim",
    color: "bg-emerald-600",
    lightColor: "bg-emerald-50 border-emerald-100",
    textColor: "text-emerald-800",
    badgeColor: "bg-emerald-100 text-emerald-700",
    info: "Koleksioni i dytë në saktësi. Imam Muslimi (815–875 M) mblodhi rreth 3.033 hadithe unike nga 300.000 të testuar.",
    hadiths: [
      {
        arabic: "اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ",
        text: "Lexoni Kur'anin, sepse ai do të vijë Ditën e Kiametit si ndërmjetësues për shokët e tij.",
        source: "Muslim 804",
        context: "Kur'ani do të jetë ndërmjetësues (shefaat) për lexuesit e tij Ditën e Kiametit. Dy surat: Al-Baqarah dhe Ali Imran quhen 'Az-Zahrauan' — dy yje ndriçues — dhe do të vijnë si re ose si dy kope zogjsh në mbrojtje të lexuesit.",
        topic: "Kur'ani & Shefaat"
      },
      {
        arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
        text: "Kush ndjek një rrugë për të kërkuar dije, Allahu ia lehtëson rrugën drejt Xhennetit.",
        source: "Muslim 2699",
        context: "Kërkimi i dijes është ibadet (adhurim). Engjëjt ulin krahët e tyre para atij që kërkon dije. Edhe peshqit e detit luten për alimin (dijetarin).",
        topic: "Dija & Xhenneti"
      },
      {
        arabic: "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
        text: "Allahu nuk shikon fytyrat dhe pasuritë tuaja, por shikon zemrat dhe veprat tuaja.",
        source: "Muslim 2564",
        context: "Ky hadith i mrekullueshëm rrënon çdo lloj diskriminimi sipas pamjes, pasurisë apo statusit shoqëror. Vlera tek Allahu matet vetëm me takwanë (devotshmërinë) dhe veprat e mira.",
        topic: "Zemra & Sinqeriteti"
      },
      {
        arabic: "كُلُّ مَوْلُودٍ يُولَدُ عَلَى الْفِطْرَةِ",
        text: "Çdo i porsalindur lind mbi fitrat (natyrën e pastër islame).",
        source: "Muslim 2658",
        context: "Islami është feja e natyrës njerëzore. Fëmija lind me njohje të natyrshme të Allahut. Prindërit dhe mjedisi mund ta ndryshojnë këtë drejtim, por fitrati mbetet i pranishëm.",
        topic: "Fitrati & Natyra Njerëzore"
      },
      {
        arabic: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
        text: "Besimtari për besimtarin është si ndërtesa — njëri forcë tjetrin.",
        source: "Muslim 2585",
        context: "Solidariteti islam shprehet me këtë metaforë të mrekullueshme. Profeti ﷺ i ndërthuri gishtat e tij për të ilustruar lidhjen. Umma islame funksionon vetëm kur çdo individ mbështet tjetrin — jo të izolohen.",
        topic: "Solidariteti Islam"
      },
      {
        arabic: "لَا تَحَاسَدُوا وَلَا تَنَاجَشُوا وَلَا تَبَاغَضُوا",
        text: "Mos u zillisni me njëri-tjetrin, mos u mashtroni, mos e urreni njëri-tjetrin.",
        source: "Muslim 2563",
        context: "Profeti ﷺ ndaloi tre sëmundje shpirtërore që prishin komunitetin: 1) Hasedi (zilia) që djeg zemrën, 2) Naxhash (mashtrimi në tregti), 3) Bugd (urrejtja pa arsye). Muslimanët janë vëllezër — këto ndalime janë themelet e paqes sociale.",
        topic: "Marrëdhëniet sociale"
      },
      {
        arabic: "بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ",
        text: "Jam dërguar për të plotësuar virtytet e moralit të lartë.",
        source: "Beyhaki — Sahih",
        context: "Ky hadith tregon misionin qenësor të Profetit ﷺ. Islami nuk erdhi të rrënojë vlerat njerëzore, por t'i plotësojë dhe ngrejë në shkallën më të lartë. Morali i mirë është themeli i qytetërimit islam.",
        topic: "Misioni i Profetit ﷺ"
      }
    ]
  },
  {
    name: "Sunen At-Tirmidhi",
    color: "bg-amber-600",
    lightColor: "bg-amber-50 border-amber-100",
    textColor: "text-amber-800",
    badgeColor: "bg-amber-100 text-amber-700",
    info: "Imam Tirmidhiu (824–892 M) — koleksion i njohur me klasifikime të shkallëve të hadithit (Sahih, Hasan, Daif).",
    hadiths: [
      {
        arabic: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا",
        text: "Kush lexon një shkronjë nga Libri i Allahut merr një të mirë, dhe e mira shumëfishohet dhjetë herë.",
        source: "Tirmidhi 2910 — Sahih",
        context: "Profeti ﷺ sqaroi: 'Nuk po them se 'Elif Lam Mim' është një shkronjë, por Elifi është shkronjë, Lami është shkronjë dhe Mimi është shkronjë.' Kështu çdo germë e Kur'anit sjell dhjetë sevape.",
        topic: "Sevapet e Kur'anit"
      },
      {
        arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا",
        text: "Ki frikë Allahun kudo që të jesh, dhe pas të keqes bëj të mirë — ajo e fshin atë.",
        source: "Tirmidhi 1987 — Sahih",
        context: "Ky hadith profetik mëson tre parime jetike: devotshmëria (taqwa) është universale dhe nuk kufizohet vetëm në xhami. Veprat e mira i fshijnë mëkatet. Sjellja e mirë me njerëzit është shenjë e devotshmërisë.",
        topic: "Morali & Taqwa"
      },
      {
        arabic: "الْمُسْلِمُ أَخُو الْمُسْلِمِ",
        text: "Muslimani është vëlla i muslimanit.",
        source: "Tirmidhi 1927",
        context: "Ky princip i thjeshtë por i fuqishëm themelon solidaritetin islam. Muslimani nuk e tradhton, nuk e gënjen dhe nuk e lë vëllain e tij muslimanin. Umma islame është si një trup — kur një pjesë dhemb, i gjithë trupi ndjen dhembje.",
        topic: "Vëllazëria Islame"
      },
      {
        arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ",
        text: "Xhenneti ndodhet nën këmbët e nënave.",
        source: "Ibn Maxheh 2781 — Hassan",
        context: "Islami i jep nënës rolin dhe nderin më të lartë. Profeti ﷺ u pyet tre herë kush meriton shoqërinë më të mirë — dhe tre herë tha 'Nëna.' Vetëm herën e katërt tha 'Babai.'",
        topic: "Familja & Respekti"
      },
      {
        arabic: "كُلُّ أُمَّتِي يَدْخُلُونَ الْجَنَّةَ إِلَّا مَنْ أَبَى",
        text: "Gjithë umeti im hyn në Xhennet, përveç atij që refuzon. I thanë: Kush refuzon? Tha: Kush më bindej hyri në Xhennet, kush nuk më bindet, ka refuzuar.",
        source: "Buhari 7280",
        context: "Rruga drejt Xhennetit është e qartë: pasimi i Profetit ﷺ. 'Refuzimi' nuk është mos-besim i vullnetshëm, por neglizhimi i urdhrave dhe ndalesave. Çdo musliman ka shpresë për Xhennet nëse ndjek Sunetin.",
        topic: "Xhenneti & Pasimi"
      },
      {
        arabic: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
        text: "Kush agjëron Ramazanin me iman dhe duke shpresuar shpërblimin, i falen mëkatet e mëparshme.",
        source: "Buhari 38 — Muslim 760",
        context: "Tre kushte për falje: 1) Iman (besim i sinqertë), 2) Ihtisab (shpresa e shpërblimit vetëm tek Allahu), 3) Veprimi (agjërimi). Ramazani është mundësia vjetore për 'riset' shpirtëror — fshirja e gjynaheve të vitit të shkuar.",
        topic: "Ramazani & Falja"
      }
    ]
  }
];

export default function HaditheSahihe() {
  const [activeCollection, setActiveCollection] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [links, setLinks] = useState({
    sq: [downloadLinks.haditheSahihe.sq],
    ar: [downloadLinks.haditheSahihe.ar],
    en: [downloadLinks.haditheSahihe.en]
  });
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");

  const collection = SAHIH_COLLECTIONS[activeCollection];

  const handleEdit = (lang, index) => {
    setEditMode(`${lang}-${index}`);
    setEditValue(links[lang][index]);
  };

  const handleSave = (lang, index) => {
    setLinks(prev => {
      const newLinks = [...prev[lang]];
      newLinks[index] = editValue;
      return { ...prev, [lang]: newLinks };
    });
    setEditMode(null);
  };

  const handleAdd = (lang) => {
    setLinks(prev => ({ ...prev, [lang]: [...prev[lang], ""] }));
  };

  const handleDelete = (lang, index) => {
    setLinks(prev => ({ ...prev, [lang]: prev[lang].filter((_, i) => i !== index) }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 text-center mb-4">
        <p className="text-2xl mb-2">📜</p>
        <h2 className="text-xl font-bold text-blue-800 mb-1">Hadithet e Sahiheve</h2>
        <p className="text-sm text-blue-700">Sahih Buhari · Sahih Muslim · Sunen At-Tirmidhi</p>
        <div className="flex gap-2 justify-center mt-3 flex-wrap">
          <div className="flex flex-col gap-2 w-full">
            {["sq", "ar", "en"].map(lang => (
              <div key={lang} className="flex flex-wrap gap-2 justify-center">
                {links[lang].map((link, idx) => (
                  <div key={idx}>
                    {editMode === `${lang}-${idx}` ? (
                      <div className="flex gap-1.5">
                        <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-2 py-1 text-xs border rounded w-48" />
                        <button onClick={() => handleSave(lang, idx)} className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">✓</button>
                        <button onClick={() => setEditMode(null)} className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500">✕</button>
                      </div>
                    ) : (
                      <div className="flex gap-1.5">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
                          <Download className="w-3.5 h-3.5" /> {lang === "sq" ? "🇦🇱" : lang === "ar" ? "🇸🇦" : "🇬🇧"}
                        </a>
                        <button onClick={() => handleEdit(lang, idx)} className="px-2 py-1.5 bg-gray-400 hover:bg-gray-500 text-white text-xs rounded-lg transition-colors">Edit</button>
                        {links[lang].length > 1 && <button onClick={() => handleDelete(lang, idx)} className="px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors">Del</button>}
                      </div>
                    )}
                  </div>
                ))}
                <button onClick={() => handleAdd(lang)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">+ Add</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection Selector */}
      <div className="flex gap-2 flex-wrap">
        {SAHIH_COLLECTIONS.map((col, idx) => (
          <button key={idx} onClick={() => { setActiveCollection(idx); setExpanded(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCollection === idx ? `${col.color} text-white shadow-md` : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"}`}>
            {col.name}
          </button>
        ))}
      </div>

      {/* Collection Info */}
      <div className={`${collection.lightColor} border rounded-xl p-4`}>
        <p className={`text-sm ${collection.textColor} font-medium`}>ℹ️ {collection.info}</p>
      </div>

      {/* Hadiths */}
      <div className="space-y-3">
        {collection.hadiths.map((hadith, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <button onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${collection.badgeColor} mb-2 inline-block`}>
                    {hadith.topic}
                  </span>
                  <p className="text-right text-base font-bold text-gray-900 leading-relaxed mb-2" dir="rtl" style={{ fontFamily: "Amiri,serif" }}>
                    {hadith.arabic}
                  </p>
                  <p className="text-sm text-gray-700 italic">"{hadith.text}"</p>
                  <p className={`text-xs font-semibold mt-1 ${collection.textColor}`}>— {hadith.source}</p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  {expanded === idx ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expanded === idx && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className={`${collection.lightColor} border-t px-4 py-3`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${collection.textColor} mb-2`}>Shpjegim & Kontekst:</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{hadith.context}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}