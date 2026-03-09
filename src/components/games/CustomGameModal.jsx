import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, CheckCircle2, Loader2, ChevronRight, Pipette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

// ─── PHASE 1: Image full view ────────────────────────────────────────────────
function PhaseView({ game, onNext, onClose }) {
  const levelColors = {
    fillestar: "bg-green-100 text-green-700",
    mesatar: "bg-blue-100 text-blue-700",
    avancuar: "bg-purple-100 text-purple-700",
    profesionist: "bg-amber-100 text-amber-700",
  };
  const levelIcons = { fillestar: "🌱", mesatar: "📚", avancuar: "⭐", profesionist: "🏆" };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">{game.title}</h2>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${levelColors[game.level] || "bg-gray-100 text-gray-600"}`}>
            {levelIcons[game.level]} {game.level}
          </span>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
          <X className="w-5 h-5" />
        </button>
      </div>

      {game.image_url && (
        <div className="mx-5 rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ maxHeight: 280 }}>
          <img src={game.image_url} alt={game.title} className="w-full h-full object-contain bg-gray-50" style={{ maxHeight: 280 }} />
        </div>
      )}

      <div className="px-5 py-4">
        <p className="text-sm text-gray-600 leading-relaxed">{game.description}</p>
        {game.conditions?.length > 0 && (
          <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
            <p className="text-xs font-bold text-emerald-700 mb-2">📋 Do të vizatosh këto ({game.conditions.length} gjëra, një nga një):</p>
            <div className="flex flex-wrap gap-1">
              {game.conditions.map((c, i) => (
                <span key={i} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 rounded-lg font-semibold">
                  {i + 1}. {c}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-semibold text-amber-600">⭐ {game.points} pikë</span>
        </div>
      </div>

      <div className="px-5 pb-5 mt-auto">
        <Button onClick={onNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 text-base font-bold gap-2">
          Fillo Lojën <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// ─── DRAWING CANVAS (per condition) ──────────────────────────────────────────
function DrawingStep({ condition, conditionIndex, totalConditions, options, referenceImage, onDone, onClose }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#1d4ed8");
  const [brushSize, setBrushSize] = useState(4);
  const [selectedOption, setSelectedOption] = useState(null);
  const lastPos = useRef(null);

  const presetColors = ["#1d4ed8", "#dc2626", "#16a34a", "#d97706", "#7c3aed", "#000000"];

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e) => { e.preventDefault(); setDrawing(true); lastPos.current = getPos(e); };
  const draw = (e) => {
    e.preventDefault();
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };
  const stopDraw = () => setDrawing(false);

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useEffect(() => { clearCanvas(); }, []);

  const handleDone = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onDone({ dataUrl, selectedOption, condition });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div>
          <p className="text-xs text-emerald-600 font-bold uppercase tracking-wide">
            {conditionIndex + 1} / {totalConditions}
          </p>
          <h2 className="text-lg font-extrabold text-gray-900">Vizato: <span className="text-emerald-600">{condition}</span></h2>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mx-5 h-1.5 bg-gray-100 rounded-full mb-3">
        <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${((conditionIndex) / totalConditions) * 100}%` }} />
      </div>

      {/* Reference */}
      {referenceImage && (
        <>
          <div className="mx-5 mb-2 flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl p-2 cursor-pointer"
            onClick={() => setShowFullImage(true)}>
            <img src={referenceImage} alt="ref" className="w-12 h-12 object-contain rounded-lg border border-amber-200" />
            <div className="flex-1">
              <p className="text-xs text-amber-700 font-medium">Shiko imazhin referues dhe vizato <strong>{condition}</strong>!</p>
              <p className="text-xs text-amber-500 mt-0.5">🔍 Kliko për ta parë të plotë</p>
            </div>
          </div>
          {showFullImage && (
            <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
              onClick={() => setShowFullImage(false)}>
              <img src={referenceImage} alt="ref" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-5 mb-2 flex-wrap">
        {presetColors.map(c => (
          <button key={c} onClick={() => setColor(c)}
            style={{ backgroundColor: c, border: color === c ? "3px solid #059669" : "2px solid #e5e7eb" }}
            className="w-6 h-6 rounded-full transition-transform hover:scale-110" />
        ))}
        {/* Color picker (pipette) */}
        <label className="relative cursor-pointer" title="Zgjidh ngjyrë me pikatore">
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center overflow-hidden"
            style={{ borderColor: "#e5e7eb", backgroundColor: color }}>
            <Pipette className="w-3 h-3 text-white drop-shadow" />
          </div>
          <input type="color" value={color} onChange={e => setColor(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        </label>

        {/* Brush sizes */}
        <div className="flex items-center gap-1 ml-1">
          {[2, 4, 8, 14].map(s => (
            <button key={s} onClick={() => setBrushSize(s)}
              className={`rounded-full flex items-center justify-center transition-all ${brushSize === s ? "bg-emerald-100 ring-2 ring-emerald-400" : "bg-gray-100"}`}
              style={{ width: s * 2.2 + 10, height: s * 2.2 + 10 }}>
              <div style={{ width: s, height: s, backgroundColor: color, borderRadius: "50%" }} />
            </button>
          ))}
        </div>
        <button onClick={clearCanvas} className="ml-auto text-xs text-gray-500 hover:text-red-500 px-2 py-1 rounded-lg bg-gray-100 hover:bg-red-50 flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> Pastro
        </button>
      </div>

      {/* Canvas */}
      <div className="mx-5 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-inner bg-white flex-1" style={{ minHeight: 180 }}>
        <canvas
          ref={canvasRef} width={600} height={300}
          className="w-full h-full touch-none cursor-crosshair"
          style={{ display: "block" }}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
        />
      </div>

      {/* Option selection */}
      {options?.length > 0 && (
        <div className="px-5 mt-3">
          <p className="text-xs font-bold text-gray-600 mb-1.5">✏️ Çfarë vizatove? Zgjidhni opsionin:</p>
          <div className="flex flex-wrap gap-1.5">
            {options.map((opt, i) => (
              <button key={i} onClick={() => setSelectedOption(opt)}
                className={`text-xs px-3 py-1.5 rounded-xl border-2 font-semibold transition-all ${
                  selectedOption === opt
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
                }`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-5 py-3">
        <Button onClick={handleDone} disabled={options?.length > 0 && !selectedOption}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl h-11 font-bold gap-2">
          {conditionIndex + 1 < totalConditions ? `Kushti Tjetër (${conditionIndex + 2}/${totalConditions}) →` : "Dërgo për Vlerësim 🎯"}
        </Button>
      </div>
    </div>
  );
}

// ─── PHASE 2: Step-by-step drawing ───────────────────────────────────────────
function PhaseDrawing({ game, onFinish, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [drawings, setDrawings] = useState([]); // [{dataUrl, selectedOption, condition}]

  const conditions = useMemo(() => {
    const arr = game.conditions?.length > 0 ? [...game.conditions] : ["Vizato lirshëm"];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [game.id]);

  const handleStepDone = (stepData) => {
    const updated = [...drawings, stepData];
    setDrawings(updated);
    if (currentStep + 1 < conditions.length) {
      setCurrentStep(s => s + 1);
    } else {
      onFinish(updated);
    }
  };

  return (
    <DrawingStep
      key={currentStep}
      condition={conditions[currentStep]}
      conditionIndex={currentStep}
      totalConditions={conditions.length}
      options={game.options || []}
      referenceImage={game.image_url}
      onDone={handleStepDone}
      onClose={onClose}
    />
  );
}

// ─── PHASE 3: AI Evaluation ──────────────────────────────────────────────────
function PhaseResult({ game, drawings, onClose, onRetry }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => { evaluate(); }, []);

  const evaluate = async () => {
    setLoading(true);
    try {
      // Upload all drawings
      const uploadedUrls = [];
      for (const d of drawings) {
        const blob = await (await fetch(d.dataUrl)).blob();
        const file = new File([blob], "drawing.png", { type: "image/png" });
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        uploadedUrls.push(file_url);
      }

      const stepSummary = drawings.map((d, i) =>
        `Hapi ${i + 1}: "${d.condition}" — zgjedhja: "${d.selectedOption || "pa zgjedhje"}"`
      ).join("; ");

      const allUrls = game.image_url ? [game.image_url, ...uploadedUrls] : uploadedUrls;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Ti je mësues fëmijësh. Loja: "${game.title}". 
Fëmija vizatoi ${drawings.length} hapa: ${stepSummary}.
${game.image_url ? "Imazhi i parë është referenca. Vizatimet vijuese janë të fëmijës." : ""}
Vlerëso të gjitha vizatimet nga 0-100. Jep koment inkurajues (max 2 fjali) në shqip.
Gjithashtu gjenero 2-3 pyetje testimi (3 opsione secila, 1 e saktë) bazuar në kushtet e lojës.`,
        file_urls: allUrls,
        response_json_schema: {
          type: "object",
          properties: {
            score: { type: "number" },
            comment: { type: "string" },
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  q: { type: "string" },
                  options: { type: "array", items: { type: "string" } },
                  correct: { type: "number" }
                }
              }
            }
          }
        }
      });
      setResult(res);
    } catch (err) {
      toast.error("Gabim gjatë vlerësimit");
      setResult({ score: 0, comment: "Nuk mund të vlerësohet tani.", questions: [] });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      <p className="text-gray-600 font-semibold">AI po vlerëson vizatimet tuaja...</p>
      <p className="text-xs text-gray-400">Duke analizuar {drawings.length} vizatime...</p>
    </div>
  );

  return <QuizPhase game={game} drawings={drawings} aiResult={result} onClose={onClose} onRetry={onRetry} />;
}

