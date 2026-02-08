import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface TraceTheNumberProps {
  targetNumber: number;
  onComplete: (isCorrect: boolean) => void;
}

export function TraceTheNumber({ targetNumber, onComplete }: TraceTheNumberProps) {
  const [isTracing, setIsTracing] = useState(false);
  const [traceProgress, setTraceProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsTracing(false);
    setTraceProgress(0);
    setShowSuccess(false);
  }, [targetNumber]);

  const handleInteractionStart = () => {
    setIsTracing(true);
  };

  const handleInteractionMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isTracing) return;
    
    setTraceProgress(prev => {
      const newProgress = Math.min(prev + 2, 100);
      if (newProgress >= 100 && !showSuccess) {
        setShowSuccess(true);
        setTimeout(() => {
          onComplete(true);
        }, 1500);
      }
      return newProgress;
    });
  };

  const handleInteractionEnd = () => {
    setIsTracing(false);
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center gap-16 p-8"
      onMouseMove={handleInteractionMove}
      onTouchMove={handleInteractionMove}
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
    >
      {/* Instructions */}
      <motion.div
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="inline-block px-12 py-8 bg-white rounded-3xl shadow-lg">
          <p className="text-5xl font-bold text-gray-700">
            Trace number {targetNumber} with your finger! ✍️
          </p>
        </div>
      </motion.div>

      {/* Number to trace */}
      <motion.div
        className="relative cursor-pointer select-none"
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        style={{
          width: "500px",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Background outline */}
        <div
          style={{
            position: "absolute",
            fontSize: "28rem",
            fontWeight: "bold",
            color: traceProgress >= 100 ? "#7ED321" : "#E0E0E0",
            textShadow: "0 8px 20px rgba(0,0,0,0.1)",
            transition: "color 0.3s ease",
            WebkitTextStroke: "8px #BDBDBD",
            WebkitTextFillColor: "transparent"
          }}
        >
          {targetNumber}
        </div>

        {/* Traced portion */}
        <motion.div
          style={{
            position: "absolute",
            fontSize: "28rem",
            fontWeight: "bold",
            background: "linear-gradient(145deg, #FFD93D 0%, #7ED321 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            clipPath: `inset(${100 - traceProgress}% 0 0 0)`,
            transition: "clip-path 0.1s ease"
          }}
        >
          {targetNumber}
        </motion.div>

        {/* Sparkle effect while tracing */}
        {isTracing && traceProgress < 100 && (
          <motion.div
            className="absolute pointer-events-none text-7xl"
            animate={{
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity
            }}
          >
            ✨
          </motion.div>
        )}

        {/* Checkmark when complete */}
        {traceProgress >= 100 && (
          <motion.div
            className="absolute text-9xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12 }}
          >
            ✅
          </motion.div>
        )}
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-96 h-8 rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #F0F0F0 0%, #E0E0E0 100%)",
          border: "4px solid rgba(255,255,255,0.8)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #FFD93D 0%, #7ED321 100%)",
            width: `${traceProgress}%`,
            transition: "width 0.1s ease"
          }}
        />
      </motion.div>

      {/* Instruction hint */}
      {traceProgress === 0 && (
        <motion.div
          className="text-3xl font-bold text-gray-600"
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          👆 Click and drag over the number! 
        </motion.div>
      )}

      {traceProgress > 0 && traceProgress < 100 && (
        <motion.div
          className="text-3xl font-bold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Keep going! {Math.floor(traceProgress)}% 🌟
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
              transition: { duration: 0.5, repeat: 2 }
            }}
          >
            <div className="text-9xl mb-6">🎉✨🌟</div>
            <div className="text-7xl font-bold text-white" style={{
              textShadow: "0 6px 15px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Perfect! You traced {targetNumber}! 🏆
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
