import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const LEVELS = [
  {
    value: "fillestar",
    label: "🌱 Fillestar",
    description: "Filloj nga e para — germat, fjalët bazë, leximi",
    color: "from-emerald-400 to-teal-500",
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    unlocks: ["fillestar"],
    detail: "Akses në nivel Fillestar"
  },
  {
    value: "mesatar",
    label: "🌿 Mesatar",
    description: "Kam njohuri bazë dhe dua të zgjeroj me fjalor dhe gramatikë",
    color: "from-blue-400 to-indigo-500",
    border: "border-blue-300",
    bg: "bg-blue-50",
    unlocks: ["fillestar", "mesatar"],
    detail: "Akses në nivelet Fillestar + Mesatar"
  },
  {
    value: "avancuar",
    label: "🌲 I Avancuar",
    description: "Njoh mirë gjuhën dhe dua të studioj tekste komplekse",
    color: "from-purple-400 to-violet-500",
    border: "border-purple-300",
    bg: "bg-purple-50",
    unlocks: ["fillestar", "mesatar", "avancuar"],
    detail: "Akses në nivelet Fillestar + Mesatar + Avancuar"
  },
  {
    value: "profesionist",
    label: "🏆 Profesionist",
    description: "Nivel i lartë — tekste shkencore, arabisht klasike, texhuid",
    color: "from-amber-400 to-orange-500",
    border: "border-amber-300",
    bg: "bg-amber-50",
    unlocks: ["fillestar", "mesatar", "avancuar", "profesionist"],
    detail: "Akses në të gjitha nivelet"
  },
];

export default function LevelSelectionModal({ onClose }) {
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSelect = async (level) => {
    setSaving(true);
    try {
      await base44.auth.updateMe({ user_level: level.value });
    } catch (e) {}
    setSaving(false);
    onClose(level.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">📚</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Mirë se vini!</h2>
          <p className="text-gray-500 text-sm">Zgjidhni nivelin tuaj për të personalizuar përvojën e të nxënit</p>
        </div>

        <div className="space-y-3 mb-6">
          {LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => setSelected(level)}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                selected?.value === level.value
                  ? `${level.border} ${level.bg} shadow-md`
                  : "border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {selected?.value === level.value ? "✓" : level.label.split(" ")[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{level.label.split(" ").slice(1).join(" ")}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{level.description}</p>
                </div>
              </div>
              {selected?.value === level.value && (
                <div className="mt-2 ml-13 ml-14">
                  <span className="text-xs font-semibold text-gray-500">🔓 {level.detail}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => selected && handleSelect(selected)}
          disabled={!selected || saving}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-base shadow-lg hover:opacity-90 transition-all disabled:opacity-40"
        >
          {saving ? "Duke ruajtur..." : "Fillo Mësimin →"}
        </button>

        <button
          onClick={() => onClose(null)}
          className="w-full mt-3 py-2 text-gray-400 hover:text-gray-600 text-sm"
        >
          Kalon, hyr si Fillestar
        </button>
      </motion.div>
    </div>
  );
}