import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const PRAYER_POSITIONS = [
  {
    name: "Istanding (Qiyam)",
    description: "Qëndrim në këmbë",
    figure: "🧍",
    hadith: "Nafi transmeton: Kjo është gjendje bazë e namazit.",
    quran: "Kur'an 2:238",
    details: "Qëndrime në këmbë në respekt të Allahut, me duart përpara vetes ose të palosura sipas shkollës."
  },
  {
    name: "Ruku (Përkulje)",
    description: "Përkulje në bel me 90°",
    figure: "🙇",
    hadith: "Abu Hurayra transmeton: Profeti (PBUH) tha 'Është e pamundur të kesh namaz të plotë nëse nuk përkundeshe deri sa të rreshtohet shpina'.",
    quran: "Kur'an 4:102",
    details: "Përkulja në bel, duart në gunjat e këmbëve, shpia e drejtë, fytyrë paralele me tokën."
  },
  {
    name: "Julus (Ulur)",
    description: "Ulur mes dy prostracionesh",
    figure: "🧎",
    hadith: "Ibn Abbas transmeton: Ky moment është për dhënien e shëndeti dhe kujtesë të Allahut.",
    quran: "Kur'an 22:77",
    details: "Ulur mes dy prostracionesh, shpina e drejtë, duart në gunjat ose në rrip."
  },
  {
    name: "Sujud (Prosternacion)",
    description: "Prosternacion (7 pjesë në tokë)",
    figure: "🤲",
    hadith: "Abu Malik Al-Ash'ari transmeton: Profeti (PBUH) tha 'Në Sujud jemi më afër Allahut, prandaj shumezohet dua në këtë gjendje'.",
    quran: "Kur'an 96:19",
    details: "7 pjesë të trupit në tokë: fytyrë, të dy palmët, të dy gjunjat, të dy këmbët. Kjo është pozicioni më i nënshtruar."
  },
  {
    name: "At-Tashahhud",
    description: "Ulur përfundimtar dhe dua",
    figure: "🙏",
    hadith: "Abdullah bin Mas'ud transmeton: Profeti (PBUH) e mësoi ne at-tashahhud përpara mbylljes në namaz.",
    quran: "Kur'an 33:56",
    details: "Ulur në gunjat, tillja e gishtit të parë të këmbës së djathtë, dua për Profet (PBUH) dhe shëlbesim mbi të."
  }
];

export default function PrayerPositionsGuide() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-3xl">🕌</span>
        <div>
          <h3 className="font-bold text-gray-800">Pozicionet e Namazit</h3>
          <p className="text-xs text-gray-500">Figurat dhe argumentet Kuran-Sune</p>
        </div>
      </div>

      <div className="space-y-3">
        {PRAYER_POSITIONS.map((position, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="border border-gray-100 rounded-xl overflow-hidden hover:border-emerald-200 transition-colors"
          >
            {/* Header */}
            <button
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{position.figure}</span>
                <div className="text-left">
                  <p className="font-bold text-gray-800">{position.name}</p>
                  <p className="text-xs text-gray-500">{position.description}</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expanded === idx ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expanded Content */}
            {expanded === idx && (
              <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
                {/* Details */}
                <div className="bg-white rounded-lg p-3 border-l-4 border-emerald-500">
                  <p className="text-sm text-gray-700">{position.details}</p>
                </div>

                {/* Quran */}
                <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                  <p className="text-xs font-bold text-blue-900 mb-1">📖 Kur'an</p>
                  <p className="text-sm text-blue-800">{position.quran}</p>
                </div>

                {/* Hadith */}
                <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
                  <p className="text-xs font-bold text-amber-900 mb-1">📚 Hadith</p>
                  <p className="text-sm text-amber-800">{position.hadith}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Educational note */}
      <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <p className="text-xs text-emerald-900">
          <strong>💡 Shënim:</strong> Këto pozicione janë bazat e namazit. Secila ka domethënien e saj në shfaqjen e nënshtrimit dhe përendimit ndaj Allahut.
        </p>
      </div>
    </div>
  );
}