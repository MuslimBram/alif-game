import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { BookMarked, Search, Volume2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import TajweedCard from "@/components/tajweed/TajweedCard";
import TajweedFilters from "@/components/tajweed/TajweedFilters";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categoryOrder = [
  "noon_sakinah","meem_sakinah","madd","qalqalah","ghunnah",
  "idgham","ikhfa","iqlab","izhar","tjera"
];
const categoryLabels = {
  noon_sakinah:"Noon Sakinah", meem_sakinah:"Meem Sakinah", madd:"Madd (Zgjatja)",
  qalqalah:"Qalqalah", ghunnah:"Ghunnah", idgham:"Idgham",
  ikhfa:"Ikhfa", iqlab:"Iqlab", izhar:"Izhar", tjera:"Tjera",
};

// Static built-in tajweed rules for when DB is empty
const STATIC_RULES = [
  {
    id: "s1", name_sq: "Izhar Halqi — Shqiptim i Qartë", name_ar: "الإظهار الحلقي",
    arabic_symbol: "◌ْ", category: "izhar", level: "fillestar",
    description_sq: "Kur Noon Sakinah (ن°) ose Tanwin takohet me njërën nga 6 shkronjat e fytit (أ ه ع ح غ خ), Noon shqiptohet qartë pa zgjatje.",
    letters: "أ ه ع ح غ خ", example_text: "مَنْ أَمَنَ", example_transliteration: "man amana"
  },
  {
    id: "s2", name_sq: "Idgham me Ghunnah — Bashkim me Zë", name_ar: "الإدغام بغنة",
    arabic_symbol: "◌ّ", category: "idgham", level: "fillestar",
    description_sq: "Kur Noon Sakinah takohet me (ي ن م و), Noon bashkohet me shkronjën tjetër me një zë nazal (ghunnah) 2 harekash.",
    letters: "ي ن م و", example_text: "مَنْ يَقُول", example_transliteration: "man yaqool"
  },
  {
    id: "s3", name_sq: "Idgham pa Ghunnah — Bashkim pa Zë", name_ar: "الإدغام بغير غنة",
    arabic_symbol: "◌ّ", category: "idgham", level: "fillestar",
    description_sq: "Kur Noon Sakinah takohet me (ل ر), Noon bashkohet plotësisht pa asnjë zë nazal.",
    letters: "ل ر", example_text: "مِنْ رَّبِّهِمْ", example_transliteration: "min rabbihim"
  },
  {
    id: "s4", name_sq: "Ikhfa — Fshehja", name_ar: "الإخفاء",
    arabic_symbol: "◌ْ", category: "ikhfa", level: "fillestar",
    description_sq: "Kur Noon Sakinah takohet me 15 shkronjat e Ikhfasë, Noon 'fshihet' midis Izhar dhe Idgham me ghunnah 2 harekash.",
    letters: "ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك", example_text: "إِنْ كُنتُمْ", example_transliteration: "in kuntum"
  },
  {
    id: "s5", name_sq: "Iqlab — Ndërrimi", name_ar: "الإقلاب",
    arabic_symbol: "◌ۢ", category: "iqlab", level: "fillestar",
    description_sq: "Kur Noon Sakinah takohet me shkronjën (ب), Noon kthehet në Meem dhe shqiptohet me ghunnah 2 harekash.",
    letters: "ب", example_text: "مِنْ بَعدِ", example_transliteration: "min ba'di"
  },
  {
    id: "s6", name_sq: "Madd Tabii — Zgjatja Natyrore", name_ar: "المد الطبيعي",
    arabic_symbol: "ـَا ـِي ـُو", category: "madd", level: "fillestar",
    description_sq: "Zgjatja bazë — 2 harekash. Çdo haruf madd (ا، ي، و) pa sukun pas tij.",
    letters: "ا ي و", example_text: "قَالَ / يَقُولُ / قِيلَ", example_transliteration: "qaala / yaqoolu / qeela"
  },
  {
    id: "s7", name_sq: "Madd Muttasil — Zgjatja e Lidhur", name_ar: "المد المتصل",
    arabic_symbol: "مٓ", category: "madd", level: "mesatar",
    description_sq: "Haruf Madd pasuar nga Hamza në të njëjtën fjalë — zgjat 4-5 harekash.",
    letters: "ء (hamza)", example_text: "جَاءَ / سُوءٌ / شَيءٌ", example_transliteration: "jaa'a / soo'un / shay'un"
  },
  {
    id: "s8", name_sq: "Madd Munfasil — Zgjatja e Ndarë", name_ar: "المد المنفصل",
    arabic_symbol: "مٓ", category: "madd", level: "mesatar",
    description_sq: "Haruf Madd pasuar nga Hamza në fjalën tjetër — zgjat 4-5 harekash (ose 2 me Qasr).",
    letters: "ء (hamza fillim fjale)", example_text: "يَا أَيُّهَا", example_transliteration: "yaa ayyuha"
  },
  {
    id: "s9", name_sq: "Qalqalah — Dridhja", name_ar: "القلقلة",
    arabic_symbol: "◌ْ", category: "qalqalah", level: "fillestar",
    description_sq: "5 shkronjat e Qalqalah (ق ط ب ج د) kur kanë Sukun ose janë në fund fjale shqiptohen me një 'dridhjë' të lehtë.",
    letters: "ق ط ب ج د", example_text: "يَخلُقُ / أَحَطتُ / أَجلَب", example_transliteration: "yakhluqu / aḥaṭtu / ajlab"
  },
  {
    id: "s10", name_sq: "Ghunnah — Zëri Nazal", name_ar: "الغنة",
    arabic_symbol: "◌ّ", category: "ghunnah", level: "fillestar",
    description_sq: "Zë nazal (nga hunda) i shoqëron Meemin dhe Noonin kur janë me Sheddah — zgjat 2 harekash.",
    letters: "م ن (me sheddah ّ)", example_text: "إِنَّ / ثُمَّ", example_transliteration: "inna / thumma"
  },
  {
    id: "s11", name_sq: "Izhar Shafawi — Meem Sakinah qartë", name_ar: "الإظهار الشفوي",
    arabic_symbol: "◌ْ", category: "meem_sakinah", level: "mesatar",
    description_sq: "Kur Meem Sakinah takohet me çdo shkronjë përveç Meemit dhe Basë, shqiptohet qartë pa ghunnah.",
    letters: "të gjitha përveç م dhe ب", example_text: "وَهُم بِرَبِّهِمْ لَا", example_transliteration: "wa hum la"
  },
  {
    id: "s12", name_sq: "Idgham Shafawi — Meem me Meem", name_ar: "الإدغام الشفوي",
    arabic_symbol: "◌ّ", category: "meem_sakinah", level: "mesatar",
    description_sq: "Kur Meem Sakinah takohet me Meem tjetër, bashkohen me ghunnah 2 harekash.",
    letters: "م", example_text: "كَم مِّن فِئَة", example_transliteration: "kam min fi'a"
  },
  {
    id: "s13", name_sq: "Ikhfa Shafawi — Meem fshihet para Bë", name_ar: "الإخفاء الشفوي",
    arabic_symbol: "◌ۢ", category: "meem_sakinah", level: "mesatar",
    description_sq: "Kur Meem Sakinah takohet me Bën, 'fshihet' me ghunnah 2 harekash me buzë pak të hapura.",
    letters: "ب", example_text: "تَرمِيهِم بِحِجَارَة", example_transliteration: "tarmiihim bihijaara"
  },
];

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.6;
  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find(v => v.lang.startsWith("ar"));
  if (arVoice) u.voice = arVoice;
  window.speechSynthesis.speak(u);
}

