import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Languages, Gamepad2, BookMarked, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import AdminCardOverlay from "@/components/admin/AdminCardOverlay";

export default function HeroSection({ stats, adminEditMode }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">Platformë e plotë edukative


          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Mirë se vini në{" "}
            <span className="text-gradient">Edukim Interaktiv</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-6 leading-relaxed">
            Mëso alfabetin në 3 gjuhë, Kuranin me texhuid dhe ritualet e Umras dhe Haxhit. Duke u argëtuar.
          </p>

          <div className="bg-white/70 backdrop-blur-sm border border-emerald-100 rounded-2xl px-6 py-4 max-w-xl mx-auto mb-10">
            <p className="text-sm text-emerald-800 font-medium italic text-center leading-relaxed">
              🌿 <strong>"Njerëzit më të mirë ndër ju janë ata që mësojnë Kur'anin dhe ua mësojnë të tjerëve."</strong>
            </p>
            <p className="text-xs text-emerald-500 text-center mt-1">— Transmeton Buhariu</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">

          {[
          { label: "Mësime Aktive", value: stats.lessons, icon: "⏱" },
          { label: "Të Kompletuara", value: stats.completed, icon: "🏆" },
          { label: "Rezultat Mesatar", value: stats.avgScore + "%", icon: "✨" }].
          map((stat, i) =>
          <div
            key={i}
            className="glass-card rounded-2xl px-8 py-5 min-w-[160px] hover:shadow-lg transition-shadow">

              <span className="text-2xl mb-1 block">{stat.icon}</span>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          )}
        </motion.div>

        {/* Main learning sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">

          {[
          {
            title: "🔤 Alfabeti",
            color: "from-blue-500 to-cyan-500",
            border: "border-blue-200",
            page: "AlphabetMain",
            items: [
            { name: "Numrat", page: "Alphabet" },
            { name: "Germët", page: "Alphabet" },
            { name: "Rrokjet", page: "Alphabet" },
            { name: "Fjalët", page: "Alphabet" },
            { name: "Zgjedhimi", page: "Alphabet" },
            { name: "Lakimi", page: "Alphabet" }]

          },
          {
            title: "🕌 Arabisht Medinë",
            color: "from-green-500 to-emerald-600",
            border: "border-emerald-200",
            page: "MedineArabicMain",
            items: [
            { name: "Fillestar", page: "MedineArabicMain" },
            { name: "Mesatar", page: "MedineArabicMain" },
            { name: "Avancuar", page: "MedineArabicMain" },
            { name: "Profesionist", page: "MedineArabicMain" },
            { name: "Mësimet", page: "MedineArabicMain" }]

          },
          {
            title: "📖 Kur'ani & Texhuidi",
            color: "from-amber-500 to-orange-500",
            border: "border-amber-200",
            page: "Quran",
            items: [
            { name: "Suret me Audio", page: "Quran" },
            { name: "Texhuidi", page: "Tajweed" },
            { name: "Rregullat Tajweed", page: "Tajweed" },
            { name: "Kuiz Kurani", page: "Quran" },
            { name: "Sevapet", page: "Quran" }]

          }].
          map((section, idx) =>
          <AdminCardOverlay
            key={idx}
            show={!!adminEditMode}
            editHref={createPageUrl(section.page)}
            label={section.title}>

              
















            </AdminCardOverlay>
          )}
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">

          {[
          { name: "Alfabeti", page: "Alphabet", icon: Languages, color: "from-emerald-500 to-teal-500" },
          { name: "Kur'ani", page: "Quran", icon: BookOpen, color: "from-amber-500 to-orange-500" },
          { name: "Texhuidi", page: "Tajweed", icon: BookMarked, color: "from-violet-500 to-purple-500" },
          { name: "Umra & Haxhi", page: "UmraHajj", icon: MapPin, color: "from-teal-500 to-cyan-500" },
          { name: "Fikh Elementar", page: "FE", icon: Star, color: "from-green-500 to-emerald-600" },
          { name: "Lojëra", page: "Games", icon: Gamepad2, color: "from-pink-500 to-rose-500" }].
          map((item) => {
            const Icon = item.icon;
            return (
              <AdminCardOverlay
                key={item.page}
                show={!!adminEditMode}
                editHref={createPageUrl(item.page)}
                label={item.name}>

                







              </AdminCardOverlay>);

          })}
        </motion.div>
      </div>
    </section>);

}