import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { Giggles } from "./Giggles";
import { useTheme } from "../contexts/ThemeContext";

interface GameSelectionScreenProps {
  onNavigate: (screen: string) => void;
}

export function GameSelectionScreen({ onNavigate }: GameSelectionScreenProps) {
  const { currentTheme } = useTheme();
  
  const gameCategories = [
    {
      id: "numbers",
      title: "Play with Numbers",
      icon: "🔢",
      color: "#FF6B6B",
      description: "Fun math adventures!",
      screen: "additionGame",
      available: true
    },
    {
      id: "civic",
      title: "World Tour",
      icon: "🌍",
      color: "#4A90E2",
      description: "Learn good habits!",
      screen: "civicSenseGame",
      available: true
    },
    {
      id: "evs",
      title: "Nature Explorer",
      icon: "🌿",
      color: "#7ED321",
      description: "Discover the environment!",
      screen: "evsGame",
      available: false
    }
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{
      background: currentTheme.gradients.main
    }}>
      {/* Floating decorations */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl"
          style={{
            top: `${10 + (i % 4) * 20}%`,
            left: `${5 + i * 10}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 15, -15, 0],
            transition: { duration: 3 + i * 0.5, repeat: Infinity }
          }}
        >
          {currentTheme.decorations.floating[i % currentTheme.decorations.floating.length]}
        </motion.div>
      ))}

      {/* Header */}
      <div className="p-4 flex items-center justify-between" style={{
        background: "rgba(255,255,255,0.9)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => onNavigate("login")}
            className="p-3 text-white"
            style={{
              background: currentTheme.gradients.button1,
              borderRadius: "50%",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
              border: "3px solid white"
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <div>
            <h1 className="text-3xl font-bold" style={{
              background: currentTheme.gradients.header,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Choose Your Adventure! 🎮
            </h1>
            <p className="text-sm text-gray-600">Pick a game to play</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        {/* Giggles mascot */}
        <motion.div
          className="absolute top-32 left-12"
          animate={{
            y: [0, -20, 0],
            transition: { duration: 2.5, repeat: Infinity }
          }}
        >
          <Giggles size={140} animate={true} accessory={currentTheme.character.accessory} />
        </motion.div>

        {/* Game cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gameCategories.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ scale: 0, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.2,
                type: "spring",
                damping: 12
              }}
            >
              <motion.button
                onClick={() => game.available && onNavigate(game.screen)}
                disabled={!game.available}
                className="relative w-full h-full"
                whileHover={game.available ? { scale: 1.05, y: -10 } : {}}
                whileTap={game.available ? { scale: 0.95 } : {}}
                style={{
                  cursor: game.available ? "pointer" : "not-allowed",
                  opacity: game.available ? 1 : 0.6
                }}
              >
                <div
                  className="p-8 rounded-3xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${game.color} 0%, ${game.color}dd 100%)`,
                    boxShadow: `
                      0 20px 50px rgba(0,0,0,0.2),
                      inset 0 -8px 20px rgba(0,0,0,0.2),
                      inset 0 8px 20px rgba(255,255,255,0.3)
                    `,
                    border: "6px solid rgba(255,255,255,0.5)",
                    minHeight: "380px"
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="text-8xl mb-4 text-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                    }}
                  >
                    {game.icon}
                  </motion.div>

                  {/* Title */}
                  <h2 
                    className="text-3xl font-bold text-white text-center mb-3"
                    style={{
                      textShadow: "0 4px 10px rgba(0,0,0,0.3)"
                    }}
                  >
                    {game.title}
                  </h2>

                  {/* Description */}
                  <p 
                    className="text-lg font-bold text-white text-center mb-6"
                    style={{
                      textShadow: "0 2px 6px rgba(0,0,0,0.2)"
                    }}
                  >
                    {game.description}
                  </p>

                  {/* Status badge */}
                  {game.available ? (
                    <motion.div
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 text-lg font-bold bg-white rounded-full shadow-lg"
                      style={{ color: game.color }}
                      animate={{
                        boxShadow: [
                          "0 6px 20px rgba(0,0,0,0.2)",
                          "0 10px 30px rgba(0,0,0,0.3)",
                          "0 6px 20px rgba(0,0,0,0.2)"
                        ],
                        transition: { duration: 1.5, repeat: Infinity }
                      }}
                    >
                      ▶ PLAY NOW!
                    </motion.div>
                  ) : (
                    <div
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 text-lg font-bold bg-white/50 rounded-full"
                      style={{ color: "white" }}
                    >
                      🔒 COMING SOON
                    </div>
                  )}

                  {/* Decorative stars */}
                  <motion.div
                    className="absolute top-4 right-4 text-4xl"
                    animate={{
                      rotate: [0, 360],
                      transition: { duration: 3, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    ⭐
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 w-full h-32" style={{
        background: `linear-gradient(180deg, transparent 0%, ${currentTheme.colors.secondary} 100%)`,
        borderRadius: "50% 50% 0 0 / 40% 40% 0 0",
      }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-4 text-5xl"
            style={{ left: `${i * 10 + 3}%` }}
            animate={{
              y: [0, -10, 0],
              rotate: [-10, 10, -10],
              transition: { duration: 2 + i * 0.3, repeat: Infinity }
            }}
          >
            {currentTheme.decorations.ground[i % currentTheme.decorations.ground.length]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}