import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface TapToCountProps {
  targetNumber: number;
  objectEmoji: string;
  objectName: string;
  onComplete: (isCorrect: boolean) => void;
}

export function TapToCount({ targetNumber, objectEmoji, objectName, onComplete }: TapToCountProps) {
  const [count, setCount] = useState(0);
  const [tappedItems, setTappedItems] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate items with some extras
  const items = Array.from({ length: targetNumber + 2 }, (_, i) => i);

  const handleTap = (id: number) => {
    if (tappedItems.includes(id)) return;

    const newCount = count + 1;
    setCount(newCount);
    setTappedItems([...tappedItems, id]);

    if (newCount === targetNumber) {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else if (newCount > targetNumber) {
      // If they tap too many, show hint
      setTimeout(() => {
        setCount(0);
        setTappedItems([]);
      }, 1000);
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
            👆 Tap <span className="text-6xl text-blue-600">{targetNumber}</span> {objectName}!
          </p>
        </div>
      </motion.div>

      {/* Count display */}
      <motion.div
        className="px-12 py-8 rounded-full text-white text-8xl font-bold"
        style={{
          background: "linear-gradient(145deg, #4A90E2 0%, #5FC3E4 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          border: "8px solid rgba(255,255,255,0.6)",
          textShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
        key={count}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
      >
        {count} / {targetNumber}
      </motion.div>

      {/* Items grid */}
      <div className="flex flex-wrap gap-8 justify-center max-w-4xl">
        {items.map((id) => {
          const isTapped = tappedItems.includes(id);
          
          return (
            <motion.button
              key={id}
              onClick={() => handleTap(id)}
              className="relative"
              style={{
                width: "140px",
                height: "140px",
                background: isTapped
                  ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
                  : "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
                borderRadius: "50%",
                boxShadow: isTapped
                  ? "0 5px 15px rgba(0,0,0,0.2)"
                  : `
                    0 15px 35px rgba(0,0,0,0.25),
                    inset 0 -6px 15px rgba(0,0,0,0.15),
                    inset 0 6px 15px rgba(255,255,255,0.5)
                  `,
                border: isTapped ? "6px solid white" : "6px solid rgba(255,255,255,0.6)",
                cursor: isTapped ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "5rem"
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isTapped ? 0.8 : 1,
                opacity: isTapped ? 0.5 : 1,
                y: isTapped ? 0 : [0, -10, 0]
              }}
              transition={
                isTapped
                  ? { type: "spring", damping: 15 }
                  : {
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        delay: id * 0.2
                      }
                    }
              }
              whileHover={!isTapped ? { scale: 1.15, y: -15 } : {}}
              whileTap={!isTapped ? { scale: 0.9 } : {}}
            >
              {objectEmoji}
              
              {/* Tap effect */}
              <AnimatePresence>
                {isTapped && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-7xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Check mark when tapped */}
              {isTapped && (
                <motion.div
                  className="absolute -top-3 -right-3 text-5xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  ✅
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

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
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.5, repeat: 3 }
            }}
          >
            <div className="text-9xl mb-4">🎉</div>
            <div className="text-6xl font-bold text-white" style={{
              textShadow: "0 4px 10px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Perfect! You counted {targetNumber}!
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Encouragement hint */}
      {count > 0 && count < targetNumber && !showSuccess && (
        <motion.div
          className="text-3xl font-bold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Great! Keep tapping! 🌟
        </motion.div>
      )}
    </div>
  );
}
