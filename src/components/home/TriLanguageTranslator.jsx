import React, { useState } from "react";
import { Globe, Volume2 } from "lucide-react";

const LANGUAGES = {
  sq: { name: "Shqip", flag: "🇦🇱" },
  ar: { name: "Arabisht", flag: "🇸🇦" },
  en: { name: "Anglisht", flag: "🇬🇧" }
};

// Sample dictionary
const DICTIONARY = {
  sq: {
    "përshëndetje": { ar: "السلام عليكم", en: "Hello" },
    "mirëmëngjesi": { ar: "صباح الخير", en: "Good morning" },
    "mirëmbrëma": { ar: "مساء الخير", en: "Good evening" },
    "faleminderit": { ar: "شكراً", en: "Thank you" },
    "ju lutem": { ar: "من فضلك", en: "Please" },
    "po": { ar: "نعم", en: "Yes" },
    "jo": { ar: "لا", en: "No" },
    "emri im është": { ar: "اسمي", en: "My name is" },
    "çfarë ndodh": { ar: "كيف حالك", en: "How are you" },
    "mirë": { ar: "بخير", en: "Good" }
  },
  ar: {
    "السلام عليكم": { sq: "përshëndetje", en: "Hello" },
    "صباح الخير": { sq: "mirëmëngjesi", en: "Good morning" },
    "مساء الخير": { sq: "mirëmbrëma", en: "Good evening" },
    "شكراً": { sq: "faleminderit", en: "Thank you" },
    "من فضلك": { sq: "ju lutem", en: "Please" },
    "نعم": { sq: "po", en: "Yes" },
    "لا": { sq: "jo", en: "No" },
    "اسمي": { sq: "emri im është", en: "My name is" },
    "كيف حالك": { sq: "çfarë ndodh", en: "How are you" },
    "بخير": { sq: "mirë", en: "Good" }
  },
  en: {
    "hello": { sq: "përshëndetje", ar: "السلام عليكم" },
    "good morning": { sq: "mirëmëngjesi", ar: "صباح الخير" },
    "good evening": { sq: "mirëmbrëma", ar: "مساء الخير" },
    "thank you": { sq: "faleminderit", ar: "شكراً" },
    "please": { sq: "ju lutem", ar: "من فضلك" },
    "yes": { sq: "po", ar: "نعم" },
    "no": { sq: "jo", ar: "لا" },
    "my name is": { sq: "emri im është", ar: "اسمي" },
    "how are you": { sq: "çfarë ndodh", ar: "كيف حالك" },
    "good": { sq: "mirë", ar: "بخير" }
  }
};

export default function TriLanguageTranslator() {
  const [selectedLang, setSelectedLang] = useState("sq");
  const [inputWord, setInputWord] = useState("");
  const [translation, setTranslation] = useState(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);

  const handleTranslate = (word) => {
    const normalized = word.toLowerCase().trim();
    const dict = DICTIONARY[selectedLang];
    if (dict && dict[normalized]) {
      setTranslation({ word: normalized, translations: dict[normalized] });
    } else {
      setTranslation(null);
    }
  };

  const speak = (text, lang) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "ar" ? "ar-SA" : lang === "sq" ? "sq-AL" : "en-US";
    u.rate = 0.7;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-gray-800">Përkthyes Tri-Gjuhësor</h3>
        </div>
        <button
          onClick={() => setShowLanguageSelector(!showLanguageSelector)}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          {showLanguageSelector ? "Fshih" : "Shfaq"} Gjuhët
        </button>
      </div>

      {/* Language Selector */}
      {showLanguageSelector && (
      <div className="flex gap-2 mb-5">
        {Object.entries(LANGUAGES).map(([code, lang]) => (
          <button
            key={code}
            onClick={() => { setSelectedLang(code); setInputWord(""); setTranslation(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              selectedLang === code
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>
      )}

      {/* Input */}
      <div className="relative mb-5">
        <input
          type="text"
          placeholder={`Shkruaj fjalë në ${LANGUAGES[selectedLang].name}...`}
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputWord) handleTranslate(inputWord);
          }}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          style={{ direction: selectedLang === "ar" ? "rtl" : "ltr" }}
        />
        <button
          onClick={() => {
            if (inputWord) handleTranslate(inputWord);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
        >
          Përkthe
        </button>
      </div>

      {/* Results */}
      {translation ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
          <div className="font-bold text-emerald-800 flex items-center gap-2">
            <span className={`text-lg ${selectedLang === "ar" ? "" : ""}`} style={{ direction: selectedLang === "ar" ? "rtl" : "ltr" }}>
              {translation.word}
            </span>
            <button
              onClick={() => speak(translation.word, selectedLang)}
              className="opacity-70 hover:opacity-100 transition-opacity"
              title="Dëgjo"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(translation.translations).map(([lang, text]) => {
              const langData = LANGUAGES[lang];
              return (
                <div key={lang} className="bg-white rounded-lg p-3 text-center border border-emerald-100">
                  <p className="text-xs text-gray-500 mb-1">{langData.name}</p>
                  <p className="font-semibold text-gray-800 text-sm break-words" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                    {text}
                  </p>
                  <button
                    onClick={() => speak(text, lang)}
                    className="mt-2 text-emerald-600 hover:text-emerald-700 transition-colors opacity-70 hover:opacity-100"
                    title="Dëgjo"
                  >
                    <Volume2 className="w-3.5 h-3.5 mx-auto" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : inputWord ? (
        <div className="text-center py-6 text-gray-500 text-sm">
          Fjala nuk u gjet në fjalor. Provo ndonjë fjalë tjetër.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.keys(DICTIONARY[selectedLang]).slice(0, 6).map((word) => (
            <button
              key={word}
              onClick={() => { setInputWord(word); handleTranslate(word); }}
              className="px-3 py-2 bg-gray-100 hover:bg-emerald-100 rounded-lg text-xs font-semibold text-gray-700 transition-colors text-center truncate"
              style={{ direction: selectedLang === "ar" ? "rtl" : "ltr" }}
            >
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}