export default function TajweedInline() {
  const [selectedLevel, setSelectedLevel] = useState("te_gjitha");
  const [selectedCategory, setSelectedCategory] = useState("te_gjitha");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dbRules = [], isLoading } = useQuery({
    queryKey: ["tajweed-rules"],
    queryFn: () => base44.entities.TajweedRule.list("order_index", 200),
  });

  const rules = dbRules.length > 0 ? dbRules : STATIC_RULES;

  const filteredRules = rules.filter((rule) => {
    const levelMatch = selectedLevel === "te_gjitha" || rule.level === selectedLevel;
    const categoryMatch = selectedCategory === "te_gjitha" || rule.category === selectedCategory;
    const searchMatch = !searchQuery ||
      rule.name_sq?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.name_ar?.includes(searchQuery) ||
      rule.description_sq?.toLowerCase().includes(searchQuery.toLowerCase());
    return levelMatch && categoryMatch && searchMatch;
  });

  const grouped = {};
  filteredRules.forEach((rule) => {
    if (!grouped[rule.category]) grouped[rule.category] = [];
    grouped[rule.category].push(rule);
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📖</span>
          <div>
            <h2 className="text-lg font-extrabold">Texhuidi — Rregullat e Kuranit</h2>
            <p className="text-amber-100 text-sm">{filteredRules.length} rregulla • Mëso leximin e saktë</p>
          </div>
        </div>
        <Link to={createPageUrl("Tajweed")}
          className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl font-semibold transition-colors">
          Hap faqen →
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Kërko rregulla..." value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl border-gray-200 bg-white" />
      </div>

      {/* Filters */}
      <TajweedFilters selectedLevel={selectedLevel} selectedCategory={selectedCategory}
        onLevelChange={setSelectedLevel} onCategoryChange={setSelectedCategory} />

      {/* Rules */}
      {isLoading ? (
        <div className="space-y-3">
          {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
      ) : filteredRules.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <BookMarked className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nuk u gjetën rregulla</p>
        </div>
      ) : selectedCategory !== "te_gjitha" ? (
        <div className="space-y-3">
          {filteredRules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {categoryOrder.map((cat) => {
            const catRules = grouped[cat];
            if (!catRules?.length) return null;
            return (
              <div key={cat}>
                <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-amber-500 inline-block" />
                  {categoryLabels[cat]}
                  <span className="text-sm font-normal text-gray-400">({catRules.length})</span>
                </h3>
                <div className="space-y-3">
                  {catRules.map((rule) => <RuleCard key={rule.id} rule={rule} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RuleCard({ rule }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
        <div className="flex items-center gap-3">
          {rule.arabic_symbol && (
            <span className="text-2xl font-bold text-amber-700 w-10 text-center" style={{ fontFamily: "serif" }}>
              {rule.arabic_symbol}
            </span>
          )}
          <div>
            <p className="font-bold text-gray-800 text-sm">{rule.name_sq}</p>
            {rule.name_ar && (
              <p className="text-xs text-amber-600 arabic-text">{rule.name_ar}</p>
            )}
          </div>
        </div>
        <span className="text-gray-400 text-lg">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="border-t border-gray-100 p-4 space-y-3">
          {rule.description_sq && (
            <p className="text-sm text-gray-700 leading-relaxed">{rule.description_sq}</p>
          )}
          {rule.letters && (
            <div className="bg-amber-50 rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700">Shkronjat:</span>
              <span className="text-base arabic-text text-amber-800 font-bold">{rule.letters}</span>
            </div>
          )}
          {rule.example_text && (
            <div className="bg-emerald-50 rounded-xl p-3 cursor-pointer hover:bg-emerald-100 transition-colors"
              onClick={() => speak(rule.example_text)}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-emerald-700">Shembull:</p>
                <Volume2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl text-right font-bold text-gray-900 arabic-text mt-1">{rule.example_text}</p>
              {rule.example_transliteration && (
                <p className="text-xs text-gray-500 italic mt-1">{rule.example_transliteration}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}