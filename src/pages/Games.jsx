import React, { useState } from "react";
import { Gamepad2 } from "lucide-react";
import GameCard from "@/components/games/GameCard";
import QuizGame from "@/components/games/QuizGame";

const allGames = [
  { id: 1, title: "Ngjyro Shkronjat", description: "Ngjyrosi shkronjat arabe, shqip dhe numrat me ngjyra", module: "alfabeti", level: "fillestar", duration: "60+ pyetje", points: 50 },
  { id: 2, title: "Loja e Numrave", description: "55+ ushtrime matematikore: mbledhje, zbritje, shumezo, pjeseto", module: "lojera", level: "fillestar", duration: "60+ pyetje", points: 40 },
  { id: 3, title: "Koordinimi i 2 Duarve", description: "6 lunde per te shtrilluar e koordinimn bilateral", module: "lojera", level: "fillestar", duration: "60+ pyetje", points: 30 },
  { id: 4, title: "Puzzle Edukativ", description: "43 puzzle veikutura didaktike, numrash dhe shkronjash", module: "lojera", level: "fillestar", duration: null, points: null },
  { id: 5, title: "Labirinti 15 Nivele", description: "15 labirinte me veshtiresi progresive - shëtije mendjen", module: "lojera", level: "fillestar", duration: null, points: null },
  { id: 6, title: "Shumarizimi & Pjesëtimi", description: "Tabela 1-12 visuale + 6 quota shumazim, pjesetim, dallim", module: "lojera", level: "fillestar", duration: null, points: null },
  { id: 7, title: "Brain Gym 60 Runde", description: "Shqip, numra, forma, analitike - 60 ushtrime avancuara me kohe", module: "lojera", level: "mesatar", duration: "60+ pyetje", points: 60 },
  { id: 8, title: "Kuiz Alfabeti Shqip", description: "Testo njohurte per alfabetin shqip", module: "alfabeti", level: "fillestar", duration: null, points: null },
  { id: 9, title: "Kuiz Alfabeti Anglisht", description: "Testo njohurte per alfabetin anglisht", module: "alfabeti", level: "fillestar", duration: null, points: null },
  { id: 10, title: "Kuiz Alfabeti Arab", description: "Testo njohurte per alfabetin arab", module: "alfabeti", level: "fillestar", duration: null, points: null },
  { id: 11, title: "Ndërtim Fjalësh Shqip", description: "Ndrto fjale duke pelqizuar shkronjan e duhura", module: "alfabeti", level: "fillestar", duration: null, points: null },
  { id: 12, title: "Lojë Memorie - Shkronja", description: "Gej ciftet e shkronjavem", module: "lojera", level: "fillestar", duration: null, points: null },
  { id: 13, title: "Kuiz Texhuidi Mesatar", description: "Testo njohurte e nivelit mesatar", module: "texhuidi", level: "mesatar", duration: null, points: null },
  { id: 14, title: "Kuiz Texhuidi Avancuar", description: "Nivel i avancuar i texhuidit", module: "texhuidi", level: "avancuar", duration: null, points: null },
  { id: 15, title: "Kompletim Ajetit", description: "Ploteso ajetin e kursanit", module: "kurani", level: "mesatar", duration: null, points: null },
  { id: 16, title: "Kuiz Kuranit Mesatar", description: "Testo njohurte e Kuranit", module: "kurani", level: "mesatar", duration: null, points: null },
  { id: 17, title: "Kuiz Umra Mesatar", description: "Nivel mesatar per Umra", module: "umra_haxh", level: "mesatar", duration: null, points: null },
  { id: 18, title: "Kuiz Haxh Avancuar", description: "Niveli i avancuar per haxh", module: "umra_haxh", level: "avancuar", duration: null, points: null },
  { id: 19, title: "Kuiz Texhuidi - Izhar", description: "Testo njohurte per Izhar", module: "texhuidi", level: "fillestar", duration: null, points: null },
  { id: 20, title: "Plotëso Ajetin - Fatiha", description: "Plotso ajetin e sures Fatiha", module: "kurani", level: "fillestar", duration: null, points: null },
  { id: 21, title: "Rendit Hapat e Umrës", description: "Rendit hapat e Umres sipas rradhes se sakite", module: "umra_haxh", level: "fillestar", duration: null, points: null },
  { id: 22, title: "Rendit Hapat e Haxhit", description: "Testo rradhen e sakite te ritualeve", module: "umra_haxh", level: "fillestar", duration: null, points: null },
  { id: 23, title: "Ndërto Fjalë Shoqe", description: "Ndërto fjale duke pelqizuar shkronjat e duhura", module: "alfabeti", level: "fillestar", duration: null, points: null },
  { id: 24, title: "Lojë Memorie - Shkronja Arabe", description: "Gej paltet e shkronjavem arabe", module: "lojera", level: "fillestar", duration: null, points: null },
  { id: 25, title: "Lojë me Numra Shqip", description: "Mesu numrat nga 1 ne 10", module: "lojera", level: "fillestar", duration: null, points: null },
  { id: 26, title: "Kuiz Gramatikat Arabe", description: "Testo njohurte e gramatikes arabe", module: "alfabeti", level: "mesatar", duration: null, points: null },
  { id: 27, title: "Përputh Shkronjat Shqipe", description: "Gjej puthitjet me ngjyrat e shkronjave", module: "alfabeti", level: "fillestar", duration: null, points: null },
  { id: 28, title: "Kuiz Umra & Haxh - Niveli 1", description: "Testo njohurte bazike per Umra dhe Haxh", module: "umra_haxh", level: "fillestar", duration: null, points: null },
];

