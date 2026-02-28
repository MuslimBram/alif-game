import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, BookOpen, Volume2 } from "lucide-react";

const categoryColors = {
  noon_sakinah: "bg-blue-100 text-blue-800 border-blue-200",
  meem_sakinah: "bg-purple-100 text-purple-800 border-purple-200",
  madd: "bg-amber-100 text-amber-800 border-amber-200",
  qalqalah: "bg-red-100 text-red-800 border-red-200",
  ghunnah: "bg-green-100 text-green-800 border-green-200",
  idgham: "bg-indigo-100 text-indigo-800 border-indigo-200",
  ikhfa: "bg-pink-100 text-pink-800 border-pink-200",
  iqlab: "bg-orange-100 text-orange-800 border-orange-200",
  izhar: "bg-cyan-100 text-cyan-800 border-cyan-200",
  tjera: "bg-gray-100 text-gray-800 border-gray-200",
};

const categoryLabels = {
  noon_sakinah: "Noon Sakinah",
  meem_sakinah: "Meem Sakinah",
  madd: "Madd",
  qalqalah: "Qalqalah",
  ghunnah: "Ghunnah",
  idgham: "Idgham",
  ikhfa: "Ikhfa",
  iqlab: "Iqlab",
  izhar: "Izhar",
  tjera: "Tjera",
};

const levelColors = {
  fillestar: "bg-emerald-100 text-emerald-700",
  mesatar: "bg-amber-100 text-amber-700",
  avancuar: "bg-orange-100 text-orange-700",
  profesionist: "bg-red-100 text-red-700",
};

export default function TajweedCard({ rule }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        {/* Arabic symbol */}
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <span className="text-xl font-bold text-emerald-700 arabic-text">
            {rule.arabic_symbol || rule.name_ar || "ن"}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-bold text-gray-900 text-base">{rule.name_sq}</h3>
            {rule.name_ar && (
              <span className="text-sm text-gray-400 arabic-text">({rule.name_ar})</span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className={`text-xs border ${categoryColors[rule.category]}`}>
              {categoryLabels[rule.category]}
            </Badge>
            <Badge variant="secondary" className={`text-xs ${levelColors[rule.level]}`}>
              {rule.level?.charAt(0).toUpperCase() + rule.level?.slice(1)}
            </Badge>
            {rule.duration && (
              <span className="text-xs text-gray-400">{rule.duration}</span>
            )}
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 space-y-4">
              <div className="h-px bg-gray-100" />
              
              {/* Description */}
              {rule.description_sq && (
                <div className="bg-emerald-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">Përshkrimi</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{rule.description_sq}</p>
                </div>
              )}

              {/* Letters */}
              {rule.letters && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Shkronjat:</p>
                  <p className="text-lg arabic-text text-emerald-800 bg-emerald-50/50 rounded-lg px-3 py-2 inline-block">
                    {rule.letters}
                  </p>
                </div>
              )}

              {/* Example */}
              {rule.example_text && (
                <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-100">
                  <p className="text-xs font-semibold text-amber-700 mb-2">Shembull:</p>
                  <p className="text-2xl arabic-text text-gray-900 mb-1">{rule.example_text}</p>
                  {rule.example_transliteration && (
                    <p className="text-sm text-gray-500 italic">{rule.example_transliteration}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}