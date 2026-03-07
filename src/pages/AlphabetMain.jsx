import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Languages, ChevronRight } from "lucide-react";

const SECTIONS = [
  { title: "Germat", page: "Alphabet", desc: "Mësimi i shkronjave arabe" },
  { title: "Rrokjet", page: "Alphabet", desc: "Lidhja e shkronjave" },
  { title: "Fjalët", page: "WordsView", desc: "Fjalori i ri" },
  { title: "Zgjedhimi", page: "LetterQuiz", desc: "Testo njohuritë" },
  { title: "Lakimi", page: "NumberLearningView", desc: "Mësoni numrat" }
];

export default function AlphabetMain() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Languages className="w-8 h-8" />
          <h1 className="text-3xl font-extrabold">🔤 Alfabeti Arab</h1>
        </div>
        <p className="text-blue-100">Mëso alfabetin arab hap pas hapi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((section, idx) => (
          <Link
            key={idx}
            to={createPageUrl(section.page)}
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}