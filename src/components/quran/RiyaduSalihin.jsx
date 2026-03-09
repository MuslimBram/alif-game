import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { downloadLinks } from "./downloadLinksConfig";

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
  },
  {
    chapter: "Kapitulli 6 — Bamirësia & Sadakaja",
    color: "emerald",
    hadiths: [
      {
        arabic: "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ",
        text: "Sadakaja e shuajnë mëkatin ashtu si uji shuajnë zjarrin.",
        source: "Tirmidhi — Riyadu Es-Salihin 121",
        explanation: "Sadakaja ka tri fuqi: 1) Fshin mëkatet, 2) Shëron sëmundjet (trajtoni të sëmurët tuaj me sadaka — hadithe), 3) Largon balën. Sadakaja e fshehtë tek Allahu është nga shtatë llojet e njerëzve që do të mbrohen Ditën e Kiametit."
      },
      {
        arabic: "لَا يَقْبَلُ اللَّهُ صَلَاةَ أَحَدِكُمْ إِذَا أَحْدَثَ حَتَّى يَتَوَضَّأَ",
        text: "Allahu nuk pranon namazin e ndonjërit prej jush nëse ka humbur abdesin deri sa të marrë abdest.",
        source: "Buhari — Riyadu Es-Salihin 130",
        explanation: "Pastërtia (tahara) është kushti i parë i namazit. Pa abdest, namazi nuk pranohet. Kjo mëson rëndësinë e pastërtisë fizike dhe shpirtërore në islam — të dyja janë të ndërlidhura."
      }
    ]
  },
  {
    chapter: "Kapitulli 7 — Lutja (Dua)",
    color: "amber",
    hadiths: [
      {
        arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ",
        text: "Dua është adhurim.",
        source: "Tirmidhi — Riyadu Es-Salihin 145",
        explanation: "Dua (lutja) nuk është thjesht kërkesë — ajo është thelbi i adhurimit. Kush lutet, njeh varësinë e tij nga Allahu. Kush nuk lutet, ka krenari. Allahu thotë: 'Lutmuni, do t'u përgjigjem' — kjo është premtim hyjnor."
      },
      {
        arabic: "أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ",
        text: "Robi është më afër Zotit të tij kur është në sexhde.",
        source: "Muslim — Riyadu Es-Salihin 152",
        explanation: "Sexhdeja është kulmi i adhurimit — koka (organi i krenaris) preket toka (simboli i modestis). Kush lutet me sinqeritet në sexhde, lutja pranohet. Ky moment i afërsisë hyjnore është mundësia e artë — shfrytëzoje para ngritjes nga sexhdeja."
      }
    ]
  },
  {
    chapter: "Kapitulli 8 — Siguria & Frika nga Allahu",
    color: "rose",
    hadiths: [
      {
        arabic: "لَوْ تَعْلَمُونَ مَا أَعْلَمُ لَضَحِكْتُمْ قَلِيلًا وَلَبَكَيْتُمْ كَثِيرًا",
        text: "Nëse do të dinjit ç'di unë, do të qeshniit pak dhe do të qanit shumë.",
        source: "Buhari & Muslim — Riyadu Es-Salihin 410",
        explanation: "Profeti ﷺ kishte njohuri rreth botës tjetër, Kiametit dhe dënimeve që ne nuk kemi. Kjo fjalë duhet të na bëjë reflektuar — sa pak mendojmë për Ahiretin! Qarja nga frika e Allahut është ibadet dhe tregues i imanit."
      },
      {
        arabic: "اتَّقِ الْمُحَرَّمَاتِ تَكُنْ أَعْبَدَ النَّاسِ",
        text: "Ruaju nga të ndaluarat dhe do të jesh njeriu më adhurues.",
        source: "Tirmidhi — Riyadu Es-Salihin 420",
        explanation: "Shmangja e haramit është formë e adhurimit — madje mund të jetë më e rëndësishme sesa adhurimet shtesë. Njeriu që nuk bën namaze nafile por ruan veten nga harami, mund të jetë afër Allahut sesa ai që bën shumë adhurime por bie në harame."
      }
    ]
  },
  {
    chapter: "Kapitulli 9 — Vëllazëria & Dashuria për Allahun",
    color: "blue",
    hadiths: [
      {
        arabic: "لَا تَدْخُلُونَ الْجَنَّةَ حَتَّى تُؤْمِنُوا وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا",
        text: "Nuk hyni në Xhennet derisa të besoni, dhe nuk besoni plotësisht derisa të duheni.",
        source: "Muslim — Riyadu Es-Salihin 188",
        explanation: "Lidhja midis imanit dhe dashurisë vëllazërore është thelbësore. Iman i plotë → dashuri ndaj vëllezërve. Profeti ﷺ dha ilaçin: 'A doni t'ju tregoj çfarë të forcojë dashurinë midis jush? Përshëndetni shumë njëri-tjetrin me selam.'"
      },
      {
        arabic: "أَحِبَّ لِلنَّاسِ مَا تُحِبُّ لِنَفْسِكَ تَكُنْ مُسْلِمًا",
        text: "Dëshiro për njerëzit ç'dëshiron për veten tënde dhe do të jesh musliman (i vërtetë).",
        source: "Ibn Maxheh — Riyadu Es-Salihin 197",
        explanation: "Ky hadith është pasaporta e Islamit. Muslimani i vërtetë nuk mendon vetëm për veten — ai dëshiron të mirën për të gjithë. Kjo dashuri universale është shenja e imanit autentik."
      }
    ]
  }
];

