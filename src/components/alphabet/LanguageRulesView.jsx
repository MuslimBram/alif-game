import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, CheckCircle, XCircle, Timer, RotateCcw, Trophy, Info, BookOpen } from "lucide-react";
import { speakText } from "@/components/utils/speakAlbanian";

// ════════════════════════════════════════════════════════
//  SHQIP — RREGULLAT
// ════════════════════════════════════════════════════════
const SHQIP_RULES = [
  {
    id: "zanore_bt",
    title: "🔤 Zanore & Bashkëtingëllore",
    color: "bg-emerald-50 border-emerald-200", icon: "🔤",
    explanation: "Shqipja ka 7 zanore: A, E, Ë, I, O, U, Y dhe 29 bashkëtingëllore. 9 prej tyre janë digrafë (shkronja dyshe).",
    examples: [
      { word: "avion", highlight: "a, i, o", note: "3 zanore" },
      { word: "ëmbëlsirë", highlight: "ë, ë, i, ë", note: "4 zanore" },
      { word: "yll", highlight: "y", note: "Y = zanore" },
      { word: "dritë", highlight: "i, ë", note: "2 zanore" },
      { word: "shkollë", highlight: "o, ë", note: "2 zanore" },
      { word: "ujë", highlight: "u, ë", note: "2 zanore" },
    ],
    rules: [
      "7 zanore: A, E, Ë, I, O, U, Y",
      "9 digrafë: Dh, Gj, Ll, Nj, Rr, Sh, Th, Xh, Zh",
      "Çdo rrokje ka të paktën 1 zanore",
      "Y është zanore në shqip (yll, yrë, yje)",
    ]
  },
  {
    id: "rrokjet",
    title: "✂️ Ndarja e Rrokjeve",
    color: "bg-blue-50 border-blue-200", icon: "✂️",
    explanation: "Fjalët ndahen në rrokje sipas zanoreve. Bashkëtingëllorja mes dy zanoreve i takon rrokjes pasardhëse. Dy bashkëtingëllore ndahen mes tyre.",
    examples: [
      { word: "ma-li", highlight: "ma | li", note: "2 rrokje" },
      { word: "bu-ku-ri", highlight: "bu | ku | ri", note: "3 rrokje" },
      { word: "bar-dha", highlight: "bar | dha", note: "2 rrokje (BT+BT ndahen)" },
      { word: "shko-llë", highlight: "shko | llë", note: "2 rrokje" },
      { word: "va-tar", highlight: "va | tar", note: "2 rrokje" },
      { word: "mës-ta-ke", highlight: "mës | ta | ke", note: "3 rrokje" },
    ],
    rules: [
      "V-BT-V → BT shkon te rrokja e dytë: ma-li",
      "V-BT-BT-V → ndahen mes BT-ve: bar-dha",
      "Digrafi (sh, ll, rr etj.) = 1 BT, nuk ndahet kurrë",
      "Prefiks nuk ndahet: i-shtë-pi (jo is-htëpi)",
    ]
  },
  {
    id: "gjinia",
    title: "⚥ Gjinia e Emrit (Mashk./Fem.)",
    color: "bg-purple-50 border-purple-200", icon: "⚥",
    explanation: "Emrat shqip janë mashkullorë ose femërorë. Gjinia ndikon mbiemrin, numërorin dhe nyjen.",
    examples: [
      { word: "djali — vajza", highlight: "mashk. / fem.", note: "gjini të ndryshme" },
      { word: "mësuesi — mësuesja", highlight: "mashk. / fem.", note: "+ja femërorja" },
      { word: "mali — mali i lartë", highlight: "mashk.", note: "mbiemri: i lartë" },
      { word: "lumi — lumi i madh", highlight: "mashk.", note: "mbiemri: i madh" },
      { word: "shtëpia — shtëpia e bukur", highlight: "fem.", note: "mbiemri: e bukur" },
      { word: "drita — drita e diellit", highlight: "fem.", note: "mbiemri: e diellit" },
    ],
    rules: [
      "Mashkullore → mbiemri: i madh, i bukur, i mirë",
      "Femërorja → mbiemri: e madhe, e bukur, e mirë",
      "Nyja mashk.: -i, -u (djali, burri, luani)",
      "Nyja fem.: -a, -ja (vajza, shtëpia, drita)",
    ]
  },
  {
    id: "rasat",
    title: "📐 Rasat e Emrit (5 rasa)",
    color: "bg-amber-50 border-amber-200", icon: "📐",
    explanation: "Emrat shqip lakohən në 5 rasa: Emërore, Gjinore, Dhanore, Kallëzore, Rrjedhore. Secila tregon funksionin e emrit në fjali.",
    examples: [
      { word: "Emërore: djali shkon", highlight: "KUSH? djali", note: "subjekt" },
      { word: "Gjinore: libri i djalit", highlight: "I KUJT? djalit", note: "përkatësi" },
      { word: "Dhanore: i jap djalit", highlight: "KUJT? djalit", note: "marrës" },
      { word: "Kallëzore: shoh djalin", highlight: "KËNË? djalin", note: "objekt direkt" },
      { word: "Rrjedhore: flas me djalin", highlight: "ME KËNË? me djalin", note: "rrethanë" },
      { word: "Shumës: djemtë luajnë", highlight: "KUSH? djemtë", note: "shumës emëror" },
    ],
    rules: [
      "Emërore: kryefjala (Djali lexon)",
      "Gjinore: përkatësia — i/e/të/së + emër",
      "Dhanore: marrësi i veprimit (I jap djalit)",
      "Kallëzore: objekti direkt (Shoh djalin)",
      "Rrjedhore: me prejardhje ose mjet (Prej / Me djalit)",
    ]
  },
  {
    id: "folja",
    title: "🏃 Folja — Koha dhe Zgjedhimi",
    color: "bg-rose-50 border-rose-200", icon: "🏃",
    explanation: "Foljet shqip zgjedhohën sipas personit dhe numrit. Koha e tashme, e shkuar dhe e ardhme janë tre kohet kryesore.",
    examples: [
      { word: "unë lexoj", highlight: "1. njëjës tashme", note: "lexo+j" },
      { word: "ai/ajo lexon", highlight: "3. njëjës tashme", note: "lexo+n" },
      { word: "ne lexojmë", highlight: "1. shumës tashme", note: "lexo+jmë" },
      { word: "unë lexova", highlight: "e shkuar", note: "lexova (kryer e thjeshtë)" },
      { word: "unë do të lexoj", highlight: "e ardhme", note: "do të + folja" },
      { word: "lexo! (urdhërore)", highlight: "mënyrë urdhërore", note: "urdhëri direkt" },
    ],
    rules: [
      "Tashme: unë lexoj, ti lexon, ai lexon, ne lexojmë, ju lexoni, ata lexojnë",
      "E shkuar e thjeshtë: unë lexova, ti lexove, ai lexoi...",
      "E ardhme: do të + folja (do të lexoj, do të shkoj)",
      "Urdhërorja: shto -o ose -i (lexo!, shkruaj!, hap!)",
    ]
  },
  {
    id: "drejtshkrimi",
    title: "✏️ Drejtshkrimi — Rregullat Kryesore",
    color: "bg-teal-50 border-teal-200", icon: "✏️",
    explanation: "Drejtshkrimi shqip ka rregulla të qarta: ë fundore, nyja e trajtës së pashquar, shkronja e madhe etj.",
    examples: [
      { word: "vajzë (jo vajze)", highlight: "ë fundore", note: "emra femërorë" },
      { word: "libër (jo libir)", highlight: "ë e ndërmjetme", note: "para r/l" },
      { word: "Shqipëri (me sh. të madhe)", highlight: "emër i përveçëm", note: "vende, njerëz" },
      { word: "nuk shkruaj (jo s'shkruaj)", highlight: "nuk = mohim", note: "folje mohuese" },
      { word: "mos shko (urdhërore mohuese)", highlight: "mos + folja", note: "ndalim" },
      { word: "i/e + mbiemër", highlight: "nyja lidhëse", note: "mal i lartë" },
    ],
    rules: [
      "Ë fundore ruhet te emrat femërorë: vajzë, motër, nënë",
      "Emrat e përveçëm me shkronjë të madhe: Tirana, Shkodra",
      "Mohimi: nuk + folja (nuk shkoj); mos + folja (mos shko)",
      "Nyja lidhëse: i (mashk.), e (fem.) para mbiemrit",
    ]
  },
  {
    id: "letersia_shqip",
    title: "📖 Letërsia Shqipe — Autorët Kryesorë",
    color: "bg-indigo-50 border-indigo-200", icon: "📖",
    explanation: "Letërsia shqipe ka një traditë të pasur. Naim Frashëri, Gjergj Fishta, Ismail Kadare, Migjeni janë emrat më të mëdhenj.",
    examples: [
      { word: "Naim Frashëri (1846-1900)", highlight: "Rilindja Kombëtare", note: "Bagëti e Bujqësi, Lulet e Verës" },
      { word: "Gjergj Fishta (1871-1940)", highlight: "Epika heroike", note: "Lahuta e Malcis" },
      { word: "Migjeni (1911-1938)", highlight: "Letërsia sociale", note: "Vargjet e Lira" },
      { word: "Ismail Kadare (1936-)", highlight: "Romani modern", note: "Gjenerali i Ushtrisë së Vdekur" },
      { word: "Ernest Koliqi (1903-1975)", highlight: "Proza artistike", note: "Tregtar Flamujsh" },
      { word: "Fan Noli (1882-1965)", highlight: "Poezi e përkthim", note: "Albumi / Shakespeare" },
    ],
    rules: [
      "Rilindja Kombëtare (1835-1912): Naim, Sami, Abdyl Frashëri",
      "Letërsia midis luftërave: Migjeni (realiste-sociale)",
      "Epika: Lahuta e Malcis (Fishta) — heroizmi shqiptar",
      "Romani i sotëm: Kadare — i njohur ndërkombëtarisht",
    ]
  },
  {
    id: "llojet_ligjerate",
    title: "📝 Llojet e Ligjëratës",
    color: "bg-orange-50 border-orange-200", icon: "📝",
    explanation: "Gjuha shqipe ndan fjalët në 8 pjesë të ligjëratës: emër, mbiemër, folje, ndajfolje, përemër, numëror, lidhëz, parafjala.",
    examples: [
      { word: "emër: djalë, mal, lumë", highlight: "person, send, vend", note: "kalon me lakimin" },
      { word: "mbiemër: i madh, i bukur", highlight: "cilëson emrin", note: "pajtohet me gjininë" },
      { word: "folje: lexoj, shkoj, ha", highlight: "veprim ose gjendje", note: "zgjedhohën" },
      { word: "ndajfolje: mirë, keq, shpejt", highlight: "cilëson foljen", note: "nuk lakohën" },
      { word: "përemër: unë, ti, ai, ajo", highlight: "zëvendëson emrin", note: "personal" },
      { word: "lidhëz: dhe, por, sepse", highlight: "lidh fjalitë", note: "nuk ndryshon" },
    ],
    rules: [
      "Emri: tregon person, send, kafshë, vend — lakohet",
      "Folja: tregon veprim ose gjendje — zgjedhohët",
      "Mbiemri: cilëson emrin, pajtohet me gjininë e tij",
      "Ndajfolja: cilëson folje/mbiemër, nuk lakohet kurrë",
    ]
  },
];

