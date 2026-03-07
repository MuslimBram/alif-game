import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, Volume2, Search, Heart, CheckCircle, RotateCcw, Trophy, BookMarked, List, SortAsc } from "lucide-react";
import AdminEditOverlay from "@/components/admin/AdminEditOverlay";
import { createPageUrl } from "@/utils";
import SurahQuiz from "@/components/quran/SurahQuiz";
import SurahAudioPlayer from "@/components/quran/SurahAudioPlayer";
import SevapeBox from "@/components/quran/SevapeBox";
import SurahVerseViewer from "@/components/quran/SurahVerseViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

// Revelation order (kronologjike) - indeksi i çdo sureje sipas renditjes së shpalljes
const REVELATION_ORDER = {
  96:1,74:2,73:3,87:4,92:5,89:6,93:7,94:8,103:9,100:10,
  108:11,102:12,107:13,109:14,105:15,113:16,114:17,112:18,53:19,80:20,
  97:21,91:22,85:23,95:24,106:25,101:26,75:27,104:28,77:29,50:30,
  90:31,86:32,54:33,38:34,7:35,72:36,36:37,25:38,35:39,19:40,
  20:41,56:42,26:43,27:44,28:45,17:46,10:47,11:48,12:49,15:50,
  6:51,37:52,31:53,34:54,39:55,40:56,41:57,42:58,43:59,44:60,
  45:61,46:62,51:63,88:64,18:65,16:66,71:67,14:68,21:69,23:70,
  32:71,52:72,67:73,69:74,70:75,78:76,79:77,82:78,84:79,30:80,
  29:81,83:82,2:83,8:84,3:85,33:86,60:87,4:88,99:89,57:90,
  47:91,13:92,55:93,76:94,65:95,98:96,59:97,24:98,22:99,63:100,
  58:101,49:102,66:103,64:104,61:105,62:106,48:107,5:108,9:109,110:110,
};

