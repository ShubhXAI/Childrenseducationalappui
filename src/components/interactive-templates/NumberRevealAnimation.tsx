import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface NumberRevealAnimationProps {
  targetNumber: number;
  objectEmoji: string;
  objectName: string;
  onComplete: (isCorrect: boolean) => void;
}

export function NumberRevealAnimation({ targetNumber, objectEmoji, objectName, onComplete }: NumberRevealAnimationProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Generate wrong options
  const generateOptions = () => {
    const options = [targetNumber];
    const wrongOption1 = Math.max(1, targetNumber - 1);
    const wrongOption2 = targetNumber + 1;
    
    if (wrongOption1 !== targetNumber) options.push(wrongOption1);
    if (wrongOption2 !== targetNumber && wrongOption2 <= 10) options.push(wrongOption2);
    
    return options.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  const [options] = useState(generateOptions());

  useEffect(() => {
    // Reveal objects one by one
    if (revealedCount < targetNumber) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // Show options after all objects revealed
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [revealedCount, targetNumber]);

  const handleSelect = (answer: number) => {
    setSelected(answer);
    setShowFeedback(true);

    const isCorrect = answer === targetNumber;
    
    if (isCorrect) {
      setTimeout(() => {
        onComplete(true);
      }, 2500);
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
      {/* Instructions */}
      <motion.div
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="inline-block px-10 py-6 bg-white rounded-3xl shadow-lg">
          <p className="text-4xl font-bold text-gray-700">
            👀 Watch the {objectName} appear! Count them!
          </p>
        </div>
      </motion.div>

      {/* Objects appearing */}
      <div className="flex flex-wrap gap-8 justify-center items-center max-w-4xl min-h-[300px]">
        <AnimatePresence>
          {Array.from({ length: revealedCount }).map((_, index) => (
            <motion.div
              key={index}
              className="relative"
              style={{
                fontSize: "7rem"
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
              
              {/* Number badge */}
              <motion.div
                className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-blue-600"
                style={{
                  border: "3px solid #4A90E2",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {index + 1}
              </motion.div>

              {/* Sparkle effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-6xl pointer-events-none"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                ✨
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Count display */}
      {revealedCount > 0 && (
        <motion.div
          className="px-12 py-6 rounded-full text-white text-7xl font-bold"
          style={{
            background: "linear-gradient(145deg, #4A90E2 0%, #5FC3E4 100%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            border: "8px solid rgba(255,255,255,0.6)",
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

      {/* Question and options */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {/* Question */}
            <motion.div
              className="px-10 py-6 rounded-3xl"
              style={{
                background: "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                border: "6px solid rgba(255,255,255,0.6)"
              }}
            >
              <p className="text-4xl font-bold text-white" style={{
                textShadow: "0 3px 8px rgba(0,0,0,0.3)"
              }}>
                How many {objectName} did you see? 🤔
              </p>
            </motion.div>

            {/* Options */}
            <div className="flex gap-8">
              {options.map((option, index) => {
                const isCorrect = option === targetNumber;
                const isSelected = selected === option;

                return (
                  <motion.button
                    key={option}
                    onClick={() => !showFeedback && handleSelect(option)}
                    className="relative"
                    style={{
                      width: "160px",
                      height: "160px",
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
                    {option}

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success celebration */}
      {showFeedback && selected === targetNumber && (
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
              YES! {targetNumber} {objectName}! 🏆
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Gentle encouragement */}
      {showFeedback && selected !== targetNumber && (
        <motion.div
          className="text-4xl font-bold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Try counting again! You can do it! 💪
        </motion.div>
      )}
    </div>
  );
}
