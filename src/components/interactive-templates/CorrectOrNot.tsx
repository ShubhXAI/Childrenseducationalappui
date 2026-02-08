import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface CorrectOrNotProps {
  objectEmoji: string;
  displayCount: number;
  actualCount: number;
  onComplete: (isCorrect: boolean) => void;
}

export function CorrectOrNot({ objectEmoji, displayCount, actualCount, onComplete }: CorrectOrNotProps) {
  const [selected, setSelected] = useState<"yes" | "no" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const isCorrectAnswer = displayCount === actualCount;

  useEffect(() => {
    setSelected(null);
    setShowFeedback(false);
  }, [objectEmoji, displayCount]);

  const handleChoice = (choice: "yes" | "no") => {
    setSelected(choice);
    setShowFeedback(true);

    const userIsCorrect = (choice === "yes" && isCorrectAnswer) || (choice === "no" && !isCorrectAnswer);

    if (userIsCorrect) {
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
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
        <div className="inline-block px-12 py-8 bg-white rounded-3xl shadow-lg">
          <p className="text-5xl font-bold text-gray-700">
            Are there {displayCount} {objectEmoji}? 🤔
          </p>
        </div>
      </motion.div>

      {/* Objects display */}
      <motion.div
        className="flex flex-wrap gap-6 justify-center items-center max-w-4xl p-12 rounded-3xl"
        style={{
          background: "linear-gradient(145deg, #E3F2FD 0%, #BBDEFB 100%)",
          border: "8px solid rgba(255,255,255,0.6)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {Array.from({ length: actualCount }).map((_, index) => (
          <motion.div
            key={index}
            style={{ fontSize: "6rem" }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              damping: 12
            }}
          >
            {objectEmoji}
          </motion.div>
        ))}
      </motion.div>

      {/* Yes/No choices */}
      <div className="flex gap-16">
        <motion.button
          onClick={() => !showFeedback && handleChoice("yes")}
          className="relative"
          style={{
            width: "280px",
            height: "280px",
            background: showFeedback && selected === "yes"
              ? (selected === "yes" && isCorrectAnswer) || (selected === "yes" && !isCorrectAnswer)
                ? (selected === "yes" && isCorrectAnswer)
                  ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
                  : "linear-gradient(145deg, #FFB6C1 0%, #FFA0B4 100%)"
                : "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
              : "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)",
            borderRadius: "40px",
            boxShadow: `
              0 20px 50px rgba(0,0,0,0.25),
              inset 0 -8px 20px rgba(0,0,0,0.15),
              inset 0 8px 20px rgba(255,255,255,0.5)
            `,
            border: selected === "yes" ? "10px solid white" : "8px solid rgba(255,255,255,0.6)",
            cursor: showFeedback ? "default" : "pointer",
            transition: "all 0.3s ease"
          }}
          initial={{ x: -50, opacity: 0, rotate: -15 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          whileHover={!showFeedback ? { scale: 1.1, y: -10 } : {}}
          whileTap={!showFeedback ? { scale: 0.95 } : {}}
        >
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-8xl">✅</div>
            <div className="text-5xl font-bold text-white" style={{
              textShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}>
              YES
            </div>
          </div>

          {showFeedback && selected === "yes" && (
            <motion.div
              className="absolute -top-6 -right-6 text-8xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
            >
              {(selected === "yes" && isCorrectAnswer) ? "🎉" : "❌"}
            </motion.div>
          )}
        </motion.button>

        <motion.button
          onClick={() => !showFeedback && handleChoice("no")}
          className="relative"
          style={{
            width: "280px",
            height: "280px",
            background: showFeedback && selected === "no"
              ? (selected === "no" && !isCorrectAnswer) || (selected === "no" && isCorrectAnswer)
                ? (selected === "no" && !isCorrectAnswer)
                  ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
                  : "linear-gradient(145deg, #FFB6C1 0%, #FFA0B4 100%)"
                : "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
              : "linear-gradient(145deg, #FF6B6B 0%, #FE8C5B 100%)",
            borderRadius: "40px",
            boxShadow: `
              0 20px 50px rgba(0,0,0,0.25),
              inset 0 -8px 20px rgba(0,0,0,0.15),
              inset 0 8px 20px rgba(255,255,255,0.5)
            `,
            border: selected === "no" ? "10px solid white" : "8px solid rgba(255,255,255,0.6)",
            cursor: showFeedback ? "default" : "pointer",
            transition: "all 0.3s ease"
          }}
          initial={{ x: 50, opacity: 0, rotate: 15 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          whileHover={!showFeedback ? { scale: 1.1, y: -10 } : {}}
          whileTap={!showFeedback ? { scale: 0.95 } : {}}
        >
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-8xl">❌</div>
            <div className="text-5xl font-bold text-white" style={{
              textShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}>
              NO
            </div>
          </div>

          {showFeedback && selected === "no" && (
            <motion.div
              className="absolute -top-6 -right-6 text-8xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
            >
              {(selected === "no" && !isCorrectAnswer) ? "🎉" : "❌"}
            </motion.div>
          )}
        </motion.button>
      </div>

      {/* Feedback messages */}
      {showFeedback && (
        <motion.div
          className="text-4xl font-bold text-gray-700 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {((selected === "yes" && isCorrectAnswer) || (selected === "no" && !isCorrectAnswer)) ? (
            <div>
              <div className="text-6xl mb-3">🎉</div>
              <div>
                {isCorrectAnswer 
                  ? `You're right! There are ${actualCount}! ✨` 
                  : `Correct! There are ${actualCount}, not ${displayCount}! 🌟`
                }
              </div>
            </div>
          ) : (
            <div>Count again carefully! 🔢</div>
          )}
        </motion.div>
      )}

      {/* Success animation */}
      {showFeedback && ((selected === "yes" && isCorrectAnswer) || (selected === "no" && !isCorrectAnswer)) && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div
            className="text-center"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
              transition: { duration: 0.5, repeat: 3 }
            }}
          >
            <div className="text-9xl mb-6">🎉✨🌟</div>
            <div className="text-7xl font-bold text-white" style={{
              textShadow: "0 6px 15px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Great Counting! 🏆
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
