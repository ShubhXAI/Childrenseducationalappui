import { motion } from "motion/react";
import { Giggles } from "./Giggles";
import { useTheme } from "../contexts/ThemeContext";

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const { currentTheme } = useTheme();

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{
      background: currentTheme.gradients.main
    }}>
      {/* Floating decorations */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl"
          style={{
            top: `${5 + (i % 4) * 20}%`,
            left: `${2 + i * 8}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            transition: { duration: 5 + i * 1.2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {currentTheme.decorations.floating[i % currentTheme.decorations.floating.length]}
        </motion.div>
      ))}

      {/* Central welcome card */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-20 py-16"
        style={{
          background: currentTheme.colors.cardBg,
          borderRadius: "60px",
          boxShadow: `
            0 30px 70px rgba(0,0,0,0.2),
            inset 0 -8px 20px rgba(0,0,0,0.04),
            inset 0 8px 20px rgba(255,255,255,1)
          `,
          border: "12px solid #FFFFFF",
        }}
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", type: "spring", damping: 12 }}
      >
        {/* Giggles character */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            transition: { duration: 2, repeat: Infinity }
          }}
        >
          <Giggles size={200} animate={true} accessory={currentTheme.character.accessory} />
        </motion.div>

        {/* Welcome text */}
        <div className="text-center">
          <motion.h1 
            className="text-8xl font-bold mb-3"
            style={{
              background: currentTheme.gradients.header,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 6px 15px rgba(0,0,0,0.1)",
              letterSpacing: "0.03em"
            }}
            animate={{
              scale: [1, 1.05, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            WELCOME!
          </motion.h1>
          <p className="text-4xl font-bold text-gray-600 mb-2">Let's Learn & Play!</p>
          <p className="text-2xl text-gray-500">with Giggles 🎉</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-5 w-full">
          <motion.button
            onClick={() => onNavigate("home")}
            className="px-16 py-8 text-white text-4xl font-bold tracking-wide"
            style={{
              background: currentTheme.gradients.button1,
              borderRadius: "60px",
              boxShadow: `
                0 15px 35px rgba(0,0,0,0.3),
                inset 0 -6px 15px rgba(0,0,0,0.2),
                inset 0 6px 15px rgba(255,255,255,0.5)
              `,
              border: "6px solid rgba(255,255,255,0.5)",
            }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 START ADVENTURE!
          </motion.button>

          <motion.button
            onClick={() => onNavigate("gameSelection")}
            className="px-16 py-8 text-white text-4xl font-bold tracking-wide"
            style={{
              background: currentTheme.gradients.button2,
              borderRadius: "60px",
              boxShadow: `
                0 15px 35px rgba(0,0,0,0.3),
                inset 0 -6px 15px rgba(0,0,0,0.2),
                inset 0 6px 15px rgba(255,255,255,0.5)
              `,
              border: "6px solid rgba(255,255,255,0.5)",
            }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 LET'S PLAY!
          </motion.button>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-8 -right-8 text-7xl"
          animate={{
            rotate: [0, 20, -20, 0],
            transition: { duration: 3, repeat: Infinity }
          }}
        >
          {currentTheme.decorations.floating[0]}
        </motion.div>
        <motion.div
          className="absolute -bottom-8 -left-8 text-7xl"
          animate={{
            rotate: [0, -20, 20, 0],
            transition: { duration: 3, repeat: Infinity, delay: 0.5 }
          }}
        >
          {currentTheme.decorations.floating[1]}
        </motion.div>
      </motion.div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 w-full h-1/5">
        <div
          className="absolute bottom-0 w-full h-full"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${currentTheme.colors.secondary} 100%)`,
            borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
          }}
        />
        {/* Ground decorations */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`ground-${i}`}
            className="absolute bottom-4 text-5xl"
            style={{ left: `${i * 10 + 5}%` }}
            animate={{
              rotate: [-5, 5, -5],
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
