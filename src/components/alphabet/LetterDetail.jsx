import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, BookOpen, Pencil } from "lucide-react";

const formLabels = {
  uppercase: "E Madhe shtypi",
  lowercase: "E Vogël shtypi",
  handwritten_upper: "E Madhe dorëshkrim",
  handwritten_lower: "E Vogël dorëshkrim",
};

export default function LetterDetail({ letter }) {
  const [activeForm, setActiveForm] = useState("uppercase");

  if (!letter) return null;

  const forms = {
    uppercase: letter.form_uppercase || letter.letter?.toUpperCase(),
    lowercase: letter.form_lowercase || letter.letter?.toLowerCase(),
    handwritten_upper: letter.form_handwritten_upper || letter.letter?.toUpperCase(),
    handwritten_lower: letter.form_handwritten_lower || letter.letter?.toLowerCase(),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Shkronja: {letter.letter}
          </h2>
          <p className="text-sm text-gray-500">Shkronja {letter.letter}</p>
        </div>
        <Button
          size="sm"
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
          onClick={() => {
            if (letter.audio_url) {
              const audio = new Audio(letter.audio_url);
              audio.play();
            }
          }}
        >
          <Volume2 className="w-4 h-4 mr-1.5" />
          Dëgjo Tingullin
        </Button>
      </div>

      {/* Form selector */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Zgjidhni Formën</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(formLabels).map((key) => (
            <button
              key={key}
              onClick={() => setActiveForm(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeForm === key
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
              }`}
            >
              {formLabels[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Display letter */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <motion.div
          key={activeForm}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl font-bold text-gray-900 mb-3"
        >
          {forms[activeForm]}
        </motion.div>
        <p className="text-sm text-emerald-600 italic">
          Shqiptimi: Shqiptohet si '{letter.pronunciation}'
        </p>
      </div>

      {/* Description */}
      {letter.description && (
        <div className="bg-emerald-50/50 rounded-xl p-4 flex items-start gap-3">
          <BookOpen className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-700 mb-1">Përshkrimi</p>
            <p className="text-sm text-gray-600">{letter.description}</p>
          </div>
        </div>
      )}

      {/* Example words */}
      {letter.example_words && letter.example_words.length > 0 && (
        <div>
          <p className="text-sm font-bold text-gray-700 mb-3">Shembuj Fjalësh</p>
          <div className="grid grid-cols-2 gap-3">
            {letter.example_words.map((ex, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-3 border border-gray-100"
              >
                <p className="font-bold text-gray-900">{ex.word}</p>
                <p className="text-xs text-gray-500">{ex.translation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}