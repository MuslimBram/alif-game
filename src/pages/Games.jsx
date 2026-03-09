import React, { useState } from "react";
import { Gamepad2, Trophy, Users, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import GameCard from "@/components/games/GameCard";
import QuizGame from "@/components/games/QuizGame";
import AdminEditOverlay from "@/components/admin/AdminEditOverlay";
import { createPageUrl } from "@/utils";

// ─── 60+ GAMES ────────────────────────────────────────────────────────────────
const allGames = [
  // ALFABETI
  { id: 1,  title: "Ngjyro Shkronjat Shqipe", description: "Ngjyrosi shkronjat shqipe me ngjyra dhe mëso formën e tyre", module: "alfabeti", level: "fillestar", duration: "60+ pyetje", points: 50 },
  { id: 8,  title: "Kuiz Alfabeti Shqip", description: "60+ pyetje mbi alfabetin shqip, germat dhe shqiptimin", module: "alfabeti", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 9,  title: "Kuiz Alfabeti Anglisht", description: "60+ pyetje mbi alfabetin anglisht dhe shqiptimin", module: "alfabeti", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 10, title: "Kuiz Alfabeti Arab", description: "60+ pyetje mbi shkronjat arabe dhe format e tyre", module: "alfabeti", level: "fillestar", duration: "60 pyetje", points: 50 },
  { id: 11, title: "Ndërtim Fjalësh Shqip", description: "Ndërto fjalë duke zgjedhur shkronjat e duhura — 60+ kombinime", module: "alfabeti", level: "fillestar", duration: "60+ ushtrime", points: 30 },
  { id: 23, title: "Ndërto Fjalë Shoqe", description: "Gjej fjalën shoqe duke pelqizuar shkronjat — 60+ runde", module: "alfabeti", level: "fillestar", duration: "60+ runde", points: 30 },
  { id: 26, title: "Kuiz Gramatika Arabe", description: "60+ pyetje mbi gramatikën dhe zgjedhimin arab", module: "alfabeti", level: "mesatar", duration: "60 pyetje", points: 60 },
  { id: 27, title: "Përputh Shkronjat Shqipe", description: "Gjej çiftet e shkronjave me ngjyra — 60+ çifte", module: "alfabeti", level: "fillestar", duration: "60+ çifte", points: 25 },
  { id: 29, title: "Kuiz Lakimi i Emrit Shqip", description: "60+ pyetje mbi rasat e emrit shqip: emërore, gjinore, dhanore...", module: "alfabeti", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 30, title: "Kuiz Zgjedhimi i Foljeve Shqip", description: "60+ pyetje mbi zgjedhimin e foljeve shqip në kohë të ndryshme", module: "alfabeti", level: "mesatar", duration: "60 pyetje", points: 60 },
  { id: 31, title: "Kuiz Zgjedhimi Arabisht", description: "60+ pyetje mbi zgjedhimin e foljeve arabe: ماضي، مضارع، أمر", module: "alfabeti", level: "avancuar", duration: "60 pyetje", points: 80 },
  { id: 32, title: "Kuiz Zgjedhimi Anglisht", description: "60+ pyetje mbi zgjedhimin e foljeve angleze në kohë të ndryshme", module: "alfabeti", level: "mesatar", duration: "60 pyetje", points: 55 },
  // TEXHUIDI
  { id: 13, title: "Kuiz Texhuidi Mesatar", description: "60+ pyetje mbi rregullat e texhuidit — nivel mesatar", module: "texhuidi", level: "mesatar", duration: "60 pyetje", points: 60 },
  { id: 14, title: "Kuiz Texhuidi Avancuar", description: "60+ pyetje të vështira mbi texhuidin", module: "texhuidi", level: "avancuar", duration: "60 pyetje", points: 80 },
  { id: 19, title: "Kuiz Texhuidi - Izhar", description: "60+ pyetje specifike mbi Izhar dhe Idgham", module: "texhuidi", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 33, title: "Kuiz Texhuidi - Ikhfa", description: "60+ pyetje mbi rregullën Ikhfa dhe aplikimin e saj", module: "texhuidi", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 34, title: "Kuiz Texhuidi - Madd", description: "60+ pyetje mbi llojet e Madd dhe zgjatimin", module: "texhuidi", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 35, title: "Kuiz Texhuidi - Qalqalah", description: "60+ pyetje mbi rregullën Qalqalah dhe germat e saj", module: "texhuidi", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 36, title: "Identifiko Rregullën", description: "Shiko ajetin dhe identifiko rregullën e texhuidit — 60+ runde", module: "texhuidi", level: "avancuar", duration: "60 runde", points: 90 },
  // KURANI
  { id: 15, title: "Kompletim Ajeti", description: "Plotëso ajetin e Kur'anit — 60+ ajete nga sure të ndryshme", module: "kurani", level: "mesatar", duration: "60 ajete", points: 70 },
  { id: 16, title: "Kuiz Kur'ani Mesatar", description: "60+ pyetje mbi suret, ajetet dhe historinë e Kur'anit", module: "kurani", level: "mesatar", duration: "60 pyetje", points: 65 },
  { id: 20, title: "Plotëso Ajetin - Fatiha", description: "60+ variante pyetjesh mbi Suren Fatiha dhe kuptimin e saj", module: "kurani", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 37, title: "Kuiz Suret e Shkurtra", description: "60+ pyetje mbi suret e fundit të Kur'anit (Juz Amma)", module: "kurani", level: "fillestar", duration: "60 pyetje", points: 50 },
  { id: 38, title: "Kuiz Historitë Kur'anore", description: "60+ pyetje mbi historitë dhe profetët e përmendur në Kur'an", module: "kurani", level: "mesatar", duration: "60 pyetje", points: 65 },
  { id: 39, title: "Rendit Suret", description: "Rendit suret sipas numrit të ajeteve apo zbulimit — 60+ runde", module: "kurani", level: "avancuar", duration: "60 runde", points: 75 },
  { id: 40, title: "Emrat e Sureve", description: "60+ pyetje: gjej emrin e sures nga ajeti i parë ose numri", module: "kurani", level: "mesatar", duration: "60 pyetje", points: 60 },
  // UMRA & HAXHI
  { id: 17, title: "Kuiz Umra Mesatar", description: "60+ pyetje mbi hapat dhe ritualat e Umrës", module: "umra_haxh", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 18, title: "Kuiz Haxhi Avancuar", description: "60+ pyetje të detajuara mbi ritualet e Haxhit", module: "umra_haxh", level: "avancuar", duration: "60 pyetje", points: 80 },
  { id: 21, title: "Rendit Hapat e Umrës", description: "Rendit 60+ hapa dhe veprime të Umrës sipas radhës së saktë", module: "umra_haxh", level: "fillestar", duration: "60+ hapa", points: 45 },
  { id: 22, title: "Rendit Hapat e Haxhit", description: "Rendit 60+ hapa dhe rituale të Haxhit sipas radhës", module: "umra_haxh", level: "fillestar", duration: "60+ hapa", points: 45 },
  { id: 28, title: "Kuiz Umra & Haxhi - Niveli 1", description: "60+ pyetje bazike mbi Umrën dhe Haxhin", module: "umra_haxh", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 41, title: "Vendet e Shenjta", description: "60+ pyetje mbi Kaaben, Mekën, Medinën dhe vendet tjera të shenjta", module: "umra_haxh", level: "mesatar", duration: "60 pyetje", points: 60 },
  { id: 42, title: "Duatë e Haxhit", description: "60+ pyetje mbi duatë që lexohen gjatë ritualeve të Haxhit", module: "umra_haxh", level: "mesatar", duration: "60 pyetje", points: 65 },
  { id: 43, title: "Historia e Haxhit", description: "60+ pyetje mbi historinë dhe kuptimin shpirtëror të Haxhit", module: "umra_haxh", level: "avancuar", duration: "60 pyetje", points: 75 },
  // NUMRA & LOJËRA
  { id: 2,  title: "Loja e Numrave", description: "60+ ushtrime matematikore: mbledhje, zbritje, shumëzo, pjesëto", module: "lojera", level: "fillestar", duration: "60+ pyetje", points: 40 },
  { id: 3,  title: "Koordinimi i 2 Duarve", description: "60+ lunde për të stërvitur koordinimin bilateral", module: "lojera", level: "fillestar", duration: "60+ lunde", points: 30 },
  { id: 4,  title: "Puzzle Edukativ", description: "60+ puzzle didaktike me numra dhe shkronja", module: "lojera", level: "fillestar", duration: "60+ puzzle", points: 35 },
  { id: 5,  title: "Labirinti 60 Nivele", description: "60 labirinte me vështirësi progresive — stërvit mendjen", module: "lojera", level: "fillestar", duration: "60 nivele", points: 50 },
  { id: 6,  title: "Shumëzimi & Pjesëtimi", description: "Tabela 1-12 vizuale + 60+ ushtrime shumëzimi, pjesëtimi", module: "lojera", level: "fillestar", duration: "60+ ushtrime", points: 40 },
  { id: 7,   title: "🧠 Brain Gym Vizual", description: "Gjej modelin e njëjtë! Rrjeta 3×3, koha e limituar.", module: "lojera", level: "fillestar", duration: "pa limit", points: 60, isBrainGym: true, brainGymLevel: "fillestar" },
  { id: 71,  title: "🧠 Brain Gym Vizual", description: "Gjej modelin e njëjtë! Rrjeta 4×4, vështirësi mesatare.", module: "lojera", level: "mesatar", duration: "pa limit", points: 80, isBrainGym: true, brainGymLevel: "mesatar" },
  { id: 72,  title: "🧠 Brain Gym Vizual", description: "Gjej modelin e njëjtë! Rrjeta 5×5, vështirësi e lartë.", module: "lojera", level: "avancuar", duration: "pa limit", points: 100, isBrainGym: true, brainGymLevel: "avancuar" },
  { id: 73,  title: "🧠 Brain Gym Vizual", description: "Gjej modelin e njëjtë! Rrjeta 6×6, nivel profesionist.", module: "lojera", level: "profesionist", duration: "pa limit", points: 150, isBrainGym: true, brainGymLevel: "profesionist" },
  // FIKH
  { id: 47, title: "Kuiz Akide & Besimi", description: "60+ pyetje mbi Tevhidin, 3 Parimet, 5 Shtyllat dhe 6 Kushtet e Imanit", module: "fikh", level: "fillestar", duration: "60 pyetje", points: 50 },
  { id: 48, title: "Kuiz Pastërtia & Abdesi", description: "60+ pyetje mbi Abdesin, Guslin, llojet e ujit dhe pastërtinë rituale", module: "fikh", level: "fillestar", duration: "60 pyetje", points: 45 },
  { id: 49, title: "Kuiz Namazi", description: "60+ pyetje mbi hapat e namazit, kushtet, kohët dhe çfarë e prish namazin", module: "fikh", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 50, title: "Kuiz Agjërimi & Zekati", description: "60+ pyetje mbi kushtet e agjërimit, Ramazanin, Zekatin dhe Fitrin", module: "fikh", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 51, title: "Kuiz Fikh Avancuar", description: "60+ pyetje të avancuara: Isra & Mi'raxhi, Hadithi i Xhibrilit, dispozita të vështira", module: "fikh", level: "avancuar", duration: "60 pyetje", points: 80 },
  { id: 12, title: "Lojë Memorie - Shkronja", description: "Gjej çiftet e shkronjave — 60+ kombinime", module: "lojera", level: "fillestar", duration: "60+ çifte", points: 25 },
  { id: 24, title: "Lojë Memorie - Shkronjat Arabe", description: "Gjej çiftet e shkronjave arabe — 60+ kombinime", module: "lojera", level: "fillestar", duration: "60+ çifte", points: 30 },
  { id: 25, title: "Lojë me Numra Shqip", description: "Mëso numrat nga 1 në 100 me lojëra interaktive — 60+ ushtrime", module: "lojera", level: "fillestar", duration: "60+ ushtrime", points: 25 },
  { id: 44, title: "Llogaritjet e Shpejta", description: "60+ ushtrime aritmetike me kohëmatës — kush është më i shpejtë?", module: "lojera", level: "mesatar", duration: "60+ pyetje", points: 55 },
  { id: 45, title: "Numrat Arabisht", description: "60+ ushtrime mbi numrat arabë (١ ٢ ٣...) dhe shqiptimin e tyre", module: "lojera", level: "fillestar", duration: "60 ushtrime", points: 35 },
  { id: 46, title: "Kuiz Orët dhe Koha", description: "60+ pyetje mbi orën, ditët, muajt — shqip, anglisht, arabisht", module: "lojera", level: "mesatar", duration: "60 pyetje", points: 45 },
];

const modules = [
  { value: "te_gjitha", label: "🎮 Të Gjitha" },
  { value: "alfabeti",  label: "🔤 Alfabeti" },
  { value: "texhuidi",  label: "📖 Texhuidi" },
  { value: "kurani",    label: "☪️ Kur'ani" },
  { value: "umra_haxh", label: "🕌 Umra & Haxhi" },
  { value: "fikh",      label: "📚 Fikh (FE)" },
  { value: "lojera",    label: "🔢 Numrat" },
];

const levels = [
  { value: "te_gjitha",   label: "🌟 Të Gjitha" },
  { value: "fillestar",   label: "🌱 Fillestar" },
  { value: "mesatar",     label: "📚 Mesatar" },
  { value: "avancuar",    label: "🔬 Avancuar" },
  { value: "profesionist",label: "🏆 Profesionist" },
];

const QUIZ_GAME_MAP = {
  8: "alphabeti_shqip", 9: "alfabeti_anglisht", 10: "alfabeti_arab",
  11: "alphabeti_shqip", 23: "alphabeti_shqip", 24: "alfabeti_arab", 27: "alphabeti_shqip",
  29: "alphabeti_shqip", 30: "alphabeti_shqip", 31: "alfabeti_arab", 32: "alfabeti_anglisht",
  1: "alphabeti_shqip", 36: "texhuidi",
  13: "texhuidi", 14: "texhuidi", 19: "texhuidi", 33: "texhuidi", 34: "texhuidi", 35: "texhuidi",
  15: "kurani", 16: "kurani", 20: "kurani", 37: "kurani", 38: "kurani", 39: "kurani", 40: "kurani",
  17: "umra_haxh", 18: "umra_haxh", 21: "umra_haxh", 22: "umra_haxh", 28: "umra_haxh",
  41: "umra_haxh", 42: "umra_haxh", 43: "umra_haxh",
  47: "fikh", 48: "fikh", 49: "fikh", 50: "fikh", 51: "fikh",
  2: "lojera_numra", 7: "lojera_numra", 25: "lojera_numra", 26: "alfabeti_arab",
  44: "lojera_numra", 45: "alfabeti_arab", 46: "lojera_numra",
};

// ─── INLINE: Leaderboard, Groups, Progress (mini versions) ───────────────────
import MathGame from "@/components/games/MathGame";
import MemoryGame from "@/components/games/MemoryGame";
import BrainGymGame from "@/components/games/BrainGymGame.jsx";
import CustomGamePanel from "@/components/games/CustomGamePanel";
import { base44 } from "@/api/base44Client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Medal, Globe, Lock, Plus, Swords, UserPlus, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LEVEL_CONFIG = {
  Fillestar: { color: "bg-gray-100 text-gray-600", icon: "🌱" },
  Nxënës:    { color: "bg-blue-100 text-blue-700",   icon: "📚" },
  Studiues:  { color: "bg-purple-100 text-purple-700",icon: "🔬" },
  Hafiz:     { color: "bg-amber-100 text-amber-700",  icon: "⭐" },
  Alim:      { color: "bg-emerald-100 text-emerald-700", icon: "🏆" },
};
function getLevel(p) {
  if (p >= 5000) return "Alim"; if (p >= 1500) return "Hafiz";
  if (p >= 500) return "Studiues"; if (p >= 100) return "Nxënës";
  return "Fillestar";
}
function getRankIcon(rank) {
  if (rank === 0) return <Crown className="w-5 h-5 text-amber-500" />;
  if (rank === 1) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-amber-700" />;
  return <span className="text-sm font-bold text-gray-400 w-5 text-center">{rank + 1}</span>;
}