// ════════════════════════════════════════════════════════
//  ANGLISHT — RREGULLAT
// ════════════════════════════════════════════════════════
const ANGLISHT_RULES = [
  {
    id: "silent_letters",
    title: "🔇 Silent Letters — Shkronjat e Heshtura",
    color: "bg-sky-50 border-sky-200", icon: "🔇",
    explanation: "Anglishtja ka shumë shkronja që shkruhen por nuk lexohen. Duhen mësuar me praktikë.",
    examples: [
      { word: "knife → naif", highlight: "K e heshtur", note: "K para N" },
      { word: "write → rait", highlight: "W e heshtur", note: "W para R" },
      { word: "island → ailand", highlight: "S e heshtur", note: "is-land" },
      { word: "listen → lisen", highlight: "T e heshtur", note: "lis-ten" },
      { word: "hour → auer", highlight: "H e heshtur", note: "H në fillim" },
      { word: "lamb → læm", highlight: "B e heshtur", note: "B pas M" },
    ],
    rules: [
      "KN-: knife, knee, know, knock (K nuk lexohet)",
      "WR-: write, wrong, wrap, wrist (W nuk lexohet)",
      "-GH: night, light, right, thought (GH nuk lexohet)",
      "-MB: lamb, bomb, comb, thumb (B nuk lexohet)",
    ]
  },
  {
    id: "vowel_sounds",
    title: "🔊 Zanorет dhe Tingujt e Tyre",
    color: "bg-indigo-50 border-indigo-200", icon: "🔊",
    explanation: "Anglishtja ka 5 zanore por 20+ tinguj! E njëjta shkronjë mund të lexohet ndryshe.",
    examples: [
      { word: "cat / cake", highlight: "æ / eɪ", note: "A = 2 tinguj" },
      { word: "bed / beat", highlight: "ɛ / iː", note: "E = 2 tinguj" },
      { word: "sit / site", highlight: "ɪ / aɪ", note: "I = 2 tinguj" },
      { word: "hot / hope", highlight: "ɒ / oʊ", note: "O = 2 tinguj" },
      { word: "cup / cute", highlight: "ʌ / juː", note: "U = 2 tinguj" },
      { word: "read / read", highlight: "iːd / rɛd", note: "Njëjta fjalë!" },
    ],
    rules: [
      "Zanore e shkurtër: 1 zanore + konsonant (cat, bed, sit)",
      "Zanore e gjatë: zanore + konsonant + e (cake, kite, bone)",
      "ee/oo: bee=iː, book=ʊ, food=uː",
      "Vowel+r: car=ɑː, her=ɜː, for=ɔː",
    ]
  },
  {
    id: "th_sounds",
    title: "🦷 TH — Dy Tingujt",
    color: "bg-teal-50 border-teal-200", icon: "🦷",
    explanation: "TH anglez ka dy variante: i butë me zë (ð, si Dh shqip) dhe i fortë pa zë (θ, si Th shqip).",
    examples: [
      { word: "the / this / that / they", highlight: "ð — me zë", note: "fjalë gramatikore" },
      { word: "think / three / thank", highlight: "θ — pa zë", note: "fjalë leksikore" },
      { word: "mother / father / weather", highlight: "ð midis zanoreve", note: "gjithmonë i butë" },
      { word: "teeth / bath / math / path", highlight: "θ në fund", note: "zakonisht i fortë" },
      { word: "thousand / through / throw", highlight: "θ — numra", note: "thousand = mijë" },
      { word: "breathe / soothe", highlight: "ð — folje", note: "vs breath/sooth" },
    ],
    rules: [
      "ð (i butë): the, this, that, these, those, there, them",
      "θ (i fortë): think, three, thank, thick, thin, through",
      "Midis zanoreve: gjithmonë ð (mother, father, brother)",
      "Gjuha prek lehtë dhëmbët — praktiko çdo ditë!",
    ]
  },
  {
    id: "plural_rules",
    title: "🔢 Shumësi i Emrave",
    color: "bg-rose-50 border-rose-200", icon: "🔢",
    explanation: "Shumësi anglez ka rregulla të qarta por edhe shumë forma parregullta.",
    examples: [
      { word: "cat → cats", highlight: "+s", note: "rregullë bazë" },
      { word: "box → boxes", highlight: "+es", note: "pas x, sh, ch, s" },
      { word: "baby → babies", highlight: "y→ies", note: "konsonant+y" },
      { word: "child → children", highlight: "parregullt", note: "ndryshon plotësisht" },
      { word: "man → men", highlight: "a→e", note: "ndryshim zanore" },
      { word: "sheep / fish", highlight: "pa ndryshim", note: "njëjës = shumës" },
    ],
    rules: [
      "+s: dogs, cats, books (rregulla bazë)",
      "+es: boxes, churches, buses (x, ch, sh, s, o)",
      "y→ies: baby→babies, city→cities (konsonant+y)",
      "Parregullt: man/men, woman/women, child/children, mouse/mice, ox/oxen",
    ]
  },
  {
    id: "tenses",
    title: "⏰ Kohët e Foljes",
    color: "bg-purple-50 border-purple-200", icon: "⏰",
    explanation: "Anglishtja ka 12 kohë. Tre kryesoret janë: Present Simple, Past Simple dhe Future.",
    examples: [
      { word: "I go / She goes", highlight: "Present Simple", note: "çdo ditë, zakon" },
      { word: "I went / She went", highlight: "Past Simple", note: "e kryer (parregullt!)" },
      { word: "I am going", highlight: "Present Continuous", note: "tani, në këtë çast" },
      { word: "I will go", highlight: "Future Simple", note: "vendim spontan" },
      { word: "I have gone", highlight: "Present Perfect", note: "e kryer me lidhje" },
      { word: "I was going", highlight: "Past Continuous", note: "vazhdonte në shkuar" },
    ],
    rules: [
      "Present Simple: He/She/It + verb+s (she goes, he reads)",
      "Past Simple rregullt: +ed (walked, played, watched)",
      "Past Simple parregullt: go→went, see→saw, eat→ate",
      "Future: will + folja (will go, will see, will eat)",
    ]
  },
  {
    id: "articles",
    title: "📌 Nyjat: A / An / The",
    color: "bg-amber-50 border-amber-200", icon: "📌",
    explanation: "Anglishtja ka nyje të pacaktuar (a/an) dhe të caktuar (the). Zgjedhja varet nga tingulli fillestar.",
    examples: [
      { word: "a dog / a book", highlight: "a + konsonant", note: "fillim me BT" },
      { word: "an apple / an egg", highlight: "an + zanore", note: "fillim me zanore" },
      { word: "a university", highlight: "a (ju- = BT)", note: "tingulli jo zanore" },
      { word: "an hour", highlight: "an (au- = zanore)", note: "H e heshtur" },
      { word: "the sun / the moon", highlight: "the = e njohur", note: "vetëm njëri" },
      { word: "Ø music / Ø love", highlight: "asnjë nyje", note: "abstrakte/materiale" },
    ],
    rules: [
      "a + konsonant (tingull): a dog, a cat, a university",
      "an + zanore (tingull): an apple, an hour, an egg",
      "the: i/e njohur ose i vetmi: the sun, the president",
      "Pa nyje: lëndë, abstraktime, kur flasim në përgjithësi",
    ]
  },
  {
    id: "letersia_anglisht",
    title: "📖 Letërsia Angleze — Autorët Kryesorë",
    color: "bg-green-50 border-green-200", icon: "📖",
    explanation: "Letërsia angleze është ndër më të pasurat në botë. Shakespeare, Dickens, Tolkien janë emra universalë.",
    examples: [
      { word: "William Shakespeare (1564-1616)", highlight: "Drama dhe poezi", note: "Romeo & Juliet, Hamlet" },
      { word: "Charles Dickens (1812-1870)", highlight: "Romani social", note: "Oliver Twist, Great Expectations" },
      { word: "J.R.R. Tolkien (1892-1973)", highlight: "Fantazi", note: "The Lord of the Rings, Hobbit" },
      { word: "J.K. Rowling (1965-)", highlight: "Fantazi moderne", note: "Harry Potter" },
      { word: "George Orwell (1903-1950)", highlight: "Distopia", note: "Animal Farm, 1984" },
      { word: "Lewis Carroll (1832-1898)", highlight: "Letërsia për fëmijë", note: "Alice in Wonderland" },
    ],
    rules: [
      "Shakespeare: 37 drama, 154 sonete — baza e anglishtes moderne",
      "Victorian era (1837-1901): Dickens, Hardy — realizma sociale",
      "Modernizmi (1900-1940): Woolf, Joyce — rrjedhja e ndërgjegjjes",
      "Letërsia për fëmijë: Carroll, Milne, Rowling — tradita e gjatë",
    ]
  },
  {
    id: "prepositions",
    title: "🗺️ Parafjalët (Prepositions)",
    color: "bg-cyan-50 border-cyan-200", icon: "🗺️",
    explanation: "Parafjalët tregojnë marrëdhënie hapësinore, kohore dhe të tjera mes fjalëve. Duhen mësuar me kontekst.",
    examples: [
      { word: "in the box", highlight: "in = brenda", note: "vendndodhje" },
      { word: "on the table", highlight: "on = mbi", note: "sipërfaqe" },
      { word: "at school / at 5pm", highlight: "at = tek / në", note: "vend/kohë specifik" },
      { word: "before / after lunch", highlight: "kohë", note: "para / pas" },
      { word: "between the trees", highlight: "mes pemëve", note: "pozicion relativ" },
      { word: "from London to Paris", highlight: "nga... deri", note: "lëvizje/origjinë" },
    ],
    rules: [
      "in: brendësi — in the box, in London, in January",
      "on: sipërfaqe / ditë — on the table, on Monday",
      "at: pikë e saktë — at school, at 3pm, at the door",
      "Parafjalë kohe: before, after, during, since, for, until",
    ]
  },
];

