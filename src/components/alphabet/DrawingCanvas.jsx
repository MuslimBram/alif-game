import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Send, Pencil } from "lucide-react";

export default function DrawingCanvas({ onSubmit }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    setIsDrawing(true);
    setLastPos(pos);
    setHasDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    setLastPos(pos);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    onSubmit(dataUrl);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Pencil className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-semibold text-gray-700">Vizato Shkronjën</span>
      </div>
      <p className="text-xs text-orange-500 mb-3">Vizato shkronjën brenda kutisë!</p>
      <canvas
        ref={canvasRef}
        width={280}
        height={200}
        className="w-full border-2 border-dashed border-gray-300 rounded-xl bg-white cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={clearCanvas} className="flex-1 text-gray-500 rounded-xl">
          <Eraser className="w-3.5 h-3.5 mr-1.5" /> Fshi
        </Button>
        <Button
          size="sm"
          disabled={!hasDrawing}
          onClick={handleSubmit}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
        >
          <Send className="w-3.5 h-3.5 mr-1.5" /> Dërgo për Vlerësim
        </Button>
      </div>
    </div>
  );
}