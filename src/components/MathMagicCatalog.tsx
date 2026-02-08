import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { Giggles } from "./Giggles";

interface MathMagicCatalogProps {
  onNavigate: (screen: string, catalog?: string) => void;
}

export function MathMagicCatalog({ onNavigate }: MathMagicCatalogProps) {
  const catalogs = [
    {
      id: "numberFriends",
      title: "Number Friends",
      emoji: "🔢",
      color: "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
      description: "Meet numbers 1 to 10!",
      icon: "1️⃣"
    },
    {
      id: "countWithMe",
      title: "Count with Me",
      emoji: "🍎",
      color: "linear-gradient(145deg, #FF6EC7 0%, #FE6B8B 100%)",
      description: "Count fun things!",
      icon: "🌟"
    },
    {
      id: "shapeMatch",
      title: "Shape Match",
      emoji: "🔷",
      color: "linear-gradient(145deg, #4A90E2 0%, #5FC3E4 100%)",
      description: "Find matching shapes!",
      icon: "⭕"
    },
    {
      id: "bigOrSmall",
      title: "Big or Small",
      emoji: "🐘",
      color: "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)",
      description: "Compare sizes!",
      icon: "↔️"
    }
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{
      background: "linear-gradient(180deg, #FFE66D 0%, #A8E063 50%, #87CEEB 100%)"
    }}>
      {/* Floating decorations */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute text-4xl"
          style={{
            top: `${10 + (i % 4) * 20}%`,
            left: `${5 + i * 8}%`,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            transition: { duration: 3 + i * 0.5, repeat: Infinity }
          }}
        >
          {["⭐", "🎈", "✨", "🌟"][i % 4]}
        </motion.div>
      ))}

      {/* Header */}
      <div className="p-6 flex items-center justify-between" style={{
        background: "rgba(255,255,255,0.9)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => onNavigate("home")}
            className="p-4 text-white"
            style={{
              background: "linear-gradient(145deg, #FF6B6B 0%, #FE8C5B 100%)",
              borderRadius: "50%",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
              border: "4px solid white"
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-7 h-7" />
          </motion.button>
          
          <div>
            <h1 className="text-4xl font-bold" style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Maths Magic 🔢
            </h1>
            <p className="text-xl text-gray-600 font-semibold">Choose what to learn!</p>
          </div>
        </div>

        <Giggles size={100} animate={true} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <motion.h2
          className="text-6xl font-bold mb-8"
          style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #4A90E2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10 }}
        >
          Pick Your Adventure! 🎉
        </motion.h2>

        {/* Catalog grid */}
        <div className="grid grid-cols-2 gap-10 max-w-5xl">
          {catalogs.map((catalog, index) => (
            <motion.button
              key={catalog.id}
              onClick={() => onNavigate("mathQuestions", catalog.id)}
              className="relative flex flex-col items-center justify-center p-10"
              style={{
                width: "100%",
                minHeight: "380px",
                background: catalog.color,
                borderRadius: "50px",
                boxShadow: `
                  0 20px 45px rgba(0,0,0,0.25),
                  inset 0 -6px 15px rgba(0,0,0,0.15),
                  inset 0 6px 15px rgba(255,255,255,0.6)
                `,
                border: "8px solid rgba(255,255,255,0.6)",
              }}
              initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: index * 0.12, type: "spring", damping: 12 }}
              whileHover={{ scale: 1.08, y: -10, rotate: 2 }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Main emoji */}
              <motion.div
                className="flex items-center justify-center text-8xl mb-4"
                style={{
                  width: "150px",
                  height: "150px",
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 12px 28px rgba(0,0,0,0.2),
                    inset 0 6px 16px rgba(255,255,255,0.7)
                  `,
                  border: "6px solid rgba(255,255,255,0.7)",
                }}
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.05, 1],
                  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {catalog.emoji}
              </motion.div>

              {/* Title and description */}
              <div className="text-center">
                <h3 className="text-5xl font-bold text-white mb-3" style={{
                  textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  letterSpacing: "0.02em"
                }}>
                  {catalog.title}
                </h3>
                <p className="text-2xl font-bold text-white/95 mb-4" style={{
                  textShadow: "0 3px 8px rgba(0,0,0,0.25)"
                }}>
                  {catalog.description}
                </p>
                
                {/* Icon indicator */}
                <div className="text-4xl">{catalog.icon}</div>
              </div>

              {/* Shine effect */}
              <div
                className="absolute top-8 left-8 pointer-events-none"
                style={{
                  width: "100px",
                  height: "100px",
                  background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
                  borderRadius: "50%",
                }}
              />

              {/* Floating stars */}
              <motion.div
                className="absolute -top-4 -right-4 text-5xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.15, 1],
                  transition: { duration: 2.5, repeat: Infinity }
                }}
              >
                ⭐
              </motion.div>

              {/* Question count badge */}
              <motion.div
                className="absolute bottom-6 right-6 px-5 py-3 text-white font-bold text-xl rounded-full"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "3px solid rgba(255,255,255,0.5)"
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                5 Fun Games! 🎮
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
