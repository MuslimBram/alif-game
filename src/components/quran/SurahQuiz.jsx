import React, { useState, useEffect } from "react";
import { RotateCcw, Trophy, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SURAHS = [
  { num: 1, name: "Al-Fatiha", name_sq: "Hapja", arabic: "الفاتحة", verses: 7, type: "Mekase" },
  { num: 2, name: "Al-Baqarah", name_sq: "Lopa", arabic: "البقرة", verses: 286, type: "Medinase" },
  { num: 3, name: "Ali 'Imran", name_sq: "Familja e Imranit", arabic: "آل عمران", verses: 200, type: "Medinase" },
  { num: 4, name: "An-Nisa", name_sq: "Gratë", arabic: "النساء", verses: 176, type: "Medinase" },
  { num: 5, name: "Al-Ma'idah", name_sq: "Sofra", arabic: "المائدة", verses: 120, type: "Medinase" },
  { num: 6, name: "Al-An'am", name_sq: "Bagëtia", arabic: "الأنعام", verses: 165, type: "Mekase" },
  { num: 7, name: "Al-A'raf", name_sq: "Lartësirat", arabic: "الأعراف", verses: 206, type: "Mekase" },
  { num: 8, name: "Al-Anfal", name_sq: "Plaçkat e luftës", arabic: "الأنفال", verses: 75, type: "Medinase" },
  { num: 9, name: "At-Tawbah", name_sq: "Pendimi", arabic: "التوبة", verses: 129, type: "Medinase" },
  { num: 10, name: "Yunus", name_sq: "Junusi", arabic: "يونس", verses: 109, type: "Mekase" },
  { num: 11, name: "Hud", name_sq: "Hudi", arabic: "هود", verses: 123, type: "Mekase" },
  { num: 12, name: "Yusuf", name_sq: "Jusufi", arabic: "يوسف", verses: 111, type: "Mekase" },
  { num: 13, name: "Ar-Ra'd", name_sq: "Bubullima", arabic: "الرعد", verses: 43, type: "Medinase" },
  { num: 14, name: "Ibrahim", name_sq: "Ibrahimi", arabic: "إبراهيم", verses: 52, type: "Mekase" },
  { num: 15, name: "Al-Hijr", name_sq: "Hiraxhi", arabic: "الحجر", verses: 99, type: "Mekase" },
  { num: 16, name: "An-Nahl", name_sq: "Bletët", arabic: "النحل", verses: 128, type: "Mekase" },
  { num: 17, name: "Al-Isra", name_sq: "Udhëtimi Naktësor", arabic: "الإسراء", verses: 111, type: "Mekase" },
  { num: 18, name: "Al-Kahf", name_sq: "Shpella", arabic: "الكهف", verses: 110, type: "Mekase" },
  { num: 19, name: "Maryam", name_sq: "Merjemja", arabic: "مريم", verses: 98, type: "Mekase" },
  { num: 20, name: "Ta-Ha", name_sq: "Ta-Ha", arabic: "طه", verses: 135, type: "Mekase" },
  { num: 21, name: "Al-Anbiya", name_sq: "Profetët", arabic: "الأنبياء", verses: 112, type: "Mekase" },
  { num: 22, name: "Al-Hajj", name_sq: "Haxhi", arabic: "الحج", verses: 78, type: "Medinase" },
  { num: 23, name: "Al-Mu'minun", name_sq: "Besimtarët", arabic: "المؤمنون", verses: 118, type: "Mekase" },
  { num: 24, name: "An-Nur", name_sq: "Drita", arabic: "النور", verses: 64, type: "Medinase" },
  { num: 25, name: "Al-Furqan", name_sq: "Dallimi", arabic: "الفرقان", verses: 77, type: "Mekase" },
  { num: 26, name: "Ash-Shu'ara", name_sq: "Poetët", arabic: "الشعراء", verses: 227, type: "Mekase" },
  { num: 27, name: "An-Naml", name_sq: "Milingonat", arabic: "النمل", verses: 93, type: "Mekase" },
  { num: 28, name: "Al-Qasas", name_sq: "Tregjimet", arabic: "القصص", verses: 88, type: "Mekase" },
  { num: 29, name: "Al-'Ankabut", name_sq: "Merimanga", arabic: "العنكبوت", verses: 69, type: "Mekase" },
  { num: 30, name: "Ar-Rum", name_sq: "Romakët", arabic: "الروم", verses: 60, type: "Mekase" },
  { num: 31, name: "Luqman", name_sq: "Llukman", arabic: "لقمان", verses: 34, type: "Mekase" },
  { num: 32, name: "As-Sajdah", name_sq: "Sexhdeja", arabic: "السجدة", verses: 30, type: "Mekase" },
  { num: 33, name: "Al-Ahzab", name_sq: "Grupacioni", arabic: "الأحزاب", verses: 73, type: "Medinase" },
  { num: 34, name: "Saba", name_sq: "Sabeja", arabic: "سبأ", verses: 54, type: "Mekase" },
  { num: 35, name: "Fatir", name_sq: "Krijuesi", arabic: "فاطر", verses: 45, type: "Mekase" },
  { num: 36, name: "Ya-Sin", name_sq: "Ya-Sin", arabic: "يس", verses: 83, type: "Mekase" },
  { num: 37, name: "As-Saffat", name_sq: "Të rreshtuar", arabic: "الصافات", verses: 182, type: "Mekase" },
  { num: 38, name: "Sad", name_sq: "Sad", arabic: "ص", verses: 88, type: "Mekase" },
  { num: 39, name: "Az-Zumar", name_sq: "Grupet", arabic: "الزمر", verses: 75, type: "Mekase" },
  { num: 40, name: "Ghafir", name_sq: "Falësi", arabic: "غافر", verses: 85, type: "Mekase" },
  { num: 41, name: "Fussilat", name_sq: "E shpjeguar", arabic: "فصلت", verses: 54, type: "Mekase" },
  { num: 42, name: "Ash-Shura", name_sq: "Këshillimi", arabic: "الشورى", verses: 53, type: "Mekase" },
  { num: 43, name: "Az-Zukhruf", name_sq: "Zbukurimi", arabic: "الزخرف", verses: 89, type: "Mekase" },
  { num: 44, name: "Ad-Dukhan", name_sq: "Tymi", arabic: "الدخان", verses: 59, type: "Mekase" },
  { num: 45, name: "Al-Jathiyah", name_sq: "Gjunjëzimi", arabic: "الجاثية", verses: 37, type: "Mekase" },
  { num: 46, name: "Al-Ahqaf", name_sq: "Kodrat rëreshora", arabic: "الأحقاف", verses: 35, type: "Mekase" },
  { num: 47, name: "Muhammad", name_sq: "Muhamedi", arabic: "محمد", verses: 38, type: "Medinase" },
  { num: 48, name: "Al-Fath", name_sq: "Çlirimi", arabic: "الفتح", verses: 29, type: "Medinase" },
  { num: 49, name: "Al-Hujurat", name_sq: "Dhomat", arabic: "الحجرات", verses: 18, type: "Medinase" },
  { num: 50, name: "Qaf", name_sq: "Qaf", arabic: "ق", verses: 45, type: "Mekase" },
  { num: 51, name: "Adh-Dhariyat", name_sq: "Erërat shpërndarëse", arabic: "الذاريات", verses: 60, type: "Mekase" },
  { num: 52, name: "At-Tur", name_sq: "Mali", arabic: "الطور", verses: 49, type: "Mekase" },
  { num: 53, name: "An-Najm", name_sq: "Ylli", arabic: "النجم", verses: 62, type: "Mekase" },
  { num: 54, name: "Al-Qamar", name_sq: "Hëna", arabic: "القمر", verses: 55, type: "Mekase" },
  { num: 55, name: "Ar-Rahman", name_sq: "I Gjithëmëshirshmi", arabic: "الرحمن", verses: 78, type: "Medinase" },
  { num: 56, name: "Al-Waqi'ah", name_sq: "Ngjarja", arabic: "الواقعة", verses: 96, type: "Mekase" },
  { num: 57, name: "Al-Hadid", name_sq: "Hekuri", arabic: "الحديد", verses: 29, type: "Medinase" },
  { num: 58, name: "Al-Mujadila", name_sq: "Ajo që ankohej", arabic: "المجادلة", verses: 22, type: "Medinase" },
  { num: 59, name: "Al-Hashr", name_sq: "Grumbullimi", arabic: "الحشر", verses: 24, type: "Medinase" },
  { num: 60, name: "Al-Mumtahanah", name_sq: "Ajo që u provua", arabic: "الممتحنة", verses: 13, type: "Medinase" },
  { num: 61, name: "As-Saff", name_sq: "Rreshtat", arabic: "الصف", verses: 14, type: "Medinase" },
  { num: 62, name: "Al-Jumu'ah", name_sq: "E Premtja", arabic: "الجمعة", verses: 11, type: "Medinase" },
  { num: 63, name: "Al-Munafiqun", name_sq: "Hipokritët", arabic: "المنافقون", verses: 11, type: "Medinase" },
  { num: 64, name: "At-Taghabun", name_sq: "Mashtrimi i ndërsjellë", arabic: "التغابن", verses: 18, type: "Medinase" },
  { num: 65, name: "At-Talaq", name_sq: "Divorci", arabic: "الطلاق", verses: 12, type: "Medinase" },
  { num: 66, name: "At-Tahrim", name_sq: "Ndalimi", arabic: "التحريم", verses: 12, type: "Medinase" },
  { num: 67, name: "Al-Mulk", name_sq: "Mbizotërimi", arabic: "الملك", verses: 30, type: "Mekase" },
  { num: 68, name: "Al-Qalam", name_sq: "Lapsi", arabic: "القلم", verses: 52, type: "Mekase" },
  { num: 69, name: "Al-Haqqah", name_sq: "E vërteta", arabic: "الحاقة", verses: 52, type: "Mekase" },
  { num: 70, name: "Al-Ma'arij", name_sq: "Shkallët ngritëse", arabic: "المعارج", verses: 44, type: "Mekase" },
  { num: 71, name: "Nuh", name_sq: "Nuhu", arabic: "نوح", verses: 28, type: "Mekase" },
  { num: 72, name: "Al-Jinn", name_sq: "Xhinët", arabic: "الجن", verses: 28, type: "Mekase" },
  { num: 73, name: "Al-Muzzammil", name_sq: "I mbështjelli", arabic: "المزمل", verses: 20, type: "Mekase" },
  { num: 74, name: "Al-Muddaththir", name_sq: "I mbuluar", arabic: "المدثر", verses: 56, type: "Mekase" },
  { num: 75, name: "Al-Qiyamah", name_sq: "Ringjallja", arabic: "القيامة", verses: 40, type: "Mekase" },
  { num: 76, name: "Al-Insan", name_sq: "Njeriu", arabic: "الإنسان", verses: 31, type: "Medinase" },
  { num: 77, name: "Al-Mursalat", name_sq: "Të dërguarit", arabic: "المرسلات", verses: 50, type: "Mekase" },
  { num: 78, name: "An-Naba", name_sq: "Lajmi", arabic: "النبأ", verses: 40, type: "Mekase" },
  { num: 79, name: "An-Nazi'at", name_sq: "Ata që heqin", arabic: "النازعات", verses: 46, type: "Mekase" },
  { num: 80, name: "'Abasa", name_sq: "Vrenjti", arabic: "عبس", verses: 42, type: "Mekase" },
  { num: 81, name: "At-Takwir", name_sq: "Mbyllja e diellit", arabic: "التكوير", verses: 29, type: "Mekase" },
  { num: 82, name: "Al-Infitar", name_sq: "Çarja", arabic: "الانفطار", verses: 19, type: "Mekase" },
  { num: 83, name: "Al-Mutaffifin", name_sq: "Mashtrueset", arabic: "المطففين", verses: 36, type: "Mekase" },
  { num: 84, name: "Al-Inshiqaq", name_sq: "Shpërbërja", arabic: "الانشقاق", verses: 25, type: "Mekase" },
  { num: 85, name: "Al-Buruj", name_sq: "Yjet e mëdha", arabic: "البروج", verses: 22, type: "Mekase" },
  { num: 86, name: "At-Tariq", name_sq: "Ylli i natës", arabic: "الطارق", verses: 17, type: "Mekase" },
  { num: 87, name: "Al-A'la", name_sq: "I Larti", arabic: "الأعلى", verses: 19, type: "Mekase" },
  { num: 88, name: "Al-Ghashiyah", name_sq: "Ngjarja mbulojnë", arabic: "الغاشية", verses: 26, type: "Mekase" },
  { num: 89, name: "Al-Fajr", name_sq: "Agimi", arabic: "الفجر", verses: 30, type: "Mekase" },
  { num: 90, name: "Al-Balad", name_sq: "Qyteti", arabic: "البلد", verses: 20, type: "Mekase" },
  { num: 91, name: "Ash-Shams", name_sq: "Dielli", arabic: "الشمس", verses: 15, type: "Mekase" },
  { num: 92, name: "Al-Layl", name_sq: "Nata", arabic: "الليل", verses: 21, type: "Mekase" },
  { num: 93, name: "Ad-Duha", name_sq: "Mëngjesi", arabic: "الضحى", verses: 11, type: "Mekase" },
  { num: 94, name: "Ash-Sharh", name_sq: "Hapja e gjoksit", arabic: "الشرح", verses: 8, type: "Mekase" },
  { num: 95, name: "At-Tin", name_sq: "Fiku", arabic: "التين", verses: 8, type: "Mekase" },
  { num: 96, name: "Al-'Alaq", name_sq: "Gjaku i mpiksur", arabic: "العلق", verses: 19, type: "Mekase" },
  { num: 97, name: "Al-Qadr", name_sq: "Nata e Kadrit", arabic: "القدر", verses: 5, type: "Mekase" },
  { num: 98, name: "Al-Bayyinah", name_sq: "Dëshmi e qartë", arabic: "البينة", verses: 8, type: "Medinase" },
  { num: 99, name: "Az-Zalzalah", name_sq: "Tërmeti", arabic: "الزلزلة", verses: 8, type: "Medinase" },
  { num: 100, name: "Al-'Adiyat", name_sq: "Kalorëset", arabic: "العاديات", verses: 11, type: "Mekase" },
  { num: 101, name: "Al-Qari'ah", name_sq: "Goditja", arabic: "القارعة", verses: 11, type: "Mekase" },
  { num: 102, name: "At-Takathur", name_sq: "Grumbullimi i pasurisë", arabic: "التكاثر", verses: 8, type: "Mekase" },
  { num: 103, name: "Al-'Asr", name_sq: "Koha", arabic: "العصر", verses: 3, type: "Mekase" },
  { num: 104, name: "Al-Humazah", name_sq: "Shpifësi", arabic: "الهمزة", verses: 9, type: "Mekase" },
  { num: 105, name: "Al-Fil", name_sq: "Elefanti", arabic: "الفيل", verses: 5, type: "Mekase" },
  { num: 106, name: "Quraysh", name_sq: "Kurejshi", arabic: "قريش", verses: 4, type: "Mekase" },
  { num: 107, name: "Al-Ma'un", name_sq: "Ndihma e vogël", arabic: "الماعون", verses: 7, type: "Mekase" },
  { num: 108, name: "Al-Kawthar", name_sq: "Kautherit", arabic: "الكوثر", verses: 3, type: "Mekase" },
  { num: 109, name: "Al-Kafirun", name_sq: "Mohuesit", arabic: "الكافرون", verses: 6, type: "Mekase" },
  { num: 110, name: "An-Nasr", name_sq: "Ndihma", arabic: "النصر", verses: 3, type: "Medinase" },
  { num: 111, name: "Al-Masad", name_sq: "Fijat e palmës", arabic: "المسد", verses: 5, type: "Mekase" },
  { num: 112, name: "Al-Ikhlas", name_sq: "Sinqeriteti", arabic: "الإخلاص", verses: 4, type: "Mekase" },
  { num: 113, name: "Al-Falaq", name_sq: "Agimi i ditës", arabic: "الفلق", verses: 5, type: "Mekase" },
  { num: 114, name: "An-Nas", name_sq: "Njerëzit", arabic: "الناس", verses: 6, type: "Mekase" },
];

// Generate questions for a specific surah - more questions for bigger surahs
function generateSurahQuestions(surah) {
  const others = SURAHS.filter(s => s.num !== surah.num);
  const rand3 = (arr) => arr.sort(() => Math.random() - 0.5).slice(0, 3);
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const baseQuestions = [
    // Q1: Name → Shqip
    {
      q: `Surja "${surah.name}" — si quhet shqip?`,
      options: shuffle([surah.name_sq, ...rand3(others).map(s => s.name_sq)]),
      correct: surah.name_sq,
    },
    // Q2: Arabic → Name
    {
      q: `Cila sure është: ${surah.arabic}?`,
      options: shuffle([surah.name, ...rand3(others).map(s => s.name)]),
      correct: surah.name,
    },
    // Q3: How many verses
    {
      q: `Sa ajete ka sure ${surah.name}?`,
      options: shuffle([surah.verses, ...rand3(others).map(s => s.verses)].map(String)),
      correct: surah.verses.toString(),
    },
    // Q4: Mekase or Medinase
    {
      q: `Sure ${surah.name} është…?`,
      options: ["Mekase", "Medinase"],
      correct: surah.type,
    },
    // Q5: Number → Name
    {
      q: `Sure nr. ${surah.num} quhet si?`,
      options: shuffle([surah.name, ...rand3(others).map(s => s.name)]),
      correct: surah.name,
    },
    // Q6: Name → Number
    {
      q: `Cili numër ka sure "${surah.name}" në Kur'an?`,
      options: shuffle([surah.num, ...rand3(others).map(s => s.num)].map(String)),
      correct: surah.num.toString(),
    },
    // Q7: Shqip → Arabic name
    {
      q: `"${surah.name_sq}" — si quhet arabisht kjo sure?`,
      options: shuffle([surah.arabic, ...rand3(others).map(s => s.arabic)]),
      correct: surah.arabic,
    },
    // Q8: More/fewer verses than X
    ...(() => {
      const ref = others[Math.floor(Math.random() * others.length)];
      return [{
        q: `Cila sure ka më shumë ajete: ${surah.name} (${surah.verses}) apo ${ref.name} (${ref.verses})?`,
        options: shuffle([surah.name, ref.name, "Të njëjta", "Nuk mund të dihet"]),
        correct: surah.verses > ref.verses ? surah.name : surah.verses < ref.verses ? ref.name : "Të njëjta",
      }];
    })(),
    // Q9: Before or after in Mushaf
    ...(() => {
      const ref2 = others.filter(s => s.num !== surah.num)[Math.floor(Math.random() * (others.length - 1))];
      return [{
        q: `Cila sure vjen PARA në Mushaf: "${surah.name}" apo "${ref2.name}"?`,
        options: shuffle([surah.name, ref2.name]),
        correct: surah.num < ref2.num ? surah.name : ref2.name,
      }];
    })(),
    // Q10: Name match Shqip
    {
      q: `"${surah.name_sq}" — cila sure është kjo?`,
      options: shuffle([surah.name, ...rand3(others).map(s => s.name)]),
      correct: surah.name,
    },
    // Q11: Verses odd/even
    {
      q: `Sa ajete ka "${surah.name}" — çift apo tek?`,
      options: ["Çift (even)", "Tek (odd)"],
      correct: surah.verses % 2 === 0 ? "Çift (even)" : "Tek (odd)",
    },
    // Q12: Compare with neighbor
    ...(() => {
      const neighbor = SURAHS.find(s => s.num === surah.num + 1) || SURAHS.find(s => s.num === surah.num - 1);
      if (!neighbor) return [];
      return [{
        q: `Cila sure ka MË PAK ajete: "${surah.name}" (${surah.verses}) apo "${neighbor.name}" (${neighbor.verses})?`,
        options: shuffle([surah.name, neighbor.name]),
        correct: surah.verses < neighbor.verses ? surah.name : neighbor.name,
      }];
    })(),
    // Q13: Type knowledge
    {
      q: `Sure "${surah.name}" u zbrit në…?`,
      options: ["Meke", "Medine", "Taif", "Kudus"],
      correct: surah.type === "Mekase" ? "Meke" : "Medine",
    },
    // Q14: Arabic reading
    {
      q: `Cila është emri arab i sures nr. ${surah.num}?`,
      options: shuffle([surah.arabic, ...rand3(others).map(s => s.arabic)]),
      correct: surah.arabic,
    },
    // Q15: Is it the first/last or middle
    {
      q: `Sure "${surah.name}" (nr.${surah.num}) — ku ndodhet në Kur'an?`,
      options: ["Fillim (1-30)", "Mes (31-84)", "Fund (85-114)"],
      correct: surah.num <= 30 ? "Fillim (1-30)" : surah.num <= 84 ? "Mes (31-84)" : "Fund (85-114)",
    },
    // Q16: Verses range
    {
      q: `Sa ajete ka "${surah.name}" — pak (<20), mesatare (20-100), shumë (>100)?`,
      options: ["Pak (< 20 ajete)", "Mesatare (20–100)", "Shumë (> 100 ajete)"],
      correct: surah.verses < 20 ? "Pak (< 20 ajete)" : surah.verses <= 100 ? "Mesatare (20–100)" : "Shumë (> 100 ajete)",
    },
    // Q17: Ordering quiz
    ...(() => {
      const s2 = rand3(others)[0];
      return [{
        q: `Renditja: cila sure ka numrin MÁ TÉ LARTË në Mushaf?`,
        options: shuffle([surah.name, s2.name]),
        correct: surah.num > s2.num ? surah.name : s2.name,
      }];
    })(),
    // Q18: Full name recognition  
    {
      q: `"${surah.name}" — cili është numri i sures?`,
      options: shuffle([surah.num, ...rand3(others).map(s => s.num)].map(String)),
      correct: surah.num.toString(),
    },
    // Q19: Shqip → Type
    {
      q: `"${surah.name_sq}" — kjo sure u zbrit në Meke apo Medine?`,
      options: ["Meke (Mekase)", "Medine (Medinase)"],
      correct: surah.type === "Mekase" ? "Meke (Mekase)" : "Medine (Medinase)",
    },
    // Q20: Verses exact
    {
      q: `A ka sure "${surah.name}" saktësisht ${surah.verses} ajete?`,
      options: ["Po, saktësisht", "Jo, ka më pak", "Jo, ka më shumë", "Nuk dihet"],
      correct: "Po, saktësisht",
    },
  ];

  // For bigger surahs, add more questions
  const extraQuestions = [];
  if (surah.verses >= 20) {
    const pick3 = rand3(others);
    extraQuestions.push(
      {
        q: `Cila nga këto sure ka MÁ SHUMÉ ajete se ${surah.name} (${surah.verses})?`,
        options: shuffle([...pick3.map(s => s.name), "Asnjëra prej tyre"]),
        correct: pick3.some(s => s.verses > surah.verses) ? pick3.find(s => s.verses > surah.verses)?.name || "Asnjëra prej tyre" : "Asnjëra prej tyre",
      },
      {
        q: `Sure "${surah.name}" — sa % e Kur'anit (114 sure) ndodhet pas saj (me numër më të lartë)?`,
        options: [
          `${Math.round(((114 - surah.num) / 114) * 100)}% (rreth ${114 - surah.num} sure)`,
          `${Math.round((surah.num / 114) * 100)}% (rreth ${surah.num} sure)`,
          "50% gjithmonë", "Nuk mund të llogaritet"
        ],
        correct: `${Math.round(((114 - surah.num) / 114) * 100)}% (rreth ${114 - surah.num} sure)`,
      }
    );
  }

  if (surah.verses >= 50) {
    const bigSurahs = SURAHS.filter(s => s.verses >= 50 && s.num !== surah.num).slice(0, 3);
    if (bigSurahs.length > 0) {
      extraQuestions.push({
        q: `Midis sureve të mëdha, cila ka NUMRIN MÁ TÉ VOGËL ajetesh: ${surah.name} (${surah.verses}) apo ${bigSurahs[0].name} (${bigSurahs[0].verses})?`,
        options: shuffle([surah.name, bigSurahs[0].name]),
        correct: surah.verses < bigSurahs[0].verses ? surah.name : bigSurahs[0].name,
      });
    }
  }

  if (surah.verses >= 100) {
    extraQuestions.push({
      q: `Sure "${surah.name}" — a bën pjesë te suret me MÁ SHUMÉ se 100 ajete?`,
      options: ["Po, bën pjesë", "Jo, nuk bën pjesë"],
      correct: "Po, bën pjesë",
    });
  }

  const allQ = [...baseQuestions, ...extraQuestions];
  // Minimum 20, scaled by size
  const targetCount = Math.max(20, Math.min(30, Math.floor(surah.verses / 10) + 15));
  return allQ.sort(() => Math.random() - 0.5).slice(0, targetCount);
}

export default function SurahQuiz() {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [finished, setFinished] = useState(false);
  const [searchSurah, setSearchSurah] = useState("");

  useEffect(() => {
    if (!selectedSurah || finished) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, selectedSurah, finished, quizIdx]);

  const startQuiz = (surah) => {
    const qs = generateSurahQuestions(surah);
    setSelectedSurah(surah);
    setQuestions(qs);
    setQuizIdx(0); setScore(0); setTimer(20); setAnswered(null); setFinished(false);
  };

  const handleAnswer = (opt) => {
    if (answered !== null || !questions[quizIdx]) return;
    const isCorrect = opt === questions[quizIdx].correct;
    setAnswered({ selected: opt, correct: questions[quizIdx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= questions.length) { setFinished(true); return; }
      setQuizIdx(i => i + 1); setTimer(20); setAnswered(null);
    }, 1200);
  };

  const filtered = SURAHS.filter(s =>
    s.name.toLowerCase().includes(searchSurah.toLowerCase()) ||
    s.name_sq.toLowerCase().includes(searchSurah.toLowerCase()) ||
    s.num.toString() === searchSurah
  );

  // Surah selection screen
  if (!selectedSurah) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-1">🎯 Kuiz për Çdo Sure</h3>
          <p className="text-sm text-gray-500 mb-4">Zgjidh një sure dhe do të marrësh 20+ pyetje sipas madhësisë së saj!</p>
          <input
            value={searchSurah}
            onChange={e => setSearchSurah(e.target.value)}
            placeholder="Kërko sure (emri ose numri)..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 mb-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
            {filtered.map(surah => {
              const qCount = Math.max(20, Math.min(30, Math.floor(surah.verses / 10) + 15));
              return (
                <button key={surah.num} onClick={() => startQuiz(surah)}
                  className="flex items-center gap-3 p-3 bg-amber-50 hover:bg-amber-100 border border-amber-100 hover:border-amber-300 rounded-xl transition-all text-left group">
                  <span className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{surah.num}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{surah.name}</p>
                    <p className="text-xs text-gray-500">{surah.name_sq} · {surah.verses} ajete</p>
                  </div>
                  <span className="text-xs text-amber-600 font-bold flex-shrink-0">~{qCount} pyetje</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Quiz running
  if (!finished && questions[quizIdx]) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-1">
            <button onClick={() => setSelectedSurah(null)} className="text-xs text-gray-400 hover:text-gray-700">← Ndërro sure</button>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg">Sure {selectedSurah.num}: {selectedSurah.name}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600">Pyetja {quizIdx + 1}/{questions.length}</span>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-amber-100 text-amber-700"}`}>
              ⏱ {timer}s
            </div>
            <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
            <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${(quizIdx / questions.length) * 100}%` }} />
          </div>
          <div className="bg-amber-50 rounded-2xl p-5 text-center mb-4">
            <p className="text-base font-semibold text-gray-800">{questions[quizIdx].q}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questions[quizIdx].options.map(opt => {
              let cls = "border-gray-200 bg-white text-gray-800 hover:border-amber-300 hover:bg-amber-50";
              if (answered) {
                if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800";
                else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
                else cls = "border-gray-100 bg-gray-50 text-gray-400";
              }
              return (
                <button key={opt} disabled={!!answered} onClick={() => handleAnswer(opt)}
                  className={`border-2 rounded-2xl p-3 font-semibold text-sm text-center transition-all flex items-center justify-center gap-1 ${cls}`}
                  style={opt && /[\u0600-\u06FF]/.test(opt) ? { fontFamily: "serif", direction: "rtl" } : {}}>
                  {opt}
                  {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                  {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Finished
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-800 mb-1">Kuizi Mbaroi!</h3>
        <p className="text-sm text-amber-600 mb-3">Sure: {selectedSurah.name} — {selectedSurah.name_sq}</p>
        <p className="text-6xl font-bold text-amber-600 mb-2">{score}/{questions.length}</p>
        <p className="text-gray-500 mb-6">
          {pct >= 90 ? "Mashallah! Njohuri të shkëlqyera! 🌟" : pct >= 75 ? "Shumë mirë! 👍" : pct >= 60 ? "Mirë, vazhdo! 💪" : "Studjoi suren sërish! 📚"}
        </p>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
          <div className="bg-amber-500 h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={() => startQuiz(selectedSurah)} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-6">
            <RotateCcw className="w-4 h-4 mr-2" /> Provo Sërish
          </Button>
          <Button variant="outline" onClick={() => setSelectedSurah(null)} className="rounded-xl px-6">
            📖 Zgjidh Sure Tjetër
          </Button>
        </div>
      </div>
    );
  }

  return null;
}