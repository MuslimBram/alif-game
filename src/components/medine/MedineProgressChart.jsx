import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { BookMarked } from "lucide-react";

export default function MedineProgressChart({ level }) {
  const [progress, setProgress] = useState([]);
  const [user, setUser] = useState(null);
  const [units, setUnits] = useState([]);

  const UNIT_COUNTS = {
    fillestar: 4,
    mesatar: 4,
    avancuar: 4
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const u = await base44.auth.me();
        setUser(u);

        // Load completed units
        const prog = await base44.entities.UserMedineProgress.filter({
          user_email: u.email,
          level: level,
          completed: true
        });

        setProgress(prog);

        // Create units array
        const unitCount = UNIT_COUNTS[level] || 4;
        const unitsData = Array.from({ length: unitCount }, (_, i) => ({
          id: i + 1,
          completed: prog.some(p => p.unit_id === i + 1)
        }));
        setUnits(unitsData);
      } catch (e) {
        console.error("Error loading progress:", e);
      }
    };

    loadData();
  }, [level]);

  const completedCount = progress.length;
  const totalCount = UNIT_COUNTS[level] || 4;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const getLevelLabel = (lvl) => {
    const labels = {
      fillestar: "🌱 Fillestar",
      mesatar: "🌿 Mesatar",
      avancuar: "🌲 Avancuar"
    };
    return labels[lvl] || lvl;
  };

  const getLevelColor = (lvl) => {
    const colors = {
      fillestar: "from-green-400 to-emerald-500",
      mesatar: "from-teal-400 to-emerald-600",
      avancuar: "from-emerald-600 to-teal-700"
    };
    return colors[lvl] || "from-emerald-500 to-teal-600";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookMarked className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-bold text-gray-800">{getLevelLabel(level)}</h3>
        </div>
        <span className="text-2xl font-bold text-emerald-600">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getLevelColor(level)} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {completedCount} nga {totalCount} Mësimet e Plotesuara
        </p>
      </div>

      {/* Unit Grid */}
      <div className="grid grid-cols-4 gap-3">
        {units.map((unit) => (
          <div
            key={unit.id}
            className={`relative group aspect-square rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
              unit.completed
                ? `bg-gradient-to-br ${getLevelColor(level)} text-white shadow-lg`
                : "bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300"
            }`}
          >
            {unit.completed ? (
              <>
                <span>✓</span>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Njësia {unit.id}
                </div>
              </>
            ) : (
              <span>{unit.id}</span>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          {percentage === 100
            ? "🎉 Udhëtimi juaj përmes këtij niveli është kompletuar!"
            : `Vazhdoni! ${totalCount - completedCount} mësimet mbetur.`}
        </p>
      </div>
    </div>
  );
}