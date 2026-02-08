import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface TapAndCountProps {
  objects: { emoji: string; count: number };
  onComplete: (isCorrect: boolean) => void;
}

export function TapAndCount({ objects, onComplete }: TapAndCountProps) {
  const [tappedCount, setTappedCount] = useState(0);
  const [tappedIndexes, setTappedIndexes] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTappedCount(0);
    setTappedIndexes([]);
    setShowSuccess(false);
  }, [objects]);

  const handleTap = (index: number) => {
    if (tappedIndexes.includes(index)) return;
    
    const newTapped = [...tappedIndexes, index];
    setTappedIndexes(newTapped);
    setTappedCount(newTapped.length);

    // Play count sound/animation
    const utterance = new SpeechSynthesisUtterance(`${newTapped.length}`);
    utterance.rate = 1.2;
    utterance.pitch = 1.3;
    window.speechSynthesis.speak(utterance);

    if (newTapped.length === objects.count) {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete(true);
      }, 2000);
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
        <div className="inline-block px-12 py-8 bg-white rounded-3xl shadow-lg">
          <p className="text-5xl font-bold text-gray-700">
            Tap and count the {objects.emoji}! 👆
          </p>
        </div>
      </motion.div>

      {/* Count display */}
      <motion.div
        className="px-12 py-6 rounded-full text-white text-7xl font-bold"
        style={{
          background: "linear-gradient(145deg, #4A90E2 0%, #5FC3E4 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          border: "6px solid rgba(255,255,255,0.8)",
          textShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
        key={tappedCount}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12 }}
      >
        {tappedCount}
      </motion.div>

      {/* Objects to tap */}
      <div className="flex flex-wrap gap-8 justify-center items-center max-w-5xl">
        {Array.from({ length: objects.count }).map((_, index) => {
          const isTapped = tappedIndexes.includes(index);
          const wasRecentlyTapped = tappedIndexes[tappedIndexes.length - 1] === index;

          return (
            <motion.button
              key={index}
              onClick={() => handleTap(index)}
              className="relative"
              style={{
                fontSize: "7rem",
                cursor: isTapped ? "default" : "pointer",
                filter: isTapped ? "grayscale(80%) brightness(0.7)" : "none",
                transition: "filter 0.3s ease"
              }}
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                opacity: 1,
                y: isTapped ? 0 : [0, -8, 0]
              }}
              transition={{
                scale: { delay: index * 0.1, type: "spring", damping: 12 },
                rotate: { delay: index * 0.1, type: "spring", damping: 12 },
                opacity: { delay: index * 0.1 },
                y: { duration: 2, repeat: Infinity, delay: index * 0.2 }
              }}
              whileHover={!isTapped ? { scale: 1.2, y: -15 } : {}}
              whileTap={!isTapped ? { scale: 0.9 } : {}}
            >
              {objects.emoji}

              {/* Highlight ring when tapped */}
              {isTapped && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "6px solid #7ED321",
                    boxShadow: "0 0 25px rgba(126, 211, 33, 0.6)"
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 1 }}
                />
              )}

              {/* Number badge */}
              {isTapped && (
                <motion.div
                  className="absolute -top-4 -right-4 text-4xl font-bold text-white px-4 py-2 rounded-full"
                  style={{
                    background: "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
                    border: "4px solid white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  {tappedIndexes.indexOf(index) + 1}
                </motion.div>
              )}

              {/* Sparkle on recent tap */}
              {wasRecentlyTapped && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none text-6xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  ✨
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Progress hint */}
      {tappedCount > 0 && tappedCount < objects.count && (
        <motion.div
          className="text-3xl font-bold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Keep going! Tap the rest! 👆
        </motion.div>
      )}

      {/* Success animation */}
      {showSuccess && (
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
            <div className="text-9xl mb-6">🎊🎉🌟</div>
            <div className="text-7xl font-bold text-white" style={{
              textShadow: "0 6px 15px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              YES! You counted all {objects.count}! 🏆
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