function LeaderboardTab() {
  const [scores, setScores] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tab, setTab] = useState("individual");
  const [user, setUser] = useState(null);
  useEffect(() => {
    base44.auth.isAuthenticated().then(async (a) => {
      if (a) { const u = await base44.auth.me(); setUser(u); }
      const [s, g] = await Promise.all([
        base44.entities.UserScore.list("-total_points", 50),
        base44.entities.Group.list("-total_group_points", 20),
      ]);
      setScores(s); setGroups(g);
    });
  }, []);
  const myScore = scores.find(s => s.user_email === user?.email);
  const myRank  = scores.findIndex(s => s.user_email === user?.email);
  return (
    <div>
      {myScore && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 mb-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm mb-1">Pikët e tua</p>
              <p className="text-4xl font-extrabold">{myScore.total_points}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                  {LEVEL_CONFIG[getLevel(myScore.total_points)]?.icon} {getLevel(myScore.total_points)}
                </span>
                {myRank >= 0 && <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">#{myRank + 1} në renditje</span>}
              </div>
            </div>
            <div className="text-5xl">{LEVEL_CONFIG[getLevel(myScore.total_points)]?.icon}</div>
          </div>
        </div>
      )}
      <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-2xl">
        {[{ v: "individual", l: "👤 Individët" }, { v: "groups", l: "👥 Grupet" }].map(t => (
          <button key={t.v} onClick={() => setTab(t.v)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.v ? "bg-white shadow text-amber-700" : "text-gray-500"}`}>{t.l}</button>
        ))}
      </div>
      {tab === "individual" && (
        <div className="space-y-2">
          {scores.length === 0 && <div className="text-center py-10 text-gray-400"><Trophy className="w-10 h-10 mx-auto mb-2 opacity-30" /><p>Asnjë pikë ende. Luaj lojëra për të fituar!</p></div>}
          {scores.map((s, i) => {
            const lv = getLevel(s.total_points);
            const isMe = s.user_email === user?.email;
            return (
              <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl border ${isMe ? "border-emerald-300 bg-emerald-50" : "border-gray-100 bg-white"}`}>
                <div className="w-7 flex items-center justify-center">{getRankIcon(i)}</div>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                  {(s.user_name || s.user_email || "?")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{s.user_name || s.user_email?.split("@")[0]} {isMe && <span className="text-xs text-emerald-600">(Ti)</span>}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${LEVEL_CONFIG[lv]?.color}`}>{LEVEL_CONFIG[lv]?.icon} {lv}</span>
                </div>
                <p className="font-extrabold text-gray-900">{s.total_points?.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      )}
      {tab === "groups" && (
        <div className="space-y-2">
          {groups.map((g, i) => (
            <div key={g.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white">
              <div className="w-7 flex items-center justify-center">{getRankIcon(i)}</div>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl">{g.avatar_emoji || "🕌"}</div>
              <div className="flex-1"><p className="font-semibold text-sm">{g.name}</p><p className="text-xs text-gray-400">{g.members?.length || 0} anëtarë</p></div>
              <p className="font-extrabold">{g.total_group_points?.toLocaleString() || 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EMOJI_OPTIONS = ["🕌","📖","☪️","🌙","⭐","🏆","🎯","🌟","💎","🦁"];

function GroupsTab() {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [tab, setTab] = useState("discover");
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", description: "", avatar_emoji: "🕌", is_public: true });
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeData, setChallengeData] = useState({ title: "", challenged_email: "", module: "kurani" });

  const load = async () => {
    const a = await base44.auth.isAuthenticated();
    if (!a) return;
    const u = await base44.auth.me(); setUser(u);
    const [all, ch] = await Promise.all([
      base44.entities.Group.filter({ is_public: true }, "-created_date", 30),
      base44.entities.Challenge.filter({ challenged_email: u.email }, "-created_date", 20),
    ]);
    setGroups(all);
    setMyGroups(all.filter(g => g.members?.includes(u.email) || g.owner_email === u.email));
    setChallenges(ch);
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!newGroup.name || !user) return;
    await base44.entities.Group.create({ ...newGroup, owner_email: user.email, members: [user.email], total_group_points: 0 });
    setShowCreate(false); setNewGroup({ name: "", description: "", avatar_emoji: "🕌", is_public: true }); load();
  };
  const join = async (g) => {
    const m = [...(g.members || [])]; if (!m.includes(user.email)) m.push(user.email);
    await base44.entities.Group.update(g.id, { members: m }); load();
  };
  const leave = async (g) => {
    await base44.entities.Group.update(g.id, { members: (g.members || []).filter(m => m !== user.email) }); load();
  };
  const sendChallenge = async () => {
    if (!challengeData.title || !challengeData.challenged_email || !user) return;
    await base44.entities.Challenge.create({ ...challengeData, challenger_email: user.email, status: "pending" });
    setShowChallenge(false); setChallengeData({ title: "", challenged_email: "", module: "kurani" });
    toast.success("Sfida u dërgua! ✅");
  };
  const respond = async (c, accept) => {
    await base44.entities.Challenge.update(c.id, { status: accept ? "accepted" : "declined" });
    setChallenges(prev => prev.map(x => x.id === c.id ? { ...x, status: accept ? "accepted" : "declined" } : x));
  };

  const pending = challenges.filter(c => c.status === "pending");
  const list = tab === "my" ? myGroups : groups;

  return (
    <div>
      {!user && <div className="text-center py-10 text-gray-400"><Users className="w-10 h-10 mx-auto mb-2 opacity-30"/><p>Hyr për të parë grupet</p><button onClick={() => base44.auth.redirectToLogin()} className="mt-3 px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold">Hyr</button></div>}
      {user && (
        <>
          {/* Header actions */}
          <div className="flex gap-2 mb-4 justify-end">
            <Button size="sm" variant="outline" onClick={() => setShowChallenge(true)} className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"><Swords className="w-4 h-4 mr-1"/>Sfido</Button>
            <Button size="sm" onClick={() => setShowCreate(true)} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-1"/>Krijo Grup</Button>
          </div>
          {pending.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
              <p className="font-bold text-red-700 mb-2 text-sm flex items-center gap-2"><Swords className="w-4 h-4"/>{pending.length} sfidë në pritje!</p>
              {pending.map(c => (
                <div key={c.id} className="flex items-center gap-2 bg-white rounded-xl p-2.5 border border-red-100 mb-2">
                  <div className="flex-1"><p className="font-semibold text-sm">{c.title}</p><p className="text-xs text-gray-400">Nga: {c.challenger_email}</p></div>
                  <button onClick={() => respond(c, true)} className="w-7 h-7 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center"><Check className="w-3.5 h-3.5 text-emerald-600"/></button>
                  <button onClick={() => respond(c, false)} className="w-7 h-7 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center"><X className="w-3.5 h-3.5 text-red-600"/></button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-2xl">
            {[{ v: "discover", l: "🌍 Zbulo" }, { v: "my", l: `👤 Grupet e Mia (${myGroups.length})` }].map(t => (
              <button key={t.v} onClick={() => setTab(t.v)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.v ? "bg-white shadow text-blue-700" : "text-gray-500"}`}>{t.l}</button>
            ))}
          </div>
          <div className="space-y-3">
            {list.map(g => {
              const isMember = g.members?.includes(user.email) || g.owner_email === user.email;
              const isOwner = g.owner_email === user.email;
              return (
                <div key={g.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl flex-shrink-0">{g.avatar_emoji || "🕌"}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm">{g.name}</h3>
                        {isOwner && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Admin</span>}
                      </div>
                      {g.description && <p className="text-xs text-gray-500 mt-0.5 truncate">{g.description}</p>}
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <span><Users className="w-3 h-3 inline mr-0.5"/>{g.members?.length || 0}</span>
                        <span className="text-amber-600 font-semibold"><Trophy className="w-3 h-3 inline mr-0.5"/>{g.total_group_points || 0} pikë</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {!isMember && <button onClick={() => join(g)} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-xl"><UserPlus className="w-3 h-3 inline mr-1"/>Bashkohu</button>}
                      {isMember && !isOwner && <button onClick={() => leave(g)} className="px-3 py-1.5 bg-gray-100 hover:bg-red-100 text-gray-500 text-xs font-semibold rounded-xl">Largohu</button>}
                      {isMember && <span className="ml-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-xl">✓</span>}
                    </div>
                  </div>
                </div>
              );
            })}
            {list.length === 0 && <div className="text-center py-8 text-gray-400 text-sm">{tab === "my" ? "Nuk je anëtar i asnjë grupi." : "Nuk ka grupe publike."}</div>}
          </div>
        </>
      )}
      <AnimatePresence>
        {showCreate && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Krijo Grup të Ri</h3>
                <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>
              <div className="space-y-3">
                <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Emoji</label>
                  <div className="flex gap-1.5 flex-wrap">{EMOJI_OPTIONS.map(e => <button key={e} onClick={() => setNewGroup(p => ({...p, avatar_emoji: e}))} className={`w-10 h-10 rounded-xl text-xl ${newGroup.avatar_emoji === e ? "bg-blue-100 ring-2 ring-blue-400" : "bg-gray-100"}`}>{e}</button>)}</div>
                </div>
                <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Emri *</label><Input value={newGroup.name} onChange={e => setNewGroup(p => ({...p, name: e.target.value}))} placeholder="p.sh. Hifz Academy" className="rounded-xl"/></div>
                <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Përshkrimi</label><Input value={newGroup.description} onChange={e => setNewGroup(p => ({...p, description: e.target.value}))} placeholder="Çfarë bëni?" className="rounded-xl"/></div>
                <div className="flex items-center gap-2"><input type="checkbox" checked={newGroup.is_public} onChange={e => setNewGroup(p => ({...p, is_public: e.target.checked}))} className="rounded"/><label className="text-sm text-gray-600">Grup publik</label></div>
                <Button onClick={handleCreate} disabled={!newGroup.name} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Krijo Grupin</Button>
              </div>
            </motion.div>
          </div>
        )}
        {showChallenge && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><Swords className="w-5 h-5 text-red-500"/>Dërgo Sfidë</h3>
                <button onClick={() => setShowChallenge(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>
              <div className="space-y-3">
                <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Email i kundërshtarit *</label><Input value={challengeData.challenged_email} onChange={e => setChallengeData(p => ({...p, challenged_email: e.target.value}))} placeholder="shoku@email.com" className="rounded-xl"/></div>
                <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Titulli *</label><Input value={challengeData.title} onChange={e => setChallengeData(p => ({...p, title: e.target.value}))} placeholder="Kush di më shumë sure?" className="rounded-xl"/></div>
                <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Moduli</label>
                  <select value={challengeData.module} onChange={e => setChallengeData(p => ({...p, module: e.target.value}))} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm">
                    <option value="kurani">📖 Kur'ani</option><option value="texhuidi">📝 Texhuidi</option><option value="alfabeti">🔤 Alfabeti</option><option value="umra_haxh">🕌 Umra & Haxhi</option><option value="te_gjitha">🌟 Të Gjitha</option>
                  </select>
                </div>
                <Button onClick={sendChallenge} disabled={!challengeData.title || !challengeData.challenged_email} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl">
                  <Swords className="w-4 h-4 mr-2"/>Dërgo Sfidën!
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProgressTab() {
  const [progress, setProgress] = useState([]);
  useEffect(() => {
    base44.entities.UserProgress.list("-last_accessed", 500).then(setProgress);
  }, []);
  const moduleLabels = { alfabeti: "Alfabeti", texhuidi: "Texhuidi", kurani: "Kur'ani", umra_haxh: "Umra & Haxhi", lojera: "Lojëra" };
  const moduleColors = { alfabeti: "bg-emerald-500", texhuidi: "bg-amber-500", kurani: "bg-blue-500", umra_haxh: "bg-purple-500", lojera: "bg-pink-500" };
  const byModule = {};
  progress.forEach(p => { if (!byModule[p.module]) byModule[p.module] = []; byModule[p.module].push(p); });
  const completed = progress.filter(p => p.status === "completed").length;
  const pct = progress.length ? Math.round((completed / progress.length) * 100) : 0;
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { l: "Totale", v: progress.length, c: "bg-blue-50 text-blue-700" },
          { l: "Komplete", v: completed, c: "bg-emerald-50 text-emerald-700" },
          { l: "Përqindja", v: pct + "%", c: "bg-purple-50 text-purple-700" },
        ].map(s => (
          <div key={s.l} className={`rounded-2xl p-4 text-center ${s.c}`}>
            <p className="text-2xl font-extrabold">{s.v}</p>
            <p className="text-xs font-medium mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
      {Object.keys(byModule).length === 0 ? (
        <div className="text-center py-10 text-gray-400"><BarChart3 className="w-10 h-10 mx-auto mb-2 opacity-30"/><p>Ende nuk ke filluar asnjë mësim</p></div>
      ) : Object.entries(byModule).map(([mod, items]) => {
        const done = items.filter(p => p.status === "completed").length;
        const pp = items.length ? Math.round((done / items.length) * 100) : 0;
        return (
          <div key={mod} className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-gray-800">{moduleLabels[mod] || mod}</span>
              <span className="text-xs text-gray-400">{done}/{items.length}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${pp}%` }} transition={{ duration: 0.8 }}
                className={`h-full rounded-full ${moduleColors[mod] || "bg-emerald-500"}`}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN GAMES PAGE ──────────────────────────────────────────────────────────
export default function Games({ adminEditMode, isAdmin }) {
  const [selectedModule, setSelectedModule] = useState("te_gjitha");
  const [selectedLevel, setSelectedLevel] = useState("te_gjitha");
  const [activeGame, setActiveGame] = useState(null);
  const [activeMath, setActiveMath] = useState(false);
  const [activeMemory, setActiveMemory] = useState(false);
  const [activeBrainGym, setActiveBrainGym] = useState(false);
  const [brainGymLevel, setBrainGymLevel] = useState("fillestar");
  const [mainTab, setMainTab] = useState("lojerat");


  const filtered = allGames.filter(g => {
    const mM = selectedModule === "te_gjitha" || g.module === selectedModule;
    const lM = selectedLevel === "te_gjitha" || g.level === selectedLevel;
    return mM && lM;
  });

  const handlePlay = (game) => {
    if (game.isBrainGym) {
      setBrainGymLevel(game.brainGymLevel || "fillestar");
      setActiveBrainGym(true);
    } else if (QUIZ_GAME_MAP[game.id]) {
      setActiveGame({ ...game, quizKey: QUIZ_GAME_MAP[game.id] });
    } else if ([2, 44, 6, 4, 5, 3].includes(game.id)) {
      setActiveMath(true);
    } else if ([12, 24, 27].includes(game.id)) {
      setActiveMemory(true);
    } else {
      setActiveMath(true);
    }
  };

  const mainTabs = [
    { v: "lojerat",     l: "🎮 Lojërat",      icon: Gamepad2 },
    { v: "kryesuesit",  l: "🏆 Kryesuesit",   icon: Trophy },
    { v: "grupet",      l: "👥 Grupet",        icon: Users },
    { v: "perparimi",   l: "📊 Përparimi",     icon: BarChart3 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      <AdminEditOverlay show={adminEditMode && isAdmin} title="Edito Lojërat" items={[
        { label: "Shto Lojë", href: createPageUrl("AdminPanel"), icon: "➕" },
      ]} />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">🎮 Lojëra & Sfida</h1>
        <p className="text-sm text-gray-500 mt-1">Mëso duke luajtur, sfido shokët dhe shiko progresin tënd</p>
      </div>

      {/* Main tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-2xl overflow-x-auto">
        {mainTabs.map(t => (
          <button key={t.v} onClick={() => setMainTab(t.v)}
            className={`flex-1 min-w-max py-2.5 px-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${mainTab === t.v ? "bg-emerald-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
            {t.l}
          </button>
        ))}
      </div>

      {/* LOJËRAT TAB */}
      {mainTab === "lojerat" && (
        <>
          <div className="mb-4">
            <p className="text-xs font-semibold text-emerald-700 mb-2">Moduli:</p>
            <div className="flex flex-wrap gap-2">
              {modules.map(m => (
                <button key={m.value} onClick={() => setSelectedModule(m.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedModule === m.value ? "bg-emerald-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"}`}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <p className="text-xs font-semibold text-emerald-700 mb-2">Niveli:</p>
            <div className="flex flex-wrap gap-2">
              {levels.map(l => (
                <button key={l.value} onClick={() => setSelectedLevel(l.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedLevel === l.value ? "bg-teal-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-teal-300"}`}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <span className="text-xs text-gray-400 font-medium">{filtered.length} lojëra</span>
          </div>
          {activeGame && <QuizGame gameId={activeGame.id} quizKey={activeGame.quizKey} onClose={() => setActiveGame(null)} />}
          {activeMath && <MathGame onClose={() => setActiveMath(false)} />}
          {activeMemory && <MemoryGame onClose={() => setActiveMemory(false)} />}
          {activeBrainGym && <BrainGymGame initialLevel={brainGymLevel} onClose={() => setActiveBrainGym(false)} />}
          {filtered.length === 0 ? (
            <div className="text-center py-20"><Gamepad2 className="w-12 h-12 text-gray-300 mx-auto mb-4"/><p className="text-gray-500">Nuk ka lojëra për këto filtra</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(game => <GameCard key={game.id} game={game} onPlay={handlePlay} />)}
            </div>
          )}
        </>
      )}

      {mainTab === "kryesuesit" && <LeaderboardTab />}
      {mainTab === "grupet" && <GroupsTab />}
      {mainTab === "perparimi" && <ProgressTab />}
    </div>
  );
}