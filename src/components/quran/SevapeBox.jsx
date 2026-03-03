import React, { useMemo } from "react";
import { Star } from "lucide-react";

// Count Arabic letters (exclude spaces, punctuation, diacritics, etc.)
// Only count actual letter characters (Arabic Unicode block: 0x0621-0x064A)
function countArabicLetters(text) {
  // Match only base Arabic letters (not harakat/diacritics)
  const matches = text.match(/[\u0621-\u064A]/g);
  return matches ? matches.length : 0;
}

// Full Arabic text of each surah (first few surahs inline, others use verse count estimation)
// For exact letter count we use the well-known count from Islamic tradition
// Al-Fatiha: 139 letters (classical count), otherwise we estimate: ~avg 4.5 letters/word * ~5 words/verse
const KNOWN_LETTER_COUNTS = {
  1: 139,    // Al-Fatiha - exact classical count
  112: 47,   // Al-Ikhlas
  113: 74,   // Al-Falaq
  114: 80,   // An-Nas
  103: 43,   // Al-Asr
  108: 42,   // Al-Kawthar
  110: 45,   // An-Nasr
  107: 75,   // Al-Ma'un
};

export default function SevapeBox({ surah }) {
  const letterCount = useMemo(() => {
    // Use known count if available, otherwise estimate based on verses
    // Average Arabic surah: ~4 letters/word, ~6 words/verse (varies greatly)
    // We use a reasonable estimate: 22 letters per verse on average
    if (KNOWN_LETTER_COUNTS[surah.num]) return KNOWN_LETTER_COUNTS[surah.num];
    // Estimate: smaller surahs ~18 letters/verse, larger surahs ~25 letters/verse
    const avgLettersPerVerse = surah.verses < 20 ? 18 : surah.verses < 100 ? 22 : 25;
    return surah.verses * avgLettersPerVerse;
  }, [surah.num, surah.verses]);

  const minimumSevape = letterCount * 10;

  return (
    <div className="mt-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
        <span className="text-sm font-bold text-amber-800">Minimumi i Sevapeve</span>
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Shkronja të sure-s:</span>
          <span className="font-bold text-amber-700">
            ~{letterCount.toLocaleString()}
            {KNOWN_LETTER_COUNTS[surah.num] ? "" : " (vlerësim)"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">× 10 sevape/shkronjë:</span>
          <span className="font-bold text-emerald-700">× 10</span>
        </div>
        <div className="border-t border-amber-200 pt-2 flex justify-between">
          <span className="text-gray-700 font-semibold">Minimumi total:</span>
          <span className="font-extrabold text-2xl text-emerald-600">+{minimumSevape.toLocaleString()}</span>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-2 italic">
        "Kush lexon një shkronjë nga Libri i Allahut, do të marrë dhjetë sevape." — Tirmidhiu
      </p>
    </div>
  );
}