// ════════════════════════════════════════════════════════
//  QUIZ — SHQIP (30 pyetje)
// ════════════════════════════════════════════════════════
const SHQIP_QUIZ = [
  // Zanore & BT
  { q: "Sa zanore ka gjuha shqipe?", options: ["7", "5", "6", "8"], correct: "7" },
  { q: "Cilat janë zanore shqip?", options: ["A E Ë I O U Y", "A E I O U", "A B C D E", "E I O U Y"], correct: "A E Ë I O U Y" },
  { q: "Sa digrafë (shkronja dyshe) ka gjuha shqipe?", options: ["9", "5", "7", "11"], correct: "9" },
  { q: "Cili digraff shqip tingëllon si 'ch' anglisht?", options: ["Ç", "Xh", "Zh", "Sh"], correct: "Ç" },
  { q: "Cila shkronjë paraqet 'L-në e trashë'?", options: ["Ll", "L", "Lj", "Lh"], correct: "Ll" },
  { q: "Cili tingull është 'Ë'?", options: ["Vokal neutral (schwa)", "Si 'E' e zakonshme", "Nuk lexohet", "Si 'A'"], correct: "Vokal neutral (schwa)" },
  { q: "'Y' shqip është:", options: ["Zanore", "Bashkëtingëllore", "Digraff", "Nuk ekziston"], correct: "Zanore" },
  // Rrokje
  { q: "Sa rrokje ka fjala 'bukuri'?", options: ["3", "2", "4", "1"], correct: "3" },
  { q: "Ndaj rrokjet e 'bardha'?", options: ["bar-dha", "ba-rdha", "bard-ha", "b-ardha"], correct: "bar-dha" },
  { q: "Sa rrokje ka 'shtëpi'?", options: ["3", "2", "4", "1"], correct: "3" },
  { q: "Ndaj rrokjet e 'dritë'?", options: ["dri-të", "dr-itë", "drit-ë", "d-ritë"], correct: "dri-të" },
  // Gjinia
  { q: "Cila është nyja e emrit mashkullor shqip?", options: ["-i / -u", "-a / -ja", "-ë", "-e"], correct: "-i / -u" },
  { q: "Cila është nyja e emrit femëror shqip?", options: ["-a / -ja", "-i / -u", "-ë", "-o"], correct: "-a / -ja" },
  { q: "'Vajzë e bukur' — mbiemri është:", options: ["femëror", "mashkullor", "asnjanës", "shumës"], correct: "femëror" },
  { q: "'Mal i lartë' — mbiemri është:", options: ["mashkullor", "femëror", "asnjanës", "njëjës"], correct: "mashkullor" },
  // Rasat
  { q: "Cila rasë tregon KRYEFJALËN e fjalisë?", options: ["Emërorja", "Gjinorja", "Dhanorja", "Kallëzorja"], correct: "Emërorja" },
  { q: "Cila rasë tregon PËRKATËSINË (i kujt)?", options: ["Gjinorja", "Emërorja", "Kallëzorja", "Rrjedhore"], correct: "Gjinorja" },
  { q: "Në fjalinë 'Shoh djalin' — 'djalin' është rasë:", options: ["Kallëzore", "Emërore", "Dhanore", "Gjinore"], correct: "Kallëzore" },
  // Folja
  { q: "Si formohet e ardhme shqip?", options: ["do të + folja", "+sha", "kam + folja", "do + folja"], correct: "do të + folja" },
  { q: "'Lexova' është kohë:", options: ["E shkuar e thjeshtë", "E tashme", "E ardhme", "Urdhërorja"], correct: "E shkuar e thjeshtë" },
  { q: "Mënyra urdhërore e 'shko'?", options: ["shko!", "shkoj!", "shkova!", "do të shkoj!"], correct: "shko!" },
  { q: "Forma e saktë për 'ti' — folja 'lexoj'?", options: ["lexon", "lexoj", "lexojmë", "lexoni"], correct: "lexon" },
  // Drejtshkrim
  { q: "Si shkruhet saktë?", options: ["vajzë", "vajze", "vajza (njëjës)", "vaize"], correct: "vajzë" },
  { q: "Cili mohim është i saktë para foljes?", options: ["nuk", "mos", "jo", "s'"], correct: "nuk" },
  { q: "Kur përdorim 'mos'?", options: ["Para foljes urdhërore mohuese", "Para foljes pohore", "Para emrit", "Para mbiemrit"], correct: "Para foljes urdhërore mohuese" },
  // Letërsia
  { q: "Kush shkroi 'Lahuta e Malcis'?", options: ["Gjergj Fishta", "Naim Frashëri", "Migjeni", "Ismail Kadare"], correct: "Gjergj Fishta" },
  { q: "Naim Frashëri i takon periudhës:", options: ["Rilindjes Kombëtare", "Mes luftërave", "Modernizmit", "Romantizmit italian"], correct: "Rilindjes Kombëtare" },
  { q: "Kush shkroi 'Vargjet e Lira'?", options: ["Migjeni", "Fan Noli", "Naim Frashëri", "Kadare"], correct: "Migjeni" },
  { q: "Ismail Kadare është i njohur si:", options: ["Romancier ndërkombëtar", "Poet i Rilindjes", "Dramaturg klasik", "Shkrimtar mesjetar"], correct: "Romancier ndërkombëtar" },
  { q: "Llojet e ligjëratës janë gjithsej:", options: ["8", "5", "6", "10"], correct: "8" },
];

