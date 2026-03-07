import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, ChevronRight, BookOpen, Star, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import MedineExercises from "@/components/medine/MedineExercises";
import MedineProgressTracker from "@/components/medine/MedineProgressTracker";
import MedineProgressChart from "@/components/medine/MedineProgressChart";

const LEVELS = [
  { value: "fillestar", label: "🌱 Fillestar", desc: "Libri 1 — Bazat" },
  { value: "mesatar",   label: "🌿 Mesatar",   desc: "Libri 2 — Zgjerim" },
  { value: "avancuar",  label: "🌲 Avancuar",  desc: "Libri 3 — Avancim" },
  { value: "profesionist", label: "🏔️ Profesionist", desc: "Libri 4 — Thellim" },
];

const MEDINE_DATA = {
  fillestar: {
    title: "الكتاب الأول — Libri i Parë",
    subtitle: "Madinah Book 1 — 23 Mësime Bazë të Arabishtes",
    units: [
      { id: 1, title: "الدرس الأول — Mësimi 1", topic: "هذا / هذه • Ky / Kjo",
        vocab: [
          { ar: "هَذَا", trans: "ky / this (m)", roman: "hādhā" },
          { ar: "هَذِهِ", trans: "kjo / this (f)", roman: "hādhihi" },
          { ar: "بَيْتٌ", trans: "shtëpi / house", roman: "bayt" },
          { ar: "مَسْجِدٌ", trans: "xhami / mosque", roman: "masjid" },
          { ar: "بَابٌ", trans: "derë / door", roman: "bāb" },
          { ar: "قَلَمٌ", trans: "pena / pen", roman: "qalam" },
          { ar: "كِتَابٌ", trans: "libër / book", roman: "kitāb" },
          { ar: "كُرْسِيٌّ", trans: "karrige / chair", roman: "kursī" },
          { ar: "سَرِيرٌ", trans: "shtrat / bed", roman: "sarīr" },
          { ar: "مِفْتَاحٌ", trans: "çelës / key", roman: "miftāḥ" },
        ],
        grammar: "Zëmërat dëftorëse 'hādhā' (ky - mashk.) dhe 'hādhihi' (kjo - fem.) vijnë para emrit dhe tregojnë sendet e afërt. Arabishtja nuk ka folje 'është' — 'هذا بيت' do të thotë 'Ky shtëpi' = 'Ky është shtëpi'.",
        examples: [
          { ar: "هَذَا بَيْتٌ", roman: "hādhā baytun", trans: "Ky është shtëpi" },
          { ar: "هَذِهِ مَدْرَسَةٌ", roman: "hādhihi madrasatun", trans: "Kjo është shkollë" },
          { ar: "هَذَا مَسْجِدٌ", roman: "hādhā masjidun", trans: "Ky është xhami" },
        ]
      },
      { id: 2, title: "الدرس الثاني — Mësimi 2", topic: "مَا هَذَا؟ • Çfarë është kjo?",
        vocab: [
          { ar: "مَا هَذَا؟", trans: "Çfarë është ky?", roman: "mā hādhā?" },
          { ar: "مَا هَذِهِ؟", trans: "Çfarë është kjo?", roman: "mā hādhihi?" },
          { ar: "نَجْمٌ", trans: "yll / star", roman: "najm" },
          { ar: "قَمِيصٌ", trans: "këmishë / shirt", roman: "qamīṣ" },
          { ar: "طَاوِلَةٌ", trans: "tryezë / table", roman: "ṭāwila" },
          { ar: "نَافِذَةٌ", trans: "dritare / window", roman: "nāfidha" },
          { ar: "سَيَّارَةٌ", trans: "makinë / car", roman: "sayyāra" },
          { ar: "شَجَرَةٌ", trans: "pemë / tree", roman: "shajara" },
        ],
        grammar: "Pyetja 'mā hādhā?' (çfarë është ky?) formohet duke vendosur 'مَا' (çfarë) para zëmërës dëftorëse. Përgjigja: 'هذا [emr]' (ky është [emr]).",
        examples: [
          { ar: "مَا هَذَا؟ هَذَا قَلَمٌ", roman: "mā hādhā? hādhā qalamun", trans: "Çfarë është ky? Ky është pena" },
          { ar: "مَا هَذِهِ؟ هَذِهِ سَيَّارَةٌ", roman: "mā hādhihi? hādhihi sayyāratun", trans: "Çfarë është kjo? Kjo është makinë" },
          { ar: "هَذَا كِتَابٌ وَهَذِهِ طَاوِلَةٌ", roman: "hādhā kitābun wa hādhihi ṭāwilatun", trans: "Ky është libër dhe kjo është tryezë" },
        ]
      },
      { id: 3, title: "الدرس الثالث — Mësimi 3", topic: "هُوَ / هِيَ • Ai / Ajo",
        vocab: [
          { ar: "هُوَ", trans: "ai / he", roman: "huwa" },
          { ar: "هِيَ", trans: "ajo / she", roman: "hiya" },
          { ar: "جَدِيدٌ", trans: "i ri / new", roman: "jadīd" },
          { ar: "قَدِيمٌ", trans: "i vjetër / old", roman: "qadīm" },
          { ar: "كَبِيرٌ", trans: "i madh / big", roman: "kabīr" },
          { ar: "صَغِيرٌ", trans: "i vogël / small", roman: "ṣaghīr" },
          { ar: "جَمِيلٌ", trans: "i bukur / beautiful", roman: "jamīl" },
          { ar: "مَكْسُورٌ", trans: "i thyer / broken", roman: "maksūr" },
        ],
        grammar: "'Huwa' (ai) dhe 'hiya' (ajo) janë zëmërat e vetës së tretë. Mbiemrat pas tyre duhet të përputhën në gjini: 'huwa kabīr' (ai i madh), 'hiya kabīra' (ajo e madhe).",
        examples: [
          { ar: "الكِتَابُ جَدِيدٌ. هُوَ جَدِيدٌ", roman: "al-kitābu jadīdun. huwa jadīdun", trans: "Libri i ri. Ai është i ri" },
          { ar: "السَّيَّارَةُ جَمِيلَةٌ. هِيَ جَمِيلَةٌ", roman: "as-sayyāratu jamīlatun. hiya jamīlatun", trans: "Makina e bukur. Ajo është e bukur" },
          { ar: "البَابُ مَكْسُورٌ", roman: "al-bābu maksūrun", trans: "Dera është e thyer" },
        ]
      },
      { id: 4, title: "الدرس الرابع — Mësimi 4", topic: "مَنْ هَذَا؟ • Kush është ky?",
        vocab: [
          { ar: "مَنْ هَذَا؟", trans: "Kush është ky?", roman: "man hādhā?" },
          { ar: "مَنْ هَذِهِ؟", trans: "Kush është kjo?", roman: "man hādhihi?" },
          { ar: "رَجُلٌ", trans: "burra / man", roman: "rajul" },
          { ar: "وَلَدٌ", trans: "djalë / boy", roman: "walad" },
          { ar: "امْرَأَةٌ", trans: "grua / woman", roman: "imra'a" },
          { ar: "طَبِيبٌ", trans: "doktor / doctor", roman: "ṭabīb" },
          { ar: "مُعَلِّمٌ", trans: "mësues / teacher", roman: "mu'allim" },
          { ar: "تَاجِرٌ", trans: "tregtar / merchant", roman: "tājir" },
        ],
        grammar: "'Man?' (kush?) është pyetja për persona. Shembull: 'man hādhā? hādhā muḥammad' (kush është ky? Ky është Muhammeti).",
        examples: [
          { ar: "مَنْ هَذَا؟ هَذَا طَبِيبٌ", roman: "man hādhā? hādhā ṭabībun", trans: "Kush është ky? Ky është doktor" },
          { ar: "مَنْ هَذِهِ؟ هَذِهِ مُعَلِّمَةٌ", roman: "man hādhihi? hādhihi mu'allimatun", trans: "Kush është kjo? Kjo është mësuese" },
          { ar: "هَذَا مُحَمَّدٌ وَهَذِهِ فَاطِمَةُ", roman: "hādhā muḥammadun wa hādhihi fāṭimatu", trans: "Ky është Muhammeti dhe kjo është Fatimet" },
        ]
      },
      { id: 5, title: "الدرس الخامس — Mësimi 5", topic: "أَ — Pyetja Yes/No",
        vocab: [
          { ar: "أَ", trans: "a (prefix pyetje)", roman: "a-" },
          { ar: "نَعَمْ", trans: "po / yes", roman: "na'am" },
          { ar: "لَا", trans: "jo / no", roman: "lā" },
          { ar: "أَهَذَا كِتَابٌ؟", trans: "A është ky libër?", roman: "a-hādhā kitābun?" },
          { ar: "أَهَذِهِ سَيَّارَةٌ؟", trans: "A është kjo makinë?", roman: "a-hādhihi sayyāratun?" },
          { ar: "أَأَنْتَ طَالِبٌ؟", trans: "A je nxënës?", roman: "a-anta ṭālibun?" },
          { ar: "بَلَى", trans: "po (përkundër jo)", roman: "balā" },
          { ar: "أَكِيدٌ", trans: "sigurisht / certainly", roman: "akīd" },
        ],
        grammar: "Prefiksi 'a-' shtohet fillimit të fjalisë për pyetje po/jo. 'Na'am' (po), 'lā' (jo). 'Balā' përdoret kur dikush ka thënë 'jo' dhe ti po pohon të kundërtën.",
        examples: [
          { ar: "أَهَذَا بَيْتٌ؟ نَعَمْ، هَذَا بَيْتٌ", roman: "a-hādhā baytun? na'am, hādhā baytun", trans: "A është ky shtëpi? Po, ky është shtëpi" },
          { ar: "أَهَذَا كَلْبٌ؟ لَا، هَذَا قِطٌّ", roman: "a-hādhā kalbun? lā, hādhā qiṭṭun", trans: "A është ky qen? Jo, ky është mace" },
          { ar: "أَهِيَ مُعَلِّمَةٌ؟ نَعَمْ", roman: "a-hiya mu'allimatun? na'am", trans: "A është ajo mësuese? Po" },
        ]
      },
      { id: 6, title: "الدرس السادس — Mësimi 6", topic: "أَيْنَ • Ku?",
        vocab: [
          { ar: "أَيْنَ", trans: "ku / where", roman: "ayna" },
          { ar: "هُنَا", trans: "këtu / here", roman: "hunā" },
          { ar: "هُنَاكَ", trans: "atje / there", roman: "hunāka" },
          { ar: "فِي الْبَيْتِ", trans: "në shtëpi", roman: "fī al-bayt" },
          { ar: "فِي الْفَصْلِ", trans: "në klasë", roman: "fī al-faṣl" },
          { ar: "فِي الْمَسْجِدِ", trans: "në xhami", roman: "fī al-masjid" },
          { ar: "عَلَى الطَّاوِلَةِ", trans: "mbi tryezë", roman: "'alā al-ṭāwila" },
          { ar: "تَحْتَ الْكُرْسِيِّ", trans: "nën karrige", roman: "taḥt al-kursī" },
        ],
        grammar: "Pyetja 'ayna?' (ku?) pyet për vendndodhje. Përgjigja shpesh përfshin prepozitime si 'fī' (në), ''alā' (mbi), 'taḥt' (nën).",
        examples: [
          { ar: "أَيْنَ الْكِتَابُ؟ هُوَ عَلَى الطَّاوِلَةِ", roman: "ayna al-kitābu? huwa 'alā al-ṭāwila", trans: "Ku është libri? Ai është mbi tryezë" },
          { ar: "أَيْنَ مُحَمَّدٌ؟ هُوَ فِي الْمَسْجِدِ", roman: "ayna muḥammadun? huwa fī al-masjidi", trans: "Ku është Muhammeti? Ai është në xhami" },
          { ar: "أَيْنَ أَنْتَ؟ أَنَا هُنَا", roman: "ayna anta? anā hunā", trans: "Ku je ti? Unë jam këtu" },
        ]
      },
      { id: 7, title: "الدرس السابع — Mësimi 7", topic: "فِي • Në / Brenda",
        vocab: [
          { ar: "فِي", trans: "në / in", roman: "fī" },
          { ar: "الْغُرْفَةُ", trans: "dhoma / room", roman: "al-ghurfa" },
          { ar: "الْمَكْتَبُ", trans: "zyra / office", roman: "al-maktab" },
          { ar: "الْمَطْبَخُ", trans: "kuzhina / kitchen", roman: "al-maṭbakh" },
          { ar: "الْحَمَّامُ", trans: "banja / bathroom", roman: "al-ḥammām" },
          { ar: "الْمَدْرَسَةُ", trans: "shkolla / school", roman: "al-madrasa" },
          { ar: "الْجَامِعَةُ", trans: "universiteti / university", roman: "al-jāmi'a" },
          { ar: "السُّوقُ", trans: "tregu / market", roman: "as-sūq" },
        ],
        grammar: "Prepozitime 'fī' (në) tregon se diçka është brenda ose në një vend. Emri pas 'fī' shkon në rasën gjenitore (jarr).",
        examples: [
          { ar: "الْكِتَابُ فِي الْحَقِيبَةِ", roman: "al-kitābu fī al-ḥaqība", trans: "Libri është në çantë" },
          { ar: "الطَّالِبُ فِي الْفَصْلِ", roman: "al-ṭālibu fī al-faṣl", trans: "Nxënësi është në klasë" },
          { ar: "هُوَ فِي الْغُرْفَةِ", roman: "huwa fī al-ghurfa", trans: "Ai është në dhomë" },
        ]
      },
      { id: 8, title: "الدرس الثامن — Mësimi 8", topic: "الـ • Artikulli i Përcaktuar",
        vocab: [
          { ar: "الـ", trans: "artikulli / the", roman: "al-" },
          { ar: "الْكِتَابُ", trans: "libri / the book", roman: "al-kitābu" },
          { ar: "الْبَيْتُ", trans: "shtëpia / the house", roman: "al-baytu" },
          { ar: "الشَّمْسُ", trans: "dielli / the sun", roman: "ash-shamsu" },
          { ar: "الْقَمَرُ", trans: "hëna / the moon", roman: "al-qamaru" },
          { ar: "الطَّالِبُ", trans: "nxënësi / the student", roman: "aṭ-ṭālibu" },
          { ar: "الْمُعَلِّمُ", trans: "mësuesi / the teacher", roman: "al-mu'allimu" },
          { ar: "الشَّارِعُ", trans: "rruga / the street", roman: "ash-shāri'u" },
        ],
        grammar: "Artikulli 'al-' bën emrin të përcaktuar. Para shkronjave diellore (ش ص ض ط ظ ن ر ز س ل ت ث د ذ), 'l' zëvendësohet me atë shkronje. P.sh.: ash-shams (dielli), aṭ-ṭālib (nxënësi).",
        examples: [
          { ar: "الْكِتَابُ عَلَى الطَّاوِلَةِ", roman: "al-kitābu 'alā al-ṭāwila", trans: "Libri është mbi tryezë" },
          { ar: "الشَّمْسُ كَبِيرَةٌ", roman: "ash-shamsu kabīratun", trans: "Dielli është i madh" },
          { ar: "الْقَمَرُ جَمِيلٌ", roman: "al-qamaru jamīlun", trans: "Hëna është e bukur" },
        ]
      },
      { id: 9, title: "الدرس التاسع — Mësimi 9", topic: "الجملة الاسمية • Fjalia Emërore",
        vocab: [
          { ar: "مُبْتَدَأ", trans: "tema / subject", roman: "mubtada'" },
          { ar: "خَبَر", trans: "kallëzuesi / predicate", roman: "khabar" },
          { ar: "نَظِيفٌ", trans: "i pastër / clean", roman: "naẓīf" },
          { ar: "وَسِخٌ", trans: "i ndyrë / dirty", roman: "wasikh" },
          { ar: "بَارِدٌ", trans: "i ftohtë / cold", roman: "bārid" },
          { ar: "حَارٌّ", trans: "i nxehtë / hot", roman: "ḥārr" },
          { ar: "ثَقِيلٌ", trans: "i rëndë / heavy", roman: "thaqīl" },
          { ar: "خَفِيفٌ", trans: "i lehtë / light", roman: "khafīf" },
        ],
        grammar: "Fjalia emërore (jumla ismiyya) formohet nga tema (mubtada') + kallëzuesi (khabar). Nuk ka folje 'është'. Shembull: 'al-baytu kabīrun' (tema=al-baytu, kallëz=kabīrun).",
        examples: [
          { ar: "الْبَيْتُ نَظِيفٌ", roman: "al-baytu naẓīfun", trans: "Shtëpia është e pastër" },
          { ar: "الطَّقْسُ بَارِدٌ", roman: "aṭ-ṭaqsu bāridun", trans: "Moti është i ftohtë" },
          { ar: "الْمَاءُ حَارٌّ", roman: "al-mā'u ḥārrun", trans: "Uji është i nxehtë" },
        ]
      },
      { id: 10, title: "الدرس العاشر — Mësimi 10", topic: "الضمائر • Zëmërat",
        vocab: [
          { ar: "أَنَا", trans: "unë / I", roman: "anā" },
          { ar: "أَنْتَ", trans: "ti (mashk.) / you (m)", roman: "anta" },
          { ar: "أَنْتِ", trans: "ti (fem.) / you (f)", roman: "anti" },
          { ar: "هُوَ", trans: "ai / he", roman: "huwa" },
          { ar: "هِيَ", trans: "ajo / she", roman: "hiya" },
          { ar: "نَحْنُ", trans: "ne / we", roman: "naḥnu" },
          { ar: "أَنْتُمْ", trans: "ju / you (pl)", roman: "antum" },
          { ar: "هُمْ", trans: "ata / they", roman: "hum" },
        ],
        grammar: "Zëmërat e dëftoresit janë fjalë të pavarura. Zakonisht nënkuptohen (fshihen) brenda foljeve, por jepen eksplicit për theksim ose klarifikim.",
        examples: [
          { ar: "أَنَا طَالِبٌ", roman: "anā ṭālibun", trans: "Unë jam nxënës" },
          { ar: "أَنْتَ مُعَلِّمٌ", roman: "anta mu'allimun", trans: "Ti je mësues" },
          { ar: "هُمْ طُلَّابٌ", roman: "hum ṭullābun", trans: "Ata janë nxënës" },
        ]
      },
      { id: 11, title: "الدرس الحادي عشر — Mësimi 11", topic: "المذكر والمؤنث • Mashkulle & Femëror",
        vocab: [
          { ar: "مُذَكَّر", trans: "mashkulle / masculine", roman: "mudhakkar" },
          { ar: "مُؤَنَّث", trans: "femëror / feminine", roman: "mu'annath" },
          { ar: "تَاء مَرْبُوطَة (ة)", trans: "ta marbuta — shenjë femërorit", roman: "tā' marbūṭa" },
          { ar: "طَالِبٌ", trans: "nxënës (mashk.)", roman: "ṭālib" },
          { ar: "طَالِبَةٌ", trans: "nxënëse (fem.)", roman: "ṭāliba" },
          { ar: "كَبِيرٌ / كَبِيرَةٌ", trans: "i madh / e madhe", roman: "kabīr / kabīra" },
          { ar: "جَمِيلٌ / جَمِيلَةٌ", trans: "i bukur / e bukur", roman: "jamīl / jamīla" },
          { ar: "مَرِيضٌ / مَرِيضَةٌ", trans: "i sëmurë / e sëmurë", roman: "marīḍ / marīḍa" },
        ],
        grammar: "Femërorja zakonisht formohet duke shtuar 'ة' (ta marbuta) në fund. Mbiemrat përputhën gjininë me emrin. Sende të caktuara janë femëror sipas konventës (shemsi, ard etj.).",
        examples: [
          { ar: "طَالِبٌ ذَكِيٌّ — طَالِبَةٌ ذَكِيَّةٌ", roman: "ṭālibun dhakiyyun — ṭālibatun dhakiyyatun", trans: "Nxënës i zgjuar — Nxënëse e zgjuar" },
          { ar: "الْبَيْتُ كَبِيرٌ — الشَّقَّةُ كَبِيرَةٌ", roman: "al-baytu kabīrun — ash-shaqqatu kabīratun", trans: "Shtëpia e madhe — Apartamenti e madhe" },
        ]
      },
      { id: 12, title: "الدرس الثاني عشر — Mësimi 12", topic: "الجمع • Shumësi",
        vocab: [
          { ar: "طُلَّابٌ", trans: "nxënës (shumës)", roman: "ṭullāb" },
          { ar: "كُتُبٌ", trans: "libra (shumës i parregullt)", roman: "kutub" },
          { ar: "بُيُوتٌ", trans: "shtëpi (shumës)", roman: "buyūt" },
          { ar: "مَسَاجِدُ", trans: "xhami (shumës)", roman: "masājid" },
          { ar: "مُعَلِّمُونَ", trans: "mësues (shumës mashk. rregullt)", roman: "mu'allimūna" },
          { ar: "مُعَلِّمَاتٌ", trans: "mësuese (shumës fem. rregullt)", roman: "mu'allimāt" },
          { ar: "طَالِبُونَ", trans: "nxënës (shumës mashk. rregullt)", roman: "ṭālibūna" },
          { ar: "طَالِبَاتٌ", trans: "nxënëse (shumës fem. rregullt)", roman: "ṭālibāt" },
        ],
        grammar: "Shumësi ka dy forma: (1) Shumës i rregullt: +ūn (mashk.) ose +āt (fem.); (2) Shumës i parregullt (broken plural): rrënja ndryshon formë plotësisht. Duhet mësuar individualisht.",
        examples: [
          { ar: "كِتَابٌ — كُتُبٌ", roman: "kitāb — kutub", trans: "Libër — Libra" },
          { ar: "مُعَلِّمٌ — مُعَلِّمُونَ", roman: "mu'allim — mu'allimūna", trans: "Mësues — Mësues (shumës)" },
          { ar: "هَؤُلَاءِ طُلَّابٌ", roman: "hā'ulā'i ṭullābun", trans: "Këta janë nxënës" },
        ]
      },
      { id: 13, title: "الدرس الثالث عشر — Mësimi 13", topic: "الصفات • Mbiemrat",
        vocab: [
          { ar: "جَدِيدٌ / قَدِيمٌ", trans: "i ri / i vjetër", roman: "jadīd / qadīm" },
          { ar: "طَوِيلٌ / قَصِيرٌ", trans: "i gjatë / i shkurtër", roman: "ṭawīl / qaṣīr" },
          { ar: "غَنِيٌّ / فَقِيرٌ", trans: "i pasur / i varfër", roman: "ghanī / faqīr" },
          { ar: "صَحِيحٌ / مَرِيضٌ", trans: "i shëndetshëm / i sëmurë", roman: "ṣaḥīḥ / marīḍ" },
          { ar: "مَفْتُوحٌ / مُغْلَقٌ", trans: "i hapur / i mbyllur", roman: "maftūḥ / mughlaq" },
          { ar: "حُلْوٌ / مُرٌّ", trans: "i ëmbël / i hidhur", roman: "ḥulw / murr" },
          { ar: "سَرِيعٌ / بَطِيءٌ", trans: "i shpejtë / i ngadaltë", roman: "sarī' / baṭī'" },
          { ar: "عَالٍ / مُنْخَفِضٌ", trans: "i lartë / i ulët", roman: "'ālin / munkhafaḍ" },
        ],
        grammar: "Mbiemrat në arabishte vijnë PAS emrit (jo para si në shqip). Ata përputhën emrin në gjini, numër dhe përcaktim. Shembull: 'al-kitābu al-jadīdu' (libri i ri).",
        examples: [
          { ar: "الطَّالِبُ الذَّكِيُّ", roman: "aṭ-ṭālibu adh-dhakiyyu", trans: "Nxënësi i zgjuar" },
          { ar: "هَذَا الْكِتَابُ الْجَدِيدُ جَمِيلٌ", roman: "hādhā al-kitābu al-jadīdu jamīlun", trans: "Ky libri i ri është i bukur" },
          { ar: "الْبَابُ مَفْتُوحٌ", roman: "al-bābu maftūḥun", trans: "Dera është e hapur" },
        ]
      },
      { id: 14, title: "الدرس الرابع عشر — Mësimi 14", topic: "الإضافة • Idaafa (Posedi)",
        vocab: [
          { ar: "كِتَابُ الطَّالِبِ", trans: "libri i nxënësit", roman: "kitāb aṭ-ṭālibi" },
          { ar: "بَيْتُ الرَّجُلِ", trans: "shtëpia e burrit", roman: "bayt ar-rajuli" },
          { ar: "قَلَمُ الْمُعَلِّمِ", trans: "pena e mësuesit", roman: "qalam al-mu'allimi" },
          { ar: "اسْمُ اللهِ", trans: "emri i Allahut", roman: "ism allāhi" },
          { ar: "بَابُ الْبَيْتِ", trans: "dera e shtëpisë", roman: "bāb al-bayti" },
          { ar: "مَسْجِدُ الْمَدِينَةِ", trans: "xhamia e qytetit", roman: "masjid al-madīnati" },
          { ar: "كِتَابُ اللهِ", trans: "libri i Allahut (Kurani)", roman: "kitāb allāhi" },
          { ar: "رَسُولُ اللهِ", trans: "i dërguar i Allahut", roman: "rasūl allāhi" },
        ],
        grammar: "Idaafa (strukturë posedimi): emri i parë NUK merr artikull. Emri i dytë zakonisht është i përcaktuar. Shembull: 'kitāb al-muallim' (libri i mësuesit) jo 'al-kitāb al-mu'allim'.",
        examples: [
          { ar: "كِتَابُ الطَّالِبِ جَدِيدٌ", roman: "kitāb aṭ-ṭālibi jadīdun", trans: "Libri i nxënësit është i ri" },
          { ar: "بَيْتُ الْمُعَلِّمِ كَبِيرٌ", roman: "bayt al-mu'allimi kabīrun", trans: "Shtëpia e mësuesit është e madhe" },
          { ar: "رَسُولُ اللهِ مُحَمَّدٌ ﷺ", roman: "rasūlu llāhi muḥammadun", trans: "I dërguar i Allahut është Muhammedi ﷺ" },
        ]
      },
      { id: 15, title: "الدرس الخامس عشر — Mësimi 15", topic: "الحروف الجارة • Prepozitime",
        vocab: [
          { ar: "فِي", trans: "në / in", roman: "fī" },
          { ar: "عَلَى", trans: "mbi / on", roman: "'alā" },
          { ar: "مِنْ", trans: "nga / from", roman: "min" },
          { ar: "إِلَى", trans: "deri te / to", roman: "ilā" },
          { ar: "عَنْ", trans: "rreth / about", roman: "'an" },
          { ar: "مَعَ", trans: "me / with", roman: "ma'a" },
          { ar: "بِـ", trans: "me / by means of", roman: "bi-" },
          { ar: "لِـ", trans: "për / for", roman: "li-" },
        ],
        grammar: "Prepozitimed (ḥurūf jārra) vendosin emrin pas tyre në rasën gjenitore (kasra ـِ). Shembull: 'fī al-bayti' (في البيت) — 'bayt' merr kasra.",
        examples: [
          { ar: "ذَهَبَ إِلَى الْمَسْجِدِ", roman: "dhahaba ilā al-masjidi", trans: "Ai shkoi në xhami" },
          { ar: "الْكِتَابُ عَلَى الْمَكْتَبِ", roman: "al-kitābu 'alā al-maktabi", trans: "Libri është mbi zyrë" },
          { ar: "جَاءَ مِنَ الْهِنْدِ", roman: "jā'a min al-hindi", trans: "Ai erdhi nga India" },
        ]
      },
      { id: 16, title: "الدرس السادس عشر — Mësimi 16", topic: "الأعداد • Numrat",
        vocab: [
          { ar: "وَاحِدٌ", trans: "një / one", roman: "wāḥid" },
          { ar: "اثْنَانِ", trans: "dy / two", roman: "ithnān" },
          { ar: "ثَلَاثَةٌ", trans: "tre / three", roman: "thalātha" },
          { ar: "أَرْبَعَةٌ", trans: "katër / four", roman: "arba'a" },
          { ar: "خَمْسَةٌ", trans: "pesë / five", roman: "khamsa" },
          { ar: "سِتَّةٌ", trans: "gjashtë / six", roman: "sitta" },
          { ar: "سَبْعَةٌ", trans: "shtatë / seven", roman: "sab'a" },
          { ar: "عَشَرَةٌ", trans: "dhjetë / ten", roman: "'ashara" },
        ],
        grammar: "Numrat 3-10 kanë 'polarity gjinore': numri me ة (forma femërore) përdoret me emra mashkullorë! Numrat 1-2 përputhën gjininë normally. Shembull: 'thalāthatu ṭullāb' (tre nxënës).",
        examples: [
          { ar: "عِنْدِي ثَلَاثَةُ كُتُبٍ", roman: "'indī thalāthatu kutubin", trans: "Kam tre libra" },
          { ar: "فِي الْفَصْلِ خَمْسَةُ طُلَّابٍ", roman: "fī al-faṣli khamsatu ṭullābin", trans: "Në klasë ka pesë nxënës" },
          { ar: "لَهُ وَلَدَانِ", roman: "lahu waladāni", trans: "Ai ka dy djem" },
        ]
      },
      { id: 17, title: "الدرس السابع عشر — Mësimi 17", topic: "مقدمة الأفعال • Foljet e Para",
        vocab: [
          { ar: "ذَهَبَ", trans: "shkoi / went", roman: "dhahaba" },
          { ar: "جَاءَ", trans: "erdhi / came", roman: "jā'a" },
          { ar: "قَرَأَ", trans: "lexoi / read", roman: "qara'a" },
          { ar: "كَتَبَ", trans: "shkroi / wrote", roman: "kataba" },
          { ar: "أَكَلَ", trans: "hëngri / ate", roman: "akala" },
          { ar: "شَرِبَ", trans: "piu / drank", roman: "shariba" },
          { ar: "جَلَسَ", trans: "u ul / sat", roman: "jalasa" },
          { ar: "خَرَجَ", trans: "doli / exited", roman: "kharaja" },
        ],
        grammar: "Foljet arabe kanë rrënjë trikonsonantike (3 shkronja). Forma bazë e foljes (të kaluar, veta 3 mashk.) është 'fa'ala' (bëri). Nga kjo rrënjë rrjedhin të gjitha format e tjera.",
        examples: [
          { ar: "ذَهَبَ مُحَمَّدٌ إِلَى الْمَسْجِدِ", roman: "dhahaba muḥammadun ilā al-masjidi", trans: "Muhammeti shkoi në xhami" },
          { ar: "قَرَأَ الْكِتَابَ", roman: "qara'a al-kitāba", trans: "Ai lexoi librin" },
          { ar: "جَاءَ مِنَ الْمَدْرَسَةِ", roman: "jā'a min al-madrasati", trans: "Ai erdhi nga shkolla" },
        ]
      },
      { id: 18, title: "الدرس الثامن عشر — Mësimi 18", topic: "الفعل الماضي • Foljet në të Kaluarën",
        vocab: [
          { ar: "قَرَأَ", trans: "ai lexoi / he read", roman: "qara'a" },
          { ar: "قَرَأَتْ", trans: "ajo lexoi / she read", roman: "qara'at" },
          { ar: "قَرَأْتُ", trans: "unë lexova / I read", roman: "qara'tu" },
          { ar: "قَرَأْتَ", trans: "ti lexove (m.) / you read (m)", roman: "qara'ta" },
          { ar: "قَرَأْتِ", trans: "ti lexove (f.) / you read (f)", roman: "qara'ti" },
          { ar: "قَرَأْنَا", trans: "ne lexuam / we read", roman: "qara'nā" },
          { ar: "قَرَأُوا", trans: "ata lexuan / they read", roman: "qara'ū" },
          { ar: "قَرَأْتُمْ", trans: "ju lexuat / you (pl) read", roman: "qara'tum" },
        ],
        grammar: "Koha e kaluar ndryshon me shtimin e prapashtesave: (هو) folja bazë / (هي) +ت / (أنا) +تُ / (أنت) +تَ / (نحن) +نا / (هم) +وا.",
        examples: [
          { ar: "قَرَأْتُ الْقُرْآنَ", roman: "qara'tu al-qur'āna", trans: "Unë lexova Kuranin" },
          { ar: "ذَهَبَتْ إِلَى الْمَدْرَسَةِ", roman: "dhahabat ilā al-madrasati", trans: "Ajo shkoi në shkollë" },
          { ar: "أَكَلْنَا فِي الْبَيْتِ", roman: "akalnā fī al-bayti", trans: "Ne hëmgrëm në shtëpi" },
        ]
      },
      { id: 19, title: "الدرس التاسع عشر — Mësimi 19", topic: "ضمائر الفاعل • Zëmërat e Temës",
        vocab: [
          { ar: "أَنَا أَذْهَبُ", trans: "unë shkoj", roman: "anā adhhabu" },
          { ar: "أَنْتَ تَذْهَبُ", trans: "ti shkon (m.)", roman: "anta tadhhabu" },
          { ar: "أَنْتِ تَذْهَبِينَ", trans: "ti shkon (f.)", roman: "anti tadhhabhīna" },
          { ar: "هُوَ يَذْهَبُ", trans: "ai shkon", roman: "huwa yadhhabu" },
          { ar: "هِيَ تَذْهَبُ", trans: "ajo shkon", roman: "hiya tadhhabu" },
          { ar: "نَحْنُ نَذْهَبُ", trans: "ne shkojmë", roman: "naḥnu nadhhabu" },
          { ar: "هُمْ يَذْهَبُونَ", trans: "ata shkojnë", roman: "hum yadhhabūna" },
          { ar: "أَنْتُمْ تَذْهَبُونَ", trans: "ju shkoni", roman: "antum tadhhabhūna" },
        ],
        grammar: "Koha e tashme (muḍāri') formohet duke shtuar parashtesa dhe prapashtesa specifike. Parashtesa: أ (ana), تـ (anta/anti/hiya), يـ (huwa/hum), نـ (naḥnu).",
        examples: [
          { ar: "أَنَا أَقْرَأُ الْقُرْآنَ كُلَّ يَوْمٍ", roman: "anā aqra'u al-qur'āna kulla yawmin", trans: "Unë lexoj Kuranin çdo ditë" },
          { ar: "هُوَ يَذْهَبُ إِلَى الْمَسْجِدِ", roman: "huwa yadhhabu ilā al-masjidi", trans: "Ai shkon në xhami" },
          { ar: "نَحْنُ نَدْرُسُ الْعَرَبِيَّةَ", roman: "naḥnu nadrūsu al-'arabiyyata", trans: "Ne studojmë arabishten" },
        ]
      },
      { id: 20, title: "الدرس العشرون — Mësimi 20", topic: "الفعل والمفعول • Folja + Kundrinori",
        vocab: [
          { ar: "مَفْعُولٌ بِهِ", trans: "kundrinori direkt / direct object", roman: "maf'ūlun bihi" },
          { ar: "قَرَأَ الْكِتَابَ", trans: "lexoi librin", roman: "qara'a al-kitāba" },
          { ar: "كَتَبَ الدَّرْسَ", trans: "shkroi mësimin", roman: "kataba ad-darsa" },
          { ar: "شَرِبَ الشَّايَ", trans: "piu çajin", roman: "shariba ash-shāya" },
          { ar: "أَكَلَ الْخُبْزَ", trans: "hëngri bukën", roman: "akala al-khubza" },
          { ar: "فَتَحَ الْبَابَ", trans: "hapi derën", roman: "fataḥa al-bāba" },
          { ar: "رَأَى الْوَلَدَ", trans: "pa djalin", roman: "ra'ā al-walada" },
          { ar: "سَمِعَ الصَّوْتَ", trans: "dëgjoi zërin", roman: "sami'a aṣ-ṣawta" },
        ],
        grammar: "Kundrinori direkt (maf'ūl bihi) merr rasën kallëzuesore (fatḥa ـَ). Kur emri ka artikull, merr ḍamma → fatḥa: 'al-kitābu' (tema) → 'al-kitāba' (kundrinor).",
        examples: [
          { ar: "قَرَأَ مُحَمَّدٌ الْكِتَابَ", roman: "qara'a muḥammadun al-kitāba", trans: "Muhammeti lexoi librin" },
          { ar: "كَتَبَتْ فَاطِمَةُ الدَّرْسَ", roman: "katabat fāṭimatu ad-darsa", trans: "Fatimet shkroi mësimin" },
          { ar: "شَرِبَ الوَلَدُ الْمَاءَ", roman: "shariba al-waladu al-mā'a", trans: "Djali piu ujin" },
        ]
      },
      { id: 21, title: "الدرس الحادي والعشرون — Mësimi 21", topic: "طرق السؤال • Format e Pyetjes",
        vocab: [
          { ar: "مَا / مَاذَا", trans: "çfarë / what", roman: "mā / mādhā" },
          { ar: "مَنْ", trans: "kush / who", roman: "man" },
          { ar: "أَيْنَ", trans: "ku / where", roman: "ayna" },
          { ar: "مَتَى", trans: "kur / when", roman: "matā" },
          { ar: "كَيْفَ", trans: "si / how", roman: "kayfa" },
          { ar: "كَمْ", trans: "sa / how many", roman: "kam" },
          { ar: "لِمَاذَا", trans: "pse / why", roman: "limādhā" },
          { ar: "مِنْ أَيْنَ", trans: "nga ku / from where", roman: "min ayna" },
        ],
        grammar: "Fjalët pyetëse vendosen në fillim të fjalisë. 'Mā' pyet për sende/gjëra, 'man' për persona, 'ayna' për vende, 'matā' për kohë, 'kayfa' për mënyrë.",
        examples: [
          { ar: "مَا اسْمُكَ؟ اسْمِي مُحَمَّدٌ", roman: "mā smuka? ismī muḥammadun", trans: "Cili është emri yt? Emri im është Muhammeti" },
          { ar: "مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنَ الْيَمَنِ", roman: "min ayna anta? anā min al-yamani", trans: "Nga je ti? Unë jam nga Jemeni" },
          { ar: "كَيْفَ حَالُكَ؟ بِخَيْرٍ", roman: "kayfa ḥāluka? bi-khayr", trans: "Si je? Mirë" },
        ]
      },
      { id: 22, title: "الدرس الثاني والعشرون — Mësimi 22", topic: "الحوار • Dialogë të Thjeshtë",
        vocab: [
          { ar: "السَّلَامُ عَلَيْكُمْ", trans: "Paqja qoftë mbi ju", roman: "as-salāmu 'alaykum" },
          { ar: "وَعَلَيْكُمُ السَّلَامُ", trans: "Edhe mbi ju paqja", roman: "wa 'alaykum as-salām" },
          { ar: "كَيْفَ حَالُكَ؟", trans: "Si je?", roman: "kayfa ḥāluka?" },
          { ar: "الْحَمْدُ لِلَّهِ، بِخَيْرٍ", trans: "Faleminderit Allahut, mirë", roman: "al-ḥamdu lillāh, bi-khayr" },
          { ar: "مَا اسْمُكَ؟", trans: "Cili është emri yt?", roman: "mā ismuka?" },
          { ar: "اسْمِي أَحْمَدُ", trans: "Emri im është Ahmed", roman: "ismī aḥmadu" },
          { ar: "أَيْنَ تَسْكُنُ؟", trans: "Ku banon?", roman: "ayna taskunu?" },
          { ar: "مَا شَاءَ اللَّهُ", trans: "Mashallah / Si do Allahu", roman: "mā shā'a llāhu" },
        ],
        grammar: "Dialogjet bazë janë formula të fiksuara. Mësoji si njësi të plota. Shëndeti islamik 'as-salāmu alaykum' është farz (obligim) t'i kthesh me 'wa alaykum as-salām'.",
        examples: [
          { ar: "السَّلَامُ عَلَيْكُمْ! كَيْفَ حَالُكَ يَا أَحْمَدُ؟", roman: "as-salāmu 'alaykum! kayfa ḥāluka yā aḥmadu?", trans: "Selam! Si je, o Ahmed?" },
          { ar: "وَعَلَيْكُمُ السَّلَامُ. أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ", roman: "wa 'alaykum as-salāmu. anā bi-khayr, al-ḥamdu lillāh", trans: "Edhe mbi ty paqja. Unë jam mirë, falënderime Allahut" },
        ]
      },
      { id: 23, title: "الدرس الثالث والعشرون — Mësimi 23", topic: "الْمُرَاجَعَة • Përmbledhje e Plotë",
        vocab: [
          { ar: "مُرَاجَعَةٌ", trans: "përmbledhje / review", roman: "murāja'a" },
          { ar: "هَذَا / هَذِهِ", trans: "ky / kjo", roman: "hādhā / hādhihi" },
          { ar: "أَيْنَ / مَنْ / مَا", trans: "ku / kush / çfarë", roman: "ayna / man / mā" },
          { ar: "الـ / إِضَافَة", trans: "artikulli / posedi", roman: "al- / iḍāfa" },
          { ar: "الْجُمْلَة الاسمية", trans: "fjalia emërore", roman: "al-jumla al-ismiyya" },
          { ar: "الْفِعْلُ الْمَاضِي", trans: "folja e kaluar", roman: "al-fi'l al-māḍī" },
          { ar: "الْمُفْرَد وَالْجَمْع", trans: "njëjësi dhe shumësi", roman: "al-mufrad wa al-jam'" },
          { ar: "الْمُذَكَّر وَالْمُؤَنَّث", trans: "mashkulle dhe femëror", roman: "al-mudhakkar wa al-mu'annath" },
        ],
        grammar: "Rishikimi i plotë: (1) هذا/هذه për sende; (2) مَن/مَا/أَيْنَ pyetje; (3) الـ artikull; (4) إضافة posedi; (5) مذكر/مؤنث gjinia; (6) جمع shumësi; (7) فعل ماضي e kaluar.",
        examples: [
          { ar: "هَذَا كِتَابُ الطَّالِبِ الْجَدِيدِ", roman: "hādhā kitābu aṭ-ṭālibi al-jadīdi", trans: "Ky është libri i ri i nxënësit" },
          { ar: "أَيْنَ ذَهَبَ الطُّلَّابُ؟ ذَهَبُوا إِلَى الْمَسْجِدِ", roman: "ayna dhahaba aṭ-ṭullābu? dhahabū ilā al-masjidi", trans: "Ku shkuan nxënësit? Ata shkuan në xhami" },
          { ar: "الْعَرَبِيَّةُ لُغَةُ الْقُرْآنِ الْكَرِيمِ", roman: "al-'arabiyyatu lughatu al-qur'āni al-karīmi", trans: "Arabishtja është gjuha e Kuranit Fisnik" },
        ]
      },
    ]
  },
  mesatar: {
    title: "الكتاب الثاني — Libri i Dytë",
    subtitle: "Zgjerim i fjalorit dhe gramatikës",
    units: [
      {
        id: 1,
        title: "الوحدة الأولى — Njësia 1",
        topic: "Foljet në të tashme • الفعل المضارع",
        vocab: [
          { ar: "يَكْتُبُ", trans: "shkruan / writes", roman: "yaktubu" },
          { ar: "يَقْرَأُ", trans: "lexon / reads", roman: "yaqra'u" },
          { ar: "يَذْهَبُ", trans: "shkon / goes", roman: "yadhhabu" },
          { ar: "يَأكُلُ", trans: "ha / eats", roman: "ya'kulu" },
          { ar: "يَشرَبُ", trans: "pi / drinks", roman: "yashrabu" },
          { ar: "يَجلِسُ", trans: "ulet / sits", roman: "yajlisu" },
          { ar: "يَنامُ", trans: "fle / sleeps", roman: "yanāmu" },
          { ar: "يُصَلِّي", trans: "fal namaz / prays", roman: "yuṣallī" },
        ],
        grammar: "Foljet arabe kanë rrënjë trikonsonantike. Koha e tashme fillon me prefix: أ (ana), تـ (anta/anti), يـ (huwa), تـ (hiya). P.sh.: rrënja ك-ت-ب (k-t-b = shkruaj) → يكتب (yaktubu).",
        examples: [
          { ar: "يَذهَبُ إلى المَسجِدِ", roman: "yadhhabu ilā al-masjidi", trans: "Ai shkon në xhami" },
          { ar: "أنا أقرَأُ القُرآنَ", roman: "anā aqra'u al-qur'āna", trans: "Unë lexoj Kuranin" },
          { ar: "هي تَكتُبُ الدَّرسَ", roman: "hiya taktubu al-darsa", trans: "Ajo shkruan mësimin" },
        ]
      },
      {
        id: 2,
        title: "الوحدة الثانية — Njësia 2",
        topic: "Rasët gramatikore • حالات الإعراب",
        vocab: [
          { ar: "الرَّفعُ (ـُ)", trans: "emërore — kryefjalë", roman: "rafa' — ḍamma (u)" },
          { ar: "النَّصبُ (ـَ)", trans: "kallëzuesore — kundrinor", roman: "naṣb — fatḥa (a)" },
          { ar: "الجَرُّ (ـِ)", trans: "gjinore/rrjedhore — prep.", roman: "jarr — kasra (i)" },
          { ar: "في البَيتِ", trans: "në shtëpi (rrjedhore)", roman: "fī al-bayti" },
          { ar: "رَأيتُ الطالبَ", roman: "ra'aytu al-ṭāliba", trans: "E pashë studentin (kall.)" },
          { ar: "جاءَ الطالبُ", roman: "jā'a al-ṭālibu", trans: "Erdhi studenti (emër.)" },
          { ar: "مِن، إلى، في، على", trans: "prej, deri, në, mbi", roman: "min, ilā, fī, 'alā" },
          { ar: "مَعَ، عن، بِـ", trans: "me, nga, me/me anë", roman: "ma'a, 'an, bi-" },
        ],
        grammar: "Arabishtja ka tre rasa: Rafia (emërore ـُ), Nasbi (kallëzuesore ـَ), dhe Xheri (gjinore ـِ). Parafjalët gjithmonë vënë emrin pas tyre në rasën gjinore.",
        examples: [
          { ar: "ذَهَبَ المُعَلِّمُ إلى المَدرَسَةِ", roman: "dhahaba al-mu'allimu ilā al-madrasati", trans: "Mësuesi shkoi në shkollë" },
          { ar: "قَرَأتُ كِتاباً مُفيداً", roman: "qara'tu kitāban mufīdan", trans: "Lexova një libër të dobishëm" },
        ]
      },
      {
        id: 3,
        title: "الوحدة الثالثة — Njësia 3",
        topic: "Dialogë të përditshëm • المحادثات اليومية",
        vocab: [
          { ar: "السَّلامُ عَليكُم", trans: "Paqja qoftë me ju / Peace be upon you", roman: "as-salāmu 'alaykum" },
          { ar: "وعَليكُم السَّلام", trans: "Edhe me ju / And upon you peace", roman: "wa 'alaykum as-salām" },
          { ar: "كَيفَ حالُكَ؟", trans: "Si je? / How are you?", roman: "kayfa ḥāluka?" },
          { ar: "بِخَيرٍ، شُكراً", trans: "Mirë, faleminderit", roman: "bi-khayr, shukran" },
          { ar: "أينَ تَسكُنُ؟", trans: "Ku banon? / Where do you live?", roman: "ayna taskunu?" },
          { ar: "أسكُنُ في…", trans: "Banoj në… / I live in…", roman: "askunu fī..." },
          { ar: "ما مِهنَتُكَ؟", trans: "Çfarë pune bën? / What's your job?", roman: "mā mihnatuka?" },
          { ar: "أنا طالِبٌ في الجامِعَةِ", trans: "Jam student në universitet", roman: "anā ṭālibun fī al-jāmi'ati" },
        ],
        grammar: "Pyetjet formohen me fjalë pyetëse: مَن (kush), ما (çfarë), أَينَ (ku), مَتى (kur), كَيفَ (si), كَم (sa), لِماذا (pse).",
        examples: [
          { ar: "أينَ المَكتَبَةُ؟", roman: "ayna al-maktabatu?", trans: "Ku është biblioteka?" },
          { ar: "مَتى يَبدَأُ الدَّرسُ؟", roman: "matā yabda'u al-darsu?", trans: "Kur fillon mësimi?" },
          { ar: "كَم عُمرُكَ؟", roman: "kam 'umruka?", trans: "Sa vjeç je?" },
        ]
      },
      {
        id: 4,
        title: "الوحدة الرابعة — Njësia 4",
        topic: "E kaluara • الفعل الماضي",
        vocab: [
          { ar: "ذَهَبَ", trans: "shkoi / went (he)", roman: "dhahaba" },
          { ar: "ذَهَبتُ", trans: "shkova / went (I)", roman: "dhahabtu" },
          { ar: "ذَهَبنا", trans: "shkuam / went (we)", roman: "dhahabnā" },
          { ar: "كَتَبَ", trans: "shkroi / wrote (he)", roman: "kataba" },
          { ar: "قَرَأَ", trans: "lexoi / read (he)", roman: "qara'a" },
          { ar: "أَكَلَ", trans: "hëngri / ate (he)", roman: "akala" },
          { ar: "جاءَ", trans: "erdhi / came (he)", roman: "jā'a" },
          { ar: "عادَ", trans: "u kthye / returned (he)", roman: "'āda" },
        ],
        grammar: "Koha e kaluar (māḍī) formohet nga rrënja e foljes. Format personale: (هو) ذَهَبَ / (هي) ذَهَبَت / (أنا) ذَهَبتُ / (نحن) ذَهَبنا / (أنتَ) ذَهَبتَ",
        examples: [
          { ar: "ذَهَبتُ إلى المَسجِدِ أمسِ", roman: "dhahabtu ilā al-masjidi amsi", trans: "Shkova në xhami dje" },
          { ar: "قَرَأَ القُرآنَ الكَريمَ", roman: "qara'a al-qur'āna al-karīma", trans: "Ai lexoi Kuranin Famëlartë" },
        ]
      },
    ]
  },
  avancuar: {
    title: "الكتاب الثالث — Libri i Tretë",
    subtitle: "Avancim i plotë në arabishten klasike",
    units: [
      {
        id: 1,
        title: "الوحدة الأولى — Njësia 1",
        topic: "E ardhmja & urdhërorja • المضارع والأمر",
        vocab: [
          { ar: "سَوفَ / سَ", trans: "do të (e ardhme)", roman: "sawfa / sa-" },
          { ar: "سَيَذهَبُ", trans: "do të shkojë", roman: "sa-yadhhabu" },
          { ar: "اُكتُب!", trans: "Shkruaj! (urdhër)", roman: "uktub!" },
          { ar: "اِقرَأ!", trans: "Lexo! (urdhër)", roman: "iqra'!" },
          { ar: "اِذهَب!", trans: "Shko! (urdhër)", roman: "idhhab!" },
          { ar: "لا تَكتُب!", trans: "Mos shkruaj! (ndalim)", roman: "lā taktub!" },
          { ar: "يَجِبُ أن", trans: "duhet të / must", roman: "yajibu an" },
          { ar: "يُمكِنُ أن", trans: "mund të / can", roman: "yumkinu an" },
        ],
        grammar: "Urdhërorja formohet nga forma e dytë e kohës së tashme duke hequr prefiksin ت- dhe duke ndryshuar nisjen. Ndalimi bëhet me: لا + foljja e tashme në mënyrën nënrenditëse.",
        examples: [
          { ar: "سَأذهَبُ إلى مَكَّةَ إن شاءَ اللهُ", roman: "sa-adhhabu ilā makkata in shā'a llāhu", trans: "Do të shkoj në Mekë, nëse do Allahu" },
          { ar: "اِقرَأ بِاسمِ رَبِّكَ", roman: "iqra' bismi rabbika", trans: "Lexo në emër të Zotit tënd" },
        ]
      },
      {
        id: 2,
        title: "الوحدة الثانية — Njësia 2",
        topic: "Fjali të ndërlikuara • الجمل المركبة",
        vocab: [
          { ar: "لِأَنَّ", trans: "sepse / because", roman: "li'anna" },
          { ar: "حَتى", trans: "derisa, që / until, so that", roman: "ḥattā" },
          { ar: "إذا", trans: "nëse / if (e ardhme)", roman: "idhā" },
          { ar: "لَو", trans: "nëse / if (e pamundur)", roman: "law" },
          { ar: "الَّذي / التي", trans: "i cili / e cila (relative)", roman: "alladhī / allatī" },
          { ar: "بَعدَ أن", trans: "pasi / after", roman: "ba'da an" },
          { ar: "قَبلَ أن", trans: "para se / before", roman: "qabla an" },
          { ar: "عِندَما", trans: "kur / when", roman: "'indamā" },
        ],
        grammar: "Lidhëzat 'inna' dhe 'anna' (إنَّ / أنَّ) vendosin emrin pas tyre në rasën kallëzuesore. Lidhëzat shkakore dhe kushtore ndryshojnë mënyrën e foljes.",
        examples: [
          { ar: "ذَهَبتُ إلى المَكتَبَةِ لِأَنَّني أُحِبُّ القِراءَةَ", roman: "dhahabtu ilā al-maktabati li'annanī uḥibbu al-qirā'ata", trans: "Shkova në bibliotekë sepse dua leximin" },
          { ar: "الكِتابُ الَّذي اشتَرَيتُهُ مُفيدٌ", roman: "al-kitābu alladhī ishtaraytuhu mufīdun", trans: "Libri që bleva është i dobishëm" },
        ]
      },
      {
        id: 3,
        title: "الوحدة الثالثة — Njësia 3",
        topic: "Tekste fetare • النصوص الدينية",
        vocab: [
          { ar: "بِسمِ اللهِ الرَّحمنِ الرَّحيمِ", trans: "Në emër të Allahut, të Gjithëmëshirshmit", roman: "bismi llāhi al-raḥmāni al-raḥīmi" },
          { ar: "الحَمدُ للهِ رَبِّ العالَمينَ", trans: "Falënderimi i takon Allahut, Zotit të botëve", roman: "al-ḥamdu li-llāhi rabbi al-'ālamīna" },
          { ar: "إِنَّا للهِ وَإِنَّا إِلَيهِ راجِعونَ", trans: "Ne i përkasim Allahut dhe tek Ai kthehemi", roman: "innā lillāhi wa innā ilayhi rāji'ūna" },
          { ar: "سُبحانَ اللهِ", trans: "I Lartësuar qoftë Allahu", roman: "subḥāna llāhi" },
          { ar: "اللهُ أَكبَرُ", trans: "Allahu është më i Madhi", roman: "allāhu akbaru" },
          { ar: "لا إِلهَ إِلَّا اللهُ", trans: "Nuk ka zot tjetër përveç Allahut", roman: "lā ilāha illā llāhu" },
          { ar: "إن شاءَ الله", trans: "Nëse do Allahu / God willing", roman: "in shā'a llāhu" },
          { ar: "جَزاكَ اللهُ خَيراً", trans: "Allahu të shpërbleftë me të mira", roman: "jazāka llāhu khayran" },
        ],
        grammar: "Shprehjet fetare janë formula të fiksuara gramatikore. 'Bismillah' është shprehje gjenitore (mudāf ilayh). 'Allahu Akbar' — Allahu: emërore (fjalori); Akbar: epëtori pa krahasim.",
        examples: [
          { ar: "قالَ: بِسمِ اللهِ وَبَدَأَ الأَكلَ", roman: "qāla: bismi llāhi wa bada'a al-akla", trans: "Ai tha bismilah dhe filloi të hajë" },
          { ar: "اَلحَمدُ للهِ عَلى كُلِّ حالٍ", roman: "al-ḥamdu lillāhi 'alā kulli ḥālin", trans: "Falënderimi i takon Allahut në çdo situatë" },
        ]
      },
      {
        id: 4,
        title: "الوحدة الرابعة — Njësia 4",
        topic: "Fjali emërore & foljore • الجملة الاسمية والفعلية",
        vocab: [
          { ar: "الجُملةُ الاسمِيَّة", trans: "fjali emërore (emër + epitet)", roman: "al-jumla al-ismiyya" },
          { ar: "الجُملةُ الفِعلِيَّة", trans: "fjali foljore (folje + kryefjalë)", roman: "al-jumla al-fi'liyya" },
          { ar: "المُبتَدَأ", trans: "kryefjala e fjalisë emërore", roman: "al-mubtada'" },
          { ar: "الخَبَر", trans: "kallëzuesi i fjalisë emërore", roman: "al-khabar" },
          { ar: "الفاعِل", trans: "kryefjalë e fjalisë foljore", roman: "al-fā'il" },
          { ar: "المَفعول", trans: "kundrinori", roman: "al-maf'ūl" },
          { ar: "الصِّفَة", trans: "mbiemri (rakor me emrin)", roman: "al-ṣifa" },
          { ar: "الحال", trans: "rrethanori i gjendjes", roman: "al-ḥāl" },
        ],
        grammar: "Fjalia emërore nis me emër dhe kallëzuesi (khabar) mund të jetë emër, mbiemër, ose parafjalë+emër. Fjalia foljore nis me folje dhe kryefjalë (fā'il) vjen pas.",
        examples: [
          { ar: "البَيتُ كَبيرٌ — fjali emërore", roman: "al-baytu kabīrun", trans: "Shtëpia është e madhe" },
          { ar: "ذَهَبَ الطالِبُ — fjali foljore", roman: "dhahaba al-ṭālibu", trans: "Studenti shkoi" },
          { ar: "الكِتابُ الجَديدُ مُفيدٌ جِدًّا", roman: "al-kitābu al-jadīdu mufīdun jiddan", trans: "Libri i ri është shumë i dobishëm" },
        ]
      },
    ]
  },
  profesionist: {
    title: "الكتاب الرابع — Libri i Katërt",
    subtitle: "Thellim profesional në arabishten klasike",
    units: [
      {
        id: 1,
        title: "الوحدة الأولى — Njësia 1",
        topic: "Moda & Tonalitet • صيغ واستخدامات متقدمة",
        vocab: [
          { ar: "كَاد / أوشَكَ", trans: "gati (pothuajse)", roman: "kāda / awshaka" },
          { ar: "بَدَأَ / شَرَعَ", trans: "filloi", roman: "bada'a / shara'a" },
          { ar: "ظَلَّ / بَقِيَ", trans: "mbeti / qëndroi", roman: "ẓalla / baqiya" },
          { ar: "صارَ / أضْحى", trans: "u bë / bëhet (i mëngjesit)", roman: "ṣāra / aḍḥā" },
          { ar: "ما زالَ / ما فتِئَ", trans: "nuk ka pushuar", roman: "mā zāla / mā fatiyya" },
          { ar: "الفِعلُ النّاقِصُ", trans: "foljet e mangëlluara (është, u bë, etj.)", roman: "al-fi'l al-nāqiṣ" },
          { ar: "الفِعلُ التَّامُ", trans: "foljet e plota", roman: "al-fi'l al-tāmm" },
          { ar: "صيغَةُ المُبالَغَةِ", trans: "forma e nënvlerësimit / enfalimeve", roman: "ṣiyaghat al-mubālagha" },
        ],
        grammar: "Foljet e mangëlluara (نواقص) ndryshojnë mënyrën e fjalisë: emërori (mubtada') zëvendësohet me kallëzuesin (naṣb) dhe kallëzuesi (khabar) me emërorin (rafa'). P.sh.: كان الطالب ذكيا — kalb. fo. em. call.",
        examples: [
          { ar: "ما زالَ الطالِبُ يَدرُسُ اللُّغةَ العَربِيَّةَ", roman: "mā zāla al-ṭālibu yadrūsu al-lughata al-'arabiyyata", trans: "Studenti nuk ka pushuar të mësojë arabishte" },
          { ar: "بَدَأَ المُعَلِّمُ الدَّرسَ بِبِسمِ اللهِ", roman: "bada'a al-mu'allimu al-darsa bi-bismi llāhi", trans: "Mësuesi filloi mësimin me Bismillah" },
        ]
      },
      {
        id: 2,
        title: "الوحدة الثانية — Njësia 2",
        topic: "Gjenera e Pasive • الصيغ المختلفة والبناء للمجهول",
        vocab: [
          { ar: "الفِعلُ المَبنِيُّ لِلْمَعلومِ", trans: "vepra në formën aktive", roman: "al-fi'l al-mabni li-l-ma'lūm" },
          { ar: "الفِعلُ المَبنِيُّ لِلْمَجهولِ", trans: "vepra në formën pasive", roman: "al-fi'l al-mabni li-l-majhūl" },
          { ar: "كُتِبَ الدَّرسُ", trans: "Mësimi u shkrua", roman: "kutiba al-darsu" },
          { ar: "اُفْتُقِدَ الطالِبُ", trans: "Studenti u humbë (im.)", roman: "uftuqida al-ṭālibu" },
          { ar: "يُقالُ / يُظَنُّ", trans: "thuhet / mendohet", roman: "yaqālu / yuẓannu" },
          { ar: "الفِعلُ الثُّلاثِيُّ", trans: "foljet trikonsonantike", roman: "al-fi'l al-thulāthī" },
          { ar: "الفِعلُ الرُّباعِيُّ", trans: "foljet katërkonsnanike", roman: "al-fi'l al-rubā'ī" },
        ],
        grammar: "Për të ndërtuar formën pasive, ndryshon vokalizimi i rrënjës. Në të kaluar: فَعَلَ → فُعِلَ; në të tashme: يَفْعَلُ → يُفْعَلُ",
        examples: [
          { ar: "اُكتُشِفَتِ الحَقيقَةُ أخيراً", roman: "uktushshifati al-ḥaqīqatu akhīran", trans: "E vërteta u zbulua më në fund" },
          { ar: "يُفضَّلُ أن تَذهَبَ مَعَنا", roman: "yufaddalu an tadhaba ma'anā", trans: "Preferohet të shkosh me ne" },
        ]
      },
      {
        id: 3,
        title: "الوحدة الثالثة — Njësia 3",
        topic: "Dialogje të avancuara • المحادثات المتقدمة",
        vocab: [
          { ar: "الحِوارُ الفِكْرِيُّ", trans: "diskutim intelektual", roman: "al-ḥiwār al-fikriyy" },
          { ar: "الدِّقاشُ / المُناقَشَة", trans: "debat / diskutim", roman: "al-diqāsh / al-munāqashah" },
          { ar: "مِن وِجهَة نَظَري", trans: "nga këndvështrimi im", roman: "min wijhat nazarī" },
          { ar: "أتَّفِقُ مَعَكَ", trans: "jam dakord me ty", roman: "attafiqu ma'aka" },
          { ar: "أخْتَلِفُ مَعَكَ", trans: "nuk jam dakord", roman: "akhtalifu ma'aka" },
          { ar: "يَجِبُ أن نُناقِشَ هذا", trans: "duhet të diskutojmë këtë", roman: "yajibu an nunāqisha hādhā" },
          { ar: "إذا لِم نُحَلِّ هذه المُشكِلَة", trans: "nëse nuk zgjidhim këtë problem", roman: "idhā lam nuhallil hādhihi al-mushkilata" },
        ],
        grammar: "Lidhëzat kushtore (إذا، لو، لولا) kur pasojnë me folje në kaluar bëhen përshkrim i mënyrës hipotetike ose imagjinare.",
        examples: [
          { ar: "مِن وِجهَة نَظَري، الحَلُّ الأَفضَلُ هو التَّعاوُنُ", roman: "min wijhat nazarī, al-ḥall al-afdal huwa al-ta'āwun", trans: "Nga këndvështrimi im, zgjidhja më e mirë është bashkëpunimi" },
          { ar: "أتَّفِقُ مَعَكَ فِي أَنَّ هذا مُهِمٌّ جِدًّا", roman: "attafiqu ma'aka fī anna hādhā muhimmun jiddan", trans: "Jam dakord me ty se kjo është shumë e rëndësishme" },
        ]
      },
      {
        id: 4,
        title: "الوحدة الرابعة — Njësia 4",
        topic: "Morfologia e Thelluar • الصرف المتقدم والمشتقات",
        vocab: [
          { ar: "المِشتَقّاتُ", trans: "derivatet (nga rrënja)", roman: "al-mishtaqqāt" },
          { ar: "اِسمُ الفاعِلِ", trans: "emri i të vepruesit", roman: "ism al-fā'il" },
          { ar: "اِسمُ المَفعولِ", trans: "emri i të padeturit", roman: "ism al-maf'ūl" },
          { ar: "الصِّفَةُ المُشبَّهَة", trans: "mbiemri i përmendorur (konstant)", roman: "al-ṣifa al-mushaббaha" },
          { ar: "اِسمُ المَكانِ", trans: "emri i vendit", roman: "ism al-makān" },
          { ar: "اِسمُ الزَّمانِ", trans: "emri i kohës", roman: "ism al-zamān" },
          { ar: "اِسمُ الآلَة", trans: "emri i mjeti/allatit", roman: "ism al-ālah" },
          { ar: "المَصدَرُ", trans: "masdar (emri i veprimit)", roman: "al-maṣdar" },
        ],
        grammar: "Derivatet janë emra të prejardhur nga rrënjë folese. Emri i të vepruesit (فاعل) pron fjalën që nuk ka përfunduar veprimin. Emri i të padeturit (مفعول) përshkruan atë që ka pësuar veprimin.",
        examples: [
          { ar: "الكِتابُ المَكتوبُ مُفيدٌ", roman: "al-kitābu al-maktubu mufīdun", trans: "Libri i shkruar (mfj) është i dobishëm" },
          { ar: "الكاتِبُ يَكتُبُ الدَّرسَ", roman: "al-kātibu yaktūbu al-darsa", trans: "Shkruesi (ft) shkruan mësimin" },
          { ar: "المَدرَسَةُ مَكانٌ لِلدِّراسَةِ", roman: "al-madrasatu makānun li-l-dirāsati", trans: "Shkolla është vend (për studim)" },
        ]
      },
    ]
  }
};

