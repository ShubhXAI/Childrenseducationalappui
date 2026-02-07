import { motion } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";

interface AvatarGuideProps {
  message: string;
  suggestions?: { text: string; action: () => void }[];
  position?: "left" | "right" | "float";
}

export function AvatarGuide({ message, suggestions = [], position = "float" }: AvatarGuideProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Default positions based on prop
  const defaultPositions = {
    left: { x: 40, y: 120 },
    right: { x: typeof window !== 'undefined' ? window.innerWidth - 380 : 1000, y: 120 },
    float: { x: 80, y: 150 }
  };

  return (
    <motion.div
      className="fixed z-50"
      drag={position === "float"}
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={defaultPositions[position]}
      whileHover={position === "float" ? { scale: 1.02 } : {}}
      style={{
        cursor: position === "float" ? (isDragging ? "grabbing" : "grab") : "default",
        touchAction: "none",
      }}
    >
      {isMinimized ? (
        // Minimized state - just Buddy's head
        <motion.button
          onClick={() => setIsMinimized(false)}
          className="relative"
          style={{
            width: "100px",
            height: "100px",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
            transition: { duration: 2, repeat: Infinity }
          }}
        >
          {/* Buddy Robot - minimized */}
          <div
            className="relative w-full h-full"
            style={{
              background: "linear-gradient(145deg, #FF6EC7 0%, #FF8ED5 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: `
                0 12px 30px rgba(255, 110, 199, 0.5),
                inset 0 -4px 10px rgba(0,0,0,0.15),
                inset 0 4px 10px rgba(255,255,255,0.5)
              `,
              border: "5px solid rgba(255,255,255,0.6)",
            }}
          >
            {/* Eyes */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-2">
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  background: "#2C3E50",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  background: "#2C3E50",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            </div>
            {/* Antenna */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2"
              style={{
                width: "4px",
                height: "20px",
                background: "#4ECDC4",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "12px",
                  height: "12px",
                  background: "#FFD93D",
                  borderRadius: "50%",
                  boxShadow: "0 2px 8px rgba(255, 217, 61, 0.6)",
                }}
              />
            </div>
          </div>
          {/* Notification badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{
              boxShadow: "0 4px 10px rgba(239, 68, 68, 0.5)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              transition: { duration: 1, repeat: Infinity }
            }}
          >
            !
          </motion.div>
        </motion.button>
      ) : (
        // Expanded state - full Buddy with speech bubble
        <div className="relative flex items-start gap-4">
          {/* Buddy Robot Character */}
          <motion.div
            className="relative flex-shrink-0"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
              transition: { duration: 3, repeat: Infinity }
            }}
          >
            {/* Robot body */}
            <div className="relative flex flex-col items-center">
              {/* Head */}
              <div
                className="relative"
                style={{
                  width: "90px",
                  height: "90px",
                  background: "linear-gradient(145deg, #FF6EC7 0%, #FF8ED5 100%)",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  boxShadow: `
                    0 15px 35px rgba(255, 110, 199, 0.5),
                    inset 0 -5px 12px rgba(0,0,0,0.15),
                    inset 0 5px 12px rgba(255,255,255,0.5)
                  `,
                  border: "6px solid rgba(255,255,255,0.6)",
                }}
              >
                {/* Antenna */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                  style={{
                    width: "6px",
                    height: "28px",
                    background: "#4ECDC4",
                    borderRadius: "3px",
                    boxShadow: "0 2px 6px rgba(78, 205, 196, 0.4)",
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "18px",
                      height: "18px",
                      background: "#FFD93D",
                      borderRadius: "50%",
                      boxShadow: "0 4px 12px rgba(255, 217, 61, 0.7)",
                      border: "3px solid rgba(255,255,255,0.8)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 4px 12px rgba(255, 217, 61, 0.7)",
                        "0 6px 20px rgba(255, 217, 61, 1)",
                        "0 4px 12px rgba(255, 217, 61, 0.7)",
                      ],
                      transition: { duration: 2, repeat: Infinity }
                    }}
                  />
                </div>

                {/* Eyes */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-3">
                  <motion.div
                    style={{
                      width: "22px",
                      height: "22px",
                      background: "#2C3E50",
                      borderRadius: "50%",
                      border: "3px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                    animate={{
                      scaleY: [1, 0.1, 1],
                      transition: { duration: 3, repeat: Infinity, repeatDelay: 2 }
                    }}
                  />
                  <motion.div
                    style={{
                      width: "22px",
                      height: "22px",
                      background: "#2C3E50",
                      borderRadius: "50%",
                      border: "3px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                    animate={{
                      scaleY: [1, 0.1, 1],
                      transition: { duration: 3, repeat: Infinity, repeatDelay: 2 }
                    }}
                  />
                </div>

                {/* Smile */}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2"
                  style={{
                    width: "40px",
                    height: "12px",
                    borderRadius: "0 0 20px 20px",
                    border: "3px solid #2C3E50",
                    borderTop: "none",
                  }}
                />
              </div>

              {/* Body */}
              <div
                style={{
                  width: "70px",
                  height: "50px",
                  background: "linear-gradient(145deg, #4ECDC4 0%, #45B7AA 100%)",
                  borderRadius: "15px",
                  marginTop: "-8px",
                  boxShadow: `
                    0 12px 28px rgba(78, 205, 196, 0.4),
                    inset 0 -4px 10px rgba(0,0,0,0.15),
                    inset 0 4px 10px rgba(255,255,255,0.4)
                  `,
                  border: "5px solid rgba(255,255,255,0.5)",
                }}
              >
                {/* Control panel */}
                <div className="flex justify-center gap-1 pt-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                </div>
              </div>

              {/* Floating sparkles */}
              <motion.div
                className="absolute -top-2 -left-6 text-2xl"
                animate={{
                  y: [-3, -10, -3],
                  opacity: [0.6, 1, 0.6],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                ✨
              </motion.div>
            </div>
          </motion.div>

          {/* Speech Bubble */}
          <motion.div
            className="relative max-w-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
          >
            <div
              className="relative px-8 py-6"
              style={{
                background: "linear-gradient(145deg, #FFFFFF 0%, #FFFEF8 100%)",
                borderRadius: "35px",
                boxShadow: `
                  0 18px 40px rgba(0,0,0,0.2),
                  inset 0 -4px 10px rgba(0,0,0,0.03),
                  inset 0 4px 10px rgba(255,255,255,1)
                `,
                border: "6px solid rgba(255,255,255,0.9)",
              }}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setIsMinimized(true)}
                className="absolute -top-3 -right-3 p-2 text-white"
                style={{
                  background: "linear-gradient(145deg, #FF6B6B 0%, #E74C3C 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 6px 15px rgba(255, 107, 107, 0.5)",
                  border: "3px solid white",
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Message */}
              <p className="text-xl font-bold text-gray-800 mb-4" style={{
                lineHeight: "1.5",
              }}>
                {message}
              </p>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="flex flex-col gap-3">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={suggestion.action}
                      className="px-6 py-3 text-lg font-bold text-white text-left"
                      style={{
                        background: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
                        borderRadius: "25px",
                        boxShadow: `
                          0 8px 20px rgba(74, 144, 226, 0.4),
                          inset 0 -3px 8px rgba(0,0,0,0.15),
                          inset 0 3px 8px rgba(255,255,255,0.4)
                        `,
                        border: "4px solid rgba(255,255,255,0.5)",
                      }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {suggestion.text}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Speech bubble pointer */}
              <div
                style={{
                  position: "absolute",
                  left: "-18px",
                  top: "30px",
                  width: "0",
                  height: "0",
                  borderTop: "15px solid transparent",
                  borderBottom: "15px solid transparent",
                  borderRight: "20px solid #FFFEF8",
                  filter: "drop-shadow(-2px 0 3px rgba(0,0,0,0.1))",
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
