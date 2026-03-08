import React, { useState } from "react";

function generatePatternRound() {
  const counts = [2, 3, 4, 5];
  const count = counts[Math.floor(Math.random() * counts.length)];
  const filledPositions = [];
  while (filledPositions.length < count) {
    const pos = Math.floor(Math.random() * 9);
    if (!filledPositions.includes(pos)) filledPositions.push(pos);
  }
  return { filledPositions, count };
}

function GridDisplay({ pattern, size = "sm" }) {
  return (
    <div className={`grid grid-cols-3 gap-1 ${size === "lg" ? "w-32 h-32" : "w-20 h-20"}`}>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className={`rounded-sm transition-all ${
          pattern.filledPositions.includes(i)
            ? "bg-blue-600 border border-blue-700"
            : "bg-gray-100 border border-gray-200"
        }`} />
      ))}
    </div>
  );
}

export default function BrainGymGame({ onClose }) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [currentPattern, setCurrentPattern] = useState(() => generatePatternRound());
  const [options, setOptions] = useState(() => {
    const correct = generatePatternRound();
    const wrongs = [generatePatternRound(), generatePatternRound(), generatePatternRound()];
    const all = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    return { correct: correct.filledPositions.sort().join(","), choices: all };
  });

  const nextRound = () => {
    const newPattern = generatePatternRound();
    const wrongs = [generatePatternRound(), generatePatternRound(), generatePatternRound()];
    const all = [newPattern, ...wrongs].sort(() => Math.random() - 0.5);
    setCurrentPattern(newPattern);
    setOptions({ correct: newPattern.filledPositions.sort().join(","), choices: all });
    setAnswered(null);
    setShowResult(false);
    setRound(r => r + 1);
  };

  const handleAnswer = (choice) => {
    if (answered !== null) return;
    const isCorrect = choice.filledPositions.sort().join(",") === options.correct;
    setAnswered(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(s => s + 1);
    setShowResult(true);
    setTimeout(nextRound, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800">🧠 Brain Gym — Lojëra Vizuale</h2>
            <p className="text-sm text-gray-500">Gjej modelin e njëjtë — stërvit trurin!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-600">{score}</p>
              <p className="text-xs text-gray-400">pikë</p>
            </div>
            {onClose && (
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 hover:bg-red-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-500 font-bold text-lg">✕</button>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">Modeli origjinal — gjej njëjtin!</p>
          <div className="flex justify-center mb-2">
            <GridDisplay pattern={currentPattern} size="lg" />
          </div>
          <p className="text-center text-xs text-gray-400">{currentPattern.count} sheshe të mbushura</p>
        </div>

        {showResult && (
          <div className={`text-center font-bold text-lg mb-3 ${answered === "correct" ? "text-emerald-600" : "text-red-500"}`}>
            {answered === "correct" ? "✅ Saktë!" : "❌ Jo e saktë!"}
          </div>
        )}

        <p className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">Zgjidh modelin e njëjtë:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {options.choices.map((choice, i) => (
            <button key={i} disabled={!!answered}
              onClick={() => handleAnswer(choice)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                answered && choice.filledPositions.sort().join(",") === options.correct
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }`}>
              <GridDisplay pattern={choice} size="sm" />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">Rundi: {round + 1}</p>
          <button onClick={nextRound} className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-600 transition-all">
            Kapërceje →
          </button>
        </div>
      </div>
    </div>
  );
}