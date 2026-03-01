import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, Volume2, Search, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const JUZ_SHORT = [
  { juz: 1, from: 1, to: 2 }, { juz: 2, from: 2, to: 2 }, { juz: 3, from: 2, to: 3 },
  { juz: 30, from: 78, to: 114 },
];

export default function Quran() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("te_gjitha"); // te_gjitha | mekase | medinase
  const [expanded, setExpanded] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list | juz

  const filtered = SURAHS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.name_sq.toLowerCase().includes(search.toLowerCase()) ||
      s.arabic.includes(search) ||
      s.num.toString() === search;
    const matchType = filter === "te_gjitha" || s.type.toLowerCase() === filter;
    return matchSearch && matchType;
  });

  const speakArabic = (text) => {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar";
    u.rate = 0.6;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Kur'ani Famëlartë</h1>
            <p className="text-sm text-gray-500">114 Suretu — Lista e plotë me informacione</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "Suretu", value: "114", icon: "📖" },
            { label: "Ayete gjithsej", value: "6,236", icon: "📝" },
            { label: "Xhuz'e", value: "30", icon: "🔖" },
          ].map(stat => (
            <div key={stat.label} className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-amber-700">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Kërko sure (emri, numri...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          {[
            { val: "te_gjitha", label: "Të Gjitha" },
            { val: "mekase", label: "Mekase" },
            { val: "medinase", label: "Medinase" },
          ].map(f => (
            <button key={f.val} onClick={() => setFilter(f.val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f.val ? "bg-amber-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-amber-300"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4">{filtered.length} suretu gjetur</p>

      {/* Surah list */}
      <div className="space-y-2">
        {filtered.map((surah) => (
          <motion.div
            key={surah.num}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all"
          >
            <button
              className="w-full flex items-center gap-4 p-4"
              onClick={() => setExpanded(expanded === surah.num ? null : surah.num)}
            >
              {/* Number */}
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-amber-700 text-sm flex-shrink-0">
                {surah.num}
              </div>

              {/* Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{surah.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{surah.name_sq}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${surah.type === "Mekase" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                    {surah.type}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{surah.verses} ajete</p>
              </div>

              {/* Arabic name */}
              <div className="text-right mr-2">
                <p className="text-xl font-bold text-gray-800" style={{ fontFamily: "serif", direction: "rtl" }}>{surah.arabic}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={e => { e.stopPropagation(); speakArabic(surah.arabic); }}
                  className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center hover:bg-teal-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-teal-600" />
                </button>
                {expanded === surah.num
                  ? <ChevronUp className="w-4 h-4 text-gray-400" />
                  : <ChevronDown className="w-4 h-4 text-gray-400" />
                }
              </div>
            </button>

            <AnimatePresence>
              {expanded === surah.num && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-100 bg-gray-50"
                >
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-700 mb-3">Informacione</h4>
                      <div className="space-y-2">
                        {[
                          { label: "Numri", value: surah.num },
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
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
                      <p className="text-xs text-amber-600 mb-2 font-medium">Emri Arabisht</p>
                      <p className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "serif", direction: "rtl" }}>
                        {surah.arabic}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                      <p className="text-xs text-gray-400 italic">Bismillahi r-Rahmani r-Rahim</p>
                      <Button
                        size="sm"
                        onClick={() => speakArabic(surah.arabic)}
                        className="mt-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
                      >
                        <Volume2 className="w-3.5 h-3.5 mr-1.5" /> Dëgjo
                      </Button>
                    </div>
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