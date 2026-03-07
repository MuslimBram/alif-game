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
    subtitle: "Madinah Book 2 — 30 Mësime të Arabishtes Intermediate",
    units: [
      { id: 1, title: "الدرس الأول — Mësimi 1", topic: "Rishikimi i Librit 1 • مراجعة الكتاب الأول", vocab: [{ ar: "ملخص", trans: "përmbledhje / summary", roman: "mulakhkhaṣ" }, { ar: "أساسي", trans: "bazik / basic", roman: "asāsi" }, { ar: "مهم", trans: "i rëndësishëm / important", roman: "muhimm" }, { ar: "كامل", trans: "i plotë / complete", roman: "kāmil" }], grammar: "Rishikimi i të gjithë gramatikës dhe fjalorit nga Libri 1: hādhā, hādhihi, mā, man, ayna, fī, al-, idāfa.", examples: [{ ar: "هذا كتاب جميل", roman: "hādhā kitāb jamīl", trans: "Ky është libër i bukur" }, { ar: "من هذا؟", roman: "man hādhā?", trans: "Kush është ky?" }] },
      { id: 2, title: "الدرس الثاني — Mësimi 2", topic: "Rishikimi i Fjalive Nominale • الجملة الاسمية", vocab: [{ ar: "اسمي", trans: "emror / nominal", roman: "ismī" }, { ar: "فعلي", trans: "foljor / verbal", roman: "fi'lī" }, { ar: "محمود", trans: "i mirepritur / praised", roman: "maḥmūd" }], grammar: "Fjalia emërore = tema + kallëzuesi. Nuk ka folje 'jam'. P.sh.: al-baytu kabīr (shtëpia është e madhe).", examples: [{ ar: "الكتاب أحمر", roman: "al-kitāb aḥmar", trans: "Libri është i kuq" }] },
      { id: 3, title: "الدرس الثالث — Mësimi 3", topic: "Rishikimi i Përemrave Dëshmorë • الضمائر الإشارية", vocab: [{ ar: "ذا", trans: "ky / this", roman: "dhā" }, { ar: "تلك", trans: "ajo / that", roman: "tilka" }], grammar: "Përemrat dëshmorë: hādhā (ky-m), hādhihi (kjo-f), dhāk (ai-m), tilk (ajo-f).", examples: [{ ar: "هذا بيت وتلك شجرة", roman: "hādhā bayt wa tilka shajara", trans: "Ky është shtëpi dhe ajo është pemë" }] },
      { id: 4, title: "الدرس الرابع — Mësimi 4", topic: "Rishikimi i Parafjalëve • الحروف الجارة", vocab: [{ ar: "في", trans: "në", roman: "fī" }, { ar: "على", trans: "mbi", roman: "'alā" }, { ar: "من", trans: "nga", roman: "min" }, { ar: "إلى", trans: "deri", roman: "ilā" }], grammar: "Parafjalët ndryshojnë emrin pas tyre në rasën gjenitore (kasra).", examples: [{ ar: "في البيت", roman: "fī al-bayt", trans: "Në shtëpi" }] },
      { id: 5, title: "الدرس الخامس — Mësimi 5", topic: "Folje në Kohën e Shkuar • الفعل الماضي", vocab: [{ ar: "قرأ", trans: "lexoi", roman: "qara'a" }, { ar: "كتب", trans: "shkroi", roman: "kataba" }, { ar: "ذهب", trans: "shkoi", roman: "dhahaba" }], grammar: "E kaluara formohet nga rrënja 3-shkronjare. Struktura: consonant-vowel-consonant.", examples: [{ ar: "قرأت الكتاب", roman: "qara'tu al-kitāb", trans: "Unë lexova librin" }] },
      { id: 6, title: "الدرس السادس — Mësimi 6", topic: "Folje me Kryefjalë • الفعل والفاعل", vocab: [{ ar: "فاعل", trans: "tema", roman: "fā'il" }, { ar: "فعل", trans: "folje", roman: "fi'l" }], grammar: "Tema (fā'il) = ai/ajo që kryen veprimin. Tema vjen pas foljes ose nënkuptohet.", examples: [{ ar: "ذهب محمد", roman: "dhahaba muḥammad", trans: "Muhammeti shkoi" }] },
      { id: 7, title: "الدرس السابع — Mësimi 7", topic: "Folje + Kundërshtim • الفعل والمفعول", vocab: [{ ar: "مفعول", trans: "kundrinor", roman: "maf'ūl" }, { ar: "به", trans: "nga ai", roman: "bihi" }], grammar: "Kundrinori direkt merr kasën kallëzuesore (fatḥa). P.sh.: qara'tu al-kitāb (lexova librin).", examples: [{ ar: "كتبت الرسالة", roman: "katabtu ar-risāla", trans: "Unë shkrova letrën" }] },
      { id: 8, title: "الدرس الثامن — Mësimi 8", topic: "Folje në Kohën e Tashme • الفعل المضارع", vocab: [{ ar: "يفعل", trans: "bën", roman: "yaf'al" }, { ar: "تفعل", trans: "bën (fem)", roman: "taf'al" }, { ar: "أفعل", trans: "bëj (unë)", roman: "af'al" }], grammar: "E tashme ka parashtesa personale. Forma bazë: yaf'al (ai bën).", examples: [{ ar: "أقرأ الكتاب", roman: "aqra'u al-kitāb", trans: "Unë lexoj librin" }] },
      { id: 9, title: "الدرس التاسع — Mësimi 9", topic: "Koha e Tashme me Përemra • المضارع مع الضمائر", vocab: [{ ar: "أنا أفعل", trans: "unë bëj", roman: "anā af'al" }, { ar: "أنت تفعل", trans: "ti bën", roman: "anta taf'al" }, { ar: "هو يفعل", trans: "ai bën", roman: "huwa yaf'al" }], grammar: "E tashme përputhej me të gjithë përemrat personale me forma të ndryshme.", examples: [{ ar: "هو يكتب درساً", roman: "huwa yaktub darsan", trans: "Ai shkruan një mësim" }] },
      { id: 10, title: "الدرس العاشر — Mësimi 10", topic: "Përemrat e Subjektit • ضمائر الفاعل", vocab: [{ ar: "أنا", trans: "unë", roman: "anā" }, { ar: "نحن", trans: "ne", roman: "naḥnu" }, { ar: "هم", trans: "ata", roman: "hum" }], grammar: "Përemrat e subjektit zakonisht nënkuptohen në folje por mund të jepen për theksim.", examples: [{ ar: "أنا طالب", roman: "anā ṭālib", trans: "Unë jam nxënës" }] },
      { id: 11, title: "الدرس الحادي عشر — Mësimi 11", topic: "Përemrat e Objektit • ضمائر المفعول", vocab: [{ ar: "ياه", trans: "atë (mashk)", roman: "yāhu" }, { ar: "ياها", trans: "atë (fem)", roman: "yāhā" }], grammar: "Përemrat e objektit bashkohen drejtpërdrejtë me foljen ose parafjalën.", examples: [{ ar: "أكلته", roman: "akaltahu", trans: "Unë e hëngra" }] },
      { id: 12, title: "الدرس الثاني عشر — Mësimi 12", topic: "Përemra të Bashkangjitur • الضمائر المتصلة", vocab: [{ ar: "ـي", trans: "im", roman: "-ī" }, { ar: "ـك", trans: "yt", roman: "-ka" }, { ar: "ـه", trans: "i tij", roman: "-hu" }], grammar: "Përemrat e bashkangjitur bashkohen me emrat dhe prepozitime. P.sh.: kitābī (libri im).", examples: [{ ar: "كتابي أحمر", roman: "kitābī aḥmar", trans: "Libri im është i kuq" }] },
      { id: 13, title: "الدرس الثالث عشر — Mësimi 13", topic: "Struktura e Posedimit • الإضافة", vocab: [{ ar: "مضاف", trans: "emër i parë", roman: "muḍāf" }, { ar: "مضاف إليه", trans: "emër i dytë", roman: "muḍāf ilayh" }], grammar: "Idaafa: emri 1 (pa artikull) + emri 2 (me artikull). P.sh.: kitāb al-muallim (libri i mësuesit).", examples: [{ ar: "بيت الله", roman: "bayt allāh", trans: "Shtëpia e Allahut (Kaba)" }] },
      { id: 14, title: "الدرس الرابع عشر — Mësimi 14", topic: "Rishikimi i Mbiemrave • الصفات", vocab: [{ ar: "جميل", trans: "i bukur", roman: "jamīl" }, { ar: "كبير", trans: "i madh", roman: "kabīr" }, { ar: "صغير", trans: "i vogël", roman: "ṣaghīr" }], grammar: "Mbiemrat përputhën emrin në gjini, numër dhe përcaktim. P.sh.: al-kitāb al-aḥmar (libri i kuq).", examples: [{ ar: "البيت الكبير", roman: "al-bayt al-kabīr", trans: "Shtëpia e madhe" }] },
      { id: 15, title: "الدرس الخامس عشر — Mësimi 15", topic: "Formë e Dyfishtë • المثنى", vocab: [{ ar: "كتابان", trans: "dy libra", roman: "kitābān" }, { ar: "طالبان", trans: "dy nxënës", roman: "ṭālibān" }], grammar: "Dyshorja formohet me +ān (nominative) ose +ayn (oblique). Vlen për emra, mbiemra, zëmëra.", examples: [{ ar: "الرجلان", roman: "ar-rajulān", trans: "Dy burra" }] },
      { id: 16, title: "الدرس السادس عشر — Mësimi 16", topic: "Format e Shumësit • صيغ الجمع", vocab: [{ ar: "طلاب", trans: "nxënës", roman: "ṭullāb" }, { ar: "معلمون", trans: "mësues", roman: "mu'allimūn" }, { ar: "كتب", trans: "libra", roman: "kutub" }], grammar: "Shumësi i rregullt (mashk): +ūn (nom) ose +īn (obl). Shumësi i parregullt: ndryshim i rrënjës.", examples: [{ ar: "الطلاب يدرسون", roman: "aṭ-ṭullāb yadrūsūn", trans: "Nxënësit po studiojnë" }] },
      { id: 17, title: "الدرس السابع عشر — Mësimi 17", topic: "Tingulli Mashkullor Shumës • جمع المذكر السالم", vocab: [{ ar: "معلمون", trans: "mësues", roman: "mu'allimūn" }, { ar: "طالبون", trans: "nxënës", roman: "ṭālibūn" }], grammar: "Shumësi mashkullor i rregullt merr +ūn (nominative) ose +īn (accusative/genitive).", examples: [{ ar: "المعلمون يعلمون", roman: "al-mu'allimūn yu'allimūn", trans: "Mësuesit po mësojnë" }] },
      { id: 18, title: "الدرس الثامن عشر — Mësimi 18", topic: "Shumësi i Tingullit Femëror • جمع المؤنث السالم", vocab: [{ ar: "معلمات", trans: "mësuese", roman: "mu'allimāt" }, { ar: "طالبات", trans: "nxënëse", roman: "ṭālibāt" }], grammar: "Shumësi femëror merr +āt (të gjitha rasët). Këta emra femërorë janë përgjithësisht profesione dhe statuse.", examples: [{ ar: "المعلمات يعلمن", roman: "al-mu'allimāt yu'allimna", trans: "Mësueset po mësojnë" }] },
      { id: 19, title: "الدرس التاسع عشر — Mësimi 19", topic: "Shumës i Thyer • جمع التكسير", vocab: [{ ar: "أسد", trans: "luv", roman: "asad" }, { ar: "أسود", trans: "luanë", roman: "usūd" }, { ar: "كتاب", trans: "libër", roman: "kitāb" }, { ar: "كتب", trans: "libra", roman: "kutub" }], grammar: "Shumësi i thyer ndryshon plotësisht formën. Nuk ka formula e përgjithshme - duhet mësuar individualisht.", examples: [{ ar: "الأسود قوية", roman: "al-usūd qawīya", trans: "Luanë janë të forta" }] },
      { id: 20, title: "الدرس العشرون — Mësimi 20", topic: "Numrat • الأعداد", vocab: [{ ar: "واحد", trans: "një", roman: "wāḥid" }, { ar: "اثنان", trans: "dy", roman: "ithnān" }, { ar: "ثلاثة", trans: "tre", roman: "thalātha" }, { ar: "عشرة", trans: "dhjetë", roman: "'ashara" }], grammar: "Numrat 1-2 përputhën gjininë normally. Numrat 3-10 kanë polarity gjinore (e kundërt me emrin).", examples: [{ ar: "ثلاثة كتب", roman: "thalāthat kutub", trans: "Tre libra" }] },
      { id: 21, title: "الدرس الحادي والعشرون — Mësimi 21", topic: "Fjalë Pyetëse • الاستفهام", vocab: [{ ar: "ما", trans: "çfarë", roman: "mā" }, { ar: "من", trans: "kush", roman: "man" }, { ar: "أين", trans: "ku", roman: "ayna" }, { ar: "متى", trans: "kur", roman: "matā" }, { ar: "كيف", trans: "si", roman: "kayf" }], grammar: "Fjalë pyetëse vendosen në fillim të fjalisë. Mund të kombinohen me prepozitime: min ayna (nga ku), bi-kayf (si me anë).", examples: [{ ar: "ما اسمك؟", roman: "mā smuka?", trans: "Cili është emri yt?" }] },
      { id: 22, title: "الدرس الثاني والعشرون — Mësimi 22", topic: "Fjali Negative • الجملة السالبة", vocab: [{ ar: "لا", trans: "jo", roman: "lā" }, { ar: "ليس", trans: "nuk është", roman: "laysa" }, { ar: "ما", trans: "nuk", roman: "mā" }], grammar: "Negimi i fjalive emërore: laysa + emër + mbiemër. Negimi i foljeve: mā + folje.", examples: [{ ar: "ليس هذا كتاباً", roman: "laysa hādhā kitāban", trans: "Ky nuk është libër" }] },
      { id: 23, title: "الدرس الثالث والعشرون — Mësimi 23", topic: "Komandat • الأمر", vocab: [{ ar: "اكتب!", trans: "shkruaj!", roman: "uktub!" }, { ar: "اقرأ!", trans: "lexo!", roman: "iqra'!" }, { ar: "اذهب!", trans: "shko!", roman: "idhhab!" }], grammar: "Urdhërorja formohet nga forma e dytë e kohës së tashme duke hequr prefiksin dhe ndryshuar nisjen.", examples: [{ ar: "اقرأ بسم ربك!", roman: "iqra' bismi rabbik!", trans: "Lexo në emër të Zotit tënd!" }] },
      { id: 24, title: "الدرس الرابع والعشرون — Mësimi 24", topic: "Ndalimi • النهي", vocab: [{ ar: "لا تفعل", trans: "mos bëj", roman: "lā taf'al" }, { ar: "لا تكتب", trans: "mos shkruaj", roman: "lā taktub" }], grammar: "Ndalimi: lā + folja e tashme në formën nënrenditëse. P.sh.: lā taktub (mos shkruaj).", examples: [{ ar: "لا تقولوا كذباً", roman: "lā taqūlū kidhban", trans: "Mos thoni gënjeshtëra" }] },
      { id: 25, title: "الدرس الخامس والعشرون — Mësimi 25", topic: "Ndajfoljet e Kohës • ظروف الزمان", vocab: [{ ar: "الآن", trans: "tani", roman: "al-ān" }, { ar: "أمس", trans: "dje", roman: "ams" }, { ar: "غداً", trans: "nesër", roman: "ghadan" }, { ar: "دائماً", trans: "gjithmonë", roman: "dā'iman" }], grammar: "Ndajfoljet e kohës përcaktojnë kohën e veprimit. Zakonisht vendosen në fund të fjalisë.", examples: [{ ar: "أنا أدرس الآن", roman: "anā adrūs al-ān", trans: "Unë po studioj tani" }] },
      { id: 26, title: "الدرس السادس والعشرون — Mësimi 26", topic: "Ndajfoljet e Vendit • ظروف المكان", vocab: [{ ar: "هنا", trans: "këtu", roman: "hunā" }, { ar: "هناك", trans: "atje", roman: "hunāka" }, { ar: "فوق", trans: "lart", roman: "fawq" }, { ar: "تحت", trans: "nën", roman: "taḥt" }], grammar: "Ndajfoljet e vendit përcaktojnë vendin e veprimit. Mund të përdoren me prepozitime.", examples: [{ ar: "الكتاب فوق الطاولة", roman: "al-kitāb fawq aṭ-ṭāwila", trans: "Libri është lart tryezës" }] },
      { id: 27, title: "الدرس السابع والعشرون — Mësimi 27", topic: "Lidhëza • الروابط", vocab: [{ ar: "و", trans: "dhe", roman: "wa" }, { ar: "أو", trans: "ose", roman: "aw" }, { ar: "لكن", trans: "por", roman: "lākin" }, { ar: "لأن", trans: "sepse", roman: "li'anna" }], grammar: "Lidhëzat lidhin fjalë ose fraza. 'wa' është më e zakonshme. 'li'anna' vendos emrin kallëzuesore.", examples: [{ ar: "محمد ذكي لكن كسول", roman: "muḥammad dhakī lākin kasūl", trans: "Muhammeti është i zgjuar por dembel" }] },
      { id: 28, title: "الدرس الثامن والعشرون — Mësimi 28", topic: "Fjali me Kusht • الجملة الشرطية", vocab: [{ ar: "إذا", trans: "nëse", roman: "idhā" }, { ar: "لو", trans: "nëse (e pamundur)", roman: "law" }, { ar: "إن", trans: "nëse", roman: "in" }], grammar: "Fjali kushtore: lidhëz kushtore + kusht + përgjigje. Ndryshon kohën e foljes.", examples: [{ ar: "إذا ذهبت ستجد", roman: "idhā dhahabta satajid", trans: "Nëse shkon do të gjesh" }] },
      { id: 29, title: "الدرس التاسع والعشرون — Mësimi 29", topic: "Biseda të Shkurtra • محادثات قصيرة", vocab: [{ ar: "السلام عليكم", trans: "paqja qofshin", roman: "as-salāmu 'alaykum" }, { ar: "وعليكم السلام", trans: "edhe mbi ju", roman: "wa 'alaykum as-salām" }], grammar: "Dialogjet përfshijnë formula të fiksuara si përshëndetje, pyetje rutine dhe përgjigje.", examples: [{ ar: "السلام عليكم ورحمة الله وبركاته", roman: "as-salāmu 'alaykum wa raḥmatu llāhi wa barakātuh", trans: "Paqja, mëshira dhe bekimet e Allahut qofshin mbi ju" }] },
      { id: 30, title: "الدرس الثلاثون — Mësimi 30", topic: "Rishikimi dhe Praktika • المراجعة والممارسة", vocab: [{ ar: "كل", trans: "të gjithë", roman: "kull" }, { ar: "قد", trans: "tashmë", roman: "qad" }, { ar: "كان", trans: "ishte", roman: "kāna" }], grammar: "Përmbledhja e plotë e Librit 2: të gjithë folje, përemra, struktura gramatikore, ndajfoljet.", examples: [{ ar: "قد ذهب الطالب إلى المدرسة", roman: "qad dhahaba aṭ-ṭālib ilā al-madrasa", trans: "Nxënësi ka shkuar në shkollë tashmë" }] },
    ]
  },
  avancuar: {
    title: "الكتاب الثالث — Libri i Tretë",
    subtitle: "Madinah Book 3 — Gramatikë e Avancuar Arabe",
    units: [
      { id: 1, title: "الدرس الأول — Mësimi 1", topic: "أوزان الأفعال — Sistemit i Foljeve",
        vocab: [
          { ar: "فَعَلَ (وزن I)", trans: "Forma I — bazë", roman: "fa'ala" },
          { ar: "فَعَّلَ (وزن II)", trans: "Forma II — intensitet/kausat", roman: "fa''ala" },
          { ar: "فَاعَلَ (وزن III)", trans: "Forma III — reciproke", roman: "fā'ala" },
          { ar: "أَفْعَلَ (وزن IV)", trans: "Forma IV — kauzative", roman: "af'ala" },
          { ar: "تَفَعَّلَ (وزن V)", trans: "Forma V — refleksive e II", roman: "tafa''ala" },
          { ar: "تَفَاعَلَ (وزن VI)", trans: "Forma VI — reciproke refleksive", roman: "tafā'ala" },
          { ar: "انْفَعَلَ (وزن VII)", trans: "Forma VII — pasive/intrans.", roman: "infa'ala" },
          { ar: "اسْتَفْعَلَ (وزن X)", trans: "Forma X — kërkon/konsideron", roman: "istaf'ala" },
        ],
        grammar: "Arabishtja ka 10 forma (awzān) kryesore foljesh. Secila ndryshon kuptimin bazë: II intensifikon, IV është kauzative, VII pasive, X kërkon/konsideron. P.sh.: ررج(I-doli) → خرّج(II-largoi) → أخرج(IV-nxorri).",
        examples: [
          { ar: "كَتَبَ (I) → كَتَّبَ (II) → كَاتَبَ (III) → أَكْتَبَ (IV)", roman: "kataba → kattaba → kātaba → aktaba", trans: "shkroi → bëri të shkruajë → shkruan me → dikton" },
          { ar: "عَلِمَ (I) → عَلَّمَ (II) → أَعْلَمَ (IV) → اسْتَعْلَمَ (X)", roman: "alima → allama → a'lama → ista'lama", trans: "diti → mësoi (tjetrin) → njoftoi → hetoi" },
        ]
      },
      {
        id: 2,
        title: "الدرس الثاني — Mësimi 2",
        topic: "الفعل الماضي والمضارع — E Kaluara & E Tashme",
        vocab: [
          { ar: "الفعل الماضي", trans: "folja e kaluar", roman: "al-fi'l al-māḍī" },
          { ar: "الفعل المضارع", trans: "folja e tashme", roman: "al-fi'l al-muḍāri'" },
          { ar: "ذَهَبَ / يَذْهَبُ", trans: "shkoi / shkon", roman: "dhahaba / yadhhabu" },
          { ar: "قَرَأَ / يَقْرَأُ", trans: "lexoi / lexon", roman: "qara'a / yaqra'u" },
          { ar: "كَتَبَ / يَكْتُبُ", trans: "shkroi / shkruan", roman: "kataba / yaktubu" },
          { ar: "جَاءَ / يَجِيءُ", trans: "erdhi / vjen", roman: "jā'a / yajī'u" },
          { ar: "فَعَلَ / يَفْعَلُ", trans: "bëri / bën", roman: "fa'ala / yaf'alu" },
          { ar: "سَمِعَ / يَسْمَعُ", trans: "dëgjoi / dëgjon", roman: "sami'a / yasma'u" },
        ],
        grammar: "E tashme (muḍāri') formohet me parashtesa personale: يَ (ai), تَ (ti/ajo), أَ (unë), نَ (ne). Vokali i mesit ndryshon sipas formës: يَفْعَلُ / يَفْعِلُ / يَفْعُلُ.",
        examples: [
          { ar: "يَذْهَبُ حَامِدٌ وَهِيَ تَذْهَبُ", roman: "yadhhabu ḥāmidun wa hiya tadhhabu", trans: "Hamidi shkon dhe ajo shkon" },
          { ar: "أَنَا أَتَعَلَّمُ العَرَبِيَّةَ", roman: "anā ata'allamu al-'arabiyya", trans: "Unë po mësoj arabishten" },
        ]
      },
      {
        id: 3,
        title: "الدرس الثالث — Mësimi 3",
        topic: "إعراب الأسماء — Rasët Gramatikore",
        vocab: [
          { ar: "الرَّفْعُ (ـُ / ـٌ)", trans: "emërorja — subjekt", roman: "raf' — ḍamma" },
          { ar: "النَّصْبُ (ـَ / ـً)", trans: "kallëzuesore — objekt/ndajf.", roman: "naṣb — fatḥa" },
          { ar: "الْجَرُّ (ـِ / ـٍ)", trans: "gjenitore — pas parafjalës", roman: "jarr — kasra" },
          { ar: "تَنْوِين", trans: "nunation (ـٌ / ـً / ـٍ)", roman: "tanwīn" },
          { ar: "مَرْفُوع", trans: "në rasën emërore", roman: "marfū'" },
          { ar: "مَنْصُوب", trans: "në rasën kallëzuesore", roman: "manṣūb" },
          { ar: "مَجْرُور", trans: "në rasën gjenitore", roman: "majrūr" },
          { ar: "مَبْنِي", trans: "e pandryshueshme", roman: "mabnī" },
        ],
        grammar: "Arabishtja ka 3 rasa: Raf' (ـُ) për subjektin, Naṣb (ـَ) për objektin dhe ndajfolje, Jarr (ـِ) pas parafjalëve. Tanwīn shton n si shenjë emrit të papërcaktuar.",
        examples: [
          { ar: "جَاءَ الطَّالِبُ — الطالبُ: مرفوع", roman: "jā'a aṭ-ṭālibu — marfū'", trans: "Nxënësi erdhi — nxënësi: emërore" },
          { ar: "رَأَيْتُ الطَّالِبَ — الطالبَ: منصوب", roman: "ra'aytu aṭ-ṭāliba — manṣūb", trans: "E pashë nxënësin — nxënësin: kallëzuesore" },
        ]
      },
  profesionist: {
    title: "الكتاب الرابع — Libri i Katërt",
    subtitle: "Thellim profesional në arabishten klasike",
    units: [
      { id: 1, title: "الدرس الأول — Mësimi 1", topic: "أوزان الأفعال — Sistemit i Foljeve",
        vocab: [{ ar: "فَعَلَ (I)", trans: "Forma I — bazë", roman: "fa'ala" }, { ar: "فَعَّلَ (II)", trans: "Forma II — intensitet", roman: "fa''ala" }, { ar: "أَفْعَلَ (IV)", trans: "Forma IV — kauzative", roman: "af'ala" }, { ar: "انْفَعَلَ (VII)", trans: "Forma VII — pasive", roman: "infa'ala" }, { ar: "اسْتَفْعَلَ (X)", trans: "Forma X — kërkon", roman: "istaf'ala" }, { ar: "تَفَعَّلَ (V)", trans: "Forma V — refleksive II", roman: "tafa''ala" }, { ar: "فَاعَلَ (III)", trans: "Forma III — reciproke", roman: "fā'ala" }, { ar: "الثُّلَاثِيّ", trans: "trikonsonantike", roman: "thulāthī" }],
        grammar: "10 forma (awzān): II=intensifikim, IV=kauzative, VII=pasive, X=kërkon/konsideron. عَلِمَ(diti)→عَلَّمَ(mësoi)→أَعْلَمَ(njoftoi)→اسْتَعْلَمَ(hetoi).",
        examples: [{ ar: "كَتَبَ (I) → كَتَّبَ (II) → أَكْتَبَ (IV)", roman: "kataba → kattaba → aktaba", trans: "shkroi → bëri të shkruajë → dikton" }, { ar: "خَرَجَ → أَخْرَجَ → اسْتَخْرَجَ", roman: "kharaja → akhraja → istakhraja", trans: "doli → nxori → shfrytëzoi" }]
      },
      { id: 2, title: "الدرس الثاني — Mësimi 2", topic: "الفعل الماضي والمضارع — E Kaluara & E Tashme",
        vocab: [{ ar: "الفعل الماضي", trans: "folja e kaluar", roman: "al-fi'l al-māḍī" }, { ar: "الفعل المضارع", trans: "folja e tashme", roman: "al-fi'l al-muḍāri'" }, { ar: "ذَهَبَ / يَذْهَبُ", trans: "shkoi / shkon", roman: "dhahaba / yadhhabu" }, { ar: "قَرَأَ / يَقْرَأُ", trans: "lexoi / lexon", roman: "qara'a / yaqra'u" }, { ar: "كَتَبَ / يَكْتُبُ", trans: "shkroi / shkruan", roman: "kataba / yaktubu" }, { ar: "فَعَلَ / يَفْعَلُ", trans: "bëri / bën", roman: "fa'ala / yaf'alu" }, { ar: "سَمِعَ / يَسْمَعُ", trans: "dëgjoi / dëgjon", roman: "sami'a / yasma'u" }, { ar: "جَاءَ / يَجِيءُ", trans: "erdhi / vjen", roman: "jā'a / yajī'u" }],
        grammar: "E tashme formohet me parashtesa: يَ(ai), تَ(ti/ajo), أَ(unë), نَ(ne). Vokali i mesit: يَفْعَلُ/يَفْعِلُ/يَفْعُلُ sipas formës.",
        examples: [{ ar: "يَذْهَبُ حَامِدٌ وَهِيَ تَذْهَبُ", roman: "yadhhabu ḥāmidun wa hiya tadhhabu", trans: "Hamidi shkon dhe ajo shkon" }, { ar: "أَنَا أَتَعَلَّمُ العَرَبِيَّةَ", roman: "anā ata'allamu al-'arabiyya", trans: "Unë po mësoj arabishten" }]
      },
      { id: 3, title: "الدرس الثالث — Mësimi 3", topic: "إعراب الأسماء — Rasët Gramatikore",
        vocab: [{ ar: "الرَّفْعُ (ـُ/ـٌ)", trans: "emërorja — subjekt", roman: "raf' — ḍamma" }, { ar: "النَّصْبُ (ـَ/ـً)", trans: "kallëzuesore — objekt", roman: "naṣb — fatḥa" }, { ar: "الْجَرُّ (ـِ/ـٍ)", trans: "gjenitore — pas prep.", roman: "jarr — kasra" }, { ar: "تَنْوِين", trans: "nunation (ـٌ/ـً/ـٍ)", roman: "tanwīn" }, { ar: "مَرْفُوع", trans: "në rasën emërore", roman: "marfū'" }, { ar: "مَنْصُوب", trans: "në rasën kallëzuesore", roman: "manṣūb" }, { ar: "مَجْرُور", trans: "në rasën gjenitore", roman: "majrūr" }, { ar: "مَبْنِي", trans: "e pandryshueshme", roman: "mabnī" }],
        grammar: "3 rasa: Raf'(ـُ) subjekt, Naṣb(ـَ) objekt/ndajfolje, Jarr(ـِ) pas parafjalëve. Tanwīn = n si shenjë e papërcaktuar.",
        examples: [{ ar: "جَاءَ الطَّالِبُ (مرفوع)", roman: "jā'a aṭ-ṭālibu", trans: "Nxënësi erdhi (emërorë)" }, { ar: "رَأَيْتُ الطَّالِبَ (منصوب)", roman: "ra'aytu aṭ-ṭāliba", trans: "E pashë nxënësin (kallëzuesore)" }]
      },
      { id: 4, title: "الدرس الرابع — Mësimi 4", topic: "الأفعال الضعيفة — Foljet e Dobëta",
        vocab: [{ ar: "مِثَال (و/ي fillim)", trans: "Mithal — dhe/ji në fillim", roman: "mithāl" }, { ar: "أَجْوَف (علة mes)", trans: "Ajwaf — zanore e dobët në mes", roman: "ajwaf" }, { ar: "نَاقِص (علة fund)", trans: "Naqis — zanore e dobët në fund", roman: "nāqiṣ" }, { ar: "وَعَدَ / يَعِدُ", trans: "premtoi / premton", roman: "wa'ada / ya'idu" }, { ar: "قَالَ / يَقُولُ", trans: "tha / thotë (ajwaf-و)", roman: "qāla / yaqūlu" }, { ar: "بَاعَ / يَبِيعُ", trans: "shiti / shet (ajwaf-ي)", roman: "bā'a / yabī'u" }, { ar: "دَعَا / يَدْعُو", trans: "thirri / thërret (naqis)", roman: "da'ā / yad'ū" }, { ar: "مَشَى / يَمْشِي", trans: "eceu / ecën (naqis-ي)", roman: "mashā / yamshī" }],
        grammar: "Ajwaf: zanori i mesit zgjatet ose bie. Naqis: fundi ndryshon format. Mithal: و/ي e parë bie shpesh në tashme.",
        examples: [{ ar: "قَالَ الأُسْتَاذُ — يَقُولُ الأُسْتَاذُ", roman: "qāla al-ustādhu — yaqūlu", trans: "Mësuesi tha — Mësuesi thotë" }, { ar: "دَعَا إِلَى اللهِ", roman: "da'ā ilā allāh", trans: "Ai thirri drejt Allahut" }]
      },
      { id: 5, title: "الدرس الخامس — Mësimi 5", topic: "اسم الفاعل واسم المفعول — Emri Veprues & Objekt",
        vocab: [{ ar: "اسْمُ الفَاعِل", trans: "emri i vepruesit", roman: "ism al-fā'il" }, { ar: "اسْمُ الْمَفْعُول", trans: "emri i objektit", roman: "ism al-maf'ūl" }, { ar: "كَاتِب", trans: "shkrues / writer", roman: "kātib" }, { ar: "مَكْتُوب", trans: "i shkruar / written", roman: "maktūb" }, { ar: "طَالِب", trans: "ai që kërkon / student", roman: "ṭālib" }, { ar: "مَطْلُوب", trans: "i kërkuar / requested", roman: "maṭlūb" }, { ar: "مُعَلِّم (II)", trans: "mësues / teacher", roman: "mu'allim" }, { ar: "مُعَلَّم (II obj.)", trans: "i mësuar / taught", roman: "mu'allam" }],
        grammar: "Ism Fa'il F.I: وَزْن فَاعِل. Ism Maf'ul F.I: وَزْن مَفْعُول. Format tjera: مُفَعِّل/مُفَعَّل.",
        examples: [{ ar: "الطَّالِبُ كَاتِبٌ", roman: "aṭ-ṭālibu kātibun", trans: "Nxënësi është shkrues" }, { ar: "هَذَا كِتَابٌ مَكْتُوبٌ بِالعَرَبِيَّة", roman: "hādhā kitābun maktūbun", trans: "Ky është libër i shkruar në arabisht" }]
      },
      { id: 6, title: "الدرس السادس — Mësimi 6", topic: "المصدر — Masdar (Emri i Veprimit)",
        vocab: [{ ar: "مَصْدَر", trans: "masdar / verbal noun", roman: "maṣdar" }, { ar: "كِتَابَة", trans: "shkrimi / writing (F.I)", roman: "kitāba" }, { ar: "قِرَاءَة", trans: "leximi / reading (F.I)", roman: "qirā'a" }, { ar: "ذَهَاب", trans: "ikja / going (F.I)", roman: "dhahāb" }, { ar: "تَعْلِيم", trans: "mësimdhënia (F.II)", roman: "ta'līm" }, { ar: "إِسْلَام", trans: "nënshtrimi/islami (F.IV)", roman: "islām" }, { ar: "اسْتِفَادَة", trans: "përfitimi (F.X)", roman: "istifāda" }, { ar: "فَهْم", trans: "kuptimi / understanding", roman: "fahm" }],
        grammar: "Masdar = emri i veprimit (si infinitiv). F.I: forma të ndryshme. F.II=تَفْعِيل, F.IV=إِفْعَال, F.X=اسْتِفْعَال.",
        examples: [{ ar: "أُحِبُّ القِرَاءَةَ", roman: "uḥibbu al-qirā'ata", trans: "Dua leximin" }, { ar: "التَّعْلِيمُ مِهْنَةٌ شَرِيفَة", roman: "at-ta'līmu mihnatun sharīfa", trans: "Mësimdhënia është profesion i ndershëm" }]
      },
      { id: 7, title: "الدرس السابع — Mësimi 7", topic: "كَانَ وَأَخَوَاتُهَا — Kāna & Motrat e Saj",
        vocab: [{ ar: "كَانَ", trans: "ishte / was", roman: "kāna" }, { ar: "أَصْبَحَ", trans: "u bë (mëngjes)", roman: "aṣbaḥa" }, { ar: "أَمْسَى", trans: "u bë (mbrëmje)", roman: "amsā" }, { ar: "ظَلَّ", trans: "mbeti / remained", roman: "ẓalla" }, { ar: "لَيْسَ", trans: "nuk është / is not", roman: "laysa" }, { ar: "صَارَ", trans: "u bë / became", roman: "ṣāra" }, { ar: "مَا زَالَ", trans: "ende është / still is", roman: "mā zāla" }, { ar: "بَاتَ", trans: "kaloi natën", roman: "bāta" }],
        grammar: "Kāna dhe motrat (nawāqiṣ): kryefjalë: raf', kallëzuesi → naṣb. Struktura: كَانَ + kryef.(raf') + kallëzues(naṣb).",
        examples: [{ ar: "كَانَ الطَّالِبُ مُجْتَهِدًا", roman: "kāna aṭ-ṭālibu mujtahidan", trans: "Nxënësi ishte i zellshëm" }, { ar: "لَيْسَ هَذَا كِتَابِي", roman: "laysa hādhā kitābī", trans: "Ky nuk është libri im" }]
      },
      { id: 8, title: "الدرس الثامن — Mësimi 8", topic: "إِنَّ وَأَخَوَاتُهَا — Inna & Motrat e Saj",
        vocab: [{ ar: "إِنَّ", trans: "vërtet / indeed (thekson)", roman: "inna" }, { ar: "أَنَّ", trans: "se / that", roman: "anna" }, { ar: "كَأَنَّ", trans: "si të / as if", roman: "ka'anna" }, { ar: "لَكِنَّ", trans: "por / but", roman: "lākinna" }, { ar: "لَيْتَ", trans: "ah sikur / I wish", roman: "layta" }, { ar: "لَعَلَّ", trans: "ndoshta / perhaps", roman: "la'alla" }, { ar: "إِنَّ اللهَ غَفُورٌ", trans: "Vërtet Allahu është Falës", roman: "inna llāha ghafūrun" }, { ar: "أَعْلَمُ أَنَّهُ صَادِق", trans: "di se ai është i sinqertë", roman: "a'lamu annahu ṣādiq" }],
        grammar: "Inna & motrat (nawāsikh): ndryshojnë rasën e kryefjalës → naṣb. إِنَّ + kryef.(naṣb) + kallëzues(raf').",
        examples: [{ ar: "إِنَّ اللهَ عَلِيمٌ حَكِيمٌ", roman: "inna llāha 'alīmun ḥakīmun", trans: "Vërtet Allahu është i Ditur, i Urtë" }, { ar: "لَعَلَّ الطَّالِبَ يَنْجَح", roman: "la'alla aṭ-ṭāliba yanjaḥ", trans: "Ndoshta nxënësi do të kalojë" }]
      },
      { id: 9, title: "الدرس التاسع — Mësimi 9", topic: "الجملة الشرطية — Fjali Kushtore",
        vocab: [{ ar: "إِنْ", trans: "nëse (e ardhme)", roman: "in" }, { ar: "إِذَا", trans: "nëse/kur (e zakonshme)", roman: "idhā" }, { ar: "لَوْ", trans: "po të ishte (ireale)", roman: "law" }, { ar: "مَنْ", trans: "kushdo që (person)", roman: "man" }, { ar: "مَا", trans: "çfarëdo që", roman: "mā" }, { ar: "جَوَاب الشَّرْط", trans: "përgjigja e kushtit", roman: "jawāb ash-sharṭ" }, { ar: "لَوْلَا", trans: "po të mos ishte", roman: "lawlā" }, { ar: "أَيْنَمَا", trans: "kudo që", roman: "aynanamā" }],
        grammar: "Fjalia kushtore: lidhëz + kushti + (fa') + përgjigja. إِنْ تَدْرُسْ تَنْجَحْ. Law + kaluar = kushti irreal.",
        examples: [{ ar: "إِنْ تَدْرُسْ تَنْجَحْ", roman: "in tadrus tanjaḥ", trans: "Nëse studion, do të kalosh" }, { ar: "لَوْ كُنْتُ غَنِيًّا لَأَعْطَيْتُكَ", roman: "law kuntu ghaniyyan la-a'ṭaytuka", trans: "Po të isha i pasur, do të të jepja" }]
      },
      { id: 10, title: "الدرس العاشر — Mësimi 10", topic: "الجملة الاسمية والفعلية — Fjali Emërore & Foljore",
        vocab: [{ ar: "الجُمْلَة الاسْمِيَّة", trans: "fjali emërore", roman: "al-jumla al-ismiyya" }, { ar: "الجُمْلَة الفِعْلِيَّة", trans: "fjali foljore", roman: "al-jumla al-fi'liyya" }, { ar: "الْمُبْتَدَأ", trans: "tema (subjekt emëror)", roman: "al-mubtada'" }, { ar: "الْخَبَر", trans: "kallëzuesi emëror", roman: "al-khabar" }, { ar: "الفَاعِل", trans: "kryefjalë foljore", roman: "al-fā'il" }, { ar: "الْمَفْعُول بِه", trans: "kundrinor direkt", roman: "al-maf'ūl bihi" }, { ar: "الْمُبْتَدَأ مَرْفُوع", trans: "tema: emërorë", roman: "mubtada' marfū'" }, { ar: "الْخَبَر مَرْفُوع", trans: "kallëzuesi: emërorë", roman: "khabar marfū'" }],
        grammar: "Emërore: mubtada'(raf') + khabar(raf') pa folje. Foljore: folje + fā'il(raf') + maf'ūl(naṣb).",
        examples: [{ ar: "البَيْتُ كَبِيرٌ (اسمية)", roman: "al-baytu kabīrun", trans: "Shtëpia është e madhe (emërore)" }, { ar: "ذَهَبَ الطَّالِبُ إِلَى المَدْرَسَة (فعلية)", roman: "dhahaba aṭ-ṭālibu", trans: "Nxënësi shkoi në shkollë (foljore)" }]
      },
      { id: 11, title: "الدرس الحادي عشر — Mësimi 11", topic: "الإضافة — Idafa (Pronësia)",
        vocab: [{ ar: "مُضَاف", trans: "emri i parë (pa artikull)", roman: "muḍāf" }, { ar: "مُضَاف إِلَيْه", trans: "emri i dytë (gjenitor)", roman: "muḍāf ilayh" }, { ar: "كِتَابُ الطَّالِب", trans: "libri i nxënësit", roman: "kitāb aṭ-ṭālib" }, { ar: "بَيْتُ اللهِ", trans: "shtëpia e Allahut", roman: "bayt allāh" }, { ar: "رَسُولُ اللهِ", trans: "i dërguar i Allahut", roman: "rasūl allāh" }, { ar: "حَذْف (ال)", trans: "heqja e artikullit", roman: "ḥadhf al-" }, { ar: "حَذْف التَّنْوِين", trans: "heqja e tanwīn", roman: "ḥadhf at-tanwīn" }, { ar: "إضافة حقيقية / مجازية", trans: "idafa reale / figurative", roman: "iḍāfa ḥaqīqīya / majāzīya" }],
        grammar: "Idafa: emri i parë humbet artikullin dhe tanwīn. Emri i dytë → gjenitor (kasra). كِتَابٌ + الطَّالِبُ → كِتَابُ الطَّالِبِ.",
        examples: [{ ar: "كِتَابُ الطَّالِبِ جَدِيدٌ", roman: "kitābu aṭ-ṭālibi jadīdun", trans: "Libri i nxënësit është i ri" }, { ar: "رَسُولُ اللهِ مُحَمَّدٌ ﷺ", roman: "rasūlu llāhi muḥammadun", trans: "I dërguar i Allahut është Muhammedi ﷺ" }]
      },
      { id: 12, title: "الدرس الثاني عشر — Mësimi 12", topic: "الحَال — Hal (Gjendja Shoqëruese)",
        vocab: [{ ar: "حَال", trans: "gjendja gjatë veprimit", roman: "ḥāl" }, { ar: "صَاحِب الحَال", trans: "ai që ka gjendjen", roman: "ṣāḥib al-ḥāl" }, { ar: "ضَاحِكًا", trans: "duke qeshur", roman: "ḍāḥikan" }, { ar: "مُسْرِعًا", trans: "duke vrapuar", roman: "musri'an" }, { ar: "رَاكِبًا", trans: "duke hipur", roman: "rākiban" }, { ar: "وَاقِفًا", trans: "duke qëndruar", roman: "wāqifan" }, { ar: "مُبْتَسِمًا", trans: "duke buzëqeshur", roman: "mubtasiman" }, { ar: "جَالِسًا", trans: "duke ulur", roman: "jālisan" }],
        grammar: "Ḥāl tregon gjendjen e kryefjalës gjatë veprimit. Merr naṣb (kallëzuesore). دَخَلَ ضَاحِكًا (hyri duke qeshur).",
        examples: [{ ar: "دَخَلَ الطَّالِبُ ضَاحِكًا", roman: "dakhala aṭ-ṭālibu ḍāḥikan", trans: "Nxënësi hyri duke qeshur" }, { ar: "جَاءَ مُحَمَّدٌ رَاكِبًا", roman: "jā'a muḥammadun rākiban", trans: "Muhammeti erdhi duke hipur" }]
      },
      { id: 13, title: "الدرس الثالث عشر — Mësimi 13", topic: "التَّمْيِيز والبَدَل — Tamyiz & Badal",
        vocab: [{ ar: "تَمْيِيز", trans: "sqaruesi / specifier", roman: "tamyīz" }, { ar: "بَدَل", trans: "zëvendësuesi / substitute", roman: "badal" }, { ar: "اشْتَرَيْتُ عِشْرِينَ كِتَابًا", trans: "bleva njëzet libra", roman: "ishtaraytu 'ishrīna kitāban" }, { ar: "طَابَ مُحَمَّدٌ نَفْسًا", trans: "Muhammeti qetësoi shpirtin", roman: "ṭāba muḥammadun nafsan" }, { ar: "جَاءَ زَيْدٌ أَخُوكَ", trans: "Erdhi Zejdi, vëllai yt", roman: "jā'a zaydun akhūka" }, { ar: "بَدَل الكُل", trans: "zëvendësuesi total", roman: "badal al-kull" }, { ar: "بَدَل البَعض", trans: "zëvendësuesi parcial", roman: "badal al-ba'ḍ" }, { ar: "بَدَل الاشْتِمَال", trans: "zëvendësuesi kuptimor", roman: "badal al-ishtimāl" }],
        grammar: "Tamyiz sqaron kuptimin (pas numrave/masave) → naṣb. Badal zëvendëson emrin dhe merr të njëjtën rasë.",
        examples: [{ ar: "اشْتَرَيْتُ عِشْرِينَ كِتَابًا", roman: "ishtaraytu 'ishrīna kitāban", trans: "Bleva njëzet libra" }, { ar: "جَاءَ مُحَمَّدٌ أَخُوكَ", roman: "jā'a muḥammadun akhūka", trans: "Erdhi Muhammedi, vëllai yt" }]
      },
      { id: 14, title: "الدرس الرابع عشر — Mësimi 14", topic: "النَّعْت والتَّوْكِيد — Na't & Tawkid",
        vocab: [{ ar: "نَعْت (صِفَة)", trans: "mbiemri përshkrues", roman: "na't / ṣifa" }, { ar: "النَّعْت الحَقِيقِي", trans: "na't i drejtpërdrejtë", roman: "an-na't al-ḥaqīqī" }, { ar: "تَوْكِيد لَفْظِي", trans: "theksim me përsëritje", roman: "tawkīd lafẓī" }, { ar: "تَوْكِيد مَعْنَوِي", trans: "theksim kuptimor", roman: "tawkīd ma'nawī" }, { ar: "نَفْسُ / عَيْنُ", trans: "vetë (theksim)", roman: "nafs / 'ayn" }, { ar: "كُلُّ / جَمِيع", trans: "gjithë (theksim total)", roman: "kull / jamī'" }, { ar: "أَجْمَع", trans: "krejt (theksim i plotë)", roman: "ajma'" }, { ar: "كِلَا / كِلْتَا", trans: "të dy (dy sende)", roman: "kilā / kiltā" }],
        grammar: "Na't përputhej emrin në: gjini, numër, rasë, përcaktim. Tawkid: نَفْسُ(vetë), كُلُّ(gjithë), أَجْمَع(krejt).",
        examples: [{ ar: "جَاءَ طَالِبٌ مُجْتَهِدٌ", roman: "jā'a ṭālibun mujtahidun", trans: "Erdhi një nxënës i zellshëm" }, { ar: "جَاءَ الطُّلَّابُ كُلُّهُمْ", roman: "jā'a aṭ-ṭullābu kulluhum", trans: "Erdhën të gjithë nxënësit" }]
      },
      { id: 15, title: "الدرس الخامس عشر — Mësimi 15", topic: "الظُّرُوف وتحليل النصوص — Ndajfoljet & I'rāb",
        vocab: [{ ar: "ظَرْف الزَّمَان", trans: "ndajfolja e kohës", roman: "ẓarf az-zamān" }, { ar: "ظَرْف المَكَان", trans: "ndajfolja e vendit", roman: "ẓarf al-makān" }, { ar: "صَبَاحًا / مَسَاءً", trans: "mëngjes / mbrëmje", roman: "ṣabāḥan / masā'an" }, { ar: "أَمَامَ / وَرَاءَ", trans: "para / prapa", roman: "amāma / warā'a" }, { ar: "فَوْقَ / تَحْتَ", trans: "lart / poshtë", roman: "fawqa / taḥta" }, { ar: "تَحْلِيل نَحْوِي", trans: "analizë gramatikore", roman: "taḥlīl naḥwī" }, { ar: "الْإِعْرَاب", trans: "analiza rasore i'rāb", roman: "al-i'rāb" }, { ar: "الْفَاعِل مَرْفُوع", trans: "kryefjalë: emërorë", roman: "al-fā'il marfū'" }],
        grammar: "Ndajfoljet e kohës/vendit zakonisht naṣb. I'rāb = analiza e plotë gramatikore: lloji, rasa, shkaku.",
        examples: [{ ar: "ذَهَبَ صَبَاحًا وَعَادَ مَسَاءً", roman: "dhahaba ṣabāḥan wa 'āda masā'an", trans: "Shkoi në mëngjes dhe u kthye mbrëmje" }, { ar: "جَلَسَ أَمَامَ المَسْجِد", roman: "jalasa amāma al-masjid", trans: "U ul para xhamisë" }]
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