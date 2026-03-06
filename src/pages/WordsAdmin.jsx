import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import PhotoGenerator360 from "@/components/admin/PhotoGenerator360";

const UMRA_PLACES = [
  { id: "mikat", name: "Mikati", emoji: "⬜", desc: "Pika e hyrjes në ihram — prag i shenjtë" },
  { id: "kaabe", name: "Qabeja", emoji: "🕋", desc: "Shtëpia e Allahut — qendra e tavafit" },
  { id: "hatim", name: "Hatim", emoji: "🌙", desc: "Gjysëmhëna pranë Qabesë — pjesë e saj" },
  { id: "maqam", name: "Makam Ibrahim", emoji: "👣", desc: "Guri i gjurmës së Ibrahimit (a.s.)" },
  { id: "zemzem", name: "Burimi Zamzam", emoji: "💧", desc: "Uji i shenjtë i shpallur nga Allahu" },
  { id: "safa", name: "Safa", emoji: "⛰️", desc: "Kodra e parë e Sa'jit — fillon këtu" },
  { id: "merva", name: "Merva", emoji: "🏔️", desc: "Kodra e fundit e Sa'jit" },
];

const HAJJ_PLACES = [
  ...UMRA_PLACES,
  { id: "mina", name: "Mina", emoji: "⛺", desc: "Qyteti i çadrave — 3 netë" },
  { id: "arafat", name: "Arafati", emoji: "🌄", desc: "Shtylla kryesore e Haxhit" },
  { id: "muzdalifa", name: "Muzdelifa", emoji: "🌙", desc: "Nata e mbledhjes së gurëve" },
  { id: "xhemra_sugra", name: "Xhemretul-Sugra", emoji: "🪨", desc: "Xhemraja e vogël" },
  { id: "xhemra_vusta", name: "Xhemretul-Vusta", emoji: "🪨", desc: "Xhemraja e mesme" },
  { id: "xhemra_akabe", name: "Xhemretul-Akabe", emoji: "🪨", desc: "Xhemraja e madhe" },
];

const UMRA_ROUTE = [
  { from: "mikat", to: "kaabe", label: "Ihram → Tavaf", color: "bg-emerald-500" },
  { from: "kaabe", to: "maqam", label: "Tavaf → Namaz", color: "bg-blue-500" },
  { from: "maqam", to: "safa", label: "Namaz → Sa'j", color: "bg-amber-500" },
  { from: "safa", to: "merva", label: "Sa'j ×7", color: "bg-orange-500" },
  { from: "merva", to: null, label: "Qethja → Ihrami mbaron", color: "bg-rose-500" },
];

const HAJJ_ROUTE = [
  { from: "mikat", to: "mina", label: "8 Dhul-Hixhe: Ihram → Mina", color: "bg-emerald-500" },
  { from: "mina", to: "arafat", label: "9 Dhul-Hixhe: Arafati (Wuquf)", color: "bg-amber-500" },
  { from: "arafat", to: "muzdalifa", label: "Muzdelifa — Nata", color: "bg-indigo-500" },
  { from: "muzdalifa", to: "xhemra_akabe", label: "10 Dhul-Hixhe: Gurët", color: "bg-red-500" },
  { from: "xhemra_akabe", to: "kaabe", label: "Tavafi i Ifadës", color: "bg-blue-500" },
  { from: "kaabe", to: "mina", label: "Ditët e Teshrîkut (11-13)", color: "bg-teal-500" },
  { from: "mina", to: "kaabe", label: "Tavafi i Vedas — Lamtumirë", color: "bg-purple-500" },
];

