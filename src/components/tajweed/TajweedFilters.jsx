import React from "react";
import { Badge } from "@/components/ui/badge";

const levels = [
  { value: "te_gjitha", label: "Të Gjitha" },
  { value: "fillestar", label: "Fillestar" },
  { value: "mesatar", label: "Mesatar" },
  { value: "avancuar", label: "Avancuar" },
  { value: "profesionist", label: "Profesionist" },
];

const categories = [
  { value: "te_gjitha", label: "Të Gjitha" },
  { value: "noon_sakinah", label: "Noon Sakinah" },
  { value: "meem_sakinah", label: "Meem Sakinah" },
  { value: "madd", label: "Madd (Zgjatja)" },
  { value: "qalqalah", label: "Qalqalah" },
  { value: "ghunnah", label: "Ghunnah" },
  { value: "idgham", label: "Idgham" },
  { value: "ikhfa", label: "Ikhfa" },
  { value: "iqlab", label: "Iqlab" },
  { value: "izhar", label: "Izhar" },
  { value: "tjera", label: "Tjera" },
];

export default function TajweedFilters({ selectedLevel, selectedCategory, onLevelChange, onCategoryChange }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-emerald-700 mb-2">Niveli:</p>
        <div className="flex flex-wrap gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl.value}
              onClick={() => onLevelChange(lvl.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedLevel === lvl.value
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-emerald-700 mb-2">Kategoria:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat.value
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}