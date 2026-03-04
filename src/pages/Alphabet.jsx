import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Languages, Pencil } from "lucide-react";
import AdminEditOverlay from "@/components/admin/AdminEditOverlay";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import LetterCard from "@/components/alphabet/LetterCard";
import LetterLearningView from "@/components/alphabet/LetterLearningView";
import SyllablesView from "@/components/alphabet/SyllablesView";
import WordsView from "@/components/alphabet/WordsView";
import ExercisesView from "@/components/alphabet/ExercisesView";
import NumberLearningView from "@/components/alphabet/NumberLearningView";
import VerbConjugationView from "@/components/alphabet/VerbConjugationView";
import NounDeclensionView from "@/components/alphabet/NounDeclensionView";

const languages = [
  { value: "shqip", label: "🇦🇱 Shqip" },
  { value: "anglisht", label: "🇬🇧 Anglisht" },
  { value: "arabisht", label: "🇸🇦 Arabisht" },
];

const levels = [
  { value: "te_gjitha", label: "Të Gjitha" },
  { value: "fillestar", label: "Fillestar" },
  { value: "mesatar", label: "Mesatar" },
  { value: "avancuar", label: "Avancuar" },
  { value: "profesionist", label: "Profesionist" },
];

export default function Alphabet({ adminEditMode, isAdmin }) {
  const [selectedLang, setSelectedLang] = useState("shqip");
  const [selectedLevel, setSelectedLevel] = useState("te_gjitha");
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [learningIndex, setLearningIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("germat");

  const { data: letters = [], isLoading } = useQuery({
    queryKey: ["alphabet-letters"],
    queryFn: () => base44.entities.AlphabetLetter.list("order_index", 200),
  });

  const filteredLetters = letters.filter((l) => {
    const langMatch = l.language === selectedLang;
    const levelMatch = selectedLevel === "te_gjitha" || l.level === selectedLevel;
    return langMatch && levelMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      <AdminEditOverlay show={adminEditMode && isAdmin} title="Edito Alfabetin" items={[
        { label: "Shto Shkronjë", href: createPageUrl("AdminPanel"), icon: "➕" },
        { label: "Menaxho Shkronjat", href: createPageUrl("AdminPanel"), icon: "📝" },
      ]} />
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800">
          Alfabeti Shqip – Rrokje, Fjalë dhe Ushtrime
        </h1>
        <p className="text-sm text-emerald-600 mt-1">
          Mësoni germat, rrokjet, fjalët dhe bëni ushtrimet!
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-white border border-gray-200 rounded-xl p-1">
          {[
            { label: "Germat", value: "germat" },
            { label: "Rrokjet", value: "rrokjet" },
            { label: "Fjalët", value: "fjalët" },
            { label: "Numrat", value: "numrat" },
            { label: "Zgjedhimi", value: "zgjedhimi" },
            { label: "Lakimi", value: "lakimi" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-lg text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Language Filter — for tabs that use it (not zgjedhimi/lakimi which have their own) */}
      {(activeTab === "rrokjet" || activeTab === "fjalët" || activeTab === "numrat") && (
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold text-emerald-700 mb-2">Gjuha</p>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => { setSelectedLang(lang.value); setSelectedLetter(null); }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedLang === lang.value ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === "germat" && (
        <>
          {learningIndex !== null && filteredLetters.length > 0 ? (
            <div>
              <button
                onClick={() => setLearningIndex(null)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-700 mb-4 transition-colors"
              >
                ← Kthehu te lista
              </button>
              <LetterLearningView
                letters={filteredLetters}
                initialIndex={learningIndex}
                onProgressUpdate={() => {}}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Letter Grid */}
              <div className="lg:col-span-1">
                {isLoading ? (
                  <div className="grid grid-cols-4 gap-3">
                    {Array(16).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-20 rounded-2xl" />
                    ))}
                  </div>
                ) : filteredLetters.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <Languages className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nuk ka shkronja ende</p>
                    <p className="text-gray-400 text-sm mt-1">Admini duhet ti shtojë nga paneli</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-3">
                    {filteredLetters.map((letter, idx) => (
                      <LetterCard
                        key={letter.id}
                        letter={letter}
                        isSelected={false}
                        onClick={() => {
                          setLearningIndex(idx);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Start Prompt */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <Languages className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">Zgjidh një shkronjë për të filluar</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Kliko mbi shkronjën për të hapur mësimet dhe kuizin interaktiv
                  </p>
                  {filteredLetters.length > 0 && (
                    <button
                      onClick={() => setLearningIndex(0)}
                      className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Fillo nga Fillimi →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "rrokjet" && <SyllablesView language={selectedLang} />}
      {activeTab === "fjalët" && <WordsView language={selectedLang} />}
      {activeTab === "numrat" && <NumberLearningView language={selectedLang} />}
      {activeTab === "zgjedhimi" && <VerbConjugationView sharedLang={selectedLang} />}
      {activeTab === "lakimi" && <NounDeclensionView sharedLang={selectedLang} />}
    </div>
  );
}