const JOBS = [
  { language: "shqip",    level: "fillestar",    target: 500,  label: "🇦🇱 Shqip — Fillestar" },
  { language: "shqip",    level: "mesatar",      target: 2000, label: "🇦🇱 Shqip — Mesatar" },
  { language: "shqip",    level: "avancuar",     target: 500,  label: "🇦🇱 Shqip — Avancuar" },
  { language: "shqip",    level: "profesionist", target: 200,  label: "🇦🇱 Shqip — Profesionist" },
  { language: "anglisht", level: "fillestar",    target: 500,  label: "🇬🇧 Anglisht — Fillestar" },
  { language: "anglisht", level: "mesatar",      target: 2000, label: "🇬🇧 Anglisht — Mesatar" },
  { language: "anglisht", level: "avancuar",     target: 500,  label: "🇬🇧 Anglisht — Avancuar" },
  { language: "anglisht", level: "profesionist", target: 200,  label: "🇬🇧 Anglisht — Profesionist" },
  { language: "arabisht", level: "fillestar",    target: 500,  label: "🇸🇦 Arabisht — Fillestar" },
  { language: "arabisht", level: "mesatar",      target: 2000, label: "🇸🇦 Arabisht — Mesatar" },
  { language: "arabisht", level: "avancuar",     target: 500,  label: "🇸🇦 Arabisht — Avancuar" },
  { language: "arabisht", level: "profesionist", target: 200,  label: "🇸🇦 Arabisht — Profesionist" },
];

