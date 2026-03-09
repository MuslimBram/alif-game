import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pencil, Trash2, RotateCcw, CheckCircle2, Loader2, ChevronRight } from "lucide-react";
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

      {/* Full image */}
      {game.image_url && (
        <div className="mx-5 rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ maxHeight: 320 }}>
          <img src={game.image_url} alt={game.title} className="w-full h-full object-contain bg-gray-50" style={{ maxHeight: 320 }} />
        </div>
      )}

      <div className="px-5 py-4">
        <p className="text-sm text-gray-600 leading-relaxed">{game.description}</p>
        {game.conditions && game.conditions.length > 0 && (
          <div className="mt-2 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
            <p className="text-xs font-bold text-emerald-700 mb-1">📋 Duhet të vizatosh:</p>
            <div className="flex flex-wrap gap-1">
              {game.conditions.map((c, i) => (
                <span key={i} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 rounded-lg font-semibold">{c}</span>
              ))}
            </div>
          </div>
        )}
        {game.options && game.options.length > 0 && (
          <div className="mt-2 bg-blue-50 border border-blue-100 rounded-xl p-3">
            <p className="text-xs font-bold text-blue-700 mb-1">🔢 Opsionet:</p>
            <div className="flex flex-wrap gap-1">
              {game.options.map((o, i) => (
                <span key={i} className="bg-white border border-blue-200 text-blue-700 text-xs px-2 py-0.5 rounded-lg font-semibold">{o}</span>
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

// ─── PHASE 2: Drawing canvas ─────────────────────────────────────────────────
function PhaseDrawing({ game, onNext, onClose }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#1d4ed8");
  const [brushSize, setBrushSize] = useState(4);
  const lastPos = useRef(null);

  const colors = ["#1d4ed8","#dc2626","#16a34a","#d97706","#7c3aed","#000000","#ffffff"];

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

  const startDraw = (e) => {
    e.preventDefault();
    setDrawing(true);
    lastPos.current = getPos(e);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    clearCanvas();
  }, []);

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    onNext(dataUrl);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div>
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Faza 2 — Vizato</p>
          <h2 className="text-lg font-extrabold text-gray-900">{game.title}</h2>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="px-5 text-xs text-gray-500 mb-2">{game.description}</p>

      {/* Reference image + conditions */}
      <div className="mx-5 mb-2 space-y-2">
        {game.image_url && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl p-2">
            <img src={game.image_url} alt="ref" className="w-14 h-14 object-contain rounded-lg border border-amber-200" />
            <p className="text-xs text-amber-700 font-medium">Shiko imazhin referues dhe vizato sa më mirë!</p>
          </div>
        )}
        {game.conditions && game.conditions.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2">
            <p className="text-xs font-bold text-emerald-700 mb-1">📋 Duhet të vizatosh:</p>
            <div className="flex flex-wrap gap-1">
              {game.conditions.map((c, i) => (
                <span key={i} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 rounded-lg font-semibold">{c}</span>
              ))}
            </div>
          </div>
        )}
        {game.options && game.options.length > 0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-2">
            <p className="text-xs font-bold text-blue-700 mb-1">🔢 Opsionet:</p>
            <div className="flex flex-wrap gap-1">
              {game.options.map((o, i) => (
                <span key={i} className="bg-white border border-blue-200 text-blue-700 text-xs px-2 py-0.5 rounded-lg font-semibold">{o}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-5 mb-2 flex-wrap">
        {colors.map(c => (
          <button key={c} onClick={() => setColor(c)}
            style={{ backgroundColor: c, border: color === c ? "3px solid #059669" : "2px solid #e5e7eb" }}
            className="w-7 h-7 rounded-full transition-transform hover:scale-110" />
        ))}
        <div className="flex items-center gap-1 ml-2">
          {[2, 4, 8, 14].map(s => (
            <button key={s} onClick={() => setBrushSize(s)}
              className={`rounded-full flex items-center justify-center transition-all ${brushSize === s ? "bg-emerald-100 ring-2 ring-emerald-400" : "bg-gray-100"}`}
              style={{ width: s * 2.5 + 12, height: s * 2.5 + 12 }}>
              <div style={{ width: s, height: s, backgroundColor: color, borderRadius: "50%" }} />
            </button>
          ))}
        </div>
        <button onClick={clearCanvas} className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 px-2 py-1 rounded-lg bg-gray-100 hover:bg-red-50">
          <RotateCcw className="w-3.5 h-3.5" /> Pastro
        </button>
      </div>

      {/* Canvas */}
      <div className="mx-5 flex-1 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-inner bg-white" style={{ minHeight: 200 }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={350}
          className="w-full h-full touch-none cursor-crosshair"
          style={{ display: "block" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      </div>

      <div className="px-5 py-4">
        <Button onClick={handleSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-11 font-bold gap-2">
          Dërgo për Vlerësim <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// ─── PHASE 3: AI Evaluation ──────────────────────────────────────────────────
function PhaseResult({ game, drawingDataUrl, onClose, onRetry }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    evaluate();
  }, []);

  const evaluate = async () => {
    setLoading(true);
    try {
      // Upload drawing
      const blob = await (await fetch(drawingDataUrl)).blob();
      const file = new File([blob], "drawing.png", { type: "image/png" });
      const { file_url: drawingUrl } = await base44.integrations.Core.UploadFile({ file });

      const urls = game.image_url ? [game.image_url, drawingUrl] : [drawingUrl];

      const conditions = game.conditions?.length ? `Kushtet që duhej të vizatonte: ${game.conditions.join(", ")}.` : "";
      const options = game.options?.length ? `Opsionet e lojës: ${game.options.join(", ")}.` : "";

      const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Ti je një mësues i fëmijëve. Detyra ishte: "${game.title}" — "${game.description}". ${conditions} ${options}
      ${game.image_url ? "Imazhi i parë është referenca origjinale. Imazhi i dytë është vizatimi i fëmijës." : "Imazhi është vizatimi i fëmijës."}
      Vlerëso vizatimin e fëmijës nga 0 deri 100 duke u bazuar te kushtet e specifikuara (nëse ka). Jep një koment inkurajues në shqip (max 2 fjali).
      Gjithashtu jep 2-3 pyetje të shkurtra testimi (me 3 opsione secila, dhe 1 përgjigje të saktë) bazuar në kushtet dhe opsionet e lojës.`,
        file_urls: urls,
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
      setResult({ score: 0, comment: "Nuk mund të vlerësohet tani. Provo përsëri.", questions: [] });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      <p className="text-gray-600 font-semibold">AI po vlerëson vizatimin tënd...</p>
    </div>
  );

  return <QuizPhase game={game} drawingDataUrl={drawingDataUrl} aiResult={result} onClose={onClose} onRetry={onRetry} />;
}

// ─── PHASE 3b: Quiz after drawing ───────────────────────────────────────────
function QuizPhase({ game, drawingDataUrl, aiResult, onClose, onRetry }) {
  const [quizIndex, setQuizIndex] = useState(-1); // -1 = show drawing result
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

  const nextQuestion = () => {
    setSelected(null);
    setQuizIndex(qi => qi + 1);
  };

  // Show drawing result
  if (quizIndex === -1) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Rezultati i Vizatimit</p>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-5 space-y-4 flex-1 overflow-y-auto">
          {/* Side by side */}
          <div className="grid grid-cols-2 gap-3">
            {game.image_url && (
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1 font-medium">Origjinali</p>
                <img src={game.image_url} className="w-full h-32 object-contain rounded-xl border border-gray-100 bg-gray-50" />
              </div>
            )}
            <div className={game.image_url ? "text-center" : "text-center col-span-2"}>
              <p className="text-xs text-gray-400 mb-1 font-medium">Vizatimi yt</p>
              <img src={drawingDataUrl} className="w-full h-32 object-contain rounded-xl border border-emerald-100 bg-white" />
            </div>
          </div>

          {/* Score */}
          <div className={`rounded-2xl border p-4 text-center ${scoreBg}`}>
            <p className={`text-5xl font-extrabold ${scoreColor}`}>{score}<span className="text-2xl">/100</span></p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{comment}</p>
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

  // All questions done
  if (quizIndex >= questions.length) {
    const correct = answers.filter(Boolean).length;
    const total = questions.length;
    const quizScore = Math.round((correct / total) * 100);
    return (
      <div className="flex flex-col items-center justify-center h-full px-5 gap-6">
        <div className="text-center">
          <p className="text-6xl mb-3">{quizScore >= 70 ? "🏆" : quizScore >= 40 ? "👍" : "💪"}</p>
          <h2 className="text-2xl font-extrabold text-gray-900">{correct}/{total} Saktë!</h2>
          <p className="text-gray-500 mt-1">Rezultati i Testit: <span className="font-bold text-emerald-600">{quizScore}%</span></p>
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
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Test — Pyetja {quizIndex + 1}/{questions.length}</p>
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
            const isSelected = selected === i;
            const isCorrect = i === q.correct;
            let bg = "bg-white border-gray-200 hover:border-emerald-300";
            if (selected !== null) {
              if (isCorrect) bg = "bg-emerald-50 border-emerald-400";
              else if (isSelected) bg = "bg-red-50 border-red-400";
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
          <Button onClick={nextQuestion} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-11 font-bold">
            {quizIndex + 1 < questions.length ? "Pyetja Tjetër →" : "Shiko Rezultatin →"}
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── MAIN MODAL ──────────────────────────────────────────────────────────────
export default function CustomGameModal({ game, onClose }) {
  const [phase, setPhase] = useState("view"); // view | draw | result
  const [drawingDataUrl, setDrawingDataUrl] = useState(null);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          {phase === "view" && (
            <PhaseView game={game} onNext={() => setPhase("draw")} onClose={onClose} />
          )}
          {phase === "draw" && (
            <PhaseDrawing game={game} onNext={(url) => { setDrawingDataUrl(url); setPhase("result"); }} onClose={onClose} />
          )}
          {phase === "result" && (
            <PhaseResult game={game} drawingDataUrl={drawingDataUrl} onClose={onClose}
              onRetry={() => { setDrawingDataUrl(null); setPhase("draw"); }} />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}