const speak = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.65;
  const doSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.startsWith("ar")) || voices.find(v => v.lang.startsWith("en"));
    if (arVoice) u.voice = arVoice;
    window.speechSynthesis.speak(u);
  };
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) doSpeak();
  else {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      doSpeak();
    };
    setTimeout(doSpeak, 800);
  }
};

export default function MedineArabicView() {
  const [level, setLevel] = useState("fillestar");
  const [openUnit, setOpenUnit] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const data = MEDINE_DATA[level];
  
  if (selectedUnit) {
    return (
      <div className="space-y-5">
        <button
          onClick={() => setSelectedUnit(null)}
          className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-4"
        >
          ← Kthehu te Mësimet
        </button>
        <MedineExercises unit={selectedUnit} onBack={() => setSelectedUnit(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-700 to-teal-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🕌</span>
          <div>
            <h2 className="text-xl font-extrabold">Arabisht — Metoda e Medinës</h2>
            <p className="text-emerald-100 text-sm">Mëso arabishten klasike hap pas hapi</p>
          </div>
        </div>
      </div>

      {/* Level Selector */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-sm font-semibold text-gray-600 mb-3">Zgjidhni nivelin:</p>
        <div className="flex flex-wrap gap-3">
          {LEVELS.map(l => (
            <button key={l.value} onClick={() => { setLevel(l.value); setOpenUnit(0); }}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex flex-col items-start ${level === l.value ? "bg-emerald-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <span>{l.label}</span>
              <span className={`text-xs ${level === l.value ? "text-emerald-100" : "text-gray-400"}`}>{l.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Chart */}
      <MedineProgressChart level={level} />

      {/* Book Title */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: "serif" }}>{data.title}</h3>
        <p className="text-sm text-gray-500">{data.subtitle}</p>
      </div>

      {/* Info boxes për të gjithë nivelet */}
      {(level === "fillestar" || level === "mesatar" || level === "avancuar" || level === "profesionist") && (
        <div className={`bg-gradient-to-br rounded-2xl p-5 space-y-3 border ${
          level === "fillestar" ? "from-blue-50 to-indigo-50 border-blue-100" :
          level === "mesatar" ? "from-emerald-50 to-teal-50 border-emerald-100" :
          level === "avancuar" ? "from-amber-50 to-orange-50 border-amber-100" :
          "from-purple-50 to-indigo-50 border-purple-100"
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{level === "fillestar" ? "📱" : level === "mesatar" ? "📚" : level === "avancuar" ? "🎓" : "🏆"}</span>
            <h4 className={`font-bold text-sm ${
              level === "fillestar" ? "text-blue-800" :
              level === "mesatar" ? "text-emerald-800" :
              level === "avancuar" ? "text-amber-800" :
              "text-purple-800"
            }`}>Rreth Kursit — Arabisht Medinase {level === "fillestar" ? "Pjesa 1" : level === "mesatar" ? "Pjesa 2" : level === "avancuar" ? "Pjesa 3" : "Pjesa 4"}</h4>
          </div>

          {level === "fillestar" && (
            <>
              <p className="text-sm text-gray-700 leading-relaxed">
                Aplikacioni për studimin e gjuhës arabe i zhvilluar sipas metodologjisë së kursit <strong>Medinah pjesa 1</strong>. I përshtatshëm për ata që fillojnë të mësojnë arabisht nga e para, si dhe për ata që duan të forcojnë njohurit e tyre.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Thelbi i të gjithë aplikacionit është se ju duhet të mbledhni fraza në arabisht. Me ne do të mësoni gjuhën arabe në një kohë të shkurtër <strong>hap pas hapi</strong>.
              </p>
            </>
          )}

          {level === "mesatar" && (
            <>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Kursi i Medinës Pjesa 2</strong> — Zgjerim i plotë i fjalorit dhe gramatikës arabe. I përshtatshëm për ata që kanë mbaruar Pjesën 1 dhe duan të forcojnë njohuritë e tyre më tej.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Thelbi i të gjithë aplikacionit është se ju duhet të mbledhni fraza në arabisht. Me ne do të mësoni arabisht në një kohë të shkurtër <strong>hap pas hapi</strong>.
              </p>
            </>
          )}

          {level === "avancuar" && (
            <>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Kursi i Medinës Pjesa 3</strong> — Avancim i plotë në arabishten klasike. I përshtatshëm për ata që kanë përfunduar Pjesat 1 dhe 2 dhe duan të avancojnë njohuritë e tyre.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Thelbi i të gjithë aplikacionit është se ju duhet të mbledhni fraza në arabisht. Me ne do të mësoni arabisht në një kohë të shkurtër <strong>hap pas hapi</strong>.
              </p>
            </>
          )}

          {level === "profesionist" && (
            <>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Kursi i Medinës Pjesa 4</strong> — Kjo është <strong>pjesa e katërt e fundit</strong> e kursit të arabishtes Medina. Thellim profesional në arabishten klasike me fokus në morfologjinë e avancuar.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Thelbi i të gjithë aplikacionit është se ju duhet të mbledhni fraza në arabisht. Me ne do të mësoni arabisht në një kohë të shkurtër <strong>hap pas hapi</strong>.
              </p>
            </>
          )}

          <div className="bg-white/70 rounded-xl p-3 border" style={{borderColor: level === "fillestar" ? "#bfdbfe" : level === "mesatar" ? "#a7f3d0" : level === "avancuar" ? "#fed7aa" : "#d8b4fe"}}>
            <p className={`text-xs font-bold mb-1 ${
              level === "fillestar" ? "text-blue-700" :
              level === "mesatar" ? "text-emerald-700" :
              level === "avancuar" ? "text-amber-700" :
              "text-purple-700"
            }`}>📋 Çdo mësim ka 1 deri në {level === "profesionist" ? "3" : "4"} skeda:</p>
            <ul className="text-xs text-gray-600 space-y-1 list-disc ml-4">
              <li><strong>Sharh (Përshkrim)</strong> — Përshkrim i plotë i rregullave gramatikore</li>
              <li><strong>Fjalët Arabe</strong> — Lista e fjalëve të reja me aktrim zanor</li>
              {(level === "fillestar" || level === "mesatar") && <li><strong>Lidhja e Foljeve</strong> — Ushtrime me foljet arabe (Pjesa 2)</li>}
              <li><strong>Dialogë</strong> — Mbledh dialogë në arabisht</li>
            </ul>
          </div>

          {level === "fillestar" && (
            <p className="text-xs text-gray-500 italic">
              💡 Nëse nuk keni mësuar ende alfabetin arab, rekomandojmë të filloni me modulin <strong>Alfabeti Arab</strong> më parë.
            </p>
          )}

          <div className={`rounded-xl p-3 border ${
            level === "fillestar" ? "bg-emerald-50 border-emerald-100" :
            level === "mesatar" ? "bg-blue-50 border-blue-100" :
            level === "avancuar" ? "bg-emerald-50 border-emerald-100" :
            "bg-blue-50 border-blue-100"
          }`}>
            <p className={`text-xs font-bold mb-1 ${
              level === "fillestar" || level === "avancuar" ? "text-emerald-700" : "text-blue-700"
            }`}>
              {level === "fillestar" ? "🎓 Pas Kursit 1" : level === "mesatar" ? "🎓 Pas Kursit 2" : level === "avancuar" ? "🎓 Pas Kursit 3" : "🏆 Kursi i Katërt"}
            </p>
            <p className="text-xs text-gray-600">
              {level === "fillestar" ? "Mund të vazhdoni me Kursin e Gjuhës Arabe Medina Pjesa 2 — Zgjerim i mëtejshëm i fjalorit dhe gramatikës." :
               level === "mesatar" ? "Mund të vazhdoni me Kursin e Gjuhës Arabe Medina Pjesa 3 — Avancim i plotë në arabishten klasike." :
               level === "avancuar" ? "Mund të vazhdoni me Kursin e Gjuhës Arabe Medina Pjesa 4 — Thellim profesional me morfologji të avancuar." :
               "Ju keni përfunduar serinë e plotë Medina! Aplikacioni ka tre opsione zanore (dy mashkull, një femër) ideale për të mësuar arabisht në grup ose familje."}
            </p>
          </div>

          {level === "profesionist" && (
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-3 text-white">
              <p className="text-xs font-bold mb-1">✨ Përparimi në Aplikacion</p>
              <p className="text-xs">Duke përdorur modalitetet e mësimit: mblethje e fjalëve, fusnote manuale (për të avancuara), opsione zanore multiple — mëso arabisht si kurrë më parë!</p>
            </div>
          )}
        </div>
      )}

      {/* Units */}
      {data.units.map((unit, idx) => (
        <motion.div key={unit.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Unit Header */}
          <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenUnit(openUnit === idx ? -1 : idx)}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                {unit.id}
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800 text-sm">{unit.title}</p>
                <p className="text-xs text-emerald-600">{unit.topic}</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${openUnit === idx ? "rotate-90" : ""}`} />
          </button>

          {openUnit === idx && (
            <div className="border-t border-gray-100 p-5 space-y-5">
              {/* Progress Tracker */}
              <MedineProgressTracker level={level} unit={unit} onCompleted={() => {}} />

              {/* Vocabulary */}
              <div>
                <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" /> المُفرَدات — Fjalori
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {unit.vocab.map((v, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 group cursor-pointer"
                      onClick={() => speak(v.ar)}>
                      <div>
                        <span className="text-gray-600 text-xs">{v.trans}</span>
                        {v.roman && <p className="text-[11px] text-gray-400 italic">{v.roman}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-emerald-800" style={{ fontFamily: "serif", direction: "rtl" }}>{v.ar}</span>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Grammar Note */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-xs font-bold text-amber-700 mb-1 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> القاعِدَة — Rregulli Gramatikor
                </p>
                <p className="text-sm text-amber-800">{unit.grammar}</p>
              </div>

              {/* Examples */}
              <div>
                <h4 className="font-bold text-gray-700 mb-3">الأَمثِلَة — Shembuj</h4>
                <div className="space-y-3">
                  {unit.examples.map((ex, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-emerald-200 transition-colors"
                      onClick={() => speak(ex.ar)}>
                      <p className="text-xl text-right font-bold text-gray-900 mb-1" style={{ fontFamily: "serif", direction: "rtl" }}>{ex.ar}</p>
                      <p className="text-xs text-gray-400 italic mb-1">{ex.roman}</p>
                      <p className="text-sm text-emerald-700 font-medium">{ex.trans}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercises Button */}
              <button
                onClick={() => setSelectedUnit(unit)}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-4 font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                <Lightbulb className="w-5 h-5" /> Fillo Ushtrimin
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}