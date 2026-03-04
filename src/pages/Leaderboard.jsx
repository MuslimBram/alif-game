import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Crown, Medal, Users, Zap, TrendingUp, Shield } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";

const LEVEL_CONFIG = {
  Fillestar: { color: "bg-gray-100 text-gray-600", icon: "🌱", min: 0 },
  Nxënës: { color: "bg-blue-100 text-blue-700", icon: "📚", min: 100 },
  Studiues: { color: "bg-purple-100 text-purple-700", icon: "🔬", min: 500 },
  Hafiz: { color: "bg-amber-100 text-amber-700", icon: "⭐", min: 1500 },
  Alim: { color: "bg-emerald-100 text-emerald-700", icon: "🏆", min: 5000 },
};

function getLevel(points) {
  if (points >= 5000) return "Alim";
  if (points >= 1500) return "Hafiz";
  if (points >= 500) return "Studiues";
  if (points >= 100) return "Nxënës";
  return "Fillestar";
}

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tab, setTab] = useState("individual");
  const [myScore, setMyScore] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [scoreList, groupList] = await Promise.all([
          base44.entities.UserScore.list("-total_points", 50),
          base44.entities.Group.list("-total_group_points", 20),
        ]);
        setScores(scoreList);
        setGroups(groupList);

        const authed = await base44.auth.isAuthenticated();
        if (authed) {
          const u = await base44.auth.me();
          setUser(u);
          const mine = scoreList.find(s => s.user_email === u.email);
          setMyScore(mine || null);
        }
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 0) return <Crown className="w-5 h-5 text-amber-500" />;
    if (rank === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="text-sm font-bold text-gray-400 w-5 text-center">{rank + 1}</span>;
  };

  const myRank = scores.findIndex(s => s.user_email === user?.email);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl mx-auto mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Kryesuesit</h1>
        <p className="text-gray-500 mt-1">Shih se ku renditesh në mesin e të gjithëve</p>
      </div>

      {/* My stats */}
      {myScore && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm mb-1">Pikët e tua</p>
              <p className="text-4xl font-extrabold">{myScore.total_points}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                  {LEVEL_CONFIG[getLevel(myScore.total_points)].icon} {getLevel(myScore.total_points)}
                </span>
                {myRank >= 0 && (
                  <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                    #{myRank + 1} në renditje
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl">{LEVEL_CONFIG[getLevel(myScore.total_points)].icon}</div>
              <p className="text-xs text-emerald-200 mt-1">🔥 {myScore.streak_days || 0} ditë radhazi</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl">
        {[
          { val: "individual", label: "👤 Individët" },
          { val: "groups", label: "👥 Grupet" },
        ].map(t => (
          <button key={t.val} onClick={() => setTab(t.val)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.val ? "bg-white shadow text-amber-700" : "text-gray-500"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Individual Leaderboard */}
      {tab === "individual" && (
        <div className="space-y-2">
          {scores.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Asnjë pikë e regjistruar ende.</p>
              <p className="text-sm">Luaj lojëra dhe kuize për të fituar pikë!</p>
            </div>
          )}
          {scores.map((s, i) => {
            const level = getLevel(s.total_points);
            const lc = LEVEL_CONFIG[level];
            const isMe = s.user_email === user?.email;
            return (
              <motion.div key={s.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isMe ? "border-emerald-300 bg-emerald-50" : "border-gray-100 bg-white hover:shadow-sm"}`}>
                <div className="w-8 flex items-center justify-center flex-shrink-0">{getRankIcon(i)}</div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {(s.user_name || s.user_email || "?")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{s.user_name || s.user_email?.split("@")[0] || "Anonim"} {isMe && <span className="text-xs text-emerald-600">(Ti)</span>}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${lc.color}`}>{lc.icon} {level}</span>
                    {s.streak_days > 0 && <span className="text-xs text-orange-500">🔥 {s.streak_days}d</span>}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-extrabold text-gray-900">{s.total_points?.toLocaleString() || 0}</p>
                  <p className="text-xs text-gray-400">pikë</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Groups Leaderboard */}
      {tab === "groups" && (
        <div className="space-y-2">
          {groups.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Asnjë grup ende.</p>
              <Link to={createPageUrl("Groups")} className="text-sm text-emerald-600 underline">Krijo ose bashkohu në grup</Link>
            </div>
          )}
          {groups.map((g, i) => (
            <motion.div key={g.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-sm">
              <div className="w-8 flex items-center justify-center flex-shrink-0">{getRankIcon(i)}</div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                {g.avatar_emoji || "🕌"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{g.name}</p>
                <p className="text-xs text-gray-400">{g.members?.length || 0} anëtarë</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-extrabold text-gray-900">{g.total_group_points?.toLocaleString() || 0}</p>
                <p className="text-xs text-gray-400">pikë</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Level guide */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Nivelet & Pikët</h3>
        <div className="space-y-2">
          {Object.entries(LEVEL_CONFIG).map(([name, cfg]) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-xl">{cfg.icon}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>{name}</span>
              <span className="text-xs text-gray-400">{cfg.min}+ pikë</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}