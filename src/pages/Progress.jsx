import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Trophy, Target, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const moduleLabels = {
  alfabeti: "Alfabeti Shqip",
  texhuidi: "Texhuidi",
  kurani: "Kurani",
  umra_haxh: "Umra & Haxh",
  lojera: "Lojëra",
};

const moduleColors = {
  alfabeti: "bg-emerald-500",
  texhuidi: "bg-amber-500",
  kurani: "bg-blue-500",
  umra_haxh: "bg-purple-500",
  lojera: "bg-pink-500",
};

export default function Progress() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const authed = await base44.auth.isAuthenticated();
        if (authed) {
          const u = await base44.auth.me();
          setUser(u);
        }
      } catch (e) {}
    };
    loadUser();
  }, []);

  const { data: progress = [], isLoading } = useQuery({
    queryKey: ["user-progress"],
    queryFn: () => base44.entities.UserProgress.list("-last_accessed", 500),
  });

  const totalLessons = progress.length;
  const completedLessons = progress.filter((p) => p.status === "completed").length;
  const avgScore = completedLessons
    ? Math.round(
        progress
          .filter((p) => p.status === "completed" && p.score)
          .reduce((s, p) => s + p.score, 0) /
          progress.filter((p) => p.status === "completed" && p.score).length
      )
    : 0;
  const percentage = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Group by module
  const byModule = {};
  progress.forEach((p) => {
    if (!byModule[p.module]) byModule[p.module] = [];
    byModule[p.module].push(p);
  });

  const stats = [
    { icon: BarChart3, label: "Mësime Totale", value: totalLessons, color: "bg-blue-100 text-blue-600" },
    { icon: Trophy, label: "Të Kompletuara", value: completedLessons, color: "bg-emerald-100 text-emerald-600" },
    { icon: TrendingUp, label: "Rezultat Mesatar", value: avgScore + "%", color: "bg-amber-100 text-amber-600" },
    { icon: Target, label: "Përqindja", value: percentage + "%", color: "bg-purple-100 text-purple-600" },
  ];

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Përparimi Im</h2>
        <p className="text-gray-500 mb-6">Duhet të hysh për të parë përparimin tënd</p>
        <button
          onClick={() => base44.auth.redirectToLogin()}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          Hyr / Regjistrohu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Përparimi Im</h1>
        <p className="text-sm text-gray-500 mt-1">Shiko arritjet dhe rezultatet e tua</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white border-gray-100">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Module progress */}
      <Card className="bg-white border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Përparimi sipas Moduleve</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {Object.keys(byModule).length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Ende nuk keni filluar asnjë mësim</p>
              <p className="text-gray-400 text-sm mt-1">Filloni duke eksploruar modulet</p>
            </div>
          ) : (
            Object.entries(byModule).map(([module, items]) => {
              const completed = items.filter((p) => p.status === "completed").length;
              const total = items.length;
              const moduleAvg = items.filter(p => p.score).length
                ? Math.round(items.filter(p => p.score).reduce((s, p) => s + p.score, 0) / items.filter(p => p.score).length)
                : 0;
              const pct = total ? Math.round((completed / total) * 100) : 0;

              return (
                <div key={module}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">
                      {moduleLabels[module] || module}
                    </span>
                    <span className="text-sm text-gray-500">
                      {completed}/{total} ({moduleAvg}%)
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${moduleColors[module] || "bg-emerald-500"}`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}