function PilgrimageMapView() {
  const [ritual, setRitual] = useState("umra");
  const [activeStep, setActiveStep] = useState(null);
  const places = ritual === "umra" ? UMRA_PLACES : HAJJ_PLACES;
  const route = ritual === "umra" ? UMRA_ROUTE : HAJJ_ROUTE;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
      <h2 className="text-xl font-extrabold text-gray-800 mb-1">🗺️ Harta Interaktive e Rrugëtimit</h2>
      <p className="text-sm text-gray-500 mb-4">Lëviz vizualisht nëpër vendet e shenjta</p>

      <div className="flex gap-2 mb-5">
        {["umra","hajj"].map(r => (
          <button key={r} onClick={() => { setRitual(r); setActiveStep(null); }}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${ritual === r ? "bg-emerald-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {r === "umra" ? "🕌 Umra" : "🕋 Haxhi"}
          </button>
        ))}
      </div>

      {/* Route steps */}
      <div className="mb-5">
        <p className="text-xs font-bold text-gray-500 uppercase mb-3">Rrugëtimi hap pas hapi</p>
        <div className="flex flex-wrap gap-2">
          {route.map((step, i) => (
            <button key={i} onClick={() => setActiveStep(activeStep === i ? null : i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                activeStep === i ? "bg-gray-800 text-white border-gray-800" : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400"
              }`}>
              <span className={`w-5 h-5 rounded-full ${step.color} text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0`}>{i+1}</span>
              {step.label}
            </button>
          ))}
        </div>
        {activeStep !== null && (
          <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-sm font-bold text-emerald-800">Hapi {activeStep + 1}: {route[activeStep].label}</p>
            {route[activeStep].from && (
              <p className="text-xs text-emerald-600 mt-1">
                📍 {places.find(p=>p.id===route[activeStep].from)?.emoji} {places.find(p=>p.id===route[activeStep].from)?.name}
                {route[activeStep].to && ` → ${places.find(p=>p.id===route[activeStep].to)?.emoji || ""} ${places.find(p=>p.id===route[activeStep].to)?.name || ""}`}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Places grid */}
      <p className="text-xs font-bold text-gray-500 uppercase mb-3">Vendet e shenjta</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {places.map(place => {
          const isOnRoute = route.some(r => r.from === place.id || r.to === place.id);
          return (
            <div key={place.id}
              className={`rounded-2xl border-2 p-3 text-center transition-all ${isOnRoute ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-gray-50"}`}>
              <div className="text-3xl mb-1">{place.emoji}</div>
              <p className="font-bold text-gray-800 text-xs">{place.name}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{place.desc}</p>
              {isOnRoute && <span className="inline-block mt-1.5 text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">✓ Rrugë</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BrainGymGame() {
  const PATTERNS = [
    { shapes: ["▐▌","▐▌","▐▌"], type: "lines", answer: "▐▌", options: ["▐▌","◀▶","▲▼","▌▐"] },
    { shapes: ["❮❮","❮❮","❮❮"], type: "chevron", answer: "❮❮", options: ["❯❯","❮❮","⟨⟩","◁◁"] },
    { shapes: ["⊏⊐","⊏⊐","⊏⊐"], type: "bracket", answer: "⊏⊐", options: ["⊏⊐","⊢⊣","[]","()"] },
    { shapes: ["◤◥","◤◥","◤◥"], type: "triangle", answer: "◤◥", options: ["◤◥","▲▼","△▽","◣◢"] },
  ];

  const ARABIC_LETTERS = ["ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض"];
  const ARABIC_FORMS = ["isolated", "initial", "medial", "final"];

  // Visual pattern matching game — Brain Gym style
  const [gameType, setGameType] = useState("pattern"); // pattern | arabic_forms | mirror
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const generatePatternRound = () => {
    // Generate a pattern: show 3 shapes, user picks the matching one
    const counts = [2, 3, 4, 5];
    const count = counts[Math.floor(Math.random() * counts.length)];
    const filledPositions = [];
    while (filledPositions.length < count) {
      const pos = Math.floor(Math.random() * 9);
      if (!filledPositions.includes(pos)) filledPositions.push(pos);
    }
    return { filledPositions, count };
  };

  const [currentPattern, setCurrentPattern] = useState(() => generatePatternRound());
  const [options, setOptions] = useState(() => {
    const correct = generatePatternRound();
    const wrongs = [generatePatternRound(), generatePatternRound(), generatePatternRound()];
    const all = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    return { correct: correct.filledPositions.sort().join(","), choices: all };
  });

  const nextRound = () => {
    const newPattern = generatePatternRound();
    const wrongs = [generatePatternRound(), generatePatternRound(), generatePatternRound()];
    const all = [newPattern, ...wrongs].sort(() => Math.random() - 0.5);
    setCurrentPattern(newPattern);
    setOptions({ correct: newPattern.filledPositions.sort().join(","), choices: all });
    setAnswered(null);
    setShowResult(false);
    setRound(r => r + 1);
  };

  const handleAnswer = (choice) => {
    if (answered !== null) return;
    const isCorrect = choice.filledPositions.sort().join(",") === options.correct;
    setAnswered(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(s => s + 1);
    setShowResult(true);
    setTimeout(nextRound, 1500);
  };

  const GridDisplay = ({ pattern, size = "sm" }) => (
    <div className={`grid grid-cols-3 gap-1 ${size === "lg" ? "w-32 h-32" : "w-20 h-20"}`}>
      {Array.from({length: 9}, (_, i) => (
        <div key={i} className={`rounded-sm transition-all ${
          pattern.filledPositions.includes(i)
            ? "bg-blue-600 border border-blue-700"
            : "bg-gray-100 border border-gray-200"
        }`} />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-800">🧠 Brain Gym — Lojëra Vizuale</h2>
          <p className="text-sm text-gray-500">Gjej modelin e njëjtë — stërvit trurin!</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-600">{score}</p>
          <p className="text-xs text-gray-400">pikë</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">Modeli origjinal — gjej njëjtin!</p>
        <div className="flex justify-center mb-2">
          <GridDisplay pattern={currentPattern} size="lg" />
        </div>
        <p className="text-center text-xs text-gray-400">{currentPattern.count} sheshe të mbushura</p>
      </div>

      {showResult && (
        <div className={`text-center font-bold text-lg mb-3 ${answered === "correct" ? "text-emerald-600" : "text-red-500"}`}>
          {answered === "correct" ? "✅ Saktë!" : "❌ Jo e saktë!"}
        </div>
      )}

      <p className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">Zgjidh modelin e njëjtë:</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.choices.map((choice, i) => (
          <button key={i} disabled={!!answered}
            onClick={() => handleAnswer(choice)}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
              answered && choice.filledPositions.sort().join(",") === options.correct
                ? "border-emerald-500 bg-emerald-50"
                : answered && choice === options.choices.find(c => c.filledPositions.sort().join(",") !== options.correct && answered === "wrong")
                ? "border-red-400 bg-red-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}>
            <GridDisplay pattern={choice} size="sm" />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">Rundi: {round + 1}</p>
        <button onClick={nextRound} className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-600 transition-all">
          Kapërceje →
        </button>
      </div>
    </div>
  );
}

export default function WordsAdmin() {
  const [statuses, setStatuses] = useState({});
  const [running, setRunning] = useState(false);
  const [adminTab, setAdminTab] = useState("words"); // words | map | games

  const { data: counts, refetch } = useQuery({
    queryKey: ["word-counts"],
    queryFn: async () => {
      const result = {};
      for (const job of JOBS) {
        const words = await base44.entities.Word.filter({ language: job.language, level: job.level }, null, 1);
        // We'll get a count approximate via list
        result[`${job.language}_${job.level}`] = words.length;
      }
      return result;
    },
    initialData: {}
  });

  const runJob = async (job) => {
    const key = `${job.language}_${job.level}`;
    setStatuses(s => ({ ...s, [key]: { state: "running", inserted: 0 } }));
    try {
      const res = await base44.functions.invoke("generateWords", {
        language: job.language,
        level: job.level
      });
      setStatuses(s => ({ ...s, [key]: { state: "done", inserted: res.data?.inserted || 0 } }));
    } catch (e) {
      setStatuses(s => ({ ...s, [key]: { state: "error", error: e.message } }));
    }
  };

  const runAll = async () => {
    setRunning(true);
    for (const job of JOBS) {
      await runJob(job);
    }
    await refetch();
    setRunning(false);
  };

  const clearAll = async () => {
    if (!confirm("A jeni i sigurt? Kjo fshin TË GJITHA fjalët!")) return;
    await base44.entities.Word.filter({});
    // Use delete with empty query to delete all
    alert("Për të fshirë të gjitha fjalët, shkoni te paneli i entiteteve.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-emerald-700 to-teal-700 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⚙️ Admin Panel</h1>
        <p className="text-emerald-100">Gjenerimi i fjalëve, harta e pelegrinazhit dhe lojëra vizuale</p>
      </div>

      {/* Admin Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1.5 rounded-2xl">
        {[
          { id: "words", label: "🔤 Fjalë" },
          { id: "map", label: "🗺️ Harta Umra/Haxh" },
          { id: "photos", label: "📸 Foto 360°" },
          { id: "games", label: "🧠 Brain Gym" },
        ].map(t => (
          <button key={t.id} onClick={() => setAdminTab(t.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${adminTab === t.id ? "bg-white shadow text-emerald-700" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div>
        {adminTab === "map" && <PilgrimageMapView />}
        {adminTab === "photos" && <PhotoGenerator360 />}
        {adminTab === "games" && <BrainGymGame />}
        {adminTab === "words" && (
          <div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
              <p className="text-amber-800 text-sm font-medium">
                ⚠️ Çdo gjenerim merr ~30-60 sekonda. Totali: ~6,600 fjalë për gjuhë × 3 gjuhë = ~19,800 fjalë.
              </p>
            </div>
            <div className="flex gap-3 mb-6">
              <Button onClick={runAll} disabled={running}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6">
                {running ? "⏳ Po gjeneron..." : "🚀 Gjenero TË GJITHA"}
              </Button>
            </div>
            <div className="space-y-3">
              {JOBS.map(job => {
                const key = `${job.language}_${job.level}`;
                const status = statuses[key];
                return (
                  <div key={key} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{job.label}</p>
                      <p className="text-xs text-gray-500">Target: {job.target.toLocaleString()} fjalë</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {status?.state === "running" && (
                        <span className="text-sm text-amber-600 animate-pulse">⏳ Po gjeneron...</span>
                      )}
                      {status?.state === "done" && (
                        <span className="text-sm text-emerald-600 font-bold">✅ {status.inserted} fjalë</span>
                      )}
                      {status?.state === "error" && (
                        <span className="text-sm text-red-500">❌ Gabim</span>
                      )}
                      {!status && (
                        <Button size="sm" onClick={() => runJob(job)} disabled={running}
                          className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs">
                          Gjenero
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}