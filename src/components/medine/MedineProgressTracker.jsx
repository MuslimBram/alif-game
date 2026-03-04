import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MedineProgressTracker({ level, unit, onCompleted }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const u = await base44.auth.me();
        setUser(u);
        
        // Check if unit is already completed
        const progress = await base44.entities.UserMedineProgress.filter({
          user_email: u.email,
          level: level,
          unit_id: unit.id
        });
        
        if (progress.length > 0 && progress[0].completed) {
          setIsCompleted(true);
        }
      } catch (e) {
        console.error("Error loading user:", e);
      }
    };
    
    loadUser();
  }, [level, unit.id]);

  const handleMarkComplete = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Check if progress record exists
      const existing = await base44.entities.UserMedineProgress.filter({
        user_email: user.email,
        level: level,
        unit_id: unit.id
      });

      if (existing.length > 0) {
        // Update existing
        await base44.entities.UserMedineProgress.update(existing[0].id, {
          completed: true,
          completed_at: new Date().toISOString()
        });
      } else {
        // Create new
        await base44.entities.UserMedineProgress.create({
          user_email: user.email,
          level: level,
          unit_id: unit.id,
          completed: true,
          completed_at: new Date().toISOString()
        });
      }
      
      setIsCompleted(true);
      onCompleted && onCompleted();
    } catch (e) {
      console.error("Error updating progress:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-4 border border-emerald-200">
      <div className="flex items-center gap-3">
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <p className="font-semibold text-green-700">✅ Mësimi i Plotesuar</p>
          </>
        ) : (
          <>
            <Clock className="w-6 h-6 text-gray-400" />
            <p className="font-semibold text-gray-600">Në Progres</p>
          </>
        )}
      </div>
      
      {!isCompleted && user && (
        <Button
          onClick={handleMarkComplete}
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {isLoading ? "Po Ruan..." : "Shëno si i Plotesuar"}
        </Button>
      )}
    </div>
  );
}