import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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

export default function WordsAdmin() {
  const [statuses, setStatuses] = useState({});
  const [running, setRunning] = useState(false);

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
        <h1 className="text-2xl font-extrabold mb-1">🔤 Gjenerim Fjalësh me AI</h1>
        <p className="text-emerald-100">Gjeneron 500+, 2000+, dhe 4000+ fjalë për çdo gjuhë duke përdorur AI</p>
      </div>

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
  );
}