import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, Star } from "lucide-react";

interface AdditionQuizProps {
  onNavigate: (screen: string) => void;
}

export function AdditionQuiz({ onNavigate }: AdditionQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = { num1: 2, num2: 2, answer: 4 };
  const options = [3, 4, 5];

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === question.answer) {
      setTimeout(() => {
        onNavigate("subtraction");
      }, 2000);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{
      background: "linear-gradient(180deg, #E3F2FD 0%, #FFF9C4 100%)"
    }}>
      {/* Header */}
      <div className="p-4 flex items-center gap-4" style={{
        background: "rgba(255,255,255,0.8)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <motion.button
          onClick={() => onNavigate("roadmap")}
          className="p-3 text-white"
          style={{
            background: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
            borderRadius: "50%",
            boxShadow: "0 6px 15px rgba(74, 144, 226, 0.3)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <div className="flex-1 flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-8 h-8 fill-yellow-400 text-yellow-500"
            />
          ))}
        </div>
      </div>

      {/* Question section */}
      <div className="flex-1 flex flex-col justify-around p-6 max-w-2xl mx-auto w-full">
        {/* Top: Question */}
        <motion.div
          className="text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="inline-flex items-center gap-4 p-8" style={{
            background: "linear-gradient(145deg, #7ED321 0%, #4A90E2 100%)",
            borderRadius: "40px",
            boxShadow: `
              0 20px 40px rgba(0,0,0,0.2),
              inset 0 -6px 15px rgba(0,0,0,0.15),
              inset 0 6px 15px rgba(255,255,255,0.4)
            `,
            border: "6px solid rgba(255,255,255,0.4)",
          }}>
            <span className="text-7xl font-bold text-white" style={{
              textShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}>
              {question.num1} + {question.num2} = ?
            </span>
          </div>
        </motion.div>

        {/* Middle: Animated gumball machine */}
        <div className="flex justify-center">
          <motion.div
            className="relative"
            style={{ width: "280px", height: "320px" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Gumball machine glass dome */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: "220px",
                height: "220px",
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(173,216,230,0.2) 100%)",
                borderRadius: "50%",
                border: "8px solid rgba(100,150,200,0.3)",
                boxShadow: `
                  0 20px 40px rgba(0,0,0,0.15),
                  inset -10px -10px 30px rgba(0,0,0,0.1),
                  inset 10px 10px 30px rgba(255,255,255,0.5)
                `,
              }}
            >
              {/* Red gumballs (2) */}
              <motion.div
                className="absolute"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "radial-gradient(circle at 35% 35%, #FF6B6B 0%, #C0392B 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.4)",
                  top: "40px",
                  left: "30px",
                }}
                animate={{
                  y: [0, -10, 0],
                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "radial-gradient(circle at 35% 35%, #FF6B6B 0%, #C0392B 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.4)",
                  top: "80px",
                  left: "60px",
                }}
                animate={{
                  y: [0, -8, 0],
                  transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
                }}
              />

              {/* Blue gumballs (2) */}
              <motion.div
                className="absolute"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "radial-gradient(circle at 35% 35%, #4A90E2 0%, #2E5C8A 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.4)",
                  top: "100px",
                  left: "20px",
                }}
                animate={{
                  y: [0, -12, 0],
                  transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "radial-gradient(circle at 35% 35%, #4A90E2 0%, #2E5C8A 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.4)",
                  top: "50px",
                  left: "120px",
                }}
                animate={{
                  y: [0, -9, 0],
                  transition: { duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.9 }
                }}
              />
            </div>

            {/* Machine base */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                width: "180px",
                height: "120px",
                background: "linear-gradient(145deg, #E74C3C 0%, #C0392B 100%)",
                borderRadius: "30px",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                border: "6px solid rgba(255,255,255,0.3)",
              }}
            >
              {/* Coin slot */}
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2"
                style={{
                  width: "60px",
                  height: "8px",
                  background: "#2C3E50",
                  borderRadius: "4px",
                }}
              />
              {/* Dispensing knob */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "radial-gradient(circle, #FFD93D 0%, #F39C12 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  border: "4px solid rgba(255,255,255,0.4)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom: Answer options */}
        <motion.div
          className="flex justify-center gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {options.map((option) => {
            const isCorrect = option === question.answer;
            const isSelected = selectedAnswer === option;
            
            return (
              <motion.button
                key={option}
                onClick={() => !showFeedback && handleAnswer(option)}
                className="text-5xl font-bold text-white"
                style={{
                  width: "120px",
                  height: "120px",
                  background: showFeedback && isSelected
                    ? isCorrect
                      ? "linear-gradient(145deg, #7ED321 0%, #5FA019 100%)"
                      : "linear-gradient(145deg, #E74C3C 0%, #C0392B 100%)"
                    : isSelected
                    ? "linear-gradient(145deg, #FFD93D 0%, #F39C12 100%)"
                    : "linear-gradient(145deg, #FF8E53 0%, #FE6B8B 100%)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 15px 30px rgba(0,0,0,0.2),
                    inset 0 -6px 12px rgba(0,0,0,0.2),
                    inset 0 6px 12px rgba(255,255,255,0.4)
                  `,
                  border: isSelected ? "6px solid white" : "5px solid rgba(255,255,255,0.4)",
                  textShadow: "0 3px 8px rgba(0,0,0,0.3)",
                  cursor: showFeedback ? "default" : "pointer",
                }}
                whileHover={!showFeedback ? { scale: 1.1 } : {}}
                whileTap={!showFeedback ? { scale: 0.95 } : {}}
                animate={showFeedback && isSelected && isCorrect ? {
                  scale: [1, 1.2, 1],
                  transition: { duration: 0.5, repeat: 3 }
                } : {}}
              >
                {option}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feedback message */}
        {showFeedback && (
          <motion.div
            className="text-center text-4xl font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              color: selectedAnswer === question.answer ? "#7ED321" : "#E74C3C",
              textShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
          >
            {selectedAnswer === question.answer ? "🎉 Amazing!" : "Try Again!"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
