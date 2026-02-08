import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface BigVsSmallChoiceProps {
  objectEmoji: string;
  objectName: string;
  correctAnswer: "big" | "small";
  onComplete: (isCorrect: boolean) => void;
}

export function BigVsSmallChoice({ objectEmoji, objectName, correctAnswer, onComplete }: BigVsSmallChoiceProps) {
  const [selected, setSelected] = useState<"big" | "small" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setShowFeedback(false);
  }, [objectEmoji, correctAnswer]);

  const handleSelect = (choice: "big" | "small") => {
    setSelected(choice);
    setShowFeedback(true);

    const isCorrect = choice === correctAnswer;
    
    if (isCorrect) {
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
      // Give gentle hint and let them try again
      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
      }, 1500);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-16 p-8">
      {/* Instructions */}
      <motion.div
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="inline-block px-10 py-6 bg-white rounded-3xl shadow-lg">
          <p className="text-4xl font-bold text-gray-700">
            👉 Tap the <span className="text-6xl text-blue-600">{correctAnswer}</span> {objectName}!
          </p>
        </div>
      </motion.div>

      {/* Two objects to compare */}
      <div className="flex items-end gap-20">
        {/* Big option */}
        <motion.button
          onClick={() => !showFeedback && handleSelect("big")}
          className="relative flex flex-col items-center gap-4"
          style={{
            cursor: showFeedback ? "default" : "pointer"
          }}
          whileHover={!showFeedback ? { scale: 1.05, y: -10 } : {}}
          whileTap={!showFeedback ? { scale: 0.95 } : {}}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <motion.div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: "320px",
              height: "320px",
              background: showFeedback && selected === "big"
                ? correctAnswer === "big"
                  ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
                  : "linear-gradient(145deg, #FFB6C1 0%, #FFA0B4 100%)"
                : "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
              boxShadow: `
                0 20px 50px rgba(0,0,0,0.25),
                inset 0 -8px 20px rgba(0,0,0,0.15),
                inset 0 8px 20px rgba(255,255,255,0.5)
              `,
              border: selected === "big" ? "10px solid white" : "8px solid rgba(255,255,255,0.6)",
              fontSize: "12rem",
              transition: "all 0.3s ease"
            }}
            animate={{
              scale: [1, 1.05, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            {objectEmoji}
            
            {showFeedback && selected === "big" && (
              <motion.div
                className="absolute -top-6 -right-6 text-7xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
              >
                {correctAnswer === "big" ? "✅" : "❌"}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="px-8 py-4 rounded-full text-white text-3xl font-bold"
            style={{
              background: "linear-gradient(145deg, #4A90E2 0%, #5FC3E4 100%)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              border: "5px solid rgba(255,255,255,0.6)"
            }}
            animate={{
              y: [0, -5, 0],
              transition: { duration: 1.5, repeat: Infinity }
            }}
          >
            BIG 📏
          </motion.div>
        </motion.button>

        {/* Small option */}
        <motion.button
          onClick={() => !showFeedback && handleSelect("small")}
          className="relative flex flex-col items-center gap-4"
          style={{
            cursor: showFeedback ? "default" : "pointer"
          }}
          whileHover={!showFeedback ? { scale: 1.05, y: -10 } : {}}
          whileTap={!showFeedback ? { scale: 0.95 } : {}}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <motion.div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: "180px",
              height: "180px",
              background: showFeedback && selected === "small"
                ? correctAnswer === "small"
                  ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
                  : "linear-gradient(145deg, #FFB6C1 0%, #FFA0B4 100%)"
                : "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
              boxShadow: `
                0 15px 40px rgba(0,0,0,0.25),
                inset 0 -6px 15px rgba(0,0,0,0.15),
                inset 0 6px 15px rgba(255,255,255,0.5)
              `,
              border: selected === "small" ? "8px solid white" : "6px solid rgba(255,255,255,0.6)",
              fontSize: "6rem",
              transition: "all 0.3s ease"
            }}
            animate={{
              scale: [1, 1.08, 1],
              transition: { duration: 2, repeat: Infinity, delay: 0.5 }
            }}
          >
            {objectEmoji}
            
            {showFeedback && selected === "small" && (
              <motion.div
                className="absolute -top-4 -right-4 text-5xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
              >
                {correctAnswer === "small" ? "✅" : "❌"}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="px-6 py-3 rounded-full text-white text-2xl font-bold"
            style={{
              background: "linear-gradient(145deg, #FF6EC7 0%, #FE6B8B 100%)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              border: "4px solid rgba(255,255,255,0.6)"
            }}
            animate={{
              y: [0, -5, 0],
              transition: { duration: 1.5, repeat: Infinity, delay: 0.7 }
            }}
          >
            SMALL 📐
          </motion.div>
        </motion.button>
      </div>

      {/* Encouragement */}
      {showFeedback && selected === correctAnswer && (
        <motion.div
          className="text-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-9xl mb-4">🎉</div>
          <div className="text-6xl font-bold" style={{
            background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            Perfect! That's the {correctAnswer} one! 🌟
          </div>
        </motion.div>
      )}

      {/* Gentle hint on wrong answer */}
      {showFeedback && selected !== correctAnswer && (
        <motion.div
          className="text-4xl font-bold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Try the other one! 😊
        </motion.div>
      )}
    </div>
  );
}