import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { BookMarked, Search } from "lucide-react";
import AdminEditOverlay from "@/components/admin/AdminEditOverlay";
import { createPageUrl } from "@/utils";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import TajweedFilters from "@/components/tajweed/TajweedFilters";
import TajweedCard from "@/components/tajweed/TajweedCard";
import TajweedBuiltIn from "@/components/tajweed/TajweedBuiltIn";

export default function Tajweed({ adminEditMode, isAdmin }) {
  const [selectedLevel, setSelectedLevel] = useState("te_gjitha");
  const [selectedCategory, setSelectedCategory] = useState("te_gjitha");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("rregullat");

  const { data: rules = [], isLoading } = useQuery({
    queryKey: ["tajweed-rules"],
    queryFn: () => base44.entities.TajweedRule.list("order_index", 200),
  });

  const filteredRules = rules.filter((rule) => {
    const levelMatch = selectedLevel === "te_gjitha" || rule.level === selectedLevel;
    const categoryMatch = selectedCategory === "te_gjitha" || rule.category === selectedCategory;
    const searchMatch =
      !searchQuery ||
      rule.name_sq?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.name_ar?.includes(searchQuery) ||
      rule.description_sq?.toLowerCase().includes(searchQuery.toLowerCase());
    return levelMatch && categoryMatch && searchMatch;
  });

  // Group by category
  const grouped = {};
  filteredRules.forEach((rule) => {
    if (!grouped[rule.category]) grouped[rule.category] = [];
    grouped[rule.category].push(rule);
  });

  const categoryOrder = [
    "noon_sakinah", "meem_sakinah", "madd", "qalqalah", "ghunnah",
    "idgham", "ikhfa", "iqlab", "izhar", "tjera"
  ];

  const categoryLabels = {
    noon_sakinah: "Noon Sakinah",
    meem_sakinah: "Meem Sakinah",
    madd: "Madd (Zgjatja)",
    qalqalah: "Qalqalah",
    ghunnah: "Ghunnah",
    idgham: "Idgham",
    ikhfa: "Ikhfa",
    iqlab: "Iqlab",
    izhar: "Izhar",
    tjera: "Tjera",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 relative">
      <AdminEditOverlay show={adminEditMode && isAdmin} title="Edito Texhuidin" items={[
        { label: "Shto Rregull", href: createPageUrl("AdminPanel"), icon: "➕" },
        { label: "Menaxho Rregullat", href: createPageUrl("AdminPanel"), icon: "📝" },
      ]} />
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <BookMarked className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Rregullat e Texhuidit
            </h1>
            <p className="text-sm text-gray-500">
              {rules.length} grupe rregullash — mëso leximin e saktë të Kuranit
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Kërko rregulla..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl border-gray-200 bg-white/80"
        />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <TajweedFilters
          selectedLevel={selectedLevel}
          selectedCategory={selectedCategory}
          onLevelChange={setSelectedLevel}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Rules List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      ) : filteredRules.length === 0 ? (
        <div className="text-center py-20">
          <BookMarked className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Nuk u gjetën rregulla</p>
          <p className="text-gray-400 text-sm mt-1">Provoni filtra të ndryshme</p>
        </div>
      ) : selectedCategory !== "te_gjitha" ? (
        <div className="space-y-3">
          {filteredRules.map((rule) => (
            <TajweedCard key={rule.id} rule={rule} />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {categoryOrder.map((cat) => {
            const catRules = grouped[cat];
            if (!catRules || catRules.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-emerald-500 inline-block" />
                  {categoryLabels[cat]}
                  <span className="text-sm font-normal text-gray-400">({catRules.length})</span>
                </h2>
                <div className="space-y-3">
                  {catRules.map((rule) => (
                    <TajweedCard key={rule.id} rule={rule} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}