// ─── PHASE 3b: Quiz after drawing ───────────────────────────────────────────
function QuizPhase({ game, drawings, aiResult, onClose, onRetry }) {
  const [quizIndex, setQuizIndex] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const score = aiResult?.score || 0;
  const comment = aiResult?.comment || "";
  const questions = aiResult?.questions || [];
  const scoreColor = score >= 70 ? "text-emerald-600" : score >= 40 ? "text-amber-600" : "text-red-500";
  const scoreBg = score >= 70 ? "bg-emerald-50 border-emerald-200" : score >= 40 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setAnswers(prev => [...prev, i === questions[quizIndex].correct]);
  };

  // Drawing results summary
  if (quizIndex === -1) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Rezultati i Vizatimeve</p>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-5 space-y-3 flex-1 overflow-y-auto">
          {/* Score */}
          <div className={`rounded-2xl border p-4 text-center ${scoreBg}`}>
            <p className={`text-5xl font-extrabold ${scoreColor}`}>{score}<span className="text-2xl">/100</span></p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{comment}</p>
          </div>

          {/* Per-step summary */}
          <div>
            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Hapat e vizatimit:</p>
            <div className="grid grid-cols-2 gap-2">
              {drawings.map((d, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-2 text-center">
                  <img src={d.dataUrl} className="w-full h-20 object-contain rounded-lg mb-1 bg-white border border-gray-100" />
                  <p className="text-xs font-semibold text-emerald-700">{d.condition}</p>
                  {d.selectedOption && (
                    <p className="text-xs text-blue-600 mt-0.5">✅ {d.selectedOption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 space-y-2">
          {questions.length > 0 && (
            <Button onClick={() => setQuizIndex(0)} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-11 font-bold gap-2">
              Vazhdo me Testin 🎯 <ChevronRight className="w-5 h-5" />
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onRetry} className="flex-1 rounded-2xl h-10 gap-1"><RotateCcw className="w-4 h-4" /> Provo Sërisht</Button>
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-2xl h-10">Mbyll</Button>
          </div>
        </div>
      </div>
    );
  }

  // All done
  if (quizIndex >= questions.length) {
    const correct = answers.filter(Boolean).length;
    const total = questions.length;
    return (
      <div className="flex flex-col items-center justify-center h-full px-5 gap-6">
        <div className="text-center">
          <p className="text-6xl mb-3">{correct / total >= 0.7 ? "🏆" : correct / total >= 0.4 ? "👍" : "💪"}</p>
          <h2 className="text-2xl font-extrabold text-gray-900">{correct}/{total} Saktë!</h2>
          <p className="text-gray-500 mt-1">Rezultati: <span className="font-bold text-emerald-600">{Math.round((correct / total) * 100)}%</span></p>
        </div>
        <div className="flex gap-3 w-full">
          <Button variant="outline" onClick={onRetry} className="flex-1 rounded-2xl h-11 gap-1"><RotateCcw className="w-4 h-4" /> Përsërite</Button>
          <Button onClick={onClose} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-11">Mbyll</Button>
        </div>
      </div>
    );
  }

  // Active question
  const q = questions[quizIndex];
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Test — {quizIndex + 1}/{questions.length}</p>
          <h2 className="text-base font-extrabold text-gray-900 mt-0.5">{game.title}</h2>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"><X className="w-5 h-5" /></button>
      </div>

      <div className="px-5 flex-1 flex flex-col justify-center gap-4">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <p className="text-base font-bold text-gray-800">{q.q}</p>
        </div>
        <div className="space-y-2">
          {q.options?.map((opt, i) => {
            const isCorrect = i === q.correct;
            let bg = "bg-white border-gray-200 hover:border-emerald-300";
            if (selected !== null) {
              if (isCorrect) bg = "bg-emerald-50 border-emerald-400";
              else if (selected === i) bg = "bg-red-50 border-red-400";
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${bg}`}>
                <span className="font-bold text-gray-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                {selected !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 inline ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-4">
        {selected !== null && (
          <Button onClick={() => { setSelected(null); setQuizIndex(qi => qi + 1); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-11 font-bold">
            {quizIndex + 1 < questions.length ? "Pyetja Tjetër →" : "Shiko Rezultatin →"}
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── MAIN MODAL ──────────────────────────────────────────────────────────────
export default function CustomGameModal({ game, onClose }) {
  const [phase, setPhase] = useState("view");
  const [drawings, setDrawings] = useState([]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col"
          style={{ maxHeight: "92vh", overflowY: "auto" }}
        >
          {phase === "view" && (
            <PhaseView game={game} onNext={() => setPhase("draw")} onClose={onClose} />
          )}
          {phase === "draw" && (
            <PhaseDrawing game={game}
              onFinish={(d) => { setDrawings(d); setPhase("result"); }}
              onClose={onClose} />
          )}
          {phase === "result" && (
            <PhaseResult game={game} drawings={drawings} onClose={onClose}
              onRetry={() => { setDrawings([]); setPhase("draw"); }} />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}