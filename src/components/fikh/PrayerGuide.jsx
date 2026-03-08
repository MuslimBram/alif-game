import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Volume2, Check, X, Home, Users, BookOpen, Upload, ChevronDown } from "lucide-react";

const LANG = {
  sq: "🇦🇱 Shqip",
  en: "🇬🇧 English",
  ar: "🇸🇦 عربي",
};

const PRAYER_STEPS = [
  {
    id: 1,
    title: { sq: "Nijeti (Qëllimi)", en: "Intention (Niyyah)", ar: "النية" },
    description: {
      sq: "Bëj nijetin me zemër për namazin specifik që do të falësh. Nijeti shprehet vetëm në zemër, jo me gojë — kjo është sunnet.",
      en: "Make the intention in your heart for the specific prayer. The intention is only in the heart, not spoken aloud — this is the Sunnah.",
      ar: "انوِ في قلبك الصلاة المحددة. النية في القلب فقط وليس باللسان — هذه هي السنة."
    },
    figure: "🧍",
    figureLabel: { sq: "Qëndro drejt, zemra të jetë e pranishme", en: "Stand upright, heart present", ar: "قف مستقيماً، بحضور القلب" },
    arabic: "",
    translit: "",
    grade: { sq: "Kusht (Shart)", en: "Condition (Shart)", ar: "شرط" },
    gradeColor: "bg-red-100 text-red-700",
    correct: ["🧍 Qëndrim drejt", "❤️ Nijet me zemër"],
    wrong: ["🗣️ Shqiptim me gojë 'Naveitu...'"],
    quiz: {
      q: { sq: "Si bëhet Nijeti?", en: "How is Niyyah made?", ar: "كيف تكون النية؟" },
      options: {
        sq: ["Vetëm në zemër", "Me gojë duke thënë 'Naveitu'", "Me dorë duke bërë shenjë"],
        en: ["Only in the heart", "By saying 'Naveitu' aloud", "By gesturing with the hand"],
        ar: ["في القلب فقط", "بقول نويت بصوت", "بالإشارة باليد"]
      },
      correct: 0
    }
  },
  {
    id: 2,
    title: { sq: "Tekbiri Fillestar", en: "Opening Takbeer", ar: "تكبيرة الإحرام" },
    description: {
      sq: "Ngri duart deri te supet ose veshët, me gishta të hapura drejtuar Kiblës, dhe thuaj 'Allahu Ekber'. Kjo është shtyllë (rukn) e namazit.",
      en: "Raise your hands to the level of shoulders or ears, fingers spread facing Qiblah, and say 'Allahu Akbar'. This is a pillar (rukn) of prayer.",
      ar: "ارفع يديك إلى مستوى الكتفين أو الأذنين، مع تفريق الأصابع باتجاه القبلة، وقل 'الله أكبر'. هذا ركن من أركان الصلاة."
    },
    figure: "🙌",
    figureLabel: { sq: "Duart ngrihen deri te supet", en: "Hands raised to shoulders", ar: "رفع اليدين إلى الكتفين" },
    arabic: "اللَّهُ أَكْبَرُ",
    translit: "Allāhu Akbar",
    sq_meaning: "Allahu është më i Madhi",
    grade: { sq: "Shtyllë (Rukn)", en: "Pillar (Rukn)", ar: "ركن" },
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["🙌 Duart deri supet ose veshët", "📐 Gishtat drejt Kiblës", "🗣️ Tekbiri me zë (për imam)"],
    wrong: ["❌ Duart shumë lart ose shumë poshtë", "❌ Gishtat e mbyllura"],
    quiz: {
      q: { sq: "Deri ku ngrihen duart në Tekbir?", en: "How high are hands raised in Takbeer?", ar: "إلى أين ترفع اليدان في التكبير؟" },
      options: {
        sq: ["Deri te supe ose veshë", "Deri te beli", "Mbi kokë"],
        en: ["To shoulders or ears", "To the waist", "Above the head"],
        ar: ["إلى الكتفين أو الأذنين", "إلى الخصر", "فوق الرأس"]
      },
      correct: 0
    }
  },
  {
    id: 3,
    title: { sq: "Vendosja e Duarve — Kijam", en: "Placing Hands — Qiyam", ar: "وضع اليدين في القيام" },
    description: {
      sq: "Vendos dorën e djathtë mbi dorën e majtë, mbi gjoks. Vështro vendin e sexhdes. Mos u kthe djathtas e majtas.",
      en: "Place the right hand over the left hand on the chest. Look at the place of prostration. Do not turn right or left.",
      ar: "ضع يدك اليمنى على يدك اليسرى على الصدر. انظر إلى موضع السجود. لا تلتفت يمينًا أو يسارًا."
    },
    figure: "🧍‍♂️",
    figureLabel: { sq: "E djathta mbi të majtën, mbi gjoks", en: "Right over left, on chest", ar: "اليمنى على اليسرى على الصدر" },
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ",
    translit: "Subhānaka Allāhumma wa biḥamdika...",
    sq_meaning: "I pastër je Ti, o Allah, lavdia Jote...",
    grade: { sq: "Sunet", en: "Sunnah", ar: "سنة" },
    gradeColor: "bg-blue-100 text-blue-700",
    correct: ["✅ E djathta mbi të majtën", "✅ Duart mbi gjoks", "✅ Shikimi te vendi i sexhdes"],
    wrong: ["❌ Duart të varura", "❌ E majta mbi të djathtën", "❌ Shikimi lart ose anash"],
    quiz: {
      q: { sq: "Ku vendosen duart gjatë Kijamit (qëndrimit)?", en: "Where are hands placed during Qiyam (standing)?", ar: "أين توضع اليدان في القيام؟" },
      options: {
        sq: ["Mbi gjoks", "Mbi bel", "Të varura anash"],
        en: ["On the chest", "On the waist", "Hanging on the sides"],
        ar: ["على الصدر", "على الخصر", "مدلاة على الجانبين"]
      },
      correct: 0
    }
  },
  {
    id: 4,
    title: { sq: "Leximi i Fatihasë", en: "Reciting Al-Fatiha", ar: "قراءة الفاتحة" },
    description: {
      sq: "Lexo El-Fatihanë plotësisht në çdo rekat — kjo është shtyllë e namazit pa të cilën namazi nuk vlen. Joarabët e kanë farz të mësojnë Fatihën.",
      en: "Recite Al-Fatiha completely in every rak'ah — this is a pillar of prayer without which it is invalid. Non-Arabs must learn it.",
      ar: "اقرأ الفاتحة كاملة في كل ركعة — هذا ركن من أركان الصلاة بدونه تبطل الصلاة. يجب على غير العرب تعلمها."
    },
    figure: "📖",
    figureLabel: { sq: "Lexo me qartësi, gërmë për gërmë", en: "Recite clearly, letter by letter", ar: "اقرأ بوضوح حرفًا حرفًا" },
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translit: "Bismi-llāhi r-raḥmāni r-raḥīm. Al-ḥamdu lillāhi rabbi l-ʿālamīn...",
    sq_meaning: "Me emrin e Allahut... Lavdërimi i takon Allahut...",
    grade: { sq: "Shtyllë (Rukn)", en: "Pillar (Rukn)", ar: "ركن" },
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Lexo plotësisht Fatihën", "✅ Me Bismillah", "✅ Me texhuid të saktë"],
    wrong: ["❌ Lënia e ndonjë ajeti", "❌ Gabimet e theksi (ndryshon kuptimin)"],
    quiz: {
      q: { sq: "A është Fatiha e obligueshme në çdo rekat?", en: "Is Fatiha obligatory in every rak'ah?", ar: "هل الفاتحة واجبة في كل ركعة؟" },
      options: {
        sq: ["Po, është shtyllë e namazit", "Jo, mjafton vetëm në rekatin e parë", "Vetëm në namazin e mëngjesit"],
        en: ["Yes, it is a pillar of prayer", "No, only in the first rak'ah", "Only in morning prayer"],
        ar: ["نعم، هي ركن في الصلاة", "لا، تكفي في الركعة الأولى فقط", "فقط في صلاة الفجر"]
      },
      correct: 0
    }
  },
  {
    id: 5,
    title: { sq: "Rukuja (Përkulja)", en: "Ruku' (Bowing)", ar: "الركوع" },
    description: {
      sq: "Perkulj trupin horizontalisht, shpina e drejtë si dërrasa, duart mbi gjunjë me gishta të hapur. Qëndro i qetë. Thuaj 'Subhane rabbijel adhim' 3 herë.",
      en: "Bow until the back is horizontal like a board, hands on knees with fingers spread. Be still. Say 'Subhana rabbiya l-adheem' 3 times.",
      ar: "انحنِ حتى يصبح ظهرك أفقيًا كاللوح، يداك على الركبتين مع تفريق الأصابع. اطمئن. قل 'سبحان ربي العظيم' 3 مرات."
    },
    figure: "🙇",
    figureLabel: { sq: "Shpina horizontale, duart te gjunjët", en: "Back horizontal, hands on knees", ar: "الظهر أفقي، اليدان على الركبتين" },
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    translit: "Subḥāna rabbiya l-ʿaẓīm",
    sq_meaning: "I pastër je Zoti im, i Madhi!",
    grade: { sq: "Shtyllë (Rukn)", en: "Pillar (Rukn)", ar: "ركن" },
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Shpina e drejtë horizontale", "✅ Duart mbi gjunjë fort", "✅ Qëndro i qetë (Tumeninat)", "✅ Koka e drejtë (nivel me shpinën)"],
    wrong: ["❌ Shpina e lakuar", "❌ Koka ngritur ose ulur", "❌ Bërrylat te ijet (takohen me trupin)"],
    quiz: {
      q: { sq: "Sa herë thuhet 'Subhane rabbijel adhim' në Ruku?", en: "How many times is 'Subhana rabbiya al-adheem' said in Ruku?", ar: "كم مرة يقال 'سبحان ربي العظيم' في الركوع؟" },
      options: {
        sq: ["Minimum 3 herë", "Vetëm 1 herë", "7 herë gjithmonë"],
        en: ["Minimum 3 times", "Only once", "Always 7 times"],
        ar: ["3 مرات على الأقل", "مرة واحدة فقط", "7 مرات دائمًا"]
      },
      correct: 0
    }
  },
  {
    id: 6,
    title: { sq: "Drejtimi pas Rukusë (I'tidal)", en: "Rising from Ruku' (I'tidal)", ar: "الاعتدال بعد الركوع" },
    description: {
      sq: "Ngrihuni duke thënë 'Semia Allahu limen hamideh'. Qëndro plotësisht drejt, i qetë, çdo gjymtyrë të zerë vendin.",
      en: "Rise saying 'Sami'a Allahu liman hamidah'. Stand completely upright, still, until every limb settles.",
      ar: "ارفع قائلاً 'سمع الله لمن حمده'. قف مستقيمًا تمامًا، حتى تستقر كل الأعضاء."
    },
    figure: "🧍",
    figureLabel: { sq: "Drejtim i plotë, pastaj 'Rabbena ue lekel hamd'", en: "Full upright, then 'Rabbana wa lakal hamd'", ar: "استواء كامل، ثم 'ربنا ولك الحمد'" },
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا وَلَكَ الْحَمْدُ",
    translit: "Samiʿa-llāhu liman ḥamidah. Rabbanā wa laka l-ḥamd",
    sq_meaning: "Allahu dëgjon atë që lavdëron Atë. Zoti ynë, Ty të takon lavdia!",
    grade: { sq: "Shtyllë + Vaxhib", en: "Pillar + Obligatory", ar: "ركن + واجب" },
    gradeColor: "bg-amber-100 text-amber-700",
    correct: ["✅ Ngrihu plotësisht drejt", "✅ Qëndro i qetë para sexhdes", "✅ Thuaj të dyja frazat"],
    wrong: ["❌ Shko direkt në sexhde pa u drejtuar", "❌ Lër mangët frazen 'Rabbena ue lekel hamd'"],
    quiz: {
      q: { sq: "Cila frazë thuhet kur ngrihesh nga Rukuja?", en: "Which phrase is said when rising from Ruku?", ar: "ما الذي يقال عند الرفع من الركوع؟" },
      options: {
        sq: ["Semia Allahu limen hamideh", "Allahu Ekber", "Subhanallah"],
        en: ["Sami'a Allahu liman hamidah", "Allahu Akbar", "Subhanallah"],
        ar: ["سمع الله لمن حمده", "الله أكبر", "سبحان الله"]
      },
      correct: 0
    }
  },
  {
    id: 7,
    title: { sq: "Sexhdeja", en: "Prostration (Sujood)", ar: "السجود" },
    description: {
      sq: "Bie me duart para gjunjëve. 7 gjymtyrë prekin tokën: balli+hunda, dy pëllëmbë, dy gjunj, dy majat e këmbëve. Bërrylat ngritur nga toka.",
      en: "Fall with hands before knees. 7 body parts touch the ground: forehead+nose, two palms, two knees, two toes. Elbows raised from the ground.",
      ar: "اسجد بوضع اليدين قبل الركبتين. 7 أعضاء تلمس الأرض: الجبهة+الأنف، الكفان، الركبتان، أطراف القدمين. المرفقان مرفوعان."
    },
    figure: "🤲",
    figureLabel: { sq: "7 gjymtyrë, bërrylat larg tokës", en: "7 limbs, elbows off ground", ar: "7 أعضاء، المرفقان بعيدان عن الأرض" },
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    translit: "Subḥāna rabbiya l-aʿlā",
    sq_meaning: "I pastër je Zoti im, i Larti!",
    grade: { sq: "Shtyllë (Rukn)", en: "Pillar (Rukn)", ar: "ركن" },
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Balli dhe hunda tokës", "✅ Dy pëllëmbë hapura", "✅ Dy gjunj tokës", "✅ Bërrylat ngritur", "✅ Gishtat drejt Kiblës"],
    wrong: ["❌ Hunda nuk prek tokën", "❌ Bërrylat mbështetur tokës (si qeni)", "❌ Ngjashëm me uljen e devesë (gjunjët para duarve)"],
    quiz: {
      q: { sq: "Sa gjymtyrë duhet të prekin tokën në Sexhde?", en: "How many body parts must touch the ground in Sujood?", ar: "كم عضو يجب أن يلمس الأرض في السجود؟" },
      options: {
        sq: ["7 gjymtyrë", "5 gjymtyrë", "3 gjymtyrë"],
        en: ["7 body parts", "5 body parts", "3 body parts"],
        ar: ["7 أعضاء", "5 أعضاء", "3 أعضاء"]
      },
      correct: 0
    }
  },
  {
    id: 8,
    title: { sq: "Ulja mes Sexhdeve", en: "Sitting Between Prostrations", ar: "الجلوس بين السجدتين" },
    description: {
      sq: "Ngrihu duke thënë 'Allahu Ekber'. Ulu me qëndresë: e majta e shtrirë, mbi të; e djathta e ngritur me gishta drejt Kiblës. Thuaj 'Rabbi igfirli' 3 herë.",
      en: "Rise saying 'Allahu Akbar'. Sit with composure: left foot extended sitting on it; right foot upright with toes toward Qiblah. Say 'Rabb-ighfir lee' 3 times.",
      ar: "ارفع قائلاً 'الله أكبر'. اجلس مطمئنًا: القدم اليسرى ممدودة تجلس عليها؛ القدم اليمنى منتصبة بأصابعها نحو القبلة. قل 'رب اغفر لي' 3 مرات."
    },
    figure: "🧎",
    figureLabel: { sq: "E majta shtrirë, e djathta ngritur", en: "Left extended, right upright", ar: "اليسرى ممدودة، اليمنى منتصبة" },
    arabic: "رَبِّ اغْفِرْ لِي",
    translit: "Rabb-ighfir lī",
    sq_meaning: "Zoti im, më fal!",
    grade: { sq: "Vaxhib", en: "Obligatory (Wajib)", ar: "واجب" },
    gradeColor: "bg-orange-100 text-orange-700",
    correct: ["✅ Ulje e qetë (Tumeninat)", "✅ E majta shtrirë", "✅ Gishtat e djathtë drejt Kiblës"],
    wrong: ["❌ Kalo direkt në sexhde pa u ulur", "❌ Ulje mbi dy thembrat (ndaluar nga shumica)"],
    quiz: {
      q: { sq: "Çfarë thuhet mes dy Sexhdeve?", en: "What is said between two prostrations?", ar: "ماذا يقال بين السجدتين؟" },
      options: {
        sq: ["Rabbi igfirli", "Subhanallah", "Allahu Ekber"],
        en: ["Rabb-ighfir lee", "Subhanallah", "Allahu Akbar"],
        ar: ["رب اغفر لي", "سبحان الله", "الله أكبر"]
      },
      correct: 0
    }
  },
  {
    id: 9,
    title: { sq: "Et-Teshehudi", en: "At-Tashahhud", ar: "التشهد" },
    description: {
      sq: "Pas 2 rekateve, ulu me dorën e djathtë mbi gjurin e djathtë, gishtin tregues ngritur e duke e lëvizur. Lexo Et-Tehijjat dhe Salavatët.",
      en: "After 2 rak'ahs, sit with right hand on right knee, index finger raised and moving. Recite At-Tahiyyat and Salawat.",
      ar: "بعد ركعتين، اجلس بيدك اليمنى على ركبتك اليمنى، رافعًا سبابتك ومحركًا إياها. اقرأ التحيات والصلوات."
    },
    figure: "🙏",
    figureLabel: { sq: "Gishti tregues ngritur, duke lëvizur", en: "Index finger raised and moving", ar: "السبابة مرفوعة ومتحركة" },
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ...",
    translit: "At-taḥiyyātu lillāhi wa-ṣ-ṣalawātu wa-ṭ-ṭayyibāt...",
    sq_meaning: "Përshëndetjet janë për Allahun, lutjet dhe veprat e mira...",
    grade: { sq: "Vaxhib", en: "Obligatory (Wajib)", ar: "واجب" },
    gradeColor: "bg-orange-100 text-orange-700",
    correct: ["✅ E djathta mbi gjurin e djathtë", "✅ Gishti tregues ngritur", "✅ Gishti lëvizës gjatë duasë", "✅ Shikimi te gishti tregues"],
    wrong: ["❌ Të dyja duart shtrirë pa gisht ngritur", "❌ Gishti i ngurtë pa lëvizur"],
    quiz: {
      q: { sq: "Si mbahet gishti gjatë Teshehudit?", en: "How is the finger held during Tashahhud?", ar: "كيف تمسك الإصبع أثناء التشهد؟" },
      options: {
        sq: ["Ngritur dhe duke lëvizur", "Shtrirë poshtë", "Ngritur e palëvizshëm"],
        en: ["Raised and moving", "Laid flat", "Raised and still"],
        ar: ["مرفوعة ومتحركة", "ممدودة للأسفل", "مرفوعة وثابتة"]
      },
      correct: 0
    }
  },
  {
    id: 10,
    title: { sq: "Selami i Fundit (Tesvim)", en: "Final Salam (Tasleem)", ar: "التسليم" },
    description: {
      sq: "Kthehu djathtas duke thënë 'Es-selamu alejkum ue rahmetullah', pastaj majtas po kështu. Kjo mbyll namazin — është shtyllë.",
      en: "Turn right saying 'As-salamu alaykum wa rahmatullah', then left the same. This closes the prayer — it is a pillar.",
      ar: "التفت يمينًا قائلاً 'السلام عليكم ورحمة الله'، ثم يسارًا بالمثل. هذا يختم الصلاة — وهو ركن."
    },
    figure: "↩️",
    figureLabel: { sq: "Djathtas pastaj majtas — duket e bardha e nofullës", en: "Right then left — white of cheek visible", ar: "يمينًا ثم يسارًا — تُرى بياض الخد" },
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    translit: "As-salāmu ʿalaykum wa raḥmatu-llāh",
    sq_meaning: "Paqja dhe mëshira e Allahut qofshin mbi ju!",
    grade: { sq: "Shtyllë (Rukn)", en: "Pillar (Rukn)", ar: "ركن" },
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Djathtas pastaj majtas", "✅ E bardha e nofullës duket", "✅ Thuhet plotësisht"],
    wrong: ["❌ Vetëm nga njëra anë", "❌ Shenimi i brendshëm pa kthyer fare"],
    quiz: {
      q: { sq: "Sa selame jepen në fund të namazit?", en: "How many salams are given at the end of prayer?", ar: "كم تسليمة تُعطى في نهاية الصلاة؟" },
      options: {
        sq: ["Dy — djathtas dhe majtas", "Vetëm një — djathtas", "Tre — djathtas, majtas dhe përpara"],
        en: ["Two — right and left", "Only one — to the right", "Three — right, left and front"],
        ar: ["اثنتان — يمينًا ويسارًا", "واحدة فقط — يمينًا", "ثلاث — يمينًا ويسارًا وأمامًا"]
      },
      correct: 0
    }
  }
];

