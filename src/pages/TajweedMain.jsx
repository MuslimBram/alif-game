import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookMarked, ChevronRight } from "lucide-react";

const SECTIONS = [
  { title: "Rregulla", page: "Tajweed", desc: "Mësoni rregullat e texhuidit" },
  { title: "Praktikë", page: "Tajweed", desc: "Ushtrime interaktive" },
  { title: "Audio", page: "Tajweed", desc: "Dëgjoni shembuj të sakt" },
  { title: "Ushtrime", page: "Tajweed", desc: "Testo aftësitë e tua" },
  { title: "Testim", page: "Tajweed", desc: "Vlerësimi përfundimtar" }
];

export default function TajweedMain() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BookMarked className="w-8 h-8" />
          <h1 className="text-3xl font-extrabold">📖 Texhuidi</h1>
        </div>
        <p className="text-purple-100">Mëso artin e recitimit të Kuranit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((section, idx) => (
          <Link
            key={idx}
            to={createPageUrl(section.page)}
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-purple-200 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-600 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}