const KUDSI_HADITHS = [
  {
    num: 1,
    arabic: "أَنَا عِنْدَ ظَنِّ عَبْدِي بِي، وَأَنَا مَعَهُ إِذَا ذَكَرَنِي",
    text: "Jam ashtu siç mendon robi Im për Mua, dhe Jam me të kur Më përmend.",
    source: "Buhari 7405 & Muslim 2675",
    explanation: "Ky hadith kudsi mëson dy parime madhore: së pari, 'husn udh-dhann billah' — mendimi i mirë ndaj Allahut. Nëse mendon me sinqeritet se Allahu të fal, Ai fal. Nëse mendon se lutja pranohet, pranohet. Allahu vepron sipas pritjes së robit të Tij. Së dyti, Allahu është gjithmonë i pranishëm me robin kur ky e përmend. Kur thuhet 'Subhanallah', 'Alhamdulillah', 'Allahu Akbar' — Allahu është 'me ty' në atë çast. Imam Ibn El-Qayyim thotë: 'Mos harro kurrë të mendosh mirë për Allahun — kjo është prej ibadeteve me vlerë të lartë.'"
  },
  {
    num: 2,
    arabic: "يَا ابْنَ آدَمَ، إِنَّكَ مَا دَعَوْتَنِي وَرَجَوْتَنِي غَفَرْتُ لَكَ عَلَى مَا كَانَ فِيكَ وَلَا أُبَالِي",
    text: "O bir i Ademit! Sa kohë që më lutesh dhe shpresosh tek Unë, Unë të fal gjithçka pa u shqetësuar.",
    source: "Tirmidhi 3540 — Hadith Hasen",
    explanation: "Ky hadith kudsi është nga shpresëdhënëset më të mëdha për çdo musliman. Allahu vazhdon: 'Edhe nëse mëkatet e tua arrijnë deri në qiellin e parë, pastaj kërkon falje, Unë të fal. Edhe nëse mëkatet e tua arrijnë deri në tokë, pastaj vjen tek Unë pa i shoqëruar Mua asgjë, Unë të vij me falje sa madhësia e tokës.' Tre kushte janë vendimtare: 1) Dua (lutja e vazhdueshme), 2) Rexa (shpresa tek Allahu), 3) Tevhidi (monoteizmi — pa shirk). Nëse këto tre ekzistojnë, Allahu fal çdo gjë, sado e madhe të jetë. Kjo është nga mëshirat e Allahut që tejkalon çdo imagjinatë njerëzore."
  },
  {
    num: 3,
    arabic: "مَنْ تَقَرَّبَ إِلَيَّ شِبْرًا تَقَرَّبْتُ إِلَيْهِ ذِرَاعًا، وَمَنْ أَتَانِي يَمْشِي أَتَيْتُهُ هَرْوَلَةً",
    text: "Kush më afrohet një pëllëmbë, Unë i afrohem një krah. Kush vjen tek Unë duke ecur, Unë shkoj tek ai duke vrapuar.",
    source: "Buhari 7405 & Muslim 2675",
    explanation: "Ky hadith tregon me figuracion të mrekullueshëm se si Allahu i përgjigjet çdo hapi të njeriut drejt Tij. Matematika hyjnore: njeriu jep 1, merr 10. Njeriu ecën, Allahu 'vrapón'. Kjo jo vetëm motivon adhurimin, por tregon dashurinë absolute të Allahut për robin E Tij. Ibn Tejmijje shpjegon se kjo 'afrim' nuk është fizike (Allahu është larg krahasimeve fizike), por tregon shkallën e mëshirës, ndihmës dhe pranisë shpirtërore të Allahut. Sa herë njeriu ngritet nga gjumi të falet tahaxhxhud, sa herë kap Kur'anin pa asnjë arsye të jashtme — Allahu 'vrapon' drejt tij me mëshirën E Tij."
  },
  {
    num: 4,
    arabic: "يَا عِبَادِي، إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلَا تَظَالَمُوا",
    text: "O robërit e Mi! Unë e kam ndaluar padrejtësinë për Veten Time dhe e kam bërë të ndaluar midis jush — prandaj mos i bëni padrejtësi njëri-tjetrit.",
    source: "Muslim 2577 — Hadith Kudsi nga Ebu Dherri",
    explanation: "Ky hadith kudsi i gjatë dhe i famshëm (i transmetuar nga Ebu Dherri) është konsideruar nga dijetarët si njëra nga bazat e etikës islame. Allahu vetë deklaron: 'Unë nuk bëj padrejtësi' — kjo rrënon çdo pretendim kundër drejtësisë hyjnore. Pastaj Ai e ndalon padrejtësinë absolutisht midis njerëzve. Dua e mazlumit (atij të cilit i bëhet padrejtësi) nuk ka perde mes saj dhe Allahut — pranohet edhe nëse ai person është jobesimtar. Hadithi vazhdon me fjala mahnitëse: 'O robërit e Mi, ju të gjithë jeni të uritur përveç atij që Unë ushqeva — ushqeni Me. Ju të gjithë jeni të zhveshur përveç atij që Unë veshja — kërkoni veshje nga Unë.' Ky hadith mbulkon gjithë varësinë njerëzore nga Allahu."
  },
  {
    num: 5,
    arabic: "كُلُّ عَمَلِ ابْنِ آدَمَ لَهُ إِلَّا الصَّوْمَ، فَإِنَّهُ لِي وَأَنَا أَجْزِي بِهِ",
    text: "Çdo vepër e birit të Ademit i takon atij, me përjashtim të agjërimit — ai është për Mua dhe Unë shpërblyej për të.",
    source: "Buhari 1904 & Muslim 1151",
    explanation: "Allahu e veçoi agjërimin si adhurim ekskluzivisht të Tij. Dijetarët kanë shpjeguar arsyet e kësaj veçantie: 1) Agjërimi është ibadet i fshehur — njeriu mund të pretendojë namaz para njerëzve, por nuk mund të pretendojë agjërim sepse mund të hajë fshehurazi. Vetëm Allahu di me siguri nëse dikush po agjëron. 2) Agjëruesi i braktis të gjitha kënaqësitë e tij trupore vetëm dhe vetëm për Allahun — ky sinqeritet absolut është unikalja e agjërimit. 3) Shpërblimi 'Unë shpërblyej' nënkupton se nuk ka kufi të caktuar për shpërblimin e agjërimit — ndërkohë veprat e tjera kanë shumëfishim të caktuar (10x, 700x). Hadithi vazhdon: 'Agjëruesi ka dy gëzime: gëzimi kur e çel iftarin dhe gëzimi kur takohet me Zotin e tij.' Erëmirësia e gojës së agjëruesit tek Allahu është më e mirë se erëmirësia e miskut."
  },
  {
    num: 6,
    arabic: "إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ، فَإِذَا قَتَلْتُمْ فَأَحْسِنُوا الْقِتْلَةَ",
    text: "Allahu ka urdhëruar Ihsanin (shkëlqyeshmërinë) në çdo gjë. Kur therni, bëjeni mirë therjen.",
    source: "Muslim 1955",
    explanation: "Ky hadith kudsi vendos filozofinë islame të Ihsanit si parim universal. Ihsani (nga 'hasuna' — të jesh i bukur/i shkëlqyeshëm) do të thotë të bësh çdo gjë me nivelin më të lartë të cilësisë dhe kujdesit. Profeti ﷺ e zbatoi këtë parim edhe te therja e kafshëve: 'Kur therni kafshën, mprehni mirë thikën dhe lehtësoni kafshën.' Ky mesazh është revolucionar: etika islame nuk ndalet tek njerëzit — shtrihet edhe tek kafshët dhe çdo krijesë. Ihsani në punë do të thotë profesionalizëm. Ihsani në adhurim do të thotë adhurimi sikur e sheh Allahun. Ihsani me njerëzit do të thotë t'i trajtosh me butësi dhe respekt. I gjithë jeta muslimane është thirrje drejt Ihsanit."
  },
  {
    num: 7,
    arabic: "وَعِزَّتِي وَجَلَالِي لَا أَجْمَعُ عَلَى عَبْدِي خَوْفَيْنِ وَلَا أَجْمَعُ لَهُ أَمْنَيْنِ",
    text: "Betohem në madhërinë Time — nuk bashkoj dy frikë mbi robin Tim dhe nuk bashkoj dy siguri për të.",
    source: "Ibn Hibban 931 — Sahih",
    explanation: "Ky hadith kudsi shpreh një ligj hyjnor të drejtësisë absolute: Allahu nuk i mbledh dy frikëra mbi të njëjtin njeri njëkohësisht. Kush i frikësohet Allahut tani (në dynja), do të jetë i sigurt Ditën e Kiametit — nuk do t'i frikësohet llogarisë. Kush jeton i sigurt dhe i qetë nga dënimi i Allahut sot (duke mëkatuar lirisht pa u penduar), do t'i frikësohet Atij në Ahiret. Kjo është ekuacioni i drejtësisë hyjnore. Prandaj dijetarët thonë: 'Kush dëshiron të jetë i sigurt nesër, le të frikësohet sot.' Frika nga Allahu nuk është ankth — është mburojë, është rruga drejt sigurisë së përjetshme."
  },
  {
    num: 8,
    arabic: "يَا عِبَادِي كُلُّكُمْ ضَالٌّ إِلَّا مَنْ هَدَيْتُهُ فَاسْتَهْدُونِي أَهْدِكُمْ",
    text: "O robërit e Mi! Të gjithë jeni të humbur, përveç atij që Unë udhëzova — kërkoni udhëzim prej Meje, do t'ju udhëzoj.",
    source: "Muslim 2577 — Hadith i Ebu Dherrit",
    explanation: "Ky hadith kudsi (pjesë e hadithit të gjatë të Ebu Dherrit) mëson varësinë totale të njeriut nga udhëzimi hyjnor. Hidajeti (udhëzimi) është dhunti e Allahut — njeriu nuk mund ta sigurojë vetë. Allahu na ka mësuar të kërkojmë udhëzim 17 herë në ditë: 'Ihdinas sirratal mustekim' — çdo rekat namazi. Kjo nuk është vetëm formalitet — është pranim i vërtetë i paaftësisë sonë pa ndihmën hyjnore. Imam Es-Sadi thotë: 'Edhe sahabët që i kishin dhënë dorën Profetit ﷺ, edhe ata kërkonin udhëzim çdo ditë, sepse hidajeti nuk është akt i një here — ai ka nevojë të ripërtërihet çdo ditë.'"
  },
  {
    num: 9,
    arabic: "يَا ابْنَ آدَمَ لَوْ بَلَغَتْ ذُنُوبُكَ عَنَانَ السَّمَاءِ ثُمَّ اسْتَغْفَرْتَنِي غَفَرْتُ لَكَ",
    text: "O bir i Ademit! Edhe nëse mëkatet e tua arritën deri te qielli, pastaj kërkon falje, Unë të fal.",
    source: "Tirmidhi 3540",
    explanation: "'Anan as-Sama' — kupola e qiellit — është shprehje arabe për diçka të pafund e të papërmbajtshme. Allahu e përdor këtë metaforë për të treguar se falja E Tij është pa kufi. Prandaj Islami ndalon kategorikisht 'kunutin' — dëshpërimin nga mëshira e Allahut. Sahabet kanë transmetuar se kur zbrite ky hadith, sytë e Profetit ﷺ u mbushën me lot gëzimi — sepse ai dinte sa njerëz do të gjenin paqe shpirtërore përmes kësaj fjale hyjnore. Istigfari (kërkimi i faljes) nuk duhet të bëhet me gojë të ngurtë — ai kërkon zemër të nënshtruar, ndërgjegjje të mëkatit dhe vendosmëri për ndryshim."
  },
  {
    num: 10,
    arabic: "يَا عِبَادِي، كُلُّكُمْ جَائِعٌ إِلَّا مَنْ أَطْعَمْتُهُ فَاسْتَطْعِمُونِي أُطْعِمْكُمْ",
    text: "O robërit e Mi! Të gjithë jeni të uritur, përveç atij që Unë ushqeva — kërkoni ushqim nga Unë, do t'ju ushqej.",
    source: "Muslim 2577",
    explanation: "Ky hadith kudsi (pjesë e hadithit të madh të Ebu Dherrit) vazhdon të mësojë varësinë e plotë të njeriut nga Allahu — kësaj here në aspektin material. Allahu është Ar-Razzak (Furnizuesi). Çdo kafshatë që hëngrim, çdo pikë ujë, çdo frymë e mushkërive janë prej dhuntive të Allahut. Tevekkuli (mbështetja tek Allahu) nuk do të thotë pasivitet — do të thotë punë e plotë + besim i plotë se rezultati vjen vetëm nga Allahu. Dua e rizgut (furnizimit) është e urdhëruar: 'Allahume inni es'eluke rizkan tayyiban' — O Allah, kërkoj nga Ti furnizim të pastër."
  },
  {
    num: 11,
    arabic: "مَنْ ذَكَرَنِي فِي نَفْسِهِ ذَكَرْتُهُ فِي نَفْسِي، وَمَنْ ذَكَرَنِي فِي مَلَإٍ ذَكَرْتُهُ فِي مَلَإٍ خَيْرٍ مِنْهُمْ",
    text: "Kush Më përmend në vetvete, Unë e përmend në Veten Time. Kush Më përmend në një tubim, Unë e përmend në tubim më të mirë se ai.",
    source: "Buhari 7405 & Muslim 2675",
    explanation: "Dhikri (përmendja e Allahut) ka shpërblim në proporcion me vendin ku bëhet. Nëse dikush thotë 'Subhanallah' fshehurazi vetëm me zemrën e tij — Allahu e 'përmend' atë me dinjitet para Vetes së Tij. Nëse dikush e përmend Allahun publikisht, në tubim njerëzish — Allahu e përmend atë para engjëjve, krerëve të qiellit, para tubimit më fisnik të ekzistencës. Ibn El-Qayyim thotë: 'Kur Allahu të përmend, çfarë mund të të mungojë? Kur Allahu harron të të përmendë, çfarë mund të kesh?' Prandaj dhikri është kurrizi i jetës shpirtërore të muslimanit."
  },
  {
    num: 12,
    arabic: "أَنَا مَعَ عَبْدِي حِينَ يَذْكُرُنِي وَتَحَرَّكَتْ بِي شَفَتَاهُ",
    text: "Unë jam me robin Tim kur Më përmend dhe buzët e tij lëvizin me emrin Tim.",
    source: "Ibn Maxheh 3792 — Sahih",
    explanation: "Ky hadith kudsi tregon praninë e veçantë të Allahut gjatë dhikrit. Kur muslimani ulet dhe fillon të thotë 'Allahu Akbar, SubhanAllah, Alhamdulillah' — Allahu është 'me të' në atë moment. Kjo nuk është pranim fizike (Allahu është larg krahasimeve), por pranim i mëshirës, ndihmës dhe kujdesit hyjnor. Prandaj muslimanët e lashtë e kalonin kohën e tyre kryesisht në dhikër — ata kuptonin se ishin gjithmonë 'në praninë e Allahut'. Kjo ndërgjegjje e vazhdueshme është kultura spirituale islame."
  },
  {
    num: 13,
    arabic: "الْكِبْرِيَاءُ رِدَائِي وَالْعَظَمَةُ إِزَارِي، فَمَنْ نَازَعَنِي وَاحِدًا مِنْهُمَا أَلْقَيْتُهُ فِي النَّارِ",
    text: "Madhëria është manteli Im dhe krenaria është rrobat e brendshme të Mia — kush më garzon në njërën prej tyre, e hedh në zjarr.",
    source: "Ebu Davud 4090 & Ibn Maxheh 4174 — Sahih",
    explanation: "Ky hadith kudsi mëson njërën nga mësimet më të rëndësishme të teologjisë islame: Kibri (krenaria, arroganca) janë ekskluzivisht atribute të Allahut — njeriu nuk ka të drejtë t'i 'veshë'. Allahu i ka 'veshur' madhërinë dhe krenaria si 'mantel' dhe 'rrobë' — ato janë pronë E Tij. Njeriu që bëhet krenar po 'garzon' me Allahun — po pretendon cilësi që i takojnë vetëm Atij. Kjo është arsyeja pse kibri (arroganca) është nga mëkatet më të rënda dhe mund të çojë në mohim (siç ndodhi me Iblisit). Tawadu (modestia) është kundërvënia e drejtë e kibrit dhe virtyti i çdo besimtari."
  },
  {
    num: 14,
    arabic: "يَا عِبَادِي، لَوْ أَنَّ أَوَّلَكُمْ وَآخِرَكُمْ وَإِنسَكُمْ وَجِنَّكُمْ كَانُوا عَلَى أَتْقَى قَلْبِ رَجُلٍ وَاحِدٍ مِنْكُمْ مَا زَادَ ذَلِكَ فِي مُلْكِي شَيْئًا",
    text: "O robërit e Mi! Edhe nëse i pari dhe i fundit juaj, njerëzit dhe xhinët, do të ishin mbi zemrën e njeriut tuaj më të devotshëm — kjo nuk do të shtonte asgjë në mbretërinë Time.",
    source: "Muslim 2577",
    explanation: "Ky ajet i jashtëzakonshëm nga hadithi i gjatë i Ebu Dherrit tregon pavarësinë absolute të Allahut nga krijesat e Tij. Allahu nuk ka nevojë për ne — adhurimet tona nuk i shtojnë asgjë Atij. Pastaj vazhdon simetrikisht: 'Edhe nëse të gjithë do të ishin mbi zemrën e njeriut tuaj më mëkatar — kjo nuk do të ulte asgjë nga mbretëria Ime.' Ne adhurojmë Allahun jo sepse Ai ka nevojë, por sepse ne kemi nevojë. Çdo sexhde, çdo istigfar, çdo sadaka janë investime për veten tonë — për Ahiretin tonë — jo 'shërbime' që i bëjmë Allahut. Kjo perspektivë ndryshon tërësisht motivimin e ibadetit."
  },
  {
    num: 15,
    arabic: "أَحْبَبْتُ أَنْ أُعْرَفَ فَخَلَقْتُ الْخَلْقَ",
    text: "Doja të njohesh, prandaj krijova krijimin.",
    source: "Hadith i transmetuar — Dijetarët diskutojnë shkallën",
    explanation: "Edhe pse ky hadith kudsi ka debate mes dijetarëve për shkallën e tij, kuptimi i tij është i mbështetur nga ajete Kur'anore. Allahu krijoi njerëzimin dhe xhinët për ta adhuruar dhe njohur Atë (51:56). Njoha e Allahut — njohja e emrave dhe cilësive të Tij — është qëllimi suprem i jetës njerëzore. Njeriu nuk ka ardhur rastësisht në këtë botë — ai ka qëllim të lartë: të njohë Krijuesin e Tij dhe të jetojë sipas kësaj njohjeje. Ky hadith, pavarësisht debateve teknike, shpjegon 'pse' e krijimit: Allahu është 'El-Kenz El-Makhfi' (Thesari i Fshehur) që donte të shfaqej."
  },
  {
    num: 16,
    arabic: "لَيْسَ شَيْءٌ أَكْرَمَ عَلَى اللَّهِ مِنَ الدُّعَاءِ",
    text: "Asgjë nuk është më e nderuar tek Allahu sesa dua.",
    source: "Tirmidhi 3370 — Hasen",
    explanation: "Dua (lutja) është nga ibadetet me nderin më të lartë tek Allahu. Profeti ﷺ e quajti duan 'thelbin e adhurimit' (Tirmidhi 3371). Allahu urdhëron: 'Lutmuni, do t'u përgjigjem' (Ghafer 60) — kjo është premtim hyjnor. Por dua ka kushte: 1) Ushqimi halal, 2) Bindja ndaj Allahut, 3) Sinqeriteti, 4) Mos nxitimi ('kur të thotë 'u luta por nuk u prit'). Allahu ose i përgjigjet menjëherë, ose ruan lutjen si store sevapesh, ose largon një të keqe të barabartë. Asnjë dua e bërë me sinqeritet nuk humbet — ajo është gjithmonë e regjistruar."
  },
  {
    num: 17,
    arabic: "عَجِبَ رَبُّنَا مِنْ قُنُوطِ عِبَادِهِ وَقُرْبِ غِيَرِهِ",
    text: "Zoti ynë çuditet me dëshpërimin e robëve të Tij, ndërkohë që ndryshimi i gjendjes është shumë afër.",
    source: "Ahmed & Ibn Maxheh — Sahih",
    explanation: "Allahu 'çuditet' — në mënyrën që i takon madhërisë E Tij, pa ngjasim me krijesat — me njeriun kur ai dëshpërohet dhe humbet shpresën, ndërkohë që çlirimi mund të jetë vetëm një moment larg. Historikisht: Profetin Ibrahim u hodh në zjarr dhe zjarri u bë i ftohtë. Profeti Junus u gëlltit nga balena dhe u lirua. Profeti Ejubi vuajti për vite dhe u shërua. Liria erdhi kur dukej e pamundur. Ky hadith i mëson muslimanit: mos u dëshpëro kurrë — Allahu mund ta ndryshojë çdo situatë brenda një çasti. 'Fa inna maa el-usri yusraa' — Me vështirësinë vjen lehtësia."
  },
  {
    num: 18,
    arabic: "أَنَا عِنْدَ الْمُنْكَسِرَةِ قُلُوبُهُمْ مِنْ أَجْلِي",
    text: "Unë jam me ata që zemrat e tyre janë të thyera për shkak të Meje.",
    source: "Transmeton Taberani — Hadith Kudsi",
    explanation: "Ky hadith kudsi tregon mëshirën e veçantë të Allahut ndaj atyre që vuajnë shpirtërisht: atyre që qajnë nga frika e Allahut, atyre që pikëllohen nga mëkatet e tyre, atyre që zemrat i kanë të thyera nga sprovat. Shkrimet profetike janë plot me tregime njerëzish të thyer shpirtërisht — dhe Allahu ishte 'me ta'. Profeti Davudi (Davidi) qante aq shumë saqë rridhte uji nga lotët e tij. Profeti Muhammedi ﷺ qante gjatë namazit të natës. Kjo 'thyerje e zemrës' (inkisar) para Allahut është kulmi i devotshmërisë — është pikërisht 'humilitas' e vërtetë."
  },
  {
    num: 19,
    arabic: "إِنَّ اللَّهَ يُحِبُّ الْعَبْدَ التَّقِيَّ الْغَنِيَّ الْخَفِيَّ",
    text: "Allahu e do robin e devotshëm, të pasur shpirtërisht, dhe të fshehur (pa kërkuar famë).",
    source: "Muslim 2965",
    explanation: "Tre tiparet e njeriut të dashur tek Allahu: 1) Taqwa — devotshmëria — frika nga Allahu dhe largimi nga ndalesat. 2) Ghina — pasurimprania shpirtërore — ndjesia e kënaqur me atë çka Allahu ka dhënë, pa lakmuar të tjetrit. 3) Khafi — fshehuria — njeriu që punon shumë për Allahun por nuk kërkon lavdërim publik. Shoqëria moderne lavdëron famën dhe vidisbilitetin — Islami lavdëron modestinë dhe veprën e fshehur. Dy rekate namaz natën, të fshehura nga gjithë njerëzit, mund të jenë shumë me vlerë sesa mijëra rekate para kamerave."
  },
  {
    num: 20,
    arabic: "مَنْ آذَى لِي وَلِيًّا فَقَدْ آذَنْتُهُ بِالْحَرْبِ",
    text: "Kush lëndon ndonjë evlijà tim, Unë i shpallos luftë.",
    source: "Buhari 6502",
    explanation: "Ky hadith kudsi i famshëm mëson mbrojtjen absolute të Allahut ndaj evliasë (robëve të dashurit të Tij). 'Evlijà' janë besimtarët e sinqertë dhe të devotshëm. Profeti ﷺ vazhdoi: 'Robi Im nuk afrohet tek Unë me asgjë më të dashur se obligimet (farzet). Robi Im vazhdon të afrohet tek Unë me nafile deri sa Unë ta dua atë. Kur ta dua, Unë bëhem dëgjimi i tij me të cilin dëgjon, shikimi i tij me të cilin sheh, dora e tij me të cilën kap, këmba e tij me të cilën ecën.' Kjo është stacioni i lartë i devotshmërisë — kur veprimet e njeriut dalin prej udhëzimit hyjnor."
  },
  {
    num: 21,
    arabic: "مَا تَرَدَّدْتُ عَنْ شَيْءٍ أَنَا فَاعِلُهُ تَرَدُّدِي عَنْ قَبْضِ نَفْسِ عَبْدِيَ الْمُؤْمِنِ، يَكْرَهُ الْمَوْتَ وَأَنَا أَكْرَهُ مَسَاءَتَهُ",
    text: "Nuk ngurroj në asgjë si ngurrimin Tim kur marr shpirtin e robit Tim besimtar — ai urren vdekjen dhe Unë urrej t'i shkaktoj dhembje.",
    source: "Buhari 6502",
    explanation: "Ky hadith kudsi tregon dashurinë mahnitëse të Allahut ndaj besimtarëve. Allahu 'ngurron' — në mënyrën që i takon madhërisë E Tij — kur vjen koha për të marrë shpirtin e besimtarit, sepse e di se besimtari nuk dëshiron të vdesë dhe Allahu nuk dëshiron t'i shkaktojë dhembje. Por vdekja është pjesë e planit të Allahut — pas dhembjes së vdekjes vjen jeta e amshueshme dhe shpërblimi i madh. Ky hadith na ngushëllon: vdekja nuk është braktisje nga Allahu — është ftesë në shtëpinë e Ahiretit."
  },
  {
    num: 22,
    arabic: "يَا ابْنَ آدَمَ أَنْفِقْ أُنْفِقْ عَلَيْكَ",
    text: "O bir i Ademit! Shpenzo (në rrugë të mirë), Unë do të shpenzoj (do të furnizoj) për ty.",
    source: "Buhari 4684 & Muslim 993",
    explanation: "Ky hadith kudsi mëson ekonominë hyjnore: çdo gjë e shpenzuar në rrugë të mirë (sadaka, bamirësi, familje) zëvendësohet dhe shumëfishohet nga Allahu. Allahu e 'garanton' furnizimin e atij që jep. Kjo kundërshton logjikën materiale njerëzore ('nëse jap, pakësohem') dhe zëvendëson me logjikën shpirtërore ('nëse jap, shtohem'). Profeti ﷺ tha se sadakaja nuk e pakëson pasurinë — përkundrazi, e shton. Dorështrënguarsia (bukhlu) pakëson pasurinë dhe begatinë. Gjeneroz + i bindur ndaj Allahut = rruga drejt furnizimit të pandërprerë."
  },
  {
    num: 23,
    arabic: "الصَّلَاةُ نُورٌ وَالصَّدَقَةُ بُرْهَانٌ وَالصَّبْرُ ضِيَاءٌ",
    text: "Namazi është dritë, sadakaja është dëshmi, durimi është shkëlqim.",
    source: "Muslim 223 — Hadith Kudsi",
    explanation: "Allahu e përshkroi çdo ibadet me natyrën e tij shpirtërore: Namazi (as-Salat) është 'nur' (dritë) — ai ndriçon zemrën, largon errësirën e mëkateve dhe jep drejtim në jetë. Sadakaja është 'burhan' (dëshmi) — ajo dëshmon sinqeritetin e besimit, sepse njeriu që i kalon paratë e tij në rrugë të Allahut provon me vepra se beson. Sabri (durimi) është 'dhija' (shkëlqim) — drita e tij është edhe më e ndritshme se 'nur'. Dijetarët shpjegojnë: nuri mund të vijë nga burim i jashtëm, por dhijau është dritë e brendshme — durimi ndriçon shpirtin nga brenda."
  },
  {
    num: 24,
    arabic: "إِنَّ اللَّهَ يَغَارُ وَغَيْرَةُ اللَّهِ أَنْ يَأْتِيَ الْمُؤْمِنُ مَا حَرَّمَ اللَّهُ",
    text: "Allahu ka ghajra (xhelozi hyjnore) dhe xhelozia e Allahut është kur besimtari kryen atë që Allahu ka ndaluar.",
    source: "Buhari 5223 & Muslim 2761",
    explanation: "'Ghajra' (xhelozia hyjnore) e Allahut nuk ngjason me xhelozinë njerëzore — ajo është, sipas dijetarëve, ndëshkimi i Allahut ndaj atyre që shkelin kufijtë E Tij. Allahu ka caktuar halulet (të lejuarat) dhe haramet (të ndaluarat) — kur njeriu shkel haramet, Allahu 'xhiloset' (shfaq indinjatën E Tij). Kjo mëson se haramet nuk janë kufizime arbitrare — ato janë kufij të shenjtë të vendosura nga Allahu i Gjithëdijshëm. Shkelja e tyre nuk është vetëm mëkat — është sfidim i autoritetit hyjnor."
  },
  {
    num: 25,
    arabic: "يَا عِبَادِي إِنَّمَا هِيَ أَعْمَالُكُمْ أُحْصِيهَا لَكُمْ ثُمَّ أُوَفِّيكُمْ إِيَّاهَا",
    text: "O robërit e Mi! Këto janë veprat tuaja — Unë i numëroj për ju, pastaj ju jap plotësisht shpërblimin e tyre.",
    source: "Muslim 2577",
    explanation: "Ky hadith kudsi (pjesë e hadithit të gjatë të Ebu Dherrit) mëson llogaridhënien absolute. Allahu numëron çdo vepër — të vogël dhe të madhe, të mirë dhe të keqe. 'Ucsiha' (i numëroj) nënkupton se asnjë vepër nuk humbet, asnjë sakrificë nuk shpërdorohet, asnjë mëkat nuk harrohet pa istigfar. 'Uweffikum' (ju jap plotësisht) nënkupton se shpërblimi është i drejtë dhe i plotë — pa zbritje, pa padrejtësi. Kjo mëson muslimanin të kujdeset për cilësinë e veprave — sepse çdo gjë regjistrohet. Por gjithashtu mëson të ketë shpresë — çdo vepër e mirë, sado e vogël, do të ketë shpërblimin e saj."
  },
  {
    num: 26,
    arabic: "أَنَا أَغْنَى الشُّرَكَاءِ عَنِ الشِّرْكِ، مَنْ عَمِلَ عَمَلًا أَشْرَكَ فِيهِ مَعِي غَيْرِي تَرَكْتُهُ وَشِرْكَهُ",
    text: "Unë jam më i panevojshmi ndër 'ortakët' nga shirku. Kush bën një vepër dhe më shoqëron Mua me dikë tjetër, e lë atë me shirkun e tij.",
    source: "Muslim 2985",
    explanation: "Ky hadith kudsi mëson rikjanë — sinqeritetin absolut të ibadetit. Allahu nuk pranon asnjë vepër ku ka rija (dëshirë për t'u parë nga njerëzit). Nëse dikush falet për të paraqitur imazh të mirë para njerëzve — namazi nuk pranohet. Nëse dikush jep sadaka për t'u lavdëruar — sadakaja nuk pranohet. Allahu thotë: 'E lë atë me shirkun e tij' — kjo do të thotë se vepra i takon 'ortakut' (njerëzve para të cilëve u bë shfaqja), jo Allahut. Prandaj rikontrolla e nijetit (qëllimit) para çdo vepre është detyrë shpirtërore."
  },
  {
    num: 27,
    arabic: "مَنْ عَادَى لِي وَلِيًّا فَقَدْ آذَنْتُهُ بِالْحَرْبِ، وَمَا تَقَرَّبَ إِلَيَّ عَبْدِي بِشَيْءٍ أَحَبَّ إِلَيَّ مِمَّا افْتَرَضْتُهُ عَلَيْهِ",
    text: "Kush armiqëson evlijàn Tim, i shpall luftë. Robi Im nuk afrohet tek Unë me asgjë më të dashur se obligimet.",
    source: "Buhari 6502 — Hadith i plotë",
    explanation: "Ky hadith kudsi i gjatë (nderit të Buharit) ka tre mesazhe kryesore: 1) Mbrojtja e evliasë — Allahu shpall 'luftë' ndaj atyre që lëndojnë njerëzit e devotshëm. 2) Prioriteti i farzeve — farzet (obligimet) janë më të dashura tek Allahu se nafiljet. Shumë njerëz bëjnë nafile (namaz shtesë, agjërim shtesë) por neglizhojnë farzet — kjo është e gabuar. 3) Stacioni i dashurisë hyjnore — kur njeriu vazhdon me nafile pas farzeve, Allahu e 'do' atë dhe bëhet 'sytë, veshët dhe duart' e tij. Kjo është kulmi shpirtëror — kur njeriu vepron tërësisht sipas udhëzimit hyjnor."
  },
  {
    num: 28,
    arabic: "يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الْآخِرُ",
    text: "Zoti ynë zbret çdo natë në qiellin e dynjasë në treçerëkun e fundit të natës dhe thotë: 'Kush lutet? Kush kërkon? Kush kërkon falje?'",
    source: "Buhari 1145 & Muslim 758",
    explanation: "Ky hadith kudsi tregon mundësinë e artë të tahaxhxhudit — namazit të natës. Treçerëku i fundit i natës (rreth 3-4 e mëngjesit) është koha kur Allahu 'zbret' (në mënyrën që i takon madhërisë E Tij, pa krahasim me krijesat). Allahu vetë pyet: 'A ka dikush që lutet?' — dhe premton t'i përgjigjet. 'A ka dikush që kërkon?' — dhe premton t'i japë. 'A ka dikush që kërkon falje?' — dhe premton ta falë. Kjo mundësi ofrohet çdo natë deri në agim. Sahabët e shfrytëzonin këtë kohë duke fjetur pak dhe duke u ngritur për tahaxhxhud. Ibn Omer nuk e humbte asnjëherë."
  },
  {
    num: 29,
    arabic: "لِلصَّائِمِ فَرْحَتَانِ: فَرْحَةٌ حِينَ يُفْطِرُ وَفَرْحَةٌ حِينَ يَلْقَى رَبَّهُ",
    text: "Agjëruesi ka dy gëzime: gëzimi kur çel iftarin dhe gëzimi kur takohet me Zotin e tij.",
    source: "Buhari 1904 & Muslim 1151",
    explanation: "Ky hadith kudsi (pjesë e hadithit të agjërimit) premton dy gëzime të ndryshme: 1) Gëzimi i iftarit në dynja — ndjesia e plotësimit të ibadetit dhe lehtësimit pas durimit. Profeti ﷺ i quajti çastet e iftarit si 'gëzim'. Dua e iftarit është e veçantë: 'Dhehebe ddhama'u wabtelletil uruuku' — Ka larguar etja dhe u njomën venat. 2) Gëzimi i takimit me Allahun — kur agjëruesi takon Allahun Ditën e Kiametit dhe i shfaqet shpërblimi i pakufizuar i agjërimeve. Ky gëzim i dytë tejkalon çdo imagjinatë — është gëzimi i amshueshëm. Dy gëzime, dy jetë — dynja dhe Ahiret — të dyja të lidhura me ibadet."
  },
  {
    num: 30,
    arabic: "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى أَجْسَادِكُمْ وَلَا إِلَى صُوَرِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ",
    text: "Allahu nuk shikon trupat tuaj dhe as fytyrat tuaja, por shikon zemrat tuaja.",
    source: "Muslim 2564",
    explanation: "Ky hadith (i transmetuar si fjalë profetike me reference hyjnore) rrënon çdo lloj diskriminimi sipas pamjes fizike, ngjyrës, gjatësisë, bukurisë apo pasurisë. Allahu shikon zemrën — 'qalb' — qendrën e motivimit, sinqeritetit dhe devotshmërisë. Prandaj njeriu 'i shëmtuar' sipas standardeve njerëzore, por me zemër të pastër, mund të jetë shumë më i vlefshëm tek Allahu sesa njeriu 'i bukur' por me zemër të mbushur me kibër dhe rija. Hadithi vazhdon: 'dhe shikon veprat tuaja'. Kështu dy kritere: zemra + veprat — jo pamja e jashtme."
  },
  {
    num: 31,
    arabic: "أَعْدَدْتُ لِعِبَادِيَ الصَّالِحِينَ مَا لَا عَيْنٌ رَأَتْ وَلَا أُذُنٌ سَمِعَتْ وَلَا خَطَرَ عَلَى قَلْبِ بَشَرٍ",
    text: "Kam përgatitur për robërit e Mi të mirë çfarë syri nuk ka parë, veshi nuk ka dëgjuar dhe zemra e njeriut nuk ka imagjinuar.",
    source: "Buhari 3244 & Muslim 2824",
    explanation: "Ky hadith kudsi është nga premtimet më mahnitëse të Allahut për Xhennetin. Edhe nëse do të merrnim çdo gjë të bukur nga e gjithë historia njerëzore — çdo palac, çdo peizazh, çdo kënaqësi — Xhenneti i tejkalon pafundësisht. Profeti ﷺ tha se syri as nuk ka parë, veshi as nuk ka dëgjuar dhe imagjinata njerëzore as nuk mund ta konceptojë. Prandaj besimtarët e vërtetë nuk ankohen për mungesën e kënaqësive të dynjasë — ata kanë perspektivën e Xhennetit. Çdo sakrificë e bërë tani do të kompensohet milionfish atje."
  },
  {
    num: 32,
    arabic: "يَقُولُ اللَّهُ تَعَالَى: أَنَا مَعَ عَبْدِي مَا ذَكَرَنِي وَتَحَرَّكَتْ بِي شَفَتَاهُ",
    text: "Allahu thotë: Unë jam me robin Tim sa kohë që Më përmend dhe buzët e tij lëvizin me Emrin Tim.",
    source: "Ibn Maxheh — Sahih",
    explanation: "Pranimi i Allahut gjatë dhikrit është nga dhuntitë të mëdha. Kjo 'bashkësi' është cilësore — nënkupton mbrojtjen, mëshirën dhe vëmendjen e Allahut ndaj robin kur ai E përmend. Prandaj muslimanëve u rekomandohet dhikri i vazhdueshëm — në çdo moment të lirë: duke pritur, duke ecur, duke punuar. Tesbihat (SubhanAllah, Alhamdulillah, Allahu Akbar) janë shumë të lehta por shpërblimi i tyre është i madh. 'Kalimat të lehta në gjuhë, të rënda në peshore, të dashura tek Ar-Rahman.'"
  },
  {
    num: 33,
    arabic: "أَنَا جَلِيسُ مَنْ ذَكَرَنِي",
    text: "Unë jam 'bashkëudhëtar' i atij që Më përmend.",
    source: "Transmeton Hakim — Sahih",
    explanation: "Allahu vetë deklaron se është 'jalisu' (shoqëruesi, ai që ulet me) çdo person që E përmend. Kjo është shprehje e lartë e afërsisë hyjnore. Sahabët e kuptonin kuptimin e thellë të kësaj: kur ulesh vetëm dhe thua 'SubhanAllah', nuk je vetëm — Allahu është 'me ty' në atë moment. Prandaj dhikri nuk duhet të bëhet shpejt dhe sipërfaqësisht — ai duhet të bëhet me ndërgjegjje të plotë se kush 'dëgjon'. Imagjino: nëse mbreti i vendit do t'i jepte vëmendje fjalëve tuaja — si do të flisnit?"
  },
  {
    num: 34,
    arabic: "مَنْ شَغَلَهُ الْقُرْآنُ عَنْ ذِكْرِي وَمَسْأَلَتِي أَعْطَيْتُهُ أَفْضَلَ مَا أُعْطِي السَّائِلِينَ",
    text: "Kush e ka Kur'anin shumë të zënë dhe nuk ka kohë të lutet, Unë i jap më shumë se atij që lutet.",
    source: "Tirmidhi 2926 — Hasen",
    explanation: "Ky hadith kudsi tregon vlerën supreme të leximit të Kur'anit. Njeriu i cili është aq i zhytur në leximin dhe studimin e Kur'anit sa nuk ka kohë as për dua të zakonshme — Allahu i jep shpërblim më të madh se lutësi. Kjo nuk do të thotë se dua është e parëndësishme — por tregon se Kur'ani ka statusin suprem të ibadetit. Profeti ﷺ tha se Allahu 'nuk ka dhënë diçka më të mirë se Kur'ani' për ummetin. Lidhja me Kur'anin — leximi, kuptimi, zbatimi, hafëzimi — është rruga shpirtërore supreme."
  },
  {
    num: 35,
    arabic: "يَقُولُ اللَّهُ عَزَّ وَجَلَّ: الصَّوْمُ جُنَّةٌ يَسْتَجِنُّ بِهَا الْعَبْدُ مِنَ النَّارِ",
    text: "Allahu thotë: Agjërimi është mburojë me të cilën robi mbrohet nga zjarri.",
    source: "Ahmed — Sahih",
    explanation: "Agjërimi është 'xhunne' (mburojë, shëmbëlltyrë e kaskës së luftëtarit). Ai mbron nga zjarri i Xhehennemit dhe nga mëkatet. Kur njeriu agjëron, ai stërvit vullnetin e tij të rezistojë ndaj dëshirave — dhe kjo rezistencë bëhet zakon shpirtëror. Njeriu që mund t'i rezistojë ushqimit dhe ujit gjatë tërë ditës mund t'i rezistojë shumë më lehtë tundimeve të tjera. Prandaj agjërimi nuk është vetëm abstenim nga ushqimi — ai është trajnim i plotë shpirtëror. Ramazani është muaji i 'riset' i plotë shpirtëror."
  },
  {
    num: 36,
    arabic: "إِذَا أَحَبَّ اللَّهُ عَبْدًا نَادَى جِبْرِيلَ: إِنِّي أُحِبُّ فُلَانًا فَأَحِبَّهُ",
    text: "Kur Allahu e do robin, thërret Xhibrilin: 'Unë e dua filanin — ta dojë edhe ti.' Pastaj Xhibrili e do atë dhe thërret banorët e qiellit.",
    source: "Buhari 3209 & Muslim 2637",
    explanation: "Ky hadith kudsi tregon mekanizmin e dashurisë hyjnore. Kur Allahu e do një rob, Xhibrili e do, pastaj të gjithë banorët e qiellit e duan. Pastaj 'vendoset pranimi në tokë' — njerëzit e duan atë person. Ky 'pranim i tokës' është fenomeni i dijetarëve, imamëve dhe njerëzve të mirë që gjithë i duan — edhe pa i njohur personalisht. Shembull: Imam Buhariu — miliona njerëz e duan edhe pas 1200 vjetësh. E kundërta: kur Allahu urren robin, procesin ndodh anasjelltas dhe njeriu 'vendoset mospajtimi në tokë'. Prandaj: kërko dashurinë e Allahut — pasoja e saj është dashuria e njerëzve."
  },
  {
    num: 37,
    arabic: "مَنْ لَمْ يَشْكُرِ النَّاسَ لَمْ يَشْكُرِ اللَّهَ",
    text: "Kush nuk i falënderon njerëzit, nuk e falënderon Allahun.",
    source: "Tirmidhi 1954 — Sahih",
    explanation: "Ky hadith mëson se mirënjohja ndaj Allahut manifestohet edhe në mirënjohjen ndaj njerëzve. Allahu është burim i çdo mirësie — por Ai shpesh e kalon mirësinë E Tij nëpërmjet njerëzve të tjerë. Kush nuk e njeh dhe nuk shpreh mirënjohje ndaj njerëzve që u bënë 'mjet' i mirësisë hyjnore — ai nuk ka mirënjohje të vërtetë ndaj Allahut. Fjala 'Shukran' (faleminderit) dhe 'JazakAllah khayran' (Allahu të shpërblejë me të mirë) janë shprehje konkrete të kësaj mirënjohjeje. Islam nuk ndan 'falenderimin ndaj Allahut' nga 'falenderimi ndaj njerëzve' — të dyja janë të ndërlidhura."
  },
  {
    num: 38,
    arabic: "يَا ابْنَ آدَمَ، إِنَّكَ تَدْعُونِي وَتَرْجُونِي وَأَنَا غَافِرٌ لَكَ مَا كَانَ مِنْكَ",
    text: "O bir i Ademit! Ti më lut dhe shpreson tek Unë — dhe Unë jam falës i çdo gjëje nga ti.",
    source: "Hadith Kudsi — Transmeton Taberani",
    explanation: "Ky hadith kudsi ripërtërin mesazhin e mëshirës hyjnore të pakufizuar. Dy kushte janë mjaftueshëm për falje: 1) Dua — lutja e vazhdueshme, 2) Rexa — shpresa e gjallë tek Allahu. Nëse këto dy ekzistojnë, Allahu është 'Ghafir' (Falës i vazhdueshëm). Verbi 'ghafir' është formë aktive e vazhdueshme — jo vetëm 'fali njëherë' por 'falës i përpikët'. Kjo mëson se procesi i faljes nuk ka fund — çdo ditë mëkate + çdo ditë istigfar dhe dua = çdo ditë falje. Allahu nuk lodhet duke falur."
  },
  {
    num: 39,
    arabic: "مَنْ تَقَرَّبَ مِنِّي شِبْرًا تَقَرَّبْتُ مِنْهُ ذِرَاعًا إِذَا أَتَانِي يَمْشِي أَتَيْتُهُ هَرْوَلَةً",
    text: "Kush afrohet tek Unë një pëllëmbë, Unë afrohem tek ai një krah; kush vjen tek Unë duke ecur, Unë shkoj tek ai duke vrapuar.",
    source: "Buhari 7536",
    explanation: "Varianti i dytë i hadithit të afrimeve hyjnore (hadith 3). Ky hadith ka tri shkallë: 1) Şibr (pëllëmbë) → Dhira (krah) — shpërblimi me dorë: njeriu jep pak, Allahu kthen shumë. 2) Dhira → Baa (hapja e dy krahëve) — edhe më shumë. 3) Ecja → Vrapimi — shpejtësia e përgjigjes hyjnore tejkalon shpejtësinë e njeriut. Prandaj dijetarët thonë: mos ngurroni të bëni hap të parë drejt Allahut — sado i vogël, sado i pasigurt. Allahu rreket drejt teje me shumë herë forcë dhe shpejtësi. E vetmja gjë që kërkohet nga njeriu është 'hapi i parë'."
  },
  {
    num: 40,
    arabic: "يَقُولُ اللَّهُ تَعَالَى: يَا ابْنَ آدَمَ، تَفَرَّغْ لِعِبَادَتِي أَمْلَأْ صَدْرَكَ غِنًى وَأَسُدَّ فَقْرَكَ",
    text: "Allahu thotë: O bir i Ademit! Dedikoji kohën tënde adhurimit Tim — do të mbush gjoksin tënd me pasuri dhe do të mbyll varfërinë tënde.",
    source: "Tirmidhi 2466 — Hasen Sahih",
    explanation: "Ky hadith kudsi ofron 'kontratë hyjnore': njeriu i jep kohën Allahut → Allahu i jep pasurinë e brendshme dhe mbyll varfërinë. 'Ghina' (pasuria) e premtuar nuk është vetëm materiale — kryesisht është pasuria shpirtërore: kënaqësia, paqja e brendshme, qetësia. Njeriu që kalon kohën vetëm duke ndjekur dynjën, zemrën nuk e mbush asnjëherë — gjithmonë kërkon më shumë. Ndërkohë njeriu që i dedikohet Allahut ndjen 'ghina' (mjaftueshmëri dhe kënaqësi) edhe me pak. Imam Ahmad bin Hanbel, me gjithë vështirësitë e tij, kishte paqe absolute — sepse zemra e tij ishte e lidhur me Allahun."
  },
  {
    num: 41,
    arabic: "يَا عِبَادِي، لَوْ أَنَّ أَوَّلَكُمْ وَآخِرَكُمْ وَإِنسَكُمْ وَجِنَّكُمْ قَامُوا فِي صَعِيدٍ وَاحِدٍ فَسَأَلُونِي فَأَعْطَيْتُ كُلَّ إِنسَانٍ مَسْأَلَتَهُ مَا نَقَصَ ذَلِكَ مِمَّا عِنْدِي إِلَّا كَمَا يَنْقُصُ الْمِخْيَطُ إِذَا أُدْخِلَ الْبَحْرَ",
    text: "O robërit e Mi! Edhe nëse të gjithë njerëzit dhe xhinët do të qëndronin në një fushë dhe të kërkonin prej Meje dhe Unë t'i jepja secilit çfarë kërkoi — kjo nuk do të pakësonte asgjë nga ç'kam, si pika e ujit kur zhytet gjilpëra në det.",
    source: "Muslim 2577 — Hadithi i fundit nga Ebu Dherri",
    explanation: "Ky është hadithi i 41-të dhe i fundit i koleksionit — dhe ndoshta hadithi kudsi me ndikimin emocional më të madh. Allahu përdor metaforën mahnitëse të gjilpërës dhe detit: nëse gjilpëra futet në det, cila pikë uji 'humb'? Kjo është proporcionimi midis pasurisë të pakufizuar të Allahut dhe kërkesave të të gjithë krijesave deri në fund të botës. Allahu mund t'i plotësojë kërkesat e çdo njeriu, çdo xhini, çdo engjëlli — njëkohësisht — dhe pasuria E Tij nuk do të pakësohej asnjë grimë. Prandaj: lutu pa frikë, lutu pa limit, lutu pa menduar 'ndoshta po kërkoj shumë'. Të luturit tek Allahu nuk 'lodh' Atë dhe nuk 'harxhon' pasurinë E Tij. Ky hadith është fundnota e mëshirës hyjnore absolute."
  }
];

