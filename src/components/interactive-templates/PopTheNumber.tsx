import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface PopTheNumberProps {
  targetNumber: number;
  numberOptions: number[];
  onComplete: (isCorrect: boolean) => void;
}

export function PopTheNumber({ targetNumber, numberOptions, onComplete }: PopTheNumberProps) {
  const [poppedNumber, setPoppedNumber] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bounceNumber, setBounceNumber] = useState<number | null>(null);

  useEffect(() => {
    setPoppedNumber(null);
    setShowSuccess(false);
    setBounceNumber(null);
  }, [targetNumber]);

  const handlePop = (number: number) => {
    if (poppedNumber !== null) return;

    if (number === targetNumber) {
      setPoppedNumber(number);
      setShowSuccess(true);
      
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
      // Wrong pop - bounce back
      setBounceNumber(number);
      setTimeout(() => {
        setBounceNumber(null);
      }, 1000);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-16 p-8">
      {/* Instructions */}
      <motion.div
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="inline-block px-12 py-8 bg-white rounded-3xl shadow-lg">
          <p className="text-5xl font-bold text-gray-700">
            Pop number {targetNumber}! 🎈
          </p>
        </div>
      </motion.div>

      {/* Balloons */}
      <div className="flex gap-12">
        {numberOptions.map((num, index) => {
          const isPopped = poppedNumber === num;
          const shouldBounce = bounceNumber === num;

          return (
            <motion.button
              key={num}
              onClick={() => !isPopped && handlePop(num)}
              className="relative"
              style={{
                cursor: isPopped ? "default" : "pointer"
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={
                isPopped
                  ? { scale: 0, opacity: 0 }
                  : shouldBounce
                  ? { 
                      x: [-15, 15, -10, 10, -5, 5, 0],
                      rotate: [-10, 10, -8, 8, -5, 5, 0],
                      transition: { duration: 0.6 }
                    }
                  : { 
                      y: [0, -15, 0],
                      opacity: 1,
                      transition: { 
                        y: { duration: 2, repeat: Infinity, delay: index * 0.3 },
                        opacity: { duration: 0.5 }
                      }
                    }
              }
              whileHover={!isPopped ? { scale: 1.1, y: -20 } : {}}
              whileTap={!isPopped ? { scale: 0.95 } : {}}
            >
              {/* Balloon */}
              {!isPopped && (
                <>
                  <div
                    style={{
                      width: "180px",
                      height: "220px",
                      background: `linear-gradient(145deg, ${
                        ["#FF6B6B", "#4A90E2", "#FFD93D", "#FF6EC7"][index % 4]
                      } 0%, ${
                        ["#FE8C5B", "#5FC3E4", "#FFA500", "#FE6B8B"][index % 4]
                      } 100%)`,
                      borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                      boxShadow: `
                        0 15px 35px rgba(0,0,0,0.25),
                        inset -8px -15px 25px rgba(0,0,0,0.15),
                        inset 8px 15px 25px rgba(255,255,255,0.4)
                      `,
                      border: "6px solid rgba(255,255,255,0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "6rem",
                      fontWeight: "bold",
                      color: "white",
                      textShadow: "0 4px 10px rgba(0,0,0,0.3)",
                      position: "relative"
                    }}
                  >
                    {num}
                    
                    {/* Shine effect */}
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        top: "30px",
                        left: "30px",
                        width: "60px",
                        height: "60px",
                        background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
                        borderRadius: "50%"
                      }}
                    />
                  </div>
                  
                  {/* String */}
                  <div
                    style={{
                      width: "3px",
                      height: "80px",
                      background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
                      margin: "0 auto"
                    }}
                  />
                </>
              )}

              {/* Pop effect */}
              {isPopped && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-8xl">💥</div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Encouragement */}
      {bounceNumber !== null && (
        <motion.div
          className="text-4xl font-bold text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Oops! Try another balloon! 🎈
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
            <div className="text-9xl mb-6">🎉💥🎈</div>
            <div className="text-7xl font-bold text-white" style={{
              textShadow: "0 6px 15px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Perfect Pop! You found {targetNumber}! 🏆
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