const HOME_FORMATIONS = [
  { num: 1, title: { sq: "Babai me Djalin", en: "Father with Son", ar: "الأب مع ابنه" }, desc: { sq: "Djali qëndron pak pas babait, pak djathtas.", en: "Son stands slightly behind and to the right of father.", ar: "الابن يقف خلف الأب قليلاً وإلى يمينه." }, figure: "👨👦", arrangement: "imam-right" },
  { num: 2, title: { sq: "Babai me Djem", en: "Father with Sons", ar: "الأب مع الأبناء" }, desc: { sq: "Xhemati qëndron pas imamit në rresht të njëjtë.", en: "Congregation stands behind imam in one row.", ar: "الجماعة تقف خلف الإمام في صف واحد." }, figure: "👨👦👦", arrangement: "row-behind" },
  { num: 3, title: { sq: "Burri me Gruan", en: "Husband with Wife", ar: "الزوج مع زوجته" }, desc: { sq: "Gruaja qëndron pas burrit, jo krah për krah.", en: "Wife stands behind husband, not side by side.", ar: "الزوجة تقف خلف الزوج وليس بجانبه." }, figure: "👫", arrangement: "wife-behind" },
  { num: 4, title: { sq: "Babai me Djemtë dhe Nënën", en: "Father with Sons and Mother", ar: "الأب مع الأبناء والأم" }, desc: { sq: "Djemtë pas babait, nëna pas tyre (ose prapa e veçuar).", en: "Sons behind father, mother behind them (or separately).", ar: "الأبناء خلف الأب، الأم خلفهم أو منفردة." }, figure: "👨‍👩‍👧‍👦", arrangement: "multi-row" },
  { num: 5, title: { sq: "Babai me Fëmijët Mashkuj, Femrat dhe Nënën", en: "Father with boys, girls and mother", ar: "الأب مع الأبناء والبنات والأم" }, desc: { sq: "Rreshti: Imam → Djemtë → Vajzat → Nëna — secili grup pas tjetrit.", en: "Order: Imam → Boys → Girls → Mother — each group behind the other.", ar: "الترتيب: الإمام ← الأبناء ← البنات ← الأم" }, figure: "👨‍👩‍👧‍👦", arrangement: "full-family" },
  { num: 6, title: { sq: "Babai, Djali dhe Nëna", en: "Father, Son and Mother", ar: "الأب والابن والأم" }, desc: { sq: "Djali krahas imamit, nëna pas tyre.", en: "Son alongside imam, mother behind them.", ar: "الابن بجانب الإمام، الأم خلفهما." }, figure: "👨👦👩", arrangement: "son-right-mother-back" },
];

