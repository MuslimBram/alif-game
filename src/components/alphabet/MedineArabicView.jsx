import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, ChevronRight, BookOpen, Star, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import MedineExercises from "@/components/medine/MedineExercises";

const LEVELS = [
  { value: "fillestar", label: "🌱 Fillestar", desc: "Libri 1 — Bazat" },
  { value: "mesatar",   label: "🌿 Mesatar",   desc: "Libri 2 — Zgjerim" },
  { value: "avancuar",  label: "🌲 Avancuar",  desc: "Libri 3 — Avancim" },
];

const MEDINE_DATA = {
  fillestar: {
    title: "الكتاب الأول — Libri i Parë",
    subtitle: "Mëso bazat e arabishtes si në Medinë",
    units: [
      {
        id: 1,
        title: "الوحدة الأولى — Njësia 1",
        topic: "Prezantimi • التعريف بالنفس",
        vocab: [
          { ar: "أنا", trans: "unë / I", roman: "ana" },
          { ar: "أنتَ", trans: "ti (mashk.) / you (m)", roman: "anta" },
          { ar: "أنتِ", trans: "ti (fem.) / you (f)", roman: "anti" },
          { ar: "هو", trans: "ai / he", roman: "huwa" },
          { ar: "هي", trans: "ajo / she", roman: "hiya" },
          { ar: "اسمي", trans: "emri im / my name", roman: "ismī" },
          { ar: "مَن أنتَ؟", trans: "Kush je ti? / Who are you?", roman: "man anta?" },
          { ar: "مَن هذا؟", trans: "Kush është ky? / Who is this?", roman: "man hādhā?" },
        ],
        grammar: "Arabishtja nuk ka folje 'jam' në kohën e tashme. Për të thënë 'Unë jam student' thuhet vetëm: أنا طالب (ana ṭālib).",
        examples: [
          { ar: "أنا طالبٌ", roman: "ana ṭālibun", trans: "Unë jam student" },
          { ar: "أنا مُسلمٌ", roman: "ana muslimun", trans: "Unë jam musliman" },
          { ar: "هو مُعلِّمٌ", roman: "huwa mu'allimun", trans: "Ai është mësues" },
        ]
      },
      {
        id: 2,
        title: "الوحدة الثانية — Njësia 2",
        topic: "Emrat & Artikulli • الأسماء والتعريف",
        vocab: [
          { ar: "الـ", trans: "artikulli shquese / the", roman: "al-" },
          { ar: "كِتابٌ", trans: "libër / a book", roman: "kitābun" },
          { ar: "الكِتابُ", trans: "libri / the book", roman: "al-kitābu" },
          { ar: "بَيتٌ", trans: "shtëpi / a house", roman: "baytun" },
          { ar: "البَيتُ", trans: "shtëpia / the house", roman: "al-baytu" },
          { ar: "مَسجِدٌ", trans: "xhami / a mosque", roman: "masjidun" },
          { ar: "المَسجِدُ", trans: "xhamia / the mosque", roman: "al-masjidu" },
          { ar: "طالِبٌ", trans: "student / a student", roman: "ṭālibun" },
        ],
        grammar: "Artikulli shquesues është 'ال' (al-). Kur emri fillon me shkronja diellore (ش، س، ن etj.), 'ل' asimilohet. P.sh.: الشمس (al-shams → ash-shams).",
        examples: [
          { ar: "الكِتابُ جَديدٌ", roman: "al-kitābu jadīdun", trans: "Libri është i ri" },
          { ar: "البَيتُ كَبيرٌ", roman: "al-baytu kabīrun", trans: "Shtëpia është e madhe" },
          { ar: "المَسجِدُ قَريبٌ", roman: "al-masjidu qarībun", trans: "Xhamia është afër" },
        ]
      },
      {
        id: 3,
        title: "الوحدة الثالثة — Njësia 3",
        topic: "Gjinia & Numri • التذكير والتأنيث والعدد",
        vocab: [
          { ar: "مُعلِّمٌ", trans: "mësues (mashk.)", roman: "mu'allimun" },
          { ar: "مُعلِّمةٌ", trans: "mësuese (fem.) — shtohet ة", roman: "mu'allimatun" },
          { ar: "طالِبٌ", trans: "student (mashk.)", roman: "ṭālibun" },
          { ar: "طالِبةٌ", trans: "studente (fem.)", roman: "ṭālibatun" },
          { ar: "طُلابٌ", trans: "studentë (shumës)", roman: "ṭullābun" },
          { ar: "كِتابانِ", trans: "dy libra (dyshor)", roman: "kitābāni" },
          { ar: "كُتُبٌ", trans: "libra (shumës)", roman: "kutubun" },
          { ar: "هذا / هذه", trans: "ky/kjo / this (m/f)", roman: "hādhā / hādhihi" },
        ],
        grammar: "Femërorja formohet duke shtuar 'ة' (ta marbuta). Dyshori shtohet me '-āni' (njëjës) ose '-ayni' (rasë tjetër). Shumësi zakonisht është i parregullt.",
        examples: [
          { ar: "هذه طالبةٌ", roman: "hādhihi ṭālibatun", trans: "Kjo është studente" },
          { ar: "هذانِ كِتابانِ", roman: "hādhāni kitābāni", trans: "Këta janë dy libra" },
          { ar: "هؤلاءِ طُلابٌ", roman: "hā'ulā'i ṭullābun", trans: "Këta janë studentë" },
        ]
      },
      {
        id: 4,
        title: "الوحدة الرابعة — Njësia 4",
        topic: "Numrat 1-10 • الأعداد من ١ إلى ١٠",
        vocab: [
          { ar: "وَاحِدٌ / ١", trans: "një / one", roman: "wāḥidun" },
          { ar: "اثْنَانِ / ٢", trans: "dy / two", roman: "ithnanī" },
          { ar: "ثَلاثَةٌ / ٣", trans: "tre / three", roman: "thalāthatun" },
          { ar: "أَرْبَعَةٌ / ٤", trans: "katër / four", roman: "arba'atun" },
          { ar: "خَمْسَةٌ / ٥", trans: "pesë / five", roman: "khamsatun" },
          { ar: "سِتَّةٌ / ٦", trans: "gjashtë / six", roman: "sittatun" },
          { ar: "سَبْعَةٌ / ٧", trans: "shtatë / seven", roman: "sab'atun" },
          { ar: "ثَمَانِيَةٌ / ٨", trans: "tetë / eight", roman: "thamāniyatun" },
          { ar: "تِسْعَةٌ / ٩", trans: "nëntë / nine", roman: "tis'atun" },
          { ar: "عَشَرَةٌ / ١٠", trans: "dhjetë / ten", roman: "'asharatun" },
        ],
        grammar: "Numrat 3-10 kanë të kundërtën e gjinisë nga emri: numri mashkullar përdoret me emra femërorë dhe anasjelltas. Ky quhet 'polarity i numrit' (التعكيس).",
        examples: [
          { ar: "عِندي ثَلاثَةُ كُتُبٍ", roman: "'indī thalāthatu kutubin", trans: "Kam tre libra" },
          { ar: "في المَسجِدِ خَمسَةُ طُلابٍ", roman: "fī al-masjidi khamsatu ṭullābin", trans: "Në xhami ka pesë studentë" },
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

      {/* Book Title */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: "serif" }}>{data.title}</h3>
        <p className="text-sm text-gray-500">{data.subtitle}</p>
      </div>

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