const modules = [
  { value: "te_gjitha", label: "Të Gjitha" },
  { value: "alfabeti", label: "Alfabeti" },
  { value: "texhuidi", label: "Texhuidi" },
  { value: "kurani", label: "Kurani" },
  { value: "umra_haxh", label: "Umra & Haxh" },
  { value: "lojera", label: "Numra" },
];

const levels = [
  { value: "te_gjitha", label: "Të Gjitha" },
  { value: "fillestar", label: "Fillestar" },
  { value: "mesatar", label: "Mesatar" },
  { value: "avancuar", label: "Avancuar" },
  { value: "profesionist", label: "Profesionist" },
];

export default function Games() {
  const [selectedModule, setSelectedModule] = useState("te_gjitha");
  const [selectedLevel, setSelectedLevel] = useState("te_gjitha");
  const [activeGame, setActiveGame] = useState(null);

  // Games that have a quiz implementation
  const QUIZ_GAME_IDS = [8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 28];

  const filtered = allGames.filter((g) => {
    const moduleMatch = selectedModule === "te_gjitha" || g.module === selectedModule;
    const levelMatch = selectedLevel === "te_gjitha" || g.level === selectedLevel;
    return moduleMatch && levelMatch;
  });

  const handlePlay = (game) => {
    if (QUIZ_GAME_IDS.includes(game.id)) {
      setActiveGame(game);
    } else {
      alert(`Loja "${game.title}" do të hapet së shpejti!`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Lojëra Edukative</h1>
        <p className="text-sm text-gray-500 mt-1">Mëso duke luajtur dhe argëtuar</p>
      </div>

      {/* Module filter */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-emerald-700 mb-2">Moduli:</p>
        <div className="flex flex-wrap gap-2">
          {modules.map((m) => (
            <button
              key={m.value}
              onClick={() => setSelectedModule(m.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedModule === m.value
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Level filter */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-emerald-700 mb-2">Niveli:</p>
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l.value}
              onClick={() => setSelectedLevel(l.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedLevel === l.value
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-teal-300"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Gamepad2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Nuk ka lojëra për këto filtra</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} onPlay={handlePlay} />
          ))}
        </div>
      )}
    </div>
  );
}