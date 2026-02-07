import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, Star } from "lucide-react";
import { AvatarGuide } from "./AvatarGuide";

interface QuestionScreenProps {
  onNavigate: (screen: string) => void;
}

export function QuestionScreen({ onNavigate }: QuestionScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const question = { num1: 5, num2: 2, answer: 3 };
  const options = [2, 3, 4];

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === question.answer) {
      setTimeout(() => {
        onNavigate("explore");
      }, 2000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 2) {
        setTimeout(() => {
          onNavigate("helping");
        }, 1500);
      } else {
        setTimeout(() => {
          setShowFeedback(false);
          setSelectedAnswer(null);
        }, 1500);
      }
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #FFE5E5 0%, #FFF4E0 50%, #E8F5E9 100%)"
    }}>
      {/* Avatar Guide - only show before any attempt */}
      {attempts === 0 && !showFeedback && (
        <AvatarGuide
          message="Read the question carefully! Count with your fingers if you need help! 🤓"
          suggestions={[
            { text: "💡 Give me a hint", action: () => onNavigate("helping") },
            { text: "🔙 Go back", action: () => onNavigate("explore") },
          ]}
          position="right"
        />
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 flex items-center justify-between" style={{
        background: "rgba(255,255,255,0.9)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
      }}>
        <div className="flex items-center gap-6">
          <motion.button
            onClick={() => onNavigate("explore")}
            className="p-4 text-white"
            style={{
              background: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
              borderRadius: "50%",
              boxShadow: "0 8px 20px rgba(74, 144, 226, 0.4)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>
          <h2 className="text-3xl font-bold text-gray-700">Level 8</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-10 h-10 fill-yellow-400 text-yellow-500"
            />
          ))}
        </div>
      </div>

      {/* Three horizontal zones */}
      <div className="w-full h-full pt-32 pb-8 flex flex-col justify-between px-12">
        {/* TOP ZONE: Question in 3D bubble blocks */}
        <motion.div
          className="flex justify-center items-center"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-8 px-16 py-10" style={{
            background: "linear-gradient(145deg, #4A90E2 0%, #E74C3C 100%)",
            borderRadius: "50px",
            boxShadow: `
              0 25px 50px rgba(0,0,0,0.25),
              inset 0 -8px 20px rgba(0,0,0,0.18),
              inset 0 8px 20px rgba(255,255,255,0.5)
            `,
            border: "8px solid rgba(255,255,255,0.5)",
          }}>
            {/* Individual number blocks */}
            <span className="text-9xl font-bold text-white" style={{
              textShadow: "0 6px 18px rgba(0,0,0,0.4)"
            }}>
              {question.num1}
            </span>
            <span className="text-9xl font-bold text-white" style={{
              textShadow: "0 6px 18px rgba(0,0,0,0.4)"
            }}>
              -
            </span>
            <span className="text-9xl font-bold text-white" style={{
              textShadow: "0 6px 18px rgba(0,0,0,0.4)"
            }}>
              {question.num2}
            </span>
            <span className="text-9xl font-bold text-white" style={{
              textShadow: "0 6px 18px rgba(0,0,0,0.4)"
            }}>
              =
            </span>
            <span className="text-9xl font-bold text-white" style={{
              textShadow: "0 6px 18px rgba(0,0,0,0.4)"
            }}>
              ?
            </span>
          </div>
        </motion.div>

        {/* MIDDLE ZONE: Interactive animation - Hammer smashing stars */}
        <motion.div
          className="flex justify-center items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative" style={{ width: "600px", height: "400px" }}>
            {/* Glossy sphere stage */}
            <div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              style={{
                width: "550px",
                height: "220px",
                background: "radial-gradient(ellipse at center, rgba(200,200,255,0.5) 0%, rgba(150,150,200,0.25) 100%)",
                borderRadius: "50%",
                boxShadow: `
                  0 20px 40px rgba(0,0,0,0.2),
                  inset 0 -12px 30px rgba(0,0,0,0.12)
                `,
                border: "4px solid rgba(200,200,255,0.4)",
              }}
            >
              {/* Remaining stars (3) */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`remain-${i}`}
                  className="absolute"
                  style={{
                    width: "80px",
                    height: "80px",
                    top: "40px",
                    left: `${80 + i * 110}px`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{
                    filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.25))"
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
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </motion.div>
              ))}

              {/* Smashed stars (2) - shattering and falling */}
              {[0, 1].map((i) => (
                <motion.div
                  key={`smash-${i}`}
                  className="absolute"
                  style={{
                    width: "80px",
                    height: "80px",
                    top: "40px",
                    left: `${400 + i * 50}px`,
                  }}
                  animate={{
                    y: [0, 150],
                    rotate: [0, 270],
                    opacity: [1, 0],
                    scale: [1, 0.2],
                    transition: { duration: 2, repeat: Infinity, ease: "easeIn", delay: i * 0.25 }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FFD93D"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1.5"
                      opacity="0.7"
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
                marginLeft: "80px",
              }}
              animate={{
                rotate: [0, -35, 0],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Hammer handle */}
              <div
                style={{
                  width: "30px",
                  height: "200px",
                  background: "linear-gradient(90deg, #8B4513 0%, #654321 100%)",
                  borderRadius: "15px",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
                  marginLeft: "-15px",
                }}
              />
              {/* Hammer head */}
              <div
                style={{
                  width: "120px",
                  height: "90px",
                  background: "linear-gradient(145deg, #FF8C42 0%, #FF6B35 100%)",
                  borderRadius: "20px",
                  boxShadow: `
                    0 18px 36px rgba(0,0,0,0.35),
                    inset 0 -6px 12px rgba(0,0,0,0.25),
                    inset 0 6px 12px rgba(255,255,255,0.4)
                  `,
                  border: "5px solid rgba(255,255,255,0.4)",
                  marginLeft: "-60px",
                  marginTop: "-15px",
                  position: "relative",
                }}
              >
                {/* Shine on hammer */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "18px",
                    width: "45px",
                    height: "30px",
                    background: "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* BOTTOM ZONE: Answer selection buttons */}
        <motion.div
          className="flex justify-center items-center gap-12"
          initial={{ y: 40, opacity: 0 }}
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
                className="text-7xl font-bold text-white relative"
                style={{
                  width: "180px",
                  height: "180px",
                  background: showFeedback && isSelected
                    ? isCorrect
                      ? "linear-gradient(145deg, #7ED321 0%, #5FA019 100%)"
                      : "linear-gradient(145deg, #E74C3C 0%, #C0392B 100%)"
                    : isSelected
                    ? "linear-gradient(145deg, #FFD93D 0%, #F39C12 100%)"
                    : "linear-gradient(145deg, #FE6B8B 0%, #FF8E53 100%)",
                  borderRadius: "50%",
                  boxShadow: `
                    0 20px 45px rgba(0,0,0,0.25),
                    inset 0 -8px 18px rgba(0,0,0,0.25),
                    inset 0 8px 18px rgba(255,255,255,0.5)
                  `,
                  border: isSelected ? "8px solid white" : "7px solid rgba(255,255,255,0.5)",
                  textShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  cursor: showFeedback ? "default" : "pointer",
                }}
                whileHover={!showFeedback ? { scale: 1.12, y: -8 } : {}}
                whileTap={!showFeedback ? { scale: 0.95 } : {}}
                animate={showFeedback && isSelected && isCorrect ? {
                  scale: [1, 1.25, 1],
                  transition: { duration: 0.5, repeat: 4 }
                } : {}}
              >
                {option}
                
                {/* Shine effect */}
                <div
                  className="absolute top-6 left-6 pointer-events-none"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feedback message */}
        {showFeedback && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-6xl font-bold px-12 py-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              color: selectedAnswer === question.answer ? "#7ED321" : "#E74C3C",
              textShadow: "0 6px 15px rgba(0,0,0,0.3)",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "40px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
            }}
          >
            {selectedAnswer === question.answer ? "🎉 Amazing!" : attempts >= 1 ? "Let me help! 💡" : "Try Again! 💪"}
          </motion.div>
        )}
      </div>
    </div>
  );
}