import { motion } from "motion/react";
import { Giggles } from "./Giggles";
import { Lock, Star, ChevronLeft } from "lucide-react";

interface RoadmapScreenProps {
  onNavigate: (screen: string) => void;
}

export function RoadmapScreen({ onNavigate }: RoadmapScreenProps) {
  const zones = [
    {
      name: "Sparkle Mountain",
      levels: Array.from({ length: 20 }, (_, i) => 31 + i),
      gradient: "linear-gradient(180deg, #9B59B6 0%, #E91E63 100%)",
      nodeColor: "#E91E63",
      theme: "⭐"
    },
    {
      name: "Breezy Forest",
      levels: Array.from({ length: 20 }, (_, i) => 11 + i),
      gradient: "linear-gradient(180deg, #16A085 0%, #3498DB 100%)",
      nodeColor: "#3498DB",
      theme: "🍄"
    },
    {
      name: "Sunny Meadow",
      levels: Array.from({ length: 10 }, (_, i) => 1 + i),
      gradient: "linear-gradient(180deg, #7ED321 0%, #FFD93D 100%)",
      nodeColor: "#FFD93D",
      theme: "🌻"
    },
  ];

  const currentLevel = 15;

  return (
    <div className="w-full h-full relative overflow-auto" style={{
      background: "linear-gradient(180deg, #E8F5E9 0%, #FFF9C4 100%)"
    }}>
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 flex items-center gap-4" style={{
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <motion.button
          onClick={() => onNavigate("home")}
          className="p-3 text-white"
          style={{
            background: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
            borderRadius: "50%",
            boxShadow: "0 6px 15px rgba(74, 144, 226, 0.3)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <h1 className="text-3xl font-bold" style={{
          background: "linear-gradient(135deg, #FF6B6B 0%, #4A90E2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Learning Path
        </h1>
      </div>

      {/* Roadmap path */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {zones.map((zone, zoneIndex) => (
          <div key={zone.name} className="relative mb-12">
            {/* Zone header */}
            <motion.div
              className="text-center mb-8 p-6"
              style={{
                background: zone.gradient,
                borderRadius: "30px",
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                border: "4px solid rgba(255,255,255,0.3)",
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: zoneIndex * 0.1 }}
            >
              <h2 className="text-3xl font-bold text-white" style={{
                textShadow: "0 3px 8px rgba(0,0,0,0.3)"
              }}>
                {zone.theme} {zone.name}
              </h2>
              <p className="text-white/90 text-lg mt-1">
                Levels {zone.levels[0]} - {zone.levels[zone.levels.length - 1]}
              </p>
            </motion.div>

            {/* Level nodes in a winding path */}
            <div className="relative">
              {zone.levels.map((level, index) => {
                const isCompleted = level < currentLevel;
                const isCurrent = level === currentLevel;
                const isLocked = level > currentLevel;
                const side = index % 2 === 0 ? "left" : "right";
                const offsetX = side === "left" ? "20%" : "80%";

                return (
                  <motion.div
                    key={level}
                    className="relative mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: zoneIndex * 0.05 + index * 0.02 }}
                  >
                    {/* Connecting line */}
                    {index > 0 && (
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"
                        style={{
                          width: "4px",
                          height: "32px",
                          background: isCompleted ? zone.nodeColor : "#E0E0E0",
                          opacity: 0.6,
                        }}
                      />
                    )}

                    <div
                      className="absolute top-0"
                      style={{ left: offsetX, transform: "translateX(-50%)" }}
                    >
                      <motion.button
                        onClick={() => isCurrent || isCompleted ? onNavigate("addition") : null}
                        className="relative flex items-center justify-center text-2xl font-bold"
                        style={{
                          width: isCurrent ? "100px" : "80px",
                          height: isCurrent ? "100px" : "80px",
                          background: isLocked
                            ? "linear-gradient(145deg, rgba(200,200,200,0.4) 0%, rgba(180,180,180,0.3) 100%)"
                            : `linear-gradient(145deg, ${zone.nodeColor} 0%, ${zone.nodeColor}dd 100%)`,
                          borderRadius: "50%",
                          boxShadow: isLocked
                            ? "0 8px 20px rgba(0,0,0,0.1)"
                            : isCurrent
                            ? `0 0 30px ${zone.nodeColor}, 0 15px 30px rgba(0,0,0,0.2)`
                            : "0 10px 25px rgba(0,0,0,0.15)",
                          border: isCurrent ? "5px solid white" : "4px solid rgba(255,255,255,0.4)",
                          color: isLocked ? "#999" : "white",
                          cursor: isLocked ? "default" : "pointer",
                        }}
                        whileHover={!isLocked ? { scale: 1.1 } : {}}
                        whileTap={!isLocked ? { scale: 0.95 } : {}}
                      >
                        {isLocked ? (
                          <Lock className="w-8 h-8" />
                        ) : isCompleted ? (
                          <Star className="w-8 h-8 fill-current" />
                        ) : (
                          <span style={{ textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>
                            {level}
                          </span>
                        )}

                        {/* Current level indicator - Giggles */}
                        {isCurrent && (
                          <div className="absolute -top-16">
                            <Giggles size={60} animate={true} />
                          </div>
                        )}
                      </motion.button>

                      {/* Level number label */}
                      <div className="text-center mt-2 font-bold text-gray-700">
                        Level {level}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
