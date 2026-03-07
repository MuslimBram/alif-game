import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import HeroSection from "@/components/home/HeroSection";
import LevelSelectionModal from "@/components/home/LevelSelectionModal";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Shield } from "lucide-react";

export default function Home({ adminEditMode, isAdmin }) {
  const [stats, setStats] = useState({ lessons: 0, completed: 0, avgScore: 0 });
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const loadStats = async () => {
      try {
        const authed = await base44.auth.isAuthenticated();
        setIsAuthenticated(authed);
        if (!authed) {
          // Show level selection for new/unauthenticated visitors
          const seen = sessionStorage.getItem("levelModalSeen");
          if (!seen) {
            setShowLevelModal(true);
            sessionStorage.setItem("levelModalSeen", "1");
          }
          return;
        }
        const user = await base44.auth.me();
        // If logged in but no level set, show modal once
        if (!user?.user_level) {
          const seen = sessionStorage.getItem("levelModalSeen");
          if (!seen) {
            setShowLevelModal(true);
            sessionStorage.setItem("levelModalSeen", "1");
          }
        }
        const progress = await base44.entities.UserProgress.list();
        const completed = progress.filter((p) => p.status === "completed");
        const avgScore = completed.length
          ? Math.round(completed.reduce((s, p) => s + (p.score || 0), 0) / completed.length)
          : 0;
        setStats({
          lessons: progress.length,
          completed: completed.length,
          avgScore,
        });
      } catch (e) {
        setIsAuthenticated(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="relative">
      {showLevelModal && (
        <LevelSelectionModal onClose={(level) => setShowLevelModal(false)} />
      )}
      {adminEditMode && isAdmin && (
        <div className="fixed top-24 left-4 z-50 bg-white border-2 border-amber-400 rounded-2xl shadow-xl p-3 space-y-1.5 min-w-[180px]">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">✏️ Edit Ballina</p>
          <a href={createPageUrl("AdminPanel")} className="flex items-center gap-2 text-xs text-gray-700 hover:text-emerald-700 font-semibold py-1 px-2 rounded-lg hover:bg-emerald-50 transition-all">🛡 Admin Panel</a>
          <a href={createPageUrl("Settings")} className="flex items-center gap-2 text-xs text-gray-700 hover:text-emerald-700 font-semibold py-1 px-2 rounded-lg hover:bg-emerald-50 transition-all">⚙️ Cilësimet</a>
        </div>
      )}
      <HeroSection stats={stats} adminEditMode={adminEditMode} isAdmin={isAdmin} />
    </div>
  );
}