function PrayerStepCard({ step, lang, onQuiz }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selected, setSelected] = useState(null);
  const audioRef = useRef(null);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'ar' ? 'ar-SA' : lang === 'en' ? 'en-US' : 'sq-AL';
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  const handleAnswer = (idx) => {
    setSelected(idx);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center font-bold text-sm">{step.id}</span>
            <h3 className="font-bold text-base">{step.title[lang]}</h3>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${step.gradeColor}`}>
            {step.grade[lang]}
          </span>
        </div>
      </div>

      {/* Figure */}
      <div className="text-center py-4 bg-gray-50 border-b border-gray-100">
        <div className="text-5xl mb-2">{step.figure}</div>
        <p className="text-xs text-gray-500">{step.figureLabel[lang]}</p>
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{step.description[lang]}</p>

        {/* Arabic */}
        {step.arabic && (
          <div className="bg-emerald-50 rounded-xl p-3 mb-4">
            <p className="text-right text-lg font-bold text-emerald-900 leading-loose" style={{ fontFamily: "Amiri, serif", direction: "rtl" }}>
              {step.arabic}
            </p>
            <p className="text-xs text-teal-700 italic mt-1">{step.translit}</p>
            <p className="text-xs text-gray-600 mt-0.5">"{step.sq_meaning}"</p>
            <button
              onClick={() => speakText(step.arabic)}
              className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-800 font-semibold bg-emerald-100 hover:bg-emerald-200 px-2 py-1 rounded-lg transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" /> 🎧 Dëgo
            </button>
          </div>
        )}

        {/* Correct / Wrong */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="bg-green-50 rounded-xl p-3 border border-green-200">
            <p className="text-xs font-bold text-green-700 mb-2">✅ E Saktë</p>
            {step.correct.map((c, i) => <p key={i} className="text-xs text-green-800 leading-relaxed">{c}</p>)}
          </div>
          <div className="bg-red-50 rounded-xl p-3 border border-red-200">
            <p className="text-xs font-bold text-red-700 mb-2">❌ Gabim</p>
            {step.wrong.map((w, i) => <p key={i} className="text-xs text-red-800 leading-relaxed">{w}</p>)}
          </div>
        </div>

        {/* Quiz */}
        {!showQuiz ? (
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-xl text-sm font-semibold transition-colors"
          >
            🧠 Kuiz i Shpejtë
          </button>
        ) : (
          <div className="bg-violet-50 rounded-xl p-3 border border-violet-200">
            <p className="text-sm font-bold text-violet-900 mb-3">{step.quiz.q[lang]}</p>
            <div className="space-y-2">
              {step.quiz.options[lang].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected === null
                      ? "bg-white border border-gray-200 hover:border-violet-400"
                      : selected === i
                        ? i === step.quiz.correct ? "bg-green-100 border-2 border-green-500 text-green-800" : "bg-red-100 border-2 border-red-500 text-red-800"
                        : i === step.quiz.correct ? "bg-green-50 border border-green-300" : "bg-gray-50 border border-gray-200 opacity-60"
                  }`}
                >
                  {selected !== null && i === step.quiz.correct && <Check className="w-3.5 h-3.5 inline mr-1 text-green-600" />}
                  {selected === i && i !== step.quiz.correct && <X className="w-3.5 h-3.5 inline mr-1 text-red-600" />}
                  {opt}
                </button>
              ))}
            </div>
            {selected !== null && (
              <p className={`mt-2 text-xs font-bold ${selected === step.quiz.correct ? "text-green-700" : "text-red-700"}`}>
                {selected === step.quiz.correct ? "✅ Saktë! Mashallah!" : "❌ Gabim — Përgjigja e saktë është: " + step.quiz.options[lang][step.quiz.correct]}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function HomeFormationCard({ f, lang }) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{f.num}</span>
        <h4 className="font-bold text-gray-800 text-sm">{f.title[lang]}</h4>
      </div>
      <div className="text-center text-3xl py-3 bg-emerald-50 rounded-xl mb-3">{f.figure}</div>
      <p className="text-xs text-gray-600 leading-relaxed">{f.desc[lang]}</p>
      {/* Visual arrangement diagram */}
      <div className="mt-3 bg-gray-50 rounded-xl p-3 text-center">
        {f.arrangement === "imam-right" && (
          <div className="flex justify-center items-end gap-4">
            <div className="text-center"><div className="text-2xl">🟩</div><div className="text-[10px] text-gray-500">Imam</div></div>
            <div className="text-center"><div className="text-2xl mt-3">🟦</div><div className="text-[10px] text-gray-500">{lang === 'ar' ? 'مأموم' : lang === 'en' ? 'Follower' : 'Makmum'}</div></div>
          </div>
        )}
        {f.arrangement === "row-behind" && (
          <div className="space-y-1">
            <div className="flex justify-center gap-1"><div className="text-2xl">🟩</div></div>
            <div className="flex justify-center gap-1"><div className="text-2xl">🟦</div><div className="text-2xl">🟦</div><div className="text-2xl">🟦</div></div>
          </div>
        )}
        {f.arrangement === "wife-behind" && (
          <div className="space-y-1">
            <div className="flex justify-center gap-1"><div className="text-2xl">🟩</div></div>
            <div className="flex justify-center gap-1"><div className="text-2xl">🟧</div></div>
          </div>
        )}
        {f.arrangement === "multi-row" && (
          <div className="space-y-1">
            <div className="flex justify-center gap-1"><div className="text-2xl">🟩</div></div>
            <div className="flex justify-center gap-1"><div className="text-2xl">🟦</div><div className="text-2xl">🟦</div></div>
            <div className="flex justify-center gap-1"><div className="text-2xl">🟧</div></div>
          </div>
        )}
        {f.arrangement === "full-family" && (
          <div className="space-y-1">
            <div className="flex justify-center gap-1"><div className="text-2xl">🟩</div></div>
            <div className="flex justify-center gap-1"><div className="text-2xl">🟦</div><div className="text-2xl">🟦</div></div>
            <div className="flex justify-center gap-1"><div className="text-2xl">🟨</div><div className="text-2xl">🟨</div></div>
            <div className="flex justify-center gap-1"><div className="text-2xl">🟧</div></div>
          </div>
        )}
        {f.arrangement === "son-right-mother-back" && (
          <div className="space-y-1">
            <div className="flex justify-center gap-2"><div className="text-2xl">🟩</div><div className="text-2xl">🟦</div></div>
            <div className="flex justify-center gap-1"><div className="text-2xl">🟧</div></div>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-2 text-[9px] text-gray-500">
          <span>🟩 Imam</span><span>🟦 Mashkull</span><span>🟧 Femër</span><span>🟨 Vajzë</span>
        </div>
      </div>
    </div>
  );
}

export default function PrayerGuide() {
  const [lang, setLang] = useState("sq");
  const [activeTab, setActiveTab] = useState("steps");
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState("all"); // "all" or "step-by-step"
  const [isOpen, setIsOpen] = useState(false);
  const [stepImages, setStepImages] = useState(() => {
    try { return JSON.parse(localStorage.getItem("prayer_step_images") || "{}"); } catch { return {}; }
  });

  const tabs = [
    { id: "steps", label: { sq: "📋 Hapat", en: "📋 Steps", ar: "📋 الخطوات" } },
    { id: "home", label: { sq: "🏠 Shtëpia", en: "🏠 Home", ar: "🏠 البيت" } },
    { id: "book", label: { sq: "📖 Libri Plotë", en: "📖 Full Text", ar: "📖 النص الكامل" } },
  ];

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-900 rounded-3xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative">
          <h2 className="text-2xl font-extrabold mb-1">🕌 Forma e Namazit</h2>
          <p className="text-emerald-300 text-sm leading-relaxed">
            Përmbledhje e formës së namazit të Muhamedit ﷺ — nga Tekbiri fillestar deri në dhënien e Selamit
          </p>
          <p className="text-xs text-gray-400 mt-2 italic">— Sheikh Muhamed Nasirudin el Albani (Allahu e mëshiroftë!)</p>
        </div>
      </div>

      {/* Language + View controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {Object.entries(LANG).map(([k, v]) => (
            <button key={k} onClick={() => setLang(k)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${lang === k ? "bg-emerald-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {v}
            </button>
          ))}
        </div>
        {activeTab === "steps" && (
          <div className="flex gap-2">
            <button onClick={() => setViewMode("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${viewMode === "all" ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-600"}`}>
              📋 {lang === 'en' ? 'All' : lang === 'ar' ? 'الكل' : 'Të gjitha'}
            </button>
            <button onClick={() => setViewMode("step")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${viewMode === "step" ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-600"}`}>
              👆 {lang === 'en' ? 'Step by Step' : lang === 'ar' ? 'خطوة بخطوة' : 'Hap pas Hapi'}
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === t.id ? "bg-white shadow text-emerald-700" : "text-gray-500"}`}>
            {t.label[lang]}
          </button>
        ))}
      </div>

      {/* ===== HAPAT E NAMAZIT ===== */}
      {activeTab === "steps" && viewMode === "all" && (
        <div className="space-y-4">
          {PRAYER_STEPS.map((step) => (
            <PrayerStepCard key={step.id} step={step} lang={lang} />
          ))}
        </div>
      )}

      {activeTab === "steps" && viewMode === "step" && (
        <div>
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${((currentStep + 1) / PRAYER_STEPS.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 font-semibold">{currentStep + 1}/{PRAYER_STEPS.length}</span>
          </div>
          {/* Step dots */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {PRAYER_STEPS.map((s, i) => (
              <button key={i} onClick={() => setCurrentStep(i)}
                className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${i === currentStep ? "bg-emerald-600 text-white" : i < currentStep ? "bg-emerald-200 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                {i + 1}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <PrayerStepCard step={PRAYER_STEPS[currentStep]} lang={lang} />
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:border-emerald-400 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> {lang === 'en' ? 'Previous' : lang === 'ar' ? 'السابق' : 'Mëparshme'}
            </button>
            <button
              onClick={() => setCurrentStep(s => Math.min(PRAYER_STEPS.length - 1, s + 1))}
              disabled={currentStep === PRAYER_STEPS.length - 1}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-30 transition-all"
            >
              {lang === 'en' ? 'Next' : lang === 'ar' ? 'التالي' : 'Tjetra'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===== FORMA NË SHTËPI ===== */}
      {activeTab === "home" && (
        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-900">
                {lang === 'en' ? 'Prayer Formations at Home' : lang === 'ar' ? 'صفوف الصلاة في البيت' : 'Forma e Namazit me Xhemat në Shtëpi'}
              </h3>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              {lang === 'en'
                ? 'These are the arrangements for praying in congregation at home. Each case has a specific ruling.'
                : lang === 'ar'
                ? 'هذه هي ترتيبات الصلاة جماعة في المنزل. لكل حالة حكم خاص.'
                : 'Këto janë formacionet e namazit me xhemat në shtëpi. Çdo rast ka dispozitën e vet.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOME_FORMATIONS.map((f) => (
              <HomeFormationCard key={f.num} f={f} lang={lang} />
            ))}
          </div>
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="text-xs text-emerald-900 leading-relaxed">
              <strong>📌 {lang === 'en' ? 'Important Rule:' : lang === 'ar' ? 'قاعدة مهمة:' : 'Rregull i Rëndësishëm:'}</strong>{" "}
              {lang === 'en'
                ? 'Women must always stand behind the men\'s row. A woman standing in the same row as men does not invalidate the prayer but is against Sunnah.'
                : lang === 'ar'
                ? 'يجب أن تقف المرأة دائمًا خلف صف الرجال. وقوف المرأة في نفس صف الرجال لا يبطل الصلاة لكنه خلاف السنة.'
                : 'Gruaja duhet të qëndrojë gjithmonë pas rreshtit të burrave. Nëse qëndron krah për krah me burrin, namazi i saj është i saktë por kundër Sunnetit.'}
            </p>
          </div>
        </div>
      )}

      {/* ===== LIBRI PLOTË ===== */}
      {activeTab === "book" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-gray-800">Forma e Namazit — Sheikh Albani</h3>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 mb-5">
            <p className="text-sm font-bold text-amber-900">بسم الله الرحمن الرحيم</p>
            <p className="text-sm text-amber-800 mt-2 leading-relaxed italic">
              "Falënderuar qoftë Allahu! Vetëm Atë lavdërojmë, Atij i kërkojmë ndihmë, falje të gjymaheve tona dhe tek Ai pendohemi!..."
            </p>
            <p className="text-xs text-amber-700 mt-2">— Mukaddimeja e librit "Sifatu Salatin-Nebijji ﷺ"</p>
          </div>
          
          {[
            { num: "1", title: "Të drejtuarit nga Kibla", content: "Kur të ngrihesh për t'u falur, o ti musliman, drejtohu nga Kibla kudo që të jesh. Kjo gjë është prej shtyllave të namazit pa të cilat namazi nuk është i vlefshëm." },
            { num: "2", title: "Të qëndruarit në këmbë", content: "Të qëndruarit në këmbë gjatë namazit është obligim dhe një nga ruknet e namazit. Nuk i lejohet atij që falet ulur që të vendosë diçka të ngritur me qëllim që të bëjë sexhden mbi të." },
            { num: "3", title: "Nijeti", content: "Ai që falet duhet patjetër që të bëjë nijetin për namazin që ngrihet të falë, duke e përcaktuar atë me zemrën e tij. Nijeti është kusht ose shtyllë e namazit, ndërsa të shprehurit e tij me gjuhë është bidat." },
            { num: "4", title: "Tekbiri Fillestar", content: "E hap namazin duke thënë 'Allahu Ekber', dhe kjo është shtyllë e namazit. Nuk duhet ngritur zëri me thënien e tekbirit në asnjë prej namazeve vetëm në rast se je imam." },
            { num: "5", title: "Leximi nga Kurani në namaz", content: "Lexo suren Fatiha plotësisht — ku përfshihet edhe Bismila-ja — dhe leximi i saj është rukn e namazit pa të cilën namazi nuk vlen. Suneti është që pas leximti të Fatihasë të lexohet edhe një sure tjetër." },
            { num: "6", title: "Rukuja", content: "Pastaj përkulesh në ruku deri sa gjymtyrët të zenë vend. Duart i vendos mbi gjunjë dhe i mbështet mirë mbi to. Shpinën e shtrin dhe e drejton sa që sikur të hidhej ujë mbi shpinë, të qëndronte mbi të." },
            { num: "7", title: "Sexhdja", content: "Bie në sexhde mbi duar duke i vendosur ato para gjunjëve. Mbështetesh mbi pëllëmbët e duarve dhe i hap ato. Hundën dhe ballin i mbështet mirë në tokë. Bërrylat duhet t'i ngresh nga toka detyrimisht." },
            { num: "8", title: "Teshehudi dhe Selami", content: "Ulesh për teshehudin, i cili është vaxhib. Pastaj dërgon salavat mbi Pejgamberin ﷺ. Pastaj jep selam nga ana e djathtë, gjë e cila është rukn në namaz, deri sa të duket e bardha e nofullës." },
          ].map((section, i) => (
            <div key={i} className="mb-4 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{section.num}</span>
                <h4 className="font-bold text-gray-800 text-sm">{section.title}</h4>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          ))}

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mt-4">
            <p className="text-sm text-emerald-900 font-bold mb-2">📖 Mesazhi Final i Shejkhut:</p>
            <p className="text-sm text-emerald-800 leading-relaxed italic">
              "N.q.s ti falesh ashtu si ta përshkrova prej namazit të Pejgamberit ﷺ, unë shpresoj nga Allahu i Madhëruar që ta pranojë atë prej teje, sepse në këtë rast ti ke praktikuar me të vërtetë fjalën e Pejgamberit ﷺ: 'Faluni siç më shihni mua të falem.'"
            </p>
            <p className="text-xs text-emerald-600 mt-2">— Muhamed Nasirudin el Albani | Damask, 26 Sefer 1392 H</p>
          </div>
        </div>
      )}
    </div>
  );
}