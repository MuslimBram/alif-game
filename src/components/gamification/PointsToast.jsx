import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, Trophy } from "lucide-react";

let toastCallback = null;

export function showPointsToast(points, label = "pikë të fituara!") {
  if (toastCallback) toastCallback({ points, label });
}

export default function PointsToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastCallback = ({ points, label }) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, points, label }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };
    return () => { toastCallback = null; };
  }, []);

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ x: 80, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 80, opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2.5 rounded-2xl shadow-xl">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-extrabold text-lg">+{t.points}</span>
            <span className="text-sm text-amber-100">{t.label}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}