// ════════════════════════════════════════════════════════
//  QUIZ — ANGLISHT (30 pyetje)
// ════════════════════════════════════════════════════════
const ANGLISHT_QUIZ = [
  // Silent letters
  { q: "Cila shkronjë është e heshtur në 'knife'?", options: ["K", "N", "I", "E"], correct: "K" },
  { q: "Cila shkronjë është e heshtur në 'write'?", options: ["W", "R", "I", "T"], correct: "W" },
  { q: "Cila shkronjë është e heshtur në 'hour'?", options: ["H", "O", "U", "R"], correct: "H" },
  { q: "Cila shkronjë është e heshtur në 'lamb'?", options: ["B", "L", "A", "M"], correct: "B" },
  { q: "Cila shkronjë është e heshtur në 'island'?", options: ["S", "I", "L", "D"], correct: "S" },
  // TH
  { q: "TH në 'the/this/that' tingëllon si:", options: ["ð (me zë)", "θ (pa zë)", "T", "D"], correct: "ð (me zë)" },
  { q: "TH në 'think/three' tingëllon si:", options: ["θ (pa zë)", "ð (me zë)", "T", "S"], correct: "θ (pa zë)" },
  { q: "TH në 'mother/father' është:", options: ["ð (i butë)", "θ (i fortë)", "T", "D"], correct: "ð (i butë)" },
  // Plural
  { q: "Shumësi i 'child' është:", options: ["children", "childs", "childes", "childies"], correct: "children" },
  { q: "Shumësi i 'city' është:", options: ["cities", "citys", "cityes", "cityies"], correct: "cities" },
  { q: "Shumësi i 'box' është:", options: ["boxes", "boxs", "boxies", "boxen"], correct: "boxes" },
  { q: "Shumësi i 'sheep' është:", options: ["sheep", "sheeps", "sheepes", "sheepen"], correct: "sheep" },
  { q: "Shumësi i 'man' është:", options: ["men", "mans", "manes", "menies"], correct: "men" },
  { q: "Shumësi i 'tooth' është:", options: ["teeth", "tooths", "toothes", "teeths"], correct: "teeth" },
  // Tenses
  { q: "Past simple i 'go' është:", options: ["went", "goed", "gone", "goes"], correct: "went" },
  { q: "Past simple i 'eat' është:", options: ["ate", "eated", "eaten", "eats"], correct: "ate" },
  { q: "Past simple i 'play' (rregullt) është:", options: ["played", "plaied", "plaid", "plays"], correct: "played" },
  { q: "Forma 'She goes' është kohë:", options: ["Present Simple", "Past Simple", "Future", "Present Continuous"], correct: "Present Simple" },
  { q: "Forma 'I am going' është kohë:", options: ["Present Continuous", "Present Simple", "Past Simple", "Future"], correct: "Present Continuous" },
  { q: "Future me 'will': I will go — 'will' +:", options: ["folja bazë (go)", "folja +s (goes)", "folja +ing", "folja +ed"], correct: "folja bazë (go)" },
  // Articles
  { q: "Cila nyje vjen para 'apple'?", options: ["an", "a", "the", "pa nyje"], correct: "an" },
  { q: "Cila nyje vjen para 'university'?", options: ["a", "an", "the", "pa nyje"], correct: "a" },
  { q: "Cila nyje vjen para 'hour'?", options: ["an", "a", "the", "pa nyje"], correct: "an" },
  { q: "'___ sun rises in the east' — nyja:", options: ["The", "A", "An", "pa nyje"], correct: "The" },
  { q: "Para emrave abstrakt (love, music) përdorim:", options: ["Pa nyje", "a", "an", "the"], correct: "Pa nyje" },
  // Vowel sounds
  { q: "Zanorja 'A' në 'cake' tingëllon si:", options: ["eɪ (ay)", "æ (cat)", "ɑː (car)", "ə (about)"], correct: "eɪ (ay)" },
  { q: "Zanorja 'A' në 'cat' tingëllon si:", options: ["æ (e shkurtër)", "eɪ (cake)", "ɑː (car)", "ə"], correct: "æ (e shkurtër)" },
  // Literature
  { q: "Kush shkroi 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Tolkien", "Orwell"], correct: "Shakespeare" },
  { q: "Kush shkroi 'Harry Potter'?", options: ["J.K. Rowling", "Tolkien", "C.S. Lewis", "Dahl"], correct: "J.K. Rowling" },
  { q: "Kush shkroi '1984' dhe 'Animal Farm'?", options: ["George Orwell", "Dickens", "Woolf", "Hardy"], correct: "George Orwell" },
];

