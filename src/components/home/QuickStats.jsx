import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { BookOpen, Gamepad2, MapPin, Star, BookMarked, Languages } from "lucide-react";

const QUICK_LINKS = [
  {
    title: "Namazi Hap-pas-Hapi",
    desc: "Mëso mënyrën e saktë të faljes me arabisht",
    page: "FE",
    emoji: "🤲",
    color: "from-emerald-500 to-teal-500",
    tab: "namazi"
  },
  {
    title: "Duatë e Përditshme",
    desc: "10 dua me arabisht, transliterim dhe shqip",
    page: "FE",
    emoji: "🌿",
    color: "from-green-500 to-emerald-500",
    tab: "duate"
  },
  {
    title: "Kur'ani me Tafsir",
    desc: "Lexo ajete me kuptim dhe shpjegim shqip",
    page: "Quran",
    emoji: "📖",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Texhuidi i Integruar",
    desc: "15+ rregulla texhuidi me shembuj",
    page: "Tajweed",
    emoji: "🎓",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Umra & Haxhi",
    desc: "Udhëzues hap-pas-hapi me dua",
    page: "UmraHajj",
    emoji: "🕋",
    color: "from-teal-500 to-cyan-500",
  },
  {
    title: "Lojëra Edukative",
    desc: "60+ kuize me pikë dhe sfida",
    page: "Games",
    emoji: "🎮",
    color: "from-pink-500 to-rose-500",
  },
];

export default function QuickStats() {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Star className="w-5 h-5 text-amber-500" />
        Akses i Shpejtë
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {QUICK_LINKS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={createPageUrl(item.page)}
              className="block bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform`}>
                {item.emoji}
              </div>
              <p className="font-bold text-gray-800 text-sm leading-tight">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}