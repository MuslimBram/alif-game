import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Send, Pencil, CheckCircle, Loader2, Star, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function DrawingCanvas({ letter, onResult }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Reset when letter changes
  useEffect(() => {
    setResult(null);
    setHasDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [letter?.letter]);

  // Resize canvas to match display size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== Math.round(rect.width) || canvas.height !== Math.round(rect.height)) {
        // Save drawing before resize
        const imageData = canvas.toDataURL();
        canvas.width = Math.round(rect.width);
        canvas.height = Math.round(rect.height);
        // Restore drawing
        if (hasDrawing) {
          const img = new Image();
          img.src = imageData;
          img.onload = () => canvas.getContext("2d").drawImage(img, 0, 0);
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches && e.touches[0]) {
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

  const lastPosRef = useRef(null);

  const startDrawing = (e) => {
    e.preventDefault();
    lastPosRef.current = getPos(e);
    setIsDrawing(true);
    setHasDrawing(true);
    setResult(null);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPosRef.current = pos;
  };

  const stopDrawing = (e) => {
    e && e.preventDefault();
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!hasDrawing) return;
    setLoading(true);
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are evaluating a student's attempt to draw/write the letter "${letter?.letter}" (${letter?.language} language, pronunciation: "${letter?.pronunciation}").
      The image shows their drawing on a white canvas.
      
      Evaluate ONLY the drawing quality:
      1. Does it look like the letter "${letter?.letter}"? (most important - 60%)
      2. Proportions and stroke quality (20%)
      3. Legibility (20%)
      
      Score from 0-100:
      - 0-20: blank canvas or unrecognizable scribble
      - 30-50: vague resemblance
      - 60-80: clearly the letter, minor issues
      - 85-100: very good or perfect
      
      IMPORTANT: Respond ONLY in Albanian language. Be encouraging and specific.`,
      file_urls: [dataUrl],
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number" },
          feedback: { type: "string" },
          tips: { type: "string" }
        }
      }
    });

    const score = typeof res.score === "number" ? res.score : 50;
    const passed = score >= 60;
    setResult({ score, feedback: res.feedback, tips: res.tips, passed });
    onResult && onResult({ score, passed });
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Pencil className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-semibold text-gray-700">Vizato Shkronjën</span>
      </div>
      <p className="text-xs text-orange-500 mb-3">
        Vizato shkronjën{" "}
        <strong
          style={letter?.language === "arabisht" ? { fontFamily: "serif", fontSize: "1.1em" } : {}}
        >
          "{letter?.letter}"
        </strong>{" "}
        brenda kutisë!
      </p>

      {/* Reference letter faint in background */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-52 border-2 border-dashed border-orange-200 rounded-xl bg-white cursor-crosshair touch-none block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {/* Faint guide letter */}
        {!hasDrawing && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ opacity: 0.08 }}
          >
            <span
              className="font-bold text-gray-900"
              style={{
                fontSize: "8rem",
                fontFamily: letter?.language === "arabisht" ? "serif" : "inherit",
              }}
            >
              {letter?.letter}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={clearCanvas} className="rounded-xl text-gray-500 border-gray-200">
          <Eraser className="w-3.5 h-3.5 mr-1.5" /> Fshi
        </Button>
        <Button
          size="sm"
          disabled={!hasDrawing || loading}
          onClick={handleSubmit}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
        >
          {loading ? (
            <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Duke vlerësuar...</>
          ) : (
            <><Send className="w-3.5 h-3.5 mr-1.5" /> Kontrollo Vizatimin</>
          )}
        </Button>
      </div>

      {result && (
        <div className={`mt-3 rounded-xl p-4 border ${result.passed ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          <div className="flex items-center gap-2 mb-2">
            {result.passed
              ? <CheckCircle className="w-5 h-5 text-emerald-600" />
              : <Star className="w-5 h-5 text-amber-500" />
            }
            <span className={`font-bold text-lg ${result.passed ? "text-emerald-700" : "text-amber-700"}`}>
              {result.score}/100
            </span>
            <span className="text-sm text-gray-600">{result.passed ? "Shkëlqyer! ✨" : "Provo sërish! 💪"}</span>
          </div>
          {result.feedback && <p className="text-sm text-gray-700 mb-1">{result.feedback}</p>}
          {result.tips && <p className="text-xs text-gray-500 italic">{result.tips}</p>}
          {!result.passed && (
            <Button size="sm" variant="outline" onClick={clearCanvas} className="mt-2 rounded-xl text-orange-600 border-orange-200">
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Provo Sërish
            </Button>
          )}
        </div>
      )}
    </div>
  );
}