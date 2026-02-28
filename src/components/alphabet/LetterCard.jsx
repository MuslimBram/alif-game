import React from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

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
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {letter.letter}
      </div>
      <p className="text-xs text-gray-500 truncate">
        {letter.pronunciation}
      </p>
      {letter.audio_url && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
        </div>
      )}
    </motion.button>
  );
}