import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface ShapeChoiceProps {
  question: string;
  correctShape: "circle" | "square" | "triangle" | "rectangle";
  onComplete: (isCorrect: boolean) => void;
}

const shapeComponents = {
  circle: (color: string, size: number = 120) => (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: color,
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        border: "4px solid rgba(255,255,255,0.8)"
      }}
    />
  ),
  square: (color: string, size: number = 120) => (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "15px",
        background: color,
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        border: "4px solid rgba(255,255,255,0.8)"
      }}
    />
  ),
  triangle: (color: string, size: number = 120) => (
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: `${size/2}px solid transparent`,
        borderRight: `${size/2}px solid transparent`,
        borderBottom: `${size * 0.87}px solid ${color}`,
        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.2))"
      }}
    />
  ),
  rectangle: (color: string, size: number = 120) => (
    <div
      style={{
        width: `${size * 1.6}px`,
        height: `${size}px`,
        borderRadius: "15px",
        background: color,
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        border: "4px solid rgba(255,255,255,0.8)"
      }}
    />
  )
};

const shapeColors = ["#FF6B6B", "#4A90E2", "#FFD93D"];
const allShapes: Array<"circle" | "square" | "triangle" | "rectangle"> = ["circle", "square", "triangle", "rectangle"];

export function ShapeChoice({ question, correctShape, onComplete }: ShapeChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [options, setOptions] = useState<Array<"circle" | "square" | "triangle" | "rectangle">>([]);

  // Generate 3 shape options including the correct one
  const generateOptions = () => {
    const opts = [correctShape];
    const otherShapes = allShapes.filter(s => s !== correctShape);
    
    // Shuffle and pick 2 more
    const shuffled = otherShapes.sort(() => Math.random() - 0.5);
    opts.push(...shuffled.slice(0, 2));
    
    // Shuffle final options
    return opts.sort(() => Math.random() - 0.5);
  };

  // Reset and regenerate options when question changes
  useEffect(() => {
    setSelected(null);
    setShowFeedback(false);
    setOptions(generateOptions());
  }, [question, correctShape]);

  const handleSelect = (shape: string) => {
    setSelected(shape);
    setShowFeedback(true);

    const isCorrect = shape === correctShape;
    
    if (isCorrect) {
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
      // Let them try again
      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
      }, 1500);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-16 p-8">
      {/* Question */}
      <motion.div
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="inline-block px-12 py-8 bg-white rounded-3xl shadow-lg">
          <p className="text-5xl font-bold text-gray-700">
            {question}
          </p>
        </div>
      </motion.div>

      {/* Shape options */}
      <div className="flex gap-12">
        {options.map((shape, index) => {
          const isCorrect = shape === correctShape;
          const isSelected = selected === shape;

          return (
            <motion.button
              key={shape}
              onClick={() => !showFeedback && handleSelect(shape)}
              className="relative flex items-center justify-center"
              style={{
                width: "280px",
                height: "280px",
                background: showFeedback && isSelected
                  ? isCorrect
                    ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
                    : "linear-gradient(145deg, #FFB6C1 0%, #FFA0B4 100%)"
                  : "linear-gradient(145deg, #FFE66D 0%, #FFD93D 100%)",
                borderRadius: "40px",
                boxShadow: `
                  0 20px 50px rgba(0,0,0,0.25),
                  inset 0 -8px 20px rgba(0,0,0,0.15),
                  inset 0 8px 20px rgba(255,255,255,0.5)
                `,
                border: isSelected ? "10px solid white" : "8px solid rgba(255,255,255,0.6)",
                cursor: showFeedback ? "default" : "pointer",
                transition: "all 0.3s ease"
              }}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.15, type: "spring", damping: 12 }}
              whileHover={!showFeedback ? { scale: 1.08, y: -10 } : {}}
              whileTap={!showFeedback ? { scale: 0.96 } : {}}
            >
              {shapeComponents[shape as keyof typeof shapeComponents](shapeColors[index], 140)}

              {showFeedback && isSelected && (
                <motion.div
                  className="absolute -top-6 -right-6 text-7xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  {isCorrect ? "✅" : "❌"}
                </motion.div>
              )}

              {/* Shape label */}
              <div
                className="absolute bottom-4 text-2xl font-bold text-white"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}
              >
                {shape.charAt(0).toUpperCase() + shape.slice(1)}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Success celebration */}
      {showFeedback && selected === correctShape && (
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
              transition: { duration: 0.5, repeat: 3 }
            }}
          >
            <div className="text-9xl mb-6">🎉✨</div>
            <div className="text-7xl font-bold text-white" style={{
              textShadow: "0 6px 15px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Perfect! That's a {correctShape}! 🌟
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Gentle encouragement */}
      {showFeedback && selected !== correctShape && (
        <motion.div
          className="text-4xl font-bold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Try another shape! You're doing great! 😊
        </motion.div>
      )}
    </div>
  );
}