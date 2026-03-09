import React, { useState, useEffect, useCallback } from "react";

// ─── LEVEL CONFIG ────────────────────────────────────────────────────────────
const LEVELS = {
  fillestar: {
    label: "🌱 Fillestar",
    color: "bg-green-100 text-green-700 border-green-300",
    activeColor: "bg-green-600 text-white",
    gridSize: 9,       // 3x3
    filledRange: [2, 3],
    optionCount: 4,
    autoNext: 2000,
    description: "Rrjeta 3×3 — 2-3 sheshe",
  },
  mesatar: {
    label: "📚 Mesatar",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    activeColor: "bg-blue-600 text-white",
    gridSize: 16,      // 4x4
    filledRange: [3, 5],
    optionCount: 4,
    autoNext: 1800,
    description: "Rrjeta 4×4 — 3-5 sheshe",
  },
  avancuar: {
    label: "⭐ Avancuar",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    activeColor: "bg-purple-600 text-white",
    gridSize: 25,      // 5x5
    filledRange: [5, 8],
    optionCount: 4,
    autoNext: 1500,
    description: "Rrjeta 5×5 — 5-8 sheshe",
  },
  profesionist: {
    label: "🏆 Profesionist",
    color: "bg-amber-100 text-amber-700 border-amber-300",
    activeColor: "bg-amber-600 text-white",
    gridSize: 36,      // 6x6
    filledRange: [8, 12],
    optionCount: 6,
    autoNext: 1200,
    description: "Rrjeta 6×6 — 8-12 sheshe",
  },
};

function getGridCols(gridSize) {
  if (gridSize === 9)  return "grid-cols-3";
  if (gridSize === 16) return "grid-cols-4";
  if (gridSize === 25) return "grid-cols-5";
  if (gridSize === 36) return "grid-cols-6";
  return "grid-cols-3";
}

function generatePattern(gridSize, filledRange) {
  const [min, max] = filledRange;
  const count = min + Math.floor(Math.random() * (max - min + 1));
  const filledPositions = [];
  while (filledPositions.length < count) {
    const pos = Math.floor(Math.random() * gridSize);
    if (!filledPositions.includes(pos)) filledPositions.push(pos);
  }
  return { filledPositions: filledPositions.sort((a, b) => a - b), count };
}

function GridDisplay({ pattern, gridSize, size = "sm", highlight = false }) {
  const cols = getGridCols(gridSize);
  const cellSize = size === "lg"
    ? (gridSize <= 9 ? "w-10 h-10" : gridSize <= 16 ? "w-8 h-8" : "w-6 h-6")
    : (gridSize <= 9 ? "w-5 h-5" : gridSize <= 16 ? "w-4 h-4" : "w-3 h-3");

  return (
    <div className={`grid ${cols} gap-1`}>
      {Array.from({ length: gridSize }, (_, i) => (
        <div key={i} className={`rounded-sm transition-all ${cellSize} ${
          pattern.filledPositions.includes(i)
            ? highlight ? "bg-emerald-500 border border-emerald-600" : "bg-blue-600 border border-blue-700"
            : "bg-gray-100 border border-gray-200"
        }`} />
      ))}
    </div>
  );
}

// ─── LEVEL SELECTION ─────────────────────────────────────────────────────────
function LevelSelect({ onSelect }) {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="text-5xl mb-3">🧠</div>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Brain Gym Vizual</h2>
      <p className="text-gray-500 text-sm mb-6">Zgjidh nivelin e vështirësisë</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {Object.entries(LEVELS).map(([key, lv]) => (
          <button key={key} onClick={() => onSelect(key)}
            className={`rounded-2xl border-2 p-5 text-left transition-all hover:scale-105 hover:shadow-md ${lv.color}`}>
            <p className="text-lg font-extrabold mb-1">{lv.label}</p>
            <p className="text-xs opacity-80">{lv.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN GAME ────────────────────────────────────────────────────────────────
export default function BrainGymGame({ onClose, initialLevel }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(null);
  const [options, setOptions] = useState(null);

  const initRound = useCallback((levelKey) => {
    const lv = LEVELS[levelKey];
    const correct = generatePattern(lv.gridSize, lv.filledRange);
    const wrongs = Array.from({ length: lv.optionCount - 1 }, () =>
      generatePattern(lv.gridSize, lv.filledRange)
    );
    const all = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    setCurrentPattern(correct);
    setOptions({ correct: correct.filledPositions.join(","), choices: all });
    setAnswered(null);
    setShowResult(false);
  }, []);

  const handleLevelSelect = (key) => {
    setSelectedLevel(key);
    setScore(0);
    setRound(0);
    initRound(key);
  };

  const nextRound = useCallback(() => {
    if (!selectedLevel) return;
    initRound(selectedLevel);
    setRound(r => r + 1);
  }, [selectedLevel, initRound]);

  const handleAnswer = (choice) => {
    if (answered !== null) return;
    const isCorrect = choice.filledPositions.join(",") === options.correct;
    setAnswered(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(s => s + 1);
    setShowResult(true);
    setTimeout(nextRound, LEVELS[selectedLevel].autoNext);
  };

  const lv = selectedLevel ? LEVELS[selectedLevel] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {selectedLevel && (
              <button onClick={() => setSelectedLevel(null)}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 font-semibold">
                ← Niveli
              </button>
            )}
            <div>
              <h2 className="text-lg font-extrabold text-gray-800">🧠 Brain Gym</h2>
              {lv && <p className="text-xs text-gray-500">{lv.label} · {lv.description}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {selectedLevel && (
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">{score}</p>
                <p className="text-xs text-gray-400">pikë</p>
              </div>
            )}
            {onClose && (
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 hover:bg-red-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-500 font-bold text-lg">✕</button>
            )}
          </div>
        </div>

        {/* Level selection */}
        {!selectedLevel && <LevelSelect onSelect={handleLevelSelect} />}

        {/* Game */}
        {selectedLevel && currentPattern && options && (
          <>
            <div className="bg-gray-50 rounded-2xl p-5 mb-4">
              <p className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">Modeli origjinal — gjej njëjtin!</p>
              <div className="flex justify-center mb-2">
                <GridDisplay pattern={currentPattern} gridSize={lv.gridSize} size="lg" />
              </div>
              <p className="text-center text-xs text-gray-400">{currentPattern.count} sheshe të mbushura</p>
            </div>

            {showResult && (
              <div className={`text-center font-bold text-lg mb-3 ${answered === "correct" ? "text-emerald-600" : "text-red-500"}`}>
                {answered === "correct" ? "✅ Saktë!" : "❌ Jo e saktë!"}
              </div>
            )}

            <p className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">Zgjidh modelin e njëjtë:</p>
            <div className={`grid gap-3 ${lv.optionCount === 6 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
              {options.choices.map((choice, i) => (
                <button key={i} disabled={!!answered}
                  onClick={() => handleAnswer(choice)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                    answered && choice.filledPositions.join(",") === options.correct
                      ? "border-emerald-500 bg-emerald-50"
                      : answered && choice.filledPositions.join(",") !== options.correct && answered === "wrong" && i === options.choices.findIndex(c => c.filledPositions.join(",") !== options.correct)
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}>
                  <GridDisplay pattern={choice} gridSize={lv.gridSize} size="sm" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">Rundi: {round + 1}</p>
              <button onClick={nextRound} className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-600 transition-all">
                Kapërceje →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}