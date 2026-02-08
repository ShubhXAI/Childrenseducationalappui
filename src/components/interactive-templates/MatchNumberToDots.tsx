import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface MatchNumberToDotsProps {
  dotCount: number;
  numberOptions: number[];
  onComplete: (isCorrect: boolean) => void;
}

function DraggableNumber({ number, isMatched }: { number: number; isMatched: boolean }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'number',
    item: { number },
    canDrag: !isMatched,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (isMatched) return null;

  return (
    <motion.div
      ref={drag as any}
      className="cursor-grab active:cursor-grabbing"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      whileHover={{ scale: 1.15, y: -10 }}
      animate={{
        y: [0, -10, 0],
        transition: { duration: 2, repeat: Infinity, delay: Math.random() }
      }}
    >
      <div
        style={{
          width: "160px",
          height: "160px",
          background: "linear-gradient(145deg, #FFD93D 0%, #FFA500 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "5rem",
          fontWeight: "bold",
          color: "white",
          textShadow: "0 4px 10px rgba(0,0,0,0.3)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          border: "6px solid rgba(255,255,255,0.8)"
        }}
      >
        {number}
      </div>
    </motion.div>
  );
}

interface MatchNumberToDotsContentProps {
  dotCount: number;
  numberOptions: number[];
  onComplete: (isCorrect: boolean) => void;
}

function MatchNumberToDotsContent({ dotCount, numberOptions, onComplete }: MatchNumberToDotsContentProps) {
  const [isMatched, setIsMatched] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [matchedNumber, setMatchedNumber] = useState<number | null>(null);

  useEffect(() => {
    setIsMatched(false);
    setShowSuccess(false);
    setWrongAttempt(false);
    setMatchedNumber(null);
  }, [dotCount]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'number',
    drop: (item: { number: number }) => {
      if (item.number === dotCount) {
        setIsMatched(true);
        setShowSuccess(true);
        setMatchedNumber(item.number);
        
        setTimeout(() => {
          onComplete(true);
        }, 2000);
      } else {
        setWrongAttempt(true);
        setTimeout(() => {
          setWrongAttempt(false);
        }, 1500);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

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
            Which number matches these dots? 🎯
          </p>
        </div>
      </motion.div>

      <div className="flex items-center gap-24">
        {/* Dots display */}
        <motion.div
          className="flex flex-wrap gap-6 p-12 rounded-3xl"
          style={{
            background: "linear-gradient(145deg, #E3F2FD 0%, #BBDEFB 100%)",
            border: "8px solid rgba(255,255,255,0.6)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            maxWidth: "400px"
          }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {Array.from({ length: dotCount }).map((_, i) => (
            <motion.div
              key={i}
              className="w-16 h-16 rounded-full"
              style={{
                background: "linear-gradient(145deg, #4A90E2 0%, #5FC3E4 100%)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15, type: "spring", damping: 12 }}
            />
          ))}
        </motion.div>

        {/* Drop zone */}
        <motion.div
          ref={drop as any}
          className="relative flex items-center justify-center"
          style={{
            width: "300px",
            height: "300px",
            background: isOver && canDrop
              ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
              : isMatched
              ? "linear-gradient(145deg, #7ED321 0%, #A8E063 100%)"
              : "linear-gradient(145deg, #FFFFFF 0%, #F0F0F0 100%)",
            borderRadius: "40px",
            border: isMatched 
              ? "8px solid #7ED321"
              : "8px dashed rgba(200,200,200,0.6)",
            boxShadow: `
              0 15px 40px rgba(0,0,0,0.2),
              inset 0 -5px 15px rgba(0,0,0,0.1),
              inset 0 5px 15px rgba(255,255,255,0.5)
            `,
            transition: "all 0.3s ease"
          }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {!isMatched && (
            <div className="text-6xl font-bold text-gray-300">
              ?
            </div>
          )}

          {isMatched && matchedNumber && (
            <motion.div
              style={{
                fontSize: "8rem",
                fontWeight: "bold",
                color: "white",
                textShadow: "0 6px 15px rgba(0,0,0,0.3)"
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12 }}
            >
              {matchedNumber}
            </motion.div>
          )}

          {isMatched && (
            <motion.div
              className="absolute -top-6 -right-6 text-8xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
            >
              ✅
            </motion.div>
          )}

          {isOver && canDrop && !isMatched && (
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                border: "6px solid #FFD93D",
                boxShadow: "0 0 30px rgba(255, 217, 61, 0.8)"
              }}
              animate={{
                scale: [1, 1.05, 1],
                transition: { duration: 0.5, repeat: Infinity }
              }}
            />
          )}

          <div className="absolute -bottom-14 text-3xl font-bold text-gray-700">
            Drag Here! 👇
          </div>
        </motion.div>

        {/* Number options */}
        <motion.div
          className="flex flex-col gap-8 p-12 rounded-3xl"
          style={{
            background: "linear-gradient(145deg, #FFE66D 0%, #FFD93D 100%)",
            border: "8px solid rgba(255,255,255,0.6)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
          }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="text-4xl font-bold text-center text-gray-700 mb-2">
            Numbers 🔢
          </div>
          <div className="flex flex-col gap-8">
            {numberOptions.map((num) => (
              <DraggableNumber
                key={num}
                number={num}
                isMatched={matchedNumber === num}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {wrongAttempt && (
        <motion.div
          className="text-4xl font-bold text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Try a different number! Count the dots again! 🔵
        </motion.div>
      )}

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
            <div className="text-9xl mb-6">🎉✨🌟</div>
            <div className="text-7xl font-bold text-white" style={{
              textShadow: "0 6px 15px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, #FFD93D 0%, #7ED321 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Perfect Match! That's {dotCount}! 🏆
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export function MatchNumberToDots(props: MatchNumberToDotsProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <MatchNumberToDotsContent {...props} />
    </DndProvider>
  );
}
