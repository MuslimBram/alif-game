import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, Upload, Lock, Loader2, ImageIcon, Pencil, Check, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CustomGameModal from "./CustomGameModal";

// ─── SMALL TAG INPUT ───────────────────────────────────────────────────────────
function AddTagInput({ placeholder, color, onAdd }) {
  const [val, setVal] = useState("");
  const colors = {
    emerald: "border-emerald-200 focus:ring-emerald-300",
    blue: "border-blue-200 focus:ring-blue-300"
  };
  const submit = () => { if (val.trim()) { onAdd(val.trim()); setVal(""); }};
  return (
    <div className="flex gap-1">
      <input value={val} onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
        placeholder={placeholder}
        className={`flex-1 border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 ${colors[color]}`} />
      <button onClick={submit} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold">+</button>
    </div>
  );
}

// ─── ADMIN CREATOR ─────────────────────────────────────────────────────────────
function GameForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { title: "", description: "", image_url: "", level: "fillestar", points: 50, conditions: [], options: [] });
  const [uploading, setUploading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(
    !!(initial?.conditions?.length || initial?.options?.length || initial?.level)
  );

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(f => ({ ...f, image_url: file_url }));
    setUploading(false);
  };

  const handleGenerateImage = async () => {
    if (!form.title && !form.description) return;
    setGeneratingImage(true);
    try {
      const result = await base44.integrations.Core.GenerateImage({
        prompt: `Educational game illustration for children: "${form.title}". ${form.description}. Colorful, cheerful, flat design style.`,
      });
      const url = result?.url || result;
      if (!url) throw new Error("Nuk u kthye URL");
      setForm(f => ({ ...f, image_url: url }));
      toast.success("Imazhi u gjenerua! ✅");
    } catch (err) {
      toast.error("Gabim gjatë gjenerimit: " + err.message);
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleGenerateWithAI = async () => {
    if (!form.title || !form.description) return;
    setGeneratingAI(true);
    try {
      const hasImage = !!form.image_url;
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Jeni një ekspert pedagogjik për fëmijë.
${hasImage
  ? `Shiko me kujdes IMAZHIN e lojës. Identifiko çdo figurë, formë, vijë ose objekt që shfaqet në imazh.
Bazuar VETËM në atë që sheh në imazh (jo në titull apo përshkrim), gjenero:`
  : `Bazuar në lojën me titull "${form.title}" dhe përshkrim "${form.description}", gjeneroni:`
}
1. Nivelin e vështirësisë (zgjidhni: fillestar, mesatar, avancuar, profesionist)
2. Pikët (numër nga 10 deri 100)
3. Kushtet - zgjidhni SAKTËSISHT 5 gjëra nga imazhi që fëmija duhet të vizatojë (zgjidhni 5 nga më të lehtat/karakteristiket)
4. Opsionet - të GJITHA gjërat që shihen në imazh + 2-3 shpërndarës që NUK janë në imazh (për kuizin me zgjedhje të shumëfishta)

${hasImage ? "RËNDËSISHME: Nëse imazhi ka shumë objekte (p.sh. 10+), zgjidh vetëm 5 për kushtet, por vendosi të gjitha si opsione!" : ""}
Ktheni vetëm JSON.`,
        file_urls: hasImage ? [form.image_url] : undefined,
        response_json_schema: {
          type: "object",
          properties: {
            level: { type: "string" },
            points: { type: "number" },
            conditions: { type: "array", items: { type: "string" } },
            options: { type: "array", items: { type: "string" } }
          }
        }
      });
      setForm(f => ({
        ...f,
        level: result.level || "fillestar",
        points: result.points || 50,
        conditions: result.conditions || [],
        options: result.options || []
      }));
      setAiGenerated(true);
      toast.success("AI gjeneroi detajet e lojës! ✅");
    } catch (err) {
      toast.error("Gabim: " + err.message);
    } finally {
      setGeneratingAI(false);
    }
  };

  const levelColors = { fillestar: "bg-green-100 text-green-700", mesatar: "bg-blue-100 text-blue-700", avancuar: "bg-purple-100 text-purple-700", profesionist: "bg-amber-100 text-amber-700" };
  const levelIcons = { fillestar: "🌱", mesatar: "📚", avancuar: "⭐", profesionist: "🏆" };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-5 space-y-4 shadow-sm">
      {/* Titulli */}
      <div>
        <label className="text-xs font-semibold text-gray-600 mb-1 block">Titulli *</label>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="p.sh. Vizato Figurat" className="rounded-xl" />
      </div>

      {/* Shpjegimi */}
      <div>
        <label className="text-xs font-semibold text-gray-600 mb-1 block">Shpjegimi *</label>
        <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="Përshkruaj lojën..." rows={3}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-300" />
      </div>

      {/* Imazhi */}
      <div>
        <label className="text-xs font-semibold text-gray-600 mb-1 block">Imazhi i Lojës</label>
        <div className="flex flex-wrap gap-2 mb-2">
          <label className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold cursor-pointer transition-all">
            {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            Ngarko Imazh
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <Button size="sm" variant="outline" onClick={handleGenerateImage} disabled={generatingImage || (!form.title && !form.description)}
            className="rounded-xl text-xs gap-1.5 border-purple-200 text-purple-700 hover:bg-purple-50">
            {generatingImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
            Gjenero Imazh me AI
          </Button>
        </div>
        {form.image_url && (
          <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200">
            <img src={form.image_url} alt="preview" className="w-full h-full object-cover" />
            <button onClick={() => setForm(f => ({ ...f, image_url: "" }))}
              className="absolute top-2 right-2 w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center">
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* AI Generate Button */}
      <div className="border-t border-dashed border-gray-200 pt-3">
        <Button type="button" onClick={handleGenerateWithAI}
          disabled={generatingAI || !form.title.trim() || !form.description.trim()}
          className="w-full rounded-xl gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold">
          {generatingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>✨</span>}
          {generatingAI ? "AI po gjeneron detajet..." : "Gjenero Nivel, Pikë, Kushte & Opsione me AI"}
        </Button>
        {!aiGenerated && <p className="text-xs text-gray-400 text-center mt-1">Kliko pasi ke shkruar titullin dhe përshkrimin</p>}
      </div>

      {/* AI Results Preview */}
      {aiGenerated && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-4 space-y-3">
          <p className="text-xs font-bold text-purple-700 flex items-center gap-1">✨ Gjeneruar nga AI — mund t'i modifikosh</p>

          {/* Level & Points */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Niveli</label>
              <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                className="w-full border border-purple-200 rounded-xl px-3 py-2 text-sm bg-white">
                <option value="fillestar">🌱 Fillestar</option>
                <option value="mesatar">📚 Mesatar</option>
                <option value="avancuar">⭐ Avancuar</option>
                <option value="profesionist">🏆 Profesionist</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Pikët</label>
              <Input type="number" value={form.points} onChange={e => setForm(f => ({ ...f, points: +e.target.value }))} className="rounded-xl w-24 border-purple-200" />
            </div>
          </div>

          {/* Conditions */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">📋 Kushtet (5 për lojë)</label>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {(form.conditions||[]).map((c, i) => (
                <span key={i} className="flex items-center gap-1 bg-white border border-emerald-200 text-emerald-700 text-xs px-2 py-1 rounded-lg font-medium">
                  {c}
                  <button onClick={() => setForm(f => ({ ...f, conditions: f.conditions.filter((_, j) => j !== i) }))}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <AddTagInput placeholder="Shto kusht..." color="emerald"
              onAdd={val => setForm(f => ({ ...f, conditions: [...(f.conditions||[]), val] }))} />
          </div>

          {/* Options */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">🔢 Opsionet (të gjitha zgjedhjet)</label>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {(form.options||[]).map((o, i) => (
                <span key={i} className="flex items-center gap-1 bg-white border border-blue-200 text-blue-700 text-xs px-2 py-1 rounded-lg font-medium">
                  {o}
                  <button onClick={() => setForm(f => ({ ...f, options: f.options.filter((_, j) => j !== i) }))}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <AddTagInput placeholder="Shto opsion..." color="blue"
              onAdd={val => setForm(f => ({ ...f, options: [...(f.options||[]), val] }))} />
          </div>
        </div>
      )}

      {(!form.title || !form.description) && (
        <p className="text-xs text-red-500 font-medium">⚠️ Plotëso Titullin dhe Shpjegimin për të ruajtur</p>
      )}
      <div className="flex gap-2 pt-1">
        <Button type="button" onClick={() => onSave(form)} disabled={!form.title.trim() || !form.description.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-1.5 flex-1">
          <Check className="w-4 h-4" /> Ruaj Lojën
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl">Anulo</Button>
      </div>
    </div>
  );
}

// ─── DISPLAY CARD ──────────────────────────────────────────────────────────────
function CustomGameCard({ game, isAdmin, onEdit, onDelete, onPlay }) {
  const levelColors = {
    fillestar: "bg-green-100 text-green-700",
    mesatar: "bg-blue-100 text-blue-700",
    avancuar: "bg-purple-100 text-purple-700",
    profesionist: "bg-amber-100 text-amber-700",
  };
  const levelIcons = { fillestar: "🌱", mesatar: "📚", avancuar: "⭐", profesionist: "🏆" };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      {game.image_url ? (
        <div className="w-full h-40 overflow-hidden">
          <img src={game.image_url} alt={game.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
          <span className="text-5xl">🎮</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug">{game.title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${levelColors[game.level] || "bg-gray-100 text-gray-600"}`}>
            {levelIcons[game.level]} {game.level}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{game.description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-amber-600">⭐ {game.points} pikë</span>
          <div className="flex items-center gap-1">
            {isAdmin && (
              <>
                <button onClick={() => onEdit(game)} className="w-7 h-7 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center">
                  <Pencil className="w-3.5 h-3.5 text-gray-500" />
                </button>
                <button onClick={() => onDelete(game)} className="w-7 h-7 bg-gray-100 hover:bg-red-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </>
            )}
            <button onClick={onPlay}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all">
              <Play className="w-3 h-3" /> Luaj
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN PANEL ────────────────────────────────────────────────────────────────
export default function CustomGamePanel({ isAdmin, selectedLevel }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editGame, setEditGame] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  const load = async () => {
    setLoading(true);
    const all = await base44.entities.CustomGame.filter({ is_active: true }, "-created_date", 50);
    setGames(all);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    if (editGame) {
      await base44.entities.CustomGame.update(editGame.id, form);
    } else {
      await base44.entities.CustomGame.create({ ...form, is_active: true });
    }
    setShowForm(false);
    setEditGame(null);
    load();
  };

  const handleDelete = async (game) => {
    if (!confirm(`Fshi "${game.title}"?`)) return;
    await base44.entities.CustomGame.update(game.id, { is_active: false });
    load();
  };

  const handleEdit = (game) => {
    setEditGame(game);
    setShowForm(true);
  };

  const filtered = selectedLevel === "te_gjitha"
    ? games
    : games.filter(g => g.level === selectedLevel);

  return (
    <div>
      {/* Admin: Add button */}
      {isAdmin && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            <Lock className="w-3 h-3 inline mr-1" />Vetëm adminët mund të shtojnë lojëra
          </p>
          {!showForm && (
            <Button size="sm" onClick={() => { setEditGame(null); setShowForm(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-1.5">
              <Plus className="w-4 h-4" /> Shto Lojë
            </Button>
          )}
        </div>
      )}

      {/* Form */}
      <AnimatePresence>
        {showForm && isAdmin && (
          <motion.div key="form" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-5">
            <GameForm initial={editGame} onSave={handleSave} onCancel={() => { setShowForm(false); setEditGame(null); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-emerald-400 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl mb-3 block">🎲</span>
          <p className="font-medium">Nuk ka lojëra ende</p>
          {isAdmin && <p className="text-xs mt-1">Shto lojën e parë duke klikuar "Shto Lojë"</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(game => (
            <CustomGameCard key={game.id} game={game} isAdmin={isAdmin} onEdit={handleEdit} onDelete={handleDelete} onPlay={() => setActiveGame(game)} />
          ))}
        </div>
      )}

      {activeGame && (
        <CustomGameModal game={activeGame} onClose={() => setActiveGame(null)} />
      )}
    </div>
  );
}