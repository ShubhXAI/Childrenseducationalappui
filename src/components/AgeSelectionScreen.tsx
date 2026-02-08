import { motion } from "motion/react";
import { Giggles } from "./Giggles";

interface AgeSelectionScreenProps {
  onSelectAge: (ageGroup: string) => void;
}

export function AgeSelectionScreen({ onSelectAge }: AgeSelectionScreenProps) {
  const ageGroups = [
    {
      range: "3-4",
      title: "Little Explorer",
      emoji: "🐣",
      color: "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
      description: "First steps in learning!"
    },
    {
      range: "5-6",
      title: "Young Learner",
      emoji: "🌟",
      color: "linear-gradient(145deg, #FF6EC7 0%, #A855F7 100%)",
      description: "Ready for adventure!"
    },
    {
      range: "7-8",
      title: "Super Student",
      emoji: "🚀",
      color: "linear-gradient(145deg, #4A90E2 0%, #7ED321 100%)",
      description: "Let's explore more!"
    }
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{
      background: "linear-gradient(180deg, #FFE66D 0%, #A8E063 50%, #87CEEB 100%)"
    }}>
      {/* Floating decorations */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute text-5xl"
          style={{
            top: `${5 + (i % 5) * 20}%`,
            left: `${3 + i * 6}%`,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360],
            transition: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {i % 5 === 0 ? "⭐" : i % 5 === 1 ? "🎈" : i % 5 === 2 ? "☁️" : i % 5 === 3 ? "🌈" : "✨"}
        </motion.div>
      ))}

      <div className="w-full h-full flex flex-col items-center justify-center px-12 py-8 gap-12">
        {/* Header */}
        <motion.div
          className="flex items-center gap-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <Giggles size={140} animate={true} />
          <div className="text-center">
            <h1 className="text-8xl font-bold mb-2" style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 33%, #7ED321 66%, #4A90E2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 6px 15px rgba(0,0,0,0.1)",
              letterSpacing: "0.04em"
            }}>
              HOW OLD ARE YOU?
            </h1>
            <p className="text-4xl font-bold text-white" style={{
              textShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}>
              Choose your age to get started! 🎉
            </p>
          </div>
        </motion.div>

        {/* Age cards */}
        <div className="flex gap-10 items-center justify-center">
          {ageGroups.map((group, index) => (
            <motion.button
              key={group.range}
              onClick={() => onSelectAge(group.range)}
              className="relative flex flex-col items-center justify-center"
              style={{
                width: "380px",
                height: "480px",
                background: group.color,
                borderRadius: "60px",
                boxShadow: `
                  0 25px 55px rgba(0,0,0,0.25),
                  inset 0 -8px 20px rgba(0,0,0,0.15),
                  inset 0 8px 20px rgba(255,255,255,0.6)
                `,
                border: "10px solid rgba(255,255,255,0.6)",
              }}
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, type: "spring", damping: 12 }}
              whileHover={{ scale: 1.1, y: -15 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Emoji */}
              <motion.div
                className="flex items-center justify-center text-9xl mb-6"
                style={{
                  width: "180px",
                  height: "180px",
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 15px 35px rgba(0,0,0,0.2),
                    inset 0 8px 20px rgba(255,255,255,0.7)
                  `,
                  border: "8px solid rgba(255,255,255,0.7)",
                }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {group.emoji}
              </motion.div>

              {/* Age range */}
              <div className="text-center px-6">
                <div className="text-7xl font-bold text-white mb-4" style={{
                  textShadow: "0 5px 15px rgba(0,0,0,0.3)",
                  letterSpacing: "0.05em"
                }}>
                  {group.range}
                </div>
                <h2 className="text-4xl font-bold text-white mb-3" style={{
                  textShadow: "0 4px 12px rgba(0,0,0,0.25)"
                }}>
                  {group.title}
                </h2>
                <p className="text-2xl font-bold text-white/95" style={{
                  textShadow: "0 3px 8px rgba(0,0,0,0.25)"
                }}>
                  {group.description}
                </p>
              </div>

              {/* Shine effect */}
              <div
                className="absolute top-10 left-10 pointer-events-none"
                style={{
                  width: "140px",
                  height: "140px",
                  background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
                  borderRadius: "50%",
                }}
              />

              {/* Floating star */}
              <motion.div
                className="absolute -top-6 -right-6 text-6xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  transition: { duration: 3, repeat: Infinity }
                }}
              >
                ⭐
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
