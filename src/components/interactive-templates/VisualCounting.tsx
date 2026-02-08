import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface VisualCountingProps {
  question: string;
  objectEmoji: string;
  objectCount: number;
  correctAnswer: number;
  options: number[];
  onComplete: (isCorrect: boolean) => void;
}

export function VisualCounting({ 
  question, 
  objectEmoji, 
  objectCount,
  correctAnswer, 
  options, 
  onComplete 
}: VisualCountingProps) {
  const [showObjects, setShowObjects] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setShowObjects(false);
    setRevealedCount(0);
    setShowOptions(false);
    setSelected(null);
    setShowFeedback(false);
  }, [question, objectCount]);

  useEffect(() => {
    // Start showing objects after a brief delay
    setTimeout(() => {
      setShowObjects(true);
    }, 500);
  }, [question]);

  useEffect(() => {
    if (showObjects && revealedCount < objectCount) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (revealedCount === objectCount && objectCount > 0) {
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showObjects, revealedCount, objectCount]);

  const handleSelect = (answer: number) => {
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
          <p className="text-5xl font-bold text-gray-700">
            {question}
          </p>
        </div>
      </motion.div>

      {/* Objects display */}
      <div className="min-h-[280px] flex items-center justify-center">
        <div className="flex flex-wrap gap-6 justify-center items-center max-w-4xl">
          <AnimatePresence>
            {Array.from({ length: revealedCount }).map((_, index) => (
              <motion.div
                key={index}
                className="relative"
                style={{
                  fontSize: "6rem"
                }}
                initial={{ scale: 0, opacity: 0, rotate: -180, y: -100 }}
                animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  delay: 0.1
                }}
              >
                {objectEmoji}
                
                {/* Sparkle effect */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-5xl pointer-events-none"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  ✨
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Count display during reveal */}
      {revealedCount > 0 && !showOptions && (
        <motion.div
          className="px-10 py-5 rounded-full text-white text-6xl font-bold"
          style={{
            background: "linear-gradient(145deg, #4A90E2 0%, #5FC3E4 100%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            border: "6px solid rgba(255,255,255,0.6)",
            textShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}
          key={revealedCount}
          initial={{ scale: 0.5, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 12 }}
        >
          {revealedCount}
        </motion.div>
      )}

      {/* Answer options */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="flex gap-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {options.map((num, index) => {
              const isCorrect = num === correctAnswer;
              const isSelected = selected === num;

              return (
                <motion.button
                  key={num}
                  onClick={() => !showFeedback && handleSelect(num)}
                  className="relative"
                  style={{
                    width: "180px",
                    height: "180px",
                    background: showFeedback && isSelected
                      ? isCorrect
                        ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
                        : "linear-gradient(145deg, #FFB6C1 0%, #FFA0B4 100%)"
                      : "linear-gradient(145deg, #FF6EC7 0%, #FE6B8B 100%)",
                    borderRadius: "40px",
                    boxShadow: `
                      0 15px 35px rgba(0,0,0,0.25),
                      inset 0 -6px 15px rgba(0,0,0,0.15),
                      inset 0 6px 15px rgba(255,255,255,0.5)
                    `,
                    border: isSelected ? "8px solid white" : "6px solid rgba(255,255,255,0.6)",
                    fontSize: "6rem",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    cursor: showFeedback ? "default" : "pointer",
                    transition: "all 0.3s ease"
                  }}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", damping: 12 }}
                  whileHover={!showFeedback ? { scale: 1.12, y: -8 } : {}}
                  whileTap={!showFeedback ? { scale: 0.95 } : {}}
                >
                  {num}

                  {showFeedback && isSelected && (
                    <motion.div
                      className="absolute -top-4 -right-4 text-6xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                    >
                      {isCorrect ? "✅" : "❌"}
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

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
              transition: { duration: 0.5, repeat: 4 }
            }}
          >
            <div className="text-9xl mb-6">🎊🎉🌟</div>
            <div className="text-7xl font-bold text-white" style={{
              textShadow: "0 6px 15px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              YES! You counted {correctAnswer}! 🏆
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
          Count again! You can do it! 💪
        </motion.div>
      )}
    </div>
  );
}