const SURAHS = [
  { num: 1, name: "Al-Fatiha", name_sq: "Hapja", arabic: "الفاتحة", verses: 7, type: "Mekase", revelation: "Meke" },
  { num: 2, name: "Al-Baqarah", name_sq: "Lopa", arabic: "البقرة", verses: 286, type: "Medinase", revelation: "Medine" },
  { num: 3, name: "Ali 'Imran", name_sq: "Familja e Imranit", arabic: "آل عمران", verses: 200, type: "Medinase", revelation: "Medine" },
  { num: 4, name: "An-Nisa", name_sq: "Gratë", arabic: "النساء", verses: 176, type: "Medinase", revelation: "Medine" },
  { num: 5, name: "Al-Ma'idah", name_sq: "Sofra", arabic: "المائدة", verses: 120, type: "Medinase", revelation: "Medine" },
  { num: 6, name: "Al-An'am", name_sq: "Bagëtia", arabic: "الأنعام", verses: 165, type: "Mekase", revelation: "Meke" },
  { num: 7, name: "Al-A'raf", name_sq: "Lartësirat", arabic: "الأعراف", verses: 206, type: "Mekase", revelation: "Meke" },
  { num: 8, name: "Al-Anfal", name_sq: "Plaçkat e luftës", arabic: "الأنفال", verses: 75, type: "Medinase", revelation: "Medine" },
  { num: 9, name: "At-Tawbah", name_sq: "Pendimi", arabic: "التوبة", verses: 129, type: "Medinase", revelation: "Medine" },
  { num: 10, name: "Yunus", name_sq: "Junusi", arabic: "يونس", verses: 109, type: "Mekase", revelation: "Meke" },
  { num: 11, name: "Hud", name_sq: "Hudi", arabic: "هود", verses: 123, type: "Mekase", revelation: "Meke" },
  { num: 12, name: "Yusuf", name_sq: "Jusufi", arabic: "يوسف", verses: 111, type: "Mekase", revelation: "Meke" },
  { num: 13, name: "Ar-Ra'd", name_sq: "Bubullima", arabic: "الرعد", verses: 43, type: "Medinase", revelation: "Medine" },
  { num: 14, name: "Ibrahim", name_sq: "Ibrahimi", arabic: "إبراهيم", verses: 52, type: "Mekase", revelation: "Meke" },
  { num: 15, name: "Al-Hijr", name_sq: "Hiraxhi", arabic: "الحجر", verses: 99, type: "Mekase", revelation: "Meke" },
  { num: 16, name: "An-Nahl", name_sq: "Bletët", arabic: "النحل", verses: 128, type: "Mekase", revelation: "Meke" },
  { num: 17, name: "Al-Isra", name_sq: "Udhëtimi Naktësor", arabic: "الإسراء", verses: 111, type: "Mekase", revelation: "Meke" },
  { num: 18, name: "Al-Kahf", name_sq: "Shpella", arabic: "الكهف", verses: 110, type: "Mekase", revelation: "Meke" },
  { num: 19, name: "Maryam", name_sq: "Merjemja", arabic: "مريم", verses: 98, type: "Mekase", revelation: "Meke" },
  { num: 20, name: "Ta-Ha", name_sq: "Ta-Ha", arabic: "طه", verses: 135, type: "Mekase", revelation: "Meke" },
  { num: 21, name: "Al-Anbiya", name_sq: "Profetët", arabic: "الأنبياء", verses: 112, type: "Mekase", revelation: "Meke" },
  { num: 22, name: "Al-Hajj", name_sq: "Haxhi", arabic: "الحج", verses: 78, type: "Medinase", revelation: "Medine" },
  { num: 23, name: "Al-Mu'minun", name_sq: "Besimtarët", arabic: "المؤمنون", verses: 118, type: "Mekase", revelation: "Meke" },
  { num: 24, name: "An-Nur", name_sq: "Drita", arabic: "النور", verses: 64, type: "Medinase", revelation: "Medine" },
  { num: 25, name: "Al-Furqan", name_sq: "Dallimi", arabic: "الفرقان", verses: 77, type: "Mekase", revelation: "Meke" },
  { num: 26, name: "Ash-Shu'ara", name_sq: "Poetët", arabic: "الشعراء", verses: 227, type: "Mekase", revelation: "Meke" },
  { num: 27, name: "An-Naml", name_sq: "Milingonat", arabic: "النمل", verses: 93, type: "Mekase", revelation: "Meke" },
  { num: 28, name: "Al-Qasas", name_sq: "Tregjimet", arabic: "القصص", verses: 88, type: "Mekase", revelation: "Meke" },
  { num: 29, name: "Al-'Ankabut", name_sq: "Merimanga", arabic: "العنكبوت", verses: 69, type: "Mekase", revelation: "Meke" },
  { num: 30, name: "Ar-Rum", name_sq: "Romakët", arabic: "الروم", verses: 60, type: "Mekase", revelation: "Meke" },
  { num: 31, name: "Luqman", name_sq: "Llukman", arabic: "لقمان", verses: 34, type: "Mekase", revelation: "Meke" },
  { num: 32, name: "As-Sajdah", name_sq: "Sexhdeja", arabic: "السجدة", verses: 30, type: "Mekase", revelation: "Meke" },
  { num: 33, name: "Al-Ahzab", name_sq: "Grupacioni", arabic: "الأحزاب", verses: 73, type: "Medinase", revelation: "Medine" },
  { num: 34, name: "Saba", name_sq: "Sabeja", arabic: "سبأ", verses: 54, type: "Mekase", revelation: "Meke" },
  { num: 35, name: "Fatir", name_sq: "Krijuesi", arabic: "فاطر", verses: 45, type: "Mekase", revelation: "Meke" },
  { num: 36, name: "Ya-Sin", name_sq: "Ya-Sin", arabic: "يس", verses: 83, type: "Mekase", revelation: "Meke" },
  { num: 37, name: "As-Saffat", name_sq: "Të rreshtuar", arabic: "الصافات", verses: 182, type: "Mekase", revelation: "Meke" },
  { num: 38, name: "Sad", name_sq: "Sad", arabic: "ص", verses: 88, type: "Mekase", revelation: "Meke" },
  { num: 39, name: "Az-Zumar", name_sq: "Grupet", arabic: "الزمر", verses: 75, type: "Mekase", revelation: "Meke" },
  { num: 40, name: "Ghafir", name_sq: "Falësi", arabic: "غافر", verses: 85, type: "Mekase", revelation: "Meke" },
  { num: 41, name: "Fussilat", name_sq: "E shpjeguar", arabic: "فصلت", verses: 54, type: "Mekase", revelation: "Meke" },
  { num: 42, name: "Ash-Shura", name_sq: "Këshillimi", arabic: "الشورى", verses: 53, type: "Mekase", revelation: "Meke" },
  { num: 43, name: "Az-Zukhruf", name_sq: "Zbukurimi", arabic: "الزخرف", verses: 89, type: "Mekase", revelation: "Meke" },
  { num: 44, name: "Ad-Dukhan", name_sq: "Tymi", arabic: "الدخان", verses: 59, type: "Mekase", revelation: "Meke" },
  { num: 45, name: "Al-Jathiyah", name_sq: "Gjunjëzimi", arabic: "الجاثية", verses: 37, type: "Mekase", revelation: "Meke" },
  { num: 46, name: "Al-Ahqaf", name_sq: "Kodrat rëreshora", arabic: "الأحقاف", verses: 35, type: "Mekase", revelation: "Meke" },
  { num: 47, name: "Muhammad", name_sq: "Muhamedi", arabic: "محمد", verses: 38, type: "Medinase", revelation: "Medine" },
  { num: 48, name: "Al-Fath", name_sq: "Çlirimi", arabic: "الفتح", verses: 29, type: "Medinase", revelation: "Medine" },
  { num: 49, name: "Al-Hujurat", name_sq: "Dhomat", arabic: "الحجرات", verses: 18, type: "Medinase", revelation: "Medine" },
  { num: 50, name: "Qaf", name_sq: "Qaf", arabic: "ق", verses: 45, type: "Mekase", revelation: "Meke" },
  { num: 51, name: "Adh-Dhariyat", name_sq: "Erërat shpërndarëse", arabic: "الذاريات", verses: 60, type: "Mekase", revelation: "Meke" },
  { num: 52, name: "At-Tur", name_sq: "Mali", arabic: "الطور", verses: 49, type: "Mekase", revelation: "Meke" },
  { num: 53, name: "An-Najm", name_sq: "Ylli", arabic: "النجم", verses: 62, type: "Mekase", revelation: "Meke" },
  { num: 54, name: "Al-Qamar", name_sq: "Hëna", arabic: "القمر", verses: 55, type: "Mekase", revelation: "Meke" },
  { num: 55, name: "Ar-Rahman", name_sq: "I Gjithëmëshirshmi", arabic: "الرحمن", verses: 78, type: "Medinase", revelation: "Medine" },
  { num: 56, name: "Al-Waqi'ah", name_sq: "Ngjarja", arabic: "الواقعة", verses: 96, type: "Mekase", revelation: "Meke" },
  { num: 57, name: "Al-Hadid", name_sq: "Hekuri", arabic: "الحديد", verses: 29, type: "Medinase", revelation: "Medine" },
  { num: 58, name: "Al-Mujadila", name_sq: "Ajo që ankohej", arabic: "المجادلة", verses: 22, type: "Medinase", revelation: "Medine" },
  { num: 59, name: "Al-Hashr", name_sq: "Grumbullimi", arabic: "الحشر", verses: 24, type: "Medinase", revelation: "Medine" },
  { num: 60, name: "Al-Mumtahanah", name_sq: "Ajo që u provua", arabic: "الممتحنة", verses: 13, type: "Medinase", revelation: "Medine" },
  { num: 61, name: "As-Saff", name_sq: "Rreshtat", arabic: "الصف", verses: 14, type: "Medinase", revelation: "Medine" },
  { num: 62, name: "Al-Jumu'ah", name_sq: "E Premtja", arabic: "الجمعة", verses: 11, type: "Medinase", revelation: "Medine" },
  { num: 63, name: "Al-Munafiqun", name_sq: "Hipokritët", arabic: "المنافقون", verses: 11, type: "Medinase", revelation: "Medine" },
  { num: 64, name: "At-Taghabun", name_sq: "Mashtrimi i ndërsjellë", arabic: "التغابن", verses: 18, type: "Medinase", revelation: "Medine" },
  { num: 65, name: "At-Talaq", name_sq: "Divorci", arabic: "الطلاق", verses: 12, type: "Medinase", revelation: "Medine" },
  { num: 66, name: "At-Tahrim", name_sq: "Ndalimi", arabic: "التحريم", verses: 12, type: "Medinase", revelation: "Medine" },
  { num: 67, name: "Al-Mulk", name_sq: "Mbizotërimi", arabic: "الملك", verses: 30, type: "Mekase", revelation: "Meke" },
  { num: 68, name: "Al-Qalam", name_sq: "Lapsi", arabic: "القلم", verses: 52, type: "Mekase", revelation: "Meke" },
  { num: 69, name: "Al-Haqqah", name_sq: "E vërteta", arabic: "الحاقة", verses: 52, type: "Mekase", revelation: "Meke" },
  { num: 70, name: "Al-Ma'arij", name_sq: "Shkallët ngritëse", arabic: "المعارج", verses: 44, type: "Mekase", revelation: "Meke" },
  { num: 71, name: "Nuh", name_sq: "Nuhu", arabic: "نوح", verses: 28, type: "Mekase", revelation: "Meke" },
  { num: 72, name: "Al-Jinn", name_sq: "Xhinët", arabic: "الجن", verses: 28, type: "Mekase", revelation: "Meke" },
  { num: 73, name: "Al-Muzzammil", name_sq: "I mbështjelli", arabic: "المزمل", verses: 20, type: "Mekase", revelation: "Meke" },
  { num: 74, name: "Al-Muddaththir", name_sq: "I mbuluar", arabic: "المدثر", verses: 56, type: "Mekase", revelation: "Meke" },
  { num: 75, name: "Al-Qiyamah", name_sq: "Ringjallja", arabic: "القيامة", verses: 40, type: "Mekase", revelation: "Meke" },
  { num: 76, name: "Al-Insan", name_sq: "Njeriu", arabic: "الإنسان", verses: 31, type: "Medinase", revelation: "Medine" },
  { num: 77, name: "Al-Mursalat", name_sq: "Të dërguarit", arabic: "المرسلات", verses: 50, type: "Mekase", revelation: "Meke" },
  { num: 78, name: "An-Naba", name_sq: "Lajmi", arabic: "النبأ", verses: 40, type: "Mekase", revelation: "Meke" },
  { num: 79, name: "An-Nazi'at", name_sq: "Ata që heqin", arabic: "النازعات", verses: 46, type: "Mekase", revelation: "Meke" },
  { num: 80, name: "'Abasa", name_sq: "Vrenjti", arabic: "عبس", verses: 42, type: "Mekase", revelation: "Meke" },
  { num: 81, name: "At-Takwir", name_sq: "Mbyllja e diellit", arabic: "التكوير", verses: 29, type: "Mekase", revelation: "Meke" },
  { num: 82, name: "Al-Infitar", name_sq: "Çarja", arabic: "الانفطار", verses: 19, type: "Mekase", revelation: "Meke" },
  { num: 83, name: "Al-Mutaffifin", name_sq: "Mashtrueset", arabic: "المطففين", verses: 36, type: "Mekase", revelation: "Meke" },
  { num: 84, name: "Al-Inshiqaq", name_sq: "Shpërbërja", arabic: "الانشقاق", verses: 25, type: "Mekase", revelation: "Meke" },
  { num: 85, name: "Al-Buruj", name_sq: "Yjet e mëdha", arabic: "البروج", verses: 22, type: "Mekase", revelation: "Meke" },
  { num: 86, name: "At-Tariq", name_sq: "Ylli i natës", arabic: "الطارق", verses: 17, type: "Mekase", revelation: "Meke" },
  { num: 87, name: "Al-A'la", name_sq: "I Larti", arabic: "الأعلى", verses: 19, type: "Mekase", revelation: "Meke" },
  { num: 88, name: "Al-Ghashiyah", name_sq: "Ngjarja mbulojnë", arabic: "الغاشية", verses: 26, type: "Mekase", revelation: "Meke" },
  { num: 89, name: "Al-Fajr", name_sq: "Agimi", arabic: "الفجر", verses: 30, type: "Mekase", revelation: "Meke" },
  { num: 90, name: "Al-Balad", name_sq: "Qyteti", arabic: "البلد", verses: 20, type: "Mekase", revelation: "Meke" },
  { num: 91, name: "Ash-Shams", name_sq: "Dielli", arabic: "الشمس", verses: 15, type: "Mekase", revelation: "Meke" },
  { num: 92, name: "Al-Layl", name_sq: "Nata", arabic: "الليل", verses: 21, type: "Mekase", revelation: "Meke" },
  { num: 93, name: "Ad-Duha", name_sq: "Mëngjesi", arabic: "الضحى", verses: 11, type: "Mekase", revelation: "Meke" },
  { num: 94, name: "Ash-Sharh", name_sq: "Hapja e gjoksit", arabic: "الشرح", verses: 8, type: "Mekase", revelation: "Meke" },
  { num: 95, name: "At-Tin", name_sq: "Fiku", arabic: "التين", verses: 8, type: "Mekase", revelation: "Meke" },
  { num: 96, name: "Al-'Alaq", name_sq: "Gjaku i mpiksur", arabic: "العلق", verses: 19, type: "Mekase", revelation: "Meke" },
  { num: 97, name: "Al-Qadr", name_sq: "Nata e Kadrit", arabic: "القدر", verses: 5, type: "Mekase", revelation: "Meke" },
  { num: 98, name: "Al-Bayyinah", name_sq: "Dëshmi e qartë", arabic: "البينة", verses: 8, type: "Medinase", revelation: "Medine" },
  { num: 99, name: "Az-Zalzalah", name_sq: "Tërmeti", arabic: "الزلزلة", verses: 8, type: "Medinase", revelation: "Medine" },
  { num: 100, name: "Al-'Adiyat", name_sq: "Kalorëset", arabic: "العاديات", verses: 11, type: "Mekase", revelation: "Meke" },
  { num: 101, name: "Al-Qari'ah", name_sq: "Goditja", arabic: "القارعة", verses: 11, type: "Mekase", revelation: "Meke" },
  { num: 102, name: "At-Takathur", name_sq: "Grumbullimi i pasurisë", arabic: "التكاثر", verses: 8, type: "Mekase", revelation: "Meke" },
  { num: 103, name: "Al-'Asr", name_sq: "Koha", arabic: "العصر", verses: 3, type: "Mekase", revelation: "Meke" },
  { num: 104, name: "Al-Humazah", name_sq: "Shpifësi", arabic: "الهمزة", verses: 9, type: "Mekase", revelation: "Meke" },
  { num: 105, name: "Al-Fil", name_sq: "Elefanti", arabic: "الفيل", verses: 5, type: "Mekase", revelation: "Meke" },
  { num: 106, name: "Quraysh", name_sq: "Kurejshi", arabic: "قريش", verses: 4, type: "Mekase", revelation: "Meke" },
  { num: 107, name: "Al-Ma'un", name_sq: "Ndihma e vogël", arabic: "الماعون", verses: 7, type: "Mekase", revelation: "Meke" },
  { num: 108, name: "Al-Kawthar", name_sq: "Kautherit", arabic: "الكوثر", verses: 3, type: "Mekase", revelation: "Meke" },
  { num: 109, name: "Al-Kafirun", name_sq: "Mohuesit", arabic: "الكافرون", verses: 6, type: "Mekase", revelation: "Meke" },
  { num: 110, name: "An-Nasr", name_sq: "Ndihma", arabic: "النصر", verses: 3, type: "Medinase", revelation: "Medine" },
  { num: 111, name: "Al-Masad", name_sq: "Fijat e palmës", arabic: "المسد", verses: 5, type: "Mekase", revelation: "Meke" },
  { num: 112, name: "Al-Ikhlas", name_sq: "Sinqeriteti", arabic: "الإخلاص", verses: 4, type: "Mekase", revelation: "Meke" },
  { num: 113, name: "Al-Falaq", name_sq: "Agimi i ditës", arabic: "الفلق", verses: 5, type: "Mekase", revelation: "Meke" },
  { num: 114, name: "An-Nas", name_sq: "Njerëzit", arabic: "الناس", verses: 6, type: "Mekase", revelation: "Meke" },
];

