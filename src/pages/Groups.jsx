import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Trophy, Swords, Check, X, MessageCircle, UserPlus, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

const EMOJI_OPTIONS = ["🕌", "📖", "☪️", "🌙", "⭐", "🏆", "🎯", "🌟", "💎", "🦁"];

export default function Groups() {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [tab, setTab] = useState("discover");
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", description: "", avatar_emoji: "🕌", is_public: true });
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeData, setChallengeData] = useState({ title: "", description: "", challenged_email: "", module: "kurani" });

  useEffect(() => {
    const load = async () => {
      try {
        const authed = await base44.auth.isAuthenticated();
        if (authed) {
          const u = await base44.auth.me();
          setUser(u);
          const [allGroups, myChallenges] = await Promise.all([
            base44.entities.Group.filter({ is_public: true }, "-created_date", 30),
            base44.entities.Challenge.filter({ challenged_email: u.email }, "-created_date", 20),
          ]);
          setGroups(allGroups);
          setMyGroups(allGroups.filter(g => g.members?.includes(u.email) || g.owner_email === u.email));
          setChallenges(myChallenges);
        }
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  const handleCreateGroup = async () => {
    if (!newGroup.name || !user) return;
    await base44.entities.Group.create({
      ...newGroup,
      owner_email: user.email,
      members: [user.email],
      total_group_points: 0,
    });
    setShowCreate(false);
    setNewGroup({ name: "", description: "", avatar_emoji: "🕌", is_public: true });
    const updated = await base44.entities.Group.filter({ is_public: true }, "-created_date", 30);
    setGroups(updated);
    setMyGroups(updated.filter(g => g.members?.includes(user.email) || g.owner_email === user.email));
  };

  const joinGroup = async (group) => {
    if (!user) return;
    const members = [...(group.members || [])];
    if (!members.includes(user.email)) members.push(user.email);
    await base44.entities.Group.update(group.id, { members });
    const updated = await base44.entities.Group.filter({ is_public: true }, "-created_date", 30);
    setGroups(updated);
    setMyGroups(updated.filter(g => g.members?.includes(user.email) || g.owner_email === user.email));
  };

  const leaveGroup = async (group) => {
    if (!user) return;
    const members = (group.members || []).filter(m => m !== user.email);
    await base44.entities.Group.update(group.id, { members });
    const updated = await base44.entities.Group.filter({ is_public: true }, "-created_date", 30);
    setGroups(updated);
    setMyGroups(updated.filter(g => g.members?.includes(user.email) || g.owner_email === user.email));
  };

  const sendChallenge = async () => {
    if (!challengeData.title || !challengeData.challenged_email || !user) return;
    await base44.entities.Challenge.create({
      ...challengeData,
      challenger_email: user.email,
      status: "pending",
    });
    setShowChallenge(false);
    setChallengeData({ title: "", description: "", challenged_email: "", module: "kurani" });
    alert("Sfida u dërgua! ✅");
  };

  const respondChallenge = async (challenge, accept) => {
    await base44.entities.Challenge.update(challenge.id, { status: accept ? "accepted" : "declined" });
    setChallenges(prev => prev.map(c => c.id === challenge.id ? { ...c, status: accept ? "accepted" : "declined" } : c));
  };

  const pendingChallenges = challenges.filter(c => c.status === "pending");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Grupet</h1>
            <p className="text-sm text-gray-500">Mëso & sfido me të tjerët</p>
          </div>
        </div>
        {user && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowChallenge(true)} className="rounded-xl border-red-200 text-red-600 hover:bg-red-50">
              <Swords className="w-4 h-4 mr-1" /> Sfido
            </Button>
            <Button size="sm" onClick={() => setShowCreate(true)} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-1" /> Krijo Grup
            </Button>
          </div>
        )}
      </div>

      {/* Pending challenges notification */}
      {pendingChallenges.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5">
          <p className="font-bold text-red-700 mb-3 flex items-center gap-2">
            <Swords className="w-4 h-4" /> {pendingChallenges.length} sfidë në pritje!
          </p>
          {pendingChallenges.map(c => (
            <div key={c.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-red-100 mb-2">
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{c.title}</p>
                <p className="text-xs text-gray-500">Nga: {c.challenger_email} · Moduli: {c.module}</p>
              </div>
              <button onClick={() => respondChallenge(c, true)} className="w-8 h-8 bg-emerald-100 hover:bg-emerald-200 rounded-xl flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-600" />
              </button>
              <button onClick={() => respondChallenge(c, false)} className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center">
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl">
        {[
          { val: "discover", label: "🌍 Zbulo Grupet" },
          { val: "my", label: `👤 Grupet e Mia (${myGroups.length})` },
        ].map(t => (
          <button key={t.val} onClick={() => setTab(t.val)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.val ? "bg-white shadow text-blue-700" : "text-gray-500"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Groups list */}
      <div className="space-y-3">
        {(tab === "my" ? myGroups : groups).map(g => {
          const isMember = g.members?.includes(user?.email) || g.owner_email === user?.email;
          const isOwner = g.owner_email === user?.email;
          return (
            <motion.div key={g.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {g.avatar_emoji || "🕌"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{g.name}</h3>
                    {g.is_public ? <Globe className="w-3.5 h-3.5 text-gray-400" /> : <Lock className="w-3.5 h-3.5 text-gray-400" />}
                    {isOwner && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Admin</span>}
                  </div>
                  {g.description && <p className="text-sm text-gray-500 mt-0.5 truncate">{g.description}</p>}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Users className="w-3.5 h-3.5" /> {g.members?.length || 0} anëtarë
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                      <Trophy className="w-3.5 h-3.5" /> {g.total_group_points?.toLocaleString() || 0} pikë
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {user && !isMember && (
                    <button onClick={() => joinGroup(g)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-1">
                      <UserPlus className="w-4 h-4" /> Bashkohu
                    </button>
                  )}
                  {user && isMember && !isOwner && (
                    <button onClick={() => leaveGroup(g)} className="px-4 py-2 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 text-sm font-semibold rounded-xl transition-all">
                      Largohu
                    </button>
                  )}
                  {isMember && (
                    <span className="ml-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl">✓ Anëtar</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        {(tab === "my" ? myGroups : groups).length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{tab === "my" ? "Nuk je anëtar i asnjë grupi ende." : "Nuk ka grupe publike."}</p>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      <AnimatePresence>
        {showCreate && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900">Krijo Grup të Ri</h3>
                <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Emoji i Grupit</label>
                  <div className="flex gap-2 flex-wrap">
                    {EMOJI_OPTIONS.map(e => (
                      <button key={e} onClick={() => setNewGroup(p => ({ ...p, avatar_emoji: e }))}
                        className={`w-10 h-10 rounded-xl text-xl transition-all ${newGroup.avatar_emoji === e ? "bg-blue-100 ring-2 ring-blue-400" : "bg-gray-100 hover:bg-gray-200"}`}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Emri i Grupit *</label>
                  <Input value={newGroup.name} onChange={e => setNewGroup(p => ({ ...p, name: e.target.value }))} placeholder="p.sh. Hifz Academy" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Përshkrimi</label>
                  <Input value={newGroup.description} onChange={e => setNewGroup(p => ({ ...p, description: e.target.value }))} placeholder="Çfarë bëni në grup?" className="rounded-xl" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="public" checked={newGroup.is_public} onChange={e => setNewGroup(p => ({ ...p, is_public: e.target.checked }))} className="rounded" />
                  <label htmlFor="public" className="text-sm text-gray-600">Grup publik (të gjithë mund të bashkohen)</label>
                </div>
                <Button onClick={handleCreateGroup} disabled={!newGroup.name} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  Krijo Grupin
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Challenge Modal */}
      <AnimatePresence>
        {showChallenge && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Swords className="w-5 h-5 text-red-500" /> Dërgo Sfidë</h3>
                <button onClick={() => setShowChallenge(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Email i kundërshtarit *</label>
                  <Input value={challengeData.challenged_email} onChange={e => setChallengeData(p => ({ ...p, challenged_email: e.target.value }))} placeholder="shoku@email.com" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Titulli i Sfidës *</label>
                  <Input value={challengeData.title} onChange={e => setChallengeData(p => ({ ...p, title: e.target.value }))} placeholder="p.sh. Kush di më shumë sure?" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Moduli</label>
                  <select value={challengeData.module} onChange={e => setChallengeData(p => ({ ...p, module: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <option value="kurani">📖 Kur'ani</option>
                    <option value="texhuidi">📝 Texhuidi</option>
                    <option value="alfabeti">🔤 Alfabeti</option>
                    <option value="umra_haxh">🕌 Umra & Haxhi</option>
                    <option value="te_gjitha">🌟 Të Gjitha</option>
                  </select>
                </div>
                <Button onClick={sendChallenge} disabled={!challengeData.title || !challengeData.challenged_email} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl">
                  <Swords className="w-4 h-4 mr-2" /> Dërgo Sfidën!
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}