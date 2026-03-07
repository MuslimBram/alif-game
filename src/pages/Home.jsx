import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import HeroSection from "@/components/home/HeroSection";
import LevelSelectionModal from "@/components/home/LevelSelectionModal";
import DragDropSections from "@/components/home/DragDropSections";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Shield } from "lucide-react";

export default function Home({ adminEditMode, isAdmin }) {
  const [stats, setStats] = useState({ lessons: 0, completed: 0, avgScore: 0 });
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [prayerTimes, setPrayerTimes] = useState(null);

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

      {/* Login/Register banner for visitors */}
      {isAuthenticated === false && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-200 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Ruaj progresin tënd!</p>
                <p className="text-xs text-emerald-100">Regjistrohu për të ruajtur rezultatet, progresin dhe sfidave.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                size="sm"
                onClick={() => base44.auth.redirectToLogin()}
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold rounded-xl gap-2"
              >
                <LogIn className="w-4 h-4" /> Hyr
              </Button>
              <Button
                size="sm"
                onClick={() => base44.auth.redirectToLogin()}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl gap-2 border border-emerald-500"
              >
                <UserPlus className="w-4 h-4" /> Regjistrohu
              </Button>
            </div>
          </div>
        </div>
      )}

      {adminEditMode && isAdmin && (
        <div className="fixed top-24 left-4 z-50 bg-white border-2 border-amber-400 rounded-2xl shadow-xl p-3 space-y-1.5 min-w-[180px]">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">✏️ Edit Ballina</p>
          <a href={createPageUrl("AdminPanel")} className="flex items-center gap-2 text-xs text-gray-700 hover:text-emerald-700 font-semibold py-1 px-2 rounded-lg hover:bg-emerald-50 transition-all">🛡 Admin Panel</a>
          <a href={createPageUrl("Settings")} className="flex items-center gap-2 text-xs text-gray-700 hover:text-emerald-700 font-semibold py-1 px-2 rounded-lg hover:bg-emerald-50 transition-all">⚙️ Cilësimet</a>
        </div>
      )}
      <HeroSection stats={stats} adminEditMode={adminEditMode} isAdmin={isAdmin} />
      <DragDropSections 
        adminEditMode={adminEditMode} 
        prayerTimes={prayerTimes} 
        onPrayerTimesUpdate={setPrayerTimes}
      />
    </div>
  );
}