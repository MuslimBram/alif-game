import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, BookOpen, Languages, Gamepad2, BookMarked } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection({ stats }) {
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

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">Mëso alfabetin në 3 gjuhë, Kuranin me texhuid dhe ritualet e Umras dhe Haxhit. Duke u argëtuar.

          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">

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

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">

          {[
          { name: "Alfabeti", page: "Alphabet", icon: Languages, color: "from-emerald-500 to-teal-500" },
          { name: "Texhuidi", page: "Tajweed", icon: BookMarked, color: "from-amber-500 to-orange-500" },
          { name: "Lojëra", page: "Games", icon: Gamepad2, color: "from-pink-500 to-rose-500" },
          { name: "Përparimi", page: "Progress", icon: BookOpen, color: "from-blue-500 to-indigo-500" }].
          map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className="group glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
              </Link>);

          })}
        </motion.div>
      </div>
    </section>);

}