export default function RiyaduSalihin() {
  const [activeTab, setActiveTab] = useState("riyadu");
  const [expanded, setExpanded] = useState(null);
  const [expandedKudsi, setExpandedKudsi] = useState(null);
  const [links, setLinks] = useState({
    sq: [downloadLinks.riyaduSalihin.sq],
    ar: [downloadLinks.riyaduSalihin.ar],
    en: [downloadLinks.riyaduSalihin.en]
  });
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");

  const colorMap = {
    emerald: { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-800", badge: "bg-emerald-100 text-emerald-700", header: "bg-emerald-600" },
    blue: { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-800", badge: "bg-blue-100 text-blue-700", header: "bg-blue-600" },
    amber: { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-800", badge: "bg-amber-100 text-amber-700", header: "bg-amber-600" },
    rose: { bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-800", badge: "bg-rose-100 text-rose-700", header: "bg-rose-600" },
    indigo: { bg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-800", badge: "bg-indigo-100 text-indigo-700", header: "bg-indigo-600" },
  };

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
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-5 text-center mb-4">
        <p className="text-2xl mb-2">🌹</p>
        <h2 className="text-xl font-bold text-rose-800 mb-1">Riyadu Es-Salihin & Hadithet Kudsije</h2>
        <p className="text-sm text-rose-700">Imam An-Newewiu · Hadithe Kudsije (fjalë hyjnore)</p>
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
                        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors">
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