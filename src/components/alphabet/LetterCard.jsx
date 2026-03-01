import React from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

const speak = (letter) => {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(letter.letter);
  u.lang = letter.language === "arabisht" ? "ar" : letter.language === "anglisht" ? "en-US" : "sq";
  u.rate = 0.7;
  window.speechSynthesis.speak(u);
};

export default function LetterCard({ letter, onClick, isSelected }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(letter)}
      className={`relative group p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
        isSelected
          ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100"
          : "border-gray-100 bg-white hover:border-emerald-200 hover:shadow-md"
      }`}
    >
      <div
        className="font-bold text-gray-900 mb-1"
        style={{
          fontSize: letter.language === "arabisht" ? "2rem" : "1.875rem",
          fontFamily: letter.language === "arabisht" ? "serif" : "inherit",
        }}
      >
        {letter.letter}
      </div>
      <p className="text-xs text-gray-500 truncate">
        {letter.pronunciation}
      </p>
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={e => { e.stopPropagation(); speak(letter); }}
      >
        <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
      </button>
    </motion.button>
  );
}