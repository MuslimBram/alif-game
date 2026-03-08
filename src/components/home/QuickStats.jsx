import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { BookOpen, Gamepad2, MapPin, Star, BookMarked, Languages } from "lucide-react";
import AdminCardOverlay from "@/components/admin/AdminCardOverlay";

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
  color: "from-amber-500 to-orange-500"
},
{
  title: "Texhuidi i Integruar",
  desc: "15+ rregulla texhuidi me shembuj",
  page: "Tajweed",
  emoji: "🎓",
  color: "from-violet-500 to-purple-500"
},
{
  title: "Umra & Haxhi",
  desc: "Udhëzues hap-pas-hapi me dua",
  page: "UmraHajj",
  emoji: "🕋",
  color: "from-teal-500 to-cyan-500"
},
{
  title: "Lojëra Edukative",
  desc: "60+ kuize me pikë dhe sfida",
  page: "Games",
  emoji: "🎮",
  color: "from-pink-500 to-rose-500"
}];


export default function QuickStats({ adminEditMode }) {
  return null;


































}