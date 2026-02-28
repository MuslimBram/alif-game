import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, Play } from "lucide-react";
import { motion } from "framer-motion";

const moduleColors = {
  alfabeti: "from-emerald-400 to-teal-500",
  texhuidi: "from-amber-400 to-orange-500",
  kurani: "from-blue-400 to-indigo-500",
  umra_haxh: "from-purple-400 to-violet-500",
  lojera: "from-pink-400 to-rose-500",
};

const levelColors = {
  fillestar: "bg-emerald-100 text-emerald-700",
  mesatar: "bg-amber-100 text-amber-700",
  avancuar: "bg-orange-100 text-orange-700",
  profesionist: "bg-red-100 text-red-700",
};

export default function GameCard({ game, onPlay }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Color strip */}
      <div className={`h-2 bg-gradient-to-r ${moduleColors[game.module] || "from-gray-400 to-gray-500"}`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex gap-2 flex-wrap">
            {game.level && (
              <Badge className={`text-xs ${levelColors[game.level]}`}>{game.level}</Badge>
            )}
            {game.module && (
              <Badge variant="outline" className="text-xs">{game.module}</Badge>
            )}
          </div>
          {game.duration && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {game.duration}
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 mb-1">{game.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{game.description}</p>

        {game.points && (
          <div className="flex items-center gap-1 text-amber-500 text-sm mb-4">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-medium">{game.points} pikë</span>
          </div>
        )}

        <Button
          onClick={() => onPlay(game)}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-medium"
        >
          <Play className="w-4 h-4 mr-2" />
          Luaj Tani
        </Button>
      </div>
    </motion.div>
  );
}