const ALL_QUIZ_QUESTIONS = [
  { q: "Cila sure është e para sipas renditjes në Kur'an?", options: ["Al-Baqarah", "Al-Fatiha", "Al-'Alaq", "Al-Ikhlas"], correct: "Al-Fatiha" },
  { q: "Cila sure është shpallur e para (kronologjikisht)?", options: ["Al-Fatiha", "Al-Baqarah", "Al-'Alaq", "Al-Mudaththir"], correct: "Al-'Alaq" },
  { q: "Sa ajete ka Sure Al-Baqarah?", options: ["200", "256", "286", "300"], correct: "286" },
  { q: "Cila sure ka vetëm 3 ajete (e shkurtër)?", options: ["Al-Ikhlas", "Al-Kawthar", "An-Nasr", "Al-Falaq"], correct: "Al-Kawthar" },
  { q: "Sa sure ka Kur'ani?", options: ["100", "110", "114", "120"], correct: "114" },
  { q: "Sureja Al-Fatiha quhet ndryshe?", options: ["Umm Al-Quran", "Al-Mulk", "Ya-Sin", "Al-Baqarah"], correct: "Umm Al-Quran" },
  { q: "Sa ajete ka Sure Al-Ikhlas?", options: ["3", "4", "5", "6"], correct: "4" },
  { q: "Cila sure quhet 'Zemra e Kur'anit'?", options: ["Al-Fatiha", "Al-Baqarah", "Ya-Sin", "Al-Mulk"], correct: "Ya-Sin" },
  { q: "Sureja Al-Kahf - sa ajete ka?", options: ["100", "110", "120", "108"], correct: "110" },
  { q: "Ku ndodhet Ajetu'l-Kursi?", options: ["Al-Fatiha", "Al-Baqarah ajet 255", "Al-Ikhlas", "Al-Mulk"], correct: "Al-Baqarah ajet 255" },
  { q: "Sureja Al-Mulk sa ajete ka?", options: ["25", "28", "30", "32"], correct: "30" },
  { q: "Sa xhuz ka Kur'ani?", options: ["20", "25", "30", "114"], correct: "30" },
  { q: "Cila sure është e fundit kronologjikisht?", options: ["An-Nas", "Al-Ikhlas", "An-Nasr", "Al-Ma'idah"], correct: "An-Nasr" },
  { q: "Sure Ar-Rahman - çfarë ajeti përsëritet 31 herë?", options: ["Subhanallah", "Alhamdulillah", "Allahu Akbar", "Febe ejje ala'i rabbikuma tukedhdhibani"], correct: "Febe ejje ala'i rabbikuma tukedhdhibani" },
  { q: "Sa ajete ka Sure Al-Fatiha?", options: ["5", "6", "7", "8"], correct: "7" },
  { q: "Cila sure ka 286 ajete dhe quhet 'Lopa'?", options: ["Al-Fatiha", "Al-Baqarah", "Ali Imran", "An-Nisa"], correct: "Al-Baqarah" },
  { q: "Cila sure ka 200 ajete dhe i kushtohet Familjes së Imranit?", options: ["Al-Baqarah", "Ali Imran", "An-Nisa", "Al-Ma'idah"], correct: "Ali Imran" },
  { q: "Sa ajete ka Sure An-Nas (e fundit)?", options: ["4", "5", "6", "7"], correct: "6" },
  { q: "Sa ajete ka Sure Al-Falaq?", options: ["4", "5", "6", "7"], correct: "5" },
  { q: "Cila sure i kushtohet Profetit Nuh (Noe)?", options: ["Sure 70", "Sure 71", "Sure 72", "Sure 73"], correct: "Sure 71" },
  { q: "Sure Al-'Asr ka sa ajete?", options: ["2", "3", "4", "5"], correct: "3" },
  { q: "Cila sure ka 227 ajete dhe quhet 'Poetët'?", options: ["Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas"], correct: "Ash-Shu'ara" },
  { q: "Sa ajete ka Sure Al-Qadr (Nata e Kadrit)?", options: ["4", "5", "6", "7"], correct: "5" },
  { q: "Cila sure i kushtohet profetit Jusufit dhe konsiderohet 'tregimi më i bukur'?", options: ["Sure Yunus", "Sure Yusuf", "Sure Ibrahim", "Sure Hud"], correct: "Sure Yusuf" },
  { q: "Cila sure quhet 'Mbrojtëse nga syhakësia'?", options: ["Al-Fatiha", "Al-Falaq dhe An-Nas", "Al-Ikhlas", "Al-Baqarah"], correct: "Al-Falaq dhe An-Nas" },
  { q: "Sa ajete ka Sure Al-Baqarah dhe Al-Fatiha bashkë?", options: ["289", "291", "293", "295"], correct: "293" },
  { q: "Numri i sureve Mekase në Kur'an (të zbritura në Meke)?", options: ["Rreth 86", "Rreth 92", "Rreth 100", "Rreth 106"], correct: "Rreth 86" },
  { q: "Cila sure ka ajetet 'La ilahe illallah' si temë kryesore?", options: ["Al-Fatiha", "Al-Ikhlas", "Al-Kafirun", "Al-Baqarah"], correct: "Al-Ikhlas" },
  { q: "Sureja Al-Insan (Njeriu) cilës kategorie i përket?", options: ["Mekase", "Medinase", "Meso ose Meso", "Asnjëra"], correct: "Medinase" },
  { q: "Cila sure ka verstin 'Allahu la ilahe illa Huvel Hayyul Qayyum'?", options: ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas", "Al-Mulk"], correct: "Al-Baqarah" },
];

// Generate shuffled questions for quiz
function getShuffledQuestions() {
  return [...ALL_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
}

const STORAGE_KEY = "quran_progress";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export default function Quran({ adminEditMode, isAdmin }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("te_gjitha");
  const [sortMode, setSortMode] = useState("mushaf"); // mushaf | revelation | favorites
  const [expanded, setExpanded] = useState(null);
  const [tab, setTab] = useState("suret"); // suret | quiz | progress
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("quran_favorites") || "[]"); } catch { return []; }
  });
  const [progress, setProgress] = useState(loadProgress); // { [num]: "memorized" | "learning" | "read" }
  const [lastRead, setLastRead] = useState(() => {
    try { return parseInt(localStorage.getItem("quran_last_read") || "1"); } catch { return 1; }
  });
  const [verseViewSurah, setVerseViewSurah] = useState(null);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (!quizStarted || quizFinished || tab !== "quiz") return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, quizStarted, quizFinished, tab, quizIdx]);

  const startQuiz = () => {
    const shuffled = getShuffledQuestions();
    setQuizQuestions(shuffled);
    setQuizIdx(0); setAnswered(null); setScore(0); setTimer(20);
    setQuizFinished(false); setQuizStarted(true);
  };

  const handleAnswer = (opt) => {
    if (answered !== null || quizQuestions.length === 0) return;
    const currentQ = quizQuestions[quizIdx];
    const isCorrect = opt === currentQ.correct;
    setAnswered({ selected: opt, correct: currentQ.correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= quizQuestions.length) { setQuizFinished(true); return; }
      setQuizIdx(i => i + 1); setTimer(20); setAnswered(null);
    }, 1300);
  };

  const toggleFavorite = (num) => {
    const next = favorites.includes(num) ? favorites.filter(f => f !== num) : [...favorites, num];
    setFavorites(next);
    localStorage.setItem("quran_favorites", JSON.stringify(next));
  };

  const markProgress = (num, status) => {
    const next = { ...progress, [num]: status };
    setProgress(next);
    saveProgress(next);
    setLastRead(num);
    localStorage.setItem("quran_last_read", num.toString());
  };

  const speakArabic = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar-SA";
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.startsWith("ar"));
    if (arVoice) u.voice = arVoice;
    u.rate = 0.6;
    window.speechSynthesis.speak(u);
  };

  const getSorted = (list) => {
    if (sortMode === "revelation") return [...list].sort((a, b) => (REVELATION_ORDER[a.num] || 999) - (REVELATION_ORDER[b.num] || 999));
    if (sortMode === "favorites") return list.filter(s => favorites.includes(s.num));
    return list;
  };

  const filtered = getSorted(SURAHS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.name_sq.toLowerCase().includes(search.toLowerCase()) ||
      s.arabic.includes(search) ||
      s.num.toString() === search;
    const matchType = filter === "te_gjitha" || s.type.toLowerCase() === filter;
    return matchSearch && matchType;
  }));

  const memorized = Object.values(progress).filter(v => v === "memorized").length;
  const learning = Object.values(progress).filter(v => v === "learning").length;
  const read = Object.values(progress).filter(v => v === "read").length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 relative">
      <AdminEditOverlay show={adminEditMode && isAdmin} title="Edito Kuranin" items={[
        { label: "Menaxho Suret", href: createPageUrl("AdminPanel"), icon: "📖" },
      ]} />
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Kur'ani Famëlartë</h1>
            <p className="text-sm text-gray-500">114 Suretu — Me gjurmim progresi dhe favoritet</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { label: "Suretu", value: "114", icon: "📖" },
            { label: "Mësuar", value: memorized, icon: "✅" },
            { label: "Duke mësuar", value: learning, icon: "📚" },
            { label: "Lexuar", value: read, icon: "👁️" },
          ].map(stat => (
            <div key={stat.label} className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-amber-700">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Last read indicator */}
        {lastRead && progress[lastRead] && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 flex items-center gap-2 mb-4">
            <BookMarked className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-700 font-medium">
              Ke ngelur te: Sure {lastRead} — {SURAHS.find(s => s.num === lastRead)?.name}
            </span>
            <button onClick={() => setExpanded(lastRead)} className="ml-auto text-xs text-emerald-600 underline">Shko</button>
          </div>
        )}
      </div>

      {/* Main Tabs */}
      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl w-fit">
        {[
          { val: "suret", label: "📖 Suret" },
          { val: "quiz", label: "🎯 Kuiz" },
          { val: "progress", label: "📊 Progresi" },
        ].map(t => (
          <button key={t.val} onClick={() => setTab(t.val)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.val ? "bg-white shadow text-amber-700" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* SURET TAB */}
      {tab === "suret" && (
        <>
          {/* Search + Filter */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-48">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Kërko sure..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { val: "te_gjitha", label: "Të Gjitha" },
                { val: "mekase", label: "Mekase" },
                { val: "medinase", label: "Medinase" },
              ].map(f => (
                <button key={f.val} onClick={() => setFilter(f.val)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${filter === f.val ? "bg-amber-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-amber-300"}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort mode */}
          <div className="flex gap-2 mb-4">
            {[
              { val: "mushaf", icon: <List className="w-3.5 h-3.5" />, label: "Mushaf" },
              { val: "revelation", icon: <SortAsc className="w-3.5 h-3.5" />, label: "Shpallja" },
              { val: "favorites", icon: <Heart className="w-3.5 h-3.5" />, label: `Favoritet (${favorites.length})` },
            ].map(s => (
              <button key={s.val} onClick={() => setSortMode(s.val)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${sortMode === s.val ? "bg-amber-500 text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-400 mb-3">{filtered.length} suretu</p>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              {sortMode === "favorites" ? "Nuk ke shtuar favoritet ende. Klikoni zemrën te ndonjë sure." : "Asnjë sure nuk u gjet."}
            </div>
          )}

          <div className="space-y-2">
            {filtered.map((surah) => {
              const revOrder = REVELATION_ORDER[surah.num];
              const isFav = favorites.includes(surah.num);
              const prog = progress[surah.num];
              return (
                <motion.div key={surah.num} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                  <div className="w-full flex items-center gap-3 p-4">
                    {/* Number */}
                    <button onClick={() => setExpanded(expanded === surah.num ? null : surah.num)}
                      className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-amber-700 text-sm flex-shrink-0">
                      {surah.num}
                    </button>

                    {/* Info */}
                    <button className="flex-1 text-left" onClick={() => setExpanded(expanded === surah.num ? null : surah.num)}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900">{surah.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{surah.name_sq}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${surah.type === "Mekase" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>{surah.type}</span>
                        {prog && <span className={`text-xs px-2 py-0.5 rounded-full ${prog === "memorized" ? "bg-emerald-100 text-emerald-700" : prog === "learning" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>{prog === "memorized" ? "✅ Mësuar" : prog === "learning" ? "📚 Duke mësuar" : "👁️ Lexuar"}</span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{surah.verses} ajete{revOrder ? ` · Shpallje #${revOrder}` : ""}</p>
                    </button>

                    {/* Arabic + Controls */}
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-gray-800 hidden sm:block" style={{ fontFamily: "serif", direction: "rtl" }}>{surah.arabic}</p>
                      <button onClick={e => { e.stopPropagation(); toggleFavorite(surah.num); }}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isFav ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-300 hover:text-red-400"}`}>
                        <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                      </button>
                      <button onClick={() => setExpanded(expanded === surah.num ? null : surah.num)}>
                        {expanded === surah.num ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                   {expanded === surah.num && (
                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                       className="border-t border-gray-100 bg-gray-50">
                       <div className="p-5 space-y-4">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div>
                             <h4 className="text-sm font-bold text-gray-700 mb-3">Informacione</h4>
                             <div className="space-y-1.5">
                               {[
                                 { label: "Numri (Mushaf)", value: surah.num },
                                 { label: "Renditja e Shpalljes", value: revOrder ? `#${revOrder} nga 114` : "—" },
                                 { label: "Emri Latin", value: surah.name },
                                 { label: "Emri Shqip", value: surah.name_sq },
                                 { label: "Lloji", value: surah.type },
                                 { label: "Zbritja", value: surah.revelation },
                                 { label: "Numri i Ajeteve", value: surah.verses },
                               ].map(item => (
                                 <div key={item.label} className="flex justify-between text-sm">
                                   <span className="text-gray-500">{item.label}:</span>
                                   <span className="font-medium text-gray-800">{item.value}</span>
                                 </div>
                               ))}
                             </div>
                             {/* Minimumi i Sevapeve */}
                             <SevapeBox surah={surah} />
                           </div>
                           <div className="space-y-3">
                             <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
                               <p className="text-xs text-amber-600 mb-2 font-medium">Bismillah</p>
                               <p className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "serif", direction: "rtl" }}>{surah.arabic}</p>
                               <p className="text-xs text-gray-400 italic mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                               <Button size="sm" onClick={() => {
                                 const audio = new Audio(`https://everyayah.com/data/Alafasy_128kbps/${String(surah.num).padStart(3,'0')}001.mp3`);
                                 audio.play().catch(() => speakArabic(surah.name));
                               }} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
                                 <Volume2 className="w-3.5 h-3.5 mr-1.5" /> Dëgjo Suren
                               </Button>
                             </div>
                             {/* Verse viewer button */}
                             <button
                               onClick={() => setVerseViewSurah(surah)}
                               className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold hover:opacity-90 transition-all shadow-md"
                             >
                               📖 Lexo Ajetet — Ajet pas Ajeti
                             </button>
                             {/* Progress marking */}
                             <div className="bg-white rounded-xl p-3 border border-gray-100">
                               <p className="text-xs font-semibold text-gray-600 mb-2">Shëno Progresin:</p>
                               <div className="flex gap-2 flex-wrap">
                                 {[
                                   { val: "read", label: "👁️ Lexova", cls: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
                                   { val: "learning", label: "📚 Duke mësuar", cls: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
                                   { val: "memorized", label: "✅ Mësova", cls: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
                                 ].map(p => (
                                   <button key={p.val} onClick={() => markProgress(surah.num, p.val)}
                                     className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border-2 ${progress[surah.num] === p.val ? "border-emerald-400 ring-2 ring-emerald-200" : "border-transparent"} ${p.cls}`}>
                                     {p.label}
                                   </button>
                                 ))}
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {/* Verse Viewer Modal */}
      {verseViewSurah && (
        <SurahVerseViewer surah={verseViewSurah} onClose={() => setVerseViewSurah(null)} />
      )}

      {/* QUIZ TAB */}
      {tab === "quiz" && <SurahQuiz />}

      {/* PROGRESS TAB */}
      {tab === "progress" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Mësuar", count: memorized, color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "✅" },
              { label: "Duke mësuar", count: learning, color: "bg-blue-100 text-blue-700 border-blue-200", icon: "📚" },
              { label: "Lexuar", count: read, color: "bg-gray-100 text-gray-700 border-gray-200", icon: "👁️" },
            ].map(s => (
              <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.color}`}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-3xl font-bold">{s.count}/114</div>
                <div className="text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm font-bold text-gray-700 mb-3">Progresi Total</p>
            <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
              <div className="bg-emerald-500 h-4 rounded-full transition-all" style={{ width: `${(memorized / 114) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-500">{memorized} nga 114 sure të mësuara ({Math.round((memorized / 114) * 100)}%)</p>
          </div>

          {/* List of tracked surahs */}
          {Object.keys(progress).length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>Nuk ke shënuar asnjë progres ende.</p>
              <p className="text-sm mt-1">Shko te "Suret" dhe kliko mbi ndonjë sure për të shënuar progresin.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {Object.entries(progress).sort(([a], [b]) => parseInt(a) - parseInt(b)).map(([num, status]) => {
                const s = SURAHS.find(x => x.num === parseInt(num));
                if (!s) return null;
                return (
                  <div key={num} className="flex items-center gap-3 px-4 py-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-xs font-bold text-amber-700">{num}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.name_sq} · {s.verses} ajete</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${status === "memorized" ? "bg-emerald-100 text-emerald-700" : status === "learning" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                      {status === "memorized" ? "✅ Mësuar" : status === "learning" ? "📚 Duke mësuar" : "👁️ Lexuar"}
                    </span>
                    <button onClick={() => { const n = { ...progress }; delete n[num]; setProgress(n); saveProgress(n); }}
                      className="text-gray-300 hover:text-red-400 transition-colors text-lg">×</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}