// ════════════════════════════════════════════════════════
//  COMPONENTS
// ════════════════════════════════════════════════════════
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
              <div className="bg-white/70 rounded-xl p-3 text-sm text-gray-700 leading-relaxed">{rule.explanation}</div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">📌 Shembuj:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {rule.examples.map((ex, i) => (
                    <button key={i}
                      onClick={() => speakText(ex.word.split(" ")[0].split("→")[0].trim(), language)}
                      className="bg-white border border-gray-100 rounded-xl p-3 text-left hover:shadow-md transition-all group">
                      <div className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 flex items-center gap-1 flex-wrap">
                        {ex.word} <Volume2 className="w-3 h-3 text-gray-300 group-hover:text-emerald-500 shrink-0" />
                      </div>
                      <div className="text-xs text-emerald-600 font-medium mt-0.5">{ex.highlight}</div>
                      <div className="text-xs text-gray-400 italic">{ex.note}</div>
                    </button>
                  ))}
                </div>
              </div>
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
  const [timer, setTimer] = useState(20);
  const [finished, setFinished] = useState(false);
  const [shuffled] = useState(() => [...questions].sort(() => Math.random() - 0.5));

  useEffect(() => {
    if (!started || finished) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, started, finished, idx]);

  const handleAnswer = (opt) => {
    if (answered !== null) return;
    const isCorrect = opt === shuffled[idx].correct;
    setAnswered({ selected: opt, correct: shuffled[idx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= shuffled.length) { setFinished(true); return; }
      setIdx(i => i + 1); setTimer(20); setAnswered(null);
    }, 1500);
  };

  const restart = () => { setStarted(false); setFinished(false); setIdx(0); setScore(0); setTimer(20); setAnswered(null); };
  const pct = Math.round((score / shuffled.length) * 100);

  if (!started) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <div className="text-5xl mb-4">🎯</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Kuiz — {langLabel}</h3>
      <p className="text-gray-500 mb-1">{shuffled.length} pyetje · 20 sekonda secila</p>
      <p className="text-sm text-teal-600 mb-6">Gjuhë, gramatikë dhe letërsi — nivel shkollë fillore!</p>
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
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Kuizi Mbaroi!</h3>
      <p className={`text-5xl font-bold mb-3 ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>
        {score}/{shuffled.length}
      </p>
      <p className="text-gray-500 mb-2 font-medium">
        {pct >= 90 ? "🏆 Excellent! Mëso si profesionist!" : pct >= 70 ? "👍 Shumë mirë! Vazhdo kështu!" : pct >= 50 ? "📚 Mirë! Shiko rregullat sërish!" : "💪 Lexo rregullat dhe provo sërish!"}
      </p>
      <p className="text-sm text-gray-400 mb-6">{pct}% saktësi</p>
      <button onClick={restart}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-3 font-bold flex items-center gap-2 mx-auto">
        <RotateCcw className="w-4 h-4" /> Provo Sërish
      </button>
    </motion.div>
  );

  const q = shuffled[idx];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-600">Pyetja {idx + 1}/{shuffled.length}</span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
          <Timer className="w-4 h-4" /> {timer}s
        </div>
        <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(idx / shuffled.length) * 100}%` }} />
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

// ════════════════════════════════════════════════════════
//  MAIN EXPORT
// ════════════════════════════════════════════════════════
export default function LanguageRulesView({ language, defaultTab }) {
  const [tab, setTab] = useState(defaultTab || "rregullat");
  const rules = language === "shqip" ? SHQIP_RULES : ANGLISHT_RULES;
  const quiz  = language === "shqip" ? SHQIP_QUIZ  : ANGLISHT_QUIZ;
  const langLabel = language === "shqip" ? "Shqip 🇦🇱" : "English 🇬🇧";

  const tabs = [
    { id: "rregullat", label: language === "shqip" ? "📚 Rregullat" : "📚 Rules" },
    { id: "kuiz",      label: language === "shqip" ? "🎯 Kuiz (30 pyetje)" : "🎯 Quiz (30 questions)" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {language === "shqip"
            ? "📖 Gjuhë Shqipe & Letërsi — Klasa 1-9"
            : "📖 English Language & Literature — Grades 1-9"}
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          {language === "shqip"
            ? "Gjuha, gramatika, drejtshkrimi dhe letërsia shqipe para gjimnazit"
            : "Grammar, spelling, literature and language rules before high school"}
        </p>
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