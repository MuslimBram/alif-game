import { base44 } from "@/api/base44Client";
import { showPointsToast } from "./PointsToast";

export async function awardPoints(points, module = "te_gjitha", label) {
  try {
    const authed = await base44.auth.isAuthenticated();
    if (!authed) return;
    const user = await base44.auth.me();
    const existing = await base44.entities.UserScore.filter({ user_email: user.email });
    
    const levelFromPoints = (p) => {
      if (p >= 5000) return "Alim";
      if (p >= 1500) return "Hafiz";
      if (p >= 500) return "Studiues";
      if (p >= 100) return "Nxënës";
      return "Fillestar";
    };

    if (existing.length > 0) {
      const current = existing[0];
      const newTotal = (current.total_points || 0) + points;
      const moduleKey = module === "kurani" ? "quran_points" : module === "texhuidi" ? "tajweed_points" : module === "umra_haxh" ? "umra_points" : "quiz_points";
      await base44.entities.UserScore.update(current.id, {
        total_points: newTotal,
        [moduleKey]: (current[moduleKey] || 0) + points,
        level: levelFromPoints(newTotal),
        user_name: user.full_name || user.email.split("@")[0],
        last_activity: new Date().toISOString(),
      });
    } else {
      await base44.entities.UserScore.create({
        user_email: user.email,
        user_name: user.full_name || user.email.split("@")[0],
        total_points: points,
        quiz_points: module === "lojera" ? points : 0,
        quran_points: module === "kurani" ? points : 0,
        tajweed_points: module === "texhuidi" ? points : 0,
        umra_points: module === "umra_haxh" ? points : 0,
        level: levelFromPoints(points),
        streak_days: 1,
        badges: [],
        last_activity: new Date().toISOString(),
      });
    }
    showPointsToast(points, label || "pikë të fituara!");
  } catch (e) {
    console.error("awardPoints error:", e);
  }
}