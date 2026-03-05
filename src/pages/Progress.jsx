import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { BarChart3, Trophy, Target, TrendingUp, Flame, Star, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const moduleLabels = {
  alfabeti: "Alfabeti",
  texhuidi: "Texhuidi",
  kurani: "Kurani",
  umra_haxh: "Umra & Haxh",
  lojera: "Lojëra",
};

const moduleColors = {
  alfabeti: "#10b981",
  texhuidi: "#f59e0b",
  kurani: "#3b82f6",
  umra_haxh: "#8b5cf6",
  lojera: "#ec4899",
};

// Simulate streak from last_accessed dates
function computeStreak(progressItems) {
  const dates = progressItems
    .filter(p => p.last_accessed)
    .map(p => new Date(p.last_accessed).toDateString());
  const unique = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
  if (unique.length === 0) return 0;
  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    const diff = (new Date(unique[i - 1]) - new Date(unique[i])) / (1000 * 60 * 60 * 24);
    if (diff <= 1.5) streak++;
    else break;
  }
  return streak;
}

// Build last 7 days activity
function buildWeeklyActivity(progressItems) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("sq-AL", { weekday: "short" });
    const dateStr = d.toDateString();
    const count = progressItems.filter(p => p.last_accessed && new Date(p.last_accessed).toDateString() === dateStr).length;
    days.push({ day: label, aktivitete: count });
  }
  return days;
}

const BADGE_DEFS = [
  { id: "first_lesson", emoji: "🎓", label: "Mësimi i Parë", desc: "Kryeje mësimin e parë", check: (c, s) => c >= 1 },
  { id: "five_lessons", emoji: "📚", label: "5 Mësime", desc: "Kryej 5 mësime", check: (c) => c >= 5 },
  { id: "ten_lessons", emoji: "🏆", label: "10 Mësime", desc: "Kryej 10 mësime", check: (c) => c >= 10 },
  { id: "streak3", emoji: "🔥", label: "Flakë 3 Ditë", desc: "Streak 3 ditë", check: (c, s) => s >= 3 },
  { id: "streak7", emoji: "⚡", label: "Flakë 7 Ditë", desc: "Streak 7 ditë", check: (c, s) => s >= 7 },
  { id: "perfect", emoji: "💎", label: "Perfekt 100%", desc: "Merr 100% në ndonjë kuiz", check: (c, s, avg) => avg >= 100 },
];

export default function Progress() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const authed = await base44.auth.isAuthenticated();
        if (authed) setUser(await base44.auth.me());
      } catch (e) {}
    };
    loadUser();
  }, []);

  const { data: progress = [], isLoading } = useQuery({
    queryKey: ["user-progress"],
    queryFn: () => base44.entities.UserProgress.list("-last_accessed", 500),
  });

  const completed = progress.filter(p => p.status === "completed");
  const withScore = completed.filter(p => p.score);
  const avgScore = withScore.length ? Math.round(withScore.reduce((s, p) => s + p.score, 0) / withScore.length) : 0;
  const streak = computeStreak(progress);
  const weeklyData = buildWeeklyActivity(progress);

  // By module
  const byModule = {};
  progress.forEach(p => {
    if (!byModule[p.module]) byModule[p.module] = [];
    byModule[p.module].push(p);
  });

  const moduleChartData = Object.entries(byModule).map(([mod, items]) => ({
    name: moduleLabels[mod] || mod,
    total: items.length,
    kryer: items.filter(p => p.status === "completed").length,
  }));

  // Badges
  const earnedBadges = BADGE_DEFS.filter(b => b.check(completed.length, streak, avgScore));

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Progresi Im</h2>
        <p className="text-gray-500 mb-6">Duhet të hysh për të parë përparimin tënd</p>
        <button onClick={() => base44.auth.redirectToLogin()}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
          Hyr / Regjistrohu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Progresi Im</h1>
        <p className="text-sm text-gray-500 mt-1">
          Mirë se vjen, <strong>{user.full_name || user.email}</strong>! 👋
        </p>
      </div>

      {/* Streak Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-5 mb-6 flex items-center gap-4 ${streak >= 3 ? "bg-gradient-to-r from-orange-400 to-red-500 text-white" : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"}`}>
        <div className="text-5xl">{streak >= 7 ? "⚡" : streak >= 3 ? "🔥" : "🌱"}</div>
        <div>
          <div className="text-2xl font-black">{streak} {streak === 1 ? "ditë" : "ditë"} streak!</div>
          <div className="text-white/80 text-sm">
            {streak === 0 ? "Fillo sot për të ndërtuar streakun tënd!" :
             streak < 3 ? "Mirë fillim! Vazhdo çdo ditë!" :
             streak < 7 ? "Flakë! Je në rrugën e duhur! 🔥" :
             "Fantastike! Je i/e pakrahasueshëm/me! ⚡"}
          </div>
        </div>
        <div className="ml-auto text-right hidden sm:block">
          <div className="text-xs text-white/70 mb-1">Streaku maksimal</div>
          <div className="text-lg font-bold">{streak} ditë</div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, label: "Mësime Totale", value: progress.length, color: "bg-blue-100 text-blue-600" },
          { icon: CheckCircle2, label: "Të Kompletuara", value: completed.length, color: "bg-emerald-100 text-emerald-600" },
          { icon: TrendingUp, label: "Rezultat Mesatar", value: avgScore + "%", color: "bg-amber-100 text-amber-600" },
          { icon: Flame, label: "Streak Aktual", value: streak + "🔥", color: "bg-orange-100 text-orange-600" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="bg-white border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Weekly activity chart */}
        <Card className="bg-white border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">📅 Aktiviteti — 7 Ditët e Fundit</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="aktivitete" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Module progress */}
        <Card className="bg-white border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">📊 Progresi sipas Moduleve</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(byModule).length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">Ende nuk keni filluar asnjë mësim</p>
            ) : (
              Object.entries(byModule).map(([mod, items]) => {
                const done = items.filter(p => p.status === "completed").length;
                const pct = items.length ? Math.round((done / items.length) * 100) : 0;
                return (
                  <div key={mod}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-gray-700">{moduleLabels[mod] || mod}</span>
                      <span className="text-gray-500">{done}/{items.length} ({pct}%)</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ background: moduleColors[mod] || "#10b981" }}
                        className="h-full rounded-full" />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card className="bg-white border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">🏅 Distinktivat e Fituara</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {BADGE_DEFS.map((badge) => {
              const earned = badge.check(completed.length, streak, avgScore);
              return (
                <div key={badge.id} className={`rounded-2xl p-3 text-center border-2 transition-all ${earned ? "border-amber-300 bg-amber-50" : "border-gray-100 bg-gray-50 opacity-40"}`}>
                  <div className="text-3xl mb-1">{badge.emoji}</div>
                  <div className="text-xs font-bold text-gray-700 leading-tight">{badge.label}</div>
                  {earned && <div className="text-xs text-emerald-600 font-semibold mt-0.5">✅ Fituar</div>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}