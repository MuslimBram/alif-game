// Verse data: Arabic text + Albanian tafsir for key surahs
// For surahs not listed, we show a placeholder with audio

export const VERSE_DATA = {
  1: [
    { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tafsir: "Me emrin e Allahut, të Gjithëmëshirshmit, Mëshirëplotit. Çdo vepër e mirë fillon me këtë fjalë. Allahu ka dy emra të mëshirës: 'Rahman' (mëshira absolute) dhe 'Rahim' (mëshira e vazhdueshme për besimtarët)." },
    { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tafsir: "Falënderimi i takon vetëm Allahut, Zotit të botëve. Fjala 'Hamd' nënkupton falënderim të plotë me zemër, gjuhë dhe vepra. 'Rabb' do të thotë Krijues, Pronar dhe Edukues i gjithçkaje." },
    { ar: "الرَّحْمَٰنِ الرَّحِيمِ", tafsir: "Të Gjithëmëshirshmit, Mëshirëplotit. Allahu na kujton sërish mëshirën e Tij të dyfishtë — mëshirë universale për të gjitha krijesat dhe mëshirë e veçantë për besimtarët në botën tjetër." },
    { ar: "مَالِكِ يَوْمِ الدِّينِ", tafsir: "Sunduesit të Ditës së Gjykimit. Vetëm Allahu është pronar i asaj dite. Askush tjetër nuk do të ketë pushtet: as mbretër, as profetë. Çdo njeri do të japë llogari vetë." },
    { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tafsir: "Vetëm Ty të adhurojmë dhe vetëm prej Teje ndihmë kërkojmë. Ky ajet shpreh thelbin e Islamit — monoteizmin e plotë. Nuk ka adhurues tjetër dhe nuk ka ndihmëtar tjetër përveç Allahut." },
    { ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tafsir: "Udhëzona në rrugën e drejtë. Kjo është lutja kryesore e muslimanit — e repetojmë minimum 17 herë në ditë në namaz. 'Sirat al-mustekim' është rruga e Islamit, e drejtësisë dhe e devotshmërisë." },
    { ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", tafsir: "Rrugën e atyre që i begatove — jo të atyre mbi të cilët rëndon zemërimi (i Allahut), e as të të humburve. Rruga e të mirëve janë profetët, sidiket, dëshmorët dhe të devotshmit. Zemërimi është mbi ata që dinë të vërtetën por nuk veprojnë sipas saj." },
  ],
  112: [
    { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", tafsir: "Thuaj: Ai është Allahu, Një dhe i Vetëm. Ky ajet tregon monoteizmin absolut. 'Ahad' nënkupton njësi të plotë — pa shok, pa ortak, pa të ngjashëm. Kjo sure barazohet me 1/3 e Kur'anit në vlerë." },
    { ar: "اللَّهُ الصَّمَدُ", tafsir: "Allahu është As-Samad (i vetëmjaftueshmi, tek i cili drejtohen të gjithë). 'Samad' do të thotë se Allahu nuk ka nevojë për asgjë, por të gjitha krijesat kanë nevojë për Të. Vetëm Ai plotëson nevojat e të gjithëve." },
    { ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", tafsir: "Nuk ka lindur dhe nuk është i lindur. Allahu nuk ka fëmijë dhe nuk është fëmijë i askujt. Ky ajet hedh poshtë çdo pretendim që Zoti ka pasardhës apo prindër — refuzim i drejtpërdrejtë i krishterizmit dhe paganizmit." },
    { ar: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", tafsir: "Dhe askush nuk është i barabartë me Të. Allahu është i Vetëm, i Pashembëllt, i Pakrahasueshëm. Asnjë krijesë, asnjë zot tjetër, asnjë fuqi nuk mund t'i barazohet Atij." },
  ],
  113: [
    { ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", tafsir: "Thuaj: Kërkoj mbrojtje te Zoti i agimit. 'Falaq' do të thotë agimi — çarja e errësirës nga drita. Allahu është Zoti i dritës dhe çdo zbulimi. Kjo sure mësohet për mbrojtje dhe lexohet çdo mëngjes." },
    { ar: "مِن شَرِّ مَا خَلَقَ", tafsir: "Nga e keqja e çfarë ka krijuar. Kjo përfshin çdo lloj të keqeje — njerëz, xhinde, kafshë, sëmundje, fatkeqësi. Po kërkojmë mbrojtje të gjerë nga gjithçka që mund të dëmtojë." },
    { ar: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", tafsir: "Dhe nga e keqja e natës kur errësohet plotësisht. Nata është koha kur rreziqet fshihen — krimet, shpirtërat e këqij, sëmundjet. Profeti (s.a.s.) këshillonte leximin e kësaj sure para gjumit." },
    { ar: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", tafsir: "Dhe nga e keqja e atyre që fryjnë (bëjnë magji) mbi nyjat. Ky ajet flet për magjinë — praktikë e ndaluar rreptësisht në Islam. Leximi i kësaj sureje është mbrojtja kryesore kundër magjisë." },
    { ar: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", tafsir: "Dhe nga e keqja e ziliqarit kur bën zi. Syri i keq (hasad) është real sipas Islamit. Profeti (s.a.s.) tha: 'Syri i keq është i vërtetë.' Leximi i Al-Falaq dhe An-Nas mbron nga syri i keq." },
  ],
  114: [
    { ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", tafsir: "Thuaj: Kërkoj mbrojtje te Zoti i njerëzve. Allahu prezantohet me tre emra shumë të rëndësishëm: Zot, Mbret dhe Ilah (Zot i adhurimit). Kjo mbrojtje është e plotë dhe gjithëpërfshirëse." },
    { ar: "مَلِكِ النَّاسِ", tafsir: "Mbretit të njerëzve. Allahu është Mbreti i vërtetë i të gjithë njerëzimit — jo mbretërit tokësorë. Çdo pushtet tokësor është i përkohshëm; vetëm pushteti i Allahut është i amshuar." },
    { ar: "إِلَٰهِ النَّاسِ", tafsir: "Zotit të adhurimit të njerëzve. Allahu është i vetmi që meriton të adhurohet. Ky ajet thekson se adhurimi duhet t'i drejtohet vetëm Atij, jo njerëzve, idhujve apo asgjë tjetër." },
    { ar: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", tafsir: "Nga e keqja e shejtanit fshehës, që tërhiqet (kur përmendet Allahu). 'Al-Waswas' është ai që fut dyshime dhe mendime të këqija. 'Al-Khannas' do të thotë ai që tërhiqet kur e kujton Allahun." },
    { ar: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", tafsir: "I cili fut dyshime dhe mendime të këqija në gjoksin e njerëzve. Shejtani punon duke futur mendime negative, dyshime, frikë dhe joshje. Ilaçi: Dhikri (kujtimi i Allahut) dhe leximi i Kur'anit." },
    { ar: "مِنَ الْجِنَّةِ وَالنَّاسِ", tafsir: "Qoftë nga xhindet ose njerëzit. Ka dy lloje shejtanësh — nga xhindet dhe nga njerëzit. Njerëzit e këqij gjithashtu mund të jenë 'shejtanë' duke mashtruar, gënjyer dhe nxitur të keqen." },
  ],
  97: [
    { ar: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", tafsir: "Ne e zbritëm atë (Kur'anin) në Natën e Kadrit. Kur'ani u zbrit i tërë nga Levh al-Mahfudh në qiellin e parë në Natën e Kadrit, pastaj gradualisht te Profeti (s.a.s.) gjatë 23 viteve." },
    { ar: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", tafsir: "Dhe çka të bëri të kuptosh se çfarë është Nata e Kadrit? Pyetja retorike tregon madhërinë e jashtëzakonshme të kësaj nate. Allahu e pyet Profetin (s.a.s.) për të nënvizuar rëndësinë e saj." },
    { ar: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ", tafsir: "Nata e Kadrit është më e mirë se njëmijë muaj. Njëmijë muaj = 83 vjet e 4 muaj. Adhurimi i një nate barazohet me më shumë se jetë e tërë njeriu. Ajo ndodhet ndër 10 netët e fundit të Ramazanit." },
    { ar: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ", tafsir: "Në atë natë zbresin engjëjt dhe Shpirti (Xhibrili) me lejen e Zotit të tyre me çdo urdhër. Miliona engjëj zbresin në tokë atë natë — ajo është koha kur caktohen të gjitha ngjarjet për vitin e ardhshëm." },
    { ar: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", tafsir: "Ajo është paqe deri në lindjen e agimit. E gjithë nata e Kadrit është paqe, bereqet dhe mirësi. Engjëjt u japin selam besimtarëve që adhurojnë gjatë kësaj nate të mrekullueshme." },
  ],
  108: [
    { ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", tafsir: "Ne të dhamë Kautherit (lum në Xhennet). Allahu i premtoi Profetit (s.a.s.) Kautherit — lumin më të bukur në Xhennet. Zbriti kur armiqtë e Profetit e quanin 'Abter' (pa pasardhës) pas vdekjes së djemve të tij." },
    { ar: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", tafsir: "Prandaj falu dhe bëj kurban për Zotin tënd. Si falënderim për mirësitë, duhet të falim namaz dhe të bëjmë kurban. Ky ajet tregon se adhurimi i vërtetë është ai i kushtuar ekskluzivisht Allahut." },
    { ar: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", tafsir: "Vërtet urryesi yt është ai që është pa pasardhës. Armiqtë e Profetit (s.a.s.) u harruan nga historia, ndërsa Profeti (s.a.s.) ka miliarda pasues deri sot. Profecia u realizua plotësisht." },
  ],
  110: [
    { ar: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", tafsir: "Kur të vijë ndihma e Allahut dhe çlirimi (i Mekës). Kjo flet për Çlirimin e Mekës në vitin 8 H — momentin kulminant të misionit të Profetit (s.a.s.) kur u rrëzuan idhujt dhe Meka u bë qendra e Islamit." },
    { ar: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", tafsir: "Dhe i sheh njerëzit duke hyrë në fenë e Allahut grupe-grupe. Pas Çlirimit të Mekës, fise të tëra arabike pranuan Islamin. Kjo ishte shenja se misioni po përfundonte me sukses të plotë." },
    { ar: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", tafsir: "Atëherë lëvdo Zotin tënd dhe kërko falje prej Tij. Ai vërtet pranon pendimin. Allahu e udhëzon Profetin (s.a.s.) të bëjë tesbih dhe istigfar në fund të misionit. Mësimi: edhe kur kemi sukses, duhet të falënderojmë dhe të kërkojmë falje." },
  ],
};

export const HADITH_QURAN = [
  {
    text: "Kush lexon një shkronjë nga Kur'ani, do të marrë një sevap, dhe çdo sevap i shumëzohet me dhjetë.",
    source: "Transmeton Tirmidhiu — Abdullah ibn Mes'udi (r.a.)",
    arabic: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا",
  },
  {
    text: "Njerëzit më të mirë ndër ju janë ata që mësojnë Kur'anin dhe ua mësojnë të tjerëve.",
    source: "Transmeton Buhariu — Uthman ibn Affani (r.a.)",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
  },
  {
    text: "Kush e lexon Kur'anin, e ka mësuar atë dhe vepron sipas tij, do të veshë prindërit e tij me kurora në Ditën e Kiametit, dritë e të cilëve do të jetë si drita e diellit.",
    source: "Transmeton Ebu Davudi — Mu'adh el-Xhuheni (r.a.)",
    arabic: "مَنْ قَرَأَ الْقُرْآنَ وَتَعَلَّمَهُ وَعَمِلَ بِهِ أُلْبِسَ وَالِدَاهُ يَوْمَ الْقِيَامَةِ تَاجًا",
  },
  {
    text: "Ai që lexon Kur'anin rrjedhshëm do të jetë me engjëjt fisnikë dhe të drejtë. Dhe ai që e lexon me vështirësi, duke ngecur, do të marrë shpërblim të dyfishtë.",
    source: "Transmeton Muslimi — Aishja (r.a.)",
    arabic: "الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ وَالَّذِي يَقْرَأُ الْقُرْآنَ وَيَتَتَعْتَعُ فِيهِ وَهُوَ عَلَيْهِ شَاقٌّ لَهُ أَجْرَانِ",
  },
  {
    text: "Dijeni se zemrat ndryshken ashtu si ndryshket hekuri. Pyetën: 'Çfarë i pastron?' Tha: 'Kujtimi i vdekjes dhe leximi i Kur'anit.'",
    source: "Transmeton Bejhakiu — Profeti Muhammed (s.a.s.)",
    arabic: "إِنَّ هَذِهِ الْقُلُوبَ تَصْدَأُ كَمَا يَصْدَأُ الْحَدِيدُ... تِلاوَةُ الْقُرْآنِ",
  },
  {
    text: "Kur'ani do të vijë si ndërmjetës në Ditën e Gjykimit dhe do të thotë: 'O Zot, veshie me rroba (nderi).' Dhe do të vihet kurora e nderit. Pastaj do të thotë: 'O Zot, shtoji.' Dhe do t'i jepet rrobë e nderit.",
    source: "Transmeton Tirmidhiu — Ebu Hurejra (r.a.)",
    arabic: "يَجِيءُ الْقُرْآنُ يَوْمَ الْقِيَامَةِ شَفِيعًا لأَصْحَابِهِ",
  },
];

// Count consonant Arabic letters (non-vowel, non-diacritic)
export function countArabicConsonants(text) {
  // Arabic letter range: \u0600-\u06FF, remove diacritics (harakat)
  const cleaned = text.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, "");
  const letters = cleaned.match(/[\u0600-\u06FF]/g) || [];
  return letters.length;
}