import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, ChevronRight } from "lucide-react";

const LEVELS = [
  { title: "Fillestar", desc: "Libri i Parë", level: "fillestar" },
  { title: "Mesatar", desc: "Libri i Dytë", level: "mesatar" },
  { title: "Avancuar", desc: "Libri i Tretë", level: "avancuar" },
  { title: "Profesionist", desc: "Libri i Katërt", level: "profesionist" }
];

export default function MedineArabicMain() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-3xl font-extrabold">🕌 Arabisht Medinë</h1>
        </div>
        <p className="text-green-100">Mëso arabishten klasike me metodën e Medinës</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEVELS.map((level, idx) => (
          <Link
            key={idx}
            to={createPageUrl("Alphabet")}
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-green-200 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{level.title}</h3>
                <p className="text-sm text-gray-500">{level.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}