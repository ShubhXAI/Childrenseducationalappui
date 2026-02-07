import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, Star } from "lucide-react";

interface SubtractionQuizProps {
  onNavigate: (screen: string) => void;
}

export function SubtractionQuiz({ onNavigate }: SubtractionQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = { num1: 5, num2: 2, answer: 3 };
  const options = [2, 3, 4];

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === question.answer) {
      setTimeout(() => {
        onNavigate("dashboard");
      }, 2000);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{
      background: "linear-gradient(180deg, #FFE5E5 0%, #FFF4E0 100%)"
    }}>
      {/* Header */}
      <div className="p-4 flex items-center gap-4" style={{
        background: "rgba(255,255,255,0.8)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <motion.button
          onClick={() => onNavigate("addition")}
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
            background: "linear-gradient(145deg, #4A90E2 0%, #E74C3C 100%)",
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
              {question.num1} - {question.num2} = ?
            </span>
          </div>
        </motion.div>

        {/* Middle: Hammer smashing stars animation */}
        <div className="flex justify-center">
          <motion.div
            className="relative"
            style={{ width: "320px", height: "320px" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Glossy sphere stage */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              style={{
                width: "280px",
                height: "140px",
                background: "radial-gradient(ellipse at center, rgba(200,200,255,0.4) 0%, rgba(150,150,200,0.2) 100%)",
                borderRadius: "50%",
                boxShadow: `
                  0 15px 30px rgba(0,0,0,0.15),
                  inset 0 -8px 20px rgba(0,0,0,0.1)
                `,
                border: "3px solid rgba(200,200,255,0.3)",
              }}
            >
              {/* Remaining stars (3) - sitting firmly */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`remain-${i}`}
                  className="absolute"
                  style={{
                    width: "50px",
                    height: "50px",
                    top: "30px",
                    left: `${30 + i * 60}px`,
                  }}
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -5, 0],
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{
                    filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.2))"
                  }}>
                    <defs>
                      <linearGradient id={`star-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#FFD93D", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#F39C12", stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill={`url(#star-grad-${i})`}
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              ))}

              {/* Smashed stars (2) - shattering */}
              {[0, 1].map((i) => (
                <motion.div
                  key={`smash-${i}`}
                  className="absolute"
                  style={{
                    width: "50px",
                    height: "50px",
                    top: "30px",
                    left: `${220 + i * 30}px`,
                  }}
                  animate={{
                    y: [0, 80],
                    rotate: [0, 180],
                    opacity: [1, 0],
                    scale: [1, 0.3],
                    transition: { duration: 1.5, repeat: Infinity, ease: "easeIn", delay: i * 0.2 }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <defs>
                      <linearGradient id={`smash-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#FFD93D", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#F39C12", stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill={`url(#smash-grad-${i})`}
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              ))}
            </div>

            {/* Hammer - swinging down */}
            <motion.div
              className="absolute top-0 left-1/2"
              style={{
                transformOrigin: "top center",
              }}
              animate={{
                rotate: [0, -30, 0],
                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Hammer handle */}
              <div
                style={{
                  width: "20px",
                  height: "140px",
                  background: "linear-gradient(90deg, #8B4513 0%, #654321 100%)",
                  borderRadius: "10px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                  marginLeft: "-10px",
                }}
              />
              {/* Hammer head */}
              <div
                style={{
                  width: "80px",
                  height: "60px",
                  background: "linear-gradient(145deg, #FF8C42 0%, #FF6B35 100%)",
                  borderRadius: "15px",
                  boxShadow: `
                    0 12px 24px rgba(0,0,0,0.3),
                    inset 0 -4px 8px rgba(0,0,0,0.2),
                    inset 0 4px 8px rgba(255,255,255,0.3)
                  `,
                  border: "4px solid rgba(255,255,255,0.3)",
                  marginLeft: "-40px",
                  marginTop: "-10px",
                }}
              >
                {/* Shine on hammer */}
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "12px",
                    width: "30px",
                    height: "20px",
                    background: "radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </motion.div>
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
                    : "linear-gradient(145deg, #FE6B8B 0%, #FF8E53 100%)",
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
            {selectedAnswer === question.answer ? "🎉 Brilliant!" : "Try Again!"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
