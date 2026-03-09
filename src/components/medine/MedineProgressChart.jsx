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
          completed: prog.some((p) => p.unit_id === i + 1)
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
  const percentage = Math.round(completedCount / totalCount * 100);

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

  return null;

























































}