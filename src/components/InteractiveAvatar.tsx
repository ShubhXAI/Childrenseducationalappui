import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Lightbulb, X } from "lucide-react";
import { Giggles } from "./Giggles";
import { useTheme } from "../contexts/ThemeContext";

export type AvatarMood = "happy" | "sad" | "thinking" | "excited" | "encouraging";

interface InteractiveAvatarProps {
  mood: AvatarMood;
  message?: string;
  onHintRequest?: () => void;
  showHintButton?: boolean;
  explanation?: string;
  wrongAttempts?: number;
}

export function InteractiveAvatar({ 
  mood, 
  message, 
  onHintRequest,
  showHintButton = false,
  explanation,
  wrongAttempts = 0
}: InteractiveAvatarProps) {
  const { currentTheme } = useTheme();
  const [showExplanation, setShowExplanation] = useState(false);
  const [bounce, setBounce] = useState(false);

  // Auto-show explanation after 2 wrong attempts
  useEffect(() => {
    if (wrongAttempts >= 2 && explanation) {
      setShowExplanation(true);
    }
  }, [wrongAttempts, explanation]);

  // Trigger bounce animation when mood changes
  useEffect(() => {
    setBounce(true);
    const timeout = setTimeout(() => setBounce(false), 1000);
    return () => clearTimeout(timeout);
  }, [mood]);

  const getMoodAnimation = () => {
    switch (mood) {
      case "happy":
        return {
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.8, repeat: Infinity }
        };
      case "sad":
        return {
          y: [0, 5, 0],
          rotate: [0, -3, 3, 0],
          transition: { duration: 1.5, repeat: Infinity }
        };
      case "thinking":
        return {
          rotate: [-5, 5, -5],
          transition: { duration: 1, repeat: Infinity }
        };
      case "excited":
        return {
          y: [0, -30, 0],
          rotate: [0, 360],
          transition: { duration: 0.6, repeat: 3 }
        };
      case "encouraging":
        return {
          scale: [1, 1.1, 1],
          transition: { duration: 0.8, repeat: Infinity }
        };
    }
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case "happy": return "😊";
      case "sad": return "😔";
      case "thinking": return "🤔";
      case "excited": return "🎉";
      case "encouraging": return "💪";
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case "happy": return "#7ED321";
      case "sad": return "#FF6B6B";
      case "thinking": return "#4A90E2";
      case "excited": return "#FFD93D";
      case "encouraging": return "#A855F7";
    }
  };

  return (
    <>
      {/* Avatar */}
      <motion.div
        className="fixed top-32 right-8 z-40"
        animate={getMoodAnimation()}
      >
        {/* Giggles character */}
        <div className="relative">
          <Giggles 
            size={140} 
            animate={true} 
            accessory={mood === "excited" ? "star" : mood === "encouraging" ? "wave" : "none"} 
          />
          
          {/* Mood emoji badge */}
          <motion.div
            className="absolute -bottom-2 -right-2 text-4xl bg-white rounded-full p-2 shadow-lg"
            style={{ border: `4px solid ${getMoodColor()}` }}
            animate={bounce ? {
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
              transition: { duration: 0.5 }
            } : {}}
          >
            {getMoodEmoji()}
          </motion.div>
        </div>

        {/* Speech bubble with message */}
        <AnimatePresence>
          {message && (
            <motion.div
              className="absolute top-0 right-full mr-4 px-6 py-4 rounded-3xl text-white font-bold shadow-lg max-w-xs"
              style={{
                background: `linear-gradient(145deg, ${getMoodColor()} 0%, ${getMoodColor()}dd 100%)`,
                border: "4px solid white"
              }}
              initial={{ scale: 0, x: 50, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              exit={{ scale: 0, x: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <p className="text-lg" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                {message}
              </p>
              {/* Speech bubble tail */}
              <div
                className="absolute top-1/2 -right-3 w-0 h-0"
                style={{
                  borderLeft: `15px solid ${getMoodColor()}`,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  transform: "translateY(-50%)"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint button */}
        {showHintButton && onHintRequest && (
          <motion.button
            onClick={() => {
              onHintRequest();
              setShowExplanation(true);
            }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white font-bold shadow-lg flex items-center gap-2"
            style={{
              background: currentTheme.gradients.button2,
              border: "3px solid white"
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: [
                "0 6px 20px rgba(0,0,0,0.3)",
                "0 10px 30px rgba(255,217,61,0.6)",
                "0 6px 20px rgba(0,0,0,0.3)"
              ],
              transition: { duration: 1.5, repeat: Infinity }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb className="w-5 h-5" />
            Need Help?
          </motion.button>
        )}
      </motion.div>

      {/* Explanation modal */}
      <AnimatePresence>
        {showExplanation && explanation && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExplanation(false)}
            />

            {/* Explanation card */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] bg-white rounded-3xl p-8 shadow-2xl max-w-2xl"
              style={{
                border: "6px solid rgba(255,255,255,0.9)"
              }}
              initial={{ scale: 0.5, opacity: 0, y: "-50%", x: "-50%" }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">
                    <Giggles size={80} animate={true} accessory="wave" />
                  </div>
                  <h2 className="text-4xl font-bold" style={{
                    background: currentTheme.gradients.header,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    💡 Let me help you!
                  </h2>
                </div>
                <motion.button
                  onClick={() => setShowExplanation(false)}
                  className="p-3 rounded-full text-white"
                  style={{
                    background: currentTheme.gradients.button1
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Explanation content */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <div className="text-2xl text-gray-700 leading-relaxed">
                  {explanation}
                </div>
              </div>

              {/* Action button */}
              <motion.button
                onClick={() => setShowExplanation(false)}
                className="w-full px-8 py-4 rounded-full text-white text-2xl font-bold"
                style={{
                  background: currentTheme.gradients.button2,
                  border: "4px solid white",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ Got it! Let's try again!
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
