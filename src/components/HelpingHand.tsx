import { motion } from "motion/react";
import { useState } from "react";
import { Giggles } from "./Giggles";
import { Sparkles } from "lucide-react";

interface HelpingHandProps {
  onNavigate: (screen: string) => void;
}

export function HelpingHand({ onNavigate }: HelpingHandProps) {
  const [step, setStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const question = { num1: 5, num2: 2, answer: 3 };

  // Tutorial steps with physical objects
  const tutorialSteps = [
    {
      title: "Let's count together!",
      subtitle: "First, let's see all 5 cookies",
      highlight: "start",
    },
    {
      title: "Now we take away 2 cookies",
      subtitle: "Watch them disappear!",
      highlight: "subtract",
    },
    {
      title: "How many are left?",
      subtitle: "Let's count: 1... 2... 3!",
      highlight: "result",
    },
  ];

  const currentStep = tutorialSteps[Math.min(step, tutorialSteps.length - 1)];

  const handleContinue = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      // Show answer selection
      setStep(tutorialSteps.length);
    }
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === question.answer) {
      setTimeout(() => {
        onNavigate("explore");
      }, 2000);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{
      background: "linear-gradient(135deg, #E8D5F2 0%, #D5E8F2 50%, #F2E8D5 100%)",
      animation: "gentlePulse 3s ease-in-out infinite",
    }}>
      {/* Soft purple glow overlay */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at center, rgba(155, 89, 182, 0.15) 0%, transparent 70%)",
        animation: "pulse 4s ease-in-out infinite",
      }} />

      {/* Main content container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-16 py-12">
        {/* Top: Giggles with pointer */}
        <motion.div
          className="flex items-center gap-8 mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Giggles size={150} animate={true} accessory="wave" />
          
          <div className="p-8" style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)",
            borderRadius: "40px",
            boxShadow: "0 20px 45px rgba(155, 89, 182, 0.3)",
            border: "6px solid rgba(255,255,255,0.8)",
            maxWidth: "600px",
          }}>
            <h2 className="text-5xl font-bold mb-3" style={{
              background: "linear-gradient(135deg, #9B59B6 0%, #E91E63 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {step < tutorialSteps.length ? currentStep.title : "Now you try!"}
            </h2>
            <p className="text-3xl text-gray-600">
              {step < tutorialSteps.length ? currentStep.subtitle : "Pick the right answer!"}
            </p>
          </div>
        </motion.div>

        {/* Middle: Interactive visual demonstration */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <motion.div
            className="relative p-12"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)",
              borderRadius: "50px",
              boxShadow: `
                0 25px 60px rgba(0,0,0,0.2),
                inset 0 -8px 20px rgba(0,0,0,0.05),
                inset 0 8px 20px rgba(255,255,255,0.6)
              `,
              border: "8px solid rgba(255,255,255,0.8)",
            }}
          >
            {/* Display cookies/objects */}
            <div className="flex items-center gap-6 mb-8">
              {Array.from({ length: 5 }, (_, i) => {
                const shouldHighlight = 
                  (step === 0 && currentStep.highlight === "start") ||
                  (step === 1 && i >= 3 && currentStep.highlight === "subtract") ||
                  (step === 2 && i < 3 && currentStep.highlight === "result");
                
                const shouldDisappear = step >= 1 && i >= 3;

                return (
                  <motion.div
                    key={i}
                    className="relative"
                    animate={shouldDisappear ? {
                      y: [0, -50, 100],
                      opacity: [1, 0.5, 0],
                      rotate: [0, 45, 90],
                      scale: [1, 0.8, 0.3],
                      transition: { duration: 1.5, delay: (i - 3) * 0.2 }
                    } : shouldHighlight ? {
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.8, repeat: Infinity }
                    } : {}}
                  >
                    {/* Cookie */}
                    <div
                      className="relative flex items-center justify-center text-5xl font-bold text-white"
                      style={{
                        width: "120px",
                        height: "120px",
                        background: "linear-gradient(145deg, #D2691E 0%, #8B4513 100%)",
                        borderRadius: "50%",
                        boxShadow: `
                          0 15px 35px rgba(0,0,0,0.2),
                          inset 0 -6px 15px rgba(0,0,0,0.3),
                          inset 0 6px 15px rgba(255,200,150,0.4)
                        `,
                        border: "5px solid rgba(139, 69, 19, 0.6)",
                      }}
                    >
                      {/* Chocolate chips */}
                      {[...Array(6)].map((_, chipIndex) => (
                        <div
                          key={chipIndex}
                          className="absolute"
                          style={{
                            width: "18px",
                            height: "18px",
                            background: "#3E2723",
                            borderRadius: "50%",
                            top: `${20 + Math.sin(chipIndex) * 35}%`,
                            left: `${30 + Math.cos(chipIndex) * 30}%`,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
                          }}
                        />
                      ))}
                    </div>

                    {/* Glowing pulse for highlighted items */}
                    {shouldHighlight && (
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          borderRadius: "50%",
                          border: "4px solid #FFD93D",
                          boxShadow: "0 0 30px #FFD93D",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 0, 0.8],
                          transition: { duration: 1.5, repeat: Infinity }
                        }}
                      />
                    )}

                    {/* Number label */}
                    <div
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-4xl font-bold"
                      style={{
                        color: shouldHighlight ? "#FFD93D" : "#666",
                        textShadow: shouldHighlight ? "0 0 20px #FFD93D" : "none",
                      }}
                    >
                      {i + 1}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Equation display with 3D subtitle */}
            <div className="text-center mt-16 p-6" style={{
              background: "linear-gradient(145deg, #9B59B6 0%, #8E44AD 100%)",
              borderRadius: "35px",
              boxShadow: `
                0 15px 35px rgba(155, 89, 182, 0.4),
                inset 0 -4px 10px rgba(0,0,0,0.2),
                inset 0 4px 10px rgba(255,255,255,0.3)
              `,
            }}>
              <div className="text-7xl font-bold text-white mb-2" style={{
                textShadow: "0 4px 12px rgba(0,0,0,0.3)"
              }}>
                {question.num1} - {question.num2} = {step >= 2 ? question.answer : "?"}
              </div>
              {step >= 2 && (
                <motion.p
                  className="text-3xl text-white/90"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {question.answer} cookies left!
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom: Continue button or answer selection */}
        {step < tutorialSteps.length ? (
          <motion.button
            onClick={handleContinue}
            className="px-16 py-8 text-white text-4xl font-bold tracking-wide flex items-center gap-4"
            style={{
              background: "linear-gradient(145deg, #7ED321 0%, #5FA019 100%)",
              borderRadius: "50px",
              boxShadow: `
                0 20px 45px rgba(126, 211, 33, 0.5),
                inset 0 -6px 15px rgba(0,0,0,0.2),
                inset 0 6px 15px rgba(255,255,255,0.4)
              `,
              border: "6px solid rgba(255,255,255,0.5)",
            }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Sparkles className="w-10 h-10" />
            Continue
            <Sparkles className="w-10 h-10" />
          </motion.button>
        ) : (
          <motion.div
            className="flex gap-12"
            initial={{ y: 30, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
          >
            {[2, 3, 4].map((option) => {
              const isCorrect = option === question.answer;
              const isSelected = selectedAnswer === option;
              
              return (
                <motion.button
                  key={option}
                  onClick={() => !selectedAnswer && handleAnswer(option)}
                  className="text-7xl font-bold text-white relative"
                  style={{
                    width: "180px",
                    height: "180px",
                    background: isSelected
                      ? isCorrect
                        ? "linear-gradient(145deg, #7ED321 0%, #5FA019 100%)"
                        : "linear-gradient(145deg, #E74C3C 0%, #C0392B 100%)"
                      : "linear-gradient(145deg, #FFD93D 0%, #F39C12 100%)",
                    borderRadius: "50%",
                    boxShadow: `
                      0 20px 45px rgba(0,0,0,0.25),
                      inset 0 -8px 18px rgba(0,0,0,0.25),
                      inset 0 8px 18px rgba(255,255,255,0.5)
                    `,
                    border: isSelected ? "8px solid white" : "7px solid rgba(255,255,255,0.5)",
                    textShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    cursor: selectedAnswer ? "default" : "pointer",
                  }}
                  whileHover={!selectedAnswer ? { scale: 1.15, y: -10 } : {}}
                  whileTap={!selectedAnswer ? { scale: 0.95 } : {}}
                  animate={isSelected && isCorrect ? {
                    scale: [1, 1.3, 1],
                    transition: { duration: 0.5, repeat: 5 }
                  } : {}}
                >
                  {option}
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Success message */}
        {selectedAnswer === question.answer && (
          <motion.div
            className="absolute bottom-12 text-6xl font-bold text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              color: "#7ED321",
              textShadow: "0 6px 20px rgba(126, 211, 33, 0.5)",
            }}
          >
            🎉 Perfect! You got it! 🎉
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes gentlePulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.05); }
        }
      `}</style>
    </div>
  );
}
