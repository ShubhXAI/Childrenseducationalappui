import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface NumberRecognitionProps {
  question: string;
  correctAnswer: number;
  options: number[];
  showDots?: boolean;
  dotCount?: number;
  onComplete: (isCorrect: boolean) => void;
}

export function NumberRecognition({ 
  question, 
  correctAnswer, 
  options, 
  showDots = false,
  dotCount = 0,
  onComplete 
}: NumberRecognitionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setShowFeedback(false);
  }, [question, correctAnswer]);

  const handleSelect = (answer: number) => {
    if (showFeedback) return; // Prevent multiple clicks
    
    setSelected(answer);
    setShowFeedback(true);

    const isCorrect = answer === correctAnswer;
    
    if (isCorrect) {
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
      // Let them try again
      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
      }, 1500);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12 p-8">
      {/* Question */}
      <motion.div
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="inline-block px-12 py-8 bg-white rounded-3xl shadow-lg">
          <p className="text-5xl font-bold text-gray-700 mb-4">
            {question}
          </p>
          
          {/* Show dots if needed */}
          {showDots && dotCount > 0 && (
            <div className="flex gap-3 justify-center mt-6">
              {Array.from({ length: dotCount }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-full bg-blue-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Number options */}
      <div className="flex gap-10">
        {options.map((num, index) => {
          const isCorrect = num === correctAnswer;
          const isSelected = selected === num;

          return (
            <motion.button
              key={num}
              onClick={() => !showFeedback && handleSelect(num)}
              className="relative"
              style={{
                width: "220px",
                height: "220px",
                background: showFeedback && isSelected
                  ? isCorrect
                    ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
                    : "linear-gradient(145deg, #FFB6C1 0%, #FFA0B4 100%)"
                  : "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
                borderRadius: "50%",
                boxShadow: `
                  0 20px 50px rgba(0,0,0,0.25),
                  inset 0 -8px 20px rgba(0,0,0,0.15),
                  inset 0 8px 20px rgba(255,255,255,0.5)
                `,
                border: isSelected ? "10px solid white" : "8px solid rgba(255,255,255,0.6)",
                fontSize: "8rem",
                fontWeight: "bold",
                color: "white",
                textShadow: "0 6px 15px rgba(0,0,0,0.3)",
                cursor: showFeedback ? "default" : "pointer",
                transition: "all 0.3s ease"
              }}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0]
              }}
              transition={{ 
                scale: { delay: index * 0.1, type: "spring", damping: 12 },
                rotate: { delay: index * 0.1, type: "spring", damping: 12 },
                y: { duration: 2, repeat: Infinity, delay: index * 0.3 }
              }}
              whileHover={!showFeedback ? { scale: 1.15, y: -15 } : {}}
              whileTap={!showFeedback ? { scale: 0.95 } : {}}
            >
              {num}

              {showFeedback && isSelected && (
                <motion.div
                  className="absolute -top-6 -right-6 text-7xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  {isCorrect ? "✅" : "❌"}
                </motion.div>
              )}

              {/* Shine effect */}
              <div
                className="absolute top-8 left-8 pointer-events-none"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
                  borderRadius: "50%",
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Success celebration */}
      {showFeedback && selected === correctAnswer && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div
            className="text-center"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.15, 1],
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
              Perfect! That's {correctAnswer}! 🏆
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Gentle encouragement */}
      {showFeedback && selected !== correctAnswer && (
        <motion.div
          className="text-4xl font-bold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Try another number! You're doing great! 😊
        </motion.div>
      )}
    </div>
  );
}