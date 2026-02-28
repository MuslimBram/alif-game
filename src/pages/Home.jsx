import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  const [stats, setStats] = useState({ lessons: 0, completed: 0, avgScore: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const authed = await base44.auth.isAuthenticated();
        if (!authed) return;
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
        // user not logged in
      }
    };
    loadStats();
  }, []);

  return (
    <div>
      <HeroSection stats={